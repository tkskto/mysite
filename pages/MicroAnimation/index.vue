<template>
    <section class="str-microAnimation">
        <the-loading v-if="state === 'loading'"></the-loading>
        <transition name="fade">
            <div v-if="state === 'complete'" class="container-microAnimation">
                <the-header></the-header>
                <div id="all">
                    <animation v-for="item in getAnimation"></animation>
                </div><!-- /.all -->
                <introduction></introduction>
            </div>
        </transition>
    </section>
</template>

<script>
    import TheLoading from '~/components/microAnimation/TheLoading';
    import TheHeader from '~/components/microAnimation/TheHeader';
    import Introduction from '~/components/microAnimation/Introduction';
    import Animation from '~/components/microAnimation/Animation';
    import mapGetters from 'vuex';

    export default {
        layout: 'MicroAnimation',
        computed: {
            ...mapGetters('getAnimation')
        },
        components: {
            TheLoading,
            TheHeader,
            Introduction,
            Animation
        },
        head: function() {
            return {
                'title': 'Micro Animations'
            };
        },
        data: function() {
            return {
                state: 'loading'
            };
        },
        mounted: function () {
            fetch('/assets/microAnimation/data/list.json').then((res) => {
                return res.json();
            }).then((data) => {
                this.$store.dispatch('setAnimation', data);
                this.state = 'complete';
            }).catch((err) => {
                console.error(err);
            });
        }
    };
</script>

<style lang="scss">
    .str-microAnimation {
        position: relative;
        width: 100%;
        height: 100%;

        .dialog {
            position: fixed;
            width: 100%;
            height: 100%;
            top: 100%;
            opacity: 0;
            transition: opacity 0.5s linear;

            &.is-show {
                top: 0;
                opacity: 1;

                .dialog-inner {
                    transform: translateY(0px);
                }
            }

            .dialog-overlay {
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, .2);
            }

            .dialog-inner {
                position: absolute;
                background: #fff;
                border-radius: 6px;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                margin: auto;
                transition: transform 0.5s ease;
                overflow: hidden;
                transform: translateY(150%);
            }
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity 1.0s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>
