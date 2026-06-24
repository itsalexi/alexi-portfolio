import Image from "next/image";
import { cn } from "@/lib/utils";

const logos = {
  Bytespace: {
    image: "/images/logos/bytespace.webp",
    label: "Bytespace",
    className: "bg-[#f5f0e7] shadow-[inset_0_0_0_1px_rgba(25,25,24,0.08)]",
    imageBoxClassName: "h-[72%] w-[72%]",
  },
  "NextPay (YC W21)": {
    image: "/images/logos/nextpay.webp",
    label: "NextPay",
    className: "bg-[#5470ff] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]",
    imageBoxClassName: "h-full w-full",
    imageClassName: "object-cover",
  },
  "Sip & Scale": {
    image: "/images/logos/sip-scale-wordmark.webp",
    label: "Sip & Scale",
    className: "bg-[#f7f3ea] shadow-[inset_0_0_0_1px_rgba(47,45,43,0.12)]",
    imageBoxClassName: "h-[58%] w-[92%]",
  },
  "One Big Match": {
    image: "/images/logos/one-big-match.webp",
    label: "One Big Match",
    className: "bg-[#1c3192] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]",
    imageBoxClassName: "h-full w-full",
    imageClassName: "object-cover",
  },
  SALBAR: {
    image: "/images/logos/salbar.webp",
    label: "SALBAR",
    className: "bg-[#f7f3ea] shadow-[inset_0_0_0_1px_rgba(47,45,43,0.12)]",
    imageBoxClassName: "h-[82%] w-[82%]",
  },
  Crystal: {
    image: "/images/logos/crystal.webp",
    label: "Crystal",
    className: "bg-[#202680] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]",
    imageBoxClassName: "h-[62%] w-[92%]",
  },
  StartupQC: {
    image: "/images/logos/startupqc.webp",
    label: "StartupQC",
    className: "bg-[#f2f0ed] shadow-[inset_0_0_0_1px_rgba(25,25,24,0.08)]",
    imageBoxClassName: "h-[58%] w-[92%]",
  },
  "StartupQC Squad 3": {
    image: "/images/logos/startupqc.webp",
    label: "StartupQC Squad 3",
    className: "bg-[#f2f0ed] shadow-[inset_0_0_0_1px_rgba(25,25,24,0.08)]",
    imageBoxClassName: "h-[58%] w-[92%]",
  },
  "Ateneo MISA": {
    image: "/images/logos/misa.webp",
    label: "Ateneo MISA",
    className: "bg-[#1ea5ad] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]",
    imageBoxClassName: "h-full w-full",
    imageClassName: "object-cover",
  },
  "Ateneo de Manila University": {
    image: "/images/logos/ateneo-de-manila.webp",
    label: "Ateneo de Manila University",
    className: "bg-[#f7f3ea] shadow-[inset_0_0_0_1px_rgba(160,128,72,0.18)]",
    imageBoxClassName: "h-[82%] w-[82%]",
  },
  TEDxAteneoDeManila: {
    mark: "Tx",
    label: "TEDxAteneoDeManila",
    className:
      "bg-[#261515] text-[#f2b7b7] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]",
  },
  "You can just do things.": {
    mark: "Y",
    label: "You can just do things",
    className:
      "bg-[#1c1a25] text-[#d8cdf7] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]",
  },
};

const sizeClasses = {
  xs: "h-8 w-8 rounded-[9px] text-[0.62rem]",
  sm: "h-9 w-9 rounded-[10px] text-[0.68rem]",
  md: "h-12 w-12 rounded-[13px] text-sm",
  lg: "h-16 w-16 rounded-[16px] text-lg",
};

const imageBoxClasses = {
  xs: "h-5 w-5",
  sm: "h-6 w-6",
  md: "h-8 w-8",
  lg: "h-11 w-11",
};

const imageSizes = {
  xs: "32px",
  sm: "36px",
  md: "48px",
  lg: "64px",
};

export default function CompanyLogo({
  company,
  imageSrc,
  label,
  size = "md",
  className,
  "aria-hidden": ariaHidden = true,
}) {
  const logo = imageSrc
    ? {
        image: imageSrc,
        label: label || company || "Event",
        className:
          "bg-white/[0.04] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]",
        imageBoxClassName: "h-full w-full",
        imageClassName: "object-cover",
      }
    : logos[company] || {
        mark: company?.slice(0, 2).toUpperCase() || "AC",
        label: company || "Company",
        className:
          "bg-white/[0.05] text-[var(--portfolio-ink)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]",
      };
  const ariaProps = ariaHidden
    ? { "aria-hidden": true }
    : { role: "img", "aria-label": `${logo.label} logo` };

  return (
    <span
      {...ariaProps}
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden font-mono font-semibold tracking-[-0.018em]",
        sizeClasses[size] || sizeClasses.md,
        logo.className,
        className,
      )}
    >
      {logo.image
        ? <span
            className={cn(
              "relative block",
              imageBoxClasses[size] || imageBoxClasses.md,
              logo.imageBoxClassName,
            )}
          >
            <Image
              src={logo.image}
              alt=""
              fill
              sizes={imageSizes[size] || imageSizes.md}
              className={cn("object-contain", logo.imageClassName)}
            />
          </span>
        : logo.mark}
    </span>
  );
}
