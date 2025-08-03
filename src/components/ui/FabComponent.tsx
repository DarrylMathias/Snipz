"use client";

import { Fab, Action } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";
import { MdHelp, MdCode } from "react-icons/md";
import { RiSlideshowView } from "react-icons/ri";
import React from "react";
import { useRouter } from "next/navigation";

const mainButtonStyles = {
  backgroundColor: "#a855f7",
  color: "white",
  border: "none",
  borderRadius: "50%",
  width: "56px",
  height: "56px",
  boxShadow: "0 4px 12px rgba(168, 85, 247, 0.4)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
};

const actionButtonStyles = {
  backgroundColor: "#7c3aed",
  color: "white",
  border: "none",
  borderRadius: "50%",
  width: "40px",
  height: "40px",
  boxShadow: "0 2px 8px rgba(124, 58, 237, 0.3)",
  transition: "all 0.2s ease-in-out",
  fontSize: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const FabComponent = () => {
  const router = useRouter();

  const handleShowcaseClick = () => {
    console.log("Email action clicked");
  };

  const handleContactUsClick = () => {
    router.replace("/contact");
  };

  const handleTemplateClick = () => {
    router.replace("/templates");
  };

  return (
    <Fab
      mainButtonStyles={mainButtonStyles}
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 1000,
      }}
      icon={<span className="text-2xl">⚡</span>}
      event="hover"
      alwaysShowTitle
    >
      <Action
        text="Templates"
        onClick={handleTemplateClick}
        style={actionButtonStyles}
      >
        <MdCode />
      </Action>
      <Action
        text="Showcase"
        onClick={handleShowcaseClick}
        style={actionButtonStyles}
      >
        <RiSlideshowView />
      </Action>
      <Action
        text="Contact"
        onClick={handleContactUsClick}
        style={actionButtonStyles}
      >
        <MdHelp />
      </Action>
    </Fab>
  );
};

export default FabComponent;
