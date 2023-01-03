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
        <section class="container talks">
            <h2>Talks</h2>
            <p>2019.11.30<a href="https://jsconf.jp/2019/talk/takeshi-kato">Understanding Streams API</a></p>
        </section>
        <section class="container">
            <h2>Tools</h2>
            <p>I made these tools as an OSS for my work more easily.</p>
            <h3>vue-component-analyzer</h3>
            <p>vue-component-analyzer can Analyze dependency tree for Vue.js SFC (Single File Component). You can see <a href="https://tkskto.github.io/vue-component-analyzer/dist/">GitHub Pages</a> for a demo.</p>
            <div class="links"><a href="https://github.com/tkskto/vue-component-analyzer">GitHub</a> / <a href="https://www.npmjs.com/package/@tkskto/vue-component-analyzer">npm</a></div>

            <h3>git-log-nodejs</h3>
            <p>git-log-nodejs is a tool to get git logs.</p>
            <div class="links"><a href="https://github.com/tkskto/git-log-nodejs">GitHub</a> / <a href="https://www.npmjs.com/package/git-log-nodejs">npm</a></div>

            <h3>export-vscode-snippets</h3>
            <p>export-vscode-snippets is a tool for generating snippet files for VSCode.</p>
            <div class="links"><a href="https://github.com/tkskto/export-vscode-snippets">GitHub</a> / <a href="https://www.npmjs.com/package/export-vscode-snippets">npm</a></div>
        </section>
        <section class="container">
            <h2>Playground</h2>
            <p>They are just idea. meaningless.</p>
            <ul>
                <li><a class="img" href="https://tkskto.github.io/videoBumpMapping/"><img src="~/assets/img/works/img_01.jpg" alt=""></a>
                    Bump Mapping with video texture. [<a href="https://qiita.com/tkskto/items/8ec45cf4bfa9dae90944">Article</a>]
                </li>
                <li><a class="img" href="https://tkskto.github.io/WebGLMoire/"><img src="~/assets/img/works/img_02.jpg" alt=""></a>
                    WebGL Moire [<a href="https://qiita.com/tkskto/items/729819f945fde7cdb89e">Article</a>]
                </li>
            </ul>
        </section>
    </section>
</template>

<script setup lang="ts">
useHead({
    title: 'Works | Takeshi Kato',
    meta: [
        {
            name: 'description',
            content: 'This is what I can do.',
        },
    ],
});
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
        }

        .container {
            height: auto;
            padding: 20px 40px;

            a {
                color: #ffffff;
            }

            h2 {
                font-size: 2.4rem;
                margin-bottom: 16px;
            }

            h3 {
                font-size: 1.6rem;
                margin-top: 20px;
                margin-bottom: 8px;
            }

            p {
                font-size: 1.6rem;
            }

            .links {
                font-size: 1.4rem;
                margin-top: 12px;
                margin-bottom: 32px;
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

        &.talks {
            a {
                padding: 0 10px;
                color: #ffffff;
            }
        }
    }
</style>
