<script setup lang="ts">
import Logo from '~/components/index/Logo.vue'
import Intro from '~/components/index/Intro.vue'
import Navs from '~/components/common/nav/Navigation.vue'

const introRef = ref<InstanceType<typeof Intro> | null>(null)

useHead({
    title: 'Takeshi Kato',
    meta: [
        {
            name: 'description',
            content: "This is takeshi kato's Web site. I'm a frontend developer.",
        }
    ]
});

onBeforeRouteLeave(async () => {
    if (introRef.value?.beforeLeave) {
        await introRef.value.beforeLeave();
    }
});
</script>

<template>
    <section class="section">
        <logo />
        <intro ref="intro" />
        <p class="black-lives-matter"><strong>Black Lives Matter.</strong></p>
        <navs />
    </section>
</template>

<style>
    .section {
        position: relative;
        width: 100%;
        min-height: 100%;
        overflow: hidden;

        & .black-lives-matter {
            position: absolute;
            left: 0;
            right: 0;
            margin: auto;
            font-size: 3.0rem;
            bottom: 11%;
            text-align: center;
            color: #fff;
            text-shadow: 3px 3px 30px #ba00ff;
        }
    }
</style>
