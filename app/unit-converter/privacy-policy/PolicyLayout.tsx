import Link from "next/link";
import type { ReactNode } from "react";

type Lang = "en" | "zh";

export function PolicyLayout({
  lang,
  title,
  children,
}: {
  lang: Lang;
  title: string;
  children: ReactNode;
}) {
  return (
    <main lang={lang === "zh" ? "zh-CN" : "en"} className="mx-auto max-w-3xl px-5 py-10 leading-relaxed">
      <nav className="mb-8 flex justify-end gap-3 text-sm">
        <Link
          href="/unit-converter/privacy-policy/"
          className={lang === "en" ? "font-semibold underline" : "opacity-70 hover:underline"}
        >
          English
        </Link>
        <span className="opacity-40">|</span>
        <Link
          href="/unit-converter/privacy-policy/zh/"
          className={lang === "zh" ? "font-semibold underline" : "opacity-70 hover:underline"}
        >
          中文
        </Link>
      </nav>
      <h1 className="mb-6 text-3xl font-bold">{title}</h1>
      <div className="space-y-4 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-6 [&_a]:text-blue-600 [&_a]:underline dark:[&_a]:text-blue-400">
        {children}
      </div>
    </main>
  );
}
