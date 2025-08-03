"use client"
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import localFont from 'next/font/local'
import { MainNavbar } from "@/components/MainNavbar";
import { usePathname } from "next/navigation";
import { Toaster } from 'react-hot-toast';
 
const myFont = localFont({
  src: "../../public/fonts/Gilroy-Semibold.ttf",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname()
  const notAllowed = ['/dashboard', '/showcase', '/templates', '/login']
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${myFont.variable} antialiased overflow-x-hidden suppressHydrationWarning`}
      >
        {(!notAllowed.includes(pathname) && !pathname.startsWith('/snippet')) && <MainNavbar />}
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
