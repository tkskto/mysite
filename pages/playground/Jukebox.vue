<template>
    <div class="root">
        <scene/>
    </div>
</template>
<script>
    import Scene from '~/components/playground/jukebox/Scene';

    export default {
        name: 'Jukebox',
        components: {
            Scene,
        },
    }
</script>
<style scoped>
    .root {
        position: relative;
        height: 100vh;
        overflow: hidden;
    }
    .root::after {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        background: radial-gradient(circle at center, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 1.0) 100%);
        pointer-events: none;
    }
</style>
