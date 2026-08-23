const COLORS = [
    { color: "#FB5066", enabled: true },
    { color: "#36CCD6", enabled: true },
    { color: "#FFC600", enabled: true },
    { color: "#8B6AE6", enabled: true },
    { color: "#2E0EC7", enabled: true },
    { color: "#FF9A9E", enabled: true },
];

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
   The hero is the page's one saturated moment. Everywhere else the
   gradient is ambient: a transparent canvas over the dark sections,
   with `colorBrightness` pulled right down so the ribbon reads as a
   dark faceted ridge that catches colour only along its edges. It
   becomes the texture of the dark band rather than a blue block
   interrupting the page — the same approach as dataki.ai.

   Two settings do all the work:
   - `backgroundAlpha: 0` + black background: the section's own
     colour shows through, so there is no rectangle.
   - `colorBrightness` ~0.25: the difference between "ambient" and
     "a poster". Above ~0.45 it starts competing with the content. */
const AMBIENT_BASE: NeatConfig = {
    ...HERO_CONFIG,
    speed: 0.11,
    backgroundAlpha: 0,
    backgroundColor: "#000000",
    proceduralBackgroundColor: "#000000",
    colorBrightness: 0.28,
    /* Framed so the ribbon occupies the upper half of its canvas and
       fades out into transparency below — which means the canvas can
       end wherever we like without showing a cut edge. */
    cameraY: -6,
    cameraZoom: 1.85,
    /* Baked here too, but pinned to 1024 rather than derived. A baked texture
       is per-instance — WebGL textures cannot cross contexts — and 2048 costs
       ~22MB against ~5.5MB. These ribbons are dark and dim by design, so the
       extra edge detail would not survive `colorBrightness: 0.28` anyway; the
       hero is where the sharpness is worth paying for. */
    textureBakeResolution: 1024,
    yOffsetWaveMultiplier: 1.2,
    yOffsetColorMultiplier: 1.1,
    yOffsetFlowMultiplier: 1.4,
};

/* Behind the work section — the largest and most present of the three. */
export const AMBIENT_WORK: NeatConfig = {
    ...AMBIENT_BASE,
    textureSeed: 217,
    colorBrightness: 0.3,
};

/* Behind the short process band. Much dimmer than the work section: here
   the copy sits directly on top of the ribbon rather than below it, so the
   shape has to stay dark enough for white text to win outright. */
export const AMBIENT_PROCESS: NeatConfig = {
    ...AMBIENT_BASE,
    textureSeed: 891,
    colorBrightness: 0.15,
    cameraZoom: 2.6,
    cameraY: -3,
    cameraRotationY: 0.44,
};

/* Behind contact. Same constraint as process — centred copy over the
   shape — so it stays dark and lets the colour show only at the edges. */
export const AMBIENT_CONTACT: NeatConfig = {
    ...AMBIENT_BASE,
    textureSeed: 542,
    colorBrightness: 0.17,
    cameraZoom: 2.1,
    cameraRotationY: 0.53,
};
