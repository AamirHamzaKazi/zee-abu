"use client";

import { motion, Variants } from "framer-motion";

const fadeUp = (delay: number): Variants => ({
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.6, ease: "easeOut", delay } },
});

const groups = [
    {
        lines: [
            { text: "And this is just the beginning…", gold: false },
        ],
    },
    {
        lines: [
            { text: "Of a life filled with love…", gold: false },
            { text: "Patience…", gold: false },
            { text: "And endless memories.", gold: false },
        ],
    },
    {
        lines: [
            { text: "May Allah bless your journey together…", gold: false },
            { text: "Protect your bond…", gold: false },
            { text: "And fill your lives with peace and happiness.", gold: false },
        ],
    },
    {
        lines: [
            { text: "And no matter where life takes you…", gold: false },
            { text: "My duas will always be with you.", gold: false },
        ],
    },
];

// flatten so we can compute cumulative delays
const allLines: { text: string; gold: boolean; delay: number }[] = [];
let cumulativeDelay = 0;

groups.forEach((group, gi) => {
    if (gi > 0) cumulativeDelay += 1.0; // pause between groups
    group.lines.forEach((line) => {
        allLines.push({ ...line, delay: cumulativeDelay });
        cumulativeDelay += 0.75;
    });
});

// Final line gets an extra pause + gold treatment
const finalDelay = cumulativeDelay + 1.4;

export default function Final() {
    return (
        <section className="relative min-h-screen w-full flex flex-col items-center justify-center bg-black overflow-hidden px-6 py-24">

            {/* Subtle radial glow at center */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(230,213,184,0.04)_0%,_transparent_70%)]" />

            {/* All story lines */}
            <motion.div
                className="relative z-10 flex flex-col items-center gap-4 md:gap-5 text-center max-w-xl"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                {allLines.map(({ text, delay }, i) => {
                    const isGroupStart = groups.some(
                        (g) => g.lines[0].text === text && groups.indexOf(g) > 0
                    );
                    return (
                        <motion.p
                            key={i}
                            variants={fadeUp(delay)}
                            className={`text-lg md:text-xl font-light tracking-widest text-white/75 leading-relaxed ${isGroupStart ? "mt-4 md:mt-6" : ""}`}
                        >
                            {text}
                        </motion.p>
                    );
                })}

                {/* Divider */}
                <motion.div
                    variants={fadeUp(finalDelay - 0.6)}
                    className="w-16 h-[1px] bg-white/20 my-4 md:my-6"
                />

                {/* Final closing line */}
                <motion.p
                    variants={fadeUp(finalDelay)}
                    className="text-2xl md:text-4xl font-medium tracking-widest text-[#E6D5B8] drop-shadow-[0_0_24px_rgba(230,213,184,0.35)] uppercase"
                >
                    Zee ❤️ Abu
                </motion.p>
                <motion.p
                    variants={fadeUp(finalDelay + 0.8)}
                    className="text-sm md:text-base tracking-[0.3em] text-white/40 uppercase"
                >
                    Forever, InshaAllah
                </motion.p>
            </motion.div>
        </section>
    );
}
