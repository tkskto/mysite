<template>
    <transition name="button">
        <button v-show="isMusicMode" type="button" @click="onClick">PLAY</button>
    </transition>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';
    export default {
        computed: {
            ...mapGetters({
                isMusicMode: 'Practice/isMusicMode',
                musicPlayState: 'Practice/musicPlayState'
            }),
        },
        methods: {
            ...mapActions({
                setMusicPlayState: 'Practice/setMusicPlayState',
                setMusicMode: 'Practice/setMusicMode'
            }),
            onClick() {
                this.setMusicPlayState(!this.musicPlayState);
                this.setMusicMode(false);
            },
        },
    };
</script>

<style scoped>
    button {
        position: absolute;
        z-index: 1;
        left: 0;
        right: 0;
        margin: auto;
        bottom: 0;
        border: 1px solid #333333;
        border-radius: 3px;
        padding: 12px;
        transform: translateY(-30px);
        opacity: 1;
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
