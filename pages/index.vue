<template>
    <section class="container" :class="{ready: isReady}">
        <logo></logo>
        <intro ref="intro"></intro>
        <navs></navs>
    </section>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import store from './../store/';
    import Logo from '~/components/index/Logo.vue';
    import Intro from '~/components/index/Intro.vue';
    import Navs from '~/components/common/nav/Navigation.vue';
    import {AppConfig} from '~/assets/ts/common/Config';

    export default {
        layout: 'background',
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
        data() {
            return {
                readyState: false,
            };
        },
        head() {
            return {
                title: 'Takeshi Kato',
                meta: [
                    { hid: 'description', name: 'description', content: 'This is takeshi kato\'s Web site. I\'m a frontend developer.' }
                ],
            };
        },
        methods: {
            ...mapActions(['changeScene']),
        },
        beforeRouteEnter(to, from, next) {
            if (from.name) {
                store().dispatch('changeScene', AppConfig.SCENE.READY);
            }

            next();
        },
        beforeRouteLeave(to, from, next) {
            this.$refs.intro.beforeLeave().then(() => {
                next();
            });
        }
    };
</script>

<style lang="scss">
    .container {
        position: relative;
        width: 100%;
        min-height: 100%;
        overflow: hidden;
    }
</style>
