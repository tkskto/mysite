<script setup lang="ts">
import {useMusicMode} from '~/composables/useMusicMode';

const {musicMode} = useMusicMode();

const onClick = () => {
    // TODO
    // this.setMusicPlayState(!this.musicPlayState);
    // this.setMusicMode(false);
};
</script>

<template>
    <transition name="button">
        <button v-show="musicMode" type="button" @click="onClick">PLAY</button>
    </transition>
</template>

<style scoped>
    button {
        position: absolute;
        z-index: 1;
        left: 2rem;
        right: 0;
        margin: auto;
        bottom: 0;
        border: none;
        padding: 12px;
        transform: translateY(-30px);
        opacity: 1;
        background: transparent;
        color: #ffffff;
        font-size: 2.0rem;
        letter-spacing: 2rem;
        outline: none;
    }

    .button-enter-active,
    .button-leave-active {
        transition: transform 0.3s ease, opacity 0.2s;
    }

    .button-enter, .button-leave-to {
        transform: translateY(0);
        opacity: 0;
    }
</style>
