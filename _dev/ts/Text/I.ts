///<reference path="../data/Geometry.ts" />

module text {
    export class I extends data.Geometry {
        constructor(_gl:WebGLRenderingContext) {
            super(_gl);
            this.VERTEX = [
                0.0,  0.0, 0.0,
                3.0,  0.0, 0.0,
                0.0, -1.0, 0.0,
                3.0, -1.0, 0.0,
                1.0, -1.0, 0.0,
                2.0, -1.0, 0.0,
                1.0, -3.0, 0.0,
                2.0, -3.0, 0.0,
                0.0, -3.0, 0.0,
                3.0, -3.0, 0.0,
                0.0, -4.0, 0.0,
                3.0, -4.0, 0.0
            ];

            this.INDEX = [
                0, 1, 2,
                1, 3, 2,
                4, 5, 6,
                5, 7, 6,
                8, 9, 10,
                9, 11, 10
            ];

            this.NORMAL = VertexUtils.getFaceNormalArr(this.VERTEX, this.INDEX);

            this.init();
        }
    }
}