export const ParticleVS = `
void main() {
    gl_Position = vec4(position, 1.0);;
}
`.trim();

export const ParticleFS = `
uniform float time;
uniform vec2 resolution;
uniform sampler2D audio;

void main() {
    vec2 tuv = gl_FragCoord.xy / resolution.xy;
    vec2 uv = gl_FragCoord.xy / resolution.yy-vec2(.9,.5);
    vec3 colorize = vec3(.2);
    
    for (float i = .0; i< 1.0; i+=.05) {
        colorize[int(i * 5.0)] += texture(audio, vec2(i,0.0)).y * pow(i+.5,.9);
    }
    
    colorize = normalize(colorize);
    float boost = texture(audio,vec2(.0)).x;
    float power = pow(boost,2.0);
    
    vec3 color = vec3(.0);
    vec2 buv = uv*(1.0+power*power*power);
    buv += vec2(pow(power,12.0)*.1,time*.05);
    
    vec2 blocks = mod(buv, vec2(.1))-vec2(.05);
    vec2 blocksid = sin((buv - mod(buv,vec2(.1)))*412.07);
    float blockint = texture(audio, blocksid,-48.0).y;
    float oint = blockint = - texture(audio,vec2(blockint-.02,.0)).x+2.0*texture(audio,vec2(blockint,.0)).x - texture(audio,vec2(blockint+.02,.0)).x;
    blockint = pow(blockint*blockint,2.80)*111.0;
    blockint = 1.0;
    color += 2.0 * blockint * max(.0, min(1.0, (oint * 0.05 - max(abs(blocks.x),abs(blocks.y))) * 100.0)) * colorize;
    
    gl_FragColor = vec4(color,1.0);
}`.trim();
