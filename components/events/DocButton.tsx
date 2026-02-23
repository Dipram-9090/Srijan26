"use client";

import React from "react";
import { FileText } from "lucide-react";
import { CLIP_PATH } from "./constants/events";

interface DocButtonProps {
  /** The URL to the PDF or Google Drive document */
  docUrl: string;
  /** Optional label override; defaults to "Docs" */
  label?: string;
  isCard?: boolean;
}

const DocButton: React.FC<DocButtonProps> = ({
  docUrl,
  label = "Docs",
  isCard,
}) => {
  const desktopClipStyle = {
    "--desktop-clip": CLIP_PATH,
  } as React.CSSProperties;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(docUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <a
      href={docUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      style={desktopClipStyle}
      className={`bg-white hover:bg-white/80 active:bg-gray-200 transition-all duration-150 text-black font-euclid uppercase font-semibold tracking-wider flex items-center justify-start gap-2 cursor-pointer
      ${
        isCard
          ? "py-2 pl-10 w-full text-xs [clip-path:var(--desktop-clip)]"
          : "p-3 md:pl-10 md:pr-14 md:py-2 lg:text-sm text-xs rounded-full md:rounded-none md:[clip-path:var(--desktop-clip)]"
      }`}
    >
      <span className={isCard ? "hidden" : "hidden md:inline"}>{label}</span>
      <FileText size={isCard ? 16 : 18} strokeWidth={2} />
    </a>
  );
};

export default DocButton;