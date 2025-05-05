<script setup lang="ts">
import {AmbientLight, DirectionalLight, Group, MeshPhongMaterial, PerspectiveCamera, Scene, WebGLRenderer} from 'three';
import {gsap} from "gsap";
import { AppConfig } from '~/assets/ts/common/Config';

import W from '~/assets/ts/index/Text/W';
import H from '~/assets/ts/index/Text/H';
import O from '~/assets/ts/index/Text/O';
import I from '~/assets/ts/index/Text/I';
import A from '~/assets/ts/index/Text/A';
import M from '~/assets/ts/index/Text/M';
import Hatena from '~/assets/ts/index/Text/Hatena';

import { useScreenSize } from '~/composables/useScreenSize';
import { useMousePosition } from '~/composables/useMousePosition';

// const finished = ref(false);
const ratio = window.devicePixelRatio;
const screenSize = useScreenSize();
// const mouse = useMousePosition();

const canvasWrap = ref<HTMLElement | null>(null);

const stage = new Scene();
const mainCamera = new PerspectiveCamera( 60, screenSize.width / screenSize.height, 1, 1000 );

mainCamera.position.set( 0, 0, 45 );

const renderer = new WebGLRenderer({
    antialias: true,
    stencil: false,
});

renderer.setPixelRatio(ratio);

const state = {
    scaleWho: 0.1,
    posWho: 0,
    scaleI: 0.1,
    posI: 0,
    scaleAm: 0.1,
    posAmY: -4.25,
    posAmX: 0,
    scaleHatena: 0.1,
};

const groupWHO = new Group();
const groupI = new Group();
const groupAM = new Group();
const groupHatena = new Group();
const material = new MeshPhongMaterial({
    color:0xcccccc,
    specular: 0xffff99,
    shininess: 10
});

onMounted(() => {
    renderer.setSize(
        screenSize.width, screenSize.height
    );

    renderer.setClearColor(0x000000, 1);
    renderer.shadowMap.enabled = true;
    renderer.autoClear = true;
    renderer.clear();

    if (canvasWrap.value) {
        canvasWrap.value.appendChild(renderer.domElement);
    }
    
    stage.add(groupWHO);

    // 自然光
    const ambientLight = new AmbientLight(0x44ccbb, 0.7);
    stage.add(ambientLight);

    const light = new DirectionalLight(0xffffff, 0.7);
    light.position.set(0.0, 10, 300);
    stage.add(light);

    const depth = 15;
    const EXTRUDE_OPTION = {
        curveSegments: 24,
        depth,
        steps: 50,
        material: 1,
        extrudeMaterial: 0,
        bevelEnabled: false
    };

    const shapeW = new W(material, EXTRUDE_OPTION);
    shapeW.mesh.position.set(-7, 2, 0);
    groupWHO.add(shapeW.mesh);

    const shapeH = new H(material, EXTRUDE_OPTION);
    shapeH.mesh.position.set(0, 2, 0);
    groupWHO.add(shapeH.mesh);

    const shapeO = new O(2, 32, depth, material, EXTRUDE_OPTION);
    shapeO.mesh.position.set(5, 0, 0);
    shapeO.mesh.rotateY(Math.PI / 2);
    groupWHO.add(shapeO.mesh);

    const shapeI = new I(material, EXTRUDE_OPTION);
    shapeI.mesh.position.set(-1.5, 0, 0);
    groupI.add(shapeI.mesh);

    const shapeA = new A(material, EXTRUDE_OPTION);
    shapeA.outer.position.set(-5, 0, 0);
    shapeA.inner.position.set(-5, 0, 0);
    groupAM.add(shapeA.outer);
    groupAM.add(shapeA.inner);

    const shapeM = new M(material, EXTRUDE_OPTION);
    shapeM.mesh.position.set(-1, 0, 0);
    groupAM.add(shapeM.mesh);

    const shapeHatena = new Hatena(material, EXTRUDE_OPTION);
    shapeHatena.upper.position.set(0, 0, 0);
    shapeHatena.lower.position.set(0, 0, 0);
    groupHatena.add(shapeHatena.upper);
    groupHatena.add(shapeHatena.lower);
    groupHatena.position.set(5.0, -4.5, 0);

    groupWHO.scale.set(state.scaleWho.value, state.scaleWho.value, state.scaleWho.value);
});

const addI = () => {
    gsap.to(state, 0.3, {
        posWho: 3,
        ease: Linear.ease
    });

    stage.add(groupI);

    gsap.to(state, 1, {
        scaleI: 1.2,
        ease: Elastic.easeOut
    });
};

const addAM = () => {
    gsap.to(state, 0.3, {
        posWho: 6.5,
        ease: Linear.ease
    });

    gsap.to(state, 0.3, {
        posI: 3.0,
        ease: Linear.ease
    });

    stage.add(groupAM);

    gsap.to(state, 1, {
        scaleAm: 1.2,
        ease: Elastic.easeOut
    });
};

const addHatena = () => {
    gsap.to(state, 1, {
        posAmX: -2.0,
        ease: Elastic.easeOut
    });

    stage.add(groupHatena);

    gsap.to(state, 1, {
        scaleHatena: 1.2,
        ease: Elastic.easeOut,
        onComplete: state.sceneFinish
    });
};

const update = () => {
    timer = requestAnimationFrame(update);

    const mouseX = mousePosition.x - renderer.domElement.width * 0.5;
    const mouseY = mousePosition.y - renderer.domElement.height * 0.5;

    mainCameraposition.set(mouseX * 0.001, mouseY * 0.001, 45);
    mainCameralookAt(0, 0, 0);

    if (!finished) {
        groupWHO.scale.set(scaleWho, scaleWho, scaleWho);
        groupWHO.position.set(0, posWho, 0);

        groupI.scale.set(scaleI, scaleI, scaleI);
        groupI.position.set(0, posI, 0);

        groupAM.scale.set(scaleAm, scaleAm, scaleAm);
        groupAM.position.set(posAmX, posAmY, 0);

        groupHatena.scale.set(scaleHatena, scaleHatena, scaleHatena);
    }

    renderer.render(stage, mainCamera);
};

const play = () => {
    update();

    gsap.to(state, 1, {
        scaleWho: 1.2,
        ease: Elastic.easeOut
    });

    setTimeout(() => {
        addI();
    }, 200);
    setTimeout(() => {
        addAM();
    }, 300);
    setTimeout(() => {
        addHatena();
    }, 400);
};
</script>

<template>
    <div ref="canvasWrap" class="container-canvas" />
</template>

<style scoped>
    .container-canvas {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: -1;
        width: 100vw;
        height: 100vh;

        & canvas {
            width: 100%;
            height: 100%;
        }
    }
</style>
