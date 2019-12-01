<template>
    <div class="str-root--blog">
        <nuxt/>
    </div>
</template>
<style lang="scss">
    html {
        color: #222222;
        line-height: 1.44;
    }

    body {
        background: #ffffff;
    }

    .str-root--blog {
        width: 100%;
        min-height: 100%;
        word-break: break-all;
        padding: 2rem;
        background: #ffffff;

        .blog--name {
            font-size: 3.2rem;
            text-align: center;
            font-weight: bold;
            margin-bottom: 60px;

            > span {
                padding: 10px 40px;
                border-bottom: 1px solid #999;
            }
        }

        .title {
            font-size: 4rem;
            border-bottom: 1px solid #444444;
            margin-top: 0;
            margin-bottom: 24px;

            @media screen and (max-width: 768px) {
                font-size: 2.0rem;
            }
        }

        h2 {
            font-size: 2.2rem;
            margin: 32px 0 12px;

            @media screen and (max-width: 768px) {
                font-size: 1.8rem;
            }
        }

        h3 {
            font-size: 1.8rem;
            margin-bottom: 8px;

            @media screen and (max-width: 768px) {
                font-size: 1.6rem;
            }
        }

        h4 {
            font-size: 1.6rem;
            margin-bottom: 8px;
        }

        p {
            font-size: 1.5rem;
            font-weight: normal;
            margin-bottom: 2rem;
            line-height: 1.7;
        }

        hr {
            margin-bottom: 16px;
        }

        .img {
            max-width: 700px;
            margin: 2.8em auto;

            img {
                max-width: 100%;
                vertical-align: top;
            }

            .caption {
                display: block;
                text-align: center;
                margin-top: 10px;
            }
        }

        .video {
            max-width: 700px;
            margin: 2.8em auto;

            video {
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

            > li p {
                margin: 0;
            }

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
                margin-bottom: 0;
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

        .txt-supplement {
            font-size: 1.3rem;
            color: #999999;
        }

        .str-article {
            .article--content {
                display: flex;

                @media screen and (max-width: 768px) {
                    flex-direction: column;
                }
            }
        }

        .str-category {
            .category--content {
                display: flex;

                @media screen and (max-width: 768px) {
                    flex-direction: column;
                }
            }
        }
    }
</style>
