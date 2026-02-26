"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function ComingSoon() {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const dotsRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const words = titleRef.current?.querySelectorAll("[data-word]");
            const dotSpans = dotsRef.current?.querySelectorAll("span");
            if (!words?.length || !lineRef.current || !textRef.current || !dotSpans?.length) return;

            // Set initial hidden states
            gsap.set(words, { y: "110%" });
            gsap.set(lineRef.current, { scaleX: 0 });
            gsap.set(textRef.current, { opacity: 0, y: 30, filter: "blur(6px)" });
            gsap.set(dotSpans, { opacity: 0, scale: 0 });

            // Simple mount animation -- no scrolltrigger needed
            const tl = gsap.timeline({ delay: 0.15 });

            tl.to(words, {
                y: "0%",
                duration: 2,
                stagger: 0.05,
                ease: "expo.out",
            })
                .to(
                    lineRef.current,
                    { scaleX: 1, duration: 0.6, ease: "power2.out" },
                    "-=1.6"
                )
                .to(
                    textRef.current,
                    {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        duration: 0.5,
                        ease: "power3.out",
                    },
                    "-=1.2"
                )
                .to(
                    dotSpans,
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 0.4,
                        stagger: 0.15,
                        ease: "back.out(3)",
                        onComplete: () => {
                            gsap.to(dotSpans, {
                                opacity: 0.3,
                                duration: 0.8,
                                stagger: { each: 0.2, repeat: -1, yoyo: true },
                                ease: "sine.inOut",
                            });
                        },
                    },
                    "-=0.8"
                );
        },
        { scope: containerRef }
    );

    const titleText = "COMING SOON";

    return (
        <section
            ref={containerRef}
            className="w-full py-24 sm:py-32 lg:py-40 flex flex-col items-center gap-8 relative z-10"
        >
            {/* Section Title */}
            <h2
                ref={titleRef}
                className="text-4xl md:text-5xl lg:text-7xl font-elnath text-yellow flex justify-center text-center"
            >
                <span className="inline-flex flex-wrap justify-[inherit]">
                    {titleText.split(" ").map((word, i) => (
                        <span key={i} className="overflow-hidden inline-block pb-1 mr-[0.3em]">
                            <span data-word className="inline-block translate-y-[110%] pb-1">
                                {word}
                            </span>
                        </span>
                    ))}
                </span>
            </h2>

            {/* Decorative line */}
            <div
                ref={lineRef}
                className="w-24 sm:w-32 h-[2px] bg-gradient-to-r from-transparent via-yellow to-transparent origin-center"
            />

            {/* Subtitle */}
            <p
                ref={textRef}
                className="font-euclid text-lg sm:text-xl md:text-2xl text-white/60 tracking-widest uppercase text-center px-4"
            >
                Something exciting is in the works
            </p>

            {/* Animated dots */}
            <div ref={dotsRef} className="flex gap-3 mt-2">
                <span className="block w-2.5 h-2.5 rounded-full bg-yellow" />
                <span className="block w-2.5 h-2.5 rounded-full bg-yellow" />
                <span className="block w-2.5 h-2.5 rounded-full bg-yellow" />
            </div>
        </section>
    );
}
