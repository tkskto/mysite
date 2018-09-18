<template>
    <div class="wrapper">
        <header class="header">
            <h1 class="hdg1">Micro Animations</h1>
            <a id="link-info" class="link-info" href="#intro" @click="showDialog"><img src="~/assets/img/ico-info.png" alt="イントロダクションを見る"></a>
        </header>
    </div><!-- /.wrapper -->
</template>

<script>
    import {mapActions} from 'vuex';
    export default {
        name: "Header",
        methods: {
            ...mapActions(['changeDialogState', 'changeScene']),
            showDialog() {
                this.changeDialogState(true);
                this.changeScene('dialog');
            },
        },
    }
</script>

<style scoped lang="scss">
    .header {
        padding: 20px;
        background: #ffe;
        display: flex;
        justify-content: space-between;

        .hdg1 {
            color: #444;
            display: inline-block;
        }

        .link-info {
            width: 44px;
            padding: 10px;
        }
    }
</style>
