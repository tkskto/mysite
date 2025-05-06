<script setup lang="ts">
useHead({
    title: 'Micro Animations',
    meta: [
        { name: 'description', content: 'Gallery of Micro Animations.' }
    ]
});
</script>

<template>
    <UApp>
        <div class="str-root">
            <slot/>
        </div>
    </UApp>
</template>

<style scoped>
    .str-root {
        background: #ffffee;
    }
</style>
