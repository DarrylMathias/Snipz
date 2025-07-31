"use client";
import React, { useState } from "react";
import SidebarSnippets from "@/components/SidebarSnippets";

export default function Component(){
  return(
    <SidebarSnippets>
      <Dashboard />
    </SidebarSnippets>
  )
}

// Dummy dashboard component with content
const Dashboard = () => {
  return (
    <div>Dashboard</div>
  );
};
