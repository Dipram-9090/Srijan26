"use client";

import { useRef } from "react";
import Image from "next/image";
import { Clickable } from "@/components/Clickable";
import { Countdown } from "@/components/Landing/Countdown";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface SplitTextMaskProps {
  text: string;
  className?: string;
  itemClass?: string;
}

const SplitTextMask = ({ text, className = "", itemClass = "" }: SplitTextMaskProps) => {
  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {text.split(" ").map((word, index) => (
        <span key={index} className="overflow-hidden inline-block pb-1 mr-[0.3em]">
          <span className={`${itemClass} inline-block translate-y-[110%]`}>
            {word}
          </span>
        </span>
      ))}
    </span>
  );
};

export function HeroSection() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
        onComplete: () => {
          gsap.to(".hero-title-shimmer", {
            backgroundPosition: "200% center",
            duration: 2.5,
            ease: "none",
            repeat: -1,
          });

          gsap.to(".pulse-btn", {
            boxShadow: "0px 0px 30px 6px rgba(220, 38, 38, 0.5)",
            duration: 1.5,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        },
      });

      tl.fromTo(
        ".hero-logo",
        { opacity: 0, scale: 1.05, filter: "blur(8px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.4 }
      )
      .to(
        ".hero-subtitle-word",
        { y: "0%", duration: 1, stagger: 0.04, ease: "power4.out" },
        "-=0.8" 
      )
      .to(
        ".hero-title-word",
        { y: "0%", duration: 1.2, ease: "expo.out" },
        "-=0.9"
      )
      .fromTo(
        ".hero-right-lines",
        { borderColor: "rgba(255, 255, 255, 0)" },
        { borderColor: "rgba(255, 255, 255, 0.8)", duration: 1 },
        "-=1"
      )
      .to(
        ".hero-right-word",
        { y: "0%", duration: 1, stagger: 0.03, ease: "power4.out" },
        "-=1"
      )
      .fromTo(
        ".hero-countdown",
        { opacity: 0, scale: 0.95, filter: "blur(4px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1 },
        "-=0.8"
      )
      .fromTo(
        ".pulse-btn-container",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.5)" },
        "-=0.6"
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="w-full h-[100dvh] pt-24 pb-12 lg:py-16 px-4 sm:px-8 lg:px-6 xl:px-8 flex flex-col justify-center lg:flex-row lg:items-center lg:justify-between overflow-hidden"
    >
      {/* Left section: Logo and Title */}
      <div className="flex flex-col items-center lg:items-start text-center lg:text-left z-10 w-full lg:w-max lg:-mt-90 -mt-40">
        <Image
          src="/images/srijan-wide-icon.svg"
          alt="A wide layout logo for Srijan'26"
          height={200}
          width={460}
          className="hero-logo max-w-[85vw] lg:max-w-full lg:w-[500px] h-auto -ml-2 lg:ml-0"
          priority
        />
        
        <h2 className="py-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl mt-1 font-light tracking-wide lg:ml-2 flex flex-col items-center lg:items-start">
          
          <SplitTextMask 
            text="The Annual Techno-Management Fest of" 
            itemClass="hero-subtitle-word"
          />
          
          <div className="overflow-hidden py-1 mt-1">
            <div className="hero-title-word translate-y-[110%] hero-title-shimmer font-elnath py-1 text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-wider bg-gradient-to-r from-white via-white via-[45%] via-amber-200/80 via-[50%] to-white to-[55%] bg-clip-text text-transparent bg-[length:250%_auto] drop-shadow-[0_0_6px_rgba(253,230,138,0.4)]">
              Jadavpur University
            </div>
          </div>

        </h2>
      </div>

      <article className="grid py-2 relative z-10 w-full lg:w-max justify-items-center mt-8 lg:mt-56 lg:mr-10 xl:mr-16">
        
        <h3 className="hero-right-lines w-full py-1 border-t-[1.5px] border-b-[1.5px] border-transparent text-lg md:text-xl lg:text-2xl font-bold text-center tracking-wide overflow-hidden flex justify-center">
          <SplitTextMask 
            text="Time Remaining" 
            itemClass="hero-right-word"
          />
        </h3>

        <div className="hero-countdown py-2 opacity-0">
          <Countdown targetDate={new Date("2026-04-09T10:00:00").getTime()} />
        </div>

        <p className="text-lg md:text-xl lg:text-2xl font-elnath pb-2 text-center uppercase tracking-widest flex justify-center">
          <SplitTextMask 
            text="9 - 12 April, 2026" 
            itemClass="hero-right-word"
          />
        </p>

        <div className="pulse-btn-container mt-2 opacity-0">
          <Clickable
            as="a"
            href="/events"
            className="pulse-btn group relative overflow-hidden justify-self-center w-fit! h-[40px]! lg:h-[45px]! px-8! lg:px-10! uppercase bg-red hover:bg-red-500 hover:scale-105 active:scale-95 transition-all duration-300 ease-out font-bold tracking-widest text-base lg:text-lg"
          >
            <span className="absolute inset-0 w-full h-full -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
            <span className="relative z-10">Find events!</span>
          </Clickable>
        </div>
      </article>
    </section>
  );
}