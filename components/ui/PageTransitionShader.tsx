"use client";

import { useEffect, useRef, useState, createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/site/ThemeProvider";

const VERTEX_SHADER = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = (a_position + 1.0) * 0.5;
    v_uv.y = 1.0 - v_uv.y;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;

  varying vec2 v_uv;

  uniform float u_progress;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform int u_mode;
  uniform bool u_isDark;
  uniform float u_aberration;

  float rand(vec2 co) {
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
  }

  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = rand(i);
    float b = rand(i + vec2(1.0, 0.0));
    float c = rand(i + vec2(0.0, 1.0));
    float d = rand(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  float fbm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 4; i++) {
      value += amplitude * noise(st);
      st *= 2.1;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 uv = v_uv;
    vec2 center = vec2(0.5);
    float aspect = u_resolution.x / u_resolution.y;
    vec2 aspectUv = (uv - center) * vec2(aspect, 1.0) + center;

    float coverAmount = sin(u_progress * 3.14159265);

    vec3 color = vec3(0.0);
    float alpha = 0.0;

    vec3 bgBase = u_isDark ? vec3(0.06, 0.06, 0.08) : vec3(0.97, 0.98, 0.99);
    vec3 accentColor1 = u_isDark ? vec3(0.49, 0.23, 0.96) : vec3(0.25, 0.45, 0.95);
    vec3 accentColor2 = u_isDark ? vec3(0.93, 0.28, 0.60) : vec3(0.95, 0.35, 0.45);

    if (u_mode == 0) {
      float dist = length(aspectUv - center);
      float wave = sin(dist * 28.0 - u_time * 8.0) * 0.04 * coverAmount;
      float ring = smoothstep(u_progress - 0.25, u_progress, dist) - smoothstep(u_progress, u_progress + 0.25, dist);

      vec2 rUv = aspectUv + vec2(wave * u_aberration, wave);
      vec2 bUv = aspectUv - vec2(wave * u_aberration, wave);

      float radiusThreshold = u_progress * 1.4;
      float isCovered = smoothstep(radiusThreshold - 0.15, radiusThreshold + 0.05, dist + wave);

      float finalMask = (1.0 - isCovered);

      vec3 waveGlow = mix(accentColor1, accentColor2, sin(dist * 12.0 + u_time) * 0.5 + 0.5);
      float ringIntensity = u_isDark ? 0.45 : 0.75;
      float alphaIntensity = u_isDark ? 0.3 : 0.5;
      color = mix(bgBase, waveGlow, ring * ringIntensity);
      alpha = clamp(finalMask + ring * alphaIntensity, 0.0, 1.0);
    }
    else if (u_mode == 1) {
      float sliceCount = 35.0;
      float sliceId = floor(uv.y * sliceCount);
      float sliceOffset = (rand(vec2(sliceId, floor(u_time * 20.0))) - 0.5) * 0.25 * coverAmount;

      float scanline = sin(uv.y * 180.0 + u_time * 10.0) * 0.04;
      float progressWipe = smoothstep(uv.x - 0.2, uv.x + 0.2, u_progress * 1.4 - sliceOffset);

      float shift = sliceOffset * u_aberration * 0.15;
      vec3 glitchAccent = mix(vec3(0.0, 0.9, 0.8), vec3(1.0, 0.1, 0.4), rand(vec2(sliceId, 1.0)));

      color = mix(bgBase, glitchAccent, clamp(scanline + abs(sliceOffset) * 1.5, 0.0, 1.0));
      alpha = clamp(progressWipe, 0.0, 1.0);
    }
    else if (u_mode == 2) {
      vec2 st = aspectUv - center;
      float dist = length(st);
      float angle = atan(st.y, st.x);

      float swirl = (1.0 - smoothstep(0.0, 0.8, dist)) * 8.0 * coverAmount;
      float currentAngle = angle + swirl;

      vec2 spiralUv = center + vec2(cos(currentAngle), sin(currentAngle)) * dist;

      float threshold = u_progress * 1.2;
      float spiralMask = smoothstep(threshold + 0.1, threshold - 0.1, dist + sin(angle * 6.0 + u_time * 4.0) * 0.05);

      vec3 swirlGlow = mix(bgBase, accentColor1, sin(currentAngle * 3.0) * 0.5 + 0.5);
      color = swirlGlow;
      alpha = clamp(spiralMask, 0.0, 1.0);
    }
    else {
      vec2 st = aspectUv * 3.5;
      float n = fbm(st + vec2(u_time * 0.3, u_time * 0.2));

      float threshold = u_progress * 1.3 - 0.15;
      float edge = 0.08;
      float noiseMask = smoothstep(threshold - edge, threshold + edge, n);
      float fluidBorder = smoothstep(threshold - edge * 2.0, threshold, n) - smoothstep(threshold, threshold + edge * 2.0, n);

      vec3 borderGlow = mix(accentColor1, accentColor2, n);
      color = mix(bgBase, borderGlow, fluidBorder * 0.8);
      alpha = clamp((1.0 - noiseMask) + fluidBorder, 0.0, 1.0);
    }

    alpha = alpha * sin(u_progress * 3.14159265);
    color = clamp(color, 0.0, 1.0);

    gl_FragColor = vec4(color, alpha);
  }
`;

function createShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
): WebGLShader | null {
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
}

function createProgram(
  gl: WebGLRenderingContext,
  vsSource: string,
  fsSource: string,
): WebGLProgram | null {
  const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
  const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
  if (!vs || !fs) return null;

  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program link error:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

export interface PageTransitionShaderProps {
  trigger: number;
  onViewSwap?: () => void;
  isDark?: boolean;
  shaderMode?: "ripple" | "glitch" | "vortex" | "liquid";
  duration?: number;
  aberration?: number;
}

export function PageTransitionShader({
  trigger,
  onViewSwap,
  isDark = false,
  shaderMode = "ripple",
  duration = 900,
  aberration = 1.0,
}: PageTransitionShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [transitionState, setTransitionState] = useState<
    "idle" | "entering" | "covered" | "exiting"
  >("idle");

  const getModeInt = (mode: string) => {
    switch (mode) {
      case "glitch":
        return 1;
      case "vortex":
        return 2;
      case "liquid":
        return 3;
      case "ripple":
      default:
        return 0;
    }
  };

  useEffect(() => {
    if (trigger <= 0) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTransitionState("entering");
    const startTime = performance.now();
    let animFrameId: number;
    let swapped = false;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: true, antialias: true });
    if (!gl) {
      console.warn("WebGL not supported, falling back");
      if (onViewSwap) onViewSwap();
      setTransitionState("idle");
      return;
    }

    const width = window.innerWidth;
    const height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    gl.viewport(0, 0, canvas.width, canvas.height);

    const program = createProgram(gl, VERTEX_SHADER, FRAGMENT_SHADER);
    if (!program) return;

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const posLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posLocation);
    gl.vertexAttribPointer(posLocation, 2, gl.FLOAT, false, 0, 0);

    const uProgressLoc = gl.getUniformLocation(program, "u_progress");
    const uTimeLoc = gl.getUniformLocation(program, "u_time");
    const uResLoc = gl.getUniformLocation(program, "u_resolution");
    const uModeLoc = gl.getUniformLocation(program, "u_mode");
    const uIsDarkLoc = gl.getUniformLocation(program, "u_isDark");
    const uAberrationLoc = gl.getUniformLocation(program, "u_aberration");

    gl.uniform2f(uResLoc, canvas.width, canvas.height);
    gl.uniform1i(uModeLoc, getModeInt(shaderMode));
    gl.uniform1i(uIsDarkLoc, isDark ? 1 : 0);
    gl.uniform1f(uAberrationLoc, aberration);

    const render = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1.0);
      const timeSec = elapsed * 0.001;

      if (progress >= 0.5 && !swapped) {
        swapped = true;
        setTransitionState("covered");
        if (onViewSwap) onViewSwap();
        setTransitionState("exiting");
      }

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.uniform1f(uProgressLoc, progress);
      gl.uniform1f(uTimeLoc, timeSec);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (progress < 1.0) {
        animFrameId = requestAnimationFrame(render);
      } else {
        setTransitionState("idle");
      }
    };

    animFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameId);
      if (gl) {
        gl.deleteBuffer(positionBuffer);
        gl.deleteProgram(program);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, shaderMode, duration, isDark, aberration]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 z-[100] h-screen w-screen ${
        transitionState === "idle" ? "hidden" : "block"
      }`}
      style={{ touchAction: "none" }}
    />
  );
}

