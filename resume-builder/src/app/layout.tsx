import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ResumeBuilder Pro - Create Professional Resumes",
  description: "Build professional, ATS-friendly resumes in minutes with ResumeBuilder Pro. Choose from expert-designed templates and let our platform guide you to career success.",
  keywords: "resume builder, CV maker, professional resume, ATS friendly, job application",
  authors: [{ name: "ResumeBuilder Pro Team" }],
  openGraph: {
    title: "ResumeBuilder Pro - Create Professional Resumes",
    description: "Build professional, ATS-friendly resumes in minutes with ResumeBuilder Pro.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
