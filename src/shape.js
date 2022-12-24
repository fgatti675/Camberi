import * as THREE from 'three';
import {
    EffectComposer,
    GlitchPass,
    FilmPass,
    BloomPass,
    RenderPass,
    KernelSize,
    DotScreenPass,
    BlurPass
} from "postprocessing";
import {
    TweenLite, Power3, Power1
} from "gsap";
import * as Perlin from 'perlin';
import './main.scss';

const X_AXIS = new THREE.Vector3(1, 0, 0);

const
    AMBIENT_LIGHT_INTENSITY = .22,
    DIRECTIONAL_LIGHT_INTENSITY = .8,
    MOUSE_LIGHT_INTENSITY = .4,
    COLOR_VARIANCE = .44,
    BASE_SCALE = 1.2,
    BLUR_PIXELS = 8,
    ABOUT_POINTS_SIZE = .2,
    ABOUT_SCALE_INCREMENT = 3,
    ABOUT_POINTS_OPACITY = .5,
    ABOUT_WIREFRAME_OPACITY = .3,
    ABOUT_ROTATION_SPEED = 8000,
    ABOUT_CAMERA_Y_OFFSET = 600,
    SHAPE_Y_OFFSET = 200,
    CAMERA_Y_OFFSET_SCROLL = -300,
    CAMERA_Z_OFFSET = 1600,
    GRID_SPEED = 1400,
    CONTACT_SCALE_INCREMENT = 1.7,
    LIGHT_COLOR_SATURATION = .9,
    LIGHT_COLOR_LIGHTNESS = .37,
    BG_COLOR_SATURATION = .75,
    BG_COLOR_LIGHTNESS = .5,
    MOUSE_LIGHT_DISTANCE_TO_CENTER = 700,
    SHAPE_RADIUS = 160,
    SHAPE_RADIUS_SMALL = 120;


const WHITE = new THREE.Color(0xFFFFFF),
    GREY = new THREE.Color(0xCCCCCC),
    RED = new THREE.Color(0xFF0000),
    GREEN = new THREE.Color(0x09CAA1),
    YELLOW = new THREE.Color(0xFFFF00),
    STRONG_BLUE = new THREE.Color(0x0025FF),
    LIGHT_GREEN = new THREE.Color(0x70C4CE),
    DARKENED_GREEN = new THREE.Color(0x0D7182),
    ORANGE = new THREE.Color(0xf66023),
    PURPLE = new THREE.Color(0x590D82),
    MAGENTA = new THREE.Color(0xC6A0C0),
    PINK = new THREE.Color(0xCE70A5);

ORANGE.string = "ORANGE";
PURPLE.string = "PURPLE";
YELLOW.string = "YELLOW";
STRONG_BLUE.string = "STRONG_BLUE";
DARKENED_GREEN.string = "DARKENED_GREEN";
RED.string = "RED";
PINK.string = "PINK";
GREEN.string = "GREEN";

let
    LIGHT_1_COLOR_BASE,
    LIGHT_2_COLOR_FROM,
    LIGHT_2_COLOR_TO,
    LIGHT_3_COLOR_FROM,
    LIGHT_3_COLOR_TO,
    MATERIAL_COLOR_FROM,
    MATERIAL_COLOR_TO,
    WIREFRAME_COLOR_TO,
    BACKGROUND_COLOR_FROM,
    BACKGROUND_COLOR_TO;


const shuffleButton = document.getElementById('shuffle_colors_btn');
const main = document.querySelector('main');
const aboutPage = document.querySelector('#about');
const canvas = document.querySelector('#scene');
const header = document.querySelector('header');
const location = document.querySelector('.location');
const background = document.getElementById('background');
const body = document.querySelector('body');
const pages = document.querySelectorAll('main .page');
const fadingPages = document.getElementsByClassName('fade-page');

const docheight = Math.max(document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight);

const mouseProjection = new THREE.Vector3(0, 0, 0);
const mouse = new THREE.Vector2(0, 0);

