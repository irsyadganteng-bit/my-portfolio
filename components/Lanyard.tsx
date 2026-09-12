'use client';

import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Center, Text, Environment } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';

export default function Lanyard() {
  return (
    <div className="relative w-full h-[550px] flex items-center justify-center">
      <Canvas camera={{ position: [0, 0, 13], fov: 25 }}>
        <ambientLight intensity={Math.PI} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} />
        <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
          <Band />
        </Physics>
      </Canvas>
    </div>
  );
}

function Band() {
  const cardRef = useRef<any>(null);
  const texture = useTexture('photo.png'); // Pastikan foto ada di folder public/foto-kamu.png

  return (
    <RigidBody ref={cardRef} angularDamping={2} linearDamping={2} position={[0, 0, 0]} colliders={false}>
      <CuboidCollider args={[0.8, 1.1, 0.05]} />
      
      {/* 1. Tali Gantungan (Lanyard Strap/Ribbon) */}
      <mesh position={[0, 1.6, -0.01]}>
        <planeGeometry args={[0.2, 1.2]} />
        <meshBasicMaterial color="#2563eb" side={THREE.DoubleSide} />
      </mesh>

      {/* 2. Ring Pengait Besi */}
      <mesh position={[0, 1.05, 0]}>
        <torusGeometry args={[0.08, 0.02, 16, 32]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* 3. Bingkai ID Card (Frame Hitam/GELAP) */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.6, 2.2, 0.08]} />
        <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* 4. Area Foto Profil */}
      <mesh position={[0, 0.15, 0.05]}>
        <planeGeometry args={[1.3, 1.3]} />
        <meshBasicMaterial map={texture} />
      </mesh>

      {/* 5. Teks Nama & Role di ID Card */}
      <Text
        position={[0, -0.7, 0.05]}
        fontSize={0.11}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        M. IRSYAD ALHAFIDZ
      </Text>
      <Text
        position={[0, -0.85, 0.05]}
        fontSize={0.07}
        color="#38bdf8"
        anchorX="center"
        anchorY="middle"
      >
        WEB DEVELOPER
      </Text>
    </RigidBody>
  );
}