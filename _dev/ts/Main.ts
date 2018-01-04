// import {AppConfig} from './config/Config';
// import {Utils} from './Utils';
import * as THREE from 'three';
import {Model} from './Model';
import {First} from './scenes/First';
import {Album} from './scenes/Album';
import {Intro} from './scenes/Intro';

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

        win.addEventListener('hashchange', function () {
            const hash = location.hash;
            _model.scene = hash.split('#')[1];
        });

        _model.textureLoader = new THREE.TextureLoader();

        let mainCamera:THREE.PerspectiveCamera = new THREE.PerspectiveCamera( 60, _model.screen.width / _model.screen.height, 1, 1000 );
        mainCamera.position.set( 0, 0, 45 );

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

        renderer.setClearColor(0x000000, 1);
        renderer.shadowMap.enabled = true;
        renderer.autoClear = true;
        renderer.clear();

        document.getElementById('mv-canvas').appendChild(renderer.domElement);

        let intro: Intro = new Intro(_model);
        let first:First = new First(_model, renderer, mainCamera);
        let album:Album = new Album(_model);

        const hash = location.hash;

        if (hash) {
            _model.scene = hash.split('#')[1];
        } else {
            location.hash = Model.SCENE_INTRO;
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
