<template>
    <nav>
        <ul>
            <li><nuxt-link to="/whois/">whois</nuxt-link></li>
            <li><nuxt-link to="/works/">works</nuxt-link></li>
            <li><nuxt-link to="/blog/">blog</nuxt-link></li>
        </ul>
    </nav>
</template>

<script>
    export default {
        name: "Navigation",
    }
</script>

<style lang="scss" scoped>
    nav {
        width: 100%;
        height: 60px;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 2;
        transition: transform 1.0s cubic-bezier(0.15, 0.84, 0.5, 1);
        transform: translateY(60px);

        ul {
            width: 100%;
            display: flex;
            justify-content: center;

            > li {
                font-size: 2.0rem;
                list-style: none;

                &:not(:last-child) {
                    margin-right: 20px;
                }

                a {
                    color: #ffffff;
                }
            }
        }
    }

    .ready {
        nav {
            transform: translateY(0);
        }
    }
</style>
