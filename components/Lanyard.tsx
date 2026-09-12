'use client';

import * as THREE from 'three';
import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Center, Text } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';

export default function Lanyard() {
  return (
    <div className="relative w-full h-[600px] flex items-center justify-center">
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
  const bandRef = useRef<any>(null);
  const texture = useTexture('photo.png'); // Pastikan nama file sesuai foto di folder public/

  return (
    <>
      {/* ID Card 3D Frame */}
      <RigidBody ref={cardRef} angularDamping={2} linearDamping={2} position={[0, 0, 0]} colliders={false}>
        <CuboidCollider args={[0.8, 1.1, 0.05]} />
        
        {/* Bingkai ID Card */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.6, 2.2, 0.08]} />
          <meshStandardMaterial color="#111827" roughness={0.3} metalness={0.8} />
        </mesh>

        {/* Tempat Foto di dalam Bingkai */}
        <mesh position={[0, 0.1, 0.05]}>
          <planeGeometry args={[1.3, 1.4]} />
          <meshBasicMaterial map={texture} />
        </mesh>

        {/* Teks Nama pada ID Card */}
        <Text
          position={[0, -0.8, 0.05]}
          fontSize={0.12}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          Irsyad
        </Text>
      </RigidBody>
    </>
  );
}