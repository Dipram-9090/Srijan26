"use client";
import { Event } from "@/components/events/types/events";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect } from "react";
import { CLIP_PATH, EVENTS_DATA } from "./constants/events";
import { useRouter } from "next/navigation";

interface Props {
  event: Event;
}

export default function EventNavigation({ event }: Props) {
  const desktopClipStyle = {
    "--desktop-clip": CLIP_PATH,
  } as React.CSSProperties;

  const router = useRouter();
  const currentId = parseInt(event.id);

  // ── Keyboard navigation ──────────────────────────────
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && currentId > 1) {
        router.push(`/events/${currentId - 1}`);
      } else if (e.key === "ArrowRight" && currentId < EVENTS_DATA.length) {
        router.push(`/events/${currentId + 1}`);
      }
    },
    [currentId, router],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <section className="sticky top-20 z-50">
      <div className="top-0 flex justify-between items-center w-full z-20 relative pt-4">
        <div className="flex items-center gap-2 md:gap-4">
          {parseInt(event.id) > 1 && (
            <Link
              href={`/events/${parseInt(event.id) - 1}`}
              style={desktopClipStyle}
              className={`flex items-center gap-1 md:gap-2 bg-white text-black hover:text-white hover:bg-red active:scale-[0.98] duration-150 transition-all uppercase text-xs font-euclid tracking-wider group px-4 py-2 md:pl-8 md:pr-14 md:py-2 rounded-full md:rounded-none md:[clip-path:var(--desktop-clip)]`}
            >
              <ChevronLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform"
              />{" "}
              <span className="hidden md:inline">Prev</span>
            </Link>
          )}

          <Link
            href="/events"
            style={desktopClipStyle}
            className={`flex items-center gap-1 md:gap-2 bg-white text-black hover:text-white hover:bg-red active:scale-[0.98] duration-150 transition-all uppercase text-xs font-euclid tracking-wider group px-4 py-2 md:pl-8 md:pr-14 md:py-2 rounded-full md:rounded-none md:[clip-path:var(--desktop-clip)]`}
          >
            All Events
          </Link>
        </div>

        <div>
          {parseInt(event.id) < EVENTS_DATA.length && (
            <Link
              href={`/events/${parseInt(event.id) + 1}`}
              style={desktopClipStyle}
              className={`flex items-center gap-1 md:gap-2 bg-white text-black hover:text-white hover:bg-red active:scale-[0.98] duration-150 transition-all uppercase text-xs font-euclid tracking-wider group px-4 py-2 md:pl-8 md:pr-14 md:py-2 rounded-full md:rounded-none md:[clip-path:var(--desktop-clip)]`}
            >
              <span className="hidden md:inline">Next</span>
              <ChevronRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
