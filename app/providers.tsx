"use client";

import dynamic from "next/dynamic";

const AudioManager = dynamic(() => import("./components/AudioManager"), { ssr: false });

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
            <AudioManager />
        </>
    );
}
