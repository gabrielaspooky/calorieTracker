import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "Calorie Tamagotchi",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}
