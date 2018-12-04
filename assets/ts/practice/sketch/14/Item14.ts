import { Sketch } from '../common/Sketch';
import { WebGLContext } from '~/assets/ts/common/gl/Context';
import { Data } from '../common/plane/pData';
import { Renderer } from '~/assets/ts/common/gl/Renderer';
import { Geometry } from '~/assets/ts/common/gl/Geometry';
import { Mesh } from '~/assets/ts/common/gl/Mesh';
import { Program } from '~/assets/ts/common/gl/Program';
import { GLConfig } from '~/assets/ts/common/Config';
import { Default } from './Shader';
import { FFT } from '../../../common/audio/FFT';
import {GLUtils} from '~/assets/ts/common/Utils';

export class Item14 extends Sketch {

    private _data: Data = new Data();
    private _gl: WebGLRenderingContext;
    private _default: Program;
    private _renderer: Renderer;
    private _time = 0;
    private _audioContext: FFT;
    private _audioAnalyser: AnalyserNode;
    private _frequency: Uint8Array;

    constructor(_store: any, private _canvas: HTMLCanvasElement, _id: string) {
        super(_store, _id);
    }

    public setup = (): void => {
        const ctx = new WebGLContext(this._store.getters.ratio, this._canvas);
        this._gl = ctx.ctx;
        const shader = new Default(this._gl);
        this.clear();
        this._default = new Program(this._gl, shader,
            ['position', 'color'],
            [3, 4],
            ['mvpMatrix', 'resolution', 'time', 'fft'],
            [GLConfig.UNIFORM_TYPE_MATRIX4, GLConfig.UNIFORM_TYPE_VECTOR2, GLConfig.UNIFORM_TYPE_FLOAT, GLConfig.UNIFORM_TYPE_AUDIO_TEXTURE]
        );
        this._renderer = new Renderer(this._store, ctx);

        const line: Geometry = new Geometry(this._gl, this._data).init();
        const mesh: Mesh = new Mesh(this._gl, this._default, line, GLConfig.DRAW_TYPE_TRIANGLE);
        this._renderer.add(mesh);

        this._store.commit('SET_VS_TEXT', shader.vertexString);
        this._store.commit('SET_FS_TEXT', shader.fragmentString);

        this._audioContext = new FFT();
        this._audioAnalyser = this._audioContext.analyser;
        this._frequency = new Uint8Array(this._audioAnalyser.frequencyBinCount);
        mesh.addTexture(GLUtils.createAudioTexture(this._gl, this._audioAnalyser.frequencyBinCount, this._frequency));
        this._audioContext.ready('/assets/audio/bass.mp3').then(() => {
            this._audioContext.play(true);
            this.play();
        });
    };

    private clear = () => {
        this._gl.clearColor(1.0, 1.0, 1.0, 1.0);
        this._gl.clearDepth(1.0);
        this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);
    };

    public dispose = (): void => {
        this.pause();

        this._audioContext.pause();

        if (this._renderer) {
            this._renderer.dispose();
        }
    };

    public update = () => {
        this._audioAnalyser.getByteFrequencyData(this._frequency);
        this.animate();
        this._timer = requestAnimationFrame(this.update);

        this._time += 0.01;
    };

    public animate = () => {
        this.clear();
        const canvasSize = this._store.getters.canvasSize;
        this._renderer.update([canvasSize.width, canvasSize.height], this._time, [0, this._frequency]);
    };
}
