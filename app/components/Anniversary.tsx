"use client";

import { motion, useScroll, useTransform, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

const imgZoom: Variants = {
    blurred: { scale: 1, opacity: 1 },
    revealed: { scale: 1.05, opacity: 1, transition: { duration: 12, ease: "easeOut" } },
};

const lines = [
    "One month…",
    "Of togetherness…",
    "Celebrated a day early…",
    "Because time had other plans…",
    "But love made it special anyway.",
];

export default function Anniversary() {
    const [revealed, setRevealed] = useState(false);
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

    return (
        <section
            ref={ref}
            className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black cursor-pointer select-none"
            onClick={() => !revealed && setRevealed(true)}
        >
            {/* Background image — parallax + zoom on reveal */}
            <motion.div
                className="absolute inset-0 z-0 origin-center"
                style={{ y }}
                variants={imgZoom}
                initial="blurred"
                animate={revealed ? "revealed" : "blurred"}
            >
                <Image
                    src="/images/anniversary/anniversary-hero.webp"
                    alt="Anniversary celebration"
                    fill
                    className="object-cover"
                    sizes="100vw"
                    quality={75}
                    priority={false}
                />
                {/* Blur overlay — fades out on reveal */}
                <motion.div
                    className="absolute inset-0 backdrop-blur-xl bg-black/20"
                    animate={{ opacity: revealed ? 0 : 1 }}
                    transition={{ duration: 1.8, ease: "easeOut" }}
                />
            </motion.div>

            {/* Warm tint */}
            <div className="absolute inset-0 z-10 bg-amber-900/20 mix-blend-overlay pointer-events-none" />
            {/* Bottom gradient */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
            {/* Vignette */}
            <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(0,0,0,0.45)_100%)]" />

            {/* PRE-REVEAL state — centered prompt */}
            <AnimatePresence>
                {!revealed && (
                    <motion.div
                        key="prompt"
                        className="relative z-20 text-center flex flex-col items-center gap-5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <p className="text-2xl md:text-3xl font-light tracking-widest text-white/80">
                            One moment…
                        </p>
                        <motion.p
                            className="text-xs tracking-[0.35em] uppercase text-white/40"
                            animate={{ opacity: [0.3, 0.8, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            Tap to reveal
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* POST-REVEAL state — sequential text lines */}
            <AnimatePresence>
                {revealed && (
                    <motion.div
                        key="story"
                        className="relative z-20 text-center px-6 flex flex-col items-center gap-4 md:gap-5 max-w-2xl"
                        initial="hidden"
                        animate="visible"
                    >
                        {lines.map((text, i) => {
                            const isLast = i === lines.length - 1;
                            const delay = i * 0.9;
                            return (
                                <motion.p
                                    key={text}
                                    initial={{ opacity: 0, y: 28 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1.3, ease: "easeOut", delay }}
                                    className={
                                        isLast
                                            ? "text-xl md:text-2xl font-medium tracking-widest text-[#E6D5B8] mt-3 drop-shadow-[0_0_18px_rgba(230,213,184,0.3)]"
                                            : "text-lg md:text-xl font-light tracking-wide text-white/85 drop-shadow-md"
                                    }
                                >
                                    {text}
                                </motion.p>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
