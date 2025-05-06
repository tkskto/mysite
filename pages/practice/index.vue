<script setup lang="ts">
import Quote from '~/components/practice/quote.vue';
import ViewChangeButton from '~/components/practice/ViewChangeButton';
import ShaderView from '~/components/practice/ShaderView';
import {Vector} from '~/assets/ts/common/gl/Vector';
import Item0 from '~/assets/ts/practice/sketch/00/Item0.ts';
import Item1 from '~/assets/ts/practice/sketch/01/Item1.ts';
import Item2 from '~/assets/ts/practice/sketch/02/Item2.ts';
import Item3 from '~/assets/ts/practice/sketch/03/Item3.ts';
import Item4 from '~/assets/ts/practice/sketch/04/Item4.ts';
import Item5 from '~/assets/ts/practice/sketch/05/Item5.ts';
import Item6 from '~/assets/ts/practice/sketch/06/Item6.ts';
import Item7 from '~/assets/ts/practice/sketch/07/Item7.ts';
import Item8 from '~/assets/ts/practice/sketch/08/Item8.ts';
import Item9 from '~/assets/ts/practice/sketch/09/Item9.ts';
import Item10 from '~/assets/ts/practice/sketch/10/Item10.ts';
import Item11 from '~/assets/ts/practice/sketch/11/Item11.ts';
import Item12 from '~/assets/ts/practice/sketch/12/Item12.ts';
import Item13 from '~/assets/ts/practice/sketch/13/Item13.ts';
import Item14 from '~/assets/ts/practice/sketch/14/Item14.ts';
import Item15 from '~/assets/ts/practice/sketch/15/Item15.ts';
import Item16 from '~/assets/ts/practice/sketch/16/Item16.ts';
import Item17 from '~/assets/ts/practice/sketch/17/Item17.ts';
import Item18 from '~/assets/ts/practice/sketch/18/Item18.ts';
import Item19 from '~/assets/ts/practice/sketch/19/Item19.ts';
import Item20 from '~/assets/ts/practice/sketch/20/Item20.ts';
import PlayPauseBtn from '~/components/practice/PlayPauseBtn';
import {useMousePosition} from '~/composables/useMousePosition';
import {useCameraPosition} from '~/composables/useCameraPosition';
import {usePracticeScene} from '~/composables/usePracticeScene';
import {useScreenSize} from '~/composables/useScreenSize';
import {usePracticeId} from '~/composables/usePracticeId';

const {startMouseTracking, stopMouseTracking} = useMousePosition();
const {updateCameraPosition} = useCameraPosition();
const {practiceScene, updatePracticeScene} = usePracticeScene();
const {canvasSize, screenSize} = useScreenSize();
const {updatePracticeId} = usePracticeId();

definePageMeta({
    layout: 'practice',
});

const ratio = window.devicePixelRatio;

const canvasPracticalWidth = computed(() => {
    if (canvasSize.width) {
        return canvasSize.width / ratio + 'px';
    }

    return '0';
});

const canvasPracticalHeight = computed(() => {
    if (canvasSize.height) {
        return canvasSize.height / ratio + 'px';
    }

    return '0';
});

const onHashChange = () => {
    updatePracticeId(location.hash.split('#')[1] || '0');
};

const changeSketchState = (e) => {
    if ('Escape' === e.key && practiceScene.value === 'sketch') {
        updatePracticeScene('pause');
    } else if ('Escape' === e.key && practiceScene.value === 'pause') {
        updatePracticeScene('sketch');
    }
};

