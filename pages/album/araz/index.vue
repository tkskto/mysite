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
                    { hid: 'description', name: 'description', content: 'thetaで撮った写真と動画のページです。' }
                ]
            };
        },
        components: {
            Album
        }
    }
</script>
