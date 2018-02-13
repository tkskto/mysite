<template>
    <transition name="fade">
        <div class="str-loading-root">
        </div>
    </transition>
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
                _renderer: null,
                _timer: 0,
                _count: 0
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

            // TODO: remove
            this._count = 0;
        },
        beforeMount: function () {
        },
        mounted: function () {
            this.$el.appendChild(this._canvas);
            this._ctx = new WebGLContext(this._canvas);
            this._gl = this._ctx.ctx;

            this.clear();

            const shader = new Loading(this._gl);
            const prg = new Program(this._gl, shader,
                ['position'], [3],
                ['time', 'resolution'], [GLConfig.UNIFORM_TYPE_FLOAT, GLConfig.UNIFORM_TYPE_VECTOR2]
            );
            this._renderer = new Renderer(this._ctx, new Vector(0, 0, 0));

            const data = new Plane();
            const line = new Geometry(this._gl, data).init();
            const mesh = new Mesh(this._gl, prg, line, GLConfig.DRAW_TYPE_TRIANGLE);
            this._renderer.add(mesh);
            this.play();
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
            },
            play: function () {
                this._timer = requestAnimationFrame(this.update);
            },
            update: function () {
                this._count += 0.01;
                this._timer = requestAnimationFrame(this.update);
                this.animate();
            },
            animate: function () {
                this._renderer.update(this._count, [60, 60]);
            }
        },
        renderError: function (err) {
        }
    }
</script>

<style scoped>
    .str-loading-root {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 60px;
        height: 60px;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }
    .fade-enter, .fade-leave-to {
        opacity: 0
    }
</style>
