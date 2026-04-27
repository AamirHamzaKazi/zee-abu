"use client";

import { useEffect, useRef, useState } from "react";

export default function AudioManager() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isMuted, setIsMuted] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const startedRef = useRef(false); // prevent double-trigger

    // Initialise audio element once
    useEffect(() => {
        const audio = new Audio("/audio/bg-audio.mp3");
        audio.loop = true;
        audio.volume = 0;
        // Restore mute preference
        const storedMute = localStorage.getItem("bg-audio-muted");
        if (storedMute === "true") {
            audio.muted = true;
            setIsMuted(true);
        }
        audioRef.current = audio;

        return () => {
            audio.pause();
            audio.src = "";
        };
    }, []);

    // First-interaction trigger (click, scroll, touch)
    useEffect(() => {
        const start = () => {
            if (startedRef.current) return;
            startedRef.current = true;
            setHasStarted(true);

            const audio = audioRef.current;
            if (!audio) return;

            audio.play().then(() => {
                // Fade volume from 0 → 0.18 over ~2.5s using rAF
                const target = 0.18;
                const duration = 2500; // ms
                const startTime = performance.now();

                const tick = (now: number) => {
                    const elapsed = now - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    if (audio) audio.volume = progress * target;
                    if (progress < 1) requestAnimationFrame(tick);
                };
                requestAnimationFrame(tick);
            }).catch(() => {
                // Autoplay blocked — will retry on next interaction
                startedRef.current = false;
            });

            // Remove all listeners once fired
            window.removeEventListener("click", start);
            window.removeEventListener("scroll", start);
            window.removeEventListener("touchstart", start);
        };

        window.addEventListener("click", start, { passive: true });
        window.addEventListener("scroll", start, { passive: true });
        window.addEventListener("touchstart", start, { passive: true });

        return () => {
            window.removeEventListener("click", start);
            window.removeEventListener("scroll", start);
            window.removeEventListener("touchstart", start);
        };
    }, []);

    // Toggle mute
    const toggleMute = () => {
        const audio = audioRef.current;
        if (!audio) return;
        const next = !audio.muted;
        audio.muted = next;
        setIsMuted(next);
        localStorage.setItem("bg-audio-muted", String(next));

        // If user unmutes before first interaction, try to start
        if (!startedRef.current && !next) {
            startedRef.current = true;
            setHasStarted(true);
            audio.play().catch(() => { startedRef.current = false; });
        }
    };

    return (
        <button
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute background music" : "Mute background music"}
            className="fixed bottom-6 right-5 z-[200] flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300 shadow-lg"
            title={isMuted ? "Unmute" : "Mute"}
        >
            {isMuted || !hasStarted ? (
                // Muted / not yet started icon
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6}
                        d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6}
                        d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
            ) : (
                // Playing icon (sound waves)
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6}
                        d="M15.536 8.464a5 5 0 010 7.072M12 6v12m-6.414-3H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15H4" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6}
                        d="M19.07 4.93a10 10 0 010 14.14" />
                </svg>
            )}
        </button>
    );
}
