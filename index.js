import * as THREE from 'three';
import { TweenMax } from "gsap";
import * as Perlin from "perlin";

(function () {
    const AXIS_X = new THREE.Vector3(0, 1, 0);
    const AXIS_Y = new THREE.Vector3(1, 0, 0);

    const WHITE = 0xFFFFFF;
    const RED = 0xFF0000;
    const GREEN = 0x23f660;
    const DARK_BLUE = 0x70B8D7;
    const STRONG_BLUE = 0x0025FF;
    const LIGHT_GREEN = 0x70C4CE;
    const DARKENED_GREEN = 0x0D7182;
    const ORANGE = 0xf66023;
    const PURPLE = 0x590D82;
    const MAGENTA = 0xC6A0C0;
    const PINK = 0xCE70A5;

    const MATERIAL_COLOR_FROM = STRONG_BLUE,
        MATERIAL_COLOR_TO = LIGHT_GREEN,
        BACKGROUND_COLORS = [LIGHT_GREEN, PINK, DARKENED_GREEN],
        LIGHT_2_COLOR_FROM = STRONG_BLUE,
        LIGHT_2_COLOR_TO = RED,
        LIGHT_3_COLOR_FROM = ORANGE,
        LIGHT_3_COLOR_TO = DARKENED_GREEN
        ;

    const canvas = document.querySelector('#scene');

    let width = canvas.offsetWidth,
        height = canvas.offsetHeight;

    const docheight = Math.max(document.body.scrollHeight, document.body.offsetHeight,
        document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);

    const lerpColor = function (ah, bh, amount) {

        let
            ar = ah >> 16, ag = ah >> 8 & 0xff, ab = ah & 0xff,
            br = bh >> 16, bg = bh >> 8 & 0xff, bb = bh & 0xff,
            rr = ar + amount * (br - ar),
            rg = ag + amount * (bg - ag),
            rb = ab + amount * (bb - ab);

        return ((1 << 24) + (rr << 16) + (rg << 8) + rb | 0);
    }

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true
    });


    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.setClearColor(LIGHT_GREEN);

    const scene = new THREE.Scene();
    var camera = new THREE.OrthographicCamera(width / - 2, width / 2, height / 2, height / - 2, 1, 2000);

    // const camera = new THREE.PerspectiveCamera(120, width / height, 1, 1000);
    camera.position.set(360, 0, 600);

    //     var planeGeometry = new THREE.PlaneBufferGeometry( 20, 20, 32, 32 );
    // var planeMaterial = new THREE.MeshStandardMaterial( { color: 0x00ff00 } )
    // var cube = new THREE.Mesh( planeGeometry, planeMaterial );

    var cube = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(800, 800, 32, 32),
        new THREE.MeshPhongMaterial({ color: 0xdddddd, specular: 0x999999,  shading: THREE.FlatShading })
    );
    cube.position.set(300, 0, 0);
    cube.rotateY(-Math.PI / 5);

    scene.add(cube);

    const light = new THREE.HemisphereLight(WHITE, DARKENED_GREEN, .4);
    light.position.set(500, 500, 600);
    scene.add(light);

    const light2 = new THREE.DirectionalLight(LIGHT_2_COLOR_FROM, .7);
    light2.position.set(500, 300, 800);
    scene.add(light2);
    const light3 = new THREE.DirectionalLight(LIGHT_3_COLOR_FROM, .8);
    light3.position.set(-500, 0, 300);
    light3.lookAt
    scene.add(light3);

    // const geometry = new THREE.IcosahedronGeometry(120, 3);
    const geometry = new THREE.DodecahedronGeometry(120, 4);

    geometry.vertices.forEach(vector => {
        vector._original = vector.clone();
        vector.spikes = {
            activated: Math.random() < .3,
            period: (Math.random() * 3 + 3) * 1000,
            size: (Math.random() - 0.5) * 1.5 + 2
        }
    });

    const material = new THREE.MeshPhongMaterial({
        emissive: MATERIAL_COLOR_FROM,
        emissiveIntensity: 0.3,
        // wireframe: true,
        shininess: 0
    });
    const shape = new THREE.Mesh(geometry, material);
    scene.add(shape);

    function onResize() {
        canvas.style.width = '';
        canvas.style.height = '';
        width = canvas.offsetWidth;
        height = canvas.offsetHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
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

        shape.position.x = (mouse.x * scrollTween.y) * 0;
        cube.position.x = (mouse.x) * width - 300;
        shape.position.y = -(scrollTween.y * 200) - (mouse.y * scrollTween.y) * 50;
        // shape.rotateX(-(angleY - .5) * Math.PI / 100);
        // shape.rotateY(-(angleX - .5) * Math.PI / 100);
        // shape.rotateZ(-(scrollTween.y - .5) * Math.PI / 500);


        geometry.vertices.forEach(vector => {

            vector.copy(vector._original);
            // vector.applyAxisAngle(AXIS_X, angleX);
            // vector.applyAxisAngle(AXIS_Y, angleY);
            var v1, v2;
            if (scrollTween.y < .5)
                v1 = 1.3 - scrollTween.y, v2 = getBlobScalar(vector, time);
            else
                v1 = getSpikeScalar(vector, time), v2 = getBlobScalar(vector, time);
            // const spikes = getSpikeScalar(vector, time);
            // const blob = getBlobScalar(vector, time);
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

    let scrollTween = {
        y: getScroll()
    }

    const runOnScroll = function (evt) {
        const s = getScroll();
        TweenMax.to(scrollTween,
            5,
            {
                y: s,
                ease: Power3.easeOut
            });
        // light.color.setHex(lerpColor(WHITE, WHITE, s));
        material.emissive.setHex(lerpColor(MATERIAL_COLOR_FROM, MATERIAL_COLOR_TO, s));
        light2.color.setHex(lerpColor(LIGHT_2_COLOR_FROM, LIGHT_2_COLOR_TO, s));
        light3.color.setHex(lerpColor(LIGHT_3_COLOR_FROM, LIGHT_3_COLOR_TO, s));
        // s %1 / BACKGROUND_COLORS.size - 1;
        if (s < .5)
            renderer.setClearColor(lerpColor(BACKGROUND_COLORS[0], BACKGROUND_COLORS[1], s * 2));
        else if (s >= .5)
            renderer.setClearColor(lerpColor(BACKGROUND_COLORS[1], BACKGROUND_COLORS[2], (s - .5) * 2));
    };
    window.addEventListener("scroll", runOnScroll);

    const mouse = new THREE.Vector2(2, 0.5);
    function onMouseMove(e) {
        TweenMax.to(mouse,
            1,
            {
                y: (e.clientY / height),
                x: (e.clientX / width),
                ease: Power1.easeOut
            });
    }
    window.addEventListener("mousemove", onMouseMove);

    function render(a) {
        requestAnimationFrame(render);
        updateVertices(a);
        geometry.verticesNeedUpdate = true;
        renderer.render(scene, camera);
    }
    requestAnimationFrame(render);

    let resizeTm;
    window.addEventListener("resize", function () {
        resizeTm = clearTimeout(resizeTm);
        resizeTm = setTimeout(onResize, 200);
    });
})();