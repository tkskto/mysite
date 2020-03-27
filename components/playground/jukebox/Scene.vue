<template>
    <div class="wrapper">
        <canvas id="jukebox"></canvas>
        <transition name="fadeout">
            <div v-if="loading" class="loading">
                <img src="/assets/img/playground/record.png">
                <p>Now Loading<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span></p>
            </div>
        </transition>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import JukeBox from '~/assets/ts/playground/Jukebox/Index';
    const SpotifyWebApi = require('spotify-web-api-node');

    export default {
        data() {
            return {
                canvas: null,
                spotify: null,
                loading: true,
            };
        },
        computed: {
            ...mapGetters({
                screenSize: 'Common/screenSize'
            })
        },
        async mounted() {
            this.canvas = new JukeBox(
                document.getElementById('jukebox'),
                this.screenSize.width,
                this.screenSize.height
            );

            await this.canvas.setup();

            // const response = await fetch('https://us-central1-mysite-217311.cloudfunctions.net/Spotify2').then(res => res.json());
            // const response = await fetch('https://us-central1-mysite-217311.cloudfunctions.net/Spotify').then(res => res.json());

            // this.spotify = new SpotifyWebApi();
            // this.spotify.setAccessToken(response.access_token);

            // const album = await this.spotify.getArtistAlbums('4jXfFzeP66Zy67HM2mvIIF');
            // const items = album.body.items;
            // const tracks = [];
            //
            // for (let i = 0, len = items.length; i < len; i++) {
            //     const item = items[i];
            //     await this.spotify.getAlbumTracks(item.id).then(res => {
            //         tracks.push({
            //             img: item.images[0].url,
            //             tracks: res.body.items
            //         });
            //     })
            // }
            //
            // console.log(tracks);


            const data = [
                {
                    img: '/assets/img/playground/img1.jpg',
                    audio: '/assets/audio/playground/audio1.mp3',
                    name: 'Good Friday Blues'
                },
                {
                    img: '/assets/img/playground/img2.jpg',
                    audio: '/assets/audio/playground/audio2.mp3',
                    name: 'I Remember You'
                },
                {
                    img: '/assets/img/playground/img3.jpg',
                    audio: '/assets/audio/playground/audio3.mp3',
                    name: 'Bill Not Phil'
                },
                {
                    img: '/assets/img/playground/img4.jpg',
                    audio: '/assets/audio/playground/audio4.mp3',
                    name: 'Willow Weep for'
                },
                {
                    img: '/assets/img/playground/img5.jpg',
                    audio: '/assets/audio/playground/audio5.mp3',
                    name: 'When I Have You'
                },
                {
                    img: '/assets/img/playground/img6.jpg',
                    audio: '/assets/audio/playground/audio6.mp3',
                    name: 'I Was Doing All Right'
                },
                {
                    img: '/assets/img/playground/img7.jpg',
                    audio: '/assets/audio/playground/audio7.mp3',
                    name: 'You Go to My Head'
                },
                {
                    img: '/assets/img/playground/img8.jpg',
                    audio: '/assets/audio/playground/audio8.mp3',
                    name: 'When You Wish Upon'
                },
                {
                    img: '/assets/img/playground/img9.jpg',
                    audio: '/assets/audio/playground/audio9.mp3',
                    name: 'You and the Night'
                },
                {
                    img: '/assets/img/playground/img10.jpg',
                    audio: '/assets/audio/playground/audio10.mp3',
                    name: 'Wrap Your Troubles'
                },
                {
                    img: '/assets/img/playground/img11.jpg',
                    audio: '/assets/audio/playground/audio11.mp3',
                    name: "I'll Never Smile"
                },
                {
                    img: '/assets/img/playground/img12.jpg',
                    audio: '/assets/audio/playground/audio12.mp3',
                    name: 'Interplay'
                },
                {
                    img: '/assets/img/playground/img13.jpg',
                    audio: '/assets/audio/playground/audio13.mp3',
                    name: 'Embraceable You'
                },
                {
                    img: '/assets/img/playground/img14.jpg',
                    audio: '/assets/audio/playground/audio14.mp3',
                    name: 'Five'
                },
                {
                    img: '/assets/img/playground/img15.jpg',
                    audio: '/assets/audio/playground/audio15.mp3',
                    name: 'Nardis'
                },
                {
                    img: '/assets/img/playground/img16.jpg',
                    audio: '/assets/audio/playground/audio16.mp3',
                    name: 'Emily'
                },
                {
                    img: '/assets/img/playground/img17.jpg',
                    audio: '/assets/audio/playground/audio17.mp3',
                    name: 'Alfie'
                },
                {
                    img: '/assets/img/playground/img18.jpg',
                    audio: '/assets/audio/playground/audio18.mp3',
                    name: 'Turn out the'
                },
                {
                    img: '/assets/img/playground/img19.jpg',
                    audio: '/assets/audio/playground/audio19.mp3',
                    name: 'Who Can I Turn To?'
                },
                {
                    img: '/assets/img/playground/img20.jpg',
                    audio: '/assets/audio/playground/audio20.mp3',
                    name: "You’re Gonna Hear"
                },
                {
                    img: '/assets/img/playground/img1.jpg',
                    audio: '/assets/audio/playground/audio1.mp3',
                    name: 'Good Friday Blues'
                },
                {
                    img: '/assets/img/playground/img2.jpg',
                    audio: '/assets/audio/playground/audio2.mp3',
                    name: 'I Remember You'
                },
                {
                    img: '/assets/img/playground/img3.jpg',
                    audio: '/assets/audio/playground/audio3.mp3',
                    name: 'Bill Not Phil'
                },
                {
                    img: '/assets/img/playground/img4.jpg',
                    audio: '/assets/audio/playground/audio4.mp3',
                    name: 'Willow Weep for'
                },
                {
                    img: '/assets/img/playground/img5.jpg',
                    audio: '/assets/audio/playground/audio5.mp3',
                    name: 'When I Have You'
                },
                {
                    img: '/assets/img/playground/img6.jpg',
                    audio: '/assets/audio/playground/audio6.mp3',
                    name: 'I Was Doing All Right'
                },
                {
                    img: '/assets/img/playground/img7.jpg',
                    audio: '/assets/audio/playground/audio7.mp3',
                    name: 'You Go to My Head'
                },
                {
                    img: '/assets/img/playground/img8.jpg',
                    audio: '/assets/audio/playground/audio8.mp3',
                    name: 'When You Wish Upon'
                },
                {
                    img: '/assets/img/playground/img9.jpg',
                    audio: '/assets/audio/playground/audio9.mp3',
                    name: 'You and the Night'
                },
                {
                    img: '/assets/img/playground/img10.jpg',
                    audio: '/assets/audio/playground/audio10.mp3',
                    name: 'Wrap Your Troubles'
                },
                {
                    img: '/assets/img/playground/img11.jpg',
                    audio: '/assets/audio/playground/audio11.mp3',
                    name: "I'll Never Smile"
                },
                {
                    img: '/assets/img/playground/img12.jpg',
                    audio: '/assets/audio/playground/audio12.mp3',
                    name: 'Interplay'
                },
                {
                    img: '/assets/img/playground/img13.jpg',
                    audio: '/assets/audio/playground/audio13.mp3',
                    name: 'Embraceable You'
                },
                {
                    img: '/assets/img/playground/img14.jpg',
                    audio: '/assets/audio/playground/audio14.mp3',
                    name: 'Five'
                },
                {
                    img: '/assets/img/playground/img15.jpg',
                    audio: '/assets/audio/playground/audio15.mp3',
                    name: 'Nardis'
                },
                {
                    img: '/assets/img/playground/img16.jpg',
                    audio: '/assets/audio/playground/audio16.mp3',
                    name: 'Emily'
                },
                {
                    img: '/assets/img/playground/img17.jpg',
                    audio: '/assets/audio/playground/audio17.mp3',
                    name: 'Alfie'
                },
                {
                    img: '/assets/img/playground/img18.jpg',
                    audio: '/assets/audio/playground/audio18.mp3',
                    name: 'Turn out the'
                },
                {
                    img: '/assets/img/playground/img19.jpg',
                    audio: '/assets/audio/playground/audio19.mp3',
                    name: 'Who Can I Turn To?'
                },
                {
                    img: '/assets/img/playground/img20.jpg',
                    audio: '/assets/audio/playground/audio20.mp3',
                    name: "You’re Gonna Hear"
                },
            ];

            await this.canvas.setMusicData(data);

            setTimeout(() => {
                this.loading = false;
                this.canvas.start();
            }, 3000);
        }
    }
</script>

<style scoped>
    .wrapper {
        position: relative;
        pointer-events: none;
        overflow: hidden;
    }

    canvas {
        vertical-align: top;
        pointer-events: auto;
    }

    .loading {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        background: #000;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row;
    }

    .loading img {
        width: 100px;
        height: 100px;
        animation: rotate 3s linear infinite;
    }


    .loading p {
        text-align: center;
        color: #fff;
        font-size: 1.4rem;
        margin-left: 20px;
    }

    .loading p .dot {
        animation: disappear 1s infinite;
    }

    .loading p .dot:nth-child(2) {
        animation-delay: 0.1s;
    }

    .loading p .dot:nth-child(3) {
        animation-delay: 0.2s;
    }

    @keyframes disappear {
        0% {
            opacity: 1;
        }
        1% {
            opacity: 0;
        }
    }

    @keyframes rotate {
        0% {
            transform: rotateZ(0);
        }
        100% {
            transform: rotateZ(360deg);
        }
    }

    .fadeout-leave-active {
        transition: opacity 1s linear;
    }

    .fadeout-leave-to {
        opacity: 0;
    }
</style>
