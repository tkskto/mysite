<template>
    <div class="str-article">
        <the-article v-if="title && text" :title="title" :text="text"></the-article>
    </div>
</template>

<script>
    import {AppConfig} from '~/assets/ts/common/Config';
    import {Loader} from '~/assets/ts/blog/Loader';
    import TheArticle from '~/components/blog/TheArticle';
    import {Utils} from '~/assets/ts/common/Utils';
    import marked from 'marked';
    import {mapGetters, mapActions} from 'vuex';

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
            TheArticle
        },
        computed: {
            ...mapGetters(['currentArticleID', 'currentCategory']),

        },
        data: function () {
            return {
                articles: [],
                title: '',
                text: '',
                loader: null,
            }
        },
        created() {
            this.loader = new Loader();
            this.loader.loadJson().then(res => {
                this.articles = res.sort((a, b) => {
                    return new Date(a.date) < new Date(b.date) ? 1 : -1;
                });

                this.init();
            }).catch(err => {
                this.onLoadError(err);
            });
        },
        methods: {
            ...mapActions(['changeArticleID']),
            init() {
                if(!this.currentArticleID) {
                    this.changeArticleID(this.articles[0].id);
                }

                this.title = Utils.getItemByKey(this.articles, 'id', this.currentArticleID).title;

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
