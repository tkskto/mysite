<template>
    <div class="str-root">
        <nuxt/>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';

    export default {
        computed: {
            ...mapGetters(['screenSize'])
        },
        created: function () {
            this.onResize();
        },
        mounted: function () {
            this.setRatio(window.devicePixelRatio);
            window.addEventListener('resize', this.onResize);
        },
        methods: {
            ...mapActions(['resize', 'setRatio']),
            onResize: function () {
                const width = window.innerWidth;
                const height = window.innerHeight;

                if (this.screenSize.width !== width || this.screenSize.height !== height) {
                    this.resize({width: width, height: height});
                }
            }
        }
    }
</script>

<style>
    @import '~/assets/css/common.css';
    canvas {
        vertical-align: top;
    }
</style>
