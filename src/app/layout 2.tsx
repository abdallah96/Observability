import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "React & Next.js Runtime Observatory",
  description: "A hands-on lab for understanding, observing, and controlling React and Next.js at runtime.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
