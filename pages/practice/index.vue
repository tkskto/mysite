<template>
    <div>
        <ul class="list-sketch">
            <li class="sketch--item" id="01"><a href="#01">#1</a></li>
            <li class="sketch--item" id="02"><a href="#02">#2</a></li>
            <li class="sketch--item" id="03"><a href="#03">#3</a></li>
            <li class="sketch--item" id="04"><a href="#04">#4</a></li>
            <li class="sketch--item" id="05"><a href="#05">#5</a></li>
            <li class="sketch--item" id="06"><a href="#06">#6</a></li>
            <li class="sketch--item" id="07"><a href="#07">#7</a></li>
            <li class="sketch--item" id="08"><a href="#08">#8</a></li>
            <li class="sketch--item" id="09"><a href="#09">#9</a></li>
            <li class="sketch--item" id="10"><a href="#10">#10</a></li>
            <li class="sketch--item" id="11"><a href="#11">#11</a></li>
            <li class="sketch--item" id="12"><a href="#12">#12</a></li>
            <li class="sketch--item" id="13"><a href="#13">#13</a></li>
        </ul>

        <div class="container-canvas">
            <canvas id="canvas--GL" :width="canvasDisplayWidth" :height="canvasDisplayHeight" :style="{width: canvasPracticalWidth, height: canvasPracticalHeight}"></canvas>
            <Quote></Quote>
        </div>

        <button class="lyt-btn--viewChange" id="btn--viewChange">GLSL</button>

        <div class="container-text--shader">
            <div class="text--VS">
                <h2>Vertex Shader</h2>
                <p class="shader--text shader--vs"></p>
            </div>
            <div class="text--FS">
                <h2>Fragment Shader</h2>
                <p class="shader--text shader--fs"></p>
            </div>
            <div class="bg"></div>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import Quote from '~/components/practice/quote.vue';
    import {AppConfig} from "~/assets/ts/practice/Config";
    import {Vector} from '~/assets/ts/common/gl/Vector';
    import {ViewChangeBtn} from '~/assets/ts/practice/module/ViewChangeBtn';
    import {Item0} from '~/assets/ts/practice/sketch/00/Item0';
    import {Item1} from '~/assets/ts/practice/sketch/01/Item1';
    import {Item2} from '~/assets/ts/practice/sketch/02/Item2';
    import {Item3} from '~/assets/ts/practice/sketch/03/Item3';
    import {Item4} from '~/assets/ts/practice/sketch/04/Item4';
    import {Item5} from '~/assets/ts/practice/sketch/05/Item5';
    import {Item6} from '~/assets/ts/practice/sketch/06/Item6';
    import {Item7} from '~/assets/ts/practice/sketch/07/Item7';
    import {Item8} from '~/assets/ts/practice/sketch/08/Item8';
    import {Item9} from '~/assets/ts/practice/sketch/09/Item9';
    import {Item10} from '~/assets/ts/practice/sketch/10/Item10';
    import {Item11} from '~/assets/ts/practice/sketch/11/Item11';
    import {Item12} from '~/assets/ts/practice/sketch/12/Item12';
    import {Item13} from '~/assets/ts/practice/sketch/13/Item13';

    export default {
        name: 'practice',
        layout: 'default',
        head() {
            return {
                title: 'Practice | Takeshi Kato',
                meta: [
                    { hid: 'description', name: 'description', content: 'This is practice of GLSL and part of portfolio.' }
                ],
            };
        },
        components: {
            Quote,
        },
        computed: {
            ...mapGetters(['screenSize', 'canvasSize', 'ratio', 'getScene', 'mouseState']),
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
            ...mapActions(['changeScene', 'changeID', 'setCameraPosition', 'setMousePos']),
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
                if ('Escape' === e.key && this.state === AppConfig.SCENE_SKETCH) {
                    this.changeScene(AppConfig.SCENE_PAUSE);
                } else if ('Escape' === e.key && this.state === AppConfig.SCENE_PAUSE) {
                    this.changeScene(AppConfig.SCENE_SKETCH);
                }
            }
        },
        mounted() {
            const sketch= document.querySelectorAll('.sketch--item');
            const width = this.screenSize.width;
            const height = this.screenSize.height;
            const aspect = width > height ? height / width : height > width ? width / height : 1;
            const _canvasGL = document.getElementById('canvas--GL');

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
                    default:
                        throw new Error('please set id and data attribute "sketch-type"');
                }
            }

            new ViewChangeBtn(this.$store, document.getElementById('btn--viewChange'), document.querySelector('.container-text--shader'));

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
<style>
    @import '~/assets/css/practice/style.css';
</style>
