<script setup lang="ts">
const vertexShaderString = ref('');
const fragmentShaderString = ref('');

const VS = computed(() => {
    return vertexShaderString.replace(/\n/g, '<br>').replace(/\s{20}/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
});

const FS = computed(() => {
    return fragmentShaderString.replace(/\n/g, '<br>').replace(/\s{20}/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
});
</script>


<template>
    <div class="container-text-shader">
        <div class="text-VS">
            <h2>Vertex Shader</h2>
            <p class="shader-text shader-vs" v-html="VS"></p>
        </div>
        <div class="text-FS">
            <h2>Fragment Shader</h2>
            <p class="shader-text shader-fs" v-html="FS"></p>
        </div>
        <div class="bg"></div>
    </div>
</template>

<style scoped>
    .container-text-shader {
        position: absolute;
        display: none;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        z-index: 2;
        padding: 20px;
        justify-content: space-between;
    }

    .container-text-shader h2 {
        margin-bottom: 20px;
    }

    .container-text-shader .text-VS,
    .container-text-shader .text-FS {
        margin: 0;
        width: 48%;
        height: 100%;
        color: #eef;
        font-size: 1.4rem;
        overflow-y: auto;
        opacity: 0;
        transform: translateY(25px);
        transition: opacity 0.3s linear, transform 0.3s ease-out;
    }

    .container-text-shader .text-FS {
        padding-left: 2%;
    }

    .container-text-shader .bg {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.75);
        opacity: 0;
        transition: opacity 0.3s linear;
        z-index: -1;
    }

    .container-text-shader::after {
        content: "";
        position: absolute;
        width: 1px;
        height: 95%;
        left: 0;
        right: 0;
        margin: auto;
        opacity: 0;
        background: #ffffff;
        transition: opacity 0.3s linear;
    }

    .pre-show .container-text-shader {
        display: flex;
    }

    .show-shader .container-text-shader .bg {
        opacity: 1;
    }

    .show-shader .container-text-shader::after {
        opacity: 1;
    }

    .show-shader .container-text-shader .text-VS,
    .show-shader .container-text-shader .text-FS {
        opacity: 1;
        transform: translateY(0);
    }
</style>
