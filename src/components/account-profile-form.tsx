"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Locale } from "@/lib/types";
import { Icon } from "./icons";

const AVATAR_PATH = "avatar";
const AVATAR_LIMIT = 2 * 1024 * 1024;
const AVATAR_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

type Notice = { tone: "success" | "error"; text: string } | null;

type AccountProfileFormProps = {
  locale: Locale;
  userId: string;
  email: string;
  initialDisplayName: string | null;
  initialAvatarUrl: string | null;
};

export function AccountProfileForm({
  locale,
  userId,
  email,
  initialDisplayName,
  initialAvatarUrl,
}: AccountProfileFormProps) {
  const zh = locale === "zh";
  const router = useRouter();
  const [supabase] = useState(createClient);
  const [displayName, setDisplayName] = useState(initialDisplayName ?? "");
  const [avatarUrl, setAvatarUrl] = useState(initialAvatarUrl);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState<"profile" | "avatar" | "remove" | null>(null);
  const [notice, setNotice] = useState<Notice>(null);
  const avatarSource = previewUrl ?? avatarUrl;
  const initial = (displayName.trim() || email).slice(0, 1).toUpperCase();

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const saveProfile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedName = displayName.trim();
    if (normalizedName.length > 50) {
      setNotice({ tone: "error", text: zh ? "昵称不能超过 50 个字符。" : "Display name cannot exceed 50 characters." });
      return;
    }

    setBusy("profile");
    setNotice(null);
    const { error } = await supabase.from("profiles").upsert({
      id: userId,
      display_name: normalizedName || null,
      preferred_locale: locale,
    }, { onConflict: "id" });

    if (error) {
      setNotice({ tone: "error", text: zh ? "暂时无法保存昵称，请稍后再试。" : "We could not save your display name. Please try again." });
    } else {
      setDisplayName(normalizedName);
      setNotice({ tone: "success", text: zh ? "账户资料已保存。" : "Your profile has been saved." });
      router.refresh();
    }
    setBusy(null);
  };

  const uploadAvatar = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    event.currentTarget.value = "";
    if (!file) return;
    if (!AVATAR_TYPES.has(file.type)) {
      setNotice({ tone: "error", text: zh ? "请选择 JPG、PNG 或 WebP 图片。" : "Choose a JPG, PNG or WebP image." });
      return;
    }
    if (file.size > AVATAR_LIMIT) {
      setNotice({ tone: "error", text: zh ? "头像文件不能超过 2 MB。" : "Avatar files must be 2 MB or smaller." });
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setBusy("avatar");
    setNotice(null);
    const objectPath = `${userId}/${AVATAR_PATH}`;
    const { error: uploadError } = await supabase.storage.from("avatars").upload(objectPath, file, {
      cacheControl: "3600",
      contentType: file.type,
      upsert: true,
    });

    if (uploadError) {
      setPreviewUrl(null);
      setNotice({ tone: "error", text: zh ? "头像上传失败，请稍后再试。" : "The avatar upload failed. Please try again." });
      setBusy(null);
      return;
    }

    const { data } = supabase.storage.from("avatars").getPublicUrl(objectPath);
    const nextAvatarUrl = `${data.publicUrl}?v=${Date.now()}`;
    const { error: profileError } = await supabase.from("profiles").upsert({
      id: userId,
      avatar_url: nextAvatarUrl,
      preferred_locale: locale,
    }, { onConflict: "id" });

    if (profileError) {
      setPreviewUrl(null);
      setNotice({ tone: "error", text: zh ? "头像已上传，但账户资料更新失败，请重试。" : "The image uploaded, but your profile could not be updated. Please try again." });
    } else {
      setAvatarUrl(nextAvatarUrl);
      setPreviewUrl(null);
      setNotice({ tone: "success", text: zh ? "头像已更新。" : "Your avatar has been updated." });
      router.refresh();
    }
    setBusy(null);
  };

  const removeAvatar = async () => {
    setBusy("remove");
    setNotice(null);
    const objectPath = `${userId}/${AVATAR_PATH}`;
    const { error: storageError } = await supabase.storage.from("avatars").remove([objectPath]);
    if (storageError) {
      setNotice({ tone: "error", text: zh ? "暂时无法移除头像，请稍后再试。" : "We could not remove your avatar. Please try again." });
      setBusy(null);
      return;
    }

    const { error: profileError } = await supabase.from("profiles").update({ avatar_url: null }).eq("id", userId);
    if (profileError) {
      setNotice({ tone: "error", text: zh ? "头像文件已移除，但资料更新失败，请重试。" : "The image was removed, but your profile could not be updated. Please try again." });
    } else {
      setAvatarUrl(null);
      setPreviewUrl(null);
      setNotice({ tone: "success", text: zh ? "头像已移除。" : "Your avatar has been removed." });
      router.refresh();
    }
    setBusy(null);
  };

  return (
    <section className="account-card account-profile-card" aria-labelledby="profile-heading">
      <div className="account-card-heading">
        <span className="eyebrow">PROFILE</span>
        <h2 id="profile-heading">{zh ? "个人资料" : "Profile"}</h2>
        <p>{zh ? "头像和昵称会跟随你的 PADDOCK ID。" : "Your avatar and display name travel with your PADDOCK ID."}</p>
      </div>

      <div className="account-avatar-editor">
        <div className="account-avatar" aria-label={zh ? "当前头像" : "Current avatar"}>
          {avatarSource
            ? <Image src={avatarSource} alt="" width={112} height={112} unoptimized />
            : <span aria-hidden="true">{initial}</span>}
        </div>
        <div className="account-avatar-actions">
          <label className="secondary-button account-upload-button">
            <Icon name="user" />
            <span>{busy === "avatar" ? (zh ? "正在上传…" : "Uploading…") : (zh ? "上传头像" : "Upload avatar")}</span>
            <input
              className="sr-only"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              disabled={busy !== null}
              onChange={uploadAvatar}
            />
          </label>
          {avatarUrl && (
            <button className="text-button" type="button" disabled={busy !== null} onClick={removeAvatar}>
              {busy === "remove" ? (zh ? "正在移除…" : "Removing…") : (zh ? "移除头像" : "Remove avatar")}
            </button>
          )}
          <small>{zh ? "JPG、PNG 或 WebP，最大 2 MB。" : "JPG, PNG or WebP, up to 2 MB."}</small>
        </div>
      </div>

      <form className="account-profile-form" onSubmit={saveProfile}>
        <label>
          <span>{zh ? "昵称" : "Display name"}</span>
          <input
            type="text"
            value={displayName}
            maxLength={50}
            autoComplete="nickname"
            placeholder={zh ? "例如：Justin" : "For example: Justin"}
            onChange={(event) => setDisplayName(event.target.value)}
          />
          <small>{zh ? "最多 50 个字符；留空则使用邮箱身份。" : "Up to 50 characters. Leave blank to use your email identity."}</small>
        </label>
        <label>
          <span>{zh ? "账户邮箱" : "Account email"}</span>
          <input type="email" value={email} readOnly aria-readonly="true" />
        </label>
        <button className="primary-button" type="submit" disabled={busy !== null}>
          {busy === "profile" ? (zh ? "正在保存…" : "Saving…") : (zh ? "保存资料" : "Save profile")}
        </button>
      </form>

      {notice && (
        <p className={`account-notice ${notice.tone}`} role={notice.tone === "error" ? "alert" : "status"}>
          {notice.text}
        </p>
      )}
    </section>
  );
}
