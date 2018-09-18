<template>
    <div id="loading-screen" class="is-show" ref="wrap"></div>
</template>

<script>
    import {mapActions} from 'vuex';
    import {Lib} from "../../assets/ts/common/gl/Lib";
    import {Program} from "../../assets/ts/common/gl/Program";
    import {Renderer} from "../../assets/ts/common/gl/Renderer";
    import {Animation} from "../../assets/ts/common/datatype/Animation";
    const {Methods, GLUtil} = require('../../assets/ts/Utils');
    const {AppConfig} = require('../../assets/ts/common/Config');

    const VS = `
        attribute vec3 position;
        void main(){
            gl_Position = vec4(position, 1.0);
        }
    `.trim();

    const FS = `
    precision mediump float;

    uniform float time; // time
    uniform vec2  resolution; // resolution
    const float CIRCLE_NUM = 6.0;

    void main(void){
        vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
        float alpha = 1.0;

        for(float i = 0.0; i < CIRCLE_NUM; i++){
            float j = i + 5.0;
            vec2 q = p + vec2(cos(time * j), sin(time * j)) * 0.5;
            alpha -= 1.0 - 0.25 / length(q);
        }
        gl_FragColor = vec4(vec3(0.0), alpha);
    }
    `.trim();

    const TIME_MIN = 3000;

    export default {
        name: "Loading",
        data() {
            return {
                lib: null,
                _renderer: null,
                _elapsed: 0,
                _time: 0,
            }
        },
        created: function () {
            this._time = 0;
            this._elapsed = 0;
            this._lib = new Lib();
            this._lib.canvas = document.createElement("canvas");
            this._lib.canvas.width = this._lib.canvas.height = 60;
            this._lib.gl = this._lib.canvas.getContext('webgl', {stencil: false});

            // モデル(頂点)データ
            let position = [
                -1.0, 1.0, 0.0,
                1.0, 1.0, 0.0,
                -1.0, -1.0, 0.0,
                1.0, -1.0, 0.0
            ];

            // 座標データから頂点バッファを生成
            let VBO = [
                GLUtil.createVBO(this._lib.gl, position)
            ];

            // インデックスデータ
            let index = [
                0,1,2,
                2,1,3
            ];

            let IBO = GLUtil.createIBO(this._lib.gl, index);

            let _prg = new Program(
                this._lib,
                VS,
                FS,
                ['position'],
                [3],
                ['time','resolution'],
                ['1f', '2fv']
            );

            _prg.setAttrVBO(VBO);
            _prg.setAttrIBO(IBO);

            this._renderer = new Renderer(this._lib, _prg, index);
        },
        mounted() {
            const parent = document.getElementById('loading-screen');
            parent.appendChild(this._lib.canvas);

            this.play();

            this.$refs.wrap.addEventListener('transitionend', this.onTransitionEnd);

            Methods.getJsonData(AppConfig.URLS.MICRO_ANIMATION_PATH).then(res => {
                this.parseJson(res);
            }).catch(err => {
                console.log(err);
            });
        },
        methods: {
            ...mapActions(['setAllItems', 'changeScene']),
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
            },
            animate() {
                this._timer = requestAnimationFrame(this.animate);

                this._time += 0.01;

                this.render();
            },
            render() {
                this._renderer.render(this._time, {width: 60, height: 60});
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
