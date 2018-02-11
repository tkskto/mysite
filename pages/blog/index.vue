<template>
    <div class="str-article">
        <the-article :articleID="articleID"></the-article>
    </div>
</template>

<script>
    import TheArticle from '~/components/blog/TheArticle';

    export default {
        layout: 'blog',
        head: function() {
            return {
                'title': 'blog'
            };
        },
        components: {
            TheArticle
        },
        data: function () {
            return {
                articleID: 'test'
            }
        },
        methods: {
        },
        mounted: function () {
        }
    };
</script>

<style lang="scss">
    .str-article {
        .str-section {

        }
    }
</style>
