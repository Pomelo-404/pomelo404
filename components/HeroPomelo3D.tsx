"use client";

import { Float, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import {
  Color,
  Float32BufferAttribute,
  MathUtils,
  Shape,
  ShapeGeometry,
  SphereGeometry,
  DoubleSide,
  type Group,
} from "three";

/** Crea una cáscara irregular con variación cálida, sin cargar texturas externas. */
function usePomeloPeel() {
  return useMemo(() => {
    const geometry = new SphereGeometry(1.35, 80, 64);
    const positions = geometry.attributes.position;
    const colors = new Float32Array(positions.count * 3);
    const base = new Color("#ff7a3d");
    const light = new Color("#ff9856");
    const shadow = new Color("#e95e2e");
    const vertex = new Color();

    for (let index = 0; index < positions.count; index += 1) {
      const x = positions.getX(index);
      const y = positions.getY(index);
      const z = positions.getZ(index);
      const latitude = Math.atan2(y, Math.sqrt(x * x + z * z));
      const longitude = Math.atan2(z, x);
      // Los poros cambian la luz, sin deformar la silueta redonda del fruto.
      const pores = Math.sin(longitude * 25 + latitude * 19) * 0.008;

      positions.setXYZ(index, x, y, z);

      const illumination = MathUtils.clamp(0.5 + x * 0.17 + y * 0.09 + pores * 8, 0, 1);
      vertex
        .copy(shadow)
        .lerp(base, illumination * 1.35)
        .lerp(light, Math.max(0, illumination - 0.7) * 1.8);
      colors[index * 3] = vertex.r;
      colors[index * 3 + 1] = vertex.g;
      colors[index * 3 + 2] = vertex.b;
    }

    geometry.setAttribute("color", new Float32BufferAttribute(colors, 3));
    geometry.computeVertexNormals();
    return geometry;
  }, []);
}

/** Silueta de hoja con punta y base estrecha; evita el aspecto de óvalo. */
function useLeafGeometry() {
  return useMemo(() => {
    const leaf = new Shape();
    leaf.moveTo(0, 0);
    leaf.bezierCurveTo(0.22, 0.08, 0.46, 0.42, 0.08, 0.9);
    leaf.quadraticCurveTo(0.02, 0.98, 0, 1.04);
    leaf.quadraticCurveTo(-0.06, 0.95, -0.1, 0.87);
    leaf.bezierCurveTo(-0.46, 0.4, -0.2, 0.08, 0, 0);
    return new ShapeGeometry(leaf, 28);
  }, []);
}

function PomeloModel() {
  const pomelo = useRef<Group>(null);
  const peel = usePomeloPeel();
  const leaf = useLeafGeometry();
  const target = useRef({ x: 0.08, y: -0.35, z: 0.08, nextChange: 0 });
  const pointer = useThree((state) => state.pointer);

  useFrame(({ clock }, delta) => {
    if (!pomelo.current) return;
    if (clock.elapsedTime >= target.current.nextChange) {
      const turn = (Math.random() > 0.5 ? 1 : -1) * MathUtils.randFloat(0.55, 1.35);
      target.current = {
        x: MathUtils.randFloat(-0.28, 0.28),
        y: pomelo.current.rotation.y + turn,
        z: MathUtils.randFloat(-0.2, 0.2),
        nextChange: clock.elapsedTime + MathUtils.randFloat(2.2, 4.8),
      };
    }
    pomelo.current.rotation.x = MathUtils.damp(pomelo.current.rotation.x, target.current.x - pointer.y * 0.16, 1.1, delta);
    pomelo.current.rotation.y = MathUtils.damp(pomelo.current.rotation.y, target.current.y + pointer.x * 0.2, 0.75, delta);
    pomelo.current.rotation.z = MathUtils.damp(pomelo.current.rotation.z, target.current.z, 1.1, delta);
    pomelo.current.position.x = MathUtils.damp(pomelo.current.position.x, pointer.x * 0.1, 1.2, delta);
    pomelo.current.position.y = MathUtils.damp(pomelo.current.position.y, pointer.y * 0.07, 1.2, delta);
  });

  return (
    <Float speed={1.35} rotationIntensity={0.12} floatIntensity={0.28}>
      <group ref={pomelo} rotation={[0.08, -0.35, 0.08]}>
        <mesh geometry={peel}>
          <meshPhysicalMaterial vertexColors roughness={0.48} metalness={0.01} clearcoat={0.12} clearcoatRoughness={0.62} />
        </mesh>
        {/* Hoja en silueta, con nervadura central y un giro ligero hacia cámara. */}
        <group position={[0.24, 1.28, 0.04]} rotation={[0.28, -0.2, -0.72]} scale={[0.7, 0.7, 0.7]}>
          <mesh geometry={leaf} rotation={[0.12, 0, 0]}>
            <meshStandardMaterial color="#78bc45" roughness={0.62} side={DoubleSide} />
          </mesh>
          <mesh position={[0, 0.46, 0.025]} rotation={[0, 0, 0]}>
            <cylinderGeometry args={[0.018, 0.026, 0.78, 8]} />
            <meshStandardMaterial color="#c1e581" roughness={0.7} />
          </mesh>
        </group>
        <mesh position={[0.04, 1.31, 0]} rotation={[0.18, 0, -0.08]}>
          <cylinderGeometry args={[0.06, 0.11, 0.34, 12]} />
          <meshStandardMaterial color="#80512f" roughness={0.9} />
        </mesh>
      </group>
    </Float>
  );
}

export default function HeroPomelo3D() {
  const [isReady, setIsReady] = useState(false);

  return (
    <div className={`hero-pomelo-3d${isReady ? " is-ready" : ""}`}>
      <div className="hero-pomelo-loader" aria-hidden="true"><span /></div>
      <Canvas camera={{ position: [0, 0.15, 6.4], fov: 36 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }} onCreated={() => setIsReady(true)} fallback={<div className="hero-pomelo-webgl-fallback" />}>
        <ambientLight intensity={1.7} />
        <directionalLight position={[3, 4, 5]} intensity={3.2} color="#fff4df" />
        <pointLight position={[-3, -1, 3]} intensity={18} color="#ff8e8e" distance={8} />
        <PomeloModel />
        <OrbitControls enablePan={false} enableZoom={false} />
      </Canvas>
    </div>
  );
}
