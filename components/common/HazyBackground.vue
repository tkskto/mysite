<template>
    <div class="bg">
        <canvas id="canvas"/>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
import {GLConfig} from '../../assets/ts/common/Config'
import {HazyBackground} from '../../assets/ts/common/shader/HazyBackground';
import {Program} from '../../assets/ts/common/gl/Program';
import {HazyBackgroundData} from '../../assets/ts/common/data/HazyBackground';
import {Geometry} from '../../assets/ts/common/gl/Geometry';
import {Mesh} from '../../assets/ts/common/gl/Mesh';
import {Renderer} from '../../assets/ts/common/gl/Renderer';
import {WebGLContext} from '../../assets/ts/common/gl/Context';

export default {
    name: 'HazyBackground',
    data() {
        return {
            canvas: null,
            gl: null,
            time: 0,
        };
    },
    computed: {
        ...mapGetters(['canvasSize', 'screenSize']),
        styleWidth() {
            return this.screenSize.width;
        },
        styleHeight() {
            return this.screenSize.height;
        },
        width() {
            return this.canvasSize.width;
        },
        height() {
            return this.canvasSize.height;
        },
    },
    created() {
        this.time = 0.1;
    },
    mounted() {
        this.canvas = document.getElementById('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.style.width = this.styleWidth + 'px';
        this.canvas.style.height = this.styleHeight + 'px';
        const ctx = new WebGLContext(window.devicePixelRatio, this.canvas);
        this.gl = ctx.ctx;

        const shader = new HazyBackground(this.gl);
        const program = new Program(
            this.gl,
            shader,
            ['position'],
            [3],
            ['mvpMatrix', 'time'],
            [GLConfig.UNIFORM_TYPE_MATRIX4, GLConfig.UNIFORM_TYPE_FLOAT]
        );

        const plane = new HazyBackgroundData();
        const geometry = new Geometry(this.gl, plane).init();
        const mesh = new Mesh(this.gl, program, geometry, GLConfig.DRAW_TYPE_TRIANGLE);

        this.renderer = new Renderer(this.$store, ctx);
        this.renderer.add(mesh);
        this.play();
    },
    methods: {
        clear() {
            this.gl.clearColor(1.0, 1.0, 1.0, 1.0);
            this.gl.clearDepth(1.0);
            this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        },
        play() {
            this.timer = requestAnimationFrame(this.update);
        },
        pause() {
            if (this.timer) {
                cancelAnimationFrame(this.timer);
                this.timer = 0;
            }
        },
        update() {
            this.animate();
            this.timer = requestAnimationFrame(this.update);
            this.time += 0.01;
        },
        animate() {
            this.clear();
            this.renderer.update(this.time);
        },
    },
};
</script>
<style>
    .bg {
        position: fixed;
        height: 100vh;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        z-index: -1;
    }

    .bg canvas {
        vertical-align: top;
    }
</style>
