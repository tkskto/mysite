<template>
    <section class="container" :class="{ready: isReady}">
        <logo></logo>
        <intro></intro>
        <navs></navs>
    </section>
</template>

<script>
    import {mapGetters} from 'vuex';
    import Logo from '~/components/index/Logo.vue';
    import Intro from '~/components/index/Intro.vue';
    import Navs from '~/components/common/nav/Navigation.vue';
    import {AppConfig} from '~/assets/ts/common/Config';

    export default {
        layout: 'default',
        components: {
            Logo,
            Intro,
            Navs
        },
        computed: {
            ...mapGetters(['sceneName']),
            isReady() {
                return this.sceneName === AppConfig.SCENE.READY;
            },
        },
        head() {
            return {
                title: 'Takeshi Kato',
                meta: [
                    { hid: 'description', name: 'description', content: 'This is takeshi kato\'s Web site. I\'m a frontend developer.' }
                ],
            };
        },
    };
</script>

<style lang="scss">
    .container {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        transition: border-width 0.5s cubic-bezier(0.19, 1, 0.22, 1);
        border: 0 solid #44ccbb;

        &.ready {
            border-width: 10px;
        }
    }
</style>
