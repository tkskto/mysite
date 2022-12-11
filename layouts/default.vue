<template>
    <div class="str-root">
        <slot />
    </div>
</template>

<script setup>
    import {useScreenSize} from '~/composable/useScreenSize';

    useHead({
        title: 'Takeshi Kato',
        meta: [
            { hid: 'description', name: 'description', content: 'This is takeshi kato\'s Web site. I\'m a frontend developer.' }
        ],
    });

    const {screenSize, updateScreenSize} = useScreenSize();

    const onResize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        if (screenSize.width !== width || screenSize.height !== height) {
            updateScreenSize({width: width, height: height});
        }
    }

    window.addEventListener('resize', onResize);
    onResize();
</script>

<style>
    @import '~/assets/css/common.css';
</style>
