<script setup lang="ts">
const quote = ''; 
</script>

<template>
    <cite v-if="quote !== ''" class="text-quote"><a id="text-quote" :href="quote" target="_blank">{{quote}}</a></cite>
</template>
