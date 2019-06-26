<template>
    <div class="str-category">
        <h1 class="blog--name"><span>So What!?</span></h1>
        <div class="category--content">
            <the-sidebar/>
            <div class="str-category--item">
                <section class="str-category--section">
                    <h2 class="title">{{category}}の記事一覧</h2>
                    <article-list :list="categoryData"/>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
    import {AppConfig} from '~/assets/ts/common/Config';
    import {Loader} from '~/assets/ts/blog/Loader';
    import ArticleList from '~/components/blog/ArticleList';
    import TheSidebar from '~/components/blog/TheSidebar';
    import {Methods} from '~/assets/ts/common/Utils';
    import marked from 'marked';
    import {mapGetters, mapActions} from 'vuex';

    // category

    export default {
        layout: 'blog',
        head() {
            return {
                title: `${this.category} | blog | tkskto`,
                meta: [
                    { hid: 'description', name: 'description', content: 'These are logs of tkskto' }
                ],
            };
        },
        components: {
            ArticleList,
            TheSidebar,
        },
        computed: {
            ...mapGetters(['currentArticleID', 'allArticleData']),
        },
        data: function () {
            return {
                category: '',
                categoryData: [],
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
                this.category = this.$route.params.slug;
                const arr = [];
                const len = this.allArticleData.length;

                for (let i = 0; i < len; i++) {
                    const item = this.allArticleData[i];

                    if (Array.isArray(item.category)) {
                        if (item.category.indexOf(this.category) !== -1) {
                            arr.push(item);
                        }
                    } else {
                        if (this.category === item.category) {
                            arr.push(item);
                        }
                    }
                }
                this.categoryData = arr;
            },
            onLoadError(err) {
                Methods.showError(err);
            }
        }
    };
</script>
<style lang="scss">
    .str-category--item {
        padding: 20px;
        order: 1;
        width: 70%;

        .str-category--section {
            display: block;
        }

        @media screen and (max-width: 768px) {
            width: 100%;
            padding: 0;
        }
    }
</style>
