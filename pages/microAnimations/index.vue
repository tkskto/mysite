<script setup lang="ts">
import Loading from '~/components/microAnimations/Loading.vue';
import TheHeader from '~/components/microAnimations/Header.vue';
import Category from '~/components/microAnimations/Category.vue';
import type Animation from 'assets/ts/common/datatype/Animation';

definePageMeta({
    layout: 'micro-animations',
});

const isLoading = ref<boolean>(true);
const allSketchData = ref<Record<string, Animation[]>>({});
const onLoaded = (allSketch: Record<string, Animation[]>) => {
    isLoading.value = false;
    allSketchData.value = allSketch;
};
</script>

<template>
    <section class="section">
        <div class="wrapper" :class="{'is-show': !isLoading}">
            <TheHeader />
            <div id="all" class="sketch">
                <Category v-for="(value, key) in allSketchData" :key="key" :category-name="key" :items="value" />
            </div>
        </div>
        <Loading @loaded="onLoaded" />
    </section>
</template>

<style scoped>
    body {
        position: relative;
        line-height: 1.6;
        color: #333;
        background: #ffe;
        overflow-y: scroll;
    }

    button {
        background: none;
        border: none;
        box-shadow: none;
        cursor: pointer;
    }

    .wrapper {
        transition: opacity 1.0s ease;
        background: #ffffee;
        opacity: 0;
        transition: opacity 0.5s linear;
    }

    .wrapper.is-show {
        opacity: 1;
    }

    #all {
        padding: 20px 30px;
    }
</style>
