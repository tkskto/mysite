import {Sketch} from '../common/Sketch';
import Default from './Shader';
import WebGLContext from '../../../common/gl/Context';
import Renderer from '../../../common/gl/Renderer';
import Geometry from '../../../common/gl/Geometry';
import Mesh from '../../../common/gl/Mesh';
import Program from '../../../common/gl/Program';
import { GLConfig } from '../../../common/Config';
import Plane from '../../utils/Plane';
import {useMousePosition} from '~/composables/useMousePosition';
import {usePracticeShader} from '~/composables/usePracticeShader';
import {useScreenSize} from '~/composables/useScreenSize';
import {createTexture} from '~/assets/ts/common/GLUtils';

const {updateVertexShader, updateFragmentShader} = usePracticeShader();
const {canvasSize} = useScreenSize();
const {mousePosition, startMouseTracking, stopMouseTracking} = useMousePosition();

export default class Item11 extends Sketch {

    private _data: Plane = new Plane();
    private _ctx!: WebGLContext;
    private _gl!: WebGLRenderingContext;
    private _default!: Program;
    private _renderer!: Renderer;
    private _mesh!: Mesh;

    constructor(private _canvas: HTMLCanvasElement, _id: string) {
        super(_id);
    }

    public setup = async (): Promise<void> => {
        this._ctx = new WebGLContext(this._canvas);
        this._gl = this._ctx.ctx;
        this.clear();
        const shader = new Default(this._gl);
        this._default = new Program(this._gl, shader,
            ['position', 'color', 'normal', 'uv'],
            [3, 4, 3, 2],
            ['mvpMatrix', 'resolution', 'tex1', 'tex2', 'mouse'],
            [
                GLConfig.UNIFORM_TYPE_MATRIX4,
                GLConfig.UNIFORM_TYPE_VECTOR2,
                GLConfig.UNIFORM_TYPE_TEXTURE,
                GLConfig.UNIFORM_TYPE_TEXTURE,
                GLConfig.UNIFORM_TYPE_VECTOR2,
            ]
        );
        this._renderer = new Renderer(this._ctx);

        const plane: Geometry = new Geometry(this._gl, this._data).init();
        this._mesh = new Mesh(this._gl, this._default, plane, GLConfig.DRAW_TYPE_TRIANGLE);
        this._renderer.add(this._mesh);

        updateVertexShader(shader.vertexString);
        updateFragmentShader(shader.fragmentString);
        startMouseTracking();

        const texture1 = await createTexture('/assets/img/practice/11_1.jpg', this._gl, this._gl.UNSIGNED_BYTE);
        const texture2 = await createTexture('/assets/img/practice/11_2.jpg', this._gl, this._gl.UNSIGNED_BYTE);

        this._mesh.addTexture(texture1);
        this._mesh.addTexture(texture2);

        this.play();
    };

    public clear = (): void => {
        this._gl.clearColor(1.0, 1.0, 1.0, 1.0);
        this._gl.clearDepth(1.0);
        this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);
    };

    public dispose = (): void => {
        this.pause();

        stopMouseTracking();

        if (this._mesh) {
            this._mesh.dispose();
        }

        if (this._renderer) {
            this._renderer.dispose();
        }
    };

    public update = (): void => {
        this.animate();
        this._timer = requestAnimationFrame(this.update);
    };

    public animate = (): void => {
        this.clear();
        this._renderer.update([canvasSize.width, canvasSize.height], 0, 1, [mousePosition.x, mousePosition.y]);
    };
}
