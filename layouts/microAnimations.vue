<template>
    <UApp>
        <div class="str-root">
            <slot/>
        </div>
    </UApp>
</template>

<script>
    export default {
        head() {
            return {
                title: 'Takeshi Kato',
                meta: [
                    { hid: 'description', name: 'description', content: 'This is takeshi kato\'s Web site. I\'m a frontend developer.' }
                ],
            };
        },
    };
</script>

<style scoped>
    .str-root {
        background: #ffffee;
    }
</style>
