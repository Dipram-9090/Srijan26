"use client";

import Image from "next/image";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion } from "motion/react";
import { useMobileNavContext } from "@/hooks/useMobileNav";
import { CLIP_PATH, NAV_LINKS } from "./constants";

export function MobileMenu() {
  const { isOpen, toggle } = useMobileNavContext();
  const pathname = usePathname();
  const { data: session } = useSession();

  const isLoggedIn = !!session?.user;
  const loginHref = isLoggedIn ? "/dashboard" : "/login";
  const loginLabel = isLoggedIn ? "Dashboard" : "Login";

  return (
    <div
      className={clsx(
        "bg-background fixed inset-0 flex flex-col z-50 transition-all duration-300",
        isOpen ? "opacity-100 visible" : "opacity-0 pointer-events-none invisible",
      )}
    >
      {/* Full Bleed Header */}
      <div className="w-full flex justify-between items-center py-4 px-4">
        <div className="flex gap-6">
          <Image
            src="/images/srijan-thumbnail.svg"
            alt="A square shaped logo for Srijan'26"
            width={45}
            height={45}
          />
          <Image
            src="/images/srijan-wide-icon.svg"
            alt="A wide layout logo for Srijan'26"
            height={45}
            width={2.298 * 45} // Aspect ratio 2.298:1
          />
        </div>

        <motion.button
          onClick={toggle}
          className="relative px-11 h-10 flex items-center justify-center overflow-hidden bg-red"
          style={{ clipPath: CLIP_PATH }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Image src="/icons/cross.svg" alt="Close Menu" width={24} height={24} />
        </motion.button>
      </div>

      {/* Menu Items */}
      <div className="flex-1 flex flex-col items-center justify-start pt-8 gap-4 overflow-y-auto">
        {NAV_LINKS.map((link) => (
          <MobileNavLink
            key={link.href}
            href={link.href}
            label={link.label}
            clipPath={CLIP_PATH}
            isActive={pathname === link.href}
            onClick={toggle}
          />
        ))}

        {/* Socials */}
        <ul className="flex gap-4 mt-8">
          {[
            { href: "/", label: "linkedin" },
            { href: "/", label: "instagram" },
            { href: "/", label: "youtube" },
          ].map((item) => (
            <li key={item.label}>
              <motion.a
                href={item.href}
                className="block p-2"
                whileTap={{ scale: 0.9 }}
              >
                <Image
                  src={`/icons/${item.label}.svg`}
                  alt={item.label}
                  width={48}
                  height={48}
                />
              </motion.a>
            </li>
          ))}
        </ul>

        {/* Mobile Login Button */}
        <Link
          href={loginHref}
          onClick={toggle}
          className="md:hidden mt-6 h-14 px-12 flex items-center justify-center font-bold text-xl uppercase bg-foreground text-black overflow-hidden"
          style={{ clipPath: CLIP_PATH }}
        >
          {loginLabel}
        </Link>
      </div>
    </div>
  );
}

function MobileNavLink({ href, label, clipPath, isActive, onClick }: { href: string, label: string, clipPath: string, isActive: boolean, onClick?: () => void }) {
  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="w-full flex justify-center"
    >
      <Link href={href} onClick={onClick} className={clsx(
        "block px-12 py-3 text-3xl font-bold uppercase overflow-hidden text-center transition-colors",
        isActive ? "bg-red text-white" : "text-white"
      )}
        style={isActive ? { clipPath } : {}}
      >
        {label}
      </Link>
    </motion.div>
  )
}
