const PALETTE = {
    coral: "#FB5066",
    cyan: "#36CCD6",
    yellow: "#FFC600",
    purple: "#8B6AE6",
    blue: "#2E0EC7",
    pink: "#FF9A9E",
} as const;

/* The order the hero was composed with. Do not reorder: see the note on
   `palette()` below for why the order is part of the picture. */
const HUES = ["coral", "cyan", "yellow", "purple", "blue", "pink"] as const;
const COLORS = HUES.map((hue) => ({ color: PALETTE[hue], enabled: true }));

export type NeatConfig = Record<string, unknown>;

/* The NEAT watermark is drawn inside the WebGL canvas, not the DOM, so it
   cannot be hidden with CSS — the only way to remove it is a licence key.

   This one is bound to `camberi.com`, so it validates on the deployed site
   and not on localhost: expect the watermark to still show in dev. It is
   also not a secret — a domain-bound product key ships in the client
   bundle by design, exactly as rebase.pro's does. Every gradient on the
   page picks this up through LICENSED below. */
const LICENSE_KEY: string | undefined =
    "NEAT-eyJkb21haW4iOiJjYW1iZXJpLmNvbSIsImVtYWlsIjoiZnJhbmNlc2NvQGZpcmVjbXMuY28iLCJpYXQiOjE3ODc1MTQwNTN9.4Q5djFVzEQrq52svlHd4w8H592CHMnfPrY7FEjHzTs2CqLE1rvNHxrq6JZvc3eUv6eAOZyysUsusIm7cTWcKGA";

const LICENSED = LICENSE_KEY ? { licenseKey: LICENSE_KEY } : {};

/* The exact configuration provided, used full-bleed behind the hero. */
export const HERO_CONFIG: NeatConfig = {
    ...LICENSED,
    colors: COLORS,
    /* Slower than the editor default. At speed 1 the ribbon reads as a
       screensaver; at 0.6 it drifts. */
    speed: 0.6,
    horizontalPressure: 3,
    verticalPressure: 3,
    waveFrequencyX: 3,
    waveFrequencyY: 5,
    waveAmplitude: 10,
    shadows: 2,
    highlights: 6,
    colorBrightness: 1.05,
    colorSaturation: 1,
    wireframe: false,
    antialias: true,
    colorBlending: 3,
    backgroundColor: "#003FFF",
    backgroundAlpha: 1,
    grainScale: 0,
    grainSparsity: 0,
    grainIntensity: 0,
    grainSpeed: 2.4,
    resolution: 0.05,
    /* The camera sits close and the ribbon fills the frame, so the texture is
       magnified hard — exactly the case where the old Canvas2D path showed its
       fixed 1024px grid along every diagonal. Baking rasterizes the same
       shapes analytically on the GPU at a resolution derived from the canvas,
       which on a full-bleed hero means 2048. Squiggles cannot be baked, but
       this composition uses none. Falls back to bitmap without WebGL2. */
    textureMode: "baked",
    textureBakeResolution: 0,
    bakeEdgeSoftness: 1,
    yOffset: 0,
    yOffsetWaveMultiplier: 7.2,
    yOffsetColorMultiplier: 6.8,
    yOffsetFlowMultiplier: 7.7,
    flowDistortionA: 0.4,
    flowDistortionB: 2.6,
    flowScale: 1.9,
    flowEase: 0.94,
    flowEnabled: true,
    enableProceduralTexture: true,
    transparentTextureVoid: false,
    textureVoidLikelihood: 0.59,
    textureVoidWidthMin: 120,
    textureVoidWidthMax: 330,
    textureBandDensity: 0.1,
    textureColorBlending: 0,
    textureSeed: 478,
    textureEase: 0.86,
    proceduralBackgroundColor: "#003FFF",
    textureShapeTriangles: 51,
    textureShapeCircles: 0,
    textureShapeBars: 15,
    textureShapeSquiggles: 0,
    domainWarpEnabled: false,
    domainWarpIntensity: 0,
    domainWarpScale: 3,
    vignetteIntensity: 0,
    vignetteRadius: 0.8,
    fresnelEnabled: false,
    fresnelPower: 2,
    fresnelIntensity: 0.5,
    fresnelColor: "#FFFFFF",
    iridescenceEnabled: false,
    iridescenceIntensity: 0.5,
    iridescenceSpeed: 1,
    bloomIntensity: 0,
    bloomThreshold: 0.7,
    chromaticAberration: 0,
    shapeType: "ribbon",
    shapeRotationX: 0,
    shapeRotationY: 0,
    shapeRotationZ: 0,
    shapeAutoRotateSpeedX: 0,
    shapeAutoRotateSpeedY: 0,
    sphereRadius: 30,
    torusRadius: 15,
    torusTube: 5,
    cylinderRadius: 10,
    cylinderHeight: 40,
    planeBend: -0.7,
    planeTwist: 1,
    silhouetteFade: 0,
    cylinderFade: 0.08,
    ribbonFade: 0,
    flatShading: true,
    cameraLock: false,
    cameraX: 0,
    cameraY: -10.8,
    cameraZ: 0,
    cameraRotationX: 0.865,
    cameraRotationY: 0.483,
    cameraRotationZ: 0,
    cameraZoom: 2.05,
};

