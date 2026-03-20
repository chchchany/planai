import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PlanAI — 기획자를 위한 AI 도구",
  description: "기획자를 위한 커뮤니티 + 마켓플레이스. 팁을 나누고, 자료를 사고팔고, AI로 기획 업무를 혁신하세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
