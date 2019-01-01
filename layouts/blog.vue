<template>
    <div class="str-root--blog">
        <nuxt/>
    </div>
</template>
<style lang="scss">
    @import '~/assets/css/common.css';

    html {
        color: #333333;
        line-height: 1.44;
    }

    body {
        background: #ffffee;
    }

    .str-root--blog {
        width: 100%;
        height: 100%;
        word-break: break-all;

        .title {
            font-size: 4rem;
            border-bottom: 1px solid #444444;
            margin-bottom: 24px;
        }

        h2 {
            font-size: 2.2rem;
            margin: 24px 0 8px;
        }

        h3 {
            font-size: 1.8rem;
            margin-bottom: 8px;
        }

        h4 {
            font-size: 1.6rem;
            margin-bottom: 8px;
        }

        p {
            font-size: 1.6rem;
            font-weight: normal;
            margin-bottom: 8px;
        }

        .img {
            max-width: 700px;
            margin: 1.4em auto;

            img {
                max-width: 100%;
                vertical-align: top;
            }
        }

        .cols {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;

            .col-item {
                width: 50%;
            }
        }

        ul, ol {
            margin: 0 0 12px 20px;
            font-size: 1.6rem;
            font-weight: normal;

            ul, ol {
                margin-bottom: 0;
            }
        }

        blockquote {
            margin: 12px 0;
            padding: 8px;

            p {
                border-left: 4px solid #e0e0e0;
                color: #555555;
                padding: 16px;
            }
        }

        code {
            background: #f0f0f0;
            color: #666666;
            padding:3px;
        }

        pre {
            margin: 8px 0;
            white-space: normal;

            > code {
                font-size: 1.2rem;
                white-space: pre;
                display: block;
                overflow: auto;
                padding: 10px;
                border-radius: 4px;
                background: #444444;
                color: #f0f0f0;
            }
        }
    }
</style>
