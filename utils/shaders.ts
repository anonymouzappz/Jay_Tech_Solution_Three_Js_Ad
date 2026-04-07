export const vertexShader = `
    precision mediump float;
    precision mediump int;

    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;

    attribute vec3 position;
    attribute vec3 normal;
    attribute vec2 uv;

    varying vec2 vUv;

    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

export const fragmentShader = `
    precision mediump float;
    precision mediump int;

    struct Layer {
        sampler2D colorMap;
        vec2 flowDirection;
        float flowSpeed;
        vec2 repeat;
    };

    uniform Layer textureLayer01;
    uniform Layer textureLayer02;
    uniform float time;

    varying vec2 vUv;

    vec2 offsetUV(vec2 uv, vec2 direction, float flowSpeed, vec2 repeat) {
        vec2 dir = normalize(direction);
        return vec2(
            uv.x * repeat.x - dir.x * flowSpeed * time,
            uv.y * repeat.y - dir.y * flowSpeed * time
        );
    }

    void main() {
        vec2 flow01 = offsetUV(
            vUv,
            textureLayer01.flowDirection,
            textureLayer01.flowSpeed,
            textureLayer01.repeat
        );

        vec2 flow02 = offsetUV(
            vUv,
            textureLayer02.flowDirection,
            textureLayer02.flowSpeed,
            textureLayer02.repeat
        );

        vec4 layer01 = texture2D(textureLayer01.colorMap, flow01);
        vec4 layer02 = texture2D(textureLayer02.colorMap, flow02);

        /* soften brightness */
        layer01.rgb *= 0.35;
        layer02.rgb *= 0.25;

        /* combine without blowing out highlights */
        vec3 color = mix(layer01.rgb, layer02.rgb, 0.45) + (layer01.rgb * layer02.rgb * 0.6);

        /* keep effect subtle and transparent */
        float alpha = (layer01.a * 0.22) + (layer02.a * 0.16);

        gl_FragColor = vec4(color, alpha);
    }
`;