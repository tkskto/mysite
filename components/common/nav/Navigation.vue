<template>
    <nav @mousemove="onMouseMove">
        <ul>
            <li><nuxt-link to="/"></nuxt-link></li>
            <li><nuxt-link to="/works"></nuxt-link></li>
            <li><nuxt-link to="/microAnimations"></nuxt-link></li>
            <li><nuxt-link to="/practice"></nuxt-link></li>
            <li><nuxt-link to="/blog"></nuxt-link></li>
        </ul>
    </nav>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: "Navigation",
        components: {},
        props: {},
        data: function () {
            return {
                mouseX: 0,
                mouseY: 0
            }
        },
        computed: {
            ...mapGetters(['screenSize']),
        },
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
            onMouseMove(e) {
                this.mouseX = e.clientX;
                this.mouseY = e.clientY;
            }
        },
        renderError: function (err) {
        }
    }
</script>

<style lang="scss" scoped>
    nav {
        width: 100vw;
        height: 100vh;
        position: fixed;
        z-index: 1;
    }
</style>
