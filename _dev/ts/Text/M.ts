module text {
    export class W {
        constructor(_gl:WebGLRenderingContext) {
            let VERTEX = [
                0.0,   0.0, 0.0,
                1.0,   0.0, 0.0,
                1.0,  -4.0, 0.0,
                2.0,  -3.0, 0.0,
                2.5, -4.0, 0.0,
                3.0,   0.0, 0.0,
                3.5,  -1.5, 0.0,
                4.0,   0.0, 0.0,
                4.5, -4.0, 0.0,
                5.0,  -3.0, 0.0,
                6.0,  -4.0, 0.0,
                6.0,   0.0, 0.0,
                7.0,   0.0, 0.0
            ];

            let INDEX = [
                0,   1,  2,
                1,   3,  2,
                2,   3,  4,
                3,   5,  4,
                4,   5,  6,
                5,   7,  6,
                6,   7,  8,
                7,   9,  8,
                8,   9, 10,
                9,  11, 10,
                10, 11, 12
            ];
        }
    }
}