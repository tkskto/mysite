<template>
    <div class="wrapper">
        <img src="~/assets/img/whois/takeshi_b.jpg" :style="`transform: translate(${posX1}px,${posY1}px)`" alt="">
        <img src="~/assets/img/whois/takeshi_m.png" :style="`transform: translate(${posX2}px,${posY2}px) scale(1.05)`" alt="">
        <img src="~/assets/img/whois/takeshi_f.png" :style="`transform: translate(${posX3}px,${posY3}px) scale(1.05)`" alt="">
    </div>
</template>

<script setup lang="ts">
import {Ref} from 'vue';
import {useScreenSize} from '~/composable/useScreenSize';

const posX1: Ref<number> = useState('posX1', () => 0);
const posY1: Ref<number> = useState('posY1', () => 0);
const posX2: Ref<number> = useState('posX2', () => 0);
const posY2: Ref<number> = useState('posY2', () => 0);
const posX3: Ref<number> = useState('posX3', () => 0);
const posY3: Ref<number> = useState('posY3', () => 0);
const {screenSize} = useScreenSize();

const onMouseMove = (e: MouseEvent) => {
    const {clientX: mouseX , clientY: mouseY} = e;
    const {width, height} = screenSize.value;

    const posX = (mouseX / width) * 2 - 1;
    const posY = (mouseY / height) * 2 - 1;

    posX1.value = posX * 5;
    posY1.value = posY * 5;

    posX2.value = posX * 15;
    posY2.value = posY * 15;

    posX3.value = posX * 25;
    posY3.value = posY * 25;
}

onMounted(() => {
    document.addEventListener('mousemove', onMouseMove);
});
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
</style>
