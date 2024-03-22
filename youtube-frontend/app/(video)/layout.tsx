"use client";
import React, { useState } from "react";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarHidden(!isSidebarHidden);
  };
  return (
    <>
      <Sidebar
        className={isSidebarHidden ? "translate-x-0" : ""}
        toggleSidebar={toggleSidebar}
      />
      <Navbar onToggleSidebar={toggleSidebar} />
      {children}
    </>
  );
}
