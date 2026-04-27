"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { nikkahImages } from "../constants/images";

const lineVariant = (delay: number): Variants => ({
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 1.5, ease: "easeOut", delay }
    }
});

const slowZoomVariant: Variants = {
    hidden: { scale: 1 },
    visible: {
        scale: 1.05,
        transition: { duration: 15, ease: "easeOut" }
    }
};

export default function Nikkah() {
    const ref = useRef<HTMLElement>(null);

    // Connect scroll bounds to the blur state natively
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });

    // Parallax constraints
    const yBg = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
    // Initial blur that gradually reduces as user scrolls down to this section
    const blurValue = useTransform(scrollYProgress, [0, 1], ["blur(12px)", "blur(0px)"]);

    const bgImageSrc = nikkahImages[0] || "/fallback.jpg";

    return (
        <section ref={ref} className="relative h-screen w-full flex flex-col items-center overflow-hidden bg-black text-center">

            {/* Background Image mapped to scroll blur and parallax, plus continuous slow zoom */}
            <motion.div
                className="absolute inset-0 z-0 origin-center"
                style={{ y: yBg, filter: blurValue }}
                variants={slowZoomVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
            >
                <Image src={bgImageSrc} alt="Nikkah Background" fill className="object-cover opacity-90" />
            </motion.div>

            {/* Overlays: Black/50 base + bottom gradient */}
            <div className="absolute inset-0 z-10 bg-black/50" />
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            {/* Main Container - separates center story from bottom final line */}
            <div className="relative z-20 w-full h-full flex flex-col justify-between items-center py-20 px-6">

                {/* Empty top spacer to vertically center the story text visually within bounds */}
                <div className="flex-1" />

                {/* Center Story Text */}
                <motion.div
                    className="flex flex-col space-y-6 md:space-y-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <motion.p variants={lineVariant(0.2)} className="text-xl md:text-2xl font-light tracking-wide text-white/90 drop-shadow-md">
                        Not years of knowing...
                    </motion.p>
                    <motion.p variants={lineVariant(0.8)} className="text-xl md:text-2xl font-light tracking-wide text-white/90 drop-shadow-md">
                        Just a moment of faith...
                    </motion.p>
                    <motion.p variants={lineVariant(1.4)} className="text-xl md:text-2xl font-light tracking-wide text-white drop-shadow-lg">
                        And everything changed.
                    </motion.p>
                </motion.div>

                {/* Bottom spacer pushes final line down */}
                <div className="flex-1 flex flex-col justify-end pb-8">
                    {/* Final Line - Distinct viewport trigger ensures it hits its own delay relative to scroll */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        <motion.h2
                            variants={lineVariant(2.5)}
                            className="text-2xl md:text-3xl font-medium tracking-widest text-white uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                        >
                            Two souls… one promise.
                        </motion.h2>
                        <motion.h2
                            variants={lineVariant(2.5)}
                            className="text-2xl md:text-3xl font-medium tracking-widest text-white uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                        >
                            قبول ہے  قبول ہے  قبول ہے
                        </motion.h2>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
