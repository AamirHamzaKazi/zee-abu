"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { useScroll, useTransform } from "framer-motion";

// ── Images ────────────────────────────────────────────────────────────────
const heroImg = "/images/anniversary/anniversary-hero.webp";
const bikeImg = "/images/anniversary/bike-ride.webp";
const candle1Img = "/images/anniversary/candle-night-1.webp";
const candle2Img = "/images/anniversary/candle-night-2.webp";

// ── Animation helpers ─────────────────────────────────────────────────────
const fadeUp = (delay: number): Variants => ({
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.4, ease: "easeOut", delay } },
});

const imgReveal: Variants = {
    hidden: { scale: 1.06, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 2.4, ease: "easeOut" } },
};

const imgZoom: Variants = {
    hidden: { scale: 1, opacity: 0.5 },
    visible: { scale: 1.05, opacity: 1, transition: { duration: 12, ease: "easeOut" } },
};

// ── Reveal slide data ─────────────────────────────────────────────────────
const revealLines = [
    "One month…",
    "Of togetherness…",
    "Celebrated a day early…",
    "Because time had other plans…",
    "But love made it special anyway.",
];

// ── Extra slides after reveal ─────────────────────────────────────────────
type ExtraSlide =
    | { kind: "text"; lines: { text: string; gold?: boolean }[] }
    | { kind: "image"; src: string; alt: string; lines: { text: string; gold?: boolean }[] };

const extraSlides: ExtraSlide[] = [
    {
        kind: "text",
        lines: [
            { text: "And the night didn't end there…" },
            { text: "They held on… a little longer." },
        ],
    },
    {
        kind: "image",
        src: bikeImg,
        alt: "A quiet bike ride together",
        lines: [
            { text: "A quiet ride…" },
            { text: "Just the two of them." },
        ],
    },
    {
        kind: "image",
        src: candle1Img,
        alt: "Candlelight dinner",
        lines: [
            { text: "A moment of peace…" },
            { text: "Before everything changed." },
        ],
    },
    {
        kind: "image",
        src: candle2Img,
        alt: "Candlelight dinner closeup",
        lines: [
            { text: "Not a perfect day…" },
            { text: "But a perfect memory.", gold: true },
        ],
    },
];

// ── Hero reveal slide ─────────────────────────────────────────────────────
function AnniversaryHero() {
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
            {/* Background */}
            <motion.div
                className="absolute inset-0 z-0 origin-center"
                style={{ y }}
                variants={imgZoom}
                initial="hidden"
                animate={revealed ? "visible" : "hidden"}
                whileInView={revealed ? undefined : "visible"}
                viewport={{ once: true, amount: 0.2 }}
            >
                <Image src={heroImg} alt="Anniversary celebration" fill className="object-cover" sizes="100vw" quality={75} />
                {/* Blur overlay */}
                <motion.div
                    className="absolute inset-0 backdrop-blur-xl bg-black/20"
                    animate={{ opacity: revealed ? 0 : 1 }}
                    transition={{ duration: 1.8, ease: "easeOut" }}
                />
            </motion.div>

            {/* Overlays */}
            <div className="absolute inset-0 z-10 bg-amber-900/20 mix-blend-overlay pointer-events-none" />
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
            <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(0,0,0,0.45)_100%)]" />

            {/* Pre-reveal prompt */}
            <AnimatePresence>
                {!revealed && (
                    <motion.div
                        key="prompt"
                        className="relative z-20 text-center flex flex-col items-center gap-5"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <p className="text-2xl md:text-3xl font-light tracking-widest text-white/80">One moment…</p>
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

            {/* Post-reveal text */}
            <AnimatePresence>
                {revealed && (
                    <motion.div
                        key="story"
                        className="relative z-20 text-center px-6 flex flex-col items-center gap-4 md:gap-5 max-w-2xl"
                    >
                        {revealLines.map((text, i) => (
                            <motion.p
                                key={text}
                                initial={{ opacity: 0, y: 28 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.3, ease: "easeOut", delay: i * 0.9 }}
                                className={
                                    i === revealLines.length - 1
                                        ? "text-xl md:text-2xl font-medium tracking-widest text-[#E6D5B8] mt-3 drop-shadow-[0_0_18px_rgba(230,213,184,0.3)]"
                                        : "text-lg md:text-xl font-light tracking-wide text-white/85 drop-shadow-md"
                                }
                            >
                                {text}
                            </motion.p>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

// ── Extra slides ──────────────────────────────────────────────────────────
function ExtraSlideView({ slide }: { slide: ExtraSlide }) {
    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
            {slide.kind === "image" && (
                <motion.div
                    className="absolute inset-0 z-0"
                    variants={imgReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.4 }}
                >
                    <Image src={slide.src} alt={slide.alt} fill className="object-cover opacity-60" sizes="100vw" quality={70} />
                    <div className="absolute inset-0 bg-amber-900/15 mix-blend-overlay" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/30" />
                </motion.div>
            )}

            {/* Vignette */}
            <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(0,0,0,0.5)_100%)]" />

            {/* Text */}
            <motion.div
                className="relative z-20 text-center px-6 flex flex-col items-center gap-4 md:gap-6 max-w-xl"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
            >
                {slide.lines.map(({ text, gold }, li) => (
                    <motion.p
                        key={li}
                        variants={fadeUp(li * 0.65)}
                        className={
                            gold
                                ? "text-2xl md:text-3xl font-medium tracking-widest text-[#E6D5B8] drop-shadow-[0_0_20px_rgba(230,213,184,0.35)] uppercase"
                                : "text-xl md:text-2xl font-light tracking-widest text-white/88"
                        }
                    >
                        {text}
                    </motion.p>
                ))}
            </motion.div>
        </section>
    );
}

// ── Main export ───────────────────────────────────────────────────────────
export default function Anniversary() {
    return (
        <>
            <AnniversaryHero />
            {extraSlides.map((slide, i) => (
                <ExtraSlideView key={i} slide={slide} />
            ))}
        </>
    );
}
