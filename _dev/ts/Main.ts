// import {AppConfig} from './config/Config';
// import {Utils} from './Utils';
import * as THREE from 'three';
import {Model} from './Model';
import {SVGController} from './svg/SVGController';
import {First} from './scenes/First';

(function (win, doc, undefined) {
    'use strict';

    let _model:Model = new Model();

    function init() {

        win.addEventListener('resize', function () {
            _model.screen = {
                width: win.innerWidth,
                height: win.innerHeight
            };

            renderer.setSize(
                _model.screen.width, _model.screen.height
            );

            mainCamera.aspect = _model.screen.width / _model.screen.height;
            mainCamera.updateProjectionMatrix();
        });

        _model.screen = {
            width: win.innerWidth,
            height: win.innerHeight
        };

        _model.textureLoader = new THREE.TextureLoader();

        let mainCamera:THREE.PerspectiveCamera = new THREE.PerspectiveCamera( 60, _model.screen.width / _model.screen.height, 1, 1000 );
        mainCamera.position.set( 0, 0, 60 );

        let ratio = window.devicePixelRatio;

        let renderer:THREE.WebGLRenderer = new THREE.WebGLRenderer({
            antialias: true,
            stencil: false,
            alpha: true
        });

        renderer.setPixelRatio(ratio);

        renderer.setSize(
            _model.screen.width, _model.screen.height
        );

        // renderer.setClearColor(0xcccccc, 1);
        renderer.shadowMap.enabled = true;
        renderer.autoClear = true;

        document.getElementById('mv-canvas').appendChild(renderer.domElement);

        let first:First = new First(_model, renderer, mainCamera);

        let _who:NodeList = document.querySelectorAll('.mv-svg');
        for (let i = 0; i < _who.length; i++) {
            let _svg:SVGController = new SVGController(_who.item(i) as SVGElement, _model);
            _svg.show();
        }
    }

    // 読み込みが完了してたらそのままinit
    if (doc.readyState !== 'loading') {
        init();
    // 読み込み中の場合は完了をまってからinit
    } else {
        doc.addEventListener('DOMContentLoaded', init);
    }

})(window, document);