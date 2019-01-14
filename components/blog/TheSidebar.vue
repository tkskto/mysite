<template>
    <div class="str-side">
        <section class="str-article--section">
            <category-list/>
            <article-list :list="allArticleData"/>
        </section>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import CategoryList from '~/components/blog/CategoryList';
    import ArticleList from '~/components/blog/ArticleList';

    // サイドナビ

    export default {
        name: 'TheSidebar',
        components: {
            ArticleList,
            CategoryList,
        },
        computed: {
            ...mapGetters(['allArticleData']),
        }
    };
</script>

<style scoped lang="scss">
    .str-side {
        width: 30%;
        order: 2;

        @media screen and (max-width: 768px) {
            width: 100%;
        }
    }
</style>
