<template>
    <div class="str-article">
        <h1 class="blog-name">So What!?</h1>
        <article-list :list="allArticleData"></article-list>
        <the-article :level="2" v-if="title && text" :title="title" :text="text"></the-article>
    </div>
</template>

<script>
    import {AppConfig} from '~/assets/ts/common/Config';
    import {Loader} from '~/assets/ts/blog/Loader';
    import TheArticle from '~/components/blog/TheArticle';
    import ArticleList from '~/components/blog/ArticleList';
    import {Methods} from '~/assets/ts/common/Utils';
    import marked from 'marked';
    import {mapGetters, mapActions} from 'vuex';

    // ブログTOP

    export default {
        layout: 'blog',
        head() {
            return {
                title: `${this.title} | blog | tkskto`,
                meta: [
                    { hid: 'description', name: 'description', content: 'These are logs of tkskto' }
                ],
            };
        },
        components: {
            TheArticle,
            ArticleList
        },
        computed: {
            ...mapGetters(['currentArticleID', 'allArticleData']),

        },
        data: function () {
            return {
                title: '',
                text: '',
                loader: null,
            }
        },
        created() {
            this.loader = new Loader();

            if (this.allArticleData.length === 0) {
                this.loader.loadJson().then(res => {
                    this.setArticles(res.sort((a, b) => {
                        return new Date(a.date) < new Date(b.date) ? 1 : -1;
                    }));

                    this.init();
                }).catch(err => {
                    this.onLoadError(err);
                });
            } else {
                this.init();
            }
        },
        methods: {
            ...mapActions(['changeArticleID', 'setArticles']),
            init() {
                // ブログトップに来た時は最新の記事を表示する
                this.changeArticleID(this.allArticleData[0].id);
                this.title = Methods.getItemByKey(this.allArticleData, 'id', this.currentArticleID).title;

                // .md読み込み
                this.loader.loadArticle(this.title).then(res => {
                    this.text = marked(res);
                }).catch(err => {
                    this.onLoadError(err);
                });
            },
            onLoadError(err) {
                console.log(err);
            }
        }
    };
</script>

<style lang="scss">
    .str-article {
        .str-section {

        }
    }
</style>
