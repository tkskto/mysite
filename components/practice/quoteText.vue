<template>
    <cite v-if="quoteText !== ''" class="text-quote"><a id="text-quote" :href="quoteText" target="_blank">{{quoteText}}</a></cite>
</template>

<script setup>
import {useQuoteText} from '~/composable/useQuoteText';

const {quoteText} = useQuoteText();
</script>
