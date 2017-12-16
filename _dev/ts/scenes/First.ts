import {Model} from '../Model';
import * as THREE from 'three';
import {W} from '../Text/W';
import {H} from '../Text/H';
import {O} from '../Text/O';
import {I} from '../Text/I';
import {A} from '../Text/A';
import {M} from '../Text/M';
import {Hatena} from "../Text/Hatena";
import * as gsap from 'gsap';
import {ToonShader} from "../shader/ToonShader";

export class First {

    private _stage: THREE.Scene;
    private _groupWHO: THREE.Group;
    private _groupI: THREE.Group;
    private _groupAM: THREE.Group;
    private _groupHatena: THREE.Group;
    private _timer: number;

    private _material:THREE.MeshPhongMaterial;

    private _scaleWho: number = 0.1;
    private _posWho: number = 0;
    private _scaleI: number = 0.1;
    private _posI: number = 0;
    private _scaleAm: number = 0.1;
    private _posAmY: number = -4.25;
    private _posAmX: number = 0;
    private _scaleHatena:number = 0.1;

    constructor(private _model: Model, private _renderer: THREE.WebGLRenderer, private _mainCamera: THREE.PerspectiveCamera) {
        this._stage = new THREE.Scene();

        this.init();
    }

    private init = () => {
        this._groupWHO = new THREE.Group();
        this._groupI = new THREE.Group();
        this._groupAM = new THREE.Group();
        this._groupHatena = new THREE.Group();
        this._stage.add(this._groupWHO);

        // 自然光
        let ambientLight = new THREE.AmbientLight(0x44ccbb, 1.0);
        this._stage.add(ambientLight);

        let light: THREE.DirectionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
        light.position.set(0.0, 10, 300);
        this._stage.add(light);

        this._material = new THREE.MeshPhongMaterial({
            color:0xcccccc,
            specular: 0xffff99,
            shininess: 10
        });

        const EXTRUDE_OPTION:{} = {
            curveSegments: 24,
            amount: 10,
            steps: 50,
            material: 1,
            extrudeMaterial: 0,
            bevelEnabled: false
        };

        let shapeW: W = new W(this._material, EXTRUDE_OPTION);
        shapeW.mesh.position.set(-7, 2, 0);
        this._groupWHO.add(shapeW.mesh);

        let shapeH: H = new H(this._material, EXTRUDE_OPTION);
        shapeH.mesh.position.set(0, 2, 0);
        this._groupWHO.add(shapeH.mesh);

        let shapeO: O = new O(2, 32, 10, this._material, EXTRUDE_OPTION);
        shapeO.mesh.position.set(5, 0, 0);
        shapeO.mesh.rotateY(Math.PI / 2);
        this._groupWHO.add(shapeO.mesh);

        let shapeI: I = new I(this._material, EXTRUDE_OPTION);
        shapeI.mesh.position.set(-1.5, 0, 0);
        this._groupI.add(shapeI.mesh);

        let shapeA: A = new A(this._material, EXTRUDE_OPTION);
        shapeA.outer.position.set(-5, 0, 0);
        shapeA.inner.position.set(-5, 0, 0);
        this._groupAM.add(shapeA.outer);
        this._groupAM.add(shapeA.inner);

        let shapeM: M = new M(this._material, EXTRUDE_OPTION);
        shapeM.mesh.position.set(-1, 0, 0);
        this._groupAM.add(shapeM.mesh);

        let shapeHatena: Hatena = new Hatena(this._material, EXTRUDE_OPTION);
        shapeHatena.upper.position.set(0, 0, 0);
        shapeHatena.lower.position.set(0, 0, 0);
        this._groupHatena.add(shapeHatena.upper);
        this._groupHatena.add(shapeHatena.lower);
        this._groupHatena.position.set(5.0, -4.5, 0);

        this._groupWHO.scale.set(this._scaleWho, this._scaleWho, this._scaleWho);

        // axisHelper
        // let axisHelper = new THREE.AxisHelper(1000);  // 引数は 軸のサイズ
        // this._stage.add(axisHelper);

        this._model.addEventListener(Model.EVENT_SCENE_CHANGE, this.onSceneChanged);

        let cameraPos = 0;

        window.addEventListener('wheel', (e) => {
            e.preventDefault();
            console.log(cameraPos);
            cameraPos += e.deltaY * 0.001;
            this._mainCamera.position.setY(cameraPos);
        });
    };

    private onSceneChanged = () => {
        if (this._model.scene === Model.SCENE_FIRST) {
            this.play();
        } else {
            this.pause();
        }
    };

    private update = () => {
        this._timer = requestAnimationFrame(this.update);

        if (this._model.scene === Model.SCENE_FIRST) {
            this._groupWHO.scale.set(this._scaleWho, this._scaleWho, this._scaleWho);
            this._groupWHO.position.set(0, this._posWho, 0);

            this._groupI.scale.set(this._scaleI, this._scaleI, this._scaleI);
            this._groupI.position.set(0, this._posI, 0);

            this._groupAM.scale.set(this._scaleAm, this._scaleAm, this._scaleAm);
            this._groupAM.position.set(this._posAmX, this._posAmY, 0);

            this._groupHatena.scale.set(this._scaleHatena, this._scaleHatena, this._scaleHatena);
        }

        this._renderer.render(this._stage, this._mainCamera);
    };

    public play = () => {
        this.update();

        gsap.TweenLite.to(this, 1, {
            _scaleWho: 1.2,
            ease: gsap.Elastic.easeOut
        });

        setTimeout(() => { this.addI(); }, 200);
        setTimeout(() => { this.addAM(); }, 300);
        setTimeout(() => { this.addHatena(); }, 400);
    };

    private addI = () => {

        gsap.TweenLite.to(this, 0.3, {
            _posWho: 3,
            ease: gsap.Linear.ease
        });

        this._stage.add(this._groupI);

        gsap.TweenLite.to(this, 1, {
            _scaleI: 1.2,
            ease: gsap.Elastic.easeOut
        });
    };

    private addAM = () => {

        gsap.TweenLite.to(this, 0.3, {
            _posWho: 6.5,
            ease: gsap.Linear.ease
        });

        gsap.TweenLite.to(this, 0.3, {
            _posI: 3.0,
            ease: gsap.Linear.ease
        });

        this._stage.add(this._groupAM);

        gsap.TweenLite.to(this, 1, {
            _scaleAm: 1.2,
            ease: gsap.Elastic.easeOut
        });
    };

    private addHatena = () => {
        gsap.TweenLite.to(this, 1, {
            _posAmX: -2.0,
            ease: gsap.Elastic.easeOut
        });

        this._stage.add(this._groupHatena);

        gsap.TweenLite.to(this, 1, {
            _scaleHatena: 1.2,
            ease: gsap.Elastic.easeOut,
            onComplete: this.sceneFinish
        });
    };

    private sceneFinish = () => {
        //this._model.scene = Model.SCENE_SECOND;
    };

    public pause = () => {
        if (this._timer) {
            cancelAnimationFrame(this._timer);
            this._timer = null;
        }
    }
}