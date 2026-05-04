<script setup>
const { data: posts } = await useAsyncData('resume', () => queryCollection('resume').all())
</script>

<template>
    <section class="section">
        <ul>
            <li v-for="post in posts" :key="post.id">
                <ContentRenderer v-if="post" :value="post" />
            </li>
        </ul>
    </section>
</template>

<style scoped>
.section {
    padding: 20px;
    color: #ffffff;
    
    h1, h2, p, li, a {
        text-shadow: 3px 3px 30px #ba00ff;
        color: #ffffff;
    }

    & h1 {
        font-size: 4.0rem;
        margin-bottom: 20px;
    }

    & :deep(table) {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;
    }

    & :deep(th),
    & :deep(td) {
        padding: 8px 12px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        text-align: left;
    }

    & p {
        font-size: 2.8rem;
        margin-bottom: 20px;
    }

    & .section {
        height: auto;
        padding: 20px 40px;

        & h2 {
            font-size: 2.4rem;
            margin-bottom: 16px;
        }

        & p {
            font-size: 1.6rem;
        }

        & ul {
            display: flex;

            & > li {
                list-style-type: none;
                flex: 1 0 0;
                max-width: 300px;
                font-size: 1.3rem;

                &:not(:last-child) {
                    margin-right: 20px;
                }
            }
        }

        & .img {
            margin-bottom: 10px;
            display: block;
        }
    }

    & a > img {
        max-width: 100%;
    }

    & :deep(h3),
    & :deep(h4) {
        margin-bottom: 16px;
    }

    &.talks a {
        padding: 0 10px;
        color: #ffffff;
    }
}

@media screen and (max-width: 768px) {
    .section .section {
        padding: 20px;
    }
}

</style>
