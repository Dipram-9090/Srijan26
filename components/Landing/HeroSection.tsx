"use client";

import { useRef } from "react";
import Image from "next/image";
import { Clickable } from "@/components/Clickable";
import { Countdown } from "@/components/Landing/Countdown";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function HeroSection() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ 
      defaults: { ease: "power3.out" },
      onComplete: () => {
        gsap.to(".hero-title-word", {
          backgroundPosition: "200% center", 
          duration: 2.2, 
          ease: "power1.inOut", 
          repeat: -1,
        });

        gsap.to(".pulse-btn", {
          boxShadow: "0px 0px 25px 4px rgba(220, 38, 38, 0.4)", 
          duration: 2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });


      }
    });

    tl.fromTo(
      ".hero-logo",
      { opacity: 0, scale: 1.05, filter: "blur(8px)" },
      { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.8, ease: "power2.out" }
    )
    .fromTo(
      ".hero-subtitle",
      { opacity: 0, y: 15 }, 
      { opacity: 1, y: 0, duration: 1.2 },
      "-=1.2" 
    )
    .fromTo(
      ".hero-title-word",
      { opacity: 0, letterSpacing: "8px" }, 
      { opacity: 1, letterSpacing: "normal", duration: 1.5, ease: "power3.out" },
      "-=0.8"
    )
    .fromTo(
      ".hero-right-item",
      { opacity: 0, x: 40 },
      { opacity: 1, x: 0, duration: 0.8, stagger: 0.15, ease: "back.out(1.2)" }, 
      "-=1"
    );

  }, { scope: containerRef });

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
        <h2 className="py-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl mt-1 font-light tracking-wide lg:ml-2">
          <span className="hero-subtitle inline-block">The Annual Techno-Management Fest of</span>{" "}
          
          <div className="hero-title-word font-elnath py-1 text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-wider bg-gradient-to-r from-white via-white via-[45%] via-amber-200/80 via-[50%] to-white to-[55%] bg-clip-text text-transparent bg-[length:250%_auto] drop-shadow-[0_0_6px_rgba(253,230,138,0.4)]">
            Jadavpur University
          </div>
        </h2>
      </div>

      <article className="grid py-2 relative z-10 w-full lg:w-max justify-items-center mt-8 lg:mt-56 lg:mr-10 xl:mr-16">
        <h3 className="hero-right-item w-full py-1 border-t-[1.5px] border-b-[1.5px] border-white/80 text-lg md:text-xl lg:text-2xl font-bold text-center tracking-wide">
          Time Remaining
        </h3>
        
        <div className="hero-right-item py-2">
          <Countdown targetDate={new Date("2026-04-09T10:00:00").getTime()} />
        </div>
        
        <p className="hero-right-item text-lg md:text-xl lg:text-2xl font-elnath pb-2 text-center uppercase tracking-widest">
          9 - 12 April, 2026
        </p>
        
        <div className="hero-right-item mt-2">`
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
