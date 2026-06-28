import { useEffect, useRef } from "react";
import * as neatModule from "@firecms/neat";
import type { NeatConfig } from "./neatConfigs";

interface NeatGradientConfig {
    ref: HTMLCanvasElement;
    [key: string]: unknown;
}

interface NeatGradientInstance {
    yOffset: number;
    destroy: () => void;
}

interface NeatModuleShape {
    NeatGradient?: new (config: NeatGradientConfig) => NeatGradientInstance;
    default?: {
        NeatGradient?: new (config: NeatGradientConfig) => NeatGradientInstance;
        default?: {
            NeatGradient?: new (config: NeatGradientConfig) => NeatGradientInstance;
        };
    };
}

const neatModuleTyped = neatModule as unknown as NeatModuleShape;
const NeatGradient =
    neatModuleTyped.NeatGradient ||
    neatModuleTyped.default?.NeatGradient ||
    neatModuleTyped.default?.default?.NeatGradient;

interface NeatCanvasProps {
    config: NeatConfig;
    /** Tie yOffset to scroll for a parallax drift (hero / full-bleed). */
    parallax?: boolean;
    parallaxStrength?: number;
    className?: string;
    style?: React.CSSProperties;
    opacity?: number;
}

export function NeatCanvas({
    config,
    parallax = false,
    parallaxStrength = 0.25,
    className,
    style,
    opacity = 1,
}: NeatCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current || !NeatGradient) return;

        const neat = new NeatGradient({
            ref: canvasRef.current,
            ...config,
        });

        const baseOffset = (config.yOffset as number) ?? 0;

        let raf = 0;
        const onScroll = () => {
            if (raf) return;
            raf = requestAnimationFrame(() => {
                neat.yOffset = baseOffset + window.scrollY * parallaxStrength;
                raf = 0;
            });
        };

        if (parallax) {
            window.addEventListener("scroll", onScroll, { passive: true });
            onScroll();
        }

        return () => {
            if (parallax) window.removeEventListener("scroll", onScroll);
            if (raf) cancelAnimationFrame(raf);
            neat.destroy();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={className}
            aria-hidden="true"
            style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                opacity,
                ...style,
            }}
        />
    );
}
