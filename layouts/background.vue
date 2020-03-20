<template>
    <div class="str-root">
        <nuxt/>
        <hazy-background/>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import HazyBackground from '~/components/common/HazyBackground';
    import Vector from '~/assets/ts/common/gl/Vector.ts';

    export default {
        components: {HazyBackground},
        head() {
            return {
                title: 'Takeshi Kato',
                meta: [
                    {
                        hid: 'description',
                        name: 'description',
                        content: 'This is takeshi kato\'s Web site. I\'m a frontend developer.'
                    }
                ],
            };
        },
        component: {
            HazyBackground,
        },
        computed: {
            ...mapGetters({
                screenSize: 'Common/screenSize',
            })
        },
        created: function () {
            this.setRatio(window.devicePixelRatio);
            this.onResize();

            const width = this.screenSize.width;
            const height = this.screenSize.height;

            const aspect = width > height ? height / width : height > width ? width / height : 1;
            this.setCameraPosition(new Vector(0.0, 0.0, aspect));
        },
        mounted: function () {
            window.addEventListener('resize', this.onResize);
        },
        methods: {
            ...mapActions({
                resize: 'Common/resize',
                setRatio: 'Common/setRatio',
                setCameraPosition: 'Practice/setCameraPosition',
            }),
            onResize: function () {
                const width = window.innerWidth;
                const height = window.innerHeight;

                if (this.screenSize.width !== width || this.screenSize.height !== height) {
                    this.resize({width: width, height: height});

                    const aspect = width > height ? height / width : height > width ? width / height : 1;
                    this.setCameraPosition(new Vector(0.0, 0.0, aspect));
                }
            }
        }
    }
</script>