const blurEnabled = !navigator.userAgent.includes("Firefox");

let currentPageId;

const clock = new THREE.Clock();

const scrollTween = {
    y: getScroll()
};

const aboutTween = {
    position: 0
};

let width = canvas.offsetWidth,
    height = canvas.offsetHeight;

let renderer,
    composer,
    renderPass,
    blurPass,
    shape,
    shape2,
    shapeWireframe,
    shapePoints,
    geometry,
    grid,
    material,
    material2,
    materialWireframe,
    materialPoints,
    scene,
    camera,
    light, light2, light3, mouseLight;


const loader = new THREE.TextureLoader();
loader.load('img/texture.jpg', function (texture) {

    setUpLightColors();
    setUpBackgroundColors();
    initScene(texture);

    requestAnimationFrame(render);

    let scroll = getScroll();
    updateSceneMaterialsOpacity(scroll, aboutTween.position);
    updateSceneColors(scrollTween.y);
    updateBlur(scroll, aboutPage.position);

    onUrlFragmentChange(getUrlFragment(document.URL));

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("hashchange", onHashChange);
    main.addEventListener("scroll", onScroll);

    shuffleButton.addEventListener("click", onShuffleClick);

    onShuffleClick();

});

function initScene(texture) {

    let repeatValueX = Math.random() * .4 + .8;
    let repeatValueY = Math.random() * .4 + .6;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(repeatValueX, repeatValueY);

    renderer = new THREE.WebGLRenderer({
        alpha: true,
        canvas: canvas,
        // antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 1.5 : 1);
    renderer.setSize(width, height);

    composer = new EffectComposer(renderer);

    scene = new THREE.Scene();

    camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 1, 2000);
    camera.position.set(0, 0, CAMERA_Z_OFFSET);

    renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    blurPass = new BlurPass();
    blurPass.renderToScreen = true;
    // blurPass.kernelSize = KernelSize.VERY_SMALL;
    blurPass.resolutionScale = .5;
    composer.addPass(blurPass);

    light = new THREE.HemisphereLight(WHITE, LIGHT_1_COLOR_BASE, AMBIENT_LIGHT_INTENSITY);
    light.position.set(400, 400, 0);
    scene.add(light);

    light2 = new THREE.DirectionalLight(LIGHT_2_COLOR_FROM, DIRECTIONAL_LIGHT_INTENSITY);
    light2.position.set(400, 0, 500);
    scene.add(light2);

    light3 = new THREE.DirectionalLight(LIGHT_3_COLOR_FROM, DIRECTIONAL_LIGHT_INTENSITY);
    light3.position.set(-400, 0, 500);
    scene.add(light3);

    mouseLight = new THREE.SpotLight(BACKGROUND_COLOR_FROM, MOUSE_LIGHT_INTENSITY);
    mouseLight.angle = Math.PI / 4;
    mouseLight.distance = 300;
    mouseLight.position.set(0, 0, MOUSE_LIGHT_DISTANCE_TO_CENTER);
    scene.add(mouseLight);

    geometry = new THREE.DodecahedronGeometry(width < 600 ? SHAPE_RADIUS_SMALL : SHAPE_RADIUS, 4);

    geometry.vertices.forEach((vector, i) => {
        vector._original = vector.clone();
        vector.spikes = {
            activated: Math.random() < .3,
            period: (Math.random() * 3 + 3) * 1000,
            size: (Math.random() - 0.5) * 1.5 + 1
        }
    });

    material = new THREE.MeshLambertMaterial({
        map: texture,
        overdraw: 1,
        emissive: MATERIAL_COLOR_FROM,
        emissiveIntensity: .6,
        transparent: true,
    });

    // var material = new THREE.MeshBasicMaterial({map: texture, overdraw: 0.5});

    material2 = new THREE.MeshPhongMaterial({
        transparent: true,
    });
    material2.flatShading = true;

    materialWireframe = new THREE.MeshPhongMaterial({
        emissive: WIREFRAME_COLOR_TO,
        emissiveIntensity: .6,
        transparent: true
    });
    materialWireframe.wireframe = true;

    materialPoints = new THREE.PointsMaterial({
        color: GREY,
        size: ABOUT_POINTS_SIZE,
        transparent: true,
        opacity: 0,
        sizeAttenuation: false
    });

    shape = new THREE.Mesh(geometry, material);
    shape2 = new THREE.Mesh(geometry, material2);
    shapeWireframe = new THREE.Mesh(geometry, materialWireframe);
    shapePoints = new THREE.Points(geometry, materialPoints);

    scene.add(shape);
    scene.add(shape2);
    scene.add(shapeWireframe);
    scene.add(shapePoints);

    let gridGeometry = new THREE.Geometry();
    let size = 1800,
        step = 75;
    for (let i = -size; i <= size; i += step) {
        for (let j = -size; j <= size; j += step) {
            let star = new THREE.Vector3(i, j, 0);
            gridGeometry.vertices.push(star);
        }
    }
    grid = new THREE.Points(gridGeometry, new THREE.PointsMaterial({
        color: WHITE,
        size: 1.5
    }));

    scene.add(grid);

}


function setUpLightColors() {

    const randomColor = _ => new THREE.Color().setHSL(Math.random(), LIGHT_COLOR_SATURATION, LIGHT_COLOR_LIGHTNESS);
    const colorWithHue = hue => new THREE.Color().setHSL(hue, LIGHT_COLOR_SATURATION, LIGHT_COLOR_LIGHTNESS);
    MATERIAL_COLOR_FROM = randomColor();
    MATERIAL_COLOR_TO = colorWithHue(MATERIAL_COLOR_FROM.getHSL().h + COLOR_VARIANCE / 3 * 2);
    WIREFRAME_COLOR_TO = colorWithHue(MATERIAL_COLOR_FROM.getHSL().h + COLOR_VARIANCE * 3 / 2);
    LIGHT_1_COLOR_BASE = colorWithHue(MATERIAL_COLOR_FROM.getHSL().h + (Math.random() - .5) * COLOR_VARIANCE);
    LIGHT_2_COLOR_FROM = colorWithHue(MATERIAL_COLOR_FROM.getHSL().h + COLOR_VARIANCE / 2);
    LIGHT_3_COLOR_FROM = colorWithHue(MATERIAL_COLOR_FROM.getHSL().h - COLOR_VARIANCE / 2);
    LIGHT_2_COLOR_TO = colorWithHue(MATERIAL_COLOR_TO.getHSL().h - COLOR_VARIANCE / 2);
    LIGHT_3_COLOR_TO = colorWithHue(MATERIAL_COLOR_TO.getHSL().h + COLOR_VARIANCE / 2);
    BACKGROUND_COLOR_FROM = MATERIAL_COLOR_FROM.clone().lerp(LIGHT_2_COLOR_FROM.clone().lerp(LIGHT_3_COLOR_FROM.clone(), .5).lerp(LIGHT_1_COLOR_BASE.clone(), .3), .3);
    BACKGROUND_COLOR_TO = MATERIAL_COLOR_TO.clone().lerp(LIGHT_2_COLOR_TO.clone().lerp(LIGHT_3_COLOR_TO.clone(), .5).lerp(LIGHT_1_COLOR_BASE.clone(), .3), .3);

    let adjustLightness = function (color) {
        color.setHSL(color.getHSL().h, LIGHT_COLOR_SATURATION, .37);
    };

}

function setUpBackgroundColors() {

    body.style.backgroundColor = 'white';

    let bgPages = document.getElementsByClassName('bg_page');

    BACKGROUND_COLOR_FROM.setHSL(BACKGROUND_COLOR_FROM.getHSL().h, BG_COLOR_SATURATION, BG_COLOR_LIGHTNESS);
    BACKGROUND_COLOR_TO.setHSL(BACKGROUND_COLOR_TO.getHSL().h, BG_COLOR_SATURATION, BG_COLOR_LIGHTNESS);

    for (let i = 0; i < bgPages.length; i++) {
        let page = bgPages[i];
        let bg = BACKGROUND_COLOR_FROM.lerp(BACKGROUND_COLOR_TO, i * 1 / bgPages.length);
        bg.setHSL(bg.getHSL().h, BG_COLOR_SATURATION, BG_COLOR_LIGHTNESS);
        page.style.backgroundColor = bg.getStyle();
    }
}

function getSphereScalar(scroll) {
    return 1.5 - 1.5 * scroll;
}

function getSpikeScalar(vector, scroll, time) {
    const spikes = vector.spikes;
    if (!spikes.activated) return .2;
    const scalar = ((sinoid(time + scroll * 1000, spikes.period)) * spikes.size) * .3;
    return scalar + 1.;
}

function getPerlinScalar(vector, time, mouseProjection, scroll, aboutPosition, shapeRotationX) {

    let m = mouseProjection.clone();
    m.applyAxisAngle(X_AXIS, -shapeRotationX);
    let i = 1 / vector.distanceTo(m) * 20;
    let value = i * i;

    let s = ((1.2) / 12) * 0.07;
    let r = ((1.2) / 12) * (time * 0.0035);
    const perlin = Perlin.noise.simplex3(
        (vector.x * s) + r + (value),
        (vector.y * s) + r + (value),
        (vector.z * s) + r + (value)
    );

    const scalar = perlin + value * 2 + 1;
    return scalar;
}

// [0, 1]
function quadratic(s, softness, spread, offset) { // -10x^​2 +1
    let x = s - offset;
    return softness * x * x + spread * x + 1;
}

// [-1, 1]
function sinoid(t, period) {
    return Math.sin(t / period * (2 * Math.PI));
}

// [-1, 1]
function sigmoid(t) {
    return 1 / (1 + Math.exp(-t));
}

function updateVertices(time, scroll, aboutPosition, shapeRotationX) {

    const ratio = (sinoid(scroll, 2));

    for (let i = 0; i < geometry.vertices.length; i++) {
        let vector = geometry.vertices[i];

        vector.copy(vector._original);

        let shereScalar = scroll < .5 ? getSphereScalar(scroll) : 0;
        let spikeScalar = scroll > .5 || aboutTween.position !== 0 ? getSpikeScalar(vector, scroll, time) : 0;
        let perlinScalar = getPerlinScalar(vector, time, mouseProjection, scroll, aboutPosition, shapeRotationX);

        let v1, v2;
        if (scroll < .5)
            v1 = shereScalar, v2 = perlinScalar;
        else
            v1 = spikeScalar, v2 = perlinScalar;

        let regularScrollScalar = (1 - ratio) * v1 + ratio * v2;
        let aboutScalar = perlinScalar * .3 + spikeScalar * .02;

        vector.multiplyScalar((regularScrollScalar * (1 - aboutPosition) + aboutScalar * aboutPosition) + 1);

    }
    geometry.verticesNeedUpdate = true;
}

function getScroll() {
    let o = main.scrollTop;
    let i = window.innerHeight;
    let h = main.scrollHeight;
    return (o) / (h - i);
}

let i = 0;

function getShapeRotationX(scroll, time, aboutPosition) {
    let a = (time / ABOUT_ROTATION_SPEED % (Math.PI * 1.5));
    return (scroll * Math.PI * 1.5 + aboutPosition * a);
}

function onShuffleClick() {
    let shuffleInterval = 150;
    console.log("Shuffle up!");
    setTimeout(() => shuffleColors(), shuffleInterval);
    setTimeout(() => shuffleColors(), shuffleInterval * 2);
    setTimeout(() => shuffleColors(), shuffleInterval * 3);
    setTimeout(() => shuffleColors(), shuffleInterval * 4);
    setTimeout(() => shuffleColors(), shuffleInterval * 5);
}

function shuffleColors() {
    // shuffle(COLORS);
    setUpLightColors();
    setUpBackgroundColors();
    updateSceneMaterialsOpacity(scrollTween.y, aboutTween.position);
    updateSceneColors(scrollTween.y);
}

function getUrlFragment(url) {
    return url.split('#')[1];
}

function onHashChange(e) {
    onUrlFragmentChange(getUrlFragment(e.newURL), getUrlFragment(e.oldURL));
}

// let prevScroll = content.scrollTop;
function onUrlFragmentChange(newFragment, oldFragment) {

    if (newFragment === "about") {
        TweenLite.to(aboutTween,
            1, {
                position: 1,
                ease: Power3.easeOut
            });

    } else {
        TweenLite.to(aboutTween,
            1, {
                position: 0,
                ease: Power3.easeOut
            });

    }
}

function onScroll(evt) {

    evt.preventDefault(); // prevent default browser scroll
    const scroll = getScroll();
    TweenLite.to(scrollTween,
        4, {
            y: scroll,
            ease: Power3.easeOut
        });

}

function updateBlur(scroll, aboutPosition) {

    if (!blurEnabled) return;

    if (aboutPosition > .3) {
        disableBlur();
        return;
    }

    if (scroll > (1 - 1 / pages.length)) {
        enableBlur(scroll, aboutPosition);
    } else {
        disableBlur();
    }
}

function enableBlur(scroll, aboutPosition) {
    if (!blurEnabled) return;

    renderPass.renderToScreen = false;
    blurPass.enabled = true;
    // canvas.setAttribute("style", "filter:blur(" + BLUR_PIXELS + "px)");
}

function disableBlur() {
    if (!blurEnabled) return;
    // canvas.style.filter = null;
    renderPass.renderToScreen = true;
    blurPass.enabled = false;
}

function updateShapeRotationX(rotationX) {
    shape.rotation.x = rotationX;
    shape2.rotation.x = rotationX;
    shapeWireframe.rotation.x = rotationX;
    shapePoints.rotation.x = rotationX;
}


function updateScale(scroll, aboutPosition) {
    let value = sigmoid((scroll - .7) * 24 - 6) * (1 - aboutPosition);
    let scale = BASE_SCALE + value * CONTACT_SCALE_INCREMENT + (aboutPosition) * ABOUT_SCALE_INCREMENT;
    shape.scale.set(scale, scale, scale);
    shape2.scale.set(scale, scale, scale);
    shapeWireframe.scale.set(scale, scale, scale);
    shapePoints.scale.set(scale, scale, scale);
}


function updateCameraPosition(scroll, aboutPosition) {
    let s = 1 - 2 * (1 - scroll);
    s = CAMERA_Y_OFFSET_SCROLL - s * s * CAMERA_Y_OFFSET_SCROLL; // https://www.desmos.com/calculator/xkxkvj1qwi
    camera.position.y = s * (1 - aboutPosition);
    camera.position.x = aboutPosition * width / 1.3;
}


function updateShapePosition(scroll, mouse, time, aboutPosition) {

    let y = mouse.x /10;
    shape.rotation.y = y;
    shape2.rotation.y = y;
    shapeWireframe.rotation.y = y;
    shapePoints.rotation.y = y;

    let posX = (y) * 50;
    let posY = (mouse.y) * 50;

    shape.position.x = posX;
    shape.position.y = posY;
    shape2.position.x = posX;
    shape2.position.y = posY;
    shapeWireframe.position.x = posX;
    shapeWireframe.position.y = posY;
    shapePoints.position.x = posX;
    shapePoints.position.y = posY;

}

function updateGrid(scroll) {
    grid.position.y = GRID_SPEED * scroll + camera.position.y; // compensate for the camera translation, should be done better
}

function fadePages() {
    for (let i = 0; i < fadingPages.length; i++) {
        let page = fadingPages[i];
        let off = page.offsetTop - main.scrollTop;
        let h = page.offsetHeight;
        let o = off < -h ? 0 : (off > 0 ? 1 : (h + off) / h);
        if (o != 0, 1)
            page.style.opacity = Math.sin(o * Math.PI / 2) + .1;
    }
}

function updateURL() {
    let c = main.scrollTop - height / 3;
    for (let i = 0; i < pages.length; i++) {
        let page = pages[i];
        if (c <= page.offsetTop) {
            if (page.id != currentPageId) {
                currentPageId = page.id;
                history.replaceState({}, 'Camberí', '#' + page.id);
            }
            break;
        }
    }
}

function updateSceneMaterialsOpacity(scroll, aboutPosition) {

    let o1 = 1 - sigmoid(scroll * 18 - 11.5);
    let o2 = quadratic(scroll, -25, 6, .75); // https://www.desmos.com/calculator/la8eufllq5
    let o3 = quadratic(scroll, -25, 6, .4);

    material.opacity = o1 * 2 * (1 - aboutPosition);
    material2.opacity = Math.max(o2 * 2 * (1 - aboutPosition), aboutPosition * .0);

    materialWireframe.opacity = Math.max(o3 * (1 - aboutPosition), ABOUT_WIREFRAME_OPACITY * aboutPosition);
    materialPoints.opacity = aboutPosition * ABOUT_POINTS_OPACITY;
}

function updateSceneColors(scroll) {

    light.groundColor = LIGHT_1_COLOR_BASE;

    let materialColor = MATERIAL_COLOR_FROM.clone().lerp(MATERIAL_COLOR_TO, scroll);
    material.emissive.set(materialColor);
    material2.emissive.set(materialColor);

    light2.color.set(LIGHT_2_COLOR_FROM.clone().lerp(LIGHT_2_COLOR_TO, scroll));
    light3.color.set(LIGHT_3_COLOR_FROM.clone().lerp(LIGHT_3_COLOR_TO, scroll));
}

function onMouseMove(e) {

    let ny = -(event.clientY / window.innerHeight) * 2 + 1;
    let nx = (event.clientX / window.innerWidth) * 2 - 1;

    mouseProjection.copy(projectCanvasLocation(nx, ny));
    updateMouseLight(mouseProjection);

    TweenLite.to(mouse,
        1, {
            y: ny,
            x: nx,
            ease: Power1.easeOut
        });

}

function updateMouseLight(pos) {

    let v = new THREE.Vector3();
    v.copy(pos);
    v.setLength(MOUSE_LIGHT_DISTANCE_TO_CENTER);
    TweenLite.to(mouseLight.position,
        .4, {
            y: v.y,
            x: v.x,
            z: v.z,
            ease: Power1.easeOut
        });

}

function projectCanvasLocation(x, y) {
    let vector = new THREE.Vector3(x, y, 0);
    vector.unproject(camera);
    vector.setLength(SHAPE_RADIUS + 40);
    return vector;
}

function render(time) {
    requestAnimationFrame(render);

    const scroll = getScroll();
    const rotationX = getShapeRotationX(scrollTween.y, time, aboutTween.position);

    updateSceneMaterialsOpacity(scrollTween.y, aboutTween.position);
    updateSceneColors(scrollTween.y);

    updateBlur(scroll, aboutTween.position);

    updateShapeRotationX(rotationX);
    updateShapePosition(scrollTween.y, mouse, time, aboutTween.position);
    updateVertices(time, scrollTween.y, aboutTween.position, rotationX);

    updateScale(scrollTween.y, aboutTween.position);

    updateGrid(scrollTween.y);
    updateCameraPosition(scrollTween.y, aboutTween.position);

    composer.render(clock.getDelta());
}

function onResize() {
    canvas.style.width = '';
    canvas.style.height = '';
    width = canvas.offsetWidth;
    height = canvas.offsetHeight;
    camera.aspect = width / height;
    camera.left = width / -2;
    camera.right = width / 2;
    camera.top = height / 2;
    camera.bottom = height / -2;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

