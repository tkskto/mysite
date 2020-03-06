export const WaterVS = `
void main() {
    gl_Position = vec4(position, 1.0);;
}
`.trim();
export const WaterFS = `
uniform vec2 resolution;
uniform float time;
#define PI 3.14159265359
#define PHI 1.61803398875

float sinStep(float x, float w) {
    float y = (x+(1./w)*sin(w*x));
    return y;
}

float fibonacciHash(float x) {
    return mod((1./PHI)*x,1.);
}

float cosInterp(float x, float p0, float p1) {
    return p0+(p1-p0)*0.5*(1.-cos(PI*fract(x)));
}

float linInterp(float x, float p0, float p1) {
    return p0+(p1-p0)*fract(x);
}

float distanceDet(vec2 p) {
    float d0 = distance(vec2(-1.,1.), p.xy),
          d1 = distance(vec2(1.,1.), p.xy),
          d2 = distance(vec2(-1.,1.), p.xy),
          d3 = distance(vec2(-1.,-1.), p.xy);
    mat2 m0 = mat2(d0, d1, d2, d3);
    
    return determinant(m0);
}

float fHashNoiseF(float x) {
    // integer part of coordinates
    float x_i = floor(x);
    
    // hash
    float x0 = fibonacciHash(x_i),
          x1 = fibonacciHash(x_i+1.);
    
    float fx = cosInterp(x, x0, x1);
    return fx;
}

void main()
{
    // Normalized pixel coordinates (from -1 to 1)
    vec2 uv = (-1.+2.*(gl_FragCoord.xy/resolution.xy))*(resolution.xy/resolution.xx);
    float r = distance(vec2(0.0),uv.xy);
    float theta = atan(uv.y/uv.x);
    float x_co = fHashNoiseF(8.*(distanceDet(uv.xy-2.))+4.*sinStep(time/8.,PI));
    float y_co = fHashNoiseF(8.*(distanceDet(uv.yx-2.))+4.*sinStep(time/8.+0.5,PI));
    
    float sum = 0.;
    float a = 0.;
    vec3 col = vec3(0.);
    for(float i = 1.; i < 128.; i++) {
        a = exp2(-(i-1.)*0.5);
        sum += a;
        col += a*cos(i*PI*cos(PI*(2.*r-time/4.+0.5*(x_co+y_co)*(1.+exp2(-6.+(r*r))*vec3(0.,0.5,1.)))));
    }
    col = 0.5*(1.+col)/sum;
 
    // Output to screen
    gl_FragColor = vec4(col,1.0);
}`.trim();
