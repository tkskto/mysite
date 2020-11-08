<template>
    <section class="container" :class="{ready: isReady}">
        <logo></logo>
        <intro ref="intro"></intro>
        <p class="black-lives-matter"><strong>Black Lives Matter.</strong></p>
        <navs></navs>
    </section>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import Logo from '~/components/index/Logo.vue';
    import Intro from '~/components/index/Intro.vue';
    import Navs from '~/components/common/nav/Navigation.vue';
    import {AppConfig} from '~/assets/ts/common/Config.ts';

    export default {
        components: {
            Logo,
            Intro,
            Navs
        },
        computed: {
            ...mapGetters({
                sceneName: 'Common/sceneName',
            }),
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
                    {
                        hid: 'description',
                        name: 'description',
                        content: 'This is takeshi kato\'s Web site. I\'m a frontend developer.'
                    }
                ],
            };
        },
        methods: {
            ...mapActions({
                changeScene: 'Common/changeScene',
            }),
        },
        beforeRouteEnter(to, from, next) {
            if (from.name) {
                next((vm) => {
                    vm.changeScene(AppConfig.SCENE.READY);
                });
            }

            next();
        },
        beforeRouteLeave(to, from, next) {
            console.log(to, from);
            this.$refs.intro.beforeLeave().then(() => {
                next();
            });
        },
    };
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
