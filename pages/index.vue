<template>
    <section class="container" :class="{ready: isReady}">
        <index-the-logo />
        <index-the-intro v-if="sceneName === 'first'" />
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
                hid: 'description',
                name: 'description',
                content: 'This is takeshi kato\'s Web site. I\'m a frontend developer.',
            },
        ],
    });

    const {sceneName} = useSceneName();
    const isReady = sceneName === AppConfig.SCENE.READY;

    // beforeRouteEnter(to, from, next) {
    //     if (from.name) {
    //         next((vm) => {
    //             vm.changeScene(AppConfig.SCENE.READY);
    //         });
    //     }
    //
    //     next();
    // },
    // beforeRouteLeave(to, from, next) {
    //     console.log(to, from);
    //     this.$refs.intro.beforeLeave().then(() => {
    //         next();
    //     });
    // },
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
