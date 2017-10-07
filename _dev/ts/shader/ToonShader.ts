export class ToonShader {

    private _vs:string;
    private _fs:string;

    constructor() {

        this._vs = [
            'uniform bool edge;',
            'varying vec3 vNormal;',
            'void main(void) {',
                'vec3 pos = position;',
                'if (edge) {',
                    'pos += normal * 0.10;',
                '}',
                'vNormal = normal;',
                'gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);',
            '}'
        ].join('');

        this._fs = [
            'precision mediump float;',
            'uniform vec3 lightDirection;',
            'uniform sampler2D texture;',
            'uniform vec4 edgeColor;',
            'varying vec3 vNormal;',
            'void main(void) {',
                'if (edgeColor.a > 0.0) {',
                    'gl_FragColor = edgeColor;',
                '} else {',
                    'float diffuse = clamp(dot(vNormal, lightDirection), 0.0, 1.0);',
                    'vec4 smpColor = texture2D(texture, vec2(diffuse, 0.0));',
                    'gl_FragColor = smpColor;',
                '}',
            '}'
        ].join('');

    }

    get vs(): string {
        return this._vs;
    }

    get fs(): string {
        return this._fs;
    }
}