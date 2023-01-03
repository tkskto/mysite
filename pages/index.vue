<template>
    <section class="container">
        <index-the-logo />
        <index-the-intro v-if="isReady" ref="intro" />
        <p class="black-lives-matter">
            <strong>Black Lives Matter.</strong>
        </p>
        <common-nav-the-navigation />
    </section>
</template>

<script setup>
import {AppConfig} from '~/assets/ts/common/Config.ts';
import {useSceneName} from '~/composable/useSceneName';

useHead({
    title: 'Takeshi Kato',
    meta: [
        {
            name: 'description',
            content: 'This is takeshi kato\'s Web site. I\'m a frontend developer.',
        },
    ],
});

const {sceneName} = useSceneName();
const isReady = computed(() => {
    return sceneName.value === AppConfig.SCENE.FIRST || sceneName.value === AppConfig.SCENE.READY;
});
const intro = ref(null);

onBeforeRouteLeave(async () => {
    if (intro) {
        await intro.value.beforeLeave();
    }
});
</script>

<style lang="scss">
.container {
    position: relative;
    width: 100%;
    min-height: 100%;
    overflow: hidden;

    .black-lives-matter {
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
        font-size: 3.0rem;
        bottom: 11%;
        text-align: center;
        color: #fff;
    }
}
</style>
