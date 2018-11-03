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
    import Navs from '~/components/index/nav/Navigation.vue';

    export default {
        components: {
            Logo,
            Intro,
            Navs
        },
        head() {
            return {
                title: 'Takeshi Kato',
                meta: [
                    { hid: 'description', name: 'description', content: 'This is takeshi kato\'s Web site. I\'m a frontend developer.' }
                ],
            };
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
