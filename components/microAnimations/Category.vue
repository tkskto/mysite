<script setup lang="ts">
import Item from './AnimationItem.vue'
import type Animation from '~/assets/ts/common/datatype/Animation';

// Props を定義
defineProps<{
    categoryName: string,
    items: Animation[],
}>()
</script>

<template>
    <section :id="categoryName" class="category">
        <h3 class="hdg3">{{categoryName}}</h3>
        <div class="animations">
            <Item v-for="(item, index) in items" :id="index + 1" :key="index" :category="categoryName" />
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
