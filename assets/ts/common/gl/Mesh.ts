/**
 * This class has been influenced by https://wgld.org
 */

import { GLUtils, MatrixUtils, Methods } from '../Utils';
import { Vector } from './Vector';
import { Geometry } from './Geometry';
import { Program } from './Program';
import { GLConfig } from '../Config';

export class Mesh {

    private _id: number;
    private _mMatrix: Float32Array;
    private _position: { x: number, y: number, z: number } = {x: 0, y: 0, z: 0};
    private _drawType: number;
    private _drawMethod: Function;
    private _textureArr: WebGLTexture[] = [];
    private _texture: WebGLTexture;
    private _castShadow = false;

    constructor(private _gl: WebGLRenderingContext, private _prg: Program, private _geometry: Geometry, _drawType: string = GLConfig.DRAW_TYPE_TRIANGLE) {
        this._mMatrix = MatrixUtils.initialize(MatrixUtils.create());

        this.setDrawType(_drawType);
        this.setDrawMethod();
    }

    public reset = () => {
        MatrixUtils.initialize(this._mMatrix);
        this._position = {x: 0, y: 0, z: 0};
    };

    public useProgram = () => {
        this._gl.useProgram(this._prg.program);
    };

    public ready = (_values: any[]) => {
        GLUtils.setAttr(this._gl, this._geometry.vbo, this._prg.attl, this._prg.atts);

        if (this._geometry.ibo) {
            this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._geometry.ibo);
        }

