<template>
    <section :id="categoryName" class="category">
        <h3 class="hdg3">{{categoryName}}</h3>
        <div class="animations">
            <micro-animations-animation-item v-for="(item, index) in items" :key="index" :category="categoryName" :id="index + 1" />
        </div>
    </section>
</template>

<script setup>
    defineProps({
        categoryName: {
            type: String,
            required: true,
        },
        items: {
            type: Array,
            required: true,
        },
    });
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
