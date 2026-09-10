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
      className={`fixed top-0 inset-x-0 z-50  ${isScrolled ? "md:bg-background/80 md:backdrop-blur-md" : "md:bg-transparent"} bg-background backdrop-blur-none border-b md:border-b-0`}
    >
      {children}
    </div>
  );
}
