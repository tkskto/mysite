<template>
    <section class="container">
        <div class="text">
            <p>I'm frontend engineer.</p>
            <p>I like sauna and beautiful graphics.</p>
            <p>I'm interested in something new.</p>
            <p>I'm happy if you're interested in my work.</p>
            <p>Feel free to contact to me.</p>
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
        mounted() {
            setTimeout(() => {
                this.$el.classList.add('is-show');
            }, 100);
        }
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

        .text p {
            color: #ffffff;
            font-size: 4.0rem;
            line-height: 2.0;
            transition: transform 0.5s cubic-bezier(.17,.67,.4,.99);
            transform: translateX(-60%);

            &:nth-child(1) {
                transition-delay: 0.12s;
            }

            &:nth-child(2) {
                transition-delay: 0.24s;
            }

            &:nth-child(3) {
                transition-delay: 0.36s;
            }

            &:nth-child(4) {
                transition-delay: 0.48s;
            }

            &:nth-child(5) {
                transition-delay: 0.60s;
            }

            &:nth-child(6) {
                transition-delay: 0.72s;
            }
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
            left: 50%;
            right: 0;
            margin: auto;
            background: url(~assets/img/whois/takeshi.jpg) no-repeat center 100%;
            background-size: cover;
            z-index: -1;
        }

        @media screen and (max-width: 414px) {
            p {
                font-size: 2.4rem;
            }
        }

        &.is-show {
            .text p {
                transform: translateX(0);
            }
        }
    }
</style>
