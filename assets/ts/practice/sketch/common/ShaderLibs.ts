export default {
    HALF_PI: `1.57079632679`,
    PI: `3.14159265358979323846`,
    TWO_PI: `6.28318530718`,
    // ぼかしたボーダー
    smoothBorder: `
        float smoothBorder(in float weight, in vec2 st) {
            vec2 lb = smoothstep(vec2(0.1), vec2(0.1 * sin(time) + 0.2), st);
            vec2 tr = smoothstep(vec2(0.1), vec2(0.1 * sin(time) + 0.2), 1.0 - st);
            return lb.x * lb.y * tr.x * tr.y;
        }
    `.trim(),

    // クリアなボーダー
    clearBorder: `
        float clearBorder(in float weight, in vec2 st) {
            vec2 lb = step(vec2(0.1), st);
            vec2 tr = step(vec2(0.1), 1.0 - st);
            return lb.x * lb.y * tr.x * tr.y;
        }
    `.trim(),

    // x座標をもとに縦線を引く
    verticalLine: `
        float verticalLine(in float start, in float weight, in float x) {
        return step(start, x) - step(start + weight, x);
    }
    `.trim(),

    // y座標をもとに横線を引く
    horizontalLine: `
        float horizontalLine(in float start, in float weight, in float y) {
            return step(start, y) - step(start + weight, y);
        }
    `.trim(),

    /**
     * 中心を原点として矩形を描く
     * @param _st 対象のピクセル座標
     * @param _size 矩形の大きさ
     * @param _smoothEdges 輪郭のボケ具合
     */
    rect: `
        float rect(vec2 _st, vec2 _size, float _smoothEdges){
            _size = vec2(0.5) - _size * 0.5; // 中心を原点にする
            vec2 aa = vec2(_smoothEdges * 0.5); // ボケ具合の調整
            vec2 uv = smoothstep(_size, _size + aa, _st); // border-left, border-bottom
            uv *= smoothstep(_size,_size+aa,vec2(1.0)-_st); // border-top, border-right
            return uv.x*uv.y; // xとyをかけることで、0か1かにする
        }
    `.trim(),

    /**
     * 円を描く
     * @param center 中心の座標
     * @param radius 半径
     * @param 現在の座標
     */
    circle: `
        float circle(in vec2 center, in float radius, in vec2 st) {
            return step(length(st - center), radius);
        }
    `.trim(),

    /**
     * ハートを描く
     * @param p 現在の座標
     * @param r 半径
     */
    heart: `
        float heart(in vec2 p, in float r) {
            float y = (p.y * 1.2 - abs(p.x) * sqrt((20.0 - abs(p.x)) / 50.0));
            return p.x * p.x + y * y - r;
        }
    `.trim(),

    /**
     * 回転させる
     * @param _st 座標
     * @param _angle 回転させる角度
     */
    rotate: `
        vec2 rotate2D(in vec2 _st, in float _angle){
            _st -= 0.5;
            _st = mat2(cos(_angle), -sin(_angle), sin(_angle), cos(_angle)) * _st;
            _st += 0.5;
            return _st;
        }
    `.trim(),
    noise: 'https://github.com/ashima/webgl-noise/tree/master/src',

};
