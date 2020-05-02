<template>
    <div class="str-article">
        <blog-name tag="h1" />
        <div class="article--content">
            <the-sidebar/>
            <the-article :level="2" v-if="title && text" :title="title" :text="text" :date="date"/>
        </div>
    </div>
</template>

<script>
    import Loader from '~/assets/ts/blog/Loader.ts';
    import TheArticle from '~/components/blog/TheArticle';
    import TheSidebar from '~/components/blog/TheSidebar';
    import BlogName from '~/components/blog/BlogName';
    import {Methods} from '~/assets/ts/common/Utils.ts';
    import marked from 'marked';
    import {mapGetters, mapActions} from 'vuex';

    // ブログTOP

    export default {
        layout: 'blog',
        head() {
            return {
                htmlAttrs: {lang: 'ja'} ,
                title: `${this.title} | blog | tkskto`,
                meta: [
                    { hid: 'description', name: 'description', content: 'These are logs of tkskto' }
                ],
            };
        },
        components: {
            TheArticle,
            TheSidebar,
            BlogName,
        },
        computed: {
            ...mapGetters({
                currentArticleID: 'Blog/currentArticleID',
                allArticleData: 'Blog/allArticleData',
            }),
        },
        data: function () {
            return {
                title: '',
                text: '',
                date: new Date(),
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
            ...mapActions({
                changeArticleID: 'Blog/changeArticleID',
                setArticles: 'Blog/setArticles',
            }),
            init() {
                // ブログトップに来た時は最新の記事を表示する
                this.changeArticleID(this.allArticleData[0].id);
                const article = Methods.getItemByKey(this.allArticleData, 'id', this.currentArticleID);
                const date = article.date;

                this.title = article.title;
                this.date = new Date(date.slice(0, 4), Number(date.slice(4, 6)) - 1, date.slice(6, 8));

                // .md読み込み
                this.loader.loadArticle(this.title).then(res => {
                    this.text = marked(res);
                }).catch(err => {
                    this.onLoadError(err);
                });
            },
            onLoadError(err) {
                Methods.showError(err);
            }
        }
    };
</script>

<style lang="scss" scoped>
    .str-article {
        .article--content {
            display: flex;

            @media screen and (max-width: 768px) {
                flex-direction: column;
            }
        }
    }
</style>
