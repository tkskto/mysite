import * as THREE from 'three';
import {GLConfig} from './common/Config';

export class Methods {
    public static showError(err: string | null) {
        console.error(err || 'error');
    }

    /**
     * 範囲を指定してランダムな数を返す
     * @param {number} min
     * @param {number} max
     * @returns {number}
     */
    public static getRandomNumber(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    /**
     * hsvをRGBに変換する
     * @param {number} hue 0 - 360
     * @param {number} saturation 0 - 100
     * @param {number} value 0 - 100
     * @param {number} alpha 0 - 100
     * @returns {Array}
     */
    public static hsv2RGB(hue: number, saturation: number, value: number, alpha: number): number[] {
        if (saturation > 100 || value > 100 || alpha > 100) {
            return [];
        }

        const color: number[] = [];

        saturation = saturation / 100;
        value = value / 100;

        if (saturation === 0) {
            color.push(value, value, value, alpha);

        } else {
            const th = hue % 360;
            const i = Math.floor(th / 60);
            const f = th / 60 - i;
            const m = value * (1 - saturation);
            const n = value * (1 - saturation * f);
            const k = value * (1 - saturation * (1 - f));
            const r = [value, n, m, m, k, value];
            const g = [k, value, value, n, m, m];
            const b = [m, m, k, value, value, n];
            color.push(r[i], g[i], b[i], alpha);
        }

        return color;
    }
}

export class MatrixUtils {
    /**
     * 4*4正方行列を生成
     * @returns {Float32Array}
     */
    public static create(): Float32Array {
        return new Float32Array(16);
    }

    /**
     * 4x4正方行列の正規化
     * @param {Float32Array} _mat
     * @returns {Float32Array}
     */
    public static initialize(_mat: Float32Array): Float32Array {
        _mat[0] = 1; _mat[1] = 0; _mat[2] = 0; _mat[3] = 0;
        _mat[4] = 0; _mat[5] = 1; _mat[6] = 0; _mat[7] = 0;
        _mat[8] = 0; _mat[9] = 0; _mat[10] = 1; _mat[11] = 0;
        _mat[12] = 0; _mat[13] = 0; _mat[14] = 0; _mat[15] = 1;
        return _mat;
    }

    /**
     * 4 * 4正方行列の掛け算
     * @param {Float32Array} _mat1
     * @param {Float32Array} _mat2
     * @param {Float32Array} _dist
     */
    public static multiply(_mat1: Float32Array, _mat2: Float32Array, _dist: Float32Array = MatrixUtils.initialize(new Float32Array(16))) {
        const a = _mat1[0],  b = _mat1[1],  c = _mat1[2],  d = _mat1[3],
            e = _mat1[4],  f = _mat1[5],  g = _mat1[6],  h = _mat1[7],
            i = _mat1[8],  j = _mat1[9],  k = _mat1[10], l = _mat1[11],
            m = _mat1[12], n = _mat1[13], o = _mat1[14], p = _mat1[15],
            A = _mat2[0],  B = _mat2[1],  C = _mat2[2],  D = _mat2[3],
            E = _mat2[4],  F = _mat2[5],  G = _mat2[6],  H = _mat2[7],
            I = _mat2[8],  J = _mat2[9],  K = _mat2[10], L = _mat2[11],
            M = _mat2[12], N = _mat2[13], O = _mat2[14], P = _mat2[15];

        _dist[0] = A * a + B * e + C * i + D * m;
        _dist[1] = A * b + B * f + C * j + D * n;
        _dist[2] = A * c + B * g + C * k + D * o;
        _dist[3] = A * d + B * h + C * l + D * p;
        _dist[4] = E * a + F * e + G * i + H * m;
        _dist[5] = E * b + F * f + G * j + H * n;
        _dist[6] = E * c + F * g + G * k + H * o;
        _dist[7] = E * d + F * h + G * l + H * p;
        _dist[8] = I * a + J * e + K * i + L * m;
        _dist[9] = I * b + J * f + K * j + L * n;
        _dist[10] = I * c + J * g + K * k + L * o;
        _dist[11] = I * d + J * h + K * l + L * p;
        _dist[12] = M * a + N * e + O * i + P * m;
        _dist[13] = M * b + N * f + O * j + P * n;
        _dist[14] = M * c + N * g + O * k + P * o;
        _dist[15] = M * d + N * h + O * l + P * p;

        return _dist;
    }

