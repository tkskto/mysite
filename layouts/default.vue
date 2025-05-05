<script setup lang="ts">
import { useScreenSize } from '~/composables/useScreenSize'

const screenSize = useScreenSize();

useHead({
    title: 'Takeshi Kato',
    meta: [
        {
            name: 'description',
            content: "This is takeshi kato's Web site. I'm a frontend developer.",
        },
    ],
});

// mounted / unmounted 相当
onMounted(() => {
    window.addEventListener('resize', screenSize.updateSize);
});

onUnmounted(() => {
    window.removeEventListener('resize', screenSize.updateSize);
});
</script>

<template>
    <div class="str-root">
        <slot/>
    </div>
</template>
