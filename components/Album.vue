<template>
    <div class="str-container">
        <div class="container-canvas" ref="canvasWrap"></div>
        <button class="btn-dot" @click="backToAlbum">
            <svg class="svg-icon--dot" viewBox="0 0 20 9" xmlns="http://www.w3.org/2000/svg" title="一覧に戻る">
                <circle r="1.5" fill="#fff" cx="5" cy="5"></circle>
                <circle r="1.5" fill="#fff" cx="10" cy="5"></circle>
                <circle r="1.5" fill="#fff" cx="15" cy="5"></circle>
            </svg>
        </button>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import * as THREE from 'three';
    import TweenMax from 'gsap';

    export default {
        name: 'album',
        props: {
            _name: {
                type: String,
                required: true
            }
        },
        data: function () {
            return {
                _canvas: null,
                _stage: null,
                _renderer: null,
                _mainCamera: null,
                _container: null,
                _geometry: null,
                _material: null,
                _rayCaster: null,
                _intersects: [],
                _mouseX: 0,
                _mouseY: 0,
                _viewFlg: false,
                _videos: {}
            };
        },
        computed: {
            ...mapGetters(['screenSize'])
        },
        created: function () {
            this._stage = new THREE.Scene();

            this._mainCamera = new THREE.PerspectiveCamera( 60, this.screenSize.width / this.screenSize.height, 1, 10000 );
            this._mainCamera.position.set( 0, 0, 1000 );

            let ratio = window.devicePixelRatio;

            this._renderer = new THREE.WebGLRenderer({
                antialias: true,
                stencil: false,
                alpha: true
            });

            this._renderer.setPixelRatio(ratio);

            this._container = new THREE.Group();
            this._stage.add(this._container);

            this._geometry = new THREE.SphereGeometry(300, 50, 50);
            this._geometry.scale(-1, 1, 1);

            this._material = new THREE.MeshBasicMaterial();

            this._rayCaster = new THREE.Raycaster();
            this._videos = {};
        },
        mounted: function () {
            this._renderer.setSize(
                this.screenSize.width, this.screenSize.height
            );

            this._renderer.setClearColor(0x000000, 1);
            this._renderer.shadowMap.enabled = true;
            this._renderer.autoClear = true;
            this._renderer.clear();
            this._canvas = this._renderer.domElement;

            this.$refs.canvasWrap.appendChild(this._canvas);

            this.addMovie('01');

            this.setEvent();

            this.play();
        },
        methods: {
            setEvent: function () {
                document.addEventListener('mousemove', this.onMouseMove);
                document.addEventListener('click', this.viewDetail);
            },
            removeEvent: function () {
                document.removeEventListener('mousemove', this.onMouseMove);
                document.removeEventListener('click', this.viewDetail);
            },
            addPicture: function (_src) {
                const geometry = this._geometry.clone();
                const material = this._material.clone();
            },
            addMovie: function (_src) {
                const video = document.createElement('video');
                this._videos[_src] = video;
                video.preload = 'none';
                video.loop = true;
                video.src = `/assets/album/${this._name}/${_src}.mp4`;

                const geometry = this._geometry.clone();
                const material = this._material.clone();

                const texture = new THREE.VideoTexture(video);
                texture.minFilter = THREE.LinearFilter;
                texture.magFilter = THREE.LinearFilter;
                texture.format = THREE.RGBFormat;
                material.map = texture;

                const mesh = new THREE.Mesh(geometry, material);
                mesh.scale.set(0.1, 0.1, 0.1);
                mesh.userData.type = 'video';
                mesh.userData.id = _src;
                this._container.add(mesh);

                video.addEventListener('loadeddata', () => {
                    TweenMax.to(mesh.scale, 1.0, {
                        x: 1.0,
                        y: 1.0,
                        z: 1.0,
                        ease: TweenMax.Elastic.easeOut
                    });
                }, {
                    once: true,
                    passive: true,
                    capture: false
                });

                video.load();
            },
            onMouseMove: function () {
                this._mouseX = ( event.clientX / this.screenSize.width ) * 2 - 1;
                this._mouseY = - ( event.clientY / this.screenSize.height ) * 2 + 1;
                this._rayCaster.setFromCamera( {x: this._mouseX, y: this._mouseY}, this._mainCamera );
                this._intersects = this._rayCaster.intersectObjects( this._container.children );
            },
            viewDetail: function () {
                if (this._intersects.length > 0) {
                    this.removeEvent();

                    const mesh = this._container.children[0];

                    TweenMax.to(this._mainCamera.position, 1.0, {
                        z: mesh.position.z,
                        ease: TweenMax.Linear.ease,
                        onComplete: () => {
                            if (mesh.userData.type === 'video') {
                                this._videos[mesh.userData.id].play();
                            }
                        }
                    });
                }
            },
            backToAlbum: function () {},
            play: function () {
                this.update();
            },
            pause: function () {
                if (this._timer) {
                    cancelAnimationFrame(this._timer);
                    this._timer = null;
                }
            },
            update: function () {
                this._timer = requestAnimationFrame(this.update);
                this._renderer.render(this._stage, this._mainCamera);
            }
        }
    }
</script>

<style scoped lang="scss">
    .str-container {
        position: relative;
        width: 100%;
        height: 100%;

        .container-canvas {
            position: absolute;
            top: 0;
            left: 0;
            z-index: -1;
            width: 100%;
            height: 100%;

            canvas {
                width: 100%;
                height: 100%;
            }
        }

        .btn-dot {
            position: absolute;
            top: 8px;
            left: 8px;
            border: none;
            box-shadow: none;
            background: rgba(0, 0, 0, 0.5);
            width: 44px;
            height: 30px;
            cursor: pointer;
            text-align: center;
            padding: 0;
            border-radius: 2px;

            .svg-icon--dot {
                vertical-align: top;
            }
        }
    }
</style>
