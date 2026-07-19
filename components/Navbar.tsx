"use client";

import React from "react";
import Link from "next/link";
import Container from "./Container";

export function Navbar() {
  return (
    <Container className="flex items-center justify-center border-x border-b border-neutral-800 py-3">
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center gap-2.5 transition-opacity hover:opacity-90"
      >
        <img src="/Great-UI-logo.svg" alt="Great UI" className="h-8 w-8" />
        <span className="text-lg font-bold tracking-tight text-white">
          Great UI
        </span>
      </Link>
    </Container>
  );
}

export default Navbar;
