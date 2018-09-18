<template>
    <div class="container-canvas" ref="canvasWrap"></div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import * as THREE from 'three';
    import {W} from '~/assets/ts/index/Text/W';
    import {H} from '~/assets/ts/index/Text/H';
    import {O} from '~/assets/ts/index/Text/O';
    import {I} from '~/assets/ts/index/Text/I';
    import {A} from '~/assets/ts/index/Text/A';
    import {M} from '~/assets/ts/index/Text/M';
    import {Hatena} from "~/assets/ts/index/Text/Hatena";
    import {AppConfig} from '../../assets/ts/common/Config';
    import TweenMax from 'gsap'

    export default {
        name: 'Intro',
        data: function () {
            return {
                canvas: null,
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
                _timer: 0,
                _unsubscribe: null
            };
        },
        computed: {
            ...mapGetters(['screenSize', 'sceneName'])
        },
        created: function () {
            this._stage = new THREE.Scene();

            this._mainCamera = new THREE.PerspectiveCamera( 60, this.screenSize.width / this.screenSize.height, 1, 1000 );
            this._mainCamera.position.set( 0, 0, 45 );

            let ratio = window.devicePixelRatio;

            this._renderer = new THREE.WebGLRenderer({
                antialias: true,
                stencil: false,
                alpha: true
            });

            this._renderer.setPixelRatio(ratio);

            this._scaleWho = 0.1;
            this._posWho = 0;
            this._scaleI = 0.1;
            this._posI = 0;
            this._scaleAm = 0.1;
            this._posAmY = -4.25;
            this._posAmX = 0;
            this._scaleHatena = 0.1;
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
            let ambientLight = new THREE.AmbientLight(0x44ccbb, 1.0);
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

            this._unsubscribe = this.$store.subscribe(this.onStateChange);
        },
        methods: {
            onStateChange: function(_mutation) {
                if (_mutation.type === 'CHANGE_SCENE') {
                    if (_mutation.payload === AppConfig.SCENE.FIRST) {
                        this.play();
                    } else {
                        this.pause();
                    }
                }
            },
            play: function () {
                this.update();
                TweenMax.to(this, 1, {
                    _scaleWho: 1.2,
                    ease: TweenMax.Elastic.easeOut
                });

                setTimeout(() => { this.addI(); }, 200);
                setTimeout(() => { this.addAM(); }, 300);
                setTimeout(() => { this.addHatena(); }, 400);
            },
            pause: function () {
                if (this._timer) {
                    cancelAnimationFrame(this._timer);
                    this._timer = null;
                }
            },
            update: function () {
                this._timer = requestAnimationFrame(this.update);

                if (this.sceneName === AppConfig.SCENE.FIRST) {
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
                    ease: TweenMax.Linear.ease
                });

                this._stage.add(this._groupI);

                TweenMax.to(this, 1, {
                    _scaleI: 1.2,
                    ease: TweenMax.Elastic.easeOut
                });
            },
            addAM: function () {
                TweenMax.to(this, 0.3, {
                    _posWho: 6.5,
                    ease: TweenMax.Linear.ease
                });

                TweenMax.to(this, 0.3, {
                    _posI: 3.0,
                    ease: TweenMax.Linear.ease
                });

                this._stage.add(this._groupAM);

                TweenMax.to(this, 1, {
                    _scaleAm: 1.2,
                    ease: TweenMax.Elastic.easeOut
                });
            },
            addHatena: function () {
                TweenMax.to(this, 1, {
                    _posAmX: -2.0,
                    ease: TweenMax.Elastic.easeOut
                });

                this._stage.add(this._groupHatena);

                TweenMax.to(this, 1, {
                    _scaleHatena: 1.2,
                    ease: TweenMax.Elastic.easeOut,
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
                this.$store.dispatch('changeScene', AppConfig.SCENE.SECOND);
            }
        },
        watch: {
            screenSize: function (_size) {
                if (this._renderer) {
                    this._renderer.setSize(
                        this.screenSize.width, this.screenSize.height
                    );

                    this._mainCamera.aspect = this.screenSize.width / this.screenSize.height;
                    this._mainCamera.updateProjectionMatrix();
                }
            }
        },
        beforeDestroy: function () {
            this.dispose();

            if (this._unsubscribe) {
                this._unsubscribe();
            }
        }
    };
</script>

<style scoped lang="scss">
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
</style>
