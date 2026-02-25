"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimatedSectionTitleProps {
  text: string;
  className?: string;
}

export function AnimatedSectionTitle({ text, className = "" }: AnimatedSectionTitleProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".section-title-word",
      { y: "110%" },
      {
        y: "0%",
        duration: 2,
        stagger: 0.05,
        ease: "expo.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <h2 ref={containerRef} className={className}>
      <span className="inline-flex flex-wrap justify-[inherit]">
        {text.split(" ").map((word, index) => (
          <span key={index} className="overflow-hidden inline-block pb-1 mr-[0.3em]">
            <span className="section-title-word inline-block translate-y-[110%] pb-1">
              {word}
            </span>
          </span>
        ))}
      </span>
    </h2>
  );
}
