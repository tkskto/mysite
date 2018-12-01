import { Default } from './Shader';
import { Plane } from '../common/plane/Plane';
import {WebGLContext} from '~/assets/ts/common/gl/Context';

export class Item13 extends Plane {
    constructor(_store: any, _canvas: HTMLCanvasElement, _id: string) {
        const ctx = new WebGLContext(_store, _canvas);
        super(_store, _canvas, _id, new Default(ctx.ctx), ctx);
    }
}
