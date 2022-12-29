<template>
    <NuxtLayout name="micro-animations">
        <section class="container" :class="sceneName">
            <div class="wrapper">
                <micro-animations-the-header />
                <div id="all" class="sketch">
                    <micro-animations-the-category v-for="(value, key) in microAnimation" :key="key" :category-name="key" :items="value" />
                </div>
            </div>
            <micro-animations-the-dialog :is-show="dialogState" />
            <micro-animations-the-loading />
        </section>
    </NuxtLayout>
</template>

<script setup lang="ts">
    import Vector from '~/assets/ts/common/gl/Vector';
    import {useScreenSize} from '~/composable/useScreenSize';
    import {useCameraPosition} from '~/composable/useCameraPosition';
    import {useDialogState} from '~/composable/useDialogState';
    import {useSceneName} from '~/composable/useSceneName';
    import {useMicroAnimations} from '~/composable/useMicroAnimations';

    const {sceneName} = useSceneName();
    const {updateCanvasSize} = useScreenSize();
    const {updateCameraPosition} = useCameraPosition();
    const {dialogState} = useDialogState();
    const {microAnimation} = useMicroAnimations();

    useHead({
        title: 'Micro Animations | Takeshi Kato',
        meta: [
            {
                name: 'description',
                content: 'Gallery of Micro Animations.',
            },
        ],
    });

    updateCameraPosition(new Vector(0.0, 0.0, 1.0));
    updateCanvasSize({width: 30, height: 30});
</script>

<style scoped>
    body {
        position: relative;
        line-height: 1.6;
        color: #333;
        background: #ffe;
        overflow-y: scroll;
    }

    button {
        background: none;
        border: none;
        box-shadow: none;
        cursor: pointer;
    }

    .wrapper {
        transition: opacity 1.0s ease;
        background: #ffffee;
    }

    .load .wrapper {
        height: 100dvh;
        overflow: hidden;
    }

    .load .wrapper,
    .microAnimationDialog .wrapper {
        opacity: 0;
    }

    .microAnimationDialog .wrapper #all {
        display: none;
    }

    .top .wrapper {
        opacity: 1;
    }

    #all {
        padding: 20px 30px;
    }
</style>
