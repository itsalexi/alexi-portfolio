"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { usePreloaderReady } from "../hooks/usePreloaderReady";
import MoonlitSky from "./MoonlitSky";
import skyStyles from "./MoonlitSky.module.css";

export default function PageTransition({ children }) {
  const pathname = usePathname();
  const isReady = usePreloaderReady();
  const hasAtmosphere = !pathname?.startsWith("/admin");
  const hasMoonlitSky = hasAtmosphere && pathname !== "/";

  return (
    <motion.div
      key={pathname}
      className={hasAtmosphere ? skyStyles.shell : undefined}
      initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
      animate={
        isReady
          ? {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transitionEnd: { filter: "none" },
            }
          : { opacity: 0, y: 10, filter: "blur(4px)" }
      }
      transition={{
        duration: 0.52,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {hasMoonlitSky ? <MoonlitSky className={skyStyles.sky} /> : null}
      {children}
    </motion.div>
  );
}
