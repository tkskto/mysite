<template>
    <div class="str-loading-root">

    </div>
</template>

<script>

    import {mapGetters} from 'vuex';
    import {Loading} from "~/assets/ts/microAnimation/Shader";
    import {GLUtil} from '~/assets/ts/Utils';

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
            this._canvas.width = this._canvas.height = 60;
            this._gl = this._canvas.getContext('webgl');

            // モデル(頂点)データ
            const position = [
                -1.0, 1.0, 0.0,
                1.0, 1.0, 0.0,
                -1.0, -1.0, 0.0,
                1.0, -1.0, 0.0
            ];

            // 座標データから頂点バッファを生成
            let VBO = [
                GLUtil.createVBO(this._gl, position)
            ];

            // インデックスデータ
            let index = [
                0,1,2,
                2,1,3
            ];

            let IBO = utils.GLUtil.createIBO(this._lib.gl, index);

            let _prg = new gl.Program(
                this._lib,
                'VS',
                'FS',
                ['position'],
                [3],
                ['time','resolution'],
                ['1f', '2fv']
            );
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
