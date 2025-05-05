<script setup lang="ts">
import {useScreenSize} from '~/composables/useScreenSize';
import {useMousePosition} from '~/composables/useMousePosition';

const {width, height} = useScreenSize();
const mouse = useMousePosition();

const posX1 = ref(0);
const posY1 = ref(0);
const posX2 = ref(0);
const posY2 = ref(0);
const posX3 = ref(0);
const posY3 = ref(0);

watch(mouse, () => {
    const {x, y} = mouse;
    const posX = (x / width) * 2 - 1;
    const posY = (y / height) * 2 - 1;

    posX1.value = posX * 5;
    posY1.value = posY * 5;

    posX2.value = posX * 15;
    posY2.value = posY * 15;

    posX3.value = posX * 25;
    posY3.value = posY * 25;
});
</script>

<template>
    <div class="wrapper">
        <img src="~/assets/img/whois/takeshi_b.jpg" :style="`transform: translate(${posX1}px,${posY1}px)`" alt="">
        <img src="~/assets/img/whois/takeshi_m.png" :style="`transform: translate(${posX2}px,${posY2}px) scale(1.05)`" alt="">
        <img src="~/assets/img/whois/takeshi_f.png" :style="`transform: translate(${posX3}px,${posY3}px) scale(1.05)`" alt="">
    </div>
</template>

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
</style>
