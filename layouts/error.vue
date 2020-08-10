<template>
    <div class="str-root-error">
        <p>sorry, I can't find the page.</p>
        <nuxt-link to="/">gotoAndStop(home);</nuxt-link>
    </div>
</template>

<script>
    export default {
        layout: 'other',
        components: {
        },
        head() {
            return {
                title: 'Takeshi Kato',
                meta: [
                    { hid: 'description', name: 'description', content: 'This is takeshi kato\'s Web site. I\'m a frontend developer.' }
                ],
            };
        }
    };
</script>

<style lang="scss" scoped>
    .str-root-error {
        width: 100%;
        height: 100%;
        font-size: 1.4rem;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
</style>
