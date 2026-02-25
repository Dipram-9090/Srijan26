"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
  wrap,
  animate,
} from "motion/react";
import { AnimatedSectionTitle } from "./AnimatedSectionTitle";

export const MarqueeSlider = ({
  name,
  children,
  titleAlignment = "left",
  baseSpeed = 0.05,
}: {
  name: string;
  itemCount: number;
  children: React.ReactNode;
  titleAlignment?: "left" | "right";
  baseSpeed?: number;
}) => {
  const baseX = useMotionValue(0);
  const dragRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const velocity = useRef(-baseSpeed); 
  const x = useTransform(baseX, (v) => `${wrap(0, -50, v)}%`);

  useAnimationFrame((t, delta) => {
    const timeScale = delta / 16.66; // dont change this value

    if (!isDragging.current) {
      velocity.current += (-baseSpeed - velocity.current) * 0.03 * timeScale;
    }

    baseX.set(baseX.get() + velocity.current * timeScale);
  });

  return (
    <section className="full-bleed pt-30 overflow-hidden w-full">
      <AnimatedSectionTitle
        text={name}
        className={`p-0 font-elnath text-2xl sm:text-3xl md:text-5xl lg:text-6xl uppercase tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] text-amber-200/90 mb-10 sm:mb-16 flex ${
          titleAlignment === "left"
            ? "ml-10 sm:ml-18 lg:ml-24 justify-start"
            : "mr-10 sm:mr-18 lg:mr-24 justify-end"
        }`}
      />

      {/* The Draggable Track */}
      <motion.div
        className="flex cursor-grab active:cursor-grabbing w-fit touch-none"
        style={{ x }}
        onPanSessionStart={() => {
          isDragging.current = true;
        }}
        onPan={(e, info) => {
          if (!dragRef.current) return;
          const containerWidth = dragRef.current.offsetWidth;
          
          const deltaPercentage = (info.delta.x / containerWidth) * 100;
          baseX.set(baseX.get() + deltaPercentage);

          velocity.current = deltaPercentage; 
        }}
        onPanEnd={(e, info) => {
          isDragging.current = false;
          if (!dragRef.current) return;

          const containerWidth = dragRef.current.offsetWidth;
          
          const velocityPercentagePerSecond = (info.velocity.x / containerWidth) * 100;
          velocity.current = velocityPercentagePerSecond / 60;
        }}
        ref={dragRef}
      >
        <ul className="flex shrink-0 w-[max-content]">{children}</ul>
        <ul className="flex shrink-0 w-[max-content]">{children}</ul>
      </motion.div>
    </section>
  );
};
