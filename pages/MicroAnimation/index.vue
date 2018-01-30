<template>
    <section class="str-microAnimation">
        <header></header>
        <div id="all">

        </div><!-- /.all -->
    </section>
</template>

<script>
    import Header from '~/componets/microAnimation/header';

    export default {
        components: {
            Header
        },
        head() {
            return {
                'title': 'Micro Animations'
            }
        }
    };
</script>

<style lang="scss">
    .str-microAnimation {
        position: relative;
        width: 100%;
        height: 100%;

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
                    transform: translateY(0px);
                }
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
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                margin: auto;
                transition: transform 0.5s ease;
                overflow: hidden;
                transform: translateY(150%);
            }
        }
    }
</style>
