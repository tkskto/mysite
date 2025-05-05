<script>
import TheDialog from './Dialog.vue';
</script>

<template>
    <div class="wrapper">
        <header class="header">
            <h1 class="hdg1">Micro Animations</h1>
            
            <TheDialog />
        </header>
    </div><!-- /.wrapper -->
</template>

<style scoped>
    .header {
        padding: 20px;
        background: #ffe;
        display: flex;
        justify-content: space-between;

        & .hdg1 {
            color: #444;
            display: inline-block;
        }

        & .link-info {
            width: 44px;
            padding: 10px;
        }
    }
</style>
