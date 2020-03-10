export const ParticleVS = `
attribute float alpha;
varying float vAlpha;

uniform float time;
uniform float size;

void main() {
    vAlpha = alpha;
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    gl_PointSize = (size + (sin(radians(time * 2.0)) * 10.0 - 10.0));
    gl_Position = projectionMatrix * mvPosition;
}
`.trim();

export const ParticleFS = `
uniform sampler2D tex;

varying float vAlpha;

void main() {
    gl_FragColor = vec4( vec3(1.0), vAlpha ) * texture(tex, gl_PointCoord);
}
`.trim();
