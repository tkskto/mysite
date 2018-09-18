<template>
    <section class="container">
        <logo></logo>
        <intro></intro>
        <navs></navs>
    </section>
</template>

<script>
    import Logo from '~/components/index/Logo.vue';
    import Intro from '~/components/index/Intro.vue';
    import Navs from '~/components/index/nav/Navs.vue';

    export default {
        components: {
            Logo,
            Intro,
            Navs
        }
    };
</script>

<style lang="scss">
    .container {
        position: relative;
        width: 100%;
        height: 100%;
    }
</style>
