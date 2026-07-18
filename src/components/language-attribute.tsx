"use client";

import { useEffect } from "react";
import type { Locale } from "@/lib/types";

export function LanguageAttribute({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
  }, [locale]);
  return null;
}
