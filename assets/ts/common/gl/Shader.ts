import { GLUtils } from '../../Utils';

export class Shader {

    private readonly _vertexString: string;
    private readonly _fragmentString: string;
    private _VS: WebGLShader;
    private _FS: WebGLShader;

    constructor(public _gl: WebGLRenderingContext, _vs: string, _fs: string) {
        this._vertexString = _vs;
        this._fragmentString = _fs;
    }

    public compile = () => {
        this._VS = GLUtils.createVertexShader(this._vertexString, this._gl) as WebGLShader;
        this._FS = GLUtils.createFragmentShader(this._fragmentString, this._gl) as WebGLShader;
    };

    get vertexString(): string {
        return this._vertexString;
    }

    get fragmentString(): string {
        return this._fragmentString;
    }

    get VS(): WebGLShader {
        return this._VS;
    }
    get FS(): WebGLShader {
        return this._FS;
    }
}
