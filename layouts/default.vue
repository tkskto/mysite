<template>
    <div class="str-root">
        <nuxt/>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        computed: {
            ...mapGetters(['screenSize'])
        },
        created: function () {
            this.resize();
        },
        mounted: function () {
            window.addEventListener('resize', this.resize);
        },
        methods: {
            resize: function () {
                const width = window.innerWidth;
                const height = window.innerHeight;

            if (this.screenSize.width !== width || this.screenSize.height !== height) {
                    this.$store.dispatch('resize', {width: width, height: height});
                }
            }
        }
    }
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

    html {
        font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, YuGothic, "Hiragino Kaku Gothic StdN", Meiryo, sans-serif;
        font-size: 62.5%;
        word-spacing: 1px;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        box-sizing: border-box;
    }

    *, *:before, *:after {
        box-sizing: border-box;
    }

    html, body, div, canvas {
        margin: 0;
    }

    html, body, .str-root {
        width: 100%;
        height: 100%;
    }

    body > #__nuxt {
        height: 100%;
    }

    body {
        position: relative;
        background: #000000;
    }
    canvas {
        vertical-align: top;
    }
</style>
