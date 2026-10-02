"use client";

import { Canvas } from "@react-three/fiber";
import { Sparkles, Stars } from "@react-three/drei";

type Props = {
  progress: React.MutableRefObject<number>;
};

export default function HeroScene({ progress }: Props) {
  void progress;
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
    </Canvas>
  );
}
