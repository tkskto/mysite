<script setup lang="ts">
useHead({
    title: 'Takeshi Kato',
    meta: [
        {
            name: 'description',
            content: "This is takeshi kato's Web site. I'm a frontend developer.",
        },
    ],
});
</script>

<template>
    <div class="str-root">
        <slot/>
    </div>
</template>
