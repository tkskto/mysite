import { Default } from './Shader';
import { WebGLContext } from '../../../common/gl/Context';
import {Plane} from '../../../common/gl/plane/Plane';

export class Item1 extends Plane {
    constructor(_store: any, _canvas: HTMLCanvasElement, _id: string) {
        const ctx = new WebGLContext(_store, _canvas);
        super(_store, _canvas, _id, new Default(ctx.ctx), ctx);
    }
}