    /**
     * ワールド座標からカメラ座標へ、座標変換を行う行列を生成
     * @param {Vector} _targetPos カメラの注視点
     * @param {Vector} _cameraPos カメラの位置
     * @param {Vector} _cameraUp カメラの上方向
     * @param {Float32Array} _dist 変換行列
     * @returns {Float32Array}
     */
    public static lookAt(_targetPos: THREE.Vector3, _cameraPos: THREE.Vector3, _cameraUp: THREE.Vector3, _dist: Float32Array): Float32Array {
        // カメラの位置と見る地点が同じ場合は正方行列を返す
        if (_targetPos.x === _cameraPos.x && _targetPos.y === _cameraPos.y && _targetPos.z === _cameraPos.z) {
            return MatrixUtils.initialize(_dist);
        }

        // cameraPos -> targetまでの各ベクトル
        const vecZ: THREE.Vector3 = _targetPos.sub(_cameraPos).normalize();

        // 上部ベクトルとz軸ベクトルの外積をとると、x軸ベクトルが求められる
        const vecX: THREE.Vector3 = _cameraUp.cross(vecZ).normalize();

        // z軸ベクトルとx軸ベクトルの外積をとると、y軸ベクトルが求められる
        const vecY: THREE.Vector3 = vecZ.cross(vecX).normalize();

        // 最終的に座標変換用の行列をつくる
        _dist[0] = vecX.x; _dist[1] = vecY.x; _dist[2]  = vecZ.x; _dist[3]  = 0;
        _dist[4] = vecX.y; _dist[5] = vecY.y; _dist[6]  = vecZ.y; _dist[7]  = 0;
        _dist[8] = vecX.z; _dist[9] = vecY.z; _dist[10] = vecZ.z; _dist[11] = 0;
        _dist[12] = -(vecX.x * _targetPos.x + vecX.y * _targetPos.y + vecX.z * _targetPos.z);
        _dist[13] = -(vecY.x * _targetPos.x + vecY.y * _targetPos.y + vecY.z * _targetPos.z);
        _dist[14] = -(vecZ.x * _targetPos.x + vecZ.y * _targetPos.y + vecZ.z * _targetPos.z);
        _dist[15] = 1;

        return _dist;
    }

    /**
     * プロジェクション変換を行う行列を生成
     * @param {number} _fov Field Of View カメラの視野角
     * @param {number} _aspect カメラの縦横比
     * @param {number} _near カメラの位置からどのくらいから切り取る（撮影する）か
     * @param {number} _far カメラの位置からどのくらいまで切り取る（撮影する）か
     * @param {Float32Array} _dist 生成された行列
     * @returns {Float32Array}
     */
    public static perspective(_fov: number, _aspect: number, _near: number, _far: number, _dist: Float32Array): Float32Array {
        // 近いクリップ面のy座標
        const t: number = _near * Math.tan(_fov * Math.PI / 360);
        const r = t * _aspect;
        const a = r * 2, b = t * 2, c = _far - _near;
        _dist[0]  = _near * 2 / a; _dist[1]  = 0; _dist[2]  = 0; _dist[3]  = 0;
        _dist[4]  = 0; _dist[5]  = _near * 2 / b; _dist[6]  = 0; _dist[7]  = 0;
        _dist[8]  = 0; _dist[9]  = 0; _dist[10] = -(_far + _near) / c; _dist[11] = -1;
        _dist[12] = 0; _dist[13] = 0; _dist[14] = -(_far * _near * 2) / c; _dist[15] = 0;
        return _dist;
    }
}

export class VectorUtils {
    public static getFaceNormalArr(_vertexArr: number[], _indexArr: number[]): number[] {

        let i;
        const len = _vertexArr.length / 3;
        const distArr: number[] = [];

        for (i = 0; i < len; i++) {
            const _index1: number = _indexArr[i] * 3;
            const _index2: number = _indexArr[i] * 3;
            const _index3: number = _indexArr[i] * 3;

            const _vec1: THREE.Vector3 = new THREE.Vector3(_vertexArr[_index1], _vertexArr[_index1 + 1], _vertexArr[_index1 + 2]);
            const _vec2: THREE.Vector3 = new THREE.Vector3(_vertexArr[_index2], _vertexArr[_index2 + 1], _vertexArr[_index2 + 2]);
            const _vec3: THREE.Vector3 = new THREE.Vector3(_vertexArr[_index3], _vertexArr[_index3 + 1], _vertexArr[_index3 + 2]);

            const v1: THREE.Vector3 = _vec2.sub(_vec1).normalize();
            const v2: THREE.Vector3 = _vec3.sub(_vec1).normalize();

            distArr[i * 3] = v1.y * v2.z - v1.z * v2.y;
            distArr[i * 3 + 1] = v1.z * v2.x - v1.x * v2.z;
            distArr[i * 3 + 2] = v1.x * v2.y - v1.y * v2.x;
        }

        return distArr;
    }

