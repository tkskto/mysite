<template>
    <cite v-if="quote !== ''" class="text-quote"><a id="text-quote" :href="quote" target="_blank">{{quote}}</a></cite>
</template>

<script>
    import {mapGetters} from 'vuex';
    export default {
        name: "quote",
        computed: {
            ...mapGetters({
                quote: 'Practice/quote',
            })
        },
    }
</script>
