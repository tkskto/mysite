<template>
    <button class="lyt-btn-viewChange" @click="onClick">{{text}}</button>
</template>

<script>
    export default {
        name: "ViewChangeButton",
        computed: {
            text() {
                return this._isShow ? 'PLAY' : 'GLSL';
            },
        },
        methods: {
            onClick() {
                const body = document.body;

                if (this._isShow) {
                    body.classList.remove('show-shader');

                    setTimeout(() => {
                        body.classList.remove('pre-show');
                    }, 300);
                } else {
                    body.classList.add('pre-show');

                    setTimeout(() => {
                        body.classList.add('show-shader');
                    }, 100);
                }
                this._isShow = !this._isShow;
            }
        },
    }
</script>

<style scoped>
    .id-19 .lyt-btn-viewChange {
        display: none;
    }

    .lyt-btn-viewChange {
        width: 44px;
        height: 44px;
        position: absolute;
        z-index: 3;
        background: none;
        border: none;
        right: 10px;
        bottom: 10px;
        background: #fff;
        cursor: pointer;
        border-radius: 4px;
    }
</style>