export interface WebglTransitionContextType {
  isEnabled: boolean;
  setIsEnabled: (enabled: boolean) => void;
  shaderMode: "ripple" | "glitch" | "vortex" | "liquid";
  setShaderMode: (mode: "ripple" | "glitch" | "vortex" | "liquid") => void;
  speed: number;
  setSpeed: (speed: number) => void;
  aberration: number;
  setAberration: (aberration: number) => void;
  triggerTransition: (url?: string) => void;
}

export const WebglTransitionContext = createContext<WebglTransitionContextType>(
  {
    isEnabled: true,
    setIsEnabled: () => {},
    shaderMode: "ripple",
    setShaderMode: () => {},
    speed: 900,
    setSpeed: () => {},
    aberration: 1.0,
    setAberration: () => {},
    triggerTransition: () => {},
  },
);

export function useWebglTransition() {
  return useContext(WebglTransitionContext);
}

export function WebglTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { theme } = useTheme();

  const [isEnabled, setIsEnabled] = useState(true);
  const [shaderMode, setShaderMode] = useState<
    "ripple" | "glitch" | "vortex" | "liquid"
  >("ripple");
  const [speed, setSpeed] = useState(900);
  const [aberration, setAberration] = useState(1.0);

  const [trigger, setTrigger] = useState(0);
  const [pendingUrl, setPendingUrl] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const isDark = theme === "dark";

  const triggerTransition = (url?: string) => {
    if (!isEnabled) {
      if (url) router.push(url);
      return;
    }
    setPendingUrl(url || "");
    setTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    if (!isEnabled) return;

    const handleLinkClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      const targetAttr = target.getAttribute("target");

      if (
        href &&
        !href.startsWith("http") &&
        !href.startsWith("//") &&
        !href.startsWith("#") &&
        !href.startsWith("mailto:") &&
        !href.startsWith("tel:") &&
        !href.startsWith("javascript:") &&
        targetAttr !== "_blank" &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.shiftKey &&
        !e.altKey
      ) {
        e.preventDefault();
        e.stopPropagation();

        triggerTransition(href);
      }
    };

    document.addEventListener("click", handleLinkClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleLinkClick, { capture: true });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEnabled]);

  const handleViewSwap = () => {
    if (pendingUrl) {
      router.push(pendingUrl);
    }
  };

  return (
    <WebglTransitionContext.Provider
      value={{
        isEnabled,
        setIsEnabled,
        shaderMode,
        setShaderMode,
        speed,
        setSpeed,
        aberration,
        setAberration,
        triggerTransition,
      }}
    >
      {mounted && (
        <PageTransitionShader
          trigger={trigger}
          onViewSwap={handleViewSwap}
          isDark={isDark}
          shaderMode={shaderMode}
          duration={speed}
          aberration={aberration}
        />
      )}
      {children}
    </WebglTransitionContext.Provider>
  );
}

export default PageTransitionShader;

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
