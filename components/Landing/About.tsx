"use client";

import { AnimatedSectionTitle } from "./AnimatedSectionTitle";

export const About = () => {
  return (
    <section className="w-full overflow-hidden pt-20 pb-10 flex flex-col gap-16 sm:gap-24 relative z-10">
      {/* Jadavpur University Section */}
      <div className="flex flex-col gap-6 lg:gap-8">
        <div className="flex flex-col ml-10 sm:ml-18 lg:ml-24 gap-1 sm:gap-2">
          <AnimatedSectionTitle
            text="ABOUT"
            className="p-0 font-elnath text-2xl sm:text-3xl md:text-5xl lg:text-6xl uppercase tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] text-amber-200/90 flex justify-start"
          />
          <AnimatedSectionTitle
            text="JADAVPUR UNIVERSITY"
            className="p-0 font-elnath text-2xl sm:text-3xl md:text-5xl lg:text-6xl uppercase tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] text-amber-200/90 flex justify-start"
          />
        </div>
        <div className="font-euclid text-base sm:text-lg md:text-xl lg:text-[22px] text-white/80 leading-relaxed max-w-5xl mx-10 sm:mx-18 lg:mx-24 justify-start">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>

      {/* Srijan Section */}
      <div className="flex flex-col gap-6 lg:gap-8">
        <AnimatedSectionTitle
          text="ABOUT SRIJAN"
          className="p-0 font-elnath text-2xl sm:text-3xl md:text-5xl lg:text-6xl uppercase tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] text-amber-200/90 mr-10 flex sm:mr-18 lg:mr-24 justify-end text-right"
        />
        <div className="font-euclid text-base sm:text-lg md:text-xl lg:text-[22px] text-white/80 leading-relaxed max-w-5xl mr-10 sm:mr-18 lg:mr-24 self-end text-right">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    </section>
  );
};
