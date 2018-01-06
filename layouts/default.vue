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

            if (this.screenSize.width !== width && this.screenSize.height !== height) {
                    this.$store.dispatch('resize', {width: width, height: height});
                }
            }
        }
    }
</script>

<style>
    html {
        font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        font-size: 16px;
        word-spacing: 1px;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        box-sizing: border-box;
    }

    *, *:before, *:after {
        box-sizing: border-box;
        margin: 0;
    }

    html, body, div, canvas {
        margin: 0;
    }

    html, body, .str-root {
        width: 100%;
        height: 100%;
    }

    body > div {
        height: 100%;
    }

    body {
        background: #000000;
    }
    canvas {
        vertical-align: top;
    }


</style>
