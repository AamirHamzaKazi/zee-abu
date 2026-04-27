import { Variants } from "framer-motion";

export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.5, ease: "easeOut" } }
};

export const slideUp: Variants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1.2, ease: "easeOut" } }
};

export const scaleIn: Variants = {
    hidden: { scale: 1.1, filter: "blur(10px)" },
    visible: { scale: 1, filter: "blur(0px)", transition: { duration: 3, ease: "easeOut" } }
};

export const textReveal: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export const textRevealDelayed: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.6 } }
};

export const slowZoomIn: Variants = {
    hidden: { scale: 1 },
    visible: { scale: 1.1, transition: { duration: 10, ease: "easeOut" } }
};
