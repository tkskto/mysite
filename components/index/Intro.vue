<template>
    <div class="container-canvas" ref="canvasWrap"></div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import * as THREE from 'three';
    import {W} from '~/assets/ts/index/Text/W';
    import {H} from '~/assets/ts/index/Text/H';
    import {O} from '~/assets/ts/index/Text/O';
    import {I} from '~/assets/ts/index/Text/I';
    import {A} from '~/assets/ts/index/Text/A';
    import {M} from '~/assets/ts/index/Text/M';
    import {Hatena} from "~/assets/ts/index/Text/Hatena";
    import {AppConfig} from '~/assets/ts/common/Config';
    import TweenMax, {Elastic, Back, Linear} from 'gsap';

    export default {
        name: 'Intro',
        data: function () {
            return {
                _stage: null,
                _renderer: null,
                _mainCamera: null,
                _groupWHO: null,
                _groupI: null,
                _groupAM: null,
                _groupHatena: null,
                _material: null,
                _scaleWho: 0.1,
                _posWho: 0,
                _scaleI: 0.1,
                _posI: 0,
                _scaleAm: 0.1,
                _posAmY: -4.25,
                _posAmX: 0,
                _scaleHatena: 0.1,
                _timer: null,
                _unsubscribe: null,
                _ratio: 1,
                _finished: false,
            };
        },
        computed: {
            ...mapGetters(['screenSize', 'sceneName', 'mousePosition']),
            resizeSize() {
                return this.screenSize;
            },
        },
        created: function () {
            this._stage = new THREE.Scene();

            this._mainCamera = new THREE.PerspectiveCamera( 60, this.screenSize.width / this.screenSize.height, 1, 1000 );
            this._mainCamera.position.set( 0, 0, 45 );
            this._finished = false;

            this._ratio = window.devicePixelRatio;

            this._renderer = new THREE.WebGLRenderer({
                antialias: true,
                stencil: false,
            });

            this._renderer.setPixelRatio(this._ratio);

            if (this.sceneName === AppConfig.SCENE.LOAD) {
                this._scaleWho = 0.1;
                this._posWho = 0;
                this._scaleI = 0.1;
                this._posI = 0;
                this._scaleAm = 0.1;
                this._posAmY = -4.25;
                this._posAmX = 0;
                this._scaleHatena = 0.1;
            } else if (this.sceneName === AppConfig.SCENE.READY) {
                this._scaleWho = 1.2;
                this._posWho = 6.5;
                this._scaleI = 1.2;
                this._posI = 3;
                this._scaleAm = 1.2;
                this._posAmY = -4.25;
                this._posAmX = -2.0;
                this._scaleHatena = 1.2;
            }

            document.addEventListener('mousemove', this.mouseTracking);
        },
        mounted: function () {
            this._renderer.setSize(
                this.screenSize.width, this.screenSize.height
            );

            this._renderer.setClearColor(0x000000, 1);
            this._renderer.shadowMap.enabled = true;
            this._renderer.autoClear = true;
            this._renderer.clear();

            this.$refs.canvasWrap.appendChild(this._renderer.domElement);

            this._groupWHO = new THREE.Group();
            this._groupI = new THREE.Group();
            this._groupAM = new THREE.Group();
            this._groupHatena = new THREE.Group();
            this._stage.add(this._groupWHO);

            // 自然光
            let ambientLight = new THREE.AmbientLight(0x44ccbb, 0.7);
            this._stage.add(ambientLight);

            let light = new THREE.DirectionalLight(0xffffff, 0.7);
            light.position.set(0.0, 10, 300);
            this._stage.add(light);

            this._material = new THREE.MeshPhongMaterial({
                color:0xcccccc,
                specular: 0xffff99,
                shininess: 10
            });

            const depth = 15;

            const EXTRUDE_OPTION = {
                curveSegments: 24,
                amount: depth,
                steps: 50,
                material: 1,
                extrudeMaterial: 0,
                bevelEnabled: false
            };

            let shapeW = new W(this._material, EXTRUDE_OPTION);
            shapeW.mesh.position.set(-7, 2, 0);
            this._groupWHO.add(shapeW.mesh);

            let shapeH = new H(this._material, EXTRUDE_OPTION);
            shapeH.mesh.position.set(0, 2, 0);
            this._groupWHO.add(shapeH.mesh);

            let shapeO = new O(2, 32, depth, this._material, EXTRUDE_OPTION);
            shapeO.mesh.position.set(5, 0, 0);
            shapeO.mesh.rotateY(Math.PI / 2);
            this._groupWHO.add(shapeO.mesh);

            let shapeI = new I(this._material, EXTRUDE_OPTION);
            shapeI.mesh.position.set(-1.5, 0, 0);
            this._groupI.add(shapeI.mesh);

            let shapeA = new A(this._material, EXTRUDE_OPTION);
            shapeA.outer.position.set(-5, 0, 0);
            shapeA.inner.position.set(-5, 0, 0);
            this._groupAM.add(shapeA.outer);
            this._groupAM.add(shapeA.inner);

            let shapeM = new M(this._material, EXTRUDE_OPTION);
            shapeM.mesh.position.set(-1, 0, 0);
            this._groupAM.add(shapeM.mesh);

            let shapeHatena = new Hatena(this._material, EXTRUDE_OPTION);
            shapeHatena.upper.position.set(0, 0, 0);
            shapeHatena.lower.position.set(0, 0, 0);
            this._groupHatena.add(shapeHatena.upper);
            this._groupHatena.add(shapeHatena.lower);
            this._groupHatena.position.set(5.0, -4.5, 0);

            this._groupWHO.scale.set(this._scaleWho, this._scaleWho, this._scaleWho);

            if (this.sceneName === AppConfig.SCENE.LOAD) {
                this._unsubscribe = this.$store.subscribe(this.onStateChange);
            } else if (this.sceneName === AppConfig.SCENE.READY) {
                this.justRender();
            }

            this.setMousePos({
                x: this.screenSize.width * 0.5,
                y: this.screenSize.height * 0.5,
            });
        },
        methods: {
            ...mapActions(['changeScene', 'setMouseState', 'setMousePos']),
            onStateChange: function(_mutation) {
                if (_mutation.type === 'CHANGE_SCENE') {
                    if (_mutation.payload === AppConfig.SCENE.FIRST) {
                        this._finished = false;
                        this.play();
                        this._unsubscribe();
                    } else {
                        this.pause();
                    }
                }
            },
            justRender: function () {
                this._stage.add(this._groupI);
                this._stage.add(this._groupAM);
                this._stage.add(this._groupHatena);
                this.play();
                this.sceneFinish();
            },
            play: function () {
                this.update();

                TweenMax.to(this, 1, {
                    _scaleWho: 1.2,
                    ease: Elastic.easeOut
                });

                setTimeout(() => {
                    this.addI();
                }, 200);
                setTimeout(() => {
                    this.addAM();
                }, 300);
                setTimeout(() => {
                    this.addHatena();
                }, 400);
            },
            pause: function () {
                if (this._timer !== null) {
                    cancelAnimationFrame(this._timer);
                    this._timer = null;
                }
            },
            update: function () {
                this._timer = requestAnimationFrame(this.update);

                const mouseX = this.mousePosition.x - this._renderer.domElement.width * 0.5;
                const mouseY = this.mousePosition.y - this._renderer.domElement.height * 0.5;

                this._mainCamera.position.set(mouseX * 0.001, mouseY * 0.001, 45);
                this._mainCamera.lookAt(0, 0, 0);

                if (!this._finished) {
                    this._groupWHO.scale.set(this._scaleWho, this._scaleWho, this._scaleWho);
                    this._groupWHO.position.set(0, this._posWho, 0);

                    this._groupI.scale.set(this._scaleI, this._scaleI, this._scaleI);
                    this._groupI.position.set(0, this._posI, 0);

                    this._groupAM.scale.set(this._scaleAm, this._scaleAm, this._scaleAm);
                    this._groupAM.position.set(this._posAmX, this._posAmY, 0);

                    this._groupHatena.scale.set(this._scaleHatena, this._scaleHatena, this._scaleHatena);
                }

                this._renderer.render(this._stage, this._mainCamera);
            },
            addI: function () {
                TweenMax.to(this, 0.3, {
                    _posWho: 3,
                    ease: Linear.ease
                });

                this._stage.add(this._groupI);

                TweenMax.to(this, 1, {
                    _scaleI: 1.2,
                    ease: Elastic.easeOut
                });
            },
            addAM: function () {
                TweenMax.to(this, 0.3, {
                    _posWho: 6.5,
                    ease: Linear.ease
                });

                TweenMax.to(this, 0.3, {
                    _posI: 3.0,
                    ease: Linear.ease
                });

                this._stage.add(this._groupAM);

                TweenMax.to(this, 1, {
                    _scaleAm: 1.2,
                    ease: Elastic.easeOut
                });
            },
            addHatena: function () {
                TweenMax.to(this, 1, {
                    _posAmX: -2.0,
                    ease: Elastic.easeOut
                });

                this._stage.add(this._groupHatena);

                TweenMax.to(this, 1, {
                    _scaleHatena: 1.2,
                    ease: Elastic.easeOut,
                    onComplete: this.sceneFinish
                });
            },
            dispose: function () {
                if (this._renderer) {
                    this.pause();
                    this._renderer.dispose();
                }
            },
            sceneFinish: function () {
                this._finished = true;
                this.changeScene(AppConfig.SCENE.READY);
            },
            mouseTracking: function (e) {
                this.setMousePos({
                    x: e.clientX * this._ratio,
                    y: e.clientY * this._ratio
                });
            },
            beforeLeave: function () {
                return new Promise((resolve) => {
                    this._finished = false;
                    TweenMax.to(this, 0.3, {
                        _scaleHatena: 0.0001,
                        ease: Back.easeIn.config(2),
                    });
                    TweenMax.to(this, 0.3, {
                        _scaleAm: 0.0001,
                        delay: 0.1,
                        ease: Back.easeIn.config(2),
                    });
                    TweenMax.to(this, 0.3, {
                        _scaleI: 0.0001,
                        delay: 0.2,
                        ease: Back.easeIn.config(2),
                    });
                    TweenMax.to(this, 0.3, {
                        _scaleWho: 0.0001,
                        delay: 0.3,
                        ease: Back.easeIn.config(2),
                        onComplete: () => {
                            setTimeout(() => {
                                resolve();
                            }, 500);
                        }
                    });
                });
            },
        },
        watch: {
            resizeSize (_size) {
                if (this._renderer) {
                    this._renderer.setSize(
                        this.screenSize.width, this.screenSize.height
                    );

                    this._mainCamera.aspect = this.screenSize.width / this.screenSize.height;
                    this._mainCamera.updateProjectionMatrix();
                }
            },
        },
        beforeDestroy: function () {
            this.dispose();

            document.removeEventListener('mousemove', this.mouseTracking);

            if (this._unsubscribe) {
                this._unsubscribe();
            }
        }
    };
</script>

<style scoped lang="scss">
    .container-canvas {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: -1;
        width: 100vw;
        height: 100vh;

        canvas {
            width: 100%;
            height: 100%;
        }
    }
</style>
