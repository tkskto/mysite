<script setup lang="ts">
import Program from '~/assets/ts/common/gl/Program';
import Renderer from '~/assets/ts/common/gl/Renderer';
import Animation from '~/assets/ts/common/datatype/Animation';
import { GLConfig } from '~/assets/ts/common/Config';
import Loading from '~/assets/ts/common/shader/Loading';
import LoadingData from '~/assets/ts/common/data/Loading';
import WebGLContext from '~/assets/ts/common/gl/Context';
import Geometry from '~/assets/ts/common/gl/Geometry';
import Mesh from '~/assets/ts/common/gl/Mesh';
import {useScreenSize} from '~/composables/useScreenSize';

type animation = {
    author: string,
    time: string,
};

type animationList = {
    [key: string]: animation[]
};

const {setCanvasSize} = useScreenSize();

const TIME_MIN = 3000;

// ref & DOM
const wrap = ref<HTMLElement | null>(null);
const canvas = ref<HTMLCanvasElement | null>(null);

// 状態
let _renderer: Renderer | null = null;
let _timer: number | null = null;
let _time = 0;
let _elapsed = 0;

// emitで外部に通知（例: changeScene）
const emit = defineEmits(['loaded']); // emit('loaded', 'top')

// 初期化
const initGL = () => {
    canvas.value = document.createElement('canvas');
    canvas.value.width = canvas.value.height = 60;
    setCanvasSize(60, 60);

    const gl = new WebGLContext(canvas.value);
    const shaderData = new Loading(gl.ctx);
    const program = new Program(
        gl.ctx,
        shaderData,
        ['position'],
        [3],
        ['mvpMatrix', 'resolution', 'time'],
        [GLConfig.UNIFORM_TYPE_MATRIX4, GLConfig.UNIFORM_TYPE_VECTOR2, GLConfig.UNIFORM_TYPE_FLOAT]
    );

    const plane = new Geometry(gl.ctx, new LoadingData()).init();
    const mesh = new Mesh(gl.ctx, program, plane, GLConfig.DRAW_TYPE_TRIANGLE);
    _renderer = new Renderer(gl);
    _renderer.add(mesh);
}

const animate = () => {
    _time += 0.01;
    render();
    _timer = requestAnimationFrame(animate);
};

const play = () => {
    _timer = requestAnimationFrame(animate);
};

const pause = () => {
    if (_timer) {
        cancelAnimationFrame(_timer);
        _timer = null;
    }
};

const render = () => {
    _renderer?.update([60, 60], _time);
}

const allSketch: Record<string, Animation[]> = {};

const hideLoader = () => {
    wrap.value?.classList.remove('is-show');
};

const onTransitionEnd = () => {
    pause();
    emit('loaded', allSketch);
};

const parseJson = (data: animationList) => {
    for (const key in data) {
        if (Object.hasOwn(data, key)) {
            allSketch[key] = data[key].map((anim, i: number) =>
                new Animation(anim.author, key, i + 1)
            )
        }
    }

    // 時間差計測
    const loadingTime = new Date().getTime() - _elapsed;
    const delay = loadingTime < TIME_MIN ? TIME_MIN - loadingTime : 0;

    setTimeout(() => {
        hideLoader();
    }, delay);
}

// ライフサイクル
onMounted(() => {
    _time = 0;
    _elapsed = new Date().getTime();

    initGL();

    const parent = document.getElementById('loading-screen');
    
    if (parent && canvas.value) {
        parent.appendChild(canvas.value);
    }

    play();

    wrap.value?.addEventListener('transitionend', onTransitionEnd);

    fetch('/assets/microAnimations/data/list.json').then((response) => response.json()).then(parseJson).catch(console.error);
});

onBeforeUnmount(() => {
    pause();
    wrap.value?.removeEventListener('transitionend', onTransitionEnd);
});
</script>

<template>
    <div id="loading-screen" ref="wrap" class="is-show" />
</template>

<style scoped>
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
