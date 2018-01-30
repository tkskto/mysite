<template>
    <div class="str-loading-root">

    </div>
</template>

<script>

    import {mapGetters} from 'vuex';
    import {Loading} from "~/assets/ts/microAnimation/Shader";

    export default {
        name: "loading",
        components: {},
        props: {},
        data: function () {
            return {
                _canvas: null,
                _gl: null,
            }
        },
        computed: {
            ...mapGetters(['screenSize'])
        },
        watch: {},
        beforeCreate: function () {
        },
        created: function () {
            this._canvas = document.createElement('canvas');
            this._canvas.width = this.screenSize.width;
            this._canvas.height = this.screenSize.height;
            this._gl = this._canvas.getContext('webgl');
        },
        beforeMount: function () {
        },
        mounted: function () {
            this.$el.appendChild(this._canvas);
        },
        beforeDestroy: function () {
        },
        destroyed: function () {
        },
        methods: {
        },
        renderError: function (err) {
        }
    }
</script>

<style scoped>
    .str-loading-root {

    }
</style>
