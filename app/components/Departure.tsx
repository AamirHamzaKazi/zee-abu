"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { textReveal } from "../lib/animation";
import { departureImages } from "../constants/images";

export default function Departure() {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

    const imageSrc = departureImages[0] || "/fallback.jpg";

    return (
        <section ref={ref} className="relative h-screen w-full flex items-end justify-end overflow-hidden bg-zinc-800">
            <motion.div className="absolute inset-0 z-0 bg-zinc-900" style={{ y }}>
                <Image src={imageSrc} alt="Departure" fill className="object-cover opacity-60" />
            </motion.div>
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            <motion.div
                className="relative z-20 text-right p-8 md:p-16 pb-24"
                variants={textReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                <h2 className="text-4xl md:text-6xl text-white font-light tracking-widest uppercase shadow-sm">
                    Departure
                </h2>
                <p className="mt-3 text-gray-300 text-lg md:text-xl font-light tracking-wide max-w-md ml-auto drop-shadow">
                    New horizons and emotional farewells on the path ahead.
                </p>
            </motion.div>
        </section>
    );
}
