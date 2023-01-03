<template>
    <div ref="root" class="container-canvas" />
</template>

<script setup>
    import W from '~/assets/ts/index/Text/W.ts';
    import H from '~/assets/ts/index/Text/H.ts';
    import O from '~/assets/ts/index/Text/O.ts';
    import I from '~/assets/ts/index/Text/I.ts';
    import A from '~/assets/ts/index/Text/A.ts';
    import M from '~/assets/ts/index/Text/M.ts';
    import Hatena from "~/assets/ts/index/Text/Hatena.ts";
    import {AppConfig} from '~/assets/ts/common/Config.ts';
    import {Elastic, Back, Linear, TweenMax} from 'gsap';
    import {
        AmbientLight,
        DirectionalLight,
        Group,
        MeshPhongMaterial,
        PerspectiveCamera,
        Scene,
        WebGLRenderer
    } from 'three';
    import {useScreenSize} from '~/composable/useScreenSize';
    import {useSceneName} from '~/composable/useSceneName';

    const scale = {
        who: 0.1,
        I: 0.1,
        am: 0.1,
        hatena: 0.1,
    };

    const position = {
        who: 0,
        I: 0,
        amY: -4.25,
        amX: 0,
    };

    const root = ref(null);
    const canvas = document.createElement('canvas');
    const {screenSize} = useScreenSize();
    const {sceneName, updateScene} = useSceneName();
    // mousePosition: 'Common/mousePosition',
    // document.addEventListener('mousemove', mouseTracking);
    // this.setMousePos({
    //     x: this.screenSize.width * 0.5,
    //     y: this.screenSize.height * 0.5,
    // });

    let animationFinished = false;
    let animationTimer = 0;

    const stage = new Scene();
    const mainCamera = new PerspectiveCamera( 60, screenSize.value.width / screenSize.value.height, 1, 1000 );

    mainCamera.position.set( 0, 0, 45 );

    const ambientLight = new AmbientLight(0x44ccbb, 0.7);
    stage.add(ambientLight);

    const light = new DirectionalLight(0xffffff, 0.7);
    light.position.set(0.0, 10, 300);
    stage.add(light);

    const material = new MeshPhongMaterial({
        color:0xcccccc,
        specular: 0xffff99,
        shininess: 10
    });

    const ratio = window.devicePixelRatio;
    const renderer = new WebGLRenderer({
        canvas,
        antialias: true,
        stencil: false,
    });

    renderer.setPixelRatio(ratio);
    renderer.setSize(screenSize.value.width, screenSize.value.height);
    renderer.setClearColor(0x000000, 1);
    renderer.shadowMap.enabled = true;
    renderer.autoClear = true;
    renderer.clear();

    // mousePosition: 'Common/mousePosition',
    // document.addEventListener('mousemove', mouseTracking);
    // this.setMousePos({
    //     x: this.screenSize.width * 0.5,
    //     y: this.screenSize.height * 0.5,
    // });

    const group = {
        who: new Group(),
        I: new Group(),
        am: new Group(),
        hatena: new Group(),
    };

    const EXTRUDE_OPTION = {
        curveSegments: 24,
        depth: 15,
        steps: 50,
        material: 1,
        extrudeMaterial: 0,
        bevelEnabled: false
    };

    const shapeW = new W(material, EXTRUDE_OPTION);
    shapeW.mesh.position.set(-7, 2, 0);
    group.who.add(shapeW.mesh);

    const shapeH = new H(material, EXTRUDE_OPTION);
    shapeH.mesh.position.set(0, 2, 0);
    group.who.add(shapeH.mesh);

    const shapeO = new O(2, 32, 15, material, EXTRUDE_OPTION);
    shapeO.mesh.position.set(5, 0, 0);
    shapeO.mesh.rotateY(Math.PI / 2);
    group.who.add(shapeO.mesh);
    group.who.scale.set(scale.who, scale.who, scale.who);

    const shapeI = new I(material, EXTRUDE_OPTION);
    shapeI.mesh.position.set(-1.5, 0, 0);
    group.I.add(shapeI.mesh);

    const shapeA = new A(material, EXTRUDE_OPTION);
    shapeA.outer.position.set(-5, 0, 0);
    shapeA.inner.position.set(-5, 0, 0);
    group.am.add(shapeA.outer);
    group.am.add(shapeA.inner);

    const shapeM = new M(material, EXTRUDE_OPTION);
    shapeM.mesh.position.set(-1, 0, 0);
    group.am.add(shapeM.mesh);

    const shapeHatena = new Hatena(material, EXTRUDE_OPTION);
    shapeHatena.upper.position.set(0, 0, 0);
    shapeHatena.lower.position.set(0, 0, 0);
    group.hatena.add(shapeHatena.upper);
    group.hatena.add(shapeHatena.lower);
    group.hatena.position.set(5.0, -4.5, 0);

    stage.add(group.who);

    const update = () => {
        animationTimer = requestAnimationFrame(update);

        // const mouseX = this.mousePosition.x - renderer.domElement.width * 0.5;
        // const mouseY = this.mousePosition.y - renderer.domElement.height * 0.5;
        // mainCamera.position.set(mouseX * 0.001, mouseY * 0.001, 45);
        // mainCamera.lookAt(0, 0, 0);

        if (!animationFinished) {
            group.who.scale.set(scale.who, scale.who, scale.who);
            group.who.position.set(0, position.who, 0);

            group.I.scale.set(scale.I, scale.I, scale.I);
            group.I.position.set(0, position.I, 0);

            group.am.scale.set(scale.am, scale.am, scale.am);
            group.am.position.set(position.amX, position.amY, 0);

            group.hatena.scale.set(scale.hatena, scale.hatena, scale.hatena);
        }

        renderer.render(stage, mainCamera);
    };

    const onAnimationFinished = () => {
        pause();
        animationFinished = true;
        updateScene(AppConfig.SCENE.READY);
    };

    const addI = () => {
        TweenMax.to(position, 0.3, {
            who: 3,
            ease: Linear.easeNone,
        });

        stage.add(group.I);

        TweenMax.to(scale, 1, {
            I: 1.2,
            ease: Elastic.easeOut,
        });
    };

    const addAM = () => {
        TweenMax.to(position, 0.3, {
            who: 6.5,
            ease: Linear.easeNone,
        });

        TweenMax.to(position, 0.3, {
            I: 3.0,
            ease: Linear.easeNone,
        });

        stage.add(group.am);

        TweenMax.to(scale, 1, {
            am: 1.2,
            ease: Elastic.easeOut,
        });
    };

    const addHatena = () => {
        TweenMax.to(position, 1, {
            amX: -2.0,
            ease: Elastic.easeOut,
        });

        stage.add(group.hatena);

        TweenMax.to(scale, 1, {
            hatena: 1.2,
            ease: Elastic.easeOut,
            onComplete: onAnimationFinished,
        });
    };

    const play = () => {
        update();

        TweenMax.to(scale, 1, {
            who: 1.2,
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

    const pause = () => {
        if (animationTimer !== null) {
            cancelAnimationFrame(animationTimer);
            animationTimer = null;
        }
    };

    const justRender = () => {
        scale.who = 1.2;
        scale.I = 1.2;
        scale.am = 1.2;
        scale.hatena = 1.2;
        position.who = 6.5;
        position.I = 3;
        position.amX = -2.0;

        stage.add(group.I);
        stage.add(group.am);
        stage.add(group.hatena);
        update();
        onAnimationFinished();
    };

    const dispose = () => {
        if (renderer) {
            pause();
            renderer.dispose();
        }
    };

    const beforeLeave = () => {
        return new Promise((resolve) => {
            animationFinished = false;
            update();

            TweenMax.to(scale, 0.3, {
                hatena: 0.0001,
                ease: Back.easeIn.config(2),
            });
            TweenMax.to(scale, 0.3, {
                am: 0.0001,
                delay: 0.1,
                ease: Back.easeIn.config(2),
            });
            TweenMax.to(scale, 0.3, {
                I: 0.0001,
                delay: 0.2,
                ease: Back.easeIn.config(2),
            });
            TweenMax.to(scale, 0.3, {
                who: 0.0001,
                delay: 0.3,
                ease: Back.easeIn.config(2),
            });

            setTimeout(() => {
                dispose();

                // document.removeEventListener('mousemove', this.mouseTracking);

                resolve();
            }, 700);
        });
    };

    defineExpose({
        beforeLeave,
    });

    onMounted(() => {
        if (!root) {
            return;
        }

        root.value.appendChild(renderer.domElement);

        if (sceneName.value === AppConfig.SCENE.READY) {
            justRender();
        } else {
            play();
        }
    });
        // methods: {
            // ...mapActions({
            //     changeScene: 'Common/changeScene',
            //     setMouseState: 'Common/setMouseState',
            //     setMousePos: 'Common/setMousePos',
            // }),
            // onStateChange: function(_mutation) {
            //     if (_mutation.type === 'Common/CHANGE_SCENE') {
            //         if (_mutation.payload === AppConfig.SCENE.FIRST) {
            //             finished = false;
            //             this.play();
            //             this._unsubscribe();
            //         } else {
            //             this.pause();
            //         }
            //     }
            // },
            // mouseTracking: function (e) {
            //     this.setMousePos({
            //         x: e.clientX * this._ratio,
            //         y: e.clientY * this._ratio
            //     });
            // },
        // },
    // };
</script>

<style scoped lang="scss">
    .container-canvas {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: -1;
        width: 100vw;
        width: 100svw;
        height: 100vh;
        height: 100svh;
        overflow: hidden;

        canvas {
            width: 100%;
            height: 100%;
        }
    }
</style>
