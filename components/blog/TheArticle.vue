<template>
    <article class="str-article--item">
        <section class="str-article--section">
            <h1>{{title}}</h1>
            <div v-html="text"></div>
        </section>
    </article>
</template>

<script>
    export default {
        name: 'TheArticle',
        props: {
            title: {
                type: String,
                required: true,
            },
            text: {
                type: String,
                required: true,
            }
        }
    };
</script>

<style scoped lang="scss">
    .str-article--item {
        padding: 20px;

        .str-article--section {
            display: block;
        }
    }
</style>
