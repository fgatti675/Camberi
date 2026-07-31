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
    /** Tie yOffset to window.scrollY for a parallax drift (hero / bands). */
    parallax?: boolean;
    parallaxStrength?: number;
    /** Tie yOffset to the element's own position in the viewport. */
    scrollLinked?: boolean;
    scrollLinkedStrength?: number;
    className?: string;
    style?: React.CSSProperties;
    opacity?: number;
}

/* The page carries four of these. NeatGradient has no pause API and its
   render loop runs regardless of visibility, so a gradient two screens
   away would otherwise keep a WebGL context spinning for nothing. We
   create it as it approaches the viewport and tear it down once it is
   comfortably off-screen — far enough out that nobody sees it restart. */
const NEAR_VIEWPORT = "400px 0px";
const TEARDOWN_DELAY = 600;

export function NeatCanvas({
                               config,
                               parallax = false,
                               parallaxStrength = 0.25,
                               scrollLinked = false,
                               scrollLinkedStrength = 0.3,
                               className,
                               style,
                               opacity = 1,
                           }: NeatCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !NeatGradient) return;

        const baseOffset = (config.yOffset as number) ?? 0;
        const tracksScroll = parallax || scrollLinked;

        let neat: NeatGradientInstance | null = null;
        let raf = 0;
        let teardown: ReturnType<typeof setTimeout> | undefined;

        const onScroll = () => {
            if (raf || !neat) return;
            raf = requestAnimationFrame(() => {
                if (neat) {
                    if (parallax) {
                        // Offset by total scroll distance.
                        neat.yOffset = baseOffset + window.scrollY * parallaxStrength;
                    } else if (scrollLinked) {
                        // Offset by element position relative to viewport centre.
                        const rect = canvas.getBoundingClientRect();
                        const offset = (rect.top - window.innerHeight / 2) * scrollLinkedStrength;
                        neat.yOffset = baseOffset + offset;
                    }
                }
                raf = 0;
            });
        };

        const start = () => {
            clearTimeout(teardown);
            if (neat) return;
            neat = new NeatGradient({ ref: canvas, ...config });
            if (tracksScroll) {
                window.addEventListener("scroll", onScroll, { passive: true });
                onScroll();
            }
        };

        const stop = () => {
            if (!neat) return;
            if (tracksScroll) window.removeEventListener("scroll", onScroll);
            if (raf) {
                cancelAnimationFrame(raf);
                raf = 0;
            }
            neat.destroy();
            neat = null;
        };

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) start();
                // Delay teardown so scrubbing back and forth across the
                // boundary does not thrash WebGL context creation.
                else teardown = setTimeout(stop, TEARDOWN_DELAY);
            },
            { rootMargin: NEAR_VIEWPORT }
        );
        observer.observe(canvas);

        return () => {
            observer.disconnect();
            clearTimeout(teardown);
            stop();
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