onMounted(() => {
    const sketch = document.querySelectorAll('.sketch-item');
    const width = screenSize.width;
    const height = screenSize.height;
    const aspect = width > height ? height / width : height > width ? width / height : 1;
    const _canvasGL = document.getElementById('canvas-GL');

    updateCameraPosition(new Vector(0.0, 0.0, aspect));

    new Item0(_canvasGL, '0');

    for (let i = 0, len = sketch.length; i < len; i++) {
        const id = sketch.item(i).attributes.getNamedItem('id').value;

        if (!_canvasGL) {
            throw new Error('id: ' + id + 'のdata-sketch-typeが指定されていません。');
        }

        switch (id) {
            case '01':
                new Item1(_canvasGL, id);
                break;
            case '02':
                new Item2(_canvasGL, id);
                break;
            case '03':
                new Item3(_canvasGL, id);
                break;
            case '04':
                new Item4(_canvasGL, id);
                break;
            case '05':
                new Item5(_canvasGL, id);
                break;
            case '06':
                new Item6(_canvasGL, id);
                break;
            case '07':
                new Item7(_canvasGL, id);
                break;
            case '08':
                new Item8(_canvasGL, id);
                break;
            case '09':
                new Item9(_canvasGL, id);
                break;
            case '10':
                new Item10(_canvasGL, id);
                break;
            case '11':
                new Item11(_canvasGL, id);
                break;
            case '12':
                new Item12(_canvasGL, id);
                break;
            case '13':
                new Item13(_canvasGL, id);
                break;
            case '14':
                new Item14(_canvasGL, id);
                break;
            case '15':
                new Item15(_canvasGL, id);
                break;
            case '16':
                new Item16(_canvasGL, id);
                break;
            case '17':
                new Item17(_canvasGL, id);
                break;
            case '18':
                new Item18(_canvasGL, id);
                break;
            case '19':
                new Item19(_canvasGL, id);
                break;
            case '20':
                new Item20(_canvasGL, id);
                break;
            default:
                throw new Error('please set id and data attribute "sketch-type"');
        }
    }

    window.addEventListener('hashchange', onHashChange);
    onHashChange();

    document.addEventListener('keydown', changeSketchState);
    startMouseTracking();
});

onBeforeUnmount(() => {
    window.removeEventListener('hashchange', onHashChange);
    document.removeEventListener('keydown', changeSketchState);
    stopMouseTracking();
});
</script>

<template>
    <div class="practice-root">
        <ul class="list-sketch">
            <li id="01" class="sketch-item"><a href="#01">#1</a></li>
            <li id="02" class="sketch-item"><a href="#02">#2</a></li>
            <li id="03" class="sketch-item"><a href="#03">#3</a></li>
            <li id="04" class="sketch-item"><a href="#04">#4</a></li>
            <li id="05" class="sketch-item"><a href="#05">#5</a></li>
            <li id="06" class="sketch-item"><a href="#06">#6</a></li>
            <li id="07" class="sketch-item"><a href="#07">#7</a></li>
            <li id="08" class="sketch-item"><a href="#08">#8</a></li>
            <li id="09" class="sketch-item"><a href="#09">#9</a></li>
            <li id="10" class="sketch-item"><a href="#10">#10</a></li>
            <li id="11" class="sketch-item"><a href="#11">#11</a></li>
            <li id="12" class="sketch-item"><a href="#12">#12</a></li>
            <li id="13" class="sketch-item"><a href="#13">#13(with sound)</a></li>
            <li id="14" class="sketch-item"><a href="#14">#14(with sound)</a></li>
            <li id="15" class="sketch-item"><a href="#15">#15</a></li>
            <li id="16" class="sketch-item"><a href="#16">#16</a></li>
            <li id="17" class="sketch-item"><a href="#17">#17</a></li>
            <li id="18" class="sketch-item"><a href="#18">#18</a></li>
            <li id="19" class="sketch-item"><a href="#19">#19</a></li>
            <li id="20" class="sketch-item"><a href="#20">#20</a></li>
        </ul>

        <div class="container-canvas">
            <canvas id="canvas-GL" :width="canvasSize.width" :height="canvasSize.height" :style="{width: canvasPracticalWidth, height: canvasPracticalHeight}" />
            <Quote />
        </div>

        <view-change-button />
        <shader-view />
        <play-pause-btn />
    </div>
</template>

<style scoped>
    html,body,div,canvas, ul, ol {
        margin: 0;
        padding: 0
    }

    body.canvas2D #canvas-GL {
        display: none;
    }

    body.webGL #canvas-2d {
        display: none;
    }

    .practice-root {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .container-canvas {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 0;
    }

    .list-sketch {
        position: relative;
        z-index: 1;
        padding: 12px;
        list-style: none;
        display: inline-block;
    }

    .list-sketch .sketch-item {
        margin-bottom: 4px;
    }

    .list-sketch .sketch-item a {
        font-size: 1.2rem;
        text-shadow: 1px 1px 2px rgb(220, 89, 90), 0 0 1em rgb(110, 120, 200), 0 0 1em rgb(110, 120, 200);
        color: #fff;
    }

    canvas {
        vertical-align: top;
    }
</style>
