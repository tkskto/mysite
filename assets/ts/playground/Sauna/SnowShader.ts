export const SnowVS = `
attribute vec4 a_color;
attribute vec3 a_rotation;
attribute vec3 a_speed;
attribute float a_size;

uniform float u_time;
uniform vec2 u_mousemove;
uniform vec2 u_resolution;
uniform mat4 u_projection;
uniform vec3 u_worldSize;
uniform float u_gravity;
uniform float u_wind;

varying vec4 v_color;
varying float v_rotation;

void main() {
    v_color = a_color;
    v_rotation = a_rotation.x + u_time * a_rotation.y;
    
    vec3 pos = position.xyz;
    
    pos.x = mod(pos.x + u_time + u_wind * a_speed.x, u_worldSize.x * 2.0) - u_worldSize.x;
    pos.y = mod(pos.y - u_time * a_speed.y * u_gravity, u_worldSize.y * 2.0) - u_worldSize.y;
    
    pos.x += sin(u_time * a_speed.z) * a_rotation.z;
    pos.z += cos(u_time * a_speed.z) * a_rotation.z;
    
    gl_Position = u_projection * vec4( pos.xyz, position.w );
    gl_PointSize = ( a_size / gl_Position.w ) * 100.0;
    gl_Position = vec4(position, 1.0);
}
`.trim();

export const SnowFS = `
uniform sampler2D map;
varying vec4 v_color;
varying float v_rotation;

void main() {

  vec2 rotated = vec2(
    cos(v_rotation) * (gl_PointCoord.x - 0.5) + sin(v_rotation) * (gl_PointCoord.y - 0.5) + 0.5,
    cos(v_rotation) * (gl_PointCoord.y - 0.5) - sin(v_rotation) * (gl_PointCoord.x - 0.5) + 0.5
  );

  vec4 snowflake = texture2D(u_texture, rotated);

  gl_FragColor = vec4(snowflake.rgb, snowflake.a * v_color.a);
}
`.trim();
