<template>
    <div id="loading-screen" ref="wrap" class="is-show" />
</template>

<script setup lang="ts">
    import Program from '~/assets/ts/common/gl/Program';
    import Renderer from '~/assets/ts/common/gl/Renderer';
    import Animation from '~/assets/ts/common/datatype/Animation';
    import {GLConfig} from '~/assets/ts/common/Config';
    import Loading from '~/assets/ts/common/shader/Loading';
    import LoadingData from '~/assets/ts/common/data/Loading';
    import WebGLContext from '~/assets/ts/common/gl/Context';
    import Geometry from '~/assets/ts/common/gl/Geometry';
    import Mesh from '~/assets/ts/common/gl/Mesh';
    import {useSceneName} from '~/composable/useSceneName';
    import type {iAnimation, MicroAnimationCategory, MicroAnimationData} from '~/types/index';
    import {useMicroAnimations} from '~/composable/useMicroAnimations';
    import animations from '~/assets/microAnimations/data/list.json';
    import Vector from '~/assets/ts/common/gl/Vector';

    const {updateScene} = useSceneName();
    const {updateMicroAnimation} = useMicroAnimations();
    const TIME_MIN = 3000;

    const dLoading = new LoadingData();
    const elapsedTime = Date.now();
    let time = 0;
    let animationTimer: number | null = null;

    const canvas = document.createElement('canvas');

    canvas.width = canvas.height = 60;

    const gl = new WebGLContext(window.devicePixelRatio, canvas);

    const loadingData = new Loading(gl.ctx);

    const program = new Program(
        gl.ctx,
        loadingData,
        ['position'],
        [3],
        ['mvpMatrix', 'resolution', 'time'],
        [GLConfig.UNIFORM_TYPE_MATRIX4, GLConfig.UNIFORM_TYPE_VECTOR2, GLConfig.UNIFORM_TYPE_FLOAT]
    );

    const plane = new Geometry(gl.ctx, dLoading).init();
    const mesh = new Mesh(gl.ctx, program, plane, GLConfig.DRAW_TYPE_TRIANGLE);
    const renderer = new Renderer(gl);

    renderer.updateCameraPosition(new Vector(0.0, 0.0, 1.0));
    renderer.add(mesh);

    const wrap = ref<HTMLElement | null>(null);

    const parseJson = (data: MicroAnimationData) => {
        const allSketch: {[key in MicroAnimationCategory]: iAnimation[]} = {
            click: [],
            hold: [],
            hover: [],
            loading: [],
            toggle: [],
        };

        for(const [key, value] of Object.entries(data)) {
            if (key === 'hover' || key === 'click' || key === 'loading' || key === 'hold' || key === 'toggle') {
                const sketchArr: iAnimation[] = [];

                for (let i = 0, len = value.length; i < len; i++) {
                    const animation = value[i];
                    const sketch = new Animation(
                        animation['author'],
                        key,
                        i + 1,
                    );

                    sketchArr.push(sketch);
                }

                allSketch[key] = sketchArr;
            }
        }

        updateMicroAnimation(allSketch);

        //ここまでにかかった時間 = ローディングを表示している時間
        const loadingTime = elapsedTime - new Date().getTime();

        //早すぎるのも微妙なので、TIME_MINより短かったら、TIME_MIN秒わざとおくらせる
        const delay = loadingTime < TIME_MIN ? TIME_MIN : 0;

        setTimeout(() => {
            hideLoader();
        }, delay);
    };

    const play = () => {
        animationTimer = requestAnimationFrame(animate);
    };

    const pause = () => {
        if(animationTimer) {
            cancelAnimationFrame(animationTimer);
            animationTimer = null;
        }
    };

    const hideLoader = () => {
        wrap.value?.classList.remove('is-show');
    };

    const onTransitionEnd = () => {
        updateScene('microAnimationTop');
        pause();
    };

    const render = () => {
        renderer.update([60, 60], time);
    }

    const animate = () => {
        animationTimer = requestAnimationFrame(animate);

        time += 0.01;

        render();
    };

    onMounted(() => {
        const parent = document.getElementById('loading-screen');

        if (!parent) {
            return;
        }

        parent.appendChild(canvas);

        play();

        wrap.value?.addEventListener('transitionend', onTransitionEnd);

        parseJson(animations);
    });
</script>

<style scoped lang="scss">
    #loading-screen {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 60px;
        height: 60px;
        transition: opacity 0.3s linear;
        opacity: 0;

        &.is-show {
            opacity: 1;
        }
    }
</style>
