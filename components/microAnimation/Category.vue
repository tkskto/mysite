<template>
    <section :id="categoryName" class="category">
        <h3 class="hdg3">
            {{categoryName}}
        </h3>
        <div class="animations">
            <animation v-for="(item, index) in itemArr" :id="index" :category="categoryName" :key="index"></animation>
        </div>
    </section>
</template>

<script>
    import Animation from '~/components/microAnimation/Animation';

    export default {
        name: "Category",
        components: {
            Animation
        },
        props: {
            categoryName: {
                type: String,
                required: true
            },
            itemArr: {
                type: Array,
                required: true
            }
        },
        data: function () {
            return {};
        },
        computed: {},
        watch: {},
        beforeCreate: function () {
        },
        created: function () {
        },
        beforeMount: function () {
        },
        mounted: function () {
        },
        beforeDestroy: function () {
        },
        destroyed: function () {
        },
        methods: {
        },
        renderError: function (err) {
        }
    }
</script>

<style scoped lang="scss">
    .category {
        margin-bottom: 80px;

        .hdg3 {
            margin-bottom: 15px;
            font-size: 2.0rem;
        }

        .animations {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-wrap: wrap;
        }
    }

</style>
