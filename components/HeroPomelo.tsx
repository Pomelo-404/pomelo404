"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { Component, type ReactNode, useEffect, useState } from "react";

function PomeloFallback() {
  return (
    <div className="hero-pomelo-image-fallback" aria-hidden="true">
      <Image
        src="/hero/pomelo-3d.png"
        alt=""
        fill
        priority
        sizes="(max-width: 900px) 80vw, 40vw"
      />
    </div>
  );
}

const HeroPomelo3D = dynamic(() => import("@/components/HeroPomelo3D"), {
  ssr: false,
  loading: PomeloFallback,
});

class WebGLErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? <PomeloFallback /> : this.props.children;
  }
}

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function HeroPomelo() {
  const [canUseWebGL, setCanUseWebGL] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setCanUseWebGL(supportsWebGL()));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  if (!canUseWebGL) return <PomeloFallback />;

  return <WebGLErrorBoundary><HeroPomelo3D /></WebGLErrorBoundary>;
}
