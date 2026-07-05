"use client";

import { useState } from "react";

import Container from "../ui/Container";

import { Menu, X } from "lucide-react";

import { navLinks } from "@/constants/navLinks";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800 bg-black/80 backdrop-blur-md">
      <Container>
        <div className="flex h-20 items-center justify-between">

          {/* Logo */}

          <h1 className="cursor-pointer text-2xl font-bold transition-colors duration-300 hover:text-blue-400">
            Eleva
          </h1>

          {/* Desktop Navigation */}

          <div className="hidden items-center gap-8 md:flex">

            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-slate-300 transition-colors duration-300 hover:text-blue-400"
              >
                {link.name}
              </a>
            ))}

            <button className="rounded-lg bg-white px-5 py-2 font-medium text-black transition hover:bg-slate-200">
              Get Started
            </button>

          </div>

          {/* Mobile Button */}

          <button
            className="md:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

        </div>

        {/* Mobile Menu */}

        {isOpen && (
          <div className="border-t border-slate-800 py-6 md:hidden">

            <div className="flex flex-col gap-6">

              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-slate-300 transition-colors hover:text-white"
                >
                  {link.name}
                </a>
              ))}

              <button className="rounded-lg bg-white py-3 font-medium text-black">
                Get Started
              </button>

            </div>

          </div>
        )}

      </Container>
    </nav>
  );
}