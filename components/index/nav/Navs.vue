<template>

</template>

<script>
    import {mapGetters} from 'vuex';
    import {AppConfig} from "../../../assets/ts/common/Config";

    export default {
        name: "navs",
        components: {},
        props: {},
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters(['sceneName'])
        },
        watch: {
            sceneName() {
                if (this.sceneName === AppConfig.SCENE.SECOND) {
                    this.show();
                }
            }
        },
        beforeCreate: function () {
        },
        created: function () {
        },
        beforeMount: function () {
        },
        mounted: function () {
        },
        beforeDestroy: function () {
        },
        destroyed: function () {
        },
        methods: {
            show() {
                console.log('year');
            }
        },
        renderError: function (err) {
        }
    }
</script>

<style scoped>

</style>
