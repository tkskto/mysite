<script setup lang="ts">
useHead({
    title: 'Practice | Takeshi Kato',
    meta: [
        { hid: 'description', name: 'description', content: 'This is practice of GLSL and part of portfolio.' }
    ],
});
</script>

<template>
    <div class="str-root">
        <slot/>
    </div>
</template>

<style scoped>
    .str-root {
        background: #ffffff;
    }
</style>
