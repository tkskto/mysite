<template>
    <ul class="str-category">
        <li v-for="(item, index) in categoryList" :key="index">
            <nuxt-link :to="`/blog/category/${item}/`">{{item}}</nuxt-link>
        </li>
    </ul>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: 'CategoryList',
        computed: {
            ...mapGetters(['allArticleData']),
            categoryList() {
                const arr = [];
                const len = this.allArticleData.length;

                for (let i = 0; i < len; i++) {
                    const item = this.allArticleData[i];

                    if (Array.isArray(item.category)) {
                        for (let j = 0, len2 = item.category.length; j < len2; j++) {
                            const category = item.category[j];
                            if (arr.indexOf(category) === -1) {
                                arr.push(category);
                            }
                        }
                    } else {
                        if (arr.indexOf(item.category) === -1) {
                            arr.push(item.category);
                        }
                    }
                }

                return arr;
            },
        }
    };
</script>

<style scoped lang="scss">
    .str-category {
        > li a {
            color: #333333;
        }
    }
</style>
