"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const line1Variant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut", delay: 0.2 }
  }
};

const line2Variant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut", delay: 0.4 }
  }
};

const slowZoomVariant: Variants = {
  hidden: { scale: 1 },
  visible: {
    scale: 1.08,
    transition: { duration: 10, ease: "easeOut" }
  }
};

const scrollIndicatorVariant: Variants = {
  animate: {
    y: [0, 8, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export default function Intro() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Image Container */}
      <motion.div
        className="absolute inset-0 w-full h-full origin-center"
        style={{ y }}
        variants={slowZoomVariant}
        initial="hidden"
        animate="visible"
      >
        <Image
          src="/images/hero/zee-abu-hero.png"
          alt="Zee and Abu"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Overlays */}
      {/* 1. Base Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />
      {/* 2. Vignette Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.6)_100%)] z-10" />
      {/* 3. Bottom Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10" />

      {/* Main Content Area (Bottom Left) */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end px-6 pb-16 md:px-12 md:pb-24">
        <motion.div
          className="flex flex-col space-y-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.p
            variants={line1Variant}
            className="text-sm md:text-base tracking-widest uppercase text-white/80 drop-shadow-md"
          >
            Happy One Month Anniversary
          </motion.p>
          <motion.h1
            variants={line2Variant}
            className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-wide text-white drop-shadow-xl"
          >
            Zee ❤️ Abu
          </motion.h1>
        </motion.div>
      </div>

      {/* Scroll Indicator (Bottom Center) */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
        variants={scrollIndicatorVariant}
        animate="animate"
      >
        <span className="text-white/50 text-xs tracking-widest uppercase mb-2">Scroll</span>
        <div className="w-[1px] h-8 bg-white/40" />
      </motion.div>
    </section>
  );
}
