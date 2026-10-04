"use client";

import { Float, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useState } from "react";
import { MathUtils, type Group } from "three";

function PomeloModel() {
  const pomelo = useRef<Group>(null);
  const target = useRef({ x: 0.08, y: -0.35, z: 0.08, nextChange: 0 });
  const pointer = useThree((state) => state.pointer);

  useFrame(({ clock }, delta) => {
    if (!pomelo.current) return;
    if (clock.elapsedTime >= target.current.nextChange) {
      const turn = (Math.random() > 0.5 ? 1 : -1) * MathUtils.randFloat(0.55, 1.35);
      target.current = { x: MathUtils.randFloat(-0.28, 0.28), y: pomelo.current.rotation.y + turn, z: MathUtils.randFloat(-0.2, 0.2), nextChange: clock.elapsedTime + MathUtils.randFloat(2.2, 4.8) };
    }
    pomelo.current.rotation.x = MathUtils.damp(pomelo.current.rotation.x, target.current.x - pointer.y * 0.16, 1.1, delta);
    pomelo.current.rotation.y = MathUtils.damp(pomelo.current.rotation.y, target.current.y + pointer.x * 0.2, 0.75, delta);
    pomelo.current.rotation.z = MathUtils.damp(pomelo.current.rotation.z, target.current.z, 1.1, delta);
    pomelo.current.position.x = MathUtils.damp(pomelo.current.position.x, pointer.x * 0.1, 1.2, delta);
    pomelo.current.position.y = MathUtils.damp(pomelo.current.position.y, pointer.y * 0.07, 1.2, delta);
  });

  return <Float speed={1.35} rotationIntensity={0.12} floatIntensity={0.28}><group ref={pomelo} rotation={[0.08, -0.35, 0.08]}><mesh scale={[1, 1, 0.92]}><sphereGeometry args={[1.35, 64, 64]} /><meshPhysicalMaterial color="#ff7a3d" roughness={0.36} metalness={0.03} clearcoat={0.16} clearcoatRoughness={0.42} /></mesh><mesh position={[0.28, 1.35, 0.02]} rotation={[0.35, -0.1, -0.78]} scale={[0.37, 0.1, 0.72]}><sphereGeometry args={[1, 32, 32]} /><meshStandardMaterial color="#8fd14f" roughness={0.5} /></mesh><mesh position={[0.04, 1.31, 0]} rotation={[0.18, 0, -0.08]}><cylinderGeometry args={[0.075, 0.1, 0.32, 12]} /><meshStandardMaterial color="#926138" roughness={0.8} /></mesh></group></Float>;
}

export default function HeroPomelo3D() {
  const [isReady, setIsReady] = useState(false);

  return <div className={`hero-pomelo-3d${isReady ? " is-ready" : ""}`}><div className="hero-pomelo-loader" aria-hidden="true"><span /></div><Canvas camera={{ position: [0, 0.15, 6.4], fov: 36 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }} onCreated={() => setIsReady(true)} fallback={<div className="hero-pomelo-webgl-fallback" />}><ambientLight intensity={1.7} /><directionalLight position={[3, 4, 5]} intensity={3.2} color="#fff4df" /><pointLight position={[-3, -1, 3]} intensity={18} color="#ff8e8e" distance={8} /><PomeloModel /><OrbitControls enablePan={false} enableZoom={false} /></Canvas></div>;
}
