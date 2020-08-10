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
</style>
