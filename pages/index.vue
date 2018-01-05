<template>
    <section class="container">
        <logo></logo>
    </section>
</template>

<script>
    import Logo from '~/components/Logo.vue';

    export default {
        components: {
            Logo,
            mounted: function () {
                console.log('hoge');
            }
        }
    };
</script>

<style lang="scss">
    .container {
        width: 100%;
        height: 100%;
    }
</style>
