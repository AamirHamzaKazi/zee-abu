"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const fadeUp = (delay: number): Variants => ({
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.3, ease: "easeOut", delay } },
});

const imgZoom: Variants = {
    hidden: { scale: 1, opacity: 0.6 },
    visible: { scale: 1.05, opacity: 1, transition: { duration: 14, ease: "easeOut" } },
};

const lines = [
    { text: "They came back…", delay: 0.3, gold: false },
    { text: "But not the same.", delay: 0.9, gold: false },
    { text: "With memories…", delay: 2.0, gold: false },
    { text: "With prayers answered…", delay: 2.7, gold: false },
    { text: "And a bond… stronger than before.", delay: 3.6, gold: true },
];

export default function Return() {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

    return (
        <section ref={ref} className="relative h-screen w-full flex items-end overflow-hidden bg-black">

            {/* Background image — slow parallax + zoom */}
            <motion.div
                className="absolute inset-0 z-0 origin-center"
                style={{ y }}
                variants={imgZoom}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <Image
                    src="/images/return/return-hero.webp"
                    alt="Return from Umrah"
                    fill
                    className="object-cover"
                    sizes="100vw"
                    quality={75}
                    priority={false}
                />
            </motion.div>

            {/* Warm overlay */}
            <div className="absolute inset-0 z-10 bg-amber-950/10 mix-blend-overlay pointer-events-none" />
            {/* Bottom gradient */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />
            {/* Vignette */}
            <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(0,0,0,0.45)_100%)]" />

            {/* Text block — bottom aligned */}
            <motion.div
                className="relative z-20 px-6 pb-16 md:px-16 md:pb-24 flex flex-col gap-3 md:gap-4 max-w-2xl"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
            >
                {lines.map(({ text, delay, gold }, i) => (
                    <motion.p
                        key={i}
                        variants={fadeUp(delay)}
                        className={
                            gold
                                ? "text-xl md:text-2xl font-medium tracking-widest text-[#E6D5B8] drop-shadow-[0_0_18px_rgba(230,213,184,0.3)]"
                                : "text-lg md:text-xl font-light tracking-wide text-white/85 drop-shadow-md"
                        }
                    >
                        {text}
                    </motion.p>
                ))}
            </motion.div>
        </section>
    );
}
