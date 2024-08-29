/** @format */
"use client";

import { useState, useEffect } from "react";
import { Nav } from "./ui/nav";

import { Settings, ChevronRight, Package } from "lucide-react";
import { Button } from "./ui/button";

import { useWindowWidth } from "@react-hook/window-size";

export default function SideNavbar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileWidth, setMobileWidth] = useState(false);

  const onlyWidth = useWindowWidth();

  useEffect(() => {
    setMobileWidth(onlyWidth < 768);
  }, [onlyWidth]);

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div
      className={`relative border-r px-3 pb-10 pt-24 transition-width duration-300 ${
        mobileWidth
          ? "min-w-[80px] w-[80px]"
          : isCollapsed
          ? "min-w-[80px] w-[80px]"
          : "min-w-[240px] w-[240px]"
      }`}
    >
      {!mobileWidth && (
        <div
          className={`absolute right-[-20px] top-7 transition-transform duration-300 ${
            isCollapsed ? "rotate-180" : ""
          }`}
        >
          <Button
            onClick={toggleSidebar}
            // variant="secondary"
            className="rounded-full p-2"
          >
            <ChevronRight />
          </Button>
        </div>
      )}
      <Nav
        isCollapsed={mobileWidth ? true : isCollapsed}
        links={[
          {
            title: "Product Details",
            href: "/products",
            icon: Package,
            variant: "ghost",
          },
          {
            title: "Compare Products Page",
            href: "/CompareProduct",
            icon: Settings,
            variant: "ghost",
          },
        ]}
      />
    </div>
  );
}
