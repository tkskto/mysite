<template>
    <article class="str-article--item">
        <section class="str-article--section"></section>
    </article>
</template>

<script>
    export default {
        name: 'TheArticle',
        props: {
            articleID: {
                type: String,
                required: true
            }
        },
        created: function () {

        }
    };
</script>

<style scoped lang="scss">
    .str-article--item {
        .str-article--section {
            display: block;
        }
    }
</style>
