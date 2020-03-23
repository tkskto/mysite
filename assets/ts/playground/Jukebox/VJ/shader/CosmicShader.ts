export const CosmicVS = `
void main() {
    gl_Position = vec4(position, 1.0);;
}
`.trim();

export const CosmicFS = `
uniform float time;
uniform vec2 resolution;
uniform sampler2D audio;
uniform float decay;

#define NUM_LAYERS 3.

mat2 Rot(float a) {
    float s=sin(a), c=cos(a);
    return mat2(c,-s,s,c);
}

float Star(vec2 uv, float a, float sparkle) {
    vec2 av1 = abs(uv);
    vec2 av2 = abs(uv*Rot(a));
    vec2 av = min(av1, av2);
    
    vec3 col = vec3(0);
    float d = length(uv);
    float star = av1.x*av1.y;
    star = max(av1.x*av1.y, av2.x*av2.y);
    star = max(0., 1.-star*1e3);
    
    float m = min(5., 1e-2/d);
    
    return m+pow(star, 4.)*sparkle;
}

float Hash21(vec2 p) {
    p = fract(p*vec2(123.34,145.54));
    p += dot(p, p+45.23);
    return fract(p.x*p.y);
}

vec3 StarLayer(vec2 uv, float t, float sparkle) {
    vec2 gv = fract(uv)-.5;
    vec2 id = floor(uv);
    vec3 col = vec3(0);
    
    for(int y=-1; y<=1; y++) {
        for(int x=-1; x<=1; x++) {
            vec2 offs = vec2(x, y);
            float n = Hash21(id-offs);
            vec3 N = fract(n*vec3(10,100,1000));
            vec2 p = (N.xy-.5)*.7;
            
            float brightness = Star(gv-p+offs, n*6.2831+t, sparkle);
            vec3 star = brightness*vec3(.6+p.x, .4, .6+p.y)*N.z*N.z;
            
            star *= 1.+sin((t+n)*20.)*smoothstep(sin(t)*.5+.5, 1., fract(10.*n));
            
            float d = length(gv+offs);
            
            col += star*smoothstep(1.5, .8, d);
        }
    }
    return col;
}

void main()
{
    vec2 uv = (gl_FragCoord.xy-.5*resolution.xy)/resolution.y;
    
    float t = -time*.3;
    
    float twirl = sin(t*.1);
    twirl *= twirl*twirl*sin(dot(uv,uv));
    uv *= Rot(-t*.2);
    
    uv *= 2.+sin(t*.05);
    
    vec3 col = vec3(0);
    float speed = -.2;
    
    float stp = 1./NUM_LAYERS;
        
    for(float i=0.; i<1.; i+=stp) {
        float lt = fract(t*speed+i);
        float scale = mix(10., .25, lt);
        float fade = smoothstep(0., .4, lt)*smoothstep(1., .95, lt); 
        vec2 sv = uv*scale+i*134.53;
        //sv.x += t;
        col += StarLayer(sv, t, fade)*fade;
    }
    
    gl_FragColor = vec4(col*decay, 1.0);
}`.trim();
