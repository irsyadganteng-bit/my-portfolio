'use client';

import * as THREE from 'three';
import { useRef, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import dynamic from 'next/dynamic';

function CardContent() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Menggunakan TextureLoader bawaan Three.js yang jauh lebih stabil
  const texture = useLoader(THREE.TextureLoader, '/photo.png');

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime();
      groupRef.current.rotation.z = Math.sin(t * 1.5) * 0.05;
      groupRef.current.rotation.y = Math.cos(t * 1.2) * 0.08;
      groupRef.current.position.y = Math.sin(t * 2) * 0.04 + 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.1, 0]}>
      {/* Tali Gantungan */}
      <mesh position={[0, 2.3, -0.01]}>
        <planeGeometry args={[0.18, 3.0]} />
        <meshBasicMaterial color="#2563eb" side={THREE.DoubleSide} />
      </mesh>

      <mesh position={[-0.08, 2.3, 0]}>
        <planeGeometry args={[0.02, 3.0]} />
        <meshBasicMaterial color="#60a5fa" side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0.08, 2.3, 0]}>
        <planeGeometry args={[0.02, 3.0]} />
        <meshBasicMaterial color="#60a5fa" side={THREE.DoubleSide} />
      </mesh>

      {/* Ring Metallic */}
      <mesh position={[0, 0.85, 0.02]}>
        <torusGeometry args={[0.07, 0.018, 16, 32]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Klip */}
      <mesh position={[0, 0.72, 0.03]}>
        <boxGeometry args={[0.22, 0.12, 0.05]} />
        <meshStandardMaterial color="#1e293b" roughness={0.5} />
      </mesh>

      {/* Card Base */}
      <mesh castShadow receiveShadow position={[0, -0.3, 0]}>
        <boxGeometry args={[1.5, 2.0, 0.06]} />
        <meshStandardMaterial color="#090d16" roughness={0.2} metalness={0.5} />
      </mesh>

      <mesh position={[0, -0.3, 0.031]}>
        <planeGeometry args={[1.42, 1.92]} />
        <meshStandardMaterial color="#1e293b" roughness={0.8} />
      </mesh>

      {/* Foto Profil */}
      <mesh position={[0, -0.1, 0.04]}>
        <planeGeometry args={[1.2, 1.2]} />
        <meshBasicMaterial map={texture} />
      </mesh>

      {/* Teks */}
      <Text position={[0, -0.82, 0.04]} fontSize={0.095} color="#ffffff" anchorX="center" anchorY="middle">
        M. IRSYAD ALHAFIDZ
      </Text>

      <Text position={[0, -0.96, 0.04]} fontSize={0.065} color="#38bdf8" anchorX="center" anchorY="middle">
        WEB DEVELOPER
      </Text>
    </group>
  );
}

function LanyardCanvas() {
  return (
    <div className="relative w-full h-[400px] flex justify-center items-center overflow-visible">
      <Canvas camera={{ position: [0, 0, 9], fov: 25 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} />
        <Suspense fallback={null}>
          <CardContent />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Mematikan SSR secara penuh agar Canvas tidak crash saat prerender
export default dynamic(() => Promise.resolve(LanyardCanvas), { ssr: false });