"use client";
import React, { ReactNode, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconMenu2,
} from "@tabler/icons-react";
import { MdDashboard } from "react-icons/md";
import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/config/firebase.config";
import { redirect, usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function SidebarSnippets({ children }: { children: ReactNode }) {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.json();
        toast.error(`Logout failed: ${error?.error || "Unknown error"}`);
        return;
      }
      await auth.signOut();
      toast.success("Logged out");
      router.replace("/login");
    } catch (error) {
      toast.error(`Logout error: ${error || "Unknown error"}`);
      console.error("Logout error:", error);
    }
  };
  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <MdDashboard className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Showcase",
      href: "/showcase",
      icon: (
        <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Create Snippet",
      href: "/snippet/new",
      icon: (
        <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Templates",
      href: "/templates",
      icon: (
        <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname()

  return (
    <>
      {/* Mobile hamburger menu button for sidebar - positioned at left 50px */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className={cn(
          "md:hidden fixed top-5 z-50 p-2 rounded-md bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors",
          (pathname.startsWith('/snippet')) ? "left-7" : "right-7"
        )}
      >
        <IconMenu2 className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
      </button>

      {/* Mobile sidebar overlay */}
      {mobileMenuOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="md:hidden fixed left-0 top-0 h-full w-80 bg-white dark:bg-zinc-900 z-50 transform transition-transform duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <Logo />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800"
                >
                  <IconArrowLeft className="h-5 w-5" />
                </button>
              </div>
              <nav className="space-y-2">
                {links.map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.href}
                    className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.icon}
                    <span className="text-sm font-medium">{link.label}</span>
                  </Link>
                ))}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors w-full text-left"
                >
                  <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </nav>
              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-zinc-700">
                <div
                  className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <Image
                    src={
                      auth.currentUser?.photoURL || "https://picsum.photos/30"
                    }
                    className="h-7 w-7 shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                  <span className="text-sm font-medium">
                    {auth.currentUser?.displayName ??
                      auth.currentUser?.email ??
                      "Anonymous"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Mobile: Full width content */}
      <div className="md:hidden min-h-screen bg-gray-100 dark:bg-zinc-950">
        <div className="w-full h-full">{children}</div>
      </div>

      {/* Desktop: Original sidebar behavior - hidden on mobile */}
      <div className="hidden md:flex flex-row h-screen bg-gray-100 dark:bg-zinc-950">
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10 h-full">
            <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
              {open ? <Logo /> : <LogoIcon />}
              <div className="mt-8 flex flex-col gap-2">
                {links.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-sm font-normal text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md py-3 transition-colors group cursor-pointer"
              >
                <IconArrowLeft className="h-5 w-5 shrink-0" />
                {open && <span>Logout</span>}
              </button>
            </div>
            <div>
              <SidebarLink
                link={{
                  label:
                    auth.currentUser?.displayName ??
                    auth.currentUser?.email ??
                    "Anonymous",
                  href: "#",
                  icon: (
                    <Image
                      src={
                        auth.currentUser?.photoURL || "https://picsum.photos/30"
                      }
                      className="h-7 w-7 shrink-0 rounded-full"
                      width={50}
                      height={50}
                      alt="Avatar"
                    />
                  ),
                }}
              />
            </div>
          </SidebarBody>
        </Sidebar>
        <div className="flex-1 w-full h-full overflow-y-auto">
          <div className="w-full max-w-full h-full">{children}</div>
        </div>
      </div>
    </>
  );
}

export const Logo = () => {
  return (
    <Link
      href="/"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <Image
        src="/snipz.png"
        width="30"
        height="30"
        className="rounded-lg"
        alt="Snipz logo"
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white"
      >
        Snipz
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <Image
        src="/snipz.png"
        width="30"
        height="30"
        className="rounded-lg"
        alt="Snipz logo"
      />
    </Link>
  );
};
