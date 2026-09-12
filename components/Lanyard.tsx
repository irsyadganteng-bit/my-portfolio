'use client';

import * as THREE from 'three';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture, Text } from '@react-three/drei';

export default function Lanyard() {
  return (
    <div className="relative w-full h-[420px] flex justify-center items-center overflow-visible">
      <Canvas camera={{ position: [0, 0, 9], fov: 25 }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]} intensity={1.8} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} />
        <LanyardCard />
      </Canvas>
    </div>
  );
}

function LanyardCard() {
  const groupRef = useRef<THREE.Group>(null);
  const texture = useTexture('/foto-kamu.png');

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime();
      // Animasi ayunan lembut berulang seperti tergantung di leher/gantungan
      groupRef.current.rotation.z = Math.sin(t * 1.5) * 0.06;
      groupRef.current.rotation.y = Math.cos(t * 1.2) * 0.08;
      groupRef.current.position.y = Math.sin(t * 2) * 0.05 + 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.2, 0]}>
      {/* 1. Tali Gantungan Atas (Strap Blue) */}
      <mesh position={[0, 2.2, -0.01]}>
        <planeGeometry args={[0.18, 2.8]} />
        <meshBasicMaterial color="#2563eb" side={THREE.DoubleSide} />
      </mesh>

      {/* Tali Bagian Luar/Garis Accent Tali */}
      <mesh position={[-0.08, 2.2, 0]}>
        <planeGeometry args={[0.02, 2.8]} />
        <meshBasicMaterial color="#60a5fa" side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0.08, 2.2, 0]}>
        <planeGeometry args={[0.02, 2.8]} />
        <meshBasicMaterial color="#60a5fa" side={THREE.DoubleSide} />
      </mesh>

      {/* 2. Ring Metallic Pengait ID Card */}
      <mesh position={[0, 0.85, 0.02]}>
        <torusGeometry args={[0.07, 0.018, 16, 32]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* 3. Klip Penjepit Hitam */}
      <mesh position={[0, 0.72, 0.03]}>
        <boxGeometry args={[0.22, 0.12, 0.05]} />
        <meshStandardMaterial color="#1e293b" roughness={0.5} />
      </mesh>

      {/* 4. Badan Utama ID Card (Black Card Frame) */}
      <mesh castShadow receiveShadow position={[0, -0.3, 0]}>
        <boxGeometry args={[1.5, 2.0, 0.06]} />
        <meshStandardMaterial color="#090d16" roughness={0.2} metalness={0.5} />
      </mesh>

      {/* Border Silver Kaca pada Card */}
      <mesh position={[0, -0.3, 0.031]}>
        <planeGeometry args={[1.42, 1.92]} />
        <meshStandardMaterial color="#1e293b" roughness={0.8} />
      </mesh>

      {/* 5. Foto Profil */}
      <mesh position={[0, -0.1, 0.04]}>
        <planeGeometry args={[1.2, 1.2]} />
        <meshBasicMaterial map={texture} />
      </mesh>

      {/* 6. Teks Nama & Role */}
      <Text
        position={[0, -0.82, 0.04]}
        fontSize={0.095}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhRib2Atz4s.woff"
      >
        M. IRSYAD ALHAFIDZ
      </Text>

      <Text
        position={[0, -0.96, 0.04]}
        fontSize={0.065}
        color="#38bdf8"
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhRib2Atz4s.woff"
      >
        WEB DEVELOPER
      </Text>
    </group>
  );
}