"use client";

import { useState, type InputHTMLAttributes } from "react";
import type { Locale } from "@/lib/types";
import { Icon } from "./icons";

type PasswordInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: string;
  locale: Locale;
};

export function PasswordInput({ label, locale, ...props }: PasswordInputProps) {
  const [visible, setVisible] = useState(false);
  const zh = locale === "zh";
  const buttonLabel = visible
    ? (zh ? "隐藏密码" : "Hide password")
    : (zh ? "显示密码" : "Show password");

  return (
    <span className="password-field">
      <input {...props} aria-label={label} type={visible ? "text" : "password"} />
      <button
        className="password-visibility-button"
        type="button"
        aria-label={buttonLabel}
        aria-pressed={visible}
        title={buttonLabel}
        onClick={() => setVisible((current) => !current)}
      >
        <Icon name={visible ? "eyeOff" : "eye"} />
      </button>
    </span>
  );
}
