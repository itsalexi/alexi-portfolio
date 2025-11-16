"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
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
import { socials } from "../config/socials";

export default function PortfolioNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [referrer, setReferrer] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  // Detect if we're on a detail page
  const isDetailPage =
    pathname?.startsWith("/projects/") ||
    pathname?.startsWith("/talks/") ||
    pathname?.startsWith("/blog/");

  useEffect(() => {
    // Store the referrer when component mounts
    if (typeof window !== "undefined" && document.referrer) {
      try {
        const referrerUrl = new URL(document.referrer);
        const currentUrl = new URL(window.location.href);

        // Check if referrer is from the same domain
        if (referrerUrl.origin === currentUrl.origin) {
          setReferrer(referrerUrl.pathname);
        }
      } catch (e) {
        // Invalid URL, ignore
      }
    }
  }, [pathname]);

  const navItems = [
    { name: "Projects", link: "/projects" },
    { name: "Talks", link: "/talks" },
    { name: "Blog", link: "/blog" },
    { name: "About", link: "/about" },
  ];

  // Handle navigation
  const handleNavClick = (e, link) => {
    e.preventDefault();
    setIsOpen(false);
    router.push(link);
  };

  // Handle smart back navigation
  const handleBackClick = (e) => {
    e.preventDefault();
    setIsOpen(false);

    // If we came from the home page, go back to home
    if (referrer === "/") {
      router.push("/", { scroll: false });
    } else {
      // Otherwise use browser back
      router.back();
    }
  };

  return (
    <Navbar className="fixed top-4">
      {/* Desktop Navbar */}
      <NavBody>
        <div className="relative z-20 flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center space-x-2 px-2 py-1 text-sm font-semibold text-black dark:text-white"
          >
            <span className="text-lg">Alexi</span>
          </Link>

          {isDetailPage && (
            <button
              onClick={handleBackClick}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors text-neutral-600 dark:text-neutral-300 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-medium">Back</span>
            </button>
          )}
        </div>

        <NavItems
          items={navItems}
          onItemClick={(e, link) => handleNavClick(e, link)}
        />

        <div className="relative z-20 flex items-center gap-2">
          <NavbarButton
            variant="secondary"
            href={`mailto:${socials.email}`}
            className="text-sm"
          >
            Contact
          </NavbarButton>
          <NavbarButton
            variant="dark"
            href={socials.resume}
            className="text-sm"
          >
            Resume
          </NavbarButton>
        </div>
      </NavBody>

      {/* Mobile Navbar */}
      <MobileNav>
        <MobileNavHeader>
          <div className="relative z-20 flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center space-x-2 px-2 py-1 text-sm font-semibold text-black dark:text-white"
            >
              <span className="text-lg">Alexi</span>
            </Link>

            {isDetailPage && (
              <button
                onClick={handleBackClick}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 text-xs"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="font-medium">Back</span>
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
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
            href={`mailto:${socials.email}`}
            className="text-neutral-600 dark:text-neutral-300"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </a>
          <a
            href={socials.resume}
            target="_blank"
            rel="noopener noreferrer"
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
