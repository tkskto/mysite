<template>
    <div class="str-root">
        <nuxt/>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';

    export default {
        head() {
            return {
                title: 'Takeshi Kato',
                meta: [
                    { hid: 'description', name: 'description', content: 'This is takeshi kato\'s Web site. I\'m a frontend developer.' }
                ],
            };
        },
        computed: {
            ...mapGetters({
                screenSize: 'Common/screenSize',
            })
        },
        created: function () {
            this.setRatio(window.devicePixelRatio);
            this.onResize();
        },
        mounted: function () {
            window.addEventListener('resize', this.onResize);
        },
        methods: {
            ...mapActions({
                resize: 'Common/resize',
                setRatio: 'Common/setRatio',
            }),
            onResize: function () {
                const width = window.innerWidth;
                const height = window.innerHeight;

                if (this.screenSize.width !== width || this.screenSize.height !== height) {
                    this.resize({width: width, height: height});
                }
            }
        }
    }
</script>

<style>
    @import '~/assets/css/common.css';
</style>
