<template>
    <div class="practice-root">
        <ul class="list-sketch">
            <li class="sketch-item" id="01"><a href="#01">#1</a></li>
            <li class="sketch-item" id="02"><a href="#02">#2</a></li>
            <li class="sketch-item" id="03"><a href="#03">#3</a></li>
            <li class="sketch-item" id="04"><a href="#04">#4</a></li>
            <li class="sketch-item" id="05"><a href="#05">#5</a></li>
            <li class="sketch-item" id="06"><a href="#06">#6</a></li>
            <li class="sketch-item" id="07"><a href="#07">#7</a></li>
            <li class="sketch-item" id="08"><a href="#08">#8</a></li>
            <li class="sketch-item" id="09"><a href="#09">#9</a></li>
            <li class="sketch-item" id="10"><a href="#10">#10</a></li>
            <li class="sketch-item" id="11"><a href="#11">#11</a></li>
            <li class="sketch-item" id="12"><a href="#12">#12</a></li>
            <li class="sketch-item" id="13"><a href="#13">#13(with sound)</a></li>
            <li class="sketch-item" id="14"><a href="#14">#14(with sound)</a></li>
            <li class="sketch-item" id="15"><a href="#15">#15</a></li>
            <li class="sketch-item" id="16"><a href="#16">#16</a></li>
            <li class="sketch-item" id="17"><a href="#17">#17</a></li>
            <li class="sketch-item" id="18"><a href="#18">#18</a></li>
            <li class="sketch-item" id="19"><a href="#19">#19</a></li>
            <li class="sketch-item" id="20"><a href="#20">#20</a></li>
        </ul>

        <div class="container-canvas">
            <canvas id="canvas-GL" :width="canvasDisplayWidth" :height="canvasDisplayHeight" :style="{width: canvasPracticalWidth, height: canvasPracticalHeight}"></canvas>
            <Quote></Quote>
        </div>

        <ViewChangeButton />
        <ShaderView />
        <PlayPauseBtn />
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import Quote from '~/components/practice/quote.vue';
    import ViewChangeButton from '~/components/practice/ViewChangeButton';
    import ShaderView from '~/components/practice/ShaderView';
    import AppConfig from '~/assets/ts/practice/Config.ts';
    import Vector from '~/assets/ts/common/gl/Vector.ts';
    import Item0 from '~/assets/ts/practice/sketch/00/Item0.ts';
    import Item1 from '~/assets/ts/practice/sketch/01/Item1.ts';
    import Item2 from '~/assets/ts/practice/sketch/02/Item2.ts';
    import Item3 from '~/assets/ts/practice/sketch/03/Item3.ts';
    import Item4 from '~/assets/ts/practice/sketch/04/Item4.ts';
    import Item5 from '~/assets/ts/practice/sketch/05/Item5.ts';
    import Item6 from '~/assets/ts/practice/sketch/06/Item6.ts';
    import Item7 from '~/assets/ts/practice/sketch/07/Item7.ts';
    import Item8 from '~/assets/ts/practice/sketch/08/Item8.ts';
    import Item9 from '~/assets/ts/practice/sketch/09/Item9.ts';
    import Item10 from '~/assets/ts/practice/sketch/10/Item10.ts';
    import Item11 from '~/assets/ts/practice/sketch/11/Item11.ts';
    import Item12 from '~/assets/ts/practice/sketch/12/Item12.ts';
    import Item13 from '~/assets/ts/practice/sketch/13/Item13.ts';
    import Item14 from '~/assets/ts/practice/sketch/14/Item14.ts';
    import Item15 from '~/assets/ts/practice/sketch/15/Item15.ts';
    import Item16 from '~/assets/ts/practice/sketch/16/Item16.ts';
    import Item17 from '~/assets/ts/practice/sketch/17/Item17.ts';
    import Item18 from '~/assets/ts/practice/sketch/18/Item18.ts';
    import Item19 from '~/assets/ts/practice/sketch/19/Item19.ts';
    import Item20 from '~/assets/ts/practice/sketch/20/Item20.ts';
    import PlayPauseBtn from '~/components/practice/PlayPauseBtn';

    export default {
        name: 'practice',
        layout: 'practice',
        head() {
            return {
                title: 'Practice | Takeshi Kato',
                meta: [
                    { hid: 'description', name: 'description', content: 'This is practice of GLSL and part of portfolio.' }
                ],
            };
        },
        components: {
            PlayPauseBtn,
            Quote,
            ViewChangeButton,
            ShaderView,
        },
        computed: {
            ...mapGetters({
                screenSize: 'Common/screenSize',
                canvasSize: 'Common/canvasSize',
                ratio: 'Common/ratio',
                sceneName: 'Common/sceneName',
                mouseState: 'Common/mouseState',
            }),
            canvasDisplayWidth() {
                if (this.canvasSize) {
                    return this.canvasSize.width;
                }
                return 0;
            },
            canvasDisplayHeight() {
                if (this.canvasSize) {
                    return this.canvasSize.height;
                }
                return 0;
            },
            canvasPracticalWidth() {
                if (this.canvasSize) {
                    return this.canvasSize.width / this.ratio + 'px';
                }
                return 0;
            },
            canvasPracticalHeight() {
                if (this.canvasSize) {
                    return this.canvasSize.height / this.ratio + 'px';
                }
                return 0;
            },
        },
        methods: {
            ...mapActions({
                changeScene: 'Common/changeScene',
                changeID: 'Practice/changeID',
                setCameraPosition: 'Practice/setCameraPosition',
                setMousePos: 'Common/setMousePos',
            }),
            onHashChange() {
                this.changeID(location.hash.split('#')[1] || '0');
            },
            setMouseTracker() {
                if (this.mouseState) {
                    document.addEventListener('mousemove', this.mouseTracking);
                } else {
                    document.removeEventListener('mousemove', this.mouseTracking);
                }
            },
            mouseTracking(e) {
                this.setMousePos({
                    x: e.clientX * this.ratio,
                    y: e.clientY * this.ratio
                });
            },
            changeSketchState(e) {
                if ('Escape' === e.key && this.sceneName === AppConfig.SCENE_SKETCH) {
                    this.changeScene(AppConfig.SCENE_PAUSE);
                } else if ('Escape' === e.key && this.sceneName === AppConfig.SCENE_PAUSE) {
                    this.changeScene(AppConfig.SCENE_SKETCH);
                }
            }
        },
        mounted() {
            const sketch = document.querySelectorAll('.sketch-item');
            const width = this.screenSize.width;
            const height = this.screenSize.height;
            const aspect = width > height ? height / width : height > width ? width / height : 1;
            const _canvasGL = document.getElementById('canvas-GL');

            this.setCameraPosition(new Vector(0.0, 0.0, aspect));

            new Item0(this.$store, _canvasGL, '0');

            for (let i = 0, len = sketch.length; i < len; i++) {
                const id = sketch.item(i).attributes.getNamedItem('id').value;

                if (!_canvasGL) {
                    throw new Error('id: ' + id + 'のdata-sketch-typeが指定されていません。');
                }

                switch (id) {
                    case '01':
                        new Item1(this.$store, _canvasGL, id);
                        break;
                    case '02':
                        new Item2(this.$store, _canvasGL, id);
                        break;
                    case '03':
                        new Item3(this.$store, _canvasGL, id);
                        break;
                    case '04':
                        new Item4(this.$store, _canvasGL, id);
                        break;
                    case '05':
                        new Item5(this.$store, _canvasGL, id);
                        break;
                    case '06':
                        new Item6(this.$store, _canvasGL, id);
                        break;
                    case '07':
                        new Item7(this.$store, _canvasGL, id);
                        break;
                    case '08':
                        new Item8(this.$store, _canvasGL, id);
                        break;
                    case '09':
                        new Item9(this.$store, _canvasGL, id);
                        break;
                    case '10':
                        new Item10(this.$store, _canvasGL, id);
                        break;
                    case '11':
                        new Item11(this.$store, _canvasGL, id);
                        break;
                    case '12':
                        new Item12(this.$store, _canvasGL, id);
                        break;
                    case '13':
                        new Item13(this.$store, _canvasGL, id);
                        break;
                    case '14':
                        new Item14(this.$store, _canvasGL, id);
                        break;
                    case '15':
                        new Item15(this.$store, _canvasGL, id);
                        break;
                    case '16':
                        new Item16(this.$store, _canvasGL, id);
                        break;
                    case '17':
                        new Item17(this.$store, _canvasGL, id);
                        break;
                    case '18':
                        new Item18(this.$store, _canvasGL, id);
                        break;
                    case '19':
                        new Item19(this.$store, _canvasGL, id);
                        break;
                    case '20':
                        new Item20(this.$store, _canvasGL, id);
                        break;
                    default:
                        throw new Error('please set id and data attribute "sketch-type"');
                }
            }

            window.addEventListener('hashchange', this.onHashChange);
            this.onHashChange();

            document.addEventListener('keydown', this.changeSketchState);
        },
        watch: {
            mouseState(val, old) {
                this.setMouseTracker();
            }
        },
        beforeDestroy: function () {
            window.removeEventListener('hashchange', this.onHashChange);
            document.removeEventListener('keydown', this.changeSketchState);
            document.removeEventListener('mousemove', this.mouseTracking);
        }
    };
</script>

<style scoped>
    html,body,div,canvas, ul, ol {
        margin: 0;
        padding: 0
    }

    body.canvas2D #canvas-GL {
        display: none;
    }

    body.webGL #canvas-2d {
        display: none;
    }

    .practice-root {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .container-canvas {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 0;
    }

    .container-canvas .text-quote {
        position: absolute;
        bottom: 20px;
        left: 0;
        right: 0;
        text-align: center;
    }

    .list-sketch {
        position: relative;
        z-index: 1;
        padding: 12px;
        list-style: none;
        display: inline-block;
    }

    .list-sketch .sketch-item {
        margin-bottom: 4px;
    }

    .list-sketch .sketch-item a {
        font-size: 1.2rem;
        text-shadow: 1px 1px 2px rgb(220, 89, 90), 0 0 1em rgb(110, 120, 200), 0 0 1em rgb(110, 120, 200);
        color: #fff;
    }

    canvas {
        vertical-align: top;
    }
</style>
