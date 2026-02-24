"use client";

import { useState } from "react";
import { MarqueeSlider } from "./MarqueeSlider";

const SPEAKERS = [
  {
    image: "/images/speakers/aman_dhattarwal.jpg",
    name: "Aman Dhattarwal",
    description: "Influential Educator, Entrepreneur & Founder of Apna College",
  },
  {
    image: "/images/speakers/amitabh-singh.png",
    name: "Amitabh Singh",
    description: "Project Manager Chandrayaan-1 & Operations Director Chandrayaan-3, ISRO",
  },
  {
    image: "/images/speakers/debiprosad_duari.jpg",
    name: "Debiprosad Duari",
    description: "Renowned Astronomer & Former Director of M.P. Birla Planetarium",
  },
  {
    image: "/images/speakers/dr_gajendra_purohit.jpg",
    name: "Dr. Gajendra Purohit",
    description: "Distinguished Mathematician, Educator & Founder of MathsCare",
  },
  {
    image: "/images/speakers/gaurav_sen.jpg",
    name: "Gaurav Sen",
    description: "System Design Expert & Founder of InterviewReady",
  },
  {
    image: "/images/speakers/raj_vikramaditya.jpg",
    name: "Raj Vikramaditya (Striver)",
    description: "Ex-Google Software Engineer & Founder of TakeUForward",
  },
  {
    image: "/images/speakers/rajit_bhattacharya.jpg",
    name: "Rajit Bhattacharya",
    description: "Co-Founder & CEO of Data Sutram",
  },
  {
    image: "/images/speakers/sabyasachi_biswas.jpg",
    name: "Sabyasachi Biswas",
    description: "Senior Vice President of Digital Transformation at Vikram Solar",
  },
  {
    image: "/images/speakers/shibaji_paul.jpg",
    name: "Shibaji Paul",
    description: "Computer Science Educator & Renowned Travel Vlogger",
  },
  {
    image: "/images/speakers/soumita_roy_choudhury.png",
    name: "Soumita Roy Choudhury",
    description: "Tech Leader & Global Revenue Executive at Mobilewalla",
  },
];

export const PastSpeakers = () => {
  const [activeSpeaker, setActiveSpeaker] = useState<number | null>(null);

  const handleInteraction = (index: number) => {
    setActiveSpeaker(activeSpeaker === index ? null : index);
  };

  return (
    <MarqueeSlider name="Past Speakers" titleAlignment="right" itemCount={SPEAKERS.length}>
      {SPEAKERS.map((speaker, index) => {
        const isActive = activeSpeaker === index;

        return (
          <li
            key={`${speaker.name}-${index}`}
            onClick={() => handleInteraction(index)}
            onMouseEnter={() => setActiveSpeaker(index)}
            onMouseLeave={() => setActiveSpeaker(null)}
            className={`group relative flex-shrink-0 w-[240px] h-[320px] sm:w-[330px] sm:h-[440px] lg:w-[420px] lg:h-[560px] mx-3 sm:mx-5 lg:mx-8 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-md border transition-colors duration-500 flex flex-col cursor-pointer ${
              isActive ? "border-amber-500/50" : "border-white/10"
            }`}
          >
            <div className="relative h-full w-full overflow-hidden">
              <div
                className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 ${
                  isActive ? "scale-110" : "scale-100"
                }`}
                style={{ backgroundImage: `url(${speaker.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
            </div>

            <div
              className={`absolute bottom-0 left-0 w-full p-4 sm:p-6 lg:p-8 flex flex-col justify-end transition-transform duration-500 ${
                isActive ? "translate-y-0" : "translate-y-4"
              }`}
            >
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 lg:mb-2 text-shadow-sm">
                {speaker.name}
              </h3>
              <p
                className={`text-xs sm:text-sm lg:text-base text-gray-300 transition-opacity duration-500 delay-100 ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              >
                {speaker.description}
              </p>
            </div>
          </li>
        );
      })}
    </MarqueeSlider>
  );
};
