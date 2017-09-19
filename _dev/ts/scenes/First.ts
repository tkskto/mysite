module scene {
    export class First {

        private _stage:THREE.Scene;
        private _group:THREE.Group;
        private _timer:number;

        constructor(private _model:model.Model, private _renderer:THREE.WebGLRenderer, private _mainCamera:THREE.PerspectiveCamera) {
            this._stage = new THREE.Scene();

            this.init();
        }

        private init = () => {
            this._group = new THREE.Group();
            this._stage.add(this._group);

            let light:THREE.DirectionalLight = new THREE.DirectionalLight();
            light.position.set(0.0, 0.7, 0.7);
            this._stage.add(light);

            let material:THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial();
            let extrudeOption = {
                amount: 5,
                steps: 1,
                material: 1,
                extrudeMaterial: 0,
                bevelEnabled: false
            };

            let shapeW:text.W = new text.W();
            let w:THREE.ExtrudeGeometry = new THREE.ExtrudeGeometry(shapeW, extrudeOption);
            let meshW:THREE.Mesh = new THREE.Mesh(w, material);
            meshW.position.set(-7, 2, 0);
            this._group.add(meshW);

            let shapeH:text.H = new text.H();
            let h:THREE.ExtrudeGeometry = new THREE.ExtrudeGeometry(shapeH, extrudeOption);
            let meshH:THREE.Mesh = new THREE.Mesh(h, material);
            meshH.position.set(0, 2, 0);
            this._group.add(meshH);

            let shapeO:text.O = new text.O();
            let o:THREE.ExtrudeGeometry = new THREE.ExtrudeGeometry(shapeO, extrudeOption);
            let meshO:THREE.Mesh = new THREE.Mesh(o, material);
            meshO.position.set(2, 2, 0);
            this._group.add(meshO);


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

            this.render();
        };

        private render = () => {
            this._renderer.render(this._stage, this._mainCamera);
        };

        public play = () => {
            this.update();
        };

        public pause = () => {
            if (this._timer) {
                cancelAnimationFrame(this._timer);
                this._timer = null;
            }
        }
    }
}