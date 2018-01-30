<template>
    <section class="container">
        <logo></logo>
        <intro></intro>
    </section>
</template>

<script>
    import Logo from '~/components/index/Logo.vue';
    import Intro from '~/components/index/Intro.vue';

    export default {
        components: {
            Logo,
            Intro
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