    public static getFaceNormalVector(_vec1: THREE.Vector3, _vec2: THREE.Vector3, _vec3: THREE.Vector3): THREE.Vector3 {
        const dist: THREE.Vector3 = new THREE.Vector3();
        const v1: THREE.Vector3 = _vec2.sub(_vec1).normalize();
        const v2: THREE.Vector3 = _vec3.sub(_vec1).normalize();

        dist.x = v1.y * v2.z - v1.z * v2.y;
        dist.y = v1.z * v2.x - v1.x * v2.z;
        dist.z = v1.x * v2.y - v1.y * v2.x;

        return dist;
    }
}

export class GLUtils {

    /**
     * 頂点シェーダをつくります。
     * @param {string} script シェーダ文字列
     * @param {WebGLRenderingContext} gl WebGLレンダリングコンテキスト
     * @returns {WebGLShader}
     */
    public static createVertexShader(script: string, gl: WebGLRenderingContext): WebGLShader | null {
        const shader: WebGLShader | null = gl.createShader(gl.VERTEX_SHADER);

        // 生成されたシェーダにソースを割り当てる
        gl.shaderSource(shader, script);

        // シェーダをコンパイルする
        gl.compileShader(shader);

        // シェーダが正しくコンパイルされたかチェック
        if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {

            // 成功していたらシェーダを返して終了
            return shader;
        } else {

            // 失敗していたらエラーログをアラートする
            Methods.showError(gl.getShaderInfoLog(shader));
            return shader;
        }
    }

    /**
     * フラグメントシェーダをつくります。
     * @param {string} script シェーダ文字列
     * @param {WebGLRenderingContext} gl WebGLレンダリングコンテキスト
     * @returns {WebGLShader}
     */
    public static createFragmentShader(script: string, gl: WebGLRenderingContext): WebGLShader | null {
        const shader: WebGLShader | null = gl.createShader(gl.FRAGMENT_SHADER);

        // 生成されたシェーダにソースを割り当てる
        gl.shaderSource(shader, script);

        // シェーダをコンパイルする
        gl.compileShader(shader);

        // シェーダが正しくコンパイルされたかチェック
        if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {

            // 成功していたらシェーダを返して終了
            return shader;
        } else {

            // 失敗していたらエラーログをアラートする
            Methods.showError(gl.getShaderInfoLog(shader));
            return null;
        }
    }

    /**
     * プログラムを作って返します。
     * @param {WebGLRenderingContext} gl
     * @param {WebGLShader} vs
     * @param {WebGLShader} fs
     * @returns {WebGLProgram}
     */
    public static createProgram(gl: WebGLRenderingContext, vs: WebGLShader, fs: WebGLShader): WebGLProgram | null {
        const program: WebGLProgram | null = gl.createProgram();

        gl.attachShader(program, vs);
        gl.attachShader(program, fs);

        gl.linkProgram(program);

        if (gl.getProgramParameter(program, gl.LINK_STATUS)) {

            gl.useProgram(program);

            return program;
        } else {
            Methods.showError(gl.getProgramInfoLog(program));
            return program;
        }
    }

    public static createVBO(gl: WebGLRenderingContext, data: number[]): WebGLBuffer | null {
        const vbo: WebGLBuffer | null = gl.createBuffer();

        gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);

        return vbo;
    }

    public static createIBO(gl: WebGLRenderingContext, data: number[]): WebGLBuffer | null {
        const ibo: WebGLBuffer | null = gl.createBuffer();

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int16Array(data), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

        return ibo;
    }

