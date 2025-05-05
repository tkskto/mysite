<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps({
    error: Object as () => NuxtError,
});

useHead({
    title: 'Takeshi Kato',
    meta: [
        { hid: 'description', name: 'description', content: 'This is takeshi kato\'s Web site. I\'m a frontend developer.' }
    ],
});
</script>

<template>
    <div class="root">
        <h1>{{ error.statusCode }}</h1>
        <p>I'm sorry. I can't handle this error 😱</p>
        <p>{{ error.cause }}</p>
        <NuxtLink to="/">gotoAndStop('home');</NuxtLink>
    </div>
</template>

<style scoped>
.root {
    width: 100%;
    height: 100%;
    background: #fffefe;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    row-gap: 40px;
}

p {
    margin-bottom: 8px;
}

* {
    margin: 0;
    padding: 0;
}
</style>
