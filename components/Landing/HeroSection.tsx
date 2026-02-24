import Image from "next/image";
import { Clickable } from "@/components/Clickable";
import { Countdown } from "@/components/Landing/Countdown";

export function HeroSection() {
  return (
    <section className="w-full h-[100dvh] pt-24 pb-12 lg:py-16 px-4 sm:px-8 lg:px-6 xl:px-8 flex flex-col justify-center lg:flex-row lg:items-center lg:justify-between overflow-hidden">
      {/* Left section: Logo and Title */}
      <div className="flex flex-col items-center lg:items-start text-center lg:text-left z-10 w-full lg:w-max lg:-mt-90 -mt-40">
        <Image
          src="/images/srijan-wide-icon.svg"
          alt="A wide layout logo for Srijan'26"
          height={200}
          width={460}
          className="max-w-[85vw] lg:max-w-full lg:w-[500px] h-auto -ml-2 lg:ml-0"
          priority
        />
        <h2 className="py-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl mt-1 font-light tracking-wide lg:ml-2">
          The Annual Techno-Management Fest of{" "}
          <div className="font-elnath py-1 text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-wider">
            Jadavpur University
          </div>
        </h2>
      </div>

      {/* Right section: Countdown, dates and button */}
      <article className="grid py-2 relative z-10 w-full lg:w-max justify-items-center mt-8 lg:mt-56 lg:mr-10 xl:mr-16">
        <h3 className="w-full py-1 border-t-[1.5px] border-b-[1.5px] border-white/80 text-lg md:text-xl lg:text-2xl font-bold text-center tracking-wide">
          Time Remaining
        </h3>
        <div className="py-2">
          <Countdown targetDate={new Date("2026-04-09T10:00:00").getTime()} />
        </div>
        <p className="text-lg md:text-xl lg:text-2xl font-elnath pb-2 text-center uppercase tracking-widest">
          9 - 12 April, 2026
        </p>
        <Clickable
          as="a"
          href="/events"
          className="group relative overflow-hidden justify-self-center w-fit! h-[40px]! lg:h-[45px]! px-8! lg:px-10! uppercase bg-red hover:bg-red-500 hover:scale-105 hover:drop-shadow-[0_0_20px_rgba(240,0,0,0.6)] active:scale-95 transition-all duration-300 ease-out mt-2 font-bold tracking-widest text-base lg:text-lg"
        >
          <span className="absolute inset-0 w-full h-full -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
          <span className="relative z-10">Find events!</span>
        </Clickable>
      </article>
    </section>
  );
}
