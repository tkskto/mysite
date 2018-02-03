<template>
    <div class="str-loading-root">

    </div>
</template>

<script>

    import {mapGetters} from 'vuex';
    import {Loading} from "~/assets/ts/microAnimation/Shader";
    import {Renderer} from '~/assets/ts/common/Renderer';
    import {WebGLContext} from '~/assets/ts/common/Context';
    import {Program} from '~/assets/ts/common/Program';
    import {Geometry} from '~/assets/ts/common/Geometry';
    import {Mesh} from '~/assets/ts/common/Mesh';
    import {GLUtils} from '~/assets/ts/Utils';
    import {GLConfig} from '~/assets/ts/common/Config';
    import {Vector} from '~/assets/ts/common/Vector';
    import {Plane} from '~/assets/ts/common/Plane';

    export default {
        name: "loading",
        components: {},
        props: {},
        data: function () {
            return {
                _canvas: null,
                _ctx: null,
                _gl: null,
                _renderer: null
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
            this._ctx = new WebGLContext(this._canvas);
            this._gl = this._ctx.ctx;

            this.clear();

            const shader = new Loading(this._gl);
            const prg = new Program(this._gl, shader, ['position', 'color'], [3, 4], ['mvpMatrix'], [GLConfig.UNIFORM_TYPE_MATRIX4]);
            this._renderer = new Renderer(this._ctx, new Vector(0, 0, 0));

            const data = new Plane();
            const line = new Geometry(this._gl, data).init();
            const mesh = new Mesh(this._gl, prg, line, GLConfig.DRAW_TYPE_LINE);
            this._renderer.add(mesh);
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
            clear: function () {
                this._gl.clearColor(1.0, 1.0, 1.0, 1.0);
                this._gl.clearDepth(1.0);
                this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);
            }
        },
        renderError: function (err) {
        }
    }
</script>

<style scoped>
    .str-loading-root {

    }
</style>
