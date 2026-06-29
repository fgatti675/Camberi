const COLORS = [
    { color: "#FB5066", enabled: true },
    { color: "#36CCD6", enabled: true },
    { color: "#FFC600", enabled: true },
    { color: "#8B6AE6", enabled: true },
    { color: "#2E0EC7", enabled: true },
    { color: "#FF9A9E", enabled: true },
];

export type NeatConfig = Record<string, unknown>;

/* The exact configuration provided, used full-bleed behind the hero. */
export const HERO_CONFIG: NeatConfig = {
    colors: COLORS,
    speed: 1,
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
    colorBlending: 3,
    backgroundColor: "#003FFF",
    backgroundAlpha: 1,
    grainScale: 0,
    grainSparsity: 0,
    grainIntensity: 0,
    grainSpeed: 2.4,
    resolution: 0.05,
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

/* Dividers: the hero's exact look — same palette, same procedural ribbon
   texture, same camera — but on a transparent background so the streams
   weave through the page between sections. Kept crisp: no masks, no fades. */
const DIVIDER_BASE: NeatConfig = {
    ...HERO_CONFIG,
    speed: 0.35,
    backgroundAlpha: 0,
    transparentTextureVoid: true,
    antialias: true,
    /* Tamer than the hero's ~7× multipliers so the scroll drift animates
       the stream without shredding it or pushing it out of the band. */
    yOffsetWaveMultiplier: 0.8,
    yOffsetColorMultiplier: 0.7,
    yOffsetFlowMultiplier: 0.9,
    /* Zoom out and recentre so the whole ribbon silhouette fits inside the
       band — the shape must never be cut off at the top or bottom edge. */
    cameraZoom: 0.92,
    cameraY: -4,
};

export const DIVIDER_A_CONFIG: NeatConfig = {
    ...DIVIDER_BASE,
    textureSeed: 217,
};

export const DIVIDER_B_CONFIG: NeatConfig = {
    ...DIVIDER_BASE,
    textureSeed: 891,
    cameraY: -10,
    cameraZoom: 0.78,
};

export const DIVIDER_C_CONFIG: NeatConfig = {
    ...DIVIDER_BASE,
    textureSeed: 542,
};
