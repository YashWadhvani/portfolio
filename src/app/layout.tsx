import type { Metadata } from "next";
import "./globals.css";
import IDELayout from "@/components/IDELayout";
import { ThemeProvider } from "@/components/ThemeContext";

export const metadata: Metadata = {
  title: "Yash Wadhvani | Full-Stack Engineer & AI/ML Developer",
  description:
    "Interactive developer portfolio of Yash Wadhvani, pursuing M.Tech in Advanced Computing at MANIT Bhopal. Features projects, technical competencies, education timeline, and interactive terminal.",
  keywords: [
    "Yash Wadhvani",
    "Portfolio",
    "Software Engineer",
    "Full-Stack Developer",
    "Next.js",
    "React",
    "AI/ML",
    "MANIT Bhopal",
    "Karnavati University",
  ],
  authors: [{ name: "Yash Wadhvani" }],
  creator: "Yash Wadhvani",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yashwadhvani.vercel.app",
    title: "Yash Wadhvani | Full-Stack Engineer & AI/ML Developer",
    description:
      "Interactive code editor portfolio showcasing projects, technical competencies, and developer journey.",
    siteName: "Yash Wadhvani Portfolio",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="bg-editor-bg text-editor-textPrimary antialiased selection:bg-[#007ACC]/30">
        <ThemeProvider>
          <IDELayout>{children}</IDELayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
