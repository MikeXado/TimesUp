"use client";
import Breadcrumb from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import React from "react";

function Header() {
  const pathname = usePathname();
  return <Breadcrumb pathname={pathname} />;
}

export default Header;
