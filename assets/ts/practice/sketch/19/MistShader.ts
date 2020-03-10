export const MistVS = `
void main() {
    gl_Position = vec4(position, 1.0);;
}
`.trim();

export const MistFS = `
uniform vec2 resolution;
uniform float time;
uniform float decay;
uniform float scene;
uniform float variable;
uniform vec2 mouse;

#define PI 3.1415

float hash( float n )
{
    return fract(sin(n)*43758.5453);
}
// mat2 m = mat2( 1.,  0., 0.,  1. );
mat2 m = mat2( 0.8,  0.6, -0.6,  0.8 );

float noise( in vec2 x )
{
    vec2 p = floor(x);
    vec2 f = fract(x);

    f = f*f*(3.0-2.0*f);

    float n = p.x + p.y*57.0;

    float res = mix(mix( hash(n+  0.0), hash(n+  1.0),f.x),
                    mix( hash(n+ 57.0), hash(n+ 58.0),f.x),f.y);
    return res;
}

float fbm(vec2 p){
    float f = 0.;
    f +=0.50000*abs(noise(p)-1.)*2.;p*=m*2.02;
    f +=0.25000*abs(noise(p)-1.)*2.;p*=m*2.03;
    f +=0.12500*abs(noise(p)-1.)*2.;p*=m*2.01;
    f +=0.06250*abs(noise(p)-1.)*2.;p*=m*2.0;
    f +=0.03125*abs(noise(p)-1.)*2.;
    return f/0.96875;
}

void main()
{
    vec2 q = gl_FragCoord.xy / resolution.xy;
    vec2 p = 2.*q-1.0;
    float r = length(p);
    p.x *= resolution.x/resolution.y;
    float f;
    if (scene == 0.0) {
        f = fbm(p + time) * sin(time);
    } else if (scene == 1.0) {
        f = fbm(p + time * decay) * cos(2.0 * PI);
    } else if (scene == 2.0) {
        f = fbm(p * time);
    }
    f *= r*3.-0.5;
    f = (1.-f);
    vec3 col = vec3(0.2,0.3,0.5)/f;
    
    col *= variable;

    gl_FragColor = vec4(sqrt(abs(col))*0.5,1.0);
}
`.trim();