/* ── Ambient gradients ─────────────────────────────────────────────
   The hero owns the page's saturated blue. The three dark bands carry
   the same ribbon on black instead — a transparent canvas over the
   section, so the shape is the texture of the band rather than a
   rectangle interrupting the page — and each one gets its own dominant
   colour so the page reads as three distinct moments rather than one
   gradient repeated.

   How the colour is chosen: the procedural texture picks palette entries
   by *index* from a seeded generator. Two of those picks paint the big
   background fields that end up as the ribbon's body colour; the shapes
   scattered on top take the rest. So with the seed held fixed, which
   colour dominates is decided purely by which slot it sits in — the
   composition does not change at all. For the seeds below the field
   picks are:  217 → slots 1 and 5,  891 → slot 4 twice,  542 → slots 4
   and 5.  `palette()` pins colours to those slots and fills the others
   in the usual order.

   Brightness is the one knob that sets the mood, and it comes with a rule:
   **copy never sits on a ribbon brighter than ~0.3.** Small white text on a
   coloured facet is unreadable, and because the ribbon travels with scroll
   no framing can promise where it will be. So the two bands that run at
   0.5 (work, contact) are laid out as banners — the section adds top
   padding and `AmbientGradient` masks the canvas to transparent before the
   heading — and the one band whose copy sits directly on the shape
   (process) stays at 0.25, where the ribbon is a dark faceted ridge with
   colour only along its edges. The launch values were 0.15–0.3
   everywhere, which read as mud; 0.7 turns a band into a poster. */
type Hue = keyof typeof PALETTE;

function palette(slots: Partial<Record<number, Hue>>) {
    const pinned = new Set(Object.values(slots));
    const rest = HUES.filter((h) => !pinned.has(h));
    return HUES.map((_, i) => ({ color: PALETTE[slots[i] ?? rest.shift()!], enabled: true }));
}

const AMBIENT_BASE: NeatConfig = {
    ...HERO_CONFIG,
    speed: 0.11,
    backgroundAlpha: 0,
    backgroundColor: "#000000",
    proceduralBackgroundColor: "#000000",
    colorBrightness: 0.5,
    /* Framed so the ribbon occupies the upper part of its canvas and
       fades out into transparency below — which means the canvas can
       end wherever we like without showing a cut edge. */
    cameraY: -6,
    cameraZoom: 1.85,
    /* Baked here too, but pinned to 1024 rather than derived. A baked texture
       is per-instance — WebGL textures cannot cross contexts — and 2048 costs
       ~22MB against ~5.5MB. The hero is where the extra sharpness is worth
       paying for. */
    textureBakeResolution: 1024,
    /* These scale `yOffset`, which is driven by scroll — not the idle
       animation, which `speed` owns. Damped to ~1.2 they made the bands
       calm and also made them look completely inert as you scrolled past.
       Roughly half the hero's 7.2/6.8/7.7 gives a response you can see
       without the band becoming the busiest thing on the page. */
    yOffsetWaveMultiplier: 3.6,
    yOffsetColorMultiplier: 3.2,
    yOffsetFlowMultiplier: 4.0,
};

/* Behind the work section — the largest and most present of the three.
   Cyan field with blue and yellow facets, a shift away from the hero's
   royal blue directly above it. The camera is pushed in so the facets are
   big, and lifted so the ribbon sits above the heading. */
export const AMBIENT_WORK: NeatConfig = {
    ...AMBIENT_BASE,
    textureSeed: 217,
    colors: palette({ 1: "cyan", 5: "blue" }),
    colorBrightness: 0.5,
    cameraZoom: 2.8,
    cameraY: -9,
};

/* Behind the short process band. The copy sits directly on the ribbon
   here — no banner, no mask — so this one stays dark: the deep blue field
   with coral and pink along the edges, at a brightness where white text
   wins outright wherever the shape happens to be. */
export const AMBIENT_PROCESS: NeatConfig = {
    ...AMBIENT_BASE,
    textureSeed: 891,
    colors: palette({ 4: "blue" }),
    colorBrightness: 0.25,
    cameraZoom: 2.6,
    cameraY: -6,
    cameraRotationY: 0.44,
};

/* Behind contact — the close, and the one warm moment on the page:
   yellow into coral. Framed high so the shape hangs above the heading
   and the address underneath sits on plain dark. */
export const AMBIENT_CONTACT: NeatConfig = {
    ...AMBIENT_BASE,
    textureSeed: 542,
    colors: palette({ 4: "yellow", 5: "coral" }),
    colorBrightness: 0.5,
    cameraZoom: 2.6,
    cameraY: -9,
    cameraRotationY: 0.53,
};
