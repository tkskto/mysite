<template>
    <header class="str-header">
        <h1 class="hdg1">Micro Animations</h1>
        <a id="header-link--info" class="link-info" href="#"><img src="~/assets/images/microAnimation/ico-info.png" alt="イントロダクションを見る"></a>
    </header>
</template>

<script>
    // TODO: コンポーネントが2回呼ばれる
    export default {
        name: "header",
        components: {},
        props: {},
        data: function () {
            return {
            }
        },
        computed: {},
        watch: {},
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
        },
        renderError: function (err) {
        }
    }
</script>

<style scoped lang="scss">
    .str-header {
        padding: 20px;
        background: #ffe;
        display: flex;
        justify-content: space-between;

        .hdg1 {
            color: #444;
            display: inline-block;
        }

        .header-link--info {
            width: 44px;
            padding: 10px;
        }
    }
</style>