    public static setAttr(gl: WebGLRenderingContext, vbo: WebGLBuffer[], attl: number[], atts: number[]) {
        for (let i = 0; i < vbo.length; i++) {
            gl.bindBuffer(gl.ARRAY_BUFFER, vbo[i]);
            gl.enableVertexAttribArray(attl[i]);
            gl.vertexAttribPointer(attl[i], atts[i], gl.FLOAT, false, 0, 0);
        }
    }

    public static createTexture = (_gl: WebGLRenderingContext, width: number, height: number, format: number): WebGLTexture | null => {
        const texture: WebGLTexture | null = _gl.createTexture();

        _gl.bindTexture(_gl.TEXTURE_2D, texture);
        _gl.texImage2D(_gl.TEXTURE_2D, 0, _gl.RGBA, width, height, 0, _gl.RGBA, format, null);

        _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MAG_FILTER, _gl.NEAREST);
        _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MIN_FILTER, _gl.NEAREST);
        _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_WRAP_S, _gl.CLAMP_TO_EDGE);
        _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_WRAP_T, _gl.CLAMP_TO_EDGE);

        return texture;
    };


    /**
     * フレームバッファを生成
     * @param {WebGLRenderingContext} gl
     * @param {number} _width
     * @param {number} _height
     * @param {number} _format
     * @returns {frameBuffer, depthBuffer, texture}
     */
    public static createFrameBuffer(gl: WebGLRenderingContext, _width: number, _height: number, _format: number): {frameBuffer: WebGLFramebuffer | null, depthBuffer: WebGLRenderbuffer | null, texture: WebGLTexture | null} {

        const textureFormat: number = _format || gl.UNSIGNED_BYTE;

        // フレームバッファを生成してバインド
        const frameBuffer: WebGLFramebuffer | null = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);

        // 深度用レンダーバッファを生成してバインド
        const depthRenderBuffer: WebGLRenderbuffer | null = gl.createRenderbuffer();
        gl.bindRenderbuffer(gl.RENDERBUFFER, depthRenderBuffer);

        // レンダーバッファを深度用に設定
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, _width, _height);

        // フレームバッファにレンダーバッファをひもづける
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthRenderBuffer);

        // 空のテクスチャの生成
        const fTexture: WebGLTexture | null = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, fTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, _width, _height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

        // フレームバッファにテクスチャを関連づける
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, fTexture, 0);

        // バインドしたものを解放
        gl.bindTexture(gl.TEXTURE_2D, null);
        gl.bindRenderbuffer(gl.RENDERBUFFER, null);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);

        return {frameBuffer, depthBuffer: depthRenderBuffer, texture: fTexture};
    }

    public static setUniform(gl: WebGLRenderingContext, _uniTypes: string[], _uniLocation: WebGLUniformLocation[], _values: any[]): void {
        for (let i = 0; i < _uniTypes.length; i++) {
            switch (_uniTypes[i]) {
                case GLConfig.UNIFORM_TYPE_MATRIX4:
                    gl.uniformMatrix4fv(_uniLocation[i], false, _values[i]);
                    break;
                case GLConfig.UNIFORM_TYPE_VECTOR4:
                    gl.uniform4fv(_uniLocation[i], _values[i]);
                    break;
                case GLConfig.UNIFORM_TYPE_VECTOR3:
                    gl.uniform3fv(_uniLocation[i], _values[i]);
                    break;
                case GLConfig.UNIFORM_TYPE_VECTOR2:
                    gl.uniform2fv(_uniLocation[i], _values[i]);
                    break;
                case GLConfig.UNIFORM_TYPE_VECTOR1:
                    gl.uniform1fv(_uniLocation[i], _values[i]);
                    break;
                case GLConfig.UNIFORM_TYPE_FLOAT:
                    gl.uniform1f(_uniLocation[i], _values[i]);
                    break;
                case GLConfig.UNIFORM_TYPE_INT_VECTOR:
                    gl.uniform1iv(_uniLocation[i], _values[i]);
                    break;
                case GLConfig.UNIFORM_TYPE_INT:
                    gl.uniform1i(_uniLocation[i], _values[i]);
                    break;
                case GLConfig.UNIFORM_TYPE_MATRIX3:
                    gl.uniformMatrix3fv(_uniLocation[i], false, _values[i]);
                    break;
                case GLConfig.UNIFORM_TYPE_MATRIX2:
                    gl.uniformMatrix2fv(_uniLocation[i], false, _values[i]);
                    break;
                default :
                    Methods.showError('unknown uniform types');
                    break;
            }
        }
    }
}
