<template>
    <section class="container" :class="sceneName">
        <div class="wrapper">
            <TheHeader />
            <div id="all">
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
    import {mapGetters} from 'vuex';

    export default {
        name: 'index',
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
            ...mapGetters(['getAllItemData', 'dialogState', 'sceneName'])
        }
    };
</script>

<style>
    html, body, div, span,
    h1, h2, h3, h4, h5, h6,
    p, pre, a, img, button,
    ul, ol, li,
    dl, dt, dd, table, th, td,
    header, main, nav, footer {
        margin: 0;
        padding: 0;
    }

    *, *::before, *::after {
        box-sizing: border-box;
    }

    html, body {
        width: 100%;
        height: 100%;
    }

    html {
        font-family: YuGothic, "Hiragino Kaku Gothic StdN", Meiryo, sans-serif;
        font-size: 62.5%;
    }

    body {
        position: relative;
        font-size: 1.4rem;
        line-height: 1.6;
        color: #333;
        background: #ffe;
        overflow-y: scroll;
    }

    img {
        max-width: 100%;
        vertical-align: top;
    }

    li {
        list-style-type: none;
    }

    button {
        background: none;
        border: none;
        box-shadow: none;
        cursor: pointer;
    }

    .wrapper {
        transition: opacity 1.0s ease;
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
