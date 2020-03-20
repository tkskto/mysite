<template>
    <div id="loading-screen" class="is-show" ref="wrap"></div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';
    import Program from '~/assets/ts/common/gl/Program.ts';
    import Renderer from '~/assets/ts/common/gl/Renderer.ts';
    import Animation from '~/assets/ts/common/datatype/Animation.ts';
    import {Methods} from '~/assets/ts/common/Utils.ts';
    import {AppConfig, GLConfig} from '~/assets/ts/common/Config.ts';
    import Loading from '~/assets/ts/common/shader/Loading.ts';
    import LoadingData from '~/assets/ts/common/data/Loading.ts';
    import WebGLContext from '~/assets/ts/common/gl/Context.ts';
    import Geometry from '~/assets/ts/common/gl/Geometry.ts';
    import Mesh from '~/assets/ts/common/gl/Mesh.ts';

    const TIME_MIN = 3000;

    export default {
        name: 'Loading',
        data() {
            return {
                _renderer: null,
                _elapsed: 0,
                _time: 0,
            }
        },
        computed: {
            ...mapGetters({
                ratio: 'Common/ratio',
            })
        },
        created: function () {
            const dLoading = new LoadingData();
            this._time = 0;
            this._elapsed = 0;
            this.canvas = document.createElement('canvas');
            this.canvas.width = this.canvas.height = 60;
            const gl = new WebGLContext(this.ratio, this.canvas);
            const data = new Loading(gl.ctx);
            let _prg = new Program(
                gl.ctx,
                data,
                ['position'],
                [3],
                ['mvpMatrix', 'resolution', 'time'],
                [GLConfig.UNIFORM_TYPE_MATRIX4, GLConfig.UNIFORM_TYPE_VECTOR2, GLConfig.UNIFORM_TYPE_FLOAT]
            );
            const plane = new Geometry(gl.ctx, dLoading).init();
            const mesh = new Mesh(gl.ctx, _prg, plane, GLConfig.DRAW_TYPE_TRIANGLE);
            this._renderer = new Renderer(this.$store, gl);
            this._renderer.add(mesh);
        },
        mounted() {
            const parent = document.getElementById('loading-screen');
            parent.appendChild(this.canvas);

            this.play();

            this.$refs.wrap.addEventListener('transitionend', this.onTransitionEnd);

            Methods.getJsonData(AppConfig.URLS.MICRO_ANIMATION_PATH).then(res => {
                this.parseJson(res);
            }).catch(err => {
                console.log(err);
            });
        },
        methods: {
            ...mapActions({
                setAllItems: 'MicroAnimations/setAllItems',
                changeScene: 'Common/changeScene',
            }),
            parseJson(data) {
                const allSketch = {};

                for(let key in data) {
                    if(data.hasOwnProperty(key)) {
                        const sketchArr = [];
                        const category = data[key];
                        let i, len = category.length;

                        for(i = 0; i < len; i++) {
                            const animation = category[i];
                            const sketch = new Animation(
                                animation['author'],
                                key,
                                i + 1
                            );

                            sketchArr.push(sketch);
                        }

                        allSketch[key] = sketchArr;
                    }
                }

                this.setAllItems(allSketch);

                //ここまでにかかった時間 = ローディングを表示している時間
                let loadingTime = this._elapsed - new Date().getTime();

                //早すぎるのも微妙なので、TIME_MINより短かったら、TIME_MIN秒わざとおくらせる
                let delay = loadingTime < TIME_MIN ? TIME_MIN : 0;

                setTimeout(() => {
                    this.hideLoader();
                }, delay);
            },
            play() {
                this._timer = requestAnimationFrame(this.animate);
            },
            pause() {
                if(this._timer) {
                    cancelAnimationFrame(this._timer);
                    this._timer = null;
                }
            },
            hideLoader() {
                this.$refs.wrap.classList.remove('is-show');
            },
            onTransitionEnd() {
                this.changeScene('top');
                this.pause();
            },
            animate() {
                this._timer = requestAnimationFrame(this.animate);

                this._time += 0.01;

                this.render();
            },
            render() {
                this._renderer.update([60, 60], this._time);
            }
        },
        renderError: function (err) {
        }
    }
</script>

<style scoped lang="scss">
    #loading-screen {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 60px;
        height: 60px;
        transition: opacity 0.3s linear;
        opacity: 0;

        &.is-show {
            opacity: 1;
        }
    }
</style>
