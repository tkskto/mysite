<template>
    <div class="str-animation--item">
        <iframe :src="`/assets/microAnimation/data/${category}/${id + 1}/index.html`"></iframe>
    </div>
</template>

<script>
    export default {
        name: "Animation",
        components: {},
        props: {
            id: {
                type: Number,
                required: true
            },
            category: {
                type: String,
                required: true
            }
        },
        data: function () {
            return {};
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
    .str-animation--item {
        position: relative;
        width: calc((100% - 80px) / 5);
        margin-right: 20px;
        margin-bottom: 40px;
        transform: scale3d(1,1,1);
        transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);

        &:nth-child(5n) {
            margin-right: 0;
        }

        &::after {
            display: block;
            content: "";
            width: 100%;
            padding-top: 100%;
        }

        iframe {
            position: absolute;
            max-width: 100%;
            max-height: 100%;
            width: 100%;
            height: 100%;
            border: none;
            left:0;
            right:0;
            top:0;
            bottom:0;
            margin:auto;
            background: transparent;
            overflow: hidden;
        }
    }
</style>
