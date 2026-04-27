"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const imgReveal: Variants = {
    hidden: { scale: 1.04, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 3, ease: "easeOut" } },
};

const fadeUp = (delay: number): Variants => ({
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.8, ease: "easeOut", delay } },
});

export default function Message() {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

    return (
        <section ref={ref} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">

            {/* Image — very slow, gentle reveal */}
            <motion.div
                className="absolute inset-0 z-0 origin-center"
                style={{ y }}
                variants={imgReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                <Image
                    src="/images/hamza/hug-hero.webp"
                    alt="A goodbye hug"
                    fill
                    className="object-cover"
                    sizes="100vw"
                    quality={75}
                    priority={false}
                />
            </motion.div>

            {/* Slight dark overlay — let the image breathe */}
            <div className="absolute inset-0 z-10 bg-black/45 pointer-events-none" />
            <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_35%,_rgba(0,0,0,0.55)_100%)]" />

            {/* Text — centered, minimal */}
            <motion.div
                className="relative z-20 text-center px-6 flex flex-col items-center gap-5 md:gap-7 max-w-2xl"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
            >
                <motion.p
                    variants={fadeUp(0.8)}
                    className="text-xl md:text-2xl font-light tracking-widest text-white/85 leading-relaxed drop-shadow-lg"
                >
                    Letting you go wasn't easy…
                </motion.p>
                <motion.p
                    variants={fadeUp(2.0)}
                    className="text-lg md:text-xl font-light tracking-widest text-white/75 leading-relaxed drop-shadow-md"
                >
                    But seeing you happy made it worth everything.
                </motion.p>
                <motion.p
                    variants={fadeUp(2.0)}
                    className="text-lg md:text-xl font-light tracking-widest text-white/75 leading-relaxed drop-shadow-md"
                >
                    Love you always ❤️
                </motion.p>
            </motion.div>
        </section>
    );
}
