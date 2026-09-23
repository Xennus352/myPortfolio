"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { mulberry32 } from "@/lib/random";

export type StudioSettings = {
  speed: number;
  wireframe: boolean;
  particles: boolean;
  auto: boolean;
  color: string;
};

type Props = {
  settings: React.MutableRefObject<StudioSettings>;
};

function Knot({ settings }: Props) {
  const main = useRef<THREE.Mesh>(null!);
  const shell = useRef<THREE.Mesh>(null!);
  const mat = useRef<THREE.MeshStandardMaterial>(null!);
  const shellMat = useRef<THREE.MeshBasicMaterial>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const s = settings.current;
    const speed = s.speed > 0 ? s.speed : 0.12;

    main.current.rotation.x = t * 0.18 * speed;
    main.current.rotation.y = t * 0.24 * speed;
    shell.current.rotation.y = -t * 0.1 * speed;
    shell.current.rotation.z = t * 0.07 * speed;

    if (mat.current) {
      mat.current.wireframe = s.wireframe;
      mat.current.emissive.set(s.color);
      mat.current.emissiveIntensity = 0.9 + Math.sin(t * 1.3) * 0.3;
    }
    shellMat.current.wireframe = !s.wireframe;
    shellMat.current.color.set(s.color);
    shellMat.current.opacity = s.wireframe ? 0.35 : 0.14;
  });

  return (
    <group>
      <mesh ref={main}>
        <torusKnotGeometry args={[1.15, 0.36, 260, 34, 2, 3]} />
        <meshStandardMaterial
          ref={mat}
          color="#16161e"
          metalness={0.85}
          roughness={0.28}
          emissive="#8b5cf6"
          emissiveIntensity={0.9}
        />
      </mesh>
      <mesh ref={shell} scale={1.2}>
        <torusKnotGeometry args={[1.15, 0.36, 180, 26, 2, 3]} />
        <meshBasicMaterial ref={shellMat} color="#a78bfa" wireframe transparent opacity={0.14} />
      </mesh>
    </group>
  );
}

function Rings({ settings }: Props) {
  const g = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    const s = settings.current;
    const speed = s.speed > 0 ? s.speed : 0.12;
    g.current.rotation.z = clock.getElapsedTime() * 0.06 * speed;
    g.current.rotation.y = clock.getElapsedTime() * 0.1 * speed;
  });
  return (
    <group ref={g}>
      <mesh>
        <torusGeometry args={[2.2, 0.016, 32, 180]} />
        <meshBasicMaterial color="#fb923c" transparent opacity={0.55} />
      </mesh>
      <mesh rotation={[0, Math.PI / 2.4, Math.PI / 5]}>
        <torusGeometry args={[2.9, 0.012, 24, 220]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

function Field({ settings }: Props) {
  const points = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const rand = mulberry32(1337);
    const count = 1200;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.1 + rand() * 4.2;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.72;
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    points.current.visible = settings.current.particles;
    points.current.rotation.y = clock.getElapsedTime() * 0.04;
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
        opacity={0.8}
        depthWrite={false}
      />
    </points>
  );
}

export default function ShowcaseScene({ settings }: Props) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.5], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[6, 5, 6]} intensity={80} color="#8b5cf6" />
      <pointLight position={[-6, -4, 5]} intensity={60} color="#fb923c" />
      <spotLight position={[0, 8, 6]} intensity={120} angle={0.5} penumbra={1} color="#ffffff" />
      <Sparkles count={70} scale={8} size={1.4} speed={0.3} color="#f0abfc" opacity={0.4} />
      <Knot settings={settings} />
      <Rings settings={settings} />
      <Field settings={settings} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={1.4}
        minPolarAngle={Math.PI / 3.2}
        maxPolarAngle={Math.PI / 1.7}
      />
    </Canvas>
  );
}