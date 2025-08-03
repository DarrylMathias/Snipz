"use client";
import {
  Navbar,
  NavBody,
  MobileNav,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import AccessSwitch from "./AccessSwitch";
import { setDoc, Timestamp } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import toast from "react-hot-toast";
import { doc, deleteDoc } from "firebase/firestore";
import { DeleteSnippet } from "./ui/deleteSnippet";

interface Snippet {
  uid: string;
  owner: string | undefined;
  title: string;
  subtitle: string;
  code: string;
  lang: string;
  tags: string[];
  isPublic: boolean;
  timestamp: number | Timestamp;
}

type VisibilityToggleProps = {
  snippetId: string;
  snippet: Snippet;
  isPublic: boolean;
  onToggle: (value: boolean) => void;
};

export function NavbarCreateSnippet({
  snippetId,
  snippet,
  isPublic,
  onToggle,
}: VisibilityToggleProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const saveSnippet = async () => {
    if (snippetId && typeof snippetId === "string") {
      try {
        setIsMobileMenuOpen(false);
        await setDoc(doc(db, "snippet", snippetId), snippet, { merge: true });
        toast.success("Saved");
      } catch (error) {
        console.error("Error saving to database:", error);
        toast.error("Failed to save");
      }
    }
  };

  return (
    <div className="relative w-full">
      <Navbar className="pt-5">
        {/* Desktop Navigation - normal behavior */}
        <NavBody>
          <div />
          <div className="flex items-center gap-4">
            <AccessSwitch isPublic={isPublic} onToggle={onToggle} />
            <DeleteSnippet snippetId={snippetId} />
            <NavbarButton
              variant="primary"
              className="bg-indigo-500/80 hover:bg-indigo-600 text-white font-semibold"
              onClick={saveSnippet}
            >
              Save Snippet
            </NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation - normal spacing since button is above */}
        <MobileNav className="md:hidden">
          <MobileNavHeader>
            <div />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            <div className="flex w-full flex-col gap-4 p-4">
              <AccessSwitch isPublic={isPublic} onToggle={onToggle} />
              {/* <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="secondary"
                className="w-full font-semibold"
              > */}
                <DeleteSnippet snippetId={snippetId} />
              {/* </NavbarButton> */}
              <NavbarButton
                variant="primary"
                className="bg-indigo-500/80 hover:bg-indigo-600 text-white font-semibold"
                onClick={saveSnippet}
              >
                Save Snippet
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
