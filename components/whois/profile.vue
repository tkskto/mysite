<template>
    <div class="wrapper">
        <img src="~/assets/img/whois/takeshi_b.jpg" :style="`transform: translate(${posX1}px,${posY1}px)`" alt="">
        <img src="~/assets/img/whois/takeshi_m.png" :style="`transform: translate(${posX2}px,${posY2}px) scale(1.05)`" alt="">
        <img src="~/assets/img/whois/takeshi_f.png" :style="`transform: translate(${posX3}px,${posY3}px) scale(1.05)`" alt="">
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    export default {
        data() {
            return {
                posX1: 0,
                posY1: 0,
                posX2: 0,
                posY2: 0,
                posX3: 0,
                posY3: 0,
            };
        },
        computed: {
            ...mapGetters({
                screenSize: 'Common/screenSize'
            })
        },
        mounted() {
            document.addEventListener('mousemove', this.onMouseMove);
        },
        methods: {
            onMouseMove(e) {
                const {clientX: mouseX , clientY: mouseY} = e;
                const {width, height} = this.screenSize;

                const posX = (mouseX / width) * 2 - 1;
                const posY = (mouseY / height) * 2 - 1;

                this.posX1 = posX * 5;
                this.posY1 = posY * 5;

                this.posX2 = posX * 15;
                this.posY2 = posY * 15;

                this.posX3 = posX * 25;
                this.posY3 = posY * 25;
            }
        }
    };
</script>

<style scoped>
    .wrapper img {
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        object-fit: cover;
        height: 100%;
        transition: transform 0.5s cubic-bezier(.17,.67,.4,.99), opacity 0.7s;
        transform: translateX(-25%);
    }

    .is-show {
        transition: none;
    }
</style>