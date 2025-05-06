<template>
    <NuxtLayout>
        <noscript>
            <p>I'm sorry but this web site needs using JavaScript.</p>
            <p>If you don't want to use JavaScript</p>
            <p>please see my <a href="https://github.com/tkskto/">GitHub account</a>.</p>
        </noscript>
        <NuxtPage />
    </NuxtLayout>
</template>

<style>
@media (scripting: none) {
    body {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    p {
        font-size: 20px;
        text-align: center;
        color: #ececec;
    }
}
</style>
