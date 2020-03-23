<template>
    <div class="str-category">
        <blog-name tag="h1" />
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
    import Loader from '~/assets/ts/blog/Loader.ts';
    import ArticleList from '~/components/blog/ArticleList';
    import TheSidebar from '~/components/blog/TheSidebar';
    import BlogName from '~/components/blog/BlogName';
    import {Methods} from '~/assets/ts/common/Utils.ts';
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
            ...mapActions({
                changeArticleID: 'Blog/changeArticleID',
                setArticles: 'Blog/setArticles',
            }),
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
<style lang="scss" scoped>
    .str-category {
        .category--content {
            display: flex;

            @media screen and (max-width: 768px) {
                flex-direction: column;
            }
        }
    }

    .str-category--item {
        padding: 20px;
        order: 1;
        width: 70%;

        .title {
            font-size: 4rem;
            border-bottom: 1px solid #444444;
            margin-top: 0;
            margin-bottom: 24px;

            @media screen and (max-width: 768px) {
                font-size: 2.0rem;
            }
        }

        .str-category--section {
            display: block;
        }

        @media screen and (max-width: 768px) {
            width: 100%;
            padding: 0;
        }
    }
</style>
