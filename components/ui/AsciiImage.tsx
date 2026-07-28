"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const vertexShaderSource = `
  attribute vec2 a_position;
  attribute vec2 a_texCoord;
  varying vec2 v_texCoord;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_texCoord = a_texCoord;
  }
`;

const fragmentShaderSource = `
  precision mediump float;
  uniform sampler2D u_image;
  uniform vec2 u_resolution;
  uniform vec2 u_imageResolution;
  uniform float u_charSize;
  varying vec2 v_texCoord;

  float character(int n, vec2 p) {
    p = floor(p * vec2(4.0, -4.0) + 2.5);
    if (clamp(p.x, 0.0, 4.0) == p.x && clamp(p.y, 0.0, 4.0) == p.y) {
      if (int(mod(float(n) / exp2(p.x + 5.0 * p.y), 2.0)) == 1) return 1.0;
    }
    return 0.0;
  }

  void main() {
    vec2 ratio = u_resolution / u_imageResolution;
    float coverRatio = max(ratio.x, ratio.y);
    vec2 displaySize = u_imageResolution * coverRatio;
    vec2 displayOffset = (displaySize - u_resolution) * 0.5;

    float charSize = max(u_charSize, 2.0); 
    vec2 cell = floor(gl_FragCoord.xy / charSize);
    vec2 offset = mod(gl_FragCoord.xy, charSize) / charSize;
    
    vec2 fragCoordCenter = cell * charSize + charSize * 0.5;
    vec2 texCoord = (fragCoordCenter + displayOffset) / displaySize;
    texCoord = clamp(texCoord, 0.0, 1.0);
    
    vec4 color = texture2D(u_image, vec2(texCoord.x, 1.0 - texCoord.y));
    float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
    
    int n = 4096; // .
    if (gray > 0.2) n = 65600; // :
    if (gray > 0.3) n = 332772; // *
    if (gray > 0.4) n = 15255086; // o
    if (gray > 0.5) n = 23385164; // &
    if (gray > 0.6) n = 15252014; // 8
    if (gray > 0.7) n = 13199452; // @
    if (gray > 0.8) n = 11512810; // #
    
    float c = character(n, offset);
    gl_FragColor = vec4(color.rgb, c);
  }
`;

export interface AsciiImageProps {
  src?: string;
  width?: number;
  height?: number;
  className?: string;
  children?: React.ReactNode;
  mask?: string;
  baseMask?: string;
  charSize?: number;
}

export default function AsciiImage({
  src,
  width = 500,
  height = 500,
  className = "",
  children,
  mask = "linear-gradient(to bottom, black 20%, transparent 100%)",
  baseMask = "linear-gradient(to bottom, transparent 20%, black 100%)",
  charSize = 8.0,
}: AsciiImageProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(
      gl.FRAGMENT_SHADER,
      fragmentShaderSource,
    );

    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0,
      ]),
      gl.STATIC_DRAW,
    );

    const texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0,
      ]),
      gl.STATIC_DRAW,
    );

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const texCoordLocation = gl.getAttribLocation(program, "a_texCoord");
    gl.enableVertexAttribArray(texCoordLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);

    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    gl.uniform2f(resolutionLocation, canvas.width, canvas.height);

    const charSizeLocation = gl.getUniformLocation(program, "u_charSize");
    gl.uniform1f(charSizeLocation, charSize);

    const texture = gl.createTexture();
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = src || "https://picsum.photos/500/500";

    image.onload = () => {
      const imgResolutionLocation = gl.getUniformLocation(
        program,
        "u_imageResolution",
      );
      gl.uniform2f(imgResolutionLocation, image.width, image.height);

      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        image,
      );
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    return () => {
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(positionBuffer);
      gl.deleteBuffer(texCoordBuffer);
      gl.deleteTexture(texture);
    };
  }, [src, width, height, charSize]);

  const defaultImageSrc = src || "https://picsum.photos/500/500";

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ width, height }}
    >
      <img
        src={defaultImageSrc}
        alt=""
        className="absolute inset-0 z-0 block h-full w-full object-cover"
        style={{
          WebkitMaskImage: baseMask,
          maskImage: baseMask,
        }}
      />
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="pointer-events-none absolute inset-0 z-10 block h-full w-full object-cover"
        style={{
          WebkitMaskImage: mask,
          maskImage: mask,
        }}
      />
      <div className="relative z-20 h-full w-full">{children}</div>
    </div>
  );
}

/**
 * Great UI Component
 *
 * Built with React, TypeScript, Tailwind CSS, and Framer Motion.
 * Designed to be accessible, customizable, and production-ready.
 *
 * Website: https://great-ui.com
 * GitHub: https://github.com/Saurabh-2607/GreatUI
 * X (Great UI): https://x.com/GreatUIHQ
 *
 * Released under the MIT License.
 * Contributions, issues, and feature requests are always welcome.
 *
 * Author: Saurabh Sharma
 * X: https://x.com/srbh_s
 */
