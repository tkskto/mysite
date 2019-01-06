<template>
    <nav>
        <ul>
            <li v-for="item in list" :key="item.id">
                <nuxt-link :to="`/blog/${item.title}`">{{item.title}}</nuxt-link>
            </li>
        </ul>
    </nav>
</template>

<script>
    export default {
        name: "ArticleList",
        props: {
            list: {
                type: Array,
                required: true,
            },
        },
    }
</script>

<style lang="scss" scoped>
    nav {
        ul {
            padding: 0;

            li {
                list-style: none;
            }
        }
    }
</style>