        if (this._texture) {
            this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture);
        }

        if (this._prg.uniType.length > 0) {
            for (let i = 0; i < this._prg.uniType.length; i++) {
                if (this._prg.uniType[i] === GLConfig.UNIFORM_TYPE_TEXTURE) {
                    this.setTexture(_values[i]);
                }
                GLUtils.setUniform(this._gl, this._prg.uniType[i], this._prg.unil[i], _values[i]);
            }
        }
    };

    setTexture = (_index: number) => {
        const texture = this._textureArr[_index];

        switch (_index) {
            case 0:
                this._gl.activeTexture(this._gl.TEXTURE0);
                break;
            case 1:
                this._gl.activeTexture(this._gl.TEXTURE1);
                break;
            case 2:
                this._gl.activeTexture(this._gl.TEXTURE2);
                break;
            case 3:
                this._gl.activeTexture(this._gl.TEXTURE3);
                break;
        }

        this._gl.bindTexture(this._gl.TEXTURE_2D, texture);
    };

    private setDrawType = (_type: string) => {
        switch (_type) {
            case GLConfig.DRAW_TYPE_POINT:
                this._drawType = this._gl.POINTS;
                break;
            case GLConfig.DRAW_TYPE_LINE:
                this._drawType = this._gl.LINES;
                break;
            case GLConfig.DRAW_TYPE_LINE_STRIP:
                this._drawType = this._gl.LINE_STRIP;
                break;
            case GLConfig.DRAW_TYPE_LINE_LOOP:
                this._drawType = this._gl.LINE_LOOP;
                break;
            case GLConfig.DRAW_TYPE_TRIANGLE:
                this._drawType = this._gl.TRIANGLES;
                break;
            case GLConfig.DRAW_TYPE_TRIANGLE_STRIP:
                this._drawType = this._gl.TRIANGLE_STRIP;
                break;
            case GLConfig.DRAW_TYPE_TRIANGLE_FAN:
                this._drawType = this._gl.TRIANGLE_FAN;
                break;
            default:
                this._drawType = this._gl.TRIANGLES;
                break;
        }
    };

    private setDrawMethod = () => {
        if (this._geometry.INDEX.length === 0) {
            this._drawMethod = this.drawArrays;
        } else {
            this._drawMethod = this.drawElements;
        }
    };

    public draw = () => {
        this._drawMethod();
    };

    private drawElements = () => {
        this._gl.drawElements(this._drawType, this._geometry.INDEX.length, this._gl.UNSIGNED_SHORT, 0);
    };

    private drawArrays = () => {
        this._gl.drawArrays(this._drawType, 0, this._geometry.VERTEX.length / 3);
    };

    /**
     * 移動する
     * @param {Vector} _vec
     */
    public translate = (_vec: Vector | number[]): void => {
        const mat: Float32Array = this._mMatrix.copyWithin(0, 0);
        this._mMatrix[0] = mat[0];
        this._mMatrix[1] = mat[1];
        this._mMatrix[2] = mat[2];
        this._mMatrix[3] = mat[3];
        this._mMatrix[4] = mat[4];
        this._mMatrix[5] = mat[5];
        this._mMatrix[6] = mat[6];
        this._mMatrix[7] = mat[7];
        this._mMatrix[8] = mat[8];
        this._mMatrix[9] = mat[9];
        this._mMatrix[10] = mat[10];
        this._mMatrix[11] = mat[11];

        if (_vec instanceof Vector) {
            this._position.x += _vec.x;
            this._position.y += _vec.y;
            this._position.z += _vec.z;

            this._mMatrix[12] = mat[0] * _vec.x + mat[4] * _vec.y + mat[8] * _vec.z + mat[12];
            this._mMatrix[13] = mat[1] * _vec.x + mat[5] * _vec.y + mat[9] * _vec.z + mat[13];
            this._mMatrix[14] = mat[2] * _vec.x + mat[6] * _vec.y + mat[10] * _vec.z + mat[14];
            this._mMatrix[15] = mat[3] * _vec.x + mat[7] * _vec.y + mat[11] * _vec.z + mat[15];
        } else {
            this._position.x += _vec[0];
            this._position.y += _vec[1];
            this._position.z += _vec[2];

            this._mMatrix[12] = mat[0] * _vec[0] + mat[4] * _vec[1] + mat[8] * _vec[2] + mat[12];
            this._mMatrix[13] = mat[1] * _vec[0] + mat[5] * _vec[1] + mat[9] * _vec[2] + mat[13];
            this._mMatrix[14] = mat[2] * _vec[0] + mat[6] * _vec[1] + mat[10] * _vec[2] + mat[14];
            this._mMatrix[15] = mat[3] * _vec[0] + mat[7] * _vec[1] + mat[11] * _vec[2] + mat[15];
        }
    };

    /**
     * 拡大する
     * @param {Vector} _vec
     */
    public scale = (_vec: Vector | number[]): void => {
        const mat: Float32Array = this._mMatrix.copyWithin(0, 0);
        if (_vec instanceof Vector) {
            this._mMatrix[0] = mat[0] * _vec.x;
            this._mMatrix[1] = mat[1] * _vec.x;
            this._mMatrix[2] = mat[2] * _vec.x;
            this._mMatrix[3] = mat[3] * _vec.x;
            this._mMatrix[4] = mat[4] * _vec.y;
            this._mMatrix[5] = mat[5] * _vec.y;
            this._mMatrix[6] = mat[6] * _vec.y;
            this._mMatrix[7] = mat[7] * _vec.y;
            this._mMatrix[8] = mat[8] * _vec.z;
            this._mMatrix[9] = mat[9] * _vec.z;
            this._mMatrix[10] = mat[10] * _vec.z;
            this._mMatrix[11] = mat[11] * _vec.z;
        } else if (_vec instanceof Array) {
            this._mMatrix[0] = mat[0] * _vec[0];
            this._mMatrix[1] = mat[1] * _vec[0];
            this._mMatrix[2] = mat[2] * _vec[0];
            this._mMatrix[3] = mat[3] * _vec[0];
            this._mMatrix[4] = mat[4] * _vec[1];
            this._mMatrix[5] = mat[5] * _vec[1];
            this._mMatrix[6] = mat[6] * _vec[1];
            this._mMatrix[7] = mat[7] * _vec[1];
            this._mMatrix[8] = mat[8] * _vec[2];
            this._mMatrix[9] = mat[9] * _vec[2];
            this._mMatrix[10] = mat[10] * _vec[2];
            this._mMatrix[11] = mat[11] * _vec[2];
        } else {
            Methods.showError('_vec is unknown types');
        }

        this._mMatrix[12] = mat[12];
        this._mMatrix[13] = mat[13];
        this._mMatrix[14] = mat[14];
        this._mMatrix[15] = mat[15];
    };

    public rotate = (_angle: number, _axis: Vector | number[]): void => {
        const mat: Float32Array = this._mMatrix.copyWithin(0, 0);

        let sq: number;
        let a: number, b: number, c: number;

        if (_axis instanceof Vector) {
            sq = _axis.length;
            a = _axis.x;
            b = _axis.y;
            c = _axis.z;
        } else {
            sq = Math.sqrt(_axis[0] * _axis[0] + _axis[1] * _axis[1] + _axis[2] * _axis[2]);
            a = _axis[0];
            b = _axis[1];
            c = _axis[2];
        }

        if (!sq) {
            return undefined;
        }

        if (sq !== 1) {
            sq = 1 / sq;
            a *= sq;
            b *= sq;
            c *= sq;
        }

        const d = Math.sin(_angle), e = Math.cos(_angle), f = 1 - e,
            g = mat[0], h = mat[1], i = mat[2], j = mat[3],
            k = mat[4], l = mat[5], m = mat[6], n = mat[7],
            o = mat[8], p = mat[9], q = mat[10], r = mat[11],
            s = a * a * f + e,
            t = b * a * f + c * d,
            u = c * a * f - b * d,
            v = a * b * f - c * d,
            w = b * b * f + e,
            x = c * b * f + a * d,
            y = a * c * f + b * d,
            z = b * c * f - a * d,
            A = c * c * f + e;

        if (_angle) {
            if (mat !== this._mMatrix) {
                this._mMatrix[12] = mat[12];
                this._mMatrix[13] = mat[13];
                this._mMatrix[14] = mat[14];
                this._mMatrix[15] = mat[15];
            }
        } else {
            this._mMatrix = mat;
        }

        this._mMatrix[0] = g * s + k * t + o * u;
        this._mMatrix[1] = h * s + l * t + p * u;
        this._mMatrix[2] = i * s + m * t + q * u;
        this._mMatrix[3] = j * s + n * t + r * u;
        this._mMatrix[4] = g * v + k * w + o * x;
        this._mMatrix[5] = h * v + l * w + p * x;
        this._mMatrix[6] = i * v + m * w + q * x;
        this._mMatrix[7] = j * v + n * w + r * x;
        this._mMatrix[8] = g * y + k * z + o * A;
        this._mMatrix[9] = h * y + l * z + p * A;
        this._mMatrix[10] = i * y + m * z + q * A;
        this._mMatrix[11] = j * y + n * z + r * A;
    };

    public setMatrix = (_vpMatrix: Float32Array): Float32Array => {
        return MatrixUtils.multiply(this._mMatrix, _vpMatrix);
    };

    public setQuaternion = (_qMatrix: Float32Array): void => {
        this._mMatrix = MatrixUtils.multiply(this._mMatrix, _qMatrix, this._mMatrix);
    };

    public addTexture = (_texture: WebGLTexture): void => {
        this._textureArr.push(_texture);
    };

    set texture(value: WebGLTexture) {
        this._texture = value;
    }

    get textureArr(): WebGLTexture[] {
        return this._textureArr;
    }

    get mMatrix(): Float32Array {
        return this._mMatrix;
    }

    get id(): number {
        return this._id;
    }

    get position(): { x: number, y: number, z: number } {
        return this._position;
    }

    get castShadow(): boolean {
        return this._castShadow;
    }

    set castShadow(value: boolean) {
        this._castShadow = value;
    }
}
