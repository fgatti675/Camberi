import * as THREE from 'three';
import { TweenMax } from "gsap";
import * as Perlin from "perlin";

(function () {

    const WHITE = 0xFFFFFF,
        RED = 0xFF0000,
        GREEN = 0x23f660,
        STRONG_BLUE = 0x0025FF,
        LIGHT_GREEN = 0x70C4CE,
        DARKENED_GREEN = 0x0D7182,
        ORANGE = 0xf66023,
        PURPLE = 0x590D82,
        MAGENTA = 0xC6A0C0,
        PINK = 0xCE70A5;

    const COLORS = [RED, STRONG_BLUE, DARKENED_GREEN, ORANGE, PURPLE, PINK];

    const MATERIAL_COLOR_FROM = STRONG_BLUE,
        MATERIAL_COLOR_TO = LIGHT_GREEN,
        LIGHT_2_COLOR_FROM = getRandomColor(),
        LIGHT_2_COLOR_TO = getRandomColor(),
        LIGHT_3_COLOR_FROM = getRandomColor(),
        LIGHT_3_COLOR_TO = getRandomColor(),
        RENDERER_CLEAR_COLOR_FROM = increaseBrighness(lerpColor(LIGHT_2_COLOR_FROM, LIGHT_3_COLOR_FROM, .5), .2),
        RENDERER_CLEAR_COLOR_TO = increaseBrighness(lerpColor(LIGHT_2_COLOR_TO, LIGHT_3_COLOR_TO, .5), .2);

        console.log(WHITE)
        console.log(increaseBrighness(WHITE, 0))

    const canvas = document.querySelector('#scene');

    const docheight = Math.max(document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight);

    const mouse = new THREE.Vector2(0, 0);

    const scrollTween = {
        y: getScroll()
    }

    let width = canvas.offsetWidth,
        height = canvas.offsetHeight;

    let renderer, shape, geometry, material, scene, camera, light, light2, light3;

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll);

    initScene();
    requestAnimationFrame(render);
    updateSceneColors(getScroll());

    function initScene() {

        renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true
        });

        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);

        scene = new THREE.Scene();
        camera = new THREE.OrthographicCamera(width / - 2, width / 2, height / 2, height / - 2, 1, 1000);
        camera.position.set(360, 0, 400);
        // const camera = new THREE.PerspectiveCamera(50, width / height, 1, 1000);
        // camera.position.set(360, 0, 400);

        // const plane = new THREE.Mesh(
        //     new THREE.PlaneGeometry(10000, 10000),
        //     new THREE.MeshPhongMaterial()
        // );
        // plane.position.set(0, 0, -300);
        // // plane.rotateY(-Math.PI / 5);

        // scene.add(plane);

        light = new THREE.HemisphereLight(WHITE, PURPLE, .4);
        light.position.set(500, 500, 600);
        scene.add(light);


        light2 = new THREE.DirectionalLight(LIGHT_2_COLOR_FROM, .7);
        light2.position.set(500, 0, 600);
        scene.add(light2);

        light3 = new THREE.DirectionalLight(LIGHT_3_COLOR_FROM, .8);
        light3.position.set(-500, 0, 300);
        light3.lookAt
        scene.add(light3);

        // const geometry = new THREE.IcosahedronGeometry(120, 3);
        geometry = new THREE.DodecahedronGeometry(120, 4);

        geometry.vertices.forEach(vector => {
            vector._original = vector.clone();
            vector.spikes = {
                activated: Math.random() < .3,
                period: (Math.random() * 3 + 3) * 1000,
                size: (Math.random() - 0.5) * 1.5 + 1
            }
        });

        material = new THREE.MeshPhongMaterial({
            emissive: MATERIAL_COLOR_FROM,
            emissiveIntensity: 0.3,
            // wireframe: true,
            shininess: 0
        });

        shape = new THREE.Mesh(geometry, material);
        scene.add(shape);

    }

    function getRandomColor() {
        return COLORS[Math.floor(Math.random() * COLORS.length)];
    }

    function lerpColor(ah, bh, amount) {

        let
            ar = ah >> 16, ag = ah >> 8 & 0xff, ab = ah & 0xff,
            br = bh >> 16, bg = bh >> 8 & 0xff, bb = bh & 0xff,
            rr = ar + amount * (br - ar),
            rg = ag + amount * (bg - ag),
            rb = ab + amount * (bb - ab);

        return ((1 << 24) + (rr << 16) + (rg << 8) + rb | 0);
    }

    function increaseBrighness(color, factor) {

        let
            cr = color >> 16, cg = color >> 8 & 0xff, cb = color & 0xff;
        var r = cr + Math.floor(factor * 255);
        var g = cg + Math.floor(factor * 255);
        var b = cb + Math.floor(factor * 255);

        return ((1 << 24) +  (r << 16) + (g << 8) + b | 0);
    }



    function getSpikeScalar(vector, time) {
        const spikes = vector.spikes;
        if (!spikes.activated) return .1;
        const scalar = ((bounce(time, spikes.period)) * spikes.size) * .3;
        return scalar + .8;
    }

    function getBlobScalar(vector, time) {
        const perlin = Perlin.noise.simplex3(
            (vector.x * 0.008) + (time * 0.0003),
            (vector.y * 0.008) + (time * 0.0003),
            (vector.z * 0.008) + (time * 0.0003)
        );
        const scalar = perlin + 1;
        return scalar;
    }

    // [-1, 1]
    function bounce(t, period) {
        return Math.sin(t / period * (2 * Math.PI));
    }

    // [-1, 1]
    function sigmoid(t) {
        return 1 / (1 + Math.exp(-t));
    }

    function updateVertices(time) {

        const angleX = mouse.x;
        const angleY = mouse.y;

        // const ratio = (sigmoid((scrollTween.y - .5) * 10));
        const ratio = (bounce(scrollTween.y, 2));

        shape.position.x = (mouse.x * scrollTween.y) * 50;
        shape.position.y = (mouse.y * scrollTween.y) * 50;
        // shape.rotateX(-(angleY - .5) * Math.PI / 100);
        // shape.rotateY(-(angleX - .5) * Math.PI / 100);
        // shape.rotateZ(-(scrollTween.y - .5) * Math.PI / 500);

        geometry.vertices.forEach(vector => {

            vector.copy(vector._original);

            var v1, v2;
            if (scrollTween.y < .5)
                v1 = 1.3 - scrollTween.y,
                    v2 = getBlobScalar(vector, time);
            else
                v1 = getSpikeScalar(vector, time),
                    v2 = getBlobScalar(vector, time);

            vector.multiplyScalar((1 - ratio) * v1 + ratio * v2 + 1);
        });
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

    function onScroll(evt) {
        const s = getScroll();
        TweenMax.to(scrollTween,
            4,
            {
                y: s,
                ease: Power3.easeOut
            });
        updateSceneColors(s);
    };

    function updateSceneColors(scroll) {
        let bg = lerpColor(RENDERER_CLEAR_COLOR_FROM, RENDERER_CLEAR_COLOR_TO, scroll);
        // console.log(bg);
        renderer.setClearColor(bg);
        material.emissive.setHex(lerpColor(MATERIAL_COLOR_FROM, MATERIAL_COLOR_TO, scroll));
        light2.color.setHex(lerpColor(LIGHT_2_COLOR_FROM, LIGHT_2_COLOR_TO, scroll));
        light3.color.setHex(lerpColor(LIGHT_3_COLOR_FROM, LIGHT_3_COLOR_TO, scroll));
    }

    function onMouseMove(e) {
        TweenMax.to(mouse,
            1,
            {
                y: (e.clientY / height),
                x: (e.clientX / width),
                ease: Power1.easeOut
            });
    }

    function render(a) {
        requestAnimationFrame(render);
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