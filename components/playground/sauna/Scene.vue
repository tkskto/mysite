<template>
    <div class="wrapper">
        <canvas id="sauna"></canvas>
        <ul class="nav">
            <li><a href="#step1"></a></li>
            <li><a href="#step2"></a></li>
            <li><a href="#step3"></a></li>
        </ul>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import Sauna from '~/assets/ts/playground/Sauna/Index.ts';

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

<style scoped>
    .wrapper {
        position: relative;
    }

    canvas {
        vertical-align: top;
    }

    .nav {
        position: absolute;
        right: 20px;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 1px;
        height: 300px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        list-style-type: none;
    }

    .nav::before {
        position: absolute;
        content: "";
        display: block;
        width: 5px;
        height: calc(100% + 20px);
        border-radius: 20px;
        background: rgba(223,199,164,1);
    }

    .nav::after {
        position: absolute;
        content: "";
        display: block;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: #990000;
        bottom: -30px;
    }

    .nav > li a::before {
        content: "";
        display: block;
        background: transparent;
        border-radius: 50%;
        width: 10px;
        height: 10px;
    }

    .nav > li:nth-child(1) a::before {
        border: 1px solid #fe8400;
    }

    .nav > li:nth-child(2) a::before {
        border: 1px solid #ffffff;
    }

    .nav > li:nth-child(3) a::before {
        border: 1px solid #ffffff;
    }
</style>
