"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";

// ── Images ────────────────────────────────────────────────────────────────
const duaImg = "/images/before umrah/dua-made-before-wedding.webp";
const handsImg = "/images/umrah/umrah-hands-in-hands.webp";
const seeoffImg = "/images/umrah/umrah-seeoff.webp";
const umrah1 = "/images/umrah/umrah-1.webp";

// ── Slide definitions ─────────────────────────────────────────────────────
type Slide =
    | { kind: "text"; lines: { text: string; gold?: boolean }[] }
    | { kind: "image"; src: string; alt: string; lines: { text: string; gold?: boolean }[]; tint?: string };

const slides: Slide[] = [
    {
        kind: "text",
        lines: [
            { text: "Before everything…" },
            { text: "There was a dua." },
        ],
    },
    {
        kind: "image",
        src: duaImg,
        alt: "Paper with names in calligraphy under the Kaaba",
        tint: "bg-amber-950/30",
        lines: [
            { text: "A name written…" },
            { text: "In front of the Sabz Gumbad." },
        ],
    },
    {
        kind: "text",
        lines: [
            { text: "At that moment…" },
            { text: "It was a wish." },
        ],
    },
    {
        kind: "text",
        lines: [
            { text: "But Allah had already written the story.", gold: true },
        ],
    },
    {
        kind: "image",
        src: handsImg,
        alt: "Two hands holding each other",
        lines: [
            { text: "Two hands…" },
            { text: "One promise." },
        ],
    },
    {
        kind: "image",
        src: seeoffImg,
        alt: "Family sending off at the airport",
        lines: [
            { text: "Smiles…" },
            { text: "And tears." },
        ],
    },
    {
        kind: "image",
        src: umrah1,
        alt: "Together at Umrah",
        lines: [
            { text: "The same place…" },
            { text: "But this time —" },
        ],
    },
    {
        kind: "text",
        lines: [
            { text: "Not a dua…" },
            { text: "But a reality." },
        ],
    },
    {
        kind: "text",
        lines: [
            { text: "A dua answered.", gold: true },
            { text: ".الحمد لله رب العالمين", gold: true },
        ],
    },
];

// ── Variants ──────────────────────────────────────────────────────────────
const fadeUp = (delay: number): Variants => ({
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.4, ease: "easeOut", delay } },
});

const imgZoom: Variants = {
    hidden: { scale: 1.06, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 2.2, ease: "easeOut" } },
};

// ── Component ─────────────────────────────────────────────────────────────
export default function Umrah() {
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
                                className="object-cover opacity-55"
                                sizes="100vw"
                                quality={70}
                            />
                            {slide.tint && <div className={`absolute inset-0 ${slide.tint} mix-blend-color`} />}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />
                        </motion.div>
                    )}

                    {/* Text block */}
                    <motion.div
                        className="relative z-20 text-center px-6 flex flex-col items-center gap-4 md:gap-6"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                    >
                        {slide.lines.map(({ text, gold }, li) => (
                            <motion.p
                                key={li}
                                variants={fadeUp(li * 0.6)}
                                className={
                                    gold
                                        ? "text-2xl md:text-4xl font-medium tracking-widest text-[#E6D5B8] drop-shadow-[0_0_20px_rgba(230,213,184,0.35)] uppercase"
                                        : "text-xl md:text-3xl font-light tracking-widest text-white/90"
                                }
                            >
                                {text}
                            </motion.p>
                        ))}

                        {/* Progress dots */}
                        <motion.div
                            variants={fadeUp(slide.lines.length * 0.6 + 0.3)}
                            className="flex gap-1.5 mt-6"
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

                    {/* Vignette */}
                    <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(0,0,0,0.55)_100%)]" />
                </section>
            ))}
        </>
    );
}
