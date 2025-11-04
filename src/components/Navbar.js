"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarButton,
} from "./ui/resizable-navbar";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PortfolioNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Check if we're on a talk detail page
  const isTalkDetailPage = pathname?.startsWith("/talks/");

  // Check if we're on the home page
  const isHomePage = pathname === "/";

  const navItems = [
    { name: "Projects", link: "#projects" },
    { name: "Experience", link: "#experience" },
    { name: "Skills", link: "#skills" },
  ];

  // Handle navigation with proper routing
  const handleNavClick = (e, link) => {
    e.preventDefault();
    setIsOpen(false);

    if (isHomePage) {
      const element = document.querySelector(link);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(`/${link}`);
    }
  };

  return (
    <Navbar className="fixed top-4">
      {/* Desktop Navbar */}
      <NavBody>
        <Link
          href="/"
          className="relative z-20 flex items-center space-x-2 px-2 py-1 text-sm font-semibold text-black dark:text-white"
        >
          <span className="text-lg">Alexi</span>
        </Link>

        <NavItems
          items={navItems}
          onItemClick={(e, link) => handleNavClick(e, link)}
        />

        <div className="relative z-20 flex items-center gap-2">
          <NavbarButton
            variant="secondary"
            href="mailto:alexi@example.com"
            className="text-sm"
          >
            Contact
          </NavbarButton>
          <NavbarButton variant="dark" href="/resume.pdf" className="text-sm">
            Resume
          </NavbarButton>
        </div>
      </NavBody>

      {/* Mobile Navbar */}
      <MobileNav>
        <MobileNavHeader>
          <Link
            href="/"
            className="relative z-20 flex items-center space-x-2 px-2 py-1 text-sm font-semibold text-black dark:text-white"
          >
            <span className="text-lg">Alexi</span>
          </Link>
          <div className="flex items-center gap-2">
            {isTalkDetailPage && (
              <button
                type="button"
                onClick={() => router.push("/#talks")}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            )}
            <MobileNavToggle
              isOpen={isOpen}
              onClick={() => setIsOpen(!isOpen)}
            />
          </div>
        </MobileNavHeader>

        <MobileNavMenu isOpen={isOpen} onClose={() => setIsOpen(false)}>
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              className="text-neutral-600 dark:text-neutral-300"
              onClick={(e) => handleNavClick(e, item.link)}
            >
              {item.name}
            </a>
          ))}
          <a
            href="mailto:alexi@example.com"
            className="text-neutral-600 dark:text-neutral-300"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </a>
          <a
            href="/resume.pdf"
            className="text-neutral-600 dark:text-neutral-300"
            onClick={() => setIsOpen(false)}
          >
            Resume
          </a>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
