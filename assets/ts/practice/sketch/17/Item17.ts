import Default from './Shader';
import WebGLContext from '../../../common/gl/Context';
import Plane from '../../../common/gl/plane/Plane';

export default class Item17 extends Plane {
    constructor(_canvas: HTMLCanvasElement, _id: string) {
        const ctx = new WebGLContext(_canvas);
        super(_canvas, _id, new Default(ctx.ctx), ctx);
    }
}
