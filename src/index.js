import * as THREE from 'three';
import { TweenMax } from "gsap";
import * as Perlin from 'perlin';
import { Vector3 } from 'three';
import Swiper from 'swiper';
import ScrollReveal from 'scrollreveal';
import * as ScrollSnap from 'scrollSnap';
import './main.scss';

(function () {

    const X_AXIS = new THREE.Vector3(1, 0, 0);

    const
        AMBIENT_LIGHT_INTENSITY = .22,
        DIRECTIONAL_LIGHT_INTENSITY = .8,
        MOUSE_LIGHT_INTENSITY = .4,
        BASE_SCALE = 1.2,
        BLUR_PIXELS = 8,
        CAMERA_Y_OFFSET = -300,
        GRID_SPEED = 1400,
        SCALE_INCREMENT = 1.7,
        LIGHT_COLOR_SATURATION = .9,
        BG_COLOR_SATURATION = .75,
        COLOR_LIGHTNESS = .6,
        MOUSE_LIGHT_DISTANCE_TO_CENTER = 650,
        SHAPE_RADIUS = 160,
        SHAPE_RADIUS_SMALL = 120;

    const WHITE = new THREE.Color(0xFFFFFF),
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


    const COLORS = [ORANGE, PURPLE, YELLOW, DARKENED_GREEN, RED, PINK, GREEN, STRONG_BLUE];
    shuffle(COLORS);

    COLORS.forEach(color => {
        // color.setHSL(color.getHSL().h, COLOR_SATURATION, COLOR_LIGHTNESS);
    });

    let colorString = "const COLORS = [";
    colorString += COLORS.map(c => c.string).reduce((a, b) => a + ", " + b);
    colorString += "];";
    console.log(colorString);

    const
        LIGHT_1_COLOR_BASE = COLORS[6],
        LIGHT_2_COLOR_FROM = COLORS[0],
        LIGHT_2_COLOR_TO = COLORS[1],
        LIGHT_3_COLOR_FROM = COLORS[2],
        LIGHT_3_COLOR_TO = COLORS[3],
        MATERIAL_COLOR_FROM = COLORS[4],
        MATERIAL_COLOR_TO = COLORS[5],
        RENDERER_CLEAR_COLOR_FROM = LIGHT_2_COLOR_FROM.clone().lerp(LIGHT_3_COLOR_FROM.clone(), .5).lerp(LIGHT_1_COLOR_BASE.clone(), .3),
        RENDERER_CLEAR_COLOR_TO = LIGHT_2_COLOR_TO.clone().lerp(LIGHT_3_COLOR_TO.clone(), .5).lerp(LIGHT_1_COLOR_BASE.clone(), .3);

    let adjustLightness = function (color) {
        color.setHSL(color.getHSL().h, LIGHT_COLOR_SATURATION, .38);
    };
    adjustLightness(LIGHT_1_COLOR_BASE);
    adjustLightness(MATERIAL_COLOR_FROM);
    adjustLightness(LIGHT_2_COLOR_FROM);
    adjustLightness(LIGHT_3_COLOR_FROM);

    const loader = document.querySelector('.loader');
    const canvas = document.querySelector('#scene');
    const header = document.querySelector('header');
    const location = document.querySelector('.location');
    const content = window.document.documentElement;
    const pages = document.getElementsByClassName('page');
    const fadingPages = document.getElementsByClassName('fade-page');

    const docheight = Math.max(document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight);

    const mouseProjection = new Vector3(0, 0, 0);
    const mouse = new THREE.Vector2(0, 0);

    const scrollTween = {
        y: getScroll()
    }

    let width = canvas.offsetWidth,
        height = canvas.offsetHeight;

    let renderer,
        shape, shape2, shape3,
        geometry,
        grid,
        material, material2, material3,
        scene,
        camera,
        light, light2, light3, mouseLight;

    let onScrollEnd;

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll);

    setUpSwiper();
    setUpScrollReveal();
    setUpScrollSnap();

    setUpBackgroundColors();
    initScene();

    requestAnimationFrame(render);

    let scroll = getScroll();
    updateSceneMaterials(scroll);
    updateBlur(scroll);
    updateHeader(scroll);


    function initScene() {

        renderer = new THREE.WebGLRenderer({
            alpha: true,
            canvas: canvas,
            // antialias: true
        });
        console.log(width);
        renderer.setPixelRatio(window.devicePixelRatio > 1 ? 1.5 : 1);
        renderer.setSize(width, height);

        scene = new THREE.Scene();

        camera = new THREE.OrthographicCamera(width / - 2, width / 2, height / 2, height / - 2, 1, 1000);
        // camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
        camera.position.set(0, 0, 1000);


        light = new THREE.HemisphereLight(WHITE, LIGHT_1_COLOR_BASE, AMBIENT_LIGHT_INTENSITY);
        light.position.set(400, 400, 0);
        scene.add(light);

        light2 = new THREE.DirectionalLight(LIGHT_2_COLOR_FROM, DIRECTIONAL_LIGHT_INTENSITY);
        light2.position.set(400, 0, 500);
        scene.add(light2);

        light3 = new THREE.DirectionalLight(LIGHT_3_COLOR_FROM, DIRECTIONAL_LIGHT_INTENSITY);
        light3.position.set(-400, 0, 500);
        scene.add(light3);

        mouseLight = new THREE.SpotLight(RENDERER_CLEAR_COLOR_FROM, MOUSE_LIGHT_INTENSITY);
        mouseLight.angle = Math.PI / 4;
        mouseLight.distance = 300;
        mouseLight.position.set(0, 0, MOUSE_LIGHT_DISTANCE_TO_CENTER);
        scene.add(mouseLight);

        // geometry = new THREE.IcosahedronGeometry(SHAPE_RADIUS, 4);
        geometry = new THREE.DodecahedronGeometry(width < 600 ? SHAPE_RADIUS_SMALL : SHAPE_RADIUS, 4);
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

        // var newFaces = [];
        // geometry.faces.forEach((f, i) => {
        //     var a = geometry.vertices[f.a];
        //     var b = geometry.vertices[f.b];
        //     var c = geometry.vertices[f.c];
        //     var dist = 50;
        //     if (a.distanceTo(b) < dist && c.distanceTo(b) < dist && a.distanceTo(c) < dist)
        //         newFaces.push(f);
        // });
        // geometry.faces = newFaces;

        material = new THREE.MeshPhongMaterial({
            emissive: MATERIAL_COLOR_FROM,
            emissiveIntensity: .6,
            transparent: true,
            shininess: .3
        });

        // material2 = new THREE.MeshStandardMaterial({
        //     emissive: MATERIAL_COLOR_FROM,
        //     emissiveIntensity: 0.3,
        //     transparent: true,
        //     flatShading: true,
        //     metalness: 0.00,
        //     shininess: 1
        // });

        material2 = material.clone();
        material2.flatShading = true;

        // material2 = new THREE.MeshToonMaterial({
        //     emissive: MATERIAL_COLOR_FROM,
        //     emissiveIntensity: 0.3,
        //     transparent: true,
        //     shininess: 0
        // });

        material3 = material.clone();
        // material3 = new THREE.PointsMaterial({ color: WHITE, size: 10 })

        material3.wireframe = true;

        shape = new THREE.Mesh(geometry, material);
        shape2 = new THREE.Mesh(geometry, material2);
        shape3 = new THREE.Mesh(geometry, material3);
        // shape3 = new THREE.Points(geometry, material3);

        scene.add(shape);
        scene.add(shape2);
        scene.add(shape3);


        var gridGeometry = new THREE.Geometry();
        var size = 1500, step = 75;
        for (var i = - size; i <= size; i += step) {
            for (var j = - size; j <= size; j += step) {
                var star = new THREE.Vector3(i, j, 0);
                gridGeometry.vertices.push(star);
            }
        }
        grid = new THREE.Points(gridGeometry, new THREE.PointsMaterial({ color: WHITE, size: 4 }));

        scene.add(grid);

    }

    function setUpSwiper() {
        new Swiper('.swiper-container', {
            // Optional parameters
            direction: 'horizontal',
            spaceBetween: 15,
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

    function setUpBackgroundColors() {
        let bgPages = document.getElementById('background').getElementsByClassName('page');

        // let bodyBackground = RENDERER_CLEAR_COLOR_FROM.clone().lerp(RENDERER_CLEAR_COLOR_TO, .5);
        // document.body.style.backgroundColor = bodyBackground.getStyle();

        RENDERER_CLEAR_COLOR_FROM.setHSL(RENDERER_CLEAR_COLOR_FROM.getHSL().h, BG_COLOR_SATURATION, COLOR_LIGHTNESS);
        RENDERER_CLEAR_COLOR_TO.setHSL(RENDERER_CLEAR_COLOR_TO.getHSL().h, BG_COLOR_SATURATION, COLOR_LIGHTNESS);
        RENDERER_CLEAR_COLOR_TO.getHSL().h = RENDERER_CLEAR_COLOR_FROM.getHSL.h + .5;

        for (var i = 0; i < bgPages.length; i++) {
            var page = bgPages[i];
            let bg = RENDERER_CLEAR_COLOR_FROM.lerp(RENDERER_CLEAR_COLOR_TO, i * 1 / bgPages.length);

            // hue += 1 / pages.length;
            bg.setHSL(bg.getHSL().h, BG_COLOR_SATURATION, COLOR_LIGHTNESS);

            // let a = 'rgba(' + bg.r*255 + ', '+ bg.g*255 + ', '+ bg.b*255 + ', '+ 0.2 + ')';
            // console.log(a);
            console.log(bg.getHSL().h);
            page.style.backgroundColor = bg.getStyle();

            if (i == 0)
                document.body.style.backgroundColor = bg.getStyle();
        }
    }

    function setUpScrollReveal() {
        let sr = ScrollReveal();
        sr.reveal('.reveal', {
            duration: 2000
        }, 300);
        sr.reveal('.reveal2', {
            viewFactor: 0.1
        });
    }

    function setUpScrollSnap() {
        ScrollSnap.init({

            // NodeList of snap-elements (required) 
            // scrollSnap always snaps to the nearest element 
            elements: document.querySelectorAll('main .page'),

            // Integer - Set a minimum window-size (required) 
            // scrollSnap will be deactivated when the window is smaller than the given dimensions 
            minWidth: 600,
            minHeight: 400,

            // Boolean - Deactivate scrollSnap on mobile devices (optional) 
            detectMobile: true,

            // Boolean - Keyboard-navigation (optional) 
            keyboard: true,

            // Integer - Snap-animation-speed (optional) 
            // Higher = slower 
            duration: 8,

            // Function - Set a custom timing-function for the snap-animation (optional) 
            timing: ScrollSnap._timing

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

    function getBlobScalar(vector, time, mouseProjection, scroll) {

        let rotation = getShapeRotation(scroll);
        let m = mouseProjection.clone();
        m.applyAxisAngle(X_AXIS, -rotation);

        var i = 1 / vector.distanceTo(m ) * 20;
        var value = i * i;
        // vector.multiplyScalar(value + 1);

        const perlin = Perlin.noise.simplex3(
            (vector.x * 0.008) + (time * 0.00045) + (value),
            (vector.y * 0.008) + (time * 0.00045) + (value),
            (vector.z * 0.008) + (time * 0.00045) + (value)
        );
        // const perlin = Perlin.noise.simplex3(
        //     (vector.x * 0.008) + (time * 0.0003),
        //     (vector.y * 0.008) + (time * 0.0003),
        //     (vector.z * 0.008) + (time * 0.0003)
        // );
        const scalar = perlin + value + 1;
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

    function updateVertices(time) {

        var s = sigmoid((scrollTween.y - .7) * 24 - 6) * SCALE_INCREMENT;
        var scale = BASE_SCALE + s;
        shape.scale.set(scale, scale, scale);
        shape2.scale.set(scale, scale, scale);
        shape3.scale.set(scale, scale, scale);

        // const ratio = (sigmoid((scrollTween.y - .5) * 10));
        const ratio = (sinoid(scrollTween.y, 2));

        let rotation = getShapeRotation(scrollTween.y);

        updateShapePosition(getScroll(), mouse);

        shape.rotation.x = rotation;
        shape2.rotation.x = rotation;
        shape3.rotation.x = rotation;

        // const MAGNET_DISTANCE = 50;
        for (var i = 0; i < geometry.vertices.length; i++) {
            let vector = geometry.vertices[i];

            vector.copy(vector._original);

            let v1, v2;
            if (scrollTween.y < .5)
                v1 = getSphereScalar(scrollTween.y),
                    v2 = getBlobScalar(vector, time, mouseProjection, scrollTween.y);
            else
                v1 = getSpikeScalar(vector, scrollTween.y, time),
                    v2 = getBlobScalar(vector, time, mouseProjection, scrollTween.y);

            vector.multiplyScalar((1 - ratio) * v1 + ratio * v2 + 1);


        };
    }

    function getScroll() {
        if (window.pageYOffset != undefined) {
            return (pageYOffset) / (docheight - window.innerHeight);
        }
        else {
            let sx, sy, d = document, r = d.documentElement, b = d.body;
            sy = r.scrollTop || b.scrollTop || 0;
            return (sy) / (docheight - window.innerHeight);
        }
    }

    /*function getScroll() {
        let o = content.scrollTop;
        let i = window.innerHeight;
        let h = content.scrollHeight;
        return (o) / (h - i);
    }*/

    function getShapeRotation(scroll) {
        return scroll * Math.PI;
    }

    function onScroll(evt) {

        evt.preventDefault(); // prevent default browser scroll

        const scroll = getScroll();

        TweenMax.to(scrollTween,
            4,
            {
                y: scroll,
                ease: Power3.easeOut
            });

        updateSceneMaterials(scroll);
        updateBlur(scroll);
        updateHeader(scroll);


        clearTimeout(onScrollEnd);
        onScrollEnd = setTimeout(function () {
            updateURL();
        }, 17);

        fadePages();

    };


    function updateHeader(scroll) {
        let page = pages[0];
        if (page.offsetHeight < content.scrollTop * 2) {
            header.style.opacity = 1;
            location.style.opacity = 0;
        }
        else {
            header.style.opacity = 0;
            location.style.opacity = 1;
        }
    }

    function updateBlur(scroll) {
        if (scroll > (1 - 1 / pages.length) + .05) {
            let blurValue = (scroll - .8) / .2 * BLUR_PIXELS;
            // canvas.style = "-webkit-filter:blur(" + blurValue + "px)";
            // canvas.setAttribute("style","-ms-filter:blur(" + blurValue + "px)")
            canvas.setAttribute("style", "-webkit-filter:blur(10px)")

            // canvas.style.filter = "blur(10px)";
        } else {
            canvas.style.filter = null;
        }
    }
    function updateCameraPosition(scroll) {
        let s = 1 - 2 * (1 - scroll);
        s = CAMERA_Y_OFFSET - s * s * CAMERA_Y_OFFSET; // https://www.desmos.com/calculator/xkxkvj1qwi
        camera.position.y = s;
    }

    function updateShapePosition(scroll, mouse) {

        let posX = (mouse.x) * 50;
        let posY = (mouse.y) * 50;

        shape.position.x = posX;
        shape.position.y = posY;
        shape2.position.x = posX;
        shape2.position.y = posY;
        shape3.position.x = posX;
        shape3.position.y = posY;

    }

    function updateGrid(scroll) {
        grid.position.y = GRID_SPEED * scroll + camera.position.y; // compensate for the camera translation, should be done better
        // grid.position.z = 100 * scroll;
        // grid.rotation.x = -Math.PI /10* scroll;
    }

    function fadePages() {
        for (var i = 0; i < fadingPages.length; i++) {
            var page = fadingPages[i];
            let off = page.offsetTop - content.scrollTop;
            let h = page.offsetHeight;
            let o = off < -h ? 0 : (off > 0 ? 1 : (h + off) / h);
            if (o != 0, 1)
                page.style.opacity = Math.sin(o * Math.PI / 2) + .1;
        }
    }

    function updateURL() {

        var c = content.scrollTop - height / 2;
        for (var i = 0; i < pages.length; i++) {
            var page = pages[i];
            if (c <= page.offsetTop) {
                history.replaceState({}, 'Camberí', '#' + page.id);
                break;
            }
        }
    }

    function updateSceneMaterials(scroll) {

        var o1 = 1 - sigmoid(scroll * 18 - 11.5);
        var o2 = quadratic(scroll, -25, 6, .75); // https://www.desmos.com/calculator/la8eufllq5
        var o3 = quadratic(scroll, -25, 6, .5);
        // console.log(scroll + ": " + o2);

        shape.visible = o1 > 0;
        shape2.visible = o2 > 0;
        shape3.visible = o3 > 0;

        material.opacity = o1;
        material2.opacity = o2;
        material3.opacity = o3;

        // grid.material.opacity = 1 - o3;

        material.emissive.set(MATERIAL_COLOR_FROM.clone().lerp(MATERIAL_COLOR_TO, scroll));
        light2.color.set(LIGHT_2_COLOR_FROM.clone().lerp(LIGHT_2_COLOR_TO, scroll));
        light3.color.set(LIGHT_3_COLOR_FROM.clone().lerp(LIGHT_3_COLOR_TO, scroll));
    }

    function onMouseMove(e) {

        // e.preventDefault();

        var ny = -(event.clientY / window.innerHeight) * 2 + 1;
        var nx = (event.clientX / window.innerWidth) * 2 - 1;

        mouseProjection.copy(projectCanvasLocation(nx, ny));
        updateMouseLight(mouseProjection);

        TweenMax.to(mouse,
            1,
            {
                y: ny,
                x: nx,
                ease: Power1.easeOut
            });

    }

    function updateMouseLight(pos) {

        let v = new THREE.Vector3();
        v.copy(pos);
        v.setLength(MOUSE_LIGHT_DISTANCE_TO_CENTER);
        TweenMax.to(mouseLight.position,
            .4,
            {
                y: v.y,
                x: v.x,
                z: v.z,
                ease: Power1.easeOut
            });

    }

    function projectCanvasLocation(x, y) {
        var vector = new THREE.Vector3(x, y, 0);
        vector.unproject(camera);
        vector.setLength(SHAPE_RADIUS + 40);
        return vector;
    }

    function render(a) {
        requestAnimationFrame(render);

        updateCameraPosition(scrollTween.y);
        updateGrid(scrollTween.y);

        updateVertices(a);
        geometry.verticesNeedUpdate = true;
        renderer.render(scene, camera);
    }

    function onResize() {
        canvas.style.width = '';
        canvas.style.height = '';
        width = canvas.offsetWidth;
        height = canvas.offsetHeight;
        camera.aspect = width / height;
        camera.left = width / - 2;
        camera.right = width / 2;
        camera.top = height / 2;
        camera.bottom = height / - 2;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    }

})();