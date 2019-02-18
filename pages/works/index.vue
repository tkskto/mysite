<template>
    <section class="container">
        <h1>works</h1>
        <p>These are my experiences. It means what I can do and what I interested in.</p>

        <section class="container">
            <h2><nuxt-link to="/practice/">Practice</nuxt-link></h2>
            <p>This is practice and sketch of GLSL. I have lot to learn.</p>
        </section>
        <section class="container">
            <h2><nuxt-link to="/microAnimations/">Micro Animations</nuxt-link></h2>
            <p>This is gallery of micro animation. It's still only so much rubbish yet.</p>
        </section>
    </section>
</template>

<script>
    import {AppConfig} from '~/assets/ts/common/Config';

    export default {
        layout: 'default',
        name: 'works',
        head() {
            return {
                title: 'Takeshi Kato',
                meta: [
                    { hid: 'description', name: 'description', content: 'This is what I can do.' }
                ],
            };
        },
    };
</script>

<style lang="scss" scoped>
    .container {
        padding: 20px;
        height: 100%;
        background: #000000;

        h1 {
            font-size: 4.0rem;
            color: #ffffff;
            margin-bottom: 20px;
        }

        p {
            font-size: 2.8rem;
            color: #ffffff;
            margin-bottom: 20px;
        }

        .container {
            height: auto;
            padding: 20px 40px;

            h2 {
                font-size: 2.4rem;
                margin-bottom: 16px;

                a {
                    color: #ffffff;
                }
            }

            p {
                font-size: 1.6rem;
            }
        }
    }
</style>
