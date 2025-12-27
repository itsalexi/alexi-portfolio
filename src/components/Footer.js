"use client";

import Link from "next/link";
import { socials } from "../config/socials";
import {
  Github,
  Linkedin,
  Instagram,
  MessageCircle,
  Mail,
  FileText,
  Heart,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "GitHub",
      href: socials.github,
      icon: Github,
      label: "GitHub Profile",
    },
    {
      name: "LinkedIn",
      href: socials.linkedin,
      icon: Linkedin,
      label: "LinkedIn Profile",
    },
    {
      name: "Instagram",
      href: socials.instagram,
      icon: Instagram,
      label: "Instagram Profile",
    },
    {
      name: "Discord",
      href: socials.discord,
      icon: MessageCircle,
      label: "Join Discord Community",
    },
    {
      name: "Email",
      href: `mailto:${socials.email}`,
      icon: Mail,
      label: "Send Email",
    },
    {
      name: "Resume",
      href: socials.resume,
      icon: FileText,
      label: "View Resume",
    },
  ];

  const navigationLinks = [
    { name: "Projects", href: "/projects" },
    { name: "Talks", href: "/talks" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
  ];

  return (
    <footer className="relative z-10 mt-20 border-t border-neutral-800/50 bg-black/30 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-block text-xl font-bold text-white hover:text-neutral-300 transition-colors"
            >
              Alexi Canamo
            </Link>
            <p className="text-sm text-neutral-400 max-w-xs">
              Building tools and experiences that help thousands of students. CS
              student at Ateneo de Manila University.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="space-y-2">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Connect
            </h3>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="group relative"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-900/50 border border-neutral-800 hover:border-neutral-600 hover:bg-neutral-800/50 transition-all duration-200">
                      <Icon className="h-5 w-5 text-neutral-400 group-hover:text-white transition-colors" />
                    </div>
                    {/* Tooltip */}
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-neutral-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      {social.name}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-neutral-800/50">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-neutral-400">
              © {currentYear} Alexi Canamo. All rights reserved.
            </p>
            <p className="flex items-center gap-1 text-sm text-neutral-400">
              Made with{" "}
              <Heart className="h-4 w-4 text-red-500 fill-current animate-pulse" />{" "}
              in Manila
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
