<template>
    <section :id="categoryName" class="category">
        <h3 class="hdg3">{{categoryName}}</h3>
        <div class="animations">
            <animation-item v-for="(item, index) in items" :key="index" :category="categoryName" :id="index + 1"></animation-item>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'category',
        props: {
            categoryName: {
                type: String,
                required: true,
            },
            items: {
                type: Array,
                required: true,
            },
        },
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
            display: -webkit-flex;
            display: flex;
            -webkit-justify-content: flex-start;
            justify-content: flex-start;
            -webkit-align-items: center;
            align-items: center;
            -webkit-flex-wrap: wrap;
            flex-wrap: wrap;
        }
    }
</style>
