<template>
    <slot />
</template>

<script setup>
useHead({
    title: 'Takeshi Kato',
    meta: [
        { hid: 'description', name: 'description', content: 'This is takeshi kato\'s Web site. I\'m a frontend developer.' }
    ],
});
</script>

<style>
    @import '~/assets/css/common.css';
</style>
