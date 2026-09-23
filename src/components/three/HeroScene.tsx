"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, Stars } from "@react-three/drei";
import * as THREE from "three";
import { mulberry32 } from "@/lib/random";

type Props = {
  progress: React.MutableRefObject<number>;
};

function Knot() {
  const knot = useRef<THREE.Mesh>(null!);
  const inner = useRef<THREE.MeshStandardMaterial>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    knot.current.rotation.x = t * 0.1;
    knot.current.rotation.y = t * 0.14;
    if (inner.current)
      inner.current.emissiveIntensity = 0.8 + Math.sin(t * 1.4) * 0.35;
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={0.6} floatIntensity={1.2}>
        <mesh ref={knot}>
          <torusKnotGeometry args={[1.15, 0.34, 240, 32]} />
          <meshStandardMaterial
            ref={inner}
            color="#1e1b4b"
            metalness={0.9}
            roughness={0.22}
            emissive="#8b5cf6"
            emissiveIntensity={0.8}
          />
        </mesh>
        {/* glow shell */}
        <mesh scale={1.12}>
          <torusKnotGeometry args={[1.15, 0.34, 160, 24]} />
          <meshBasicMaterial color="#a78bfa" wireframe transparent opacity={0.16} />
        </mesh>
      </Float>
    </group>
  );
}

function Rings() {
  const g = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    g.current.rotation.z = t * 0.08;
    g.current.rotation.y = t * 0.12;
  });
  return (
    <group ref={g}>
      <mesh>
        <torusGeometry args={[2.1, 0.015, 32, 160]} />
        <meshBasicMaterial color="#fb923c" transparent opacity={0.5} />
      </mesh>
      <mesh rotation={[0, Math.PI / 2.4, Math.PI / 5]}>
        <torusGeometry args={[2.7, 0.01, 24, 200]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

function Core() {
  const points = useRef<THREE.Points>(null!);

  const { positions, base } = useMemo(() => {
    const rand = mulberry32(20260920);
    const count = 1400;
    const positions = new Float32Array(count * 3);
    const base = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 1.9 + rand() * 3.4;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta) * 0.7;
      const z = r * Math.cos(phi);
      positions[i * 3] = base[i * 3] = x;
      positions[i * 3 + 1] = base[i * 3 + 1] = y;
      positions[i * 3 + 2] = base[i * 3 + 2] = z;
    }
    return { positions, base };
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const geo = points.current.geometry;
    const attr = geo.getAttribute("position") as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    for (let i = 0; i < arr.length; i += 3) {
      const bx = base[i];
      const by = base[i + 1];
      const bz = base[i + 2];
      arr[i] = bx + Math.sin(t * 0.7 + by * 2) * 0.12;
      arr[i + 1] = by + Math.cos(t * 0.8 + bx * 2) * 0.12;
      arr[i + 2] = bz + Math.sin(t * 0.6 + bx * 1.5) * 0.12;
    }
    attr.needsUpdate = true;
    points.current.rotation.y = t * 0.05;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#c4b5fd"
        size={0.02}
        sizeAttenuation
        transparent
        opacity={0.85}
        depthWrite={false}
      />
    </points>
  );
}

function Cluster({ progress }: Props) {
  const group = useRef<THREE.Group>(null!);
  const cameraY = useRef<number>(0);

  useFrame(({ clock, camera }) => {
    const p = progress.current;
    const t = clock.getElapsedTime();
    const g = group.current;

    // scale + drift the whole cluster as the user scrolls
    g.scale.setScalar(1 - p * 0.45);
    g.position.y = -p * 2.4;
    g.rotation.x = t * 0.05 + p * 2.2;
    g.rotation.y = p * 3;

    // cinematic camera pull-back
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 7.5 - p * 3.5, 0.08);
    cameraY.current = THREE.MathUtils.lerp(cameraY.current, p * 1.2, 0.08);
    camera.position.y = cameraY.current;
    camera.lookAt(0, p * 0.5, 0);
  });

  return (
    <group ref={group}>
      <Knot />
      <Rings />
      <Core />
    </group>
  );
}

export default function HeroScene({ progress }: Props) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7.5], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <fog attach="fog" args={["#060608", 9, 20]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[6, 4, 5]} intensity={60} color="#8b5cf6" />
      <pointLight position={[-6, -3, 4]} intensity={40} color="#fb923c" />
      <Stars radius={60} depth={40} count={2500} factor={3} saturation={0} fade speed={0.6} />
      <Sparkles count={80} scale={9} size={1.6} speed={0.35} color="#f0abfc" opacity={0.5} />
      <Cluster progress={progress} />
    </Canvas>
  );
}