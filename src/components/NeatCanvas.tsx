import { useEffect, useRef, useSyncExternalStore } from "react";
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

/* ── Framing ──────────────────────────────────────────────────
   Neat frames a ribbon with an orthographic camera whose vertical
   extent is fixed: the horizontal half-width is `25 * aspect / zoom`
   while the canvas is landscape, but the moment it turns portrait the
   width stops following the aspect and pins at `25 * 1.05 / zoom`.
   See updateCamera() in @firecms/neat.

   Our ambient bands are composed against a wide desktop canvas. On a
   phone the frustum is less than half as wide, so a camera parked to
   one side lands past the end of the ribbon (which only spans ±25) and
   the band renders as near-black with a sliver of art in a corner.
   Re-express the offset as a fraction of the frustum we actually get,
   and never scale it up, so wide screens keep their composition. */
const RIBBON_HALF_SIZE = 25;
const REFERENCE_ASPECT = 2.4;

function frustumHalfWidth(aspect: number, zoom: number) {
    return (aspect >= 1 ? RIBBON_HALF_SIZE * aspect : RIBBON_HALF_SIZE * 1.05) / zoom;
}

/* ── Rendering at device pixels ───────────────────────────────
   NeatGradient sizes its drawing buffer from the element's *CSS* box —
   `clientWidth` at construction, `contentRect` in its ResizeObserver —
   and never multiplies by devicePixelRatio. On a retina display that
   means the gradient is drawn at half resolution and stretched back up
   by the compositor, which is what makes the facet edges look soft and
   stair-stepped however good the geometry is.

   Since the buffer follows the CSS box, we give it a CSS box that is
   already in device pixels: lay the canvas out at `scale`× the area it
   should occupy, then scale it back down with a transform. Neat reads
   the larger box, renders at that resolution, and the browser resolves
   it down — ordinary supersampling, arrived at from the outside.

   Capped at 2. Beyond that the fragment cost grows as the square for a
   difference nobody can see. */
const MAX_SUPERSAMPLE = 2;

/* ── Compile scheduling ───────────────────────────────────────
   Building a gradient is one synchronous 300–450ms block, and an idle
   callback does not make that safe: a callback that overruns its
   deadline is not preempted, so taking an idle slot between two wheel
   events still costs the same twenty dropped frames.

   So wait for the scroll to stop rather than for the main thread to
   look free. These canvases are decorative and aria-hidden; arriving a
   quarter second after the page settles costs nothing, and if the
   reader never stops then the gradient never compiles — which is the
   right answer too, since someone travelling to the footer is not
   looking at a background. */
const SCROLL_QUIET_MS = 250;
const NEAR_VIEWPORT_PX = 500;
const TEARDOWN_DELAY = 800;

/* One listener for the page, not one per instance. `lastScrollAt`
   starts at 0 so a fresh load reads as "settled" and the hero gradient
   still starts immediately. */
let lastScrollAt = 0;
let watchingScroll = false;

function watchScroll() {
    if (watchingScroll || typeof window === "undefined") return;
    watchingScroll = true;
    window.addEventListener(
        "scroll",
        () => {
            lastScrollAt = performance.now();
        },
        { passive: true }
    );
}

/* Compiles are serialised across instances. Two gradients that become
   eligible in the same tick are one ~700ms block rather than two
   separate ones — the browser gets no frame in between, so it reads as
   a single freeze. Released from a later task so the next gradient
   always starts with a clean slate. */
let compiling = false;

function takeCompileSlot(): boolean {
    if (compiling) return false;
    compiling = true;
    return true;
}

function releaseCompileSlot() {
    setTimeout(() => {
        compiling = false;
    }, 0);
}

/* ── Environment the browser owns ─────────────────────────────
   Orientation and device pixel ratio are external state, and both are
   read through useSyncExternalStore rather than an effect that calls
   setState. That is not a style preference: these pages are rendered
   to HTML by node at build time, and the store's server snapshot is
   what the markup is generated from. The browser's first render uses
   the same snapshot, so hydration matches, and only then does React
   re-read the real value. An effect setting state would have made the
   server and the client disagree about the canvas box.

   Neat reads cameraX once, at construction, so the framing correction
   can only follow a rotation by rebuilding the gradient. Orientation
   flips are rare enough that paying for a shader recompile is fine;
   plain resizes are left alone. */
const PORTRAIT = "(orientation: portrait)";

function subscribePortrait(onChange: () => void) {
    const query = window.matchMedia?.(PORTRAIT);
    if (!query) return () => {};
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
}

function useOrientation() {
    return useSyncExternalStore(
        subscribePortrait,
        () => window.matchMedia?.(PORTRAIT).matches ?? false,
        () => false
    );
}

/* devicePixelRatio changes when a window is dragged between displays,
   and a resize is the event every browser fires when that happens. The
   snapshot is a number, so a resize that does not change the ratio
   costs nothing. */
function subscribeDevicePixelRatio(onChange: () => void) {
    window.addEventListener("resize", onChange);
    return () => window.removeEventListener("resize", onChange);
}

function useSupersample() {
    return useSyncExternalStore(
        subscribeDevicePixelRatio,
        () => Math.min(window.devicePixelRatio || 1, MAX_SUPERSAMPLE),
        () => 1
    );
}

