import { GLUtils } from '../Utils';

export class Shader {

    private _vertexString: string;
    private _fragmentString: string;
    private _VS: WebGLShader;
    private _FS: WebGLShader;

    constructor(public _gl: WebGLRenderingContext, _vs: string, _fs: string) {
        this._vertexString = _vs;
        this._fragmentString = _fs;
    }

    public compile = () => {
        this._VS = GLUtils.createVertexShader(this._vertexString, this._gl);
        this._FS = GLUtils.createFragmentShader(this._fragmentString, this._gl);
    };

    get VS(): WebGLShader {
        return this._VS;
    }
    get FS(): WebGLShader {
        return this._FS;
    }
}
