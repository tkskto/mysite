<template>
    <div class="str-container" :class="{'is-overed': $data._isOvered}">
        <div id="canvasWrap" class="container-canvas">
            <div class="cover" :style="`background: url('/assets/album/${_name}/poster.webp') no-repeat center; background-size: cover;`"></div>
            <canvas id="myCanvas"></canvas>
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
    import TweenMax, {Elastic, Linear, Power3} from 'gsap';
    import {CustomPerspectiveCamera} from "~/assets/ts/album/Camera/CustomPerspectiveCamera";
    import {CustomPerspectiveSPCamera} from "~/assets/ts/album/Camera/CustomPerspectiveSPCamera";

    export default {
        name: 'album',
        computed: {
            ...mapGetters({
                screenSize: 'Common/screenSize',
                getCurrentAlbumData: 'Album/getCurrentAlbumData',
            })
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
                _touchY: 0,
                _isOvered: false,
                _viewFlg: false,
                _textureLoader: null,
                _selectedVideoID: 0,
                _timer: 0,
                _albumNum: 0,
                _loadedAlbumNum: 0,
                _minTextures: {},
                _textures: {},
                _videos: {},
                _currentTween: null,
                _isTouch: false
                // _stats: null // TODO: remove
            };
        },
        created () {
            this._isTouch = 'ontouchstart' in window;
            this._stage = new THREE.Scene();
            this._container = new THREE.Group();
            this._stage.add(this._container);

            this._geometry = new THREE.SphereGeometry(10, 50, 50);
            this._geometry.scale(-1, 1, 1);

            this._material = new THREE.MeshBasicMaterial();
            this._textureLoader = new THREE.TextureLoader();
            this._rayCaster = new THREE.Raycaster();
            this._minTextures = {};
            this._textures = {};
            this._videos = {};

            // this._stats = new Stats();
            // this._stats.domElement.style.position = 'absolute';
            // this._stats.domElement.style.left = '0px';
            // this._stats.domElement.style.bottom = '0px';
            // document.body.appendChild( this._stats.domElement );
        },

        mounted () {
            const ratio = window.devicePixelRatio;

            this._canvas = document.getElementById('myCanvas');
            this._renderer = new THREE.WebGLRenderer({
                antialias: false,
                stencil: false,
                alpha: true,
                canvas: this._canvas
            });

            this._renderer.setPixelRatio(ratio);
            this._renderer.setClearColor(new THREE.Color(0x000000), 0);
            this._renderer.setSize(this.screenSize.width, this.screenSize.height);

            if (this._isTouch) {
                this._mainCamera = new CustomPerspectiveSPCamera(this._canvas, 60, this.screenSize.width / this.screenSize.height, 1, 2000);
            } else {
                this._mainCamera = new CustomPerspectiveCamera(this._canvas, 60, this.screenSize.width / this.screenSize.height, 1, 2000);
            }

            this._mainCamera.position.set(0, 0, 100);
            this._stage.add(this._mainCamera);
            this._loadedAlbumNum = 0;
            this._albumNum = this.getCurrentAlbumData.all;

            // 画像の追加
            for (let i = 0, len = this.getCurrentAlbumData.images; i < len; i++) {
                const _name = i < 10 ? `0${i + 1}` : `${i + 1}`;
                // 一覧時は解像度低いやつをつかう
                this._textureLoader.load(
                    `/assets/album/${this._name}/${_name}_min.jpg`,
                    (_tex) => {
                        this._minTextures[_name] = _tex;
                        this.addPicture(_tex, _name);
                    }
                );
                // 詳細時に使う解像度高い画像のテクスチャも用意しておく
                this._textureLoader.load(
                    `/assets/album/${this._name}/${_name}.jpg`,
                    (_tex) => {
                        this._textures[_name] = _tex;
                    }
                );
            }

            // 動画の追加
            for (let i = 0, len = this.getCurrentAlbumData.movies; i < len; i++) {
                const _name = i < 10 ? `0${i + 1}` : `${i + 1}`;
                this.addMovie(_name);
            }
        },
        methods: {
            /**
             * 一覧時のイベントを設定
             */
            setDetectEvent(e) {
                document.addEventListener('mousemove', this.onMouseMove);
                if (this._isTouch) {
                    document.addEventListener('touchend', this.onTouchEnd);
                } else {
                    document.addEventListener('click', this.viewDetail);
                }
                document.addEventListener('wheel', this.onWheel);
                document.addEventListener('touchstart', this.onTouchStart);
                document.addEventListener('touchmove', this.onTouchMove);
            },
            /**
             * 一覧時のイベントを削除
             */
            removeDetectEvent() {
                document.removeEventListener('mousemove', this.onMouseMove);
                document.removeEventListener('touchend', this.onTouchEnd);
                document.removeEventListener('click', this.viewDetail);
                document.removeEventListener('wheel', this.onWheel);
                document.removeEventListener('touchstart', this.onTouchStart);
                document.removeEventListener('touchmove', this.onTouchMove);
            },
            /**
             * カスタムカメラ側のイベントを設定
             */
            setCameraEvent() {
                this._mainCamera.setEvent();
            },
            /**
             * カスタムカメラ側のイベントを削除
             */
            removeCameraEvent() {
                this._mainCamera.removeEvent();
            },
            /**
             * 画像の球を追加
             * @param {THREE.Texture} _tex
             * @param {string} _name
             */
            addPicture(_tex, _name) {
                const geometry = this._geometry.clone();
                const material = this._material.clone();
                material.map = _tex;

                const mesh = new THREE.Mesh(geometry, material);
                mesh.scale.set(0.01, 0.01, 0.01);
                mesh.userData.id = _name;
                mesh.userData.type = 'picture';
                this._container.add(mesh);

                this.onLoadComplete();
            },
            /**
             * 動画の球を追加
             * @param {string} _src
             */
            addMovie(_src) {
                const video = document.createElement('video');
                this._videos[_src] = video;
                video.setAttribute('playsinline', '');
                video.setAttribute('webkit-playsinline', '');
                video.loop = true;
                video.autoplay = false;
                video.src = `/assets/album/${this._name}/${_src}.mp4`;
                video.addEventListener('loadeddata', () => {
                    video.pause();
                    this.onLoadComplete();
                }, {once: true});

                const geometry = this._geometry.clone();
                const material = this._material.clone();
                const texture = new THREE.VideoTexture(video);
                texture.minFilter = THREE.LinearFilter;
                texture.magFilter = THREE.LinearFilter;
                texture.format = THREE.RGBFormat;
                material.map = texture;

                const mesh = new THREE.Mesh(geometry, material);
                mesh.scale.set(0.01, 0.01, 0.01);
                mesh.userData.type = 'video';
                mesh.userData.id = _src;
                mesh.visible = false;

                this._container.add(mesh);

                video.load();
            },
            /**
             * 全ての画像と動画の読み込みが終わったら
             */
            onLoadComplete() {
                this._loadedAlbumNum++;
                if (this._loadedAlbumNum === this._albumNum) {
                    let finished = 0;

                    for (let i = 0, len = this._container.children.length; i < len; i++ ) {
                        this._container.children[i].visible = true;
                        this._currentTween = TweenMax.to(this._container.children[i].scale, 1.0, {
                            x: 1.0,
                            y: 1.0,
                            z: 1.0,
                            delay: i * 0.2,
                            ease: Elastic.easeOut,
                            onComplete: () => {
                                finished++;
                                if (finished === this._albumNum) {
                                    this.setDetectEvent();
                                }
                            }
                        });
                    }

                    this.setPosition();
                    this.play();
                }
            },
            /**
             * 球の位置を設定
             */
            setPosition() {
                const column = Math.round(this.screenSize.width / 200);
                const offset = {x: (column - 1) * -15, y: 40};
                const children = this._container.children;

                for (let i = 0; i < this._albumNum; i++) {
                    const mesh = children[i];
                    const col = i % column;
                    const row = Math.floor(i / column);
                    const x = offset.x + col * 30;
                    const y = offset.y - row * 30;
                    mesh.position.set(x, y, 0);
                }
            },
            /**
             * マウスの位置に球があるかをチェックする
             * @param event
             */
            onMouseMove(event) {
                const x = event.clientX;
                const y = event.clientY;

                this.getIntersects(x, y);
            },
            /**
             * タップした位置に球があるかをチェックする
             * @param event
             */
            onTouchEnd(event) {
                const touch = event.changedTouches[0];
                const x = touch.pageX;
                const y = touch.pageY;

                this.getIntersects(x, y);
                this.viewDetail(event);
            },
            /**
             * x, y座標からメッシュを検索
             * @param {number} x
             * @param {number} y
             */
            getIntersects(x, y) {
                const mouseX = (x / this.screenSize.width) * 2 - 1;
                const mouseY = -(y / this.screenSize.height) * 2 + 1;

                this._rayCaster.setFromCamera({x: mouseX, y: mouseY}, this._mainCamera.camera);
                this._intersects = this._rayCaster.intersectObjects(this._container.children);

                if (this._intersects) {
                    this.$data._isOvered = this._intersects.length > 0;
                }
            },
            /**
             * 詳細をみる
             */
            viewDetail() {
                if (this._intersects && this._intersects.length > 0) {
                    this.removeDetectEvent();

                    this.$data._viewFlg = true;
                    const mesh = this._intersects[0].object;
                    const id = mesh.userData.id;
                    const type = mesh.userData.type;
                    const duration = 1.0;

                    this._currentTween = TweenMax.to(this._mainCamera.position, duration, {
                        x: mesh.position.x,
                        y: mesh.position.y,
                        z: mesh.position.z,
                        ease: Power3.easeOut,
                        onComplete: () => {
                            if (type === 'video') {
                                this._videos[this._selectedVideoID].play();
                            } else {
                                mesh.material.map = this._textures[id];
                                this._selectedVideoID = -1;
                            }

                            for (let i = 0; i < this._albumNum; i++) {
                                const child = this._container.children[i];
                                if (child.userData.id !== id) {
                                    child.visible = false;
                                }
                            }

                            this.setCameraEvent();
                        }
                    });

                    if (type === 'video') {
                        this._selectedVideoID = id;
                        this._videos[this._selectedVideoID].load();
                    }
                }
            },
            /**
             * 一覧に戻る
             */
            backToAlbum() {
                if (this._selectedVideoID !== -1) {
                    this._videos[this._selectedVideoID].pause();
                }

                for (let i = 0; i < this._albumNum; i++) {
                    this._container.children[i].visible = true;
                }

                const mesh = this._intersects[0].object;

                if (mesh.userData.type === 'picture') {
                    mesh.material.map = this._minTextures[mesh.userData.id];
                }

                this._mainCamera.reset();
                this._currentTween = TweenMax.to(this._mainCamera.position, 1.0, {
                    x: 0,
                    y: 0,
                    z: 100,
                    ease: Power3.easeIn,
                    onComplete: () => {
                        this.$data._viewFlg = false;
                        this.removeCameraEvent();
                        this.setDetectEvent();
                    }
                });
            },
            /**
             * スクロール時にカメラを動かす
             * @param e
             */
            onWheel(e) {
                e.preventDefault();
                const cameraPosY = this._mainCamera.position.y + e.deltaY * 0.01;
                this.scroll(cameraPosY);
            },
            /**
             * タッチの開始点を保存
             * @param e
             */
            onTouchStart(e) {
                e.preventDefault();

                const touch = e.touches[0];
                this._touchY = touch.pageY;
            },
            /**
             * タッチムーブ時にカメラを動かす
             */
            onTouchMove(e) {
                e.preventDefault();

                const touch = e.touches[0];
                this.scroll(this._touchY - touch.pageY);
            },
            /**
             * 実際にスクロールする部分
             * @param {number} y
             */
            scroll(y) {
                this._mainCamera.position.setY(cameraPosY);
            },
            /**
             * リサイズ時に球の位置を調整
             */
            onResize() {
                this.setPosition();
            },
            /**
             * レンダリングを開始
             */
            play() {
                this.update();
            },
            /**
             * レンダリングを停止
             */
            pause() {
                if (this._timer) {
                    cancelAnimationFrame(this._timer);
                    this._timer = -1;
                }
            },
            /**
             * 再帰関数
             */
            update() {
                // this._stats.begin();
                this._timer = requestAnimationFrame(this.update);
                this._mainCamera.update();
                this._renderer.render(this._stage, this._mainCamera.camera);
                // this._stats.end();
            }
        },
        watch: {
            screenSize: function () {
                if (this._renderer) {
                    const width = this.$el.clientWidth;
                    const height = this.$el.clientHeight;
                    this._renderer.setSize(width, height);
                    this._mainCamera.setRatio(width / height);
                    this.onResize();
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
            z-index: 0;
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