interface NeatCanvasProps {
    config: NeatConfig;
    /** Tie yOffset to window.scrollY — for the hero, which starts at the top. */
    parallax?: boolean;
    parallaxStrength?: number;
    /**
     * Tie yOffset to the element's own position in the viewport. This is what
     * every mid-page band wants: the gradient travels through its composed
     * range exactly as the band crosses the screen. Absolute-scrollY parallax
     * cannot do that — eight thousand pixels down the page it has pushed the
     * ribbon far outside the frame the config was drawn for, and the band
     * renders as dark mud.
     */
    scrollLinked?: boolean;
    scrollLinkedStrength?: number;
    className?: string;
    style?: React.CSSProperties;
    opacity?: number;
}

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
    const portrait = useOrientation();
    const scale = useSupersample();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !NeatGradient) return;

        /* Respect users who prefer reduced motion — but keep the art. Dropping
           the gradient outright is a bigger concession than the preference asks
           for, and it costs more than it looks: iOS Safari reports `reduce` for
           the whole of Low Power Mode, so a phone on a low battery would lose
           every gradient on the page and get flat black in their place. speed 0
           freezes the shader clock, so it renders as a still image. */
        const prefersReducedMotion =
            window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

        const resolved: NeatConfig = { ...config };
        if (prefersReducedMotion) resolved.speed = 0;

        const baseOffset = (resolved.yOffset as number) ?? 0;
        /* Scroll parallax is motion too, so reduced-motion viewers keep the
           still frame the config above froze rather than having it driven by
           the page. */
        const tracksScroll = (parallax || scrollLinked) && !prefersReducedMotion;

        let neat: NeatGradientInstance | null = null;
        let raf = 0;
        let teardown: ReturnType<typeof setTimeout> | undefined;
        let settleTimer: ReturnType<typeof setTimeout> | undefined;
        let cancelled = false;
        let visible = false;

        const applyOffset = () => {
            raf = 0;
            if (!neat) return;
            if (parallax) {
                neat.yOffset = baseOffset + window.scrollY * parallaxStrength;
            } else if (scrollLinked) {
                const rect = canvas.getBoundingClientRect();
                const offset = (rect.top - window.innerHeight / 2) * scrollLinkedStrength;
                neat.yOffset = baseOffset + offset;
            }
        };

        /* Coalesced into one rAF tick. Run per scroll event this would be a
           forced layout read plus a WebGL uniform write on every event, which
           scroll fires far more often than once a frame. That is the jank. */
        const onScroll = () => {
            if (raf || !neat) return;
            raf = requestAnimationFrame(applyOffset);
        };

        const build = () => {
            if (cancelled || neat) return;

            const aspect = canvas.clientWidth / canvas.clientHeight;
            if (Number.isFinite(aspect) && aspect > 0) {
                const zoom = (resolved.cameraZoom as number) ?? 1;
                const framing = Math.min(
                    1,
                    frustumHalfWidth(aspect, zoom) / frustumHalfWidth(REFERENCE_ASPECT, zoom)
                );
                resolved.cameraX = ((resolved.cameraX as number) ?? 0) * framing;
            }

            neat = new NeatGradient({ ref: canvas, ...resolved });
            if (tracksScroll) {
                window.addEventListener("scroll", onScroll, { passive: true });
                applyOffset();
            }
        };

        const startWhenSettled = () => {
            if (cancelled || neat) return;
            if (!visible) return; /* The observer will call us again. */

            const quietFor = performance.now() - lastScrollAt;
            if (quietFor < SCROLL_QUIET_MS) {
                settleTimer = setTimeout(startWhenSettled, SCROLL_QUIET_MS - quietFor);
                return;
            }
            if (!takeCompileSlot()) {
                settleTimer = setTimeout(startWhenSettled, 32);
                return;
            }
            try {
                build();
            } finally {
                releaseCompileSlot();
            }
        };

        const schedule = () => {
            if (cancelled) return;
            watchScroll();
            clearTimeout(teardown);
            if ("requestIdleCallback" in window) {
                requestIdleCallback(startWhenSettled, { timeout: 1500 });
            } else {
                settleTimer = setTimeout(startWhenSettled, 200);
            }
        };

        const stop = () => {
            clearTimeout(settleTimer);
            if (!neat) return;
            if (tracksScroll) window.removeEventListener("scroll", onScroll);
            if (raf) {
                cancelAnimationFrame(raf);
                raf = 0;
            }
            neat.destroy();
            neat = null;
        };

        /* NeatGradient has no pause API and its render loop runs regardless of
           visibility, so a gradient two screens away would keep a WebGL context
           spinning for nothing. Create it as it approaches, tear it down once it
           is comfortably off-screen — far enough out that nobody sees it
           restart, and delayed so scrubbing back and forth across the boundary
           does not thrash context creation. */
        const observer = new IntersectionObserver(
            ([entry]) => {
                visible = entry.isIntersecting;
                if (visible) schedule();
                else {
                    clearTimeout(settleTimer);
                    teardown = setTimeout(stop, TEARDOWN_DELAY);
                }
            },
            { rootMargin: `${NEAR_VIEWPORT_PX}px 0px` }
        );
        observer.observe(canvas);

        return () => {
            cancelled = true;
            observer.disconnect();
            clearTimeout(teardown);
            stop();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [portrait, scale]);

    return (
        <canvas
            ref={canvasRef}
            className={className}
            aria-hidden="true"
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                /* Laid out at `scale`× and composited back down — see the note
                   on MAX_SUPERSAMPLE above. At scale 1 this is a plain
                   full-bleed canvas and no transform is applied at all. */
                width: `${scale * 100}%`,
                height: `${scale * 100}%`,
                transform: scale === 1 ? undefined : `scale(${1 / scale})`,
                transformOrigin: "top left",
                opacity,
                ...style,
            }}
        />
    );
}
