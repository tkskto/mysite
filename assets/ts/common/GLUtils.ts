import {GLConfig} from './Config';
import {showError} from './Methods';

/**
 * 頂点シェーダをつくります。
 * @param {string} script シェーダ文字列
 * @param {WebGLRenderingContext} gl WebGLレンダリングコンテキスト
 * @returns {WebGLShader}
 */
export const createVertexShader = (script: string, gl: WebGLRenderingContext): WebGLShader | null => {
    const shader: WebGLShader = gl.createShader(gl.VERTEX_SHADER) as WebGLShader;

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
        showError(gl.getShaderInfoLog(shader));
    }

    return null;
}

/**
 * フラグメントシェーダをつくります。
 * @param {string} script シェーダ文字列
 * @param {WebGLRenderingContext} gl WebGLレンダリングコンテキスト
 * @returns {WebGLShader}
 */
export const createFragmentShader = (script: string, gl: WebGLRenderingContext): WebGLShader | null => {
    const shader: WebGLShader = gl.createShader(gl.FRAGMENT_SHADER) as WebGLShader;

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
        showError(gl.getShaderInfoLog(shader));
    }

    return null;
}

/**
 * プログラムを作って返します。
 * @param {WebGLRenderingContext} gl
 * @param {WebGLShader} vs
 * @param {WebGLShader} fs
 * @returns {WebGLProgram}
 */
export const createProgram = (gl: WebGLRenderingContext, vs: WebGLShader, fs: WebGLShader): WebGLProgram | null => {
    const program: WebGLProgram = gl.createProgram() as WebGLProgram;

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);

    gl.linkProgram(program);

    if (gl.getProgramParameter(program, gl.LINK_STATUS)) {

        gl.useProgram(program);

        return program;
    } else {
        showError(gl.getProgramInfoLog(program));
    }

    return null;
}

export const createVBO = (gl: WebGLRenderingContext, data: number[]): WebGLBuffer | null => {
    const vbo: WebGLBuffer = gl.createBuffer() as WebGLBuffer;

    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    return vbo;
}

export const createIBO = (gl: WebGLRenderingContext, data: number[]): WebGLBuffer | null => {
    const ibo: WebGLBuffer = gl.createBuffer() as WebGLBuffer;

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int16Array(data), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    return ibo;
}

export const setAttr = (gl: WebGLRenderingContext, vbo: WebGLBuffer[], attl: number[], atts: number[]): void => {
    for (let i = 0; i < vbo.length; i++) {
    if (attl[i] === undefined || atts[i] === undefined) {
        throw new Error(`${vbo[i]} is invalid. check ${attl[i]},  ${atts[i]}`);
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo[i]);
    gl.enableVertexAttribArray(attl[i]);
    gl.vertexAttribPointer(attl[i], atts[i], gl.FLOAT, false, 0, 0);
}
}

export const createTexture = (src: string, _gl: WebGLRenderingContext, format: number): Promise<WebGLTexture> => {
    return new Promise<WebGLTexture>((resolve: (value: WebGLTexture) => void, reject: (err: any) => void) => {
        const img = new Image();

        img.addEventListener('load', () => {
            const texture = createWebGLTexture(img, _gl, format);

            resolve(texture);
        });

        img.addEventListener('error', (err) => {
            reject(err);
        });

        img.src = src;
    });
};

export const createAudioTexture = (_gl: WebGLRenderingContext, numSamples: number, _data: Uint8Array): WebGLTexture => {
    const texture: WebGLTexture = _gl.createTexture() as WebGLTexture;

    _gl.bindTexture(_gl.TEXTURE_2D, texture);
    _gl.pixelStorei(_gl.UNPACK_ALIGNMENT, 1);
    _gl.texImage2D(_gl.TEXTURE_2D, 0, _gl.LUMINANCE, numSamples * 0.5, 2, 0, _gl.LUMINANCE, _gl.UNSIGNED_BYTE, _data);

    _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MIN_FILTER, _gl.NEAREST);
    _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MAG_FILTER, _gl.NEAREST);
    _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_WRAP_S, _gl.CLAMP_TO_EDGE);
    _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_WRAP_T, _gl.CLAMP_TO_EDGE);

    _gl.bindTexture(_gl.TEXTURE_2D, null);

    return texture;
};

