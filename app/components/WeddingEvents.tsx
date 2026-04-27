"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { haldiImages, mehendiImages, receptionImages } from "../constants/images";

export default function WeddingEvents() {
    const [gallery, setGallery] = useState<{ images: string[], index: number } | null>(null);

    const events = [
        {
            id: "haldi",
            title: "Haldi",
            subtitle: "A splash of joy, a golden promise of light.",
            images: haldiImages,
            overlay: "bg-yellow-900/30",
        },
        {
            id: "mehendi",
            title: "Mehendi",
            subtitle: "Intricate patterns holding hidden names and eternal devotion.",
            images: mehendiImages,
            overlay: "bg-emerald-900/30",
        },
        {
            id: "reception",
            title: "Reception",
            subtitle: "A grand celebration of two paths merging forever into one.",
            images: receptionImages,
            overlay: "bg-black/60",
        }
    ];

    const closeGallery = () => setGallery(null);

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (gallery) {
            setGallery({ ...gallery, index: (gallery.index + 1) % gallery.images.length });
        }
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (gallery) {
            setGallery({ ...gallery, index: (gallery.index - 1 + gallery.images.length) % gallery.images.length });
        }
    };

    return (
        <>
            <section className="relative h-screen w-full bg-black flex flex-col">
                {/* Horizontal Scroll Container */}
                <div className="flex h-screen w-full overflow-x-auto snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

                    {/* Helper instruction styling (first panel only) */}
                    <div className="absolute top-1/2 right-4 z-50 animate-pulse hidden md:block opacity-60 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white rotate-180 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                        </svg>
                    </div>

                    {events.map((event) => (
                        <div
                            key={event.id}
                            className="relative w-screen h-screen flex-shrink-0 snap-center flex items-center justify-center overflow-hidden"
                        >
                            {/* Main Hero Background */}
                            <motion.div
                                className="absolute inset-0 z-0 origin-center cursor-pointer"
                                onClick={() => setGallery({ images: event.images, index: 0 })}
                                initial={{ scale: 1.1, opacity: 0.5 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: false, amount: 0.3 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                            >
                                {/* 
                  Optimization: Enabled Next.js scaling down specifically on background images 
                  using explicit sizes attributes to protect 15MB load crashes
                */}
                                <Image
                                    src={event.images[0] || "/fallback.jpg"}
                                    alt={`${event.title} Area`}
                                    fill
                                    sizes="100vw"
                                    quality={60}
                                    className="object-cover opacity-60 hover:opacity-70 transition-opacity duration-700"
                                />
                            </motion.div>

                            {/* Thematic Ambient Overlays */}
                            <div className={`absolute inset-0 z-10 ${event.overlay} mix-blend-color pointer-events-none`} />
                            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/95 via-black/40 to-black/30 pointer-events-none" />

                            {/* Layer 1: Floating Image */}
                            {event.images[1] && (
                                <motion.div
                                    onClick={() => setGallery({ images: event.images, index: 1 })}
                                    className="absolute cursor-pointer z-20 top-[12%] left-[5%] md:top-[20%] md:left-[10%] w-[55vw] h-[25vh] md:w-[400px] md:h-[300px] rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/20 origin-center overflow-hidden"
                                    initial={{ opacity: 0, x: -60, rotate: -3 }}
                                    whileInView={{ opacity: 1, x: 0, rotate: -6 }}
                                    whileHover={{ scale: 1.03, rotate: -2, zIndex: 40 }}
                                    viewport={{ once: false, amount: 0.5 }}
                                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                                >
                                    <div className="absolute inset-0 bg-black/10 z-10 hover:bg-transparent transition-colors duration-500" />
                                    <Image
                                        src={event.images[1]}
                                        alt={`${event.title} Detail 1`}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 50vw, 30vw"
                                        quality={50}
                                        loading="lazy"
                                    />
                                </motion.div>
                            )}

                            {/* Layer 2: Floating Image */}
                            {event.images[2] && (
                                <motion.div
                                    onClick={() => setGallery({ images: event.images, index: 2 })}
                                    className="absolute cursor-pointer z-20 bottom-[35%] right-[5%] md:bottom-[25%] md:right-[15%] w-[60vw] h-[28vh] md:w-[450px] md:h-[320px] rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/20 origin-center overflow-hidden"
                                    initial={{ opacity: 0, x: 60, rotate: 3 }}
                                    whileInView={{ opacity: 1, x: 0, rotate: 5 }}
                                    whileHover={{ scale: 1.03, rotate: 2, zIndex: 40 }}
                                    viewport={{ once: false, amount: 0.5 }}
                                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
                                >
                                    <div className="absolute inset-0 bg-black/10 z-10 hover:bg-transparent transition-colors duration-500" />
                                    <Image
                                        src={event.images[2]}
                                        alt={`${event.title} Detail 2`}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 50vw, 30vw"
                                        quality={50}
                                        loading="lazy"
                                    />
                                </motion.div>
                            )}

                            {/* Layer 3: Extra Floating Image */}
                            {event.images[3] && (
                                <motion.div
                                    onClick={() => setGallery({ images: event.images, index: 3 })}
                                    className="absolute cursor-pointer z-20 top-[40%] left-[50%] md:top-[15%] md:right-[5%] w-[45vw] h-[22vh] md:w-[350px] md:h-[260px] rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 origin-center overflow-hidden"
                                    initial={{ opacity: 0, y: -40, rotate: -4 }}
                                    whileInView={{ opacity: 1, y: 0, rotate: 10 }}
                                    whileHover={{ scale: 1.03, rotate: 4, zIndex: 40 }}
                                    viewport={{ once: false, amount: 0.5 }}
                                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
                                >
                                    <div className="absolute inset-0 bg-black/20 z-10 hover:bg-transparent transition-colors duration-500" />
                                    <Image
                                        src={event.images[3]}
                                        alt={`${event.title} Detail 3`}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 40vw, 25vw"
                                        quality={50}
                                        loading="lazy"
                                    />
                                </motion.div>
                            )}

                            {/* Subtext and Bottom Title Block */}
                            <motion.div
                                className="absolute z-30 bottom-12 left-6 md:bottom-24 md:left-16 max-w-xl pointer-events-none"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false, amount: 0.5 }}
                                transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
                            >
                                <h2 className="text-5xl md:text-7xl font-light tracking-widest text-white uppercase drop-shadow-[0_0_20px_rgba(0,0,0,0.8)] shadow-black">
                                    {event.title}
                                </h2>
                                <div className="mt-4 border-l-2 border-white/60 pl-5">
                                    <p className="text-sm md:text-xl font-light tracking-widest leading-relaxed text-gray-200 drop-shadow-xl">
                                        {event.subtitle}
                                    </p>
                                    <p className="mt-2 text-xs md:text-sm tracking-widest uppercase text-white/50 hidden md:block">
                                        Tap any image to expand
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Cinematic Fullscreen Lightbox */}
            <AnimatePresence>
                {gallery && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl"
                        onClick={closeGallery}
                    >
                        {/* Close Button */}
                        <button
                            className="absolute top-4 right-4 md:top-8 md:right-8 z-50 text-white/60 hover:text-white p-3 md:p-4 rounded-full bg-black/20 hover:bg-black/50 transition-colors"
                            onClick={closeGallery}
                        >
                            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>

                        {/* Navigation Left */}
                        <button
                            className="absolute left-2 md:left-8 z-50 text-white/60 hover:text-white p-4 rounded-full bg-transparent hover:bg-black/40 transition-colors"
                            onClick={prevImage}
                        >
                            <svg className="w-8 h-8 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" /></svg>
                        </button>

                        {/* Main Image View */}
                        <div className="relative w-full h-[80vh] md:w-[85vw] md:h-[85vh] flex items-center justify-center pointer-events-none">
                            <motion.div
                                key={gallery.index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                className="relative w-full h-full pointer-events-auto"
                            >
                                {/* 
                  Inside the Lightbox, we DO NOT optimize. 
                  We fetch the pure original file so they get 100% clarity.
                */}
                                <Image
                                    src={gallery.images[gallery.index]}
                                    alt="Gallery View memory"
                                    fill
                                    className="object-contain"
                                    unoptimized
                                />
                            </motion.div>
                        </div>

                        {/* Navigation Right */}
                        <button
                            className="absolute right-2 md:right-8 z-50 text-white/60 hover:text-white p-4 rounded-full bg-transparent hover:bg-black/40 transition-colors"
                            onClick={nextImage}
                        >
                            <svg className="w-8 h-8 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
                        </button>

                        {/* Counter */}
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 tracking-widest text-sm font-light">
                            {gallery.index + 1} / {gallery.images.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
