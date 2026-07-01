import type { Metadata, Viewport } from "next";
import "./globals.css";
import { MotionPreferenceProvider } from "@/components/MotionPreferenceProvider";

export const metadata: Metadata = {
  title: "Life",
  description: "A daily good-things tracker for a small pilot group.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-dusk text-paper font-sans antialiased">
        <MotionPreferenceProvider>{children}</MotionPreferenceProvider>
      </body>
    </html>
  );
}
