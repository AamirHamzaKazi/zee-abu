"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";

// ── Images ────────────────────────────────────────────────────────────────
const ajmerImages = [
    "/images/ajmer/ajmer-1.webp",
    "/images/ajmer/ajmer-2.webp",
    "/images/ajmer/ajmer-3.webp",
    "/images/ajmer/ajmer-4.webp",
];

// ── Slide definitions ─────────────────────────────────────────────────────
type Slide =
    | { kind: "text"; lines: { text: string; gold?: boolean }[] }
    | { kind: "image"; src: string; alt: string; lines: { text: string; gold?: boolean }[]; tint?: string };

const slides: Slide[] = [
    // Bridge from Return
    {
        kind: "text",
        lines: [
            { text: "They had just returned…" },
            { text: "From a journey close to Allah…" },
        ],
    },
    {
        kind: "text",
        lines: [
            { text: "But the journey…", },
            { text: "wasn't over yet.", gold: true },
        ],
    },
    // Ajmer chapter
    {
        kind: "text",
        lines: [
            { text: "Sometimes…" },
            { text: "You don't plan the journey." },
        ],
    },
    {
        kind: "image",
        src: ajmerImages[0],
        alt: "Ajmer Sharif",
        tint: "bg-amber-950/25",
        lines: [
            { text: "And they were called…" },
            { text: "To another sacred place." },
        ],
    },
    {
        kind: "image",
        src: ajmerImages[1],
        alt: "Ajmer blessing",
        tint: "bg-amber-950/20",
        lines: [
            { text: "A place of peace…" },
            { text: "Of blessings." },
        ],
    },
    {
        kind: "image",
        src: ajmerImages[2],
        alt: "Ajmer peaceful moment",
        tint: "bg-amber-950/20",
        lines: [
            { text: "Where hearts don't speak…" },
            { text: "But are understood." },
        ],
    },
    {
        kind: "image",
        src: ajmerImages[3],
        alt: "Ajmer final moment",
        tint: "bg-amber-950/20",
        lines: [],
    },
    // Closing
    {
        kind: "text",
        lines: [
            { text: "Some journeys…" },
            { text: "Are written for you.", gold: true },
        ],
    },
];

// ── Variants ──────────────────────────────────────────────────────────────
const fadeUp = (delay: number): Variants => ({
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.5, ease: "easeOut", delay } },
});

const imgZoom: Variants = {
    hidden: { scale: 1.06, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 2.4, ease: "easeOut" } },
};

// ── Component ─────────────────────────────────────────────────────────────
export default function Ajmer() {
    return (
        <>
            {slides.map((slide, si) => (
                <section
                    key={si}
                    className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black"
                >
                    {/* Background image */}
                    {slide.kind === "image" && (
                        <motion.div
                            className="absolute inset-0 z-0"
                            variants={imgZoom}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.4 }}
                        >
                            <Image
                                src={slide.src}
                                alt={slide.alt}
                                fill
                                className="object-cover opacity-60"
                                sizes="100vw"
                                quality={70}
                            />
                            {slide.tint && <div className={`absolute inset-0 ${slide.tint} mix-blend-color`} />}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/30" />
                        </motion.div>
                    )}

                    {/* Vignette */}
                    <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(0,0,0,0.5)_100%)]" />

                    {/* Text block */}
                    {slide.lines.length > 0 && (
                        <motion.div
                            className="relative z-20 text-center px-6 flex flex-col items-center gap-4 md:gap-6"
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
                                            ? "text-2xl md:text-4xl font-medium tracking-widest text-[#E6D5B8] drop-shadow-[0_0_20px_rgba(230,213,184,0.35)] uppercase"
                                            : "text-xl md:text-3xl font-light tracking-widest text-white/88"
                                    }
                                >
                                    {text}
                                </motion.p>
                            ))}

                            {/* Progress dots */}
                            <motion.div
                                variants={fadeUp(slide.lines.length * 0.65 + 0.3)}
                                className="flex gap-1.5 mt-5"
                            >
                                {slides.map((_, di) => (
                                    <span
                                        key={di}
                                        className={`block rounded-full transition-all duration-500 ${di === si ? "w-4 h-1 bg-white/60" : "w-1 h-1 bg-white/20"
                                            }`}
                                    />
                                ))}
                            </motion.div>
                        </motion.div>
                    )}
                </section>
            ))}
        </>
    );
}
