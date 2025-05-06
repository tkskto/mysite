<script setup lang="ts">
defineProps<{
    category: string,
    id: number,
}>()
</script>

<template>
    <div class="animation-item" :data-category="category" :data-id="id">
        <iframe :src="`/assets/microAnimations/data/${category}/${id}/index.html`" loading="lazy"></iframe>
    </div>
</template>

<style scoped>
    .animation-item {
        position: relative;
        width: calc((100% - 80px) / 5);
        margin-right: 20px;
        margin-bottom: 40px;
        transform: scale3d(1,1,1);
        transition: -webkit-transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);

        &:nth-child(5n) {
            margin-right: 0;
        }

        &::after {
            display: block;
            content: "";
            width: 100%;
            padding-top: 100%;
        }

        & iframe {
            position: absolute;
            max-width: 100%;
            max-height: 100%;
            width: 100%;
            height: 100%;
            border: none;
            left:0;
            right:0;
            top:0;
            bottom:0;
            margin:auto;
            background: transparent;
            overflow: hidden;
        }
    }
</style>
