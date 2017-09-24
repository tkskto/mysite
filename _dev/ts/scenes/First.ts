import {Model} from '../Model';
import * as THREE from 'three';
// import {Scene,WebGLRenderer, Group, PerspectiveCamera, DirectionalLight, MeshPhongMaterial, ExtrudeGeometry, Mesh} from 'three';
import {W} from '../Text/W';
import {H} from '../Text/H';
import {O} from '../Text/O';
import {I} from '../Text/I';
import {A} from '../Text/A';
import {M} from '../Text/M';
import * as gsap from 'gsap';

export class First {

    private _stage: THREE.Scene;
    private _groupWHO: THREE.Group;
    private _groupI: THREE.Group;
    private _groupAM: THREE.Group;
    private _timer: number;

    private _scaleWho: number = 0.9;
    private _posWho: number = 0;
    private _scaleI: number = 0.9;
    private _posI: number = 0;
    private _scaleAm: number = 0.9;
    private _posAm: number = -2.0;

    constructor(private _model: Model, private _renderer: THREE.WebGLRenderer, private _mainCamera: THREE.PerspectiveCamera) {
        this._stage = new THREE.Scene();

        this.init();
    }

    private init = () => {
        this._groupWHO = new THREE.Group();
        this._groupI = new THREE.Group();
        this._groupAM = new THREE.Group();
        this._stage.add(this._groupWHO);

        let light: THREE.DirectionalLight = new THREE.DirectionalLight();
        light.position.set(0.0, 0.7, 0.7);
        this._stage.add(light);

        let material: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial();
        let extrudeOption:{} = {
            amount: 5,
            steps: 1,
            material: 1,
            extrudeMaterial: 0,
            bevelEnabled: false
        };

        let shapeW: W = new W();
        let w: THREE.ExtrudeGeometry = new THREE.ExtrudeGeometry(shapeW, extrudeOption);
        let meshW: THREE.Mesh = new THREE.Mesh(w, material);
        meshW.position.set(-6, 2, 0);
        this._groupWHO.add(meshW);

        let shapeH: H = new H();
        let h: THREE.ExtrudeGeometry = new THREE.ExtrudeGeometry(shapeH, extrudeOption);
        let meshH: THREE.Mesh = new THREE.Mesh(h, material);
        meshH.position.set(1, 2, 0);
        this._groupWHO.add(meshH);

        let extrudeOptionWithPath = Object.assign({}, extrudeOption);

        let shapeO: O = new O(2, 32, 5);
        extrudeOptionWithPath['extrudePath'] = shapeO.path;
        extrudeOptionWithPath['steps'] = 100;
        let o: THREE.ExtrudeGeometry = new THREE.ExtrudeGeometry(shapeO, extrudeOptionWithPath);
        let meshO: THREE.Mesh = new THREE.Mesh(o, material);
        meshO.position.set(6, 0, 0);
        meshO.rotateY(Math.PI / 2);
        this._groupWHO.add(meshO);

        let shapeI: I = new I();
        let i: THREE.ExtrudeGeometry = new THREE.ExtrudeGeometry(shapeI, extrudeOption);
        let meshI: THREE.Mesh = new THREE.Mesh(i, material);
        meshI.position.set(0, 0, 0);
        this._groupI.add(meshI);

        let shapeA: A = new A();
        let out: THREE.ExtrudeGeometry = new THREE.ExtrudeGeometry(shapeA.outer, extrudeOption);
        let inner: THREE.ExtrudeGeometry = new THREE.ExtrudeGeometry(shapeA.inner, extrudeOption);
        let inMaterial: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({
            color:0x333333,
        });
        let meshAout: THREE.Mesh = new THREE.Mesh(out, material);
        let meshAin: THREE.Mesh = new THREE.Mesh(inner, inMaterial);
        meshAout.position.set(-3, 0, 0);
        meshAin.position.set(-3, 0, 0);
        this._groupAM.add(meshAout);
        this._groupAM.add(meshAin);

        let shapeM: M = new M();
        let m: THREE.ExtrudeGeometry = new THREE.ExtrudeGeometry(shapeM, extrudeOption);
        let meshM: THREE.Mesh = new THREE.Mesh(m, material);
        meshM.position.set(1, 0, 0);
        this._groupAM.add(meshM);

        this._groupWHO.scale.set(this._scaleWho, this._scaleWho, this._scaleWho);

        this._model.addEventListener(Model.EVENT_SCENE_CHANGE, this.onSceneChanged);
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

        this._groupWHO.scale.set(this._scaleWho, this._scaleWho, this._scaleWho);
        this._groupWHO.position.set(0, this._posWho, 0);

        this._groupI.scale.set(this._scaleI, this._scaleI, this._scaleI);
        this._groupI.position.set(0, this._posI, 0);

        this._groupAM.scale.set(this._scaleAm, this._scaleAm, this._scaleAm);
        this._groupAM.position.set(0, this._posAm, 0);

        this.render();
    };

    private render = () => {
        this._renderer.render(this._stage, this._mainCamera);
    };

    public play = () => {
        this.update();

        gsap.TweenLite.to(this, 1, {
            _scaleWho: 1.2,
            ease: gsap.Elastic.easeOut,
            onComplete: this.addI
        });
    };

    private addI = () => {

        gsap.TweenLite.to(this, 0.3, {
            _posWho: 3,
            ease: gsap.Linear.ease
        });

        this._stage.add(this._groupI);

        gsap.TweenLite.to(this, 1, {
            _scaleI: 1.2,
            ease: gsap.Elastic.easeOut,
            onComplete: this.addAM
        });
    };

    private addAM = () => {

        gsap.TweenLite.to(this, 0.3, {
            _posWho: 7,
            ease: gsap.Linear.ease
        });

        gsap.TweenLite.to(this, 0.3, {
            _posI: 4,
            ease: gsap.Linear.ease
        });

        this._stage.add(this._groupAM);

        gsap.TweenLite.to(this, 1, {
            _scaleAm: 1.2,
            ease: gsap.Elastic.easeOut
        });
    };

    public pause = () => {
        if (this._timer) {
            cancelAnimationFrame(this._timer);
            this._timer = null;
        }
    }
}