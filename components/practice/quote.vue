<script setup lang="ts">
import {useQuoteText} from '~/composables/useQuoteText';

const {quoteText} = useQuoteText();
</script>

<template>
    <cite v-if="quoteText !== ''" class="text-quote"><a id="text-quote" :href="quoteText" target="_blank">{{quoteText}}</a></cite>
</template>

<style scoped>
.text-quote {
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
    text-align: center;
}
</style>
