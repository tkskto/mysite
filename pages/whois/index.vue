<template>
    <section class="container">
        <div>
            <p>I'm frontend engineer.</p>
            <p>I like sauna and beautiful graphics.</p>
            <p>I'm interested in something new.</p>
            <p>I'm happy if you're interested in my work.</p>
            <p>Thank you!!</p>
        </div>
        <div>
            <ul>
                <li><a href="https://twitter.com/tkskto/"><img src="~/assets/img/whois/twitter.png" alt="私のTwitterアカウント"></a></li>
                <li><a href="https://www.facebook.com/tkskto/"><img src="~/assets/img/whois/facebook.png" alt="私のFacebookアカウント"></a></li>
                <li><a href="https://github.com/tkskto/"><img src="~/assets/img/whois/github.png" alt="私のGithubアカウント"></a></li>
                <li><a href="https://qiita.com/tkskto/"><img src="~/assets/img/whois/qiita.png" alt="私のQiitaアカウント"></a></li>
                <li><a href="https://www.pinterest.jp/tkskto/"><img src="~/assets/img/whois/pinterest.png" alt="私のPinterestアカウント"></a></li>
                <li><a href="https://www.linkedin.com/in/takeshi-kato-06a941111/"><img src="~/assets/img/whois/linkedin.png" alt="私のLinkedinアカウント"></a></li>
            </ul>
        </div>
        <div class="overlay"></div>
    </section>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import {AppConfig} from '~/assets/ts/common/Config';

    export default {
        layout: 'default',
        computed: {},
        head() {
            return {
                title: 'Takeshi Kato',
                meta: [
                    { hid: 'description', name: 'description', content: 'This is takeshi kato\'s Web site. I\'m a frontend developer.' }
                ],
            };
        },
    };
</script>

<style lang="scss" scoped>
    .container {
        padding: 20px;
        min-height: 100%;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        background: rgba(0, 0, 0, 0.6);

        p {
            color: #ffffff;
            font-size: 4.0rem;
            line-height: 2.0;
        }

        ul {
            display: flex;
            justify-content: flex-start;
            align-items: center;

            > li {
                max-width: 50px;
                max-height: 50px;
                font-size: 2.0rem;
                list-style: none;

                &:not(:last-child) {
                    margin-right: 2.0rem;
                }

                a {
                    display: block;
                    width: 100%;
                    height: 100%;
                }

                img {
                    max-height: 100%;
                    vertical-align: middle;
                }
            }
        }

        .overlay {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            background: url(~/assets/img/whois/takeshi.jpg) no-repeat center 100%;
            background-size: cover;
            z-index: -1;
        }

        @media screen and (max-width: 414px) {
            p {
                font-size: 2.4rem;
            }
        }
    }
</style>
