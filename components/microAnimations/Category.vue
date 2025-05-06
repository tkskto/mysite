<script setup lang="ts">
import Item from './AnimationItem.vue'

// Props を定義
defineProps<{
    categoryName: string,
    items: any[],
}>()
</script>

<template>
    <section :id="categoryName" class="category">
        <h3 class="hdg3">{{categoryName}}</h3>
        <div class="animations">
            <Item v-for="(item, index) in items" :key="index" :category="categoryName" :id="index + 1"></Item>
        </div>
    </section>
</template>

<style scoped>
.category {
    margin-bottom: 80px;
}

.hdg3 {
    margin-bottom: 15px;
    font-size: 2.0rem;
    color: #444;
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
</style>
