<template>
    <div class="str-container" :class="{'is-overed': $data._isOvered}">
        <div id="canvasWrap" class="container-canvas">
            <div class="cover" :style="`background: url('/assets/album/${_name}/poster.webp') no-repeat center; background-size: cover;`"></div>
        </div>
        <button class="btn-dot" :class="{'is-show': $data._viewFlg}" @click="backToAlbum">
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
    import gsap from 'gsap';
    import {CustomPerspectiveCamera} from "../assets/ts/Camera/CustomPerspectiveCamera";
    import {CustomPerspectiveSPCamera} from "../assets/ts/Camera/CustomPerspectiveSPCamera";

    export default {
        name: 'album',
        computed: {
            ...mapGetters(['screenSize', 'getCurrentAlbumData'])
        },
        props: {
            _name: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                _canvas: null,
                _wrapper: null,
                _stage: null,
                _renderer: null,
                _mainCamera: null,
                _cameraTarget: {},
                _container: null,
                _geometry: null,
                _material: null,
                _rayCaster: null,
                _intersects: [],
                _mouseX: 0,
                _mouseY: 0,
                _isOvered: false,
                _viewFlg: false,
                _textureLoader: null,
                _selectedVideoID: 0,
                _videos: {},
                _timer: 0,
                _column: 3,
                _albumNum: 0,
                _loadedAlbumNum: 0,
                _currentTween: null,
                _isTouch: false,
                _controls: null
            };
        },
        created () {
            const ratio = window.devicePixelRatio;

            this._isTouch = 'ontouchstart' in window;
            this._stage = new THREE.Scene();
            this._renderer = new THREE.WebGLRenderer({
                antialias: true,
                stencil: false,
                alpha: true
            });

            this._renderer.setPixelRatio(ratio);
            this._renderer.setClearColor(new THREE.Color(0x000000), 0.3);

            this._container = new THREE.Group();
            this._stage.add(this._container);

            this._geometry = new THREE.SphereGeometry(100, 50, 50);
            this._geometry.scale(-1, 1, 1);

            this._material = new THREE.MeshBasicMaterial();
            this._textureLoader = new THREE.TextureLoader();
            this._rayCaster = new THREE.Raycaster();
            this._videos = {};
        },

        mounted () {
            this._column = this.screenSize.width / 200;

            this._renderer.setSize(
                this.screenSize.width, this.screenSize.height
            );

            this._canvas = this._renderer.domElement;
            this._wrapper = document.getElementById('canvasWrap');
            this._wrapper.appendChild(this._canvas);

            if (this._isTouch) {
                this._mainCamera = new CustomPerspectiveSPCamera(this._canvas, 60, this.screenSize.width / this.screenSize.height, 1, 2000);
            } else {
                this._mainCamera = new CustomPerspectiveCamera(this._canvas, 60, this.screenSize.width / this.screenSize.height, 1, 2000);
            }

            this._stage.add(this._mainCamera);
            this._mainCamera.position.set(0, 0, 1000);

            this._loadedAlbumNum = 0;
            this._albumNum = this.getCurrentAlbumData.images + this.getCurrentAlbumData.movies;

            for (let i = 0, len = this.getCurrentAlbumData.images; i < len; i++) {
                const _name = i < 10 ? `0${i + 1}` : `${i + 1}`;
                this.addPicture(i, _name);
            }

            for (let i = 0, len = this.getCurrentAlbumData.movies; i < len; i++) {
                const _name = i < 10 ? `0${i + 1}` : `${i + 1}`;
                this.addMovie(i, _name);
            }
        },
        methods: {
            setDetectEvent() {
                document.addEventListener('mousemove', this.onMouseMove);
                document.addEventListener('click', this.viewDetail);
            },
            removeDetectEvent() {
                document.removeEventListener('mousemove', this.onMouseMove);
                document.removeEventListener('click', this.viewDetail);
            },
            setCameraEvent() {
                this._mainCamera.setEvent();
            },
            removeCameraEvent() {
                this._mainCamera.removeEvent();
            },
            addPicture(_index, _src) {
                const geometry = this._geometry.clone();
                const material = this._material.clone();

                this._textureLoader.load(
                    `/assets/album/${this._name}/${_src}.jpg`,
                    (_texture) => {
                        material.map = _texture;
                        const mesh = new THREE.Mesh(geometry, material);
                        mesh.scale.set(0.1, 0.1, 0.1);
                        mesh.position.set(_index * 300 - 900, 150, 0);
                        mesh.userData.type = 'picture';
                        this._container.add(mesh);

                        this.onLoadComplete();
                    }
                );
            },
            addMovie(_index, _src) {
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
                mesh.position.set(_index * 300 - 900, -150, 0);
                mesh.userData.type = 'video';
                mesh.userData.id = _src;
                this._container.add(mesh);

                video.addEventListener('loadeddata', () => {
                    this.onLoadComplete();
                }, {
                    once: true,
                    passive: true,
                    capture: false
                });

                video.load();
            },
            onLoadComplete() {
                this._loadedAlbumNum++;

                if (this._loadedAlbumNum === this._albumNum) {
                    this.play();

                    let finished = 0;

                    for (let i = 0, len = this._container.children.length; i < len; i++ ) {
                        new gsap.TweenMax(this._container.children[i].scale, 1.0, {
                            x: 1.0,
                            y: 1.0,
                            z: 1.0,
                            delay: i * 0.2,
                            ease: gsap.Elastic.easeOut,
                            onComplete: () => {
                                finished++;
                                if (finished === this._albumNum) {
                                    this.setDetectEvent();
                                }
                            }
                        });
                    }
                }
            },
            onMouseMove(event) {
                let x = event.clientX;
                let y = event.clientY;

                if (this._isTouch) {
                    const touch = event.touches[0];
                    x = touch.pageX;
                    y = touch.pageY;
                }

                const mouseX = (x / this.screenSize.width) * 2 - 1;
                const mouseY = -(y / this.screenSize.height) * 2 + 1;
                this._rayCaster.setFromCamera({x: mouseX, y: mouseY}, this._mainCamera.camera);
                this._intersects = this._rayCaster.intersectObjects(this._container.children);

                if (this._intersects) {
                    this.$data._isOvered = this._intersects.length > 0;
                }
            },
            viewDetail(event) {

                if (this._isTouch) {
                    this.onMouseMove(event);
                }

                if (this._intersects && this._intersects.length > 0) {
                    this.removeDetectEvent();

                    const mesh = this._intersects[0].object;

                    this._currentTween = new gsap.TweenMax(this._mainCamera.position, 1.0, {
                        x: mesh.position.x,
                        y: mesh.position.y,
                        z: mesh.position.z,
                        ease: gsap.Power3.easeOut,
                        onComplete: () => {
                            this.$data._viewFlg = true;

                            if (mesh.userData.type === 'video') {
                                this._selectedVideoID = mesh.userData.id;
                                this._videos[this._selectedVideoID].play();
                            } else {
                                this._selectedVideoID = -1;
                            }

                            for (let i = 0; i < this._albumNum; i++) {
                                const child = this._container.children[i];
                                if (child !== mesh) {
                                    child.visible = false;
                                }
                            }

                            this.setCameraEvent();
                        }
                    });
                }
            },
            backToAlbum() {
                if (this._selectedVideoID !== -1) {
                    this._videos[this._selectedVideoID].pause();
                }

                for (let i = 0; i < this._albumNum; i++) {
                    this._container.children[i].visible = true;
                }

                this._mainCamera.reset();
                this._currentTween = new gsap.TweenMax(this._mainCamera.position, 1.0, {
                    x: 0,
                    y: 0,
                    z: 1000,
                    ease: gsap.Power3.easeIn,
                    onComplete: () => {
                        this.$data._viewFlg = false;
                        this.removeCameraEvent();
                        this.setDetectEvent();
                    }
                });
            },
            play() {
                this.update();
            },
            pause() {
                if (this._timer) {
                    cancelAnimationFrame(this._timer);
                    this._timer = -1;
                }
            },
            update() {
                this._timer = requestAnimationFrame(this.update);
                this._mainCamera.update();
                this._renderer.render(this._stage, this._mainCamera.camera);
            }
        },
        watch: {
            screenSize: function () {
                if (this._renderer) {
                    const width = this.$el.clientWidth;
                    const height = this.$el.clientHeight;
                    this._renderer.setSize(width, height);
                    this._mainCamera.setRatio(width / height);
                }
            }
        },
        beforeDestroy: function () {
            this.removeDetectEvent();
            this.removeCameraEvent();

            if (this._mainCamera) {
                this._mainCamera.dispose();
            }

            if (this._renderer) {
                this._renderer.dispose();
            }
        }
    };
</script>

<style scoped lang="scss">
    .str-container {
        position: relative;
        width: 100%;
        height: 100%;
        background-size: contain;

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

            .cover {
                position: absolute;
                display: block;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                margin: auto;
                z-index: -1;
                background-size: contain;
                opacity: 0.3;
            }
        }

        .btn-dot {
            position: absolute;
            top: 8px;
            left: -52px;
            border: none;
            box-shadow: none;
            background: rgba(0, 0, 0, 0.5);
            width: 44px;
            height: 30px;
            cursor: pointer;
            text-align: center;
            padding: 0;
            border-radius: 2px;
            transition: left 0.5s ease;

            .svg-icon--dot {
                vertical-align: top;
            }

            &.is-show {
                left: 8px;
            }
        }

        &.is-overed {
            cursor: pointer;
        }
    }
</style>
