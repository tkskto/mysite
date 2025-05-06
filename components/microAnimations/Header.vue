<script setup lang="ts">
import IntroductionDialog from '~/components/microAnimations/IntroductionDialog.vue';
</script>

<template>
    <header class="header">
        <h1 class="hdg1">Micro Animations</h1>
        
        <introduction-dialog />
    </header>
</template>

<style scoped>
    .header {
        padding: 20px;
        background: #ffe;
        display: flex;
        justify-content: space-between;

        & .hdg1 {
            color: #444;
            display: inline-block;
        }

        & .link-info {
            width: 44px;
            padding: 10px;
        }
    }
</style>
