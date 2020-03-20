<template>
    <div>
        <canvas id="sauna"></canvas>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import Sauna from '~/assets/ts/playground/Sauna/Index';

    export default {
        data() {
            return {
                canvas: null
            };
        },
        computed: {
            ...mapGetters({
                screenSize: 'Common/screenSize'
            })
        },
        mounted() {
            this.canvas = new Sauna(
                document.getElementById('sauna'),
                this.screenSize.width,
                this.screenSize.height
            );
        }
    }
</script>
