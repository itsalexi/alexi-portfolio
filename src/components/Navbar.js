"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Navbar,
  NavBody,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarButton,
} from "./ui/resizable-navbar";
import Link from "next/link";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { socials } from "../config/socials";

const STORIES_LINKS = [
  { name: "Talks", link: "/talks" },
  { name: "Blog", link: "/blog" },
  { name: "Hackathons", link: "/hackathons" },
];

const TOP_LINKS = [
  { name: "Projects", link: "/projects" },
  { name: "About", link: "/about" },
];

function pathMatchesStories(pathname) {
  if (!pathname) return false;
  return STORIES_LINKS.some(
    (item) => pathname === item.link || pathname.startsWith(`${item.link}/`)
  );
}

export default function PortfolioNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [referrer, setReferrer] = useState(null);
  const [storiesOpen, setStoriesOpen] = useState(false);
  const [mobileStoriesOpen, setMobileStoriesOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const storiesRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  const isDetailPage =
    pathname?.startsWith("/projects/") ||
    pathname?.startsWith("/talks/") ||
    pathname?.startsWith("/blog/") ||
    pathname?.startsWith("/hackathons/");

  const storiesActive = pathMatchesStories(pathname);

  useEffect(() => {
    if (typeof window !== "undefined" && document.referrer) {
      try {
        const referrerUrl = new URL(document.referrer);
        const currentUrl = new URL(window.location.href);
        if (referrerUrl.origin === currentUrl.origin) {
          setReferrer(referrerUrl.pathname);
        }
      } catch (e) {
        // ignore
      }
    }
  }, [pathname]);

  useEffect(() => {
    setStoriesOpen(false);
    setMobileStoriesOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!storiesOpen) return;
    const close = (e) => {
      if (storiesRef.current && !storiesRef.current.contains(e.target)) {
        setStoriesOpen(false);
      }
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [storiesOpen]);

  const handleNavClick = (e, link) => {
    e.preventDefault();
    setIsOpen(false);
    setStoriesOpen(false);
    router.push(link);
  };

  const handleBackClick = (e) => {
    e.preventDefault();
    setIsOpen(false);
    if (referrer === "/") {
      router.push("/", { scroll: false });
    } else {
      router.back();
    }
  };

  const navPillClass =
    "relative px-4 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-300";

  return (
    <Navbar className="fixed top-4">
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
              type="button"
              onClick={handleBackClick}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors text-neutral-600 dark:text-neutral-300 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-medium">Back</span>
            </button>
          )}
        </div>

        {/* Center nav: Projects | Stories ▾ | About */}
        <motion.div
          onMouseLeave={() => setHoveredIdx(null)}
          className="absolute inset-0 z-10 hidden flex-1 flex-row items-center justify-center gap-0 lg:flex"
        >
          <a
            href={TOP_LINKS[0].link}
            onMouseEnter={() => setHoveredIdx(0)}
            onClick={(e) => handleNavClick(e, TOP_LINKS[0].link)}
            className={navPillClass}
          >
            {hoveredIdx === 0 && (
              <motion.div
                layoutId="navHover"
                className="absolute inset-0 h-full w-full rounded-full bg-gray-100 dark:bg-neutral-800"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-20">{TOP_LINKS[0].name}</span>
          </a>

          <div className="relative" ref={storiesRef}>
            <button
              type="button"
              aria-expanded={storiesOpen}
              aria-haspopup="menu"
              onMouseEnter={() => setHoveredIdx(1)}
              onClick={() => setStoriesOpen((o) => !o)}
              className={cn(
                navPillClass,
                "inline-flex items-center gap-1",
                (storiesActive || storiesOpen) && "text-neutral-900 dark:text-white"
              )}
            >
              {hoveredIdx === 1 && (
                <motion.div
                  layoutId="navHover"
                  className="absolute inset-0 h-full w-full rounded-full bg-gray-100 dark:bg-neutral-800"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-20">Stories</span>
              <ChevronDown
                className={cn(
                  "relative z-20 h-4 w-4 opacity-70 transition-transform",
                  storiesOpen && "rotate-180"
                )}
              />
            </button>

            {storiesOpen && (
              <div
                role="menu"
                className="absolute left-1/2 top-[calc(100%+0.5rem)] z-[70] min-w-[11rem] -translate-x-1/2 rounded-xl border border-neutral-200/80 bg-white py-1.5 shadow-lg dark:border-neutral-800 dark:bg-neutral-950"
              >
                {STORIES_LINKS.map((item) => (
                  <a
                    key={item.link}
                    role="menuitem"
                    href={item.link}
                    onClick={(e) => handleNavClick(e, item.link)}
                    className={cn(
                      "block px-4 py-2.5 text-sm text-neutral-700 transition-colors hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800",
                      pathname === item.link ||
                        pathname?.startsWith(`${item.link}/`)
                        ? "bg-neutral-50 font-medium dark:bg-neutral-900"
                        : ""
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            )}
          </div>

          <a
            href={TOP_LINKS[1].link}
            onMouseEnter={() => setHoveredIdx(2)}
            onClick={(e) => handleNavClick(e, TOP_LINKS[1].link)}
            className={navPillClass}
          >
            {hoveredIdx === 2 && (
              <motion.div
                layoutId="navHover"
                className="absolute inset-0 h-full w-full rounded-full bg-gray-100 dark:bg-neutral-800"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-20">{TOP_LINKS[1].name}</span>
          </a>
        </motion.div>

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
                type="button"
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
          <a
            href={TOP_LINKS[0].link}
            className="text-neutral-600 dark:text-neutral-300"
            onClick={(e) => handleNavClick(e, TOP_LINKS[0].link)}
          >
            {TOP_LINKS[0].name}
          </a>

          <div className="flex w-full flex-col gap-1">
            <button
              type="button"
              onClick={() => setMobileStoriesOpen((o) => !o)}
              className="flex w-full items-center justify-between text-left text-neutral-600 dark:text-neutral-300"
            >
              <span>Stories</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  mobileStoriesOpen && "rotate-180"
                )}
              />
            </button>
            {mobileStoriesOpen && (
              <div className="ml-3 flex flex-col gap-3 border-l border-neutral-200 pl-3 dark:border-neutral-700">
                {STORIES_LINKS.map((item) => (
                  <a
                    key={item.link}
                    href={item.link}
                    className="text-sm text-neutral-500 dark:text-neutral-400"
                    onClick={(e) => handleNavClick(e, item.link)}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            )}
          </div>

          <a
            href={TOP_LINKS[1].link}
            className="text-neutral-600 dark:text-neutral-300"
            onClick={(e) => handleNavClick(e, TOP_LINKS[1].link)}
          >
            {TOP_LINKS[1].name}
          </a>

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
