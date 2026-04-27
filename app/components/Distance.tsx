"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const fadeUp = (delay: number): Variants => ({
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.6, ease: "easeOut", delay } },
});

const imgZoom: Variants = {
    hidden: { scale: 1.06, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 2.5, ease: "easeOut" } },
};

export default function Distance() {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const yBg = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

    return (
        <>
            {/* ── SLIDE 1: Airport farewell image ──────────────────────────────── */}
            <section ref={ref} className="relative h-screen w-full flex items-end overflow-hidden bg-black">

                {/* Image */}
                <motion.div
                    className="absolute inset-0 z-0 origin-center"
                    style={{ y: yBg }}
                    variants={imgZoom}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <Image
                        src="/images/distance/distance-hero.webp"
                        alt="Farewell at the airport"
                        fill
                        className="object-cover"
                        sizes="100vw"
                        quality={70}
                        priority={false}
                    />
                </motion.div>

                {/* Strong dark overlay */}
                <div className="absolute inset-0 z-10 bg-black/60 pointer-events-none" />
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/95 via-black/50 to-transparent pointer-events-none" />
                <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(0,0,0,0.6)_100%)]" />

                {/* Text — bottom aligned */}
                <motion.div
                    className="relative z-20 px-6 pb-16 md:px-16 md:pb-24 flex flex-col gap-3 md:gap-4"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.4 }}
                >
                    <motion.p
                        variants={fadeUp(0.3)}
                        className="text-xl md:text-2xl font-light tracking-widest text-white/80"
                    >
                        And then…
                    </motion.p>
                    <motion.p
                        variants={fadeUp(1.1)}
                        className="text-2xl md:text-4xl font-light tracking-widest text-white drop-shadow-xl"
                    >
                        Came the hardest moment.
                    </motion.p>
                </motion.div>
            </section>

            {/* ── SLIDE 2: Pure black — the weight of goodbye ───────────────────── */}
            <section className="relative h-screen w-full flex flex-col items-center justify-center bg-black px-6">
                <motion.div
                    className="flex flex-col items-center gap-5 md:gap-7 text-center max-w-xl"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                >
                    <motion.p
                        variants={fadeUp(0.3)}
                        className="text-xl md:text-2xl font-light tracking-widest text-white/75"
                    >
                        Not because they wanted to…
                    </motion.p>
                    <motion.p
                        variants={fadeUp(1.0)}
                        className="text-xl md:text-2xl font-light tracking-widest text-white/75"
                    >
                        But because they had to.
                    </motion.p>

                    {/* Divider line */}
                    <motion.div
                        variants={fadeUp(1.9)}
                        className="w-12 h-[1px] bg-white/20 my-2"
                    />

                    {/* Final emotional line */}
                    <motion.p
                        variants={fadeUp(2.6)}
                        className="text-2xl md:text-3xl font-medium tracking-widest text-[#E6D5B8] drop-shadow-[0_0_20px_rgba(230,213,184,0.3)] uppercase"
                    >
                        Some goodbyes…<br />are not the end.
                    </motion.p>
                </motion.div>
            </section>
        </>
    );
}
