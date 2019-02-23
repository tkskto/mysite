<template>
    <article class="str-article--item">
        <section class="str-article--section">
            <component class="title" :is="tag">{{title}}</component>
            <p class="date">{{dateText}}</p>
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
            },
            date: {
                type: Date,
                required: true,
            },
        },
        computed: {
            tag() {
                return `h${this.level}`;
            },
            dateText() {
                return `${this.date.getFullYear()}年${this.date.getMonth() + 1}月${this.date.getDate()}日`;
            },
        }
    };
</script>

<style scoped lang="scss">
    .str-article--item {
        padding: 20px;
        order: 1;
        width: 70%;

        .str-article--section {
            display: block;

            .date {
                text-align: right;
                color: #333333;
                margin-bottom: 60px;
            }
        }

        @media screen and (max-width: 768px) {
            width: 100%;
            padding: 0;
        }
    }
</style>
