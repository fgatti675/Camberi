import * as THREE from 'three';
import { TweenMax } from "gsap";
import * as Perlin from 'perlin';
import { Vector3 } from 'three';
import './main.scss';


(function () {

    const
        AMBIENT_LIGHT_INTENSITY = .4,
        DIRECTIONAL_LIGHT_INTENSITY = .7,
        MOUSE_LIGHT_INTENSITY = .5,
        BASE_SCALE = 1,
        SCALE_INCREMENT = 1.7,
        MOUSE_LIGHT_DISTANCE_TO_CENTER = 600,
        SHAPE_RADIUS = 160;

    const WHITE = new THREE.Color(0xFFFFFF),
        RED = new THREE.Color(0xFF0000),
        GREEN = new THREE.Color(0x09CAA1),
        STRONG_BLUE = new THREE.Color(0x0025FF),
        LIGHT_GREEN = new THREE.Color(0x70C4CE),
        DARKENED_GREEN = new THREE.Color(0x0D7182),
        ORANGE = new THREE.Color(0xf66023),
        PURPLE = new THREE.Color(0x590D82),
        MAGENTA = new THREE.Color(0xC6A0C0),
        PINK = new THREE.Color(0xCE70A5);

    const COLORS = [RED, STRONG_BLUE, DARKENED_GREEN, ORANGE, PURPLE, PINK, GREEN];
    // COLORS.forEach(color => {
    //     color.setHSL(color.getHSL().h, .9, .55);

    // });
    shuffle(COLORS);
    console.log(COLORS);

    const MATERIAL_COLOR_FROM = COLORS[4],
        MATERIAL_COLOR_TO = COLORS[5],
        LIGHT_1_COLOR_BASE = COLORS[6],
        LIGHT_2_COLOR_FROM = COLORS[0],
        LIGHT_2_COLOR_TO = COLORS[1],
        LIGHT_3_COLOR_FROM = COLORS[2],
        LIGHT_3_COLOR_TO = COLORS[3],
        RENDERER_CLEAR_COLOR_FROM = LIGHT_2_COLOR_FROM.clone().lerp(LIGHT_3_COLOR_FROM.clone(), .5),
        RENDERER_CLEAR_COLOR_TO = LIGHT_2_COLOR_TO.clone().lerp(LIGHT_3_COLOR_TO.clone(), .5);

    RENDERER_CLEAR_COLOR_FROM.setHSL(RENDERER_CLEAR_COLOR_FROM.getHSL().h, 1, .6);
    RENDERER_CLEAR_COLOR_TO.setHSL(RENDERER_CLEAR_COLOR_TO.getHSL().h, 1, .6);

    const canvas = document.querySelector('#scene');
    const content = document.querySelector('main');
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

    let renderer, shape, shape2, shape3, geometry, material, material2, material3, scene, camera, light, light2, light3, mouseLight;

    let onScrollEnd;

    window.addEventListener("resize", onResize);
    content.addEventListener("mousemove", onMouseMove);
    content.addEventListener("scroll", onScroll);

    initScene();
    requestAnimationFrame(render);
    updateSceneMaterials(getScroll());

    function initScene() {

        renderer = new THREE.WebGLRenderer({
            alpha: true,
            canvas: canvas,
            antialias: true
        });

        renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
        renderer.setSize(width, height);

        scene = new THREE.Scene();

        camera = new THREE.OrthographicCamera(width / - 2, width / 2, height / 2, height / - 2, 1, 1000);
        // camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
        camera.position.set(0, -200, 1000);


        light = new THREE.HemisphereLight(WHITE, LIGHT_1_COLOR_BASE, AMBIENT_LIGHT_INTENSITY);
        light.position.set(300, 300, 0);
        scene.add(light);

        light2 = new THREE.DirectionalLight(LIGHT_2_COLOR_FROM, DIRECTIONAL_LIGHT_INTENSITY);
        light2.position.set(300, 0, 500);
        scene.add(light2);

        light3 = new THREE.DirectionalLight(LIGHT_3_COLOR_FROM, DIRECTIONAL_LIGHT_INTENSITY);
        light3.position.set(-300, 0, 500);
        scene.add(light3);

        mouseLight = new THREE.SpotLight(RENDERER_CLEAR_COLOR_FROM, MOUSE_LIGHT_INTENSITY);
        mouseLight.angle = Math.PI / 4;
        mouseLight.distance = 300;
        mouseLight.position.set(0, 0, MOUSE_LIGHT_DISTANCE_TO_CENTER);
        scene.add(mouseLight);

        // geometry = new THREE.IcosahedronGeometry(SHAPE_RADIUS, 4);
        geometry = new THREE.DodecahedronGeometry(SHAPE_RADIUS, 4);

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
            transparent: true,
            shininess: 0
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
        material3.wireframe = true;

        shape = new THREE.Mesh(geometry, material);
        shape2 = new THREE.Mesh(geometry, material2);
        shape3 = new THREE.Mesh(geometry, material3);

        scene.add(shape);
        scene.add(shape2);
        scene.add(shape3);

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

    function getSpikeScalar(vector, time) {
        const spikes = vector.spikes;
        if (!spikes.activated) return .2;
        const scalar = ((sinoid(time, spikes.period)) * spikes.size) * .3;
        return scalar + 1.;
    }

    function getBlobScalar(vector, time, mouseProjection) {

        var i = 1 / vector.distanceTo(mouseProjection);
        var value = i * i * 100;
        // vector.multiplyScalar(value + 1);

        const perlin = Perlin.noise.simplex3(
            (vector.x * 0.008) + (time * 0.0003) + (value),
            (vector.y * 0.008) + (time * 0.0003) + (value),
            (vector.z * 0.008) + (time * 0.0003) + (value)
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
    function quadratic(s, offset) { // -10x^​2 +1
        let x = s - offset;
        return - 8 * x * x + 1;
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

        var s = sigmoid((scrollTween.y - .6) * 24 - 6) * SCALE_INCREMENT;
        var scale = BASE_SCALE + s;
        shape.scale.set(scale, scale, scale);
        shape2.scale.set(scale, scale, scale);
        shape3.scale.set(scale, scale, scale);

        // const ratio = (sigmoid((scrollTween.y - .5) * 10));
        const ratio = (sinoid(scrollTween.y, 2));

        let posX = (mouse.x) * 50;
        let posY = (mouse.y) * 50;

        shape.position.x = posX;
        shape.position.y = posY;
        shape2.position.x = posX;
        shape2.position.y = posY;
        shape.position.y = posY;
        shape3.position.x = posX;
        shape3.position.y = posY;
        let rotation = (scrollTween.y) * Math.PI;

        // shape.rotation.x = rotation;
        // shape2.rotation.x = rotation;
        // shape3.rotation.x = rotation;

        // const MAGNET_DISTANCE = 50;
        for (var i = 0; i < geometry.vertices.length; i++) {
            let vector = geometry.vertices[i];

            vector.copy(vector._original);

            // var d = vector.distanceTo(mouseProjection);
            // var inverse = 1 / d;
            // inverse = inverse * inverse * inverse * inverse;
            // vector.multiplyScalar(inverse * 300000 + 1);

            let v1, v2;
            if (scrollTween.y < .5)
                v1 = getSphereScalar(scrollTween.y),
                    v2 = getBlobScalar(vector, time, mouseProjection);
            else
                v1 = getSpikeScalar(vector, time),
                    v2 = getBlobScalar(vector, time, mouseProjection);

            vector.multiplyScalar((1 - ratio) * v1 + ratio * v2 + 1);


            // console.log(d)
            // }
        };
    }

    // function getScroll() {
    //     if (window.pageYOffset != undefined) {
    //         return (pageYOffset) / (docheight - window.innerHeight);
    //     }
    //     else {
    //         let sx, sy, d = document, r = d.documentElement, b = d.body;
    //         sy = r.scrollTop || b.scrollTop || 0;
    //         return (sy) / (docheight - window.innerHeight);
    //     }
    // }

    function getScroll() {
        let o = content.scrollTop;
        let i = window.innerHeight;
        let h = content.scrollHeight;
        return (o) / (h - i);
    }

    function onScroll(evt) {

        const scroll = getScroll();

        TweenMax.to(scrollTween,
            5,
            {
                y: scroll,
                ease: Power3.easeOut
            });

        updateSceneMaterials(scroll);

        clearTimeout(onScrollEnd);
        onScrollEnd = setTimeout(function () {
            updateURL();
        }, 17);

        fadePages();

    };

    function fadePages() {
        for (var i = 0; i < fadingPages.length; i++) {
            var page = fadingPages[i];
            let o = page.offsetTop - content.scrollTop;
            if (o < -height) page.style.opacity = 0;
            else if (o > 0) page.style.opacity = 1;
            else page.style.opacity = (height + o) / height;
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

        var o1 = ((1 - sigmoid(scroll * 2 * 12 - 6))) * 100;
        var o2 = quadratic(scroll, .7);
        var o3 = (scroll - .1) / .9;
        o3 = o3 * o3;
        // console.log(scroll + ": " + o2);

        material.opacity = o1;
        material2.opacity = o2;
        material3.opacity = o3;

        let bg = RENDERER_CLEAR_COLOR_FROM.clone().lerp(RENDERER_CLEAR_COLOR_TO, scroll);
        // renderer.setClearColor(bg);
        document.body.style.backgroundColor = bg.getStyle();

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