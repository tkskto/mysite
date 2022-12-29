<template>
    <div class="wrapper">
        <header class="header">
            <h1 class="hdg1">Micro Animations</h1>
            <a id="link-info" class="link-info" href="#intro" @click="showDialog"><img src="~/assets/img/ico-info.png" alt="イントロダクションを見る"></a>
        </header>
    </div><!-- /.wrapper -->
</template>

<script setup>
import {useDialogState} from '~/composable/useDialogState';
import {useSceneName} from '~/composable/useSceneName';

const {updateDialogState} = useDialogState();
const {updateScene} = useSceneName();

const showDialog = () => {
    updateDialogState(true);
    updateScene('microAnimationDialog');
};
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
