import type Shader from './Shader';
import {createProgram} from '~/assets/ts/common/GLUtils';

export default class Program {
    private _program!: WebGLProgram;
    private _attl: number[] = [];
    private _unil: WebGLUniformLocation[] = [];

    /**
     * WebGLプログラムをつくる
     * @param {WebGLRenderingContext} _gl
     * @param {Shader} _shader vertexシェーダーとfragmentシェーダーを持つオブジェクト
     * @param {string[]} _attName シェーダ内のattributeの名前
     * @param {number[]} _atts 各attributeの要素数
     * @param {string[]} _uniName シェーダ内のuniformの名前
     * @param {string[]} _uniType 各uniformのタイプ
     */
    constructor(private _gl: WebGLRenderingContext, private _shader: Shader, private _attName: string[], private _atts: number[], private _uniName: string[], private _uniType: string[]) {
        this.init();
    }

    private init = (): void => {
        this._program = createProgram(this._gl, this._shader.VS, this._shader.FS) as WebGLProgram;

        for (let i = 0; i < this._attName.length; i++) {
            this._attl[i] = this._gl.getAttribLocation(this._program, this._attName[i]);

            if (this._attl[i] === null) {
                throw new Error(`getAttribLocation error -  ${i} : ${this._attName[i]}`);
            }
        }

        for (let i = 0; i < this._uniName.length; i++) {
            this._unil[i] = this._gl.getUniformLocation(this._program, this._uniName[i]) as WebGLUniformLocation;

            if (this._unil[i] === null) {
                throw new Error(`getUniformLocation error -  ${i} : ${this._uniName[i]}`);
            }
        }
    };

    get program(): WebGLProgram {
        return this._program;
    }

    get attl(): number[] {
        return this._attl;
    }

    get atts(): number[] {
        return this._atts;
    }

    get unil(): WebGLUniformLocation[] {
        return this._unil;
    }

    get uniType(): string[] {
        return this._uniType;
    }
}
