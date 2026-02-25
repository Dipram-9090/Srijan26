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
          <p className="mb-4">
            Founding members of National Council of Bengal, in 1906 set the goal &quot;To achieve self reliance through empowerment of Youth by imparting Best of Global Knowledge&quot;, and Jadavpur University, founded on 24th December 1955, continues to do the same today.
          </p>
          <p>
            The university&apos;s commitment to research, innovation, community engagement, a legendary network of alumnus, and its unwavering contribution to imparting knowledge and refining the taste of culture and technology has marked its distinguished reputation not only in the Indian subcontinent but also at an international level.
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
          <p className="mb-4">
            In the heart of Kolkata, where passion ignites, Srijan flourishes — an annual tribute to creativity and excellence, cradled by Jadavpur. From its inception in 2007 as a humble spark, it has flourished into an spectacular festival of technology and management.
          </p>
          <p>
            In this four-day spectacle, Srijan transcends from being merely a festival, it becomes a chorus of the most brilliant minds, echoing through the halls of Jadavpur&apos;s heritage. Join us at Jadavpur University to engage in 35+ events ranging from Coding Competitions, B-Plan competitions, Case Studies, Equity Research Events, Robotics Competitions, Web Design, Rap Battles and many more to have an experience of a lifetime.
          </p>
        </div>
      </div>
    </section>
  );
};
