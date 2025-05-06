<script setup lang="ts">
const isShow = ref(false);
const buttonLabel = computed(() => {
    return isShow.value ? 'PLAY' : 'GLSL';
});
const onClick = () => {
    const body = document.body;

    if (isShow.value) {
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
    
    isShow.value = !isShow.value;
};
</script>

<template>
    <button class="lyt-btn-viewChange" @click="onClick">{{buttonLabel}}</button>
</template>

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
