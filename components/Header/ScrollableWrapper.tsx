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
      className={`bg-transparent fixed top-0 inset-x-0 z-100 transition-all duration-500 ${isScrolled ? "backdrop-blur-sm" : ""}`}
    >
      {children}
    </div>
  );
}
