<script setup lang="ts">
import Profile from '~/components/whois/profile';

useHead({
    title: 'Who I am | Takeshi Kato',
    meta: [
        { hid: 'description', name: 'description', content: 'This is who I am' }
    ],
});
</script>

<template>
    <section class="section">
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
                <li><a href="https://github.com/tkskto/">
                    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="26" viewBox="0 0 27 26" fill="none"><title>Github</title><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M13.211 0.856445C6.01634 0.856445 0.200195 6.60845 0.200195 13.7245C0.200195 19.4127 3.9268 24.2276 9.09659 25.9318C9.74294 26.0599 9.9797 25.6549 9.9797 25.3142C9.9797 25.0159 9.9584 23.9934 9.9584 22.9279C6.33912 23.695 5.58544 21.394 5.58544 21.394C5.00379 19.9026 4.14199 19.5193 4.14199 19.5193C2.9574 18.7311 4.22827 18.7311 4.22827 18.7311C5.54229 18.8163 6.23179 20.0519 6.23179 20.0519C7.39481 22.0118 9.2689 21.458 10.0228 21.1171C10.1304 20.2862 10.4753 19.711 10.8415 19.3915C7.95488 19.0932 4.91777 17.9854 4.91777 13.0426C4.91777 11.6365 5.43443 10.4861 6.2531 9.59139C6.12393 9.27189 5.67146 7.95076 6.38253 6.18254C6.38253 6.18254 7.4811 5.8416 9.95813 7.50341C11.0186 7.22173 12.1123 7.07844 13.211 7.07724C14.3095 7.07724 15.4294 7.22653 16.4635 7.50341C18.9408 5.8416 20.0394 6.18254 20.0394 6.18254C20.7504 7.95076 20.2977 9.27189 20.1685 9.59139C21.0088 10.4861 21.5041 11.6365 21.5041 13.0426C21.5041 17.9854 18.467 19.0717 15.5588 19.3915C16.0329 19.7962 16.4419 20.5631 16.4419 21.7775C16.4419 23.5031 16.4206 24.8881 16.4206 25.314C16.4206 25.6549 16.6577 26.0599 17.3037 25.932C22.4735 24.2274 26.2001 19.4127 26.2001 13.7245C26.2214 6.60845 20.384 0.856445 13.211 0.856445Z" /></svg>
                </a></li>
                <li><a href="https://bsky.app/profile/tkskto.bsky.social">
                    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="26" fill="none" viewBox="0 0 568 501"><title>Bluesky</title><path fill="currentColor" d="M123.121 33.664C188.241 82.553 258.281 181.68 284 234.873c25.719-53.192 95.759-152.32 160.879-201.21C491.866-1.611 568-28.906 568 57.947c0 17.346-9.945 145.713-15.778 166.555-20.275 72.453-94.155 90.933-159.875 79.748C507.222 323.8 536.444 388.56 473.333 453.32c-119.86 122.992-172.272-30.859-185.702-70.281-2.462-7.227-3.614-10.608-3.631-7.733-.017-2.875-1.169.506-3.631 7.733-13.43 39.422-65.842 193.273-185.702 70.281-63.111-64.76-33.89-129.52 80.986-149.071-65.72 11.185-139.6-7.295-159.875-79.748C9.945 203.659 0 75.291 0 57.946 0-28.906 76.135-1.612 123.121 33.664Z" /></svg>
                </a></li>
                <li><a href="https://x.com/tkskto">
                    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="25" viewBox="0 0 27 25" fill="none"><title>Twitter</title><path d="M20.7915 0.860352H24.8397L15.9957 11.0671L26.4 24.9561H18.2535L11.8728 16.5325L4.57194 24.9561H0.521318L9.98092 14.0389L0 0.860352H8.35333L14.1209 8.55988L20.7915 0.860352ZM19.3708 22.5095H21.6139L7.13447 3.17849H4.72735L19.3708 22.5095Z" fill="currentColor" /></svg>
                </a></li>
            </ul>
        </div>
        <Profile class="profile-img"/>
    </section>
</template>

<style scoped>
.section {
    padding: 20px;
    min-height: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    background: rgba(0, 0, 0, 0.4);
    overflow: hidden;

    & .text__text {
        color: #ffffff;
        line-height: 2.0;
        text-shadow: 3px 3px 30px #ba00ff;
    }

    & .text .text__text {
        opacity: 1;
        font-size: 2.4rem;
        transition: translate 0.5s cubic-bezier(.17,.67,.4,.99), opacity 0.7s;
        translate: 0 0;

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

    & .text-min {
        margin-bottom: 30px;

        & .text__text {
            font-size: 1.4rem;
        }
    }

    & ul {
        display: flex;
        align-items: center;
        gap: 20px;

        & > li {
            max-width: 50px;
            max-height: 50px;
            list-style: none;

            & a {
                display: block;
                width: 100%;
                height: 100%;
            }

            & img {
                max-height: 100%;
                vertical-align: middle;
            }
        }
    }

    & .profile-img {
        position: fixed;
        top: 0;
        left: 50%;
        width: 50%;
        height: 100%;
        z-index: -1;
    }
}

@starting-style {
    .section .text .text__text {
        translate: 5% 0;
        opacity: 0;
    }
}
</style>
