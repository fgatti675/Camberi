import * as THREE from 'three';
import {
    TweenLite
} from "gsap";
import * as Perlin from 'perlin';
import {
    Vector3
} from 'three';
import Swiper from 'swiper';
import ScrollReveal from 'scrollreveal';
import './main.scss';
import scrollSnapPolyfill from 'css-scroll-snap-polyfill'


(function () {

    const X_AXIS = new THREE.Vector3(1, 0, 0);

    const
        AMBIENT_LIGHT_INTENSITY = .22,
        DIRECTIONAL_LIGHT_INTENSITY = .8,
        MOUSE_LIGHT_INTENSITY = .4,
        COLOR_VARIANCE = .5,
        BASE_SCALE = 1.2,
        BLUR_PIXELS = 8,
        ABOUT_POINTS_SIZE = 3,
        ABOUT_POINTS_SCALE = 2,
        ABOUT_POINTS_OPACITY = 1,
        ABOUT_ROTATION_SPEED = 3000,
        ABOUT_CAMERA_Y_OFFSET = 600,
        SHAPE_Y_OFFSET = 200,
        CAMERA_Y_OFFSET_SCROLL = -300,
        CAMERA_Z_OFFSET = 1600,
        GRID_SPEED = 1400,
        SCALE_INCREMENT = 1.7,
        LIGHT_COLOR_SATURATION = .9,
        COLOR_LIGHTNESS = .37,
        BG_COLOR_SATURATION = .75,
        BG_COLOR_LIGHTNESS = .5,
        MOUSE_LIGHT_DISTANCE_TO_CENTER = 700,
        SHAPE_RADIUS = 160,
        SHAPE_RADIUS_SMALL = 120;


    const WHITE = new THREE.Color(0xFFFFFF),
        GREY = new THREE.Color(0x666666),
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
    // const COLORS = [ORANGE, PURPLE, YELLOW, DARKENED_GREEN, RED, PINK, GREEN, STRONG_BLUE];

    // const COLORS = [randomColor(), randomColor(), randomColor(), randomColor(), randomColor(), randomColor(), randomColor(), randomColor()];

    // const COLORS = [ORANGE, PURPLE, STRONG_BLUE, DARKENED_GREEN, RED, PINK, GREEN];
    // const COLORS = [ORANGE, PURPLE, STRONG_BLUE, PINK, RED, DARKENED_GREEN, GREEN];
    // const COLORS = [GREEN, STRONG_BLUE, PINK, RED, DARKENED_GREEN, ORANGE, PURPLE];
    // const COLORS = [RED, PINK, PURPLE, STRONG_BLUE, DARKENED_GREEN, ORANGE, GREEN];
    // const COLORS = [PINK, PURPLE, DARKENED_GREEN, GREEN, STRONG_BLUE, ORANGE, RED];
    // const COLORS = [ORANGE, RED, PURPLE, STRONG_BLUE, DARKENED_GREEN, PINK, GREEN];
    // const COLORS = [DARKENED_GREEN, PINK, RED, STRONG_BLUE, PURPLE, GREEN, ORANGE];
    // const COLORS = [PINK, GREEN, ORANGE, RED, PURPLE, STRONG_BLUE, DARKENED_GREEN];
    // const COLORS = [RED, PINK, GREEN, STRONG_BLUE, ORANGE, PURPLE, DARKENED_GREEN];
    // const COLORS = [RED, STRONG_BLUE, GREEN, PINK, ORANGE, DARKENED_GREEN, PURPLE];
    // const COLORS = [PURPLE, GREEN, ORANGE, PINK, RED, STRONG_BLUE, DARKENED_GREEN];
    // const COLORS = [RED, STRONG_BLUE, PINK, ORANGE, PURPLE, DARKENED_GREEN, GREEN];
    // const COLORS = [RED, PINK, GREEN, PURPLE, ORANGE, STRONG_BLUE, DARKENED_GREEN];
    // const COLORS = [PINK, RED, PURPLE, STRONG_BLUE, GREEN, ORANGE, DARKENED_GREEN];

    // TOO BRIGHT:
    // const COLORS = [GREEN, PURPLE, PINK, STRONG_BLUE, ORANGE, DARKENED_GREEN, RED];
    // const COLORS = [GREEN, PURPLE, PINK, STRONG_BLUE, ORANGE, DARKENED_GREEN, RED];

    // COLORS.forEach(color => {
    //     // color.setHSL(color.getHSL().h, COLOR_SATURATION, COLOR_LIGHTNESS);
    // });

    let
        LIGHT_1_COLOR_BASE,
        LIGHT_2_COLOR_FROM,
        LIGHT_2_COLOR_TO,
        LIGHT_3_COLOR_FROM,
        LIGHT_3_COLOR_TO,
        MATERIAL_COLOR_FROM,
        MATERIAL_COLOR_TO,
        BACKGROUND_COLOR_FROM,
        BACKGROUND_COLOR_TO;


    const shuffleButton = document.getElementById('shuffle_colors_btn');
    const loader = document.querySelector('.loader');
    const main = document.querySelector('main');
    const aboutPage = document.querySelector('#about');
    const canvas = document.querySelector('#scene');
    const header = document.querySelector('header');
    const location = document.querySelector('.location');
    const background = document.getElementById('background');
    // const content = window.document.documentElement;
    const body = document.querySelector('body');
    const pages = document.querySelectorAll('main .page');
    const fadingPages = document.getElementsByClassName('fade-page');

    const docheight = Math.max(document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight);

    const mouseProjection = new Vector3(0, 0, 0);
    const mouse = new THREE.Vector2(0, 0);

    const blurEnabled = !navigator.userAgent.includes("Firefox");

    const scrollTween = {
        y: getScroll()
    }

    const aboutTween = {
        position: 0
    }

    let width = canvas.offsetWidth,
        height = canvas.offsetHeight;

    let renderer,
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

    let onScrollEnd;

    // scrollSnapPolyfill()
    setUpSwiper();
    setUpScrollReveal();

    // shuffle(COLORS);
    setUpLightColors();
    setUpBackgroundColors();
    initScene();

    requestAnimationFrame(render);

    let scroll = getScroll();
    updateSceneMaterialsOpacity(scroll, aboutTween.position);
    updateSceneColors(scrollTween.y);
    updateBlur(scroll, aboutPage.position);
    updateHeader(scroll);

    onUrlFragmentChange(getUrlFragment(document.URL));

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("hashchange", onHashChange);
    main.addEventListener("scroll", onScroll);

    shuffleButton.addEventListener("click", onShuffleClick);

    onShuffleClick();

    function initScene() {

        renderer = new THREE.WebGLRenderer({
            alpha: true,
            canvas: canvas,
            // antialias: true
        });
        renderer.setPixelRatio(window.devicePixelRatio > 1 ? 1.5 : 1);
        renderer.setSize(width, height);

        scene = new THREE.Scene();

        camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 1, 2000);
        // camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
        camera.position.set(0, 0, CAMERA_Z_OFFSET);


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

        // geometry = new THREE.IcosahedronGeometry(SHAPE_RADIUS, 4);
        geometry = new THREE.DodecahedronGeometry(width < 600 ? SHAPE_RADIUS_SMALL : SHAPE_RADIUS, 4);
        // geometry = new THREE.TorusGeometry(SHAPE_RADIUS / 2, SHAPE_RADIUS / 4, 10, 461);
        // let torusGeometry = new THREE.TorusGeometry(SHAPE_RADIUS / 2, SHAPE_RADIUS / 4, 10, 461);


        geometry.vertices.forEach((vector, i) => {

            vector._original = vector.clone();
            // let d = 100000;
            // torusGeometry.vertices.forEach(element => {
            //     let e = element.distanceTo(vector);
            //     if (e < d) {
            //         d = e;
            //         vector._torusEquivalent = element;
            //     }
            // });

            vector.spikes = {
                activated: Math.random() < .3,
                period: (Math.random() * 3 + 3) * 1000,
                size: (Math.random() - 0.5) * 1.5 + 1
            }
        });

        // let newFaces = [];
        // geometry.faces.forEach((f, i) => {
        //     let a = geometry.vertices[f.a];
        //     let b = geometry.vertices[f.b];
        //     let c = geometry.vertices[f.c];
        //     let dist = 50;
        //     if (a.distanceTo(b) < dist && c.distanceTo(b) < dist && a.distanceTo(c) < dist)
        //         newFaces.push(f);
        // });
        // geometry.faces = newFaces;

        material = new THREE.MeshLambertMaterial({
            emissive: MATERIAL_COLOR_FROM,
            emissiveIntensity: .6,
            transparent: true,
            // reflectivity: 10,
            // flatShading: true,
            // shininess: 2
        });

        // material2 = new THREE.MeshStandardMaterial({
        //     emissive: MATERIAL_COLOR_FROM,
        //     emissiveIntensity: 0.3,
        //     transparent: true,
        //     flatShading: true,
        //     metalness: 0.00,
        //     shininess: 1
        // });

        material2 = new THREE.MeshPhongMaterial({
            emissive: MATERIAL_COLOR_FROM,
            emissiveIntensity: .6,
            transparent: true,
            // premultipliedAlpha: true,
            shininess: 2
        });
        material2.flatShading = true;

        // material2 = new THREE.MeshToonMaterial({
        //     emissive: MATERIAL_COLOR_FROM,
        //     emissiveIntensity: 0.3,
        //     transparent: true,
        //     shininess: 0
        // });

        materialWireframe = new THREE.MeshPhongMaterial({
            emissive: MATERIAL_COLOR_FROM,
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
            size: 6
        }));

        scene.add(grid);

    }

    function setUpSwiper() {
        new Swiper('.swiper-container', {
            // Optional parameters
            direction: 'horizontal',
            spaceBetween: 16,
            speed: 800,
            autoplay: {
                delay: 5000,
            },
            loop: true,

            // If we need pagination
            pagination: {
                el: '.swiper-pagination',
            },

            // // Navigation arrows
            // navigation: {
            //     nextEl: '.swiper-button-next',
            //     prevEl: '.swiper-button-prev',
            // },

            // And if we need scrollbar
            scrollbar: {
                el: '.swiper-scrollbar',
            },
        });
    }

    function setUpLightColors() {

        const randomColor = _ => new THREE.Color().setHSL(Math.random(), LIGHT_COLOR_SATURATION, COLOR_LIGHTNESS);
        const colorWithHue = hue => new THREE.Color().setHSL(hue, LIGHT_COLOR_SATURATION, COLOR_LIGHTNESS);
        MATERIAL_COLOR_FROM = randomColor();
        MATERIAL_COLOR_TO = randomColor();
        LIGHT_1_COLOR_BASE = colorWithHue(MATERIAL_COLOR_FROM.getHSL().h + (Math.random() - .5) * COLOR_VARIANCE);
        LIGHT_2_COLOR_FROM = colorWithHue(MATERIAL_COLOR_FROM.getHSL().h + COLOR_VARIANCE/2);
        LIGHT_3_COLOR_FROM = colorWithHue(MATERIAL_COLOR_FROM.getHSL().h - COLOR_VARIANCE/2);
        LIGHT_2_COLOR_TO = colorWithHue(MATERIAL_COLOR_TO.getHSL().h - COLOR_VARIANCE/2);
        LIGHT_3_COLOR_TO = colorWithHue(MATERIAL_COLOR_TO.getHSL().h + COLOR_VARIANCE/2);
        BACKGROUND_COLOR_FROM = MATERIAL_COLOR_FROM.clone().lerp(LIGHT_2_COLOR_FROM.clone().lerp(LIGHT_3_COLOR_FROM.clone(), .5).lerp(LIGHT_1_COLOR_BASE.clone(), .3), .5);
        BACKGROUND_COLOR_TO = MATERIAL_COLOR_FROM.clone().lerp(LIGHT_2_COLOR_TO.clone().lerp(LIGHT_3_COLOR_TO.clone(), .5).lerp(LIGHT_1_COLOR_BASE.clone(), .3), .5);
        // BACKGROUND_COLOR_FROM = LIGHT_2_COLOR_FROM.clone().lerp(LIGHT_3_COLOR_FROM.clone(), .5).lerp(LIGHT_1_COLOR_BASE.clone(), .3);
        // BACKGROUND_COLOR_TO = LIGHT_2_COLOR_TO.clone().lerp(LIGHT_3_COLOR_TO.clone(), .5).lerp(LIGHT_1_COLOR_BASE.clone(), .3);
        // BACKGROUND_COLOR_FROM = MATERIAL_COLOR_FROM;
        // BACKGROUND_COLOR_TO = MATERIAL_COLOR_TO;

        // console.log("m " + MATERIAL_COLOR_TO.getHSL().h);
        // console.log(LIGHT_2_COLOR_TO.getHSL().h);
        // console.log(LIGHT_3_COLOR_TO.getHSL().h);


        let adjustLightness = function (color) {
            color.setHSL(color.getHSL().h, LIGHT_COLOR_SATURATION, .37);
        };
        // adjustLightness(LIGHT_1_COLOR_BASE);
        // adjustLightness(MATERIAL_COLOR_FROM);
        // adjustLightness(LIGHT_2_COLOR_FROM);
        // adjustLightness(LIGHT_3_COLOR_FROM);
        // adjustLightness(LIGHT_2_COLOR_TO);
        // adjustLightness(LIGHT_3_COLOR_TO);

    }

    function printColorScheme() {
        // let colorString = "const COLORS = [";
        // colorString += COLORS.map(c => c.string).reduce((a, b) => a + ", " + b);
        // colorString += "];";
        // console.log(colorString);
    }

    function setUpBackgroundColors() {
        let bgPages = document.getElementsByClassName('bg_page');

        // let bodyBackground = RENDERER_CLEAR_COLOR_FROM.clone().lerp(RENDERER_CLEAR_COLOR_TO, .5);
        // document.body.style.backgroundColor = bodyBackground.getStyle();

        BACKGROUND_COLOR_FROM.setHSL(BACKGROUND_COLOR_FROM.getHSL().h, BG_COLOR_SATURATION, BG_COLOR_LIGHTNESS);
        BACKGROUND_COLOR_TO.setHSL(BACKGROUND_COLOR_TO.getHSL().h, BG_COLOR_SATURATION, BG_COLOR_LIGHTNESS);
        // BACKGROUND_COLOR_TO.getHSL().h = BACKGROUND_COLOR_FROM.getHSL.h + .5;

        for (let i = 0; i < bgPages.length; i++) {
            let page = bgPages[i];
            let bg = BACKGROUND_COLOR_FROM.lerp(BACKGROUND_COLOR_TO, i * 1 / bgPages.length);
            // hue += 1 / pages.length;
            bg.setHSL(bg.getHSL().h, BG_COLOR_SATURATION, BG_COLOR_LIGHTNESS);

            // let a = 'rgba(' + bg.r*255 + ', '+ bg.g*255 + ', '+ bg.b*255 + ', '+ 0.2 + ')';
            // console.log(a);
            page.style.backgroundColor = bg.getStyle();

            // if (i == 0)
            //     document.body.style.backgroundColor = bg.getStyle();
        }
    }

    function setUpScrollReveal() {
        let sr = ScrollReveal({
            container: main
        });
        sr.reveal('.reveal', {
            duration: 2000
        }, 300);
        sr.reveal('.reveal2', {
            reset: true
        });
    }

    function shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
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

    function getPerlinScalar(vector, time, mouseProjection, scroll, aboutPosition) {
        let rotation = getShapeRotation(scroll, time, aboutPosition); // compensate for shape rotation

        let m = mouseProjection.clone();
        m.applyAxisAngle(X_AXIS, -rotation);
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

    function updateVertices(time, scroll, aboutPosition) {

        const ratio = (sinoid(scroll, 2));

        for (let i = 0; i < geometry.vertices.length; i++) {
            let vector = geometry.vertices[i];

            vector.copy(vector._original);

            let shereScalar = scroll < .5 ? getSphereScalar(scroll) : 0;
            let spikeScalar = scroll > .5 || aboutTween.position !== 0 ? getSpikeScalar(vector, scroll, time) : 0;
            let perlinScalar = getPerlinScalar(vector, time, mouseProjection, scroll, aboutPosition);

            let v1, v2;
            if (scroll < .5)
                v1 = shereScalar, v2 = perlinScalar;
            else
                v1 = spikeScalar, v2 = perlinScalar;

            let regularScrollScalar = (1 - ratio) * v1 + ratio * v2;
            let aboutScalar = perlinScalar * .3 + spikeScalar * .02;

            vector.multiplyScalar((regularScrollScalar * (1 - aboutPosition) + aboutScalar * aboutPosition) + 1);

        };

        geometry.verticesNeedUpdate = true;
    }

    // function getScroll() {
    //     if (window.pageYOffset != undefined) {
    //         return (pageYOffset) / (docheight - window.innerHeight);
    //     } else {
    //         let sx, sy, d = document,
    //             r = d.documentElement,
    //             b = d.body;
    //         sy = r.scrollTop || b.scrollTop || 0;
    //         return (sy) / (docheight - window.innerHeight);
    //     }
    // }

    function getScroll() {
        let o = main.scrollTop;
        let i = window.innerHeight;
        let h = main.scrollHeight;
        return (o) / (h - i);
    }

    let i = 0;
    function getShapeRotation(scroll, time, aboutPosition) {
        // return 0;
        let a = (time / ABOUT_ROTATION_SPEED % (Math.PI * 2));
        // return a;
        // if (i%1000==0)
        //     console.log(a);
        // i++;
        return (scroll * Math.PI * 2 + aboutPosition * a);
    }

    function onShuffleClick() {
        let shuffleInterval = 150;
        console.log("Shuffle up!");
        setTimeout(() => shuffleColors(), shuffleInterval);
        setTimeout(() => shuffleColors(), shuffleInterval * 2);
        setTimeout(() => shuffleColors(), shuffleInterval * 3);
        setTimeout(() => shuffleColors(), shuffleInterval * 4);
        setTimeout(() => shuffleColors(), shuffleInterval * 5);
        printColorScheme();
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

            // prevScroll = content.scrollTop;
            // window.removeEventListener("scroll", onScroll);
            for (let i = 0; i < pages.length; i++) {
                let page = pages[i];
                page.classList.add('displaced');
            }
            body.classList.add('displaced');
            body.classList.add('light_bg');
            background.classList.add('displaced');
            aboutPage.classList.add('active');
            aboutPage.classList.add('displayedOnce');
            TweenLite.to(aboutTween,
                3, {
                    position: 1,
                    ease: Power4.easeOut
                });
            // disableBlur();

        } else {
            for (let i = 0; i < pages.length; i++) {
                let page = pages[i];
                page.classList.remove('displaced');
            }
            background.classList.remove('displaced');
            aboutPage.classList.remove('active');
            body.classList.remove('displaced');
            body.classList.remove('light_bg');
            // if (oldFragment === "about")
            //     content.scrollTo({
            //         top: prevScroll
            //     });
            // window.addEventListener("scroll", onScroll);
            TweenLite.to(aboutTween,
                1, {
                    position: 0,
                    ease: Power3.easeInOut
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


        clearTimeout(onScrollEnd);
        // onScrollEnd = setTimeout(function () {
        updateURL();
        // }, 15);

        // fadePages();

    };


    function updateHeader(scroll, aboutPosition) {
        let page = pages[0];
        if (page.offsetHeight < main.scrollTop * 2 || aboutPosition > .1) {
            header.classList.remove('hidden');
            location.classList.add('hidden');
            // header.style.opacity = 1;
            // location.style.opacity = 0;
        } else {
            header.classList.add('hidden');
            location.classList.remove('hidden');
            // header.style.opacity = 0;
            // location.style.opacity = 1;
        }
    }

    function updateBlur(scroll, aboutPosition) {

        if (!blurEnabled) return;

        if (aboutPosition == 1) {
            disableBlur();
            return;
        }

        if (scroll > (1 - 1 / pages.length) + .05) {
            enableBlur(scroll, aboutPosition);
        } else {
            disableBlur();
        }
    }

    function enableBlur(scroll, aboutPosition) {
        if (!blurEnabled) return;
        let blurValue = Math.min((scroll - .8) / .2, (1 - aboutPosition)) * BLUR_PIXELS;
        canvas.setAttribute("style", "filter:blur(" + blurValue + "px)");
    }

    function disableBlur() {
        if (!blurEnabled) return;
        canvas.style.filter = null;
    }

    function updateShapeRotation(scroll, time, aboutPosition) {
        // camera.rotation.x = (aboutPosition) * Math.PI / 6;
        let rotation = getShapeRotation(scroll, time, aboutPosition);
        shape.rotation.x = rotation;
        shape2.rotation.x = rotation;
        shapeWireframe.rotation.x = rotation;
        shapePoints.rotation.x = rotation;
    }



    function updateScale(scroll, aboutPosition) {
        let value = sigmoid((scroll - .7) * 24 - 6) * (1 - aboutPosition);
        let scale = BASE_SCALE + value * SCALE_INCREMENT + (aboutPosition) * ABOUT_POINTS_SCALE;
        let aboutXScaleMultiplier = 3;
        shape.scale.set(scale + aboutXScaleMultiplier * aboutPosition, scale, scale);
        shape2.scale.set(scale + aboutXScaleMultiplier * aboutPosition, scale, scale);
        shapeWireframe.scale.set(scale + aboutXScaleMultiplier * aboutPosition, scale, scale);
        shapePoints.scale.set(scale + aboutXScaleMultiplier * aboutPosition, scale, scale);
    }



    function updateCameraPosition(scroll, aboutPosition) {
        let s = 1 - 2 * (1 - scroll);
        s = CAMERA_Y_OFFSET_SCROLL - s * s * CAMERA_Y_OFFSET_SCROLL; // https://www.desmos.com/calculator/xkxkvj1qwi
        camera.position.y = s * (1 - aboutPosition) + aboutPosition * ABOUT_CAMERA_Y_OFFSET;
        // camera.position.x = -s * (1 - aboutPosition) + aboutPosition * ABOUT_CAMERA_Y_OFFSET;

        // console.log(s)
        // camera.position.y = CAMERA_Y_OFFSET * aboutPosition;

        // camera.position.z = CAMERA_Z_OFFSET * (1-aboutPosition) + 500;
    }


    function updateShapePosition(scroll, mouse, time, aboutPosition) {

        // let s = 1 - 2 * (1 - scroll);
        // s = SHAPE_Y_OFFSET - s * s * SHAPE_Y_OFFSET; // https://www.desmos.com/calculator/xkxkvj1qwi
        // // camera.position.y = s * (1 - aboutPosition) + aboutPosition;


        let posX = (mouse.x) * 50;
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
        // grid.position.z = 100 * scroll;
        // grid.rotation.x = -Math.PI /10* scroll;
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
                history.replaceState({}, 'Camberí', '#' + page.id);
                break;
            }
        }
    }

    function updateSceneMaterialsOpacity(scroll, aboutPosition) {

        let o1 = 1 - sigmoid(scroll * 18 - 11.5);
        let o2 = quadratic(scroll, -25, 6, .75); // https://www.desmos.com/calculator/la8eufllq5
        let o3 = quadratic(scroll, -25, 6, .4);
        // console.log(scroll + ": " + o2);

        // shape.visible = o1 > 0;
        // shape2.visible = o2 > 0;
        // shape3.visible = o3 > 0;

        material.opacity = o1 * 2 * (1 - aboutPosition);
        material2.opacity = Math.max(o2 * 2 * (1 - aboutPosition), aboutPosition * .0);

        // if (material.opacity < .1) 
        // scene.remove(shape);
        // else 
        // scene.add(shape);
        // if (material2.opacity < .1) scene.remove(shape2);
        // else scene.add(shape2);
        // if (materialWireframe.opacity < .1) scene.remove(shapeWireframe);
        // else scene.add(shapeWireframe);

        materialWireframe.opacity = Math.max(o3 * (1 - aboutPosition), .4 * aboutPosition);
        materialPoints.opacity = aboutPosition * ABOUT_POINTS_OPACITY;
    }

    function updateSceneColors(scroll) {

        light.groundColor = LIGHT_1_COLOR_BASE;

        let materialColor = MATERIAL_COLOR_FROM.clone().lerp(MATERIAL_COLOR_TO, scroll);
        material.emissive.set(materialColor);
        material2.emissive.set(materialColor);
        materialWireframe.color.set(LIGHT_1_COLOR_BASE);

        light2.color.set(LIGHT_2_COLOR_FROM.clone().lerp(LIGHT_2_COLOR_TO, scroll));
        light3.color.set(LIGHT_3_COLOR_FROM.clone().lerp(LIGHT_3_COLOR_TO, scroll));
    }

    function onMouseMove(e) {

        // e.preventDefault();

        let ny = -(event.clientY / window.innerHeight) * 2 + 1;
        let nx = (event.clientX / window.innerWidth) * 2 - 1;

        // let p = projectCanvasLocation(nx, ny);

        mouseProjection.copy(projectCanvasLocation(nx, ny));
        updateMouseLight(mouseProjection);

        // TweenLite.to(mouseProjection,
        //     1, {
        //         y: p.y,
        //         x: p.x,
        //         z: p.z,
        //         ease: Power1.easeOut
        //     });
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
        updateSceneMaterialsOpacity(scrollTween.y, aboutTween.position);
        updateSceneColors(scrollTween.y);

        updateBlur(scrollTween.y, aboutTween.position);
        updateHeader(scrollTween.y, aboutTween.position);

        updateCameraPosition(scrollTween.y, aboutTween.position);
        updateShapeRotation(scrollTween.y, time, aboutTween.position);
        updateShapePosition(scrollTween.y, mouse, time, aboutTween.position);
        updateGrid(scrollTween.y);


        updateVertices(time, scrollTween.y, aboutTween.position);
        updateScale(scrollTween.y, aboutTween.position);

        renderer.render(scene, camera);
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

    // setInterval(function(){
    //     onShuffleClick();
    // }, 800);

})();