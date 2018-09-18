<template>
    <div id="intro" class="dialog" :class="{'is-show': isShow}">
        <div class="dialog-inner" :style="{width: width + 'px', height: height + 'px'}">
            <div class="dialog-header">
                <h2 class="hdg2">Introduction</h2>
                <button type="button" class="btn-close-dialog" @click="closeDialog">閉じる</button>
            </div>
            <section class="intro-section">
                <h3 class="hdg3">What？</h3>
                <p class="section-txt">「MicroAnimations」はボタンのインタラクションや、ローディングなど、Webサイトの部分的に使われる小さなアニメーションを集めたギャラリーです。</p>
            </section>
            <section class="intro-section">
                <h3 class="hdg3">Why？</h3>
                <p class="section-txt">.psdでは、動きを表現するのが難しいです。</p>
                <p class="section-txt">たとえばボタンの見た目は、通常時とhoverしたときの見た目をレイヤーを分けて用意されていることが多いですが、どのように変化するかは、エンジニアにお任せなことが多いと思います。</p>
                <p class="section-txt">でも、もしかしたらデザイナーさんの意図する動きがあるかもしれません。そういうときに、このページを見て、こんな感じで動いて欲しい！こっちもいいね！みたいなコミュニケーションが発生すればいいなと思っています。</p>
            </section>
            <section class="intro-section">
                <h3 class="hdg3">How？</h3>
                <section class="inner-section">
                    <h4 class="hdg4">注意点</h4>
                    <p class="section-txt">掲載されているアニメーションは表現を追及するため、コードやマークアップが最適化されていない場合もあります。出来れば動きを参考にする程度に留めて下さい。</p>
                    <p class="section-txt">アニメーションはただの雰囲気作りで追加してしまうと、ユーザを無駄に待たせてしまったり、煩わしさを与える危険性もあります。下記に注意点をまとめておきますので本当に必要かどうかをまずは検討してください。</p>
                </section>
            </section>
        </div>
        <div role="presentation" class="dialog-overlay"></div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';

    export default {
        name: "",
        components: {},
        props: {
            isShow: {
                type: Boolean,
                require: true,
            }
        },
        computed: {
            ...mapGetters(['screenSize']),
            width() {
                return this.screenSize.width - 100;
            },
            height() {
                return this.screenSize.height - 50;
            }
        },
        methods: {
            ...mapActions(['changeDialogState', 'changeScene']),
            closeDialog() {
                this.changeDialogState(false);
                this.changeScene('top');
            },
        }
    }
</script>

<style scoped lang="scss">
    .dialog {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 100%;
        opacity: 0;
        transition: opacity 0.5s linear;

        &.is-show {
            top: 0;
            opacity: 1;

            .dialog-inner {
                top: 0;
            }
        }

        &.is-hide {
            top: 0;
        }

        .dialog-overlay {
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, .2);
        }

        .dialog-inner {
            position: absolute;
            background: #fff;
            border-radius: 6px;
            top: 150%;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            transition: top 0.5s ease;
            overflow: hidden;
        }
    }
    #intro {
        .dialog-inner .dialog-header {
            background: #43a0ff;
            padding: 5px 10px;
            display: flex;
            justify-content: space-between;
        }

        .dialog-header {
            .hdg2{
                color: #fff;
            }

            .btn-close-dialog {
                position: relative;
                color: #43a0ff;

                &::before,
                &::after {
                    position: absolute;
                    display: block;
                    content: "";
                    background: #fff;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    margin: auto;
                    -webkit-transform: rotate(45deg);
                    transform: rotate(45deg);
                }

                &::before {
                    width: 2px;
                    height: 15px;
                }

                &::after {
                    width: 15px;
                    height: 2px;
                }
            }
        }

        .intro-section {
            padding: 10px 20px;

            .hdg3 {
                margin-bottom: 10px;
            }

            .section-txt {
                margin-left: 10px;
            }

            .inner-section {
                padding: 5px 10px;
                margin-bottom: 10px;

                .hdg4 {
                    margin-bottom: 5px;
                }

                .section-list01 {
                    margin-top: 15px;
                    padding-left: 30px;

                    .list-item {
                        list-style-type: disc;
                        margin-bottom: 5px;
                    }
                }
            }
        }
    }
</style>
