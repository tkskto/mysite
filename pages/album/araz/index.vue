<template>
    <album _name="araz"></album>
</template>

<script>
    import Album from '~/components/album/Album';

    export default {
        name: 'araz',
        head () {
            return {
                title: 'THE心ここにあらズのアルバム',
                meta: [
                    { hid: 'description', name: 'description', content: 'あらズの旅行記' }
                ]
            };
        },
        components: {
            Album
        }
    }
</script>
