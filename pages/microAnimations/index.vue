<template>
    <section class="container" :class="sceneName">
        <div class="wrapper">
            <TheHeader />
            <div class="sketch" id="all">
                <Category v-for="(value, key) in getAllItemData" :key="key" :categoryName="key" :items="value" />
            </div>
        </div>
        <Dialog :isShow=dialogState />
        <Loading />
    </section>
</template>

<script>
    import Loading from '../../components/microAnimations/Loading';
    import TheHeader from '../../components/microAnimations/Header';
    import Category from '../../components/microAnimations/Category';
    import Dialog from '../../components/microAnimations/Dialog';
    import Vector from '~/assets/ts/common/gl/Vector.ts';
    import {mapGetters, mapActions} from 'vuex';

    export default {
        name: 'microAnimations',
        layout: 'microAnimations',
        components: {TheHeader, Dialog, Category, Loading},
        head () {
            return {
                title: 'Micro Animations',
                meta: [
                    { hid: 'description', name: 'description', content: 'Gallery of Micro Animations.' }
                ]
            };
        },
        computed: {
            ...mapGetters({
                getAllItemData: 'MicroAnimations/getAllItemData',
                dialogState: 'MicroAnimations/dialogState',
                sceneName: 'Common/sceneName',
            })
        },
        methods: {
            ...mapActions({
                setCameraPosition: 'Practice/setCameraPosition',
                setCanvasSize: 'Common/setCanvasSize',
            })
        },
        created () {
            this.setCameraPosition(new Vector(0.0, 0.0, 1,0));
            this.setCanvasSize({width: 30, height: 30});
        }
    };
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

    .load .wrapper,
    .dialog .wrapper {
        opacity: 0;
    }

    .dialog .wrapper #all {
        display: none;
    }

    .top .wrapper {
        opacity: 1;
    }

    #all {
        padding: 20px 30px;
    }
</style>
