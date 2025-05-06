<script setup lang="ts">
import {useAppScene} from '~/composables/useAppScene';

const svg = ref<HTMLElement | null>(null);
const {appScene, updateScene} = useAppScene();

const transitionend = () => {
    if (appScene.value === 'load') {
        svg.value?.classList.add('hide');
        updateScene('intro');
    } else if (appScene.value === 'intro') {
        updateScene('first');
    }
}

onMounted(() => {
    if (appScene.value === 'load') {
        svg.value?.addEventListener('transitionend', transitionend);
    } else {
        svg.value?.classList.add('hide');
    }
});
</script>

<template>
    <div id="mv">
        <div class="mv-svg-wrapper">
            <svg ref="svg" class="mv-svg" viewBox="0, 0, 14, 4">
                <path class="svg-path" d="M0,0 l1,0 l1,3 l1,-3 l1,0 l1,3 l1,-3 l1,0 l-1,4 l-1.5,0 l-1,-2.5 l-1,2.5 l-1.25,0 z"/>
                <path class="svg-path" d="M7,0 l1,0 l0,1.5 l1,0 l0,-1.5 l1,0 l0,4 l-1,0 l0,-1.5 l-1,0 l0,1.5 l-1,0 z"/>
                <path class="svg-path" d="M10.1,2 A 1.9,1.9 0 1,1 13.9,2 A 1.9,1.9 0 1,1 10.1,2 z"/>
                <path class="svg-path" d="M11,2 A 1,1 0 1,1 13,2 A 1,1 0 1,1 11,2 z"/>
            </svg>
        </div>
    </div>
</template>

<style scoped>
#mv {
    position:absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    & .mv-svg-wrapper {
        width: 300px;

        & .svg-path {
            stroke: #fff;
            stroke-width: 0.1;
            fill: none;
        }

        & .mv-svg {
            stroke-dasharray: 32.5, 32.5;
            stroke-dashoffset: 0;
            transition: stroke-dashoffset 3s ease, transform 0.5s cubic-bezier(.5, -0.3, .83, .67);
        }
    }

    .mv-svg.hide {
        transform: scale3d(0, 0, 0) translateY(-200px);
    }
}

@starting-style {
    #mv .mv-svg-wrapper .mv-svg {
        stroke-dashoffset: 32.5;
    }
}
</style>
