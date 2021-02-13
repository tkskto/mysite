<template>
    <section class="container" :class="{'is-show': isShow}">
        <div class="text">
            <p class="text__text">I'm frontend engineer.</p>
            <p class="text__text">I like sauna and beautiful graphics.</p>
            <p class="text__text">I'm interested in something new.</p>
            <p class="text__text">I'm happy if you're interested in my work.</p>
            <p class="text__text">Feel free to contact to me. Thank you!!</p>
        </div>
        <div>
            <div class="text-min">
                <p class="text__text">This website use Google Analytics to investigate usage.<br>Your specific information such as IP address is automatically will be sent to Google, Inc.<br>For this reason, we may also add or read cookies. </p>
            </div>
            <ul>
                <li><a href="https://twitter.com/tkskto/"><img src="~/assets/img/whois/twitter.png" alt="私のTwitterアカウント"></a></li>
                <li><a href="https://www.facebook.com/tkskto/"><img src="~/assets/img/whois/facebook.png" alt="私のFacebookアカウント"></a></li>
                <li><a href="https://github.com/tkskto/"><img src="~/assets/img/whois/github.png" alt="私のGithubアカウント"></a></li>
                <li><a href="https://qiita.com/tkskto/"><img src="~/assets/img/whois/qiita.png" alt="私のQiitaアカウント"></a></li>
                <li><a href="https://www.pinterest.jp/tkskto/"><img src="~/assets/img/whois/pinterest.png" alt="私のPinterestアカウント"></a></li>
                <li><a href="https://www.linkedin.com/in/takeshi-kato-06a941111/"><img src="~/assets/img/whois/linkedin.png" alt="私のLinkedinアカウント"></a></li>
            </ul>
        </div>
        <profile class="profile-img" :class="{'is-show': isShow}"/>
    </section>
</template>

<script>
import Profile from '~/components/whois/profile';

export default {
    layout: 'default',
    data() {
        return {
            isShow: false,
        };
    },
    components: {
        Profile
    },
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
            this.isShow = true;
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
    background: rgba(0, 0, 0, 0.4);
    overflow: hidden;

    .text__text {
        color: #ffffff;
        line-height: 2.0;
        text-shadow: 5px 5px 5px rgba(255, 255, 255, 0.2), 10px 10px 5px rgba(255, 255, 255, 0.1);
        text-align: left;
    }

    .text .text__text {
        opacity: 0;
        font-size: 4.0rem;
        transition: transform 0.5s cubic-bezier(.17,.67,.4,.99), opacity 0.7s;
        transform: translateX(25%);

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
    }

    .text-min {
        margin-bottom: 30px;

        .text__text {
            font-size: 1.6rem;
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

    .profile-img {
        position: fixed;
        top: 0;
        left: 50%;
        width: 50%;
        height: 100%;
        z-index: -1;
    }

    @media screen and (max-width: 768px) {
        .text .text__text {
            font-size: 3.2rem;
        }
    }

    @media screen and (max-width: 414px) {
        .text .text__text {
            font-size: 2.2rem;
        }
    }

    &.is-show {
        .text .text__text {
            transform: translateX(0);
            opacity: 1;
        }
    }
}
</style>