export const createWebGLTexture = (img: HTMLImageElement, _gl: WebGLRenderingContext, format: number): WebGLTexture => {
    const texture: WebGLTexture = _gl.createTexture() as WebGLTexture;

    _gl.bindTexture(_gl.TEXTURE_2D, texture);
    _gl.texImage2D(_gl.TEXTURE_2D, 0, _gl.RGBA, _gl.RGBA, format, img);

    _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MAG_FILTER, _gl.NEAREST);
    _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MIN_FILTER, _gl.NEAREST);
    _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_WRAP_S, _gl.CLAMP_TO_EDGE);
    _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_WRAP_T, _gl.CLAMP_TO_EDGE);

    // ミップマップを生成
    // gl.generateMipmap(gl.TEXTURE_2D);
    _gl.bindTexture(_gl.TEXTURE_2D, null);

    return texture;
};


export const createEmptyTexture = (_gl: WebGLRenderingContext, width: number, height: number, format: number): WebGLTexture => {
    const texture: WebGLTexture = _gl.createTexture() as WebGLTexture;

    _gl.bindTexture(_gl.TEXTURE_2D, texture);
    _gl.texImage2D(_gl.TEXTURE_2D, 0, _gl.RGBA, width, height, 0, _gl.RGBA, format, null);
    _gl.bindTexture(_gl.TEXTURE_2D, null);

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
 * @returns {frameBuffer, depthBuffer, texture}
 */
export const createFrameBuffer = (gl: WebGLRenderingContext, _width: number, _height: number): {frameBuffer: WebGLFramebuffer; depthBuffer: WebGLRenderbuffer; texture: WebGLTexture} => {
    // フレームバッファを生成してバインド
    const frameBuffer: WebGLFramebuffer = gl.createFramebuffer() as WebGLFramebuffer;
    gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);

    // 深度用レンダーバッファを生成してバインド
    const depthRenderBuffer: WebGLFramebuffer = gl.createRenderbuffer() as WebGLFramebuffer;
    gl.bindRenderbuffer(gl.RENDERBUFFER, depthRenderBuffer);

    // レンダーバッファを深度用に設定
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, _width, _height);

    // フレームバッファにレンダーバッファをひもづける
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthRenderBuffer);

    // 空のテクスチャの生成
    const fTexture: WebGLTexture = gl.createTexture() as WebGLTexture;
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

export const setUniform = (gl: WebGLRenderingContext, _uniType: string, _uniLocation: WebGLUniformLocation, _value: any): void => {
    try {
        switch (_uniType) {
        case GLConfig.UNIFORM_TYPE_MATRIX4:
            gl.uniformMatrix4fv(_uniLocation, false, _value);
            break;
        case GLConfig.UNIFORM_TYPE_VECTOR4:
            gl.uniform4fv(_uniLocation, _value);
            break;
        case GLConfig.UNIFORM_TYPE_VECTOR3:
            gl.uniform3fv(_uniLocation, _value);
            break;
        case GLConfig.UNIFORM_TYPE_VECTOR2:
            gl.uniform2fv(_uniLocation, _value);
            break;
        case GLConfig.UNIFORM_TYPE_VECTOR1:
            gl.uniform1fv(_uniLocation, _value);
            break;
        case GLConfig.UNIFORM_TYPE_FLOAT:
            gl.uniform1f(_uniLocation, _value);
            break;
        case GLConfig.UNIFORM_TYPE_INT_VECTOR:
            gl.uniform1iv(_uniLocation, _value);
            break;
        case GLConfig.UNIFORM_TYPE_AUDIO_TEXTURE:
        case GLConfig.UNIFORM_TYPE_TEXTURE:
        case GLConfig.UNIFORM_TYPE_INT:
            gl.uniform1i(_uniLocation, _value);
            break;
        case GLConfig.UNIFORM_TYPE_MATRIX3:
            gl.uniformMatrix3fv(_uniLocation, false, _value);
            break;
        case GLConfig.UNIFORM_TYPE_MATRIX2:
            gl.uniformMatrix2fv(_uniLocation, false, _value);
            break;
        default :
            showError('unknown uniform types');
            break;
        }
    } catch (err: unknown) {
        showError(`type: ${_uniType}`);
        showError(`value: ${_value}`);

        if (err instanceof Error) {
            showError(err.message);
        }
    }
}
