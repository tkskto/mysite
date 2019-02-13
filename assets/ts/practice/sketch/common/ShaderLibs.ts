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
    noise3d: `
        vec3 mod289(vec3 x) {
            return x - floor(x * (1.0 / 289.0)) * 289.0;
        }
        
        vec4 mod289(vec4 x) {
            return x - floor(x * (1.0 / 289.0)) * 289.0;
        }
        
        vec4 permute(vec4 x) {
            return mod289(((x*34.0)+1.0)*x);
        }
        
        vec4 taylorInvSqrt(vec4 r)
        {
            return 1.79284291400159 - 0.85373472095314 * r;
        }
        
        float snoise(vec3 v)
        {
            const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
            const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
        
            // First corner
            vec3 i  = floor(v + dot(v, C.yyy) );
            vec3 x0 =   v - i + dot(i, C.xxx) ;
        
            // Other corners
            vec3 g = step(x0.yzx, x0.xyz);
            vec3 l = 1.0 - g;
            vec3 i1 = min( g.xyz, l.zxy );
            vec3 i2 = max( g.xyz, l.zxy );
        
            //   x0 = x0 - 0.0 + 0.0 * C.xxx;
            //   x1 = x0 - i1  + 1.0 * C.xxx;
            //   x2 = x0 - i2  + 2.0 * C.xxx;
            //   x3 = x0 - 1.0 + 3.0 * C.xxx;
            vec3 x1 = x0 - i1 + C.xxx;
            vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
            vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y
        
            // Permutations
            i = mod289(i);
            vec4 p = permute( permute( permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
        
            // Gradients: 7x7 points over a square, mapped onto an octahedron.
            // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
            float n_ = 0.142857142857; // 1.0/7.0
            vec3  ns = n_ * D.wyz - D.xzx;
        
            vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)
        
            vec4 x_ = floor(j * ns.z);
            vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)
        
            vec4 x = x_ *ns.x + ns.yyyy;
            vec4 y = y_ *ns.x + ns.yyyy;
            vec4 h = 1.0 - abs(x) - abs(y);
        
            vec4 b0 = vec4( x.xy, y.xy );
            vec4 b1 = vec4( x.zw, y.zw );
        
            //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
            //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
            vec4 s0 = floor(b0)*2.0 + 1.0;
            vec4 s1 = floor(b1)*2.0 + 1.0;
            vec4 sh = -step(h, vec4(0.0));
        
            vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
            vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
        
            vec3 p0 = vec3(a0.xy,h.x);
            vec3 p1 = vec3(a0.zw,h.y);
            vec3 p2 = vec3(a1.xy,h.z);
            vec3 p3 = vec3(a1.zw,h.w);
        
            //Normalise gradients
            vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
            p0 *= norm.x;
            p1 *= norm.y;
            p2 *= norm.z;
            p3 *= norm.w;
        
            // Mix final noise value
            vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
            m = m * m;
            return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
        }
    `.trim(),
    noise: 'https://github.com/ashima/webgl-noise/tree/master/src',

};
