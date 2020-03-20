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
        <section class="container">
            <h2>Playground</h2>
            <p>They are just idea. meaningless.</p>
            <ul>
                <li><a class="img" href="https://tkskto.github.io/videoBumpMapping/"><img src="~/assets/img/works/img_01.png" alt=""></a>
                    Bump Mapping with video texture. [<a href="https://qiita.com/tkskto/items/8ec45cf4bfa9dae90944">Article</a>]
                </li>
                <li><a class="img" href="https://tkskto.github.io/WebGLMoire/"><img src="~/assets/img/works/img_02.png" alt=""></a>
                    WebGL Moire [<a href="https://qiita.com/tkskto/items/729819f945fde7cdb89e">Article</a>]
                </li>
            </ul>
        </section>
    </section>
</template>

<script>
    export default {
        layout: 'background',
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
        color: #ffffff;

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

            ul {
                display: flex;

                > li {
                    list-style-type: none;
                    flex: 1 0 0%;
                    max-width: 300px;
                    font-size: 1.3rem;

                    &:not(:last-child) {
                        margin-right: 20px;
                    }

                    a {
                        color: #ffffff;
                    }
                }
            }

            .img {
                margin-bottom: 10px;
                display: block;
            }
        }

        a > img {
            max-width: 100%;
        }

        @media screen and (max-width: 768px) {
            .container {
                padding: 20px;
            }
        }
    }
</style>
