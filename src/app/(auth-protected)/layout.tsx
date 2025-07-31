// app/(auth-protected)/layout.tsx
import "@/app/globals.css";
import { redirect } from "next/navigation";
import { verifySession } from "@/lib/auth/verifySession";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "react-hot-toast";
import localFont from "next/font/local";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeScript } from "../ThemeScript";

const myFont = localFont({
  src: "../../../public/fonts/Gilroy-Semibold.ttf",
  display: 'swap',
  variable: '--font-gilroy',
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const valid = await verifySession();
  if (!valid) redirect("/login");

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${myFont.variable} antialiased overflow-x-hidden bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
          forcedTheme="dark" // Force dark theme
        >
          <Toaster />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
