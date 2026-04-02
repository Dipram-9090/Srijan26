"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CircleCheckBig, CircleOff } from "lucide-react";
import { CLIP_PATH } from "./constants/events";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getRegistrationStatus } from "@/services/EventsService";
import { RegistrationStatus } from "@/types/events";

interface RegisterButtonProps {
  status?: string;
  link: string;
  isCard?: boolean;
  registrationOpen: boolean;
  slug: string;
}

const RegisterButton: React.FC<RegisterButtonProps> = ({ link, isCard, registrationOpen, slug }) => {
  const { data: session } = useSession();
  const [registered, setRegistered] = useState(false);
  const router = useRouter();
  const desktopClipStyle = { "--desktop-clip": CLIP_PATH } as React.CSSProperties;
  const isExternal = link.startsWith("http");

  useEffect(() => {
    getRegistrationStatus(session?.user.id ?? "", slug)
    .then(res => {
      if(res.status === RegistrationStatus.NOT_REGISTERED) setRegistered(false);
      else setRegistered(true);
    })
  },[session?.user.id, slug])

  const handleRegisterClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!session && !isExternal) {
      e.preventDefault();
      router.push(`/login?redirect=${encodeURIComponent(link)}`);
    }
  };

  if (!registrationOpen && !registered) {
      return (
              <p
                  style={desktopClipStyle}
                  className={`bg-gray-800 text-gray-500 font-euclid uppercase tracking-wider cursor-not-allowed flex items-center justify-center gap-2
                ${ isCard ? "py-2 w-full text-xs font-bold [clip-path:var(--desktop-clip)]"
                  : "flex-1 sm:flex-none px-6 py-2 md:pl-10 md:pr-16 md:py-2 lg:text-sm text-xs rounded-full md:rounded-none md:[clip-path:var(--desktop-clip)]"}`}>
                  Closed <CircleOff size={isCard ? 16 : 18} />
              </p>
      );
  }

  return (
    <Link
      href={link}
      prefetch={false}
      onClick={handleRegisterClick}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      style={desktopClipStyle}
      className={`text-white font-euclid uppercase font-bold tracking-wider transition-all duration-150 flex items-center justify-center gap-2 bg-red hover:bg-red-700 active:bg-red-800
        ${isCard
          ? "py-2 w-full text-xs [clip-path:var(--desktop-clip)]"
          : "sm:flex-none px-6 py-2 md:pl-10 md:pr-16 md:py-2 lg:text-sm text-xs rounded-full md:rounded-none md:[clip-path:var(--desktop-clip)]"
        }`}
    >
      Register <CircleCheckBig size={isCard ? 16 : 18} strokeWidth={2.5} />
    </Link>
  );
};

export default RegisterButton;