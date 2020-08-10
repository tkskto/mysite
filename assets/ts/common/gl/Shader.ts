import { GLUtils } from '../Utils';

export default class Shader {
    private readonly _vertexString: string;
    private readonly _fragmentString: string;
    private _VS!: WebGLShader;
    private _FS!: WebGLShader;
    private _compiled = false;

    /**
     * please extend this class. do not run constructor direct.
     * @param _gl
     * @param _vs
     * @param _fs
     */
    constructor(public _gl: WebGLRenderingContext, _vs: string, _fs: string) {
        this._vertexString = _vs;
        this._fragmentString = _fs;
    }

    public compile = (): Shader => {
        this._compiled = true;
        this._VS = GLUtils.createVertexShader(this._vertexString, this._gl) as WebGLShader;
        this._FS = GLUtils.createFragmentShader(this._fragmentString, this._gl) as WebGLShader;

        return this;
    };

    get vertexString(): string {
        return this._vertexString;
    }

    get fragmentString(): string {
        return this._fragmentString;
    }

    get VS(): WebGLShader {
        if (!this._compiled) {
            throw new Error('do compile with [compile] method before use WebGLShader.');
        }
        return this._VS;
    }
    get FS(): WebGLShader {
        if (!this._compiled) {
            throw new Error('do compile with [compile] method before use WebGLShader.');
        }
        return this._FS;
    }
}
