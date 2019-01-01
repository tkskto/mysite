<template>
    <article class="str-article--item">
        <section class="str-article--section">
            <component class="title" :is="tag">{{title}}</component>
            <div v-html="text"></div>
        </section>
    </article>
</template>

<script>
    export default {
        name: 'TheArticle',
        props: {
            level: {
                type: Number,
                required: true,
            },
            title: {
                type: String,
                required: true,
            },
            text: {
                type: String,
                required: true,
            }
        },
        computed: {
            tag() {
                return `h${this.level}`;
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
