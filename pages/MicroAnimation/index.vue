<template>
    <section class="str-microAnimation" :class="state">
        <the-loading v-if="state === 'loading'"></the-loading>
        <transition name="fade">
            <div v-if="state === 'complete'">
                <the-header @showIntroduction="showIntroduction"></the-header>
                <div class="container-animation">
                    <category v-for="(category, key) of getAnimation" :categoryName="key" :itemArr="category" :key="key"></category>
                </div><!-- /.all -->
            </div>
        </transition>
        <introduction v-show="state === 'intro'" @onDismiss="closeIntroduction"></introduction>
    </section>
</template>

<script>
    import TheLoading from '~/components/microAnimation/TheLoading';
    import TheHeader from '~/components/microAnimation/TheHeader';
    import Introduction from '~/components/microAnimation/Introduction';
    import Category from '~/components/microAnimation/Category';
    import {mapGetters} from 'vuex';

    export default {
        layout: 'MicroAnimation',
        computed: {
            ...mapGetters(['getAnimation'])
        },
        components: {
            TheLoading,
            TheHeader,
            Introduction,
            Category
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
        methods: {
            showIntroduction: function () {
                this.state = 'intro';
            },
            closeIntroduction: function () {
                this.state = 'complete';
            }
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

        .container-animation {
            padding: 20px 30px;
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity 1.0s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>
