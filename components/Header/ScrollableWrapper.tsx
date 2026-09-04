"use client";

import { PropsWithChildren, useEffect, useState } from "react";

export default function ScrollableWrapper({ children }: PropsWithChildren) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 inset-x-0 z-50  ${isScrolled ? "sm:bg-background/80 sm:backdrop-blur-md" : "sm:bg-transparent"} bg-background backdrop-blur-none border-b sm:border-b-0`}
    >
      {children}
    </div>
  );
}
