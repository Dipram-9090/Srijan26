"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export const MarqueeSlider = ({
  name,
  itemCount,
  children,
  titleAlignment = "left"
}: {
  name: string;
  itemCount: number;
  children: React.ReactNode;
  titleAlignment?: "left" | "right";
}) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.timeline().to(".scroller", {
        xPercent: -100,
        ease: "none",
        repeat: -1,
        duration: itemCount * 4,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="full-bleed pt-30">
      <h2 className={`p-0 font-elnath text-2xl sm:text-3xl md:text-5xl lg:text-6xl uppercase tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] text-amber-200/90 mb-10 sm:mb-16 ${titleAlignment === "left" ? "ml-10 sm:ml-18 lg:ml-24" : "mr-10 sm:mr-18 lg:mr-24 text-right"}`}>
        {name}
      </h2>
      <ul className="flex m-auto overflow-hidden select-none">
        <div className="scroller flex shrink-0">{children}</div>
        <div className="scroller flex shrink-0">{children}</div>
        <div className="scroller flex shrink-0">{children}</div>
        <div className="scroller flex shrink-0">{children}</div>
      </ul>
    </section>
  );
};
