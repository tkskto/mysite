<template>
    <transition name="slide">
        <div id="intro" class="dialog">
            <div class="dialog-inner">
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
                        <ul class="section-list01">
                            <li>現在注意点を作成中。</li>
                        </ul>
                    </section>
                </section>
            </div>
            <div role="presentation" class="dialog-overlay"></div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "introduction",
        components: {},
        props: {},
        data: function () {
            return {
            }
        },
        computed: {},
        watch: {},
        beforeCreate: function () {
        },
        created: function () {
        },
        beforeMount: function () {
        },
        mounted: function () {
        },
        beforeDestroy: function () {
        },
        destroyed: function () {
        },
        methods: {
            closeDialog: function () {
                this.$emit('onDismiss');
            }
        },
        renderError: function (err) {
        }
    }
</script>

<style scoped lang="scss">
    .dialog {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        opacity: 1;
        background: rgba(0, 0, 0, 0);
        transform: translateY(0);

        .dialog-overlay {
            position: fixed;
            top: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, .2);
            z-index: 0;
        }

        .dialog-inner {
            position: absolute;
            border-radius: 6px;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            transform: translateY(0);
            overflow: hidden;
            padding: 40px;
            z-index: 1;

            .dialog-header {
                background: #43a0ff;
                padding: 5px 10px;
                display: flex;
                justify-content: space-between;


                .hdg2 {
                    color: #fff;
                }

                .btn-close-dialog {
                    position: relative;
                    color: #43a0ff;
                    background: none;
                    border: none;
                    box-shadow: none;
                    cursor: pointer;
                }

                .btn-close-dialog::before,
                .btn-close-dialog::after {
                    position: absolute;
                    display: block;
                    content: "";
                    background: #fff;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    margin: auto;
                    transform: rotate(45deg);
                }

                .btn-close-dialog::before {
                    width: 2px;
                    height: 15px;
                }

                .btn-close-dialog::after {
                    width: 15px;
                    height: 2px;
                }
            }

            .intro-section {
                padding: 10px 20px;
                background: #fff;

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
    }

    .slide-enter-active, .slide-leave-active {
        transition: transform 1.0s, opacity 1.0s;
    }

    .slide-enter-active .dialog-inner, .slide-leave-active .dialog-inner {
        transition: transform 1.0s;
    }

    .slide-enter, .slide-leave-to {
        transform: translateY(100%);
        opacity: 0;
    }

    .slide-enter .dialog-inner, .slide-leave-to .dialog-inner {
        transform: translateY(150%);
    }
</style>
