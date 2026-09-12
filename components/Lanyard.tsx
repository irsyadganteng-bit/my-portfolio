'use client';

import * as THREE from 'three';
import { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import dynamic from 'next/dynamic';

function InteractiveLanyard() {
  const cardRef = useRef<THREE.Group>(null);
  const texture = useLoader(THREE.TextureLoader, '/photo.png');
  
  const [isDragging, setIsDragging] = useState(false);
  const dragPos = useRef(new THREE.Vector3(0, -0.5, 0));
  const velocity = useRef(new THREE.Vector3(0, 0, 0));
  const targetPos = useRef(new THREE.Vector3(0, -0.5, 0));

  const lineRef = useRef<THREE.Line>(null);

  // Update Tali Melengkung (Catenary / Curve Physics)
  useFrame((state, delta) => {
    if (!cardRef.current) return;

    if (isDragging) {
      // Mengikuti pointer mouse saat ditarik
      const x = (state.pointer.x * state.viewport.width) / 2;
      const y = (state.pointer.y * state.viewport.height) / 2;
      targetPos.current.set(x, y, 0);
    } else {
      // Physics Spring / Kembali mengayun ke posisi semula saat dilepas
      targetPos.current.set(0, -0.5, 0);
    }

    // Simulasi Pegas (Spring physics effect)
    const force = targetPos.current.clone().sub(dragPos.current).multiplyScalar(15);
    velocity.current.add(force.multiplyScalar(delta));
    velocity.current.multiplyScalar(0.88); // Damping / Gesekan air
    dragPos.current.add(velocity.current.clone().multiplyScalar(delta));

    cardRef.current.position.copy(dragPos.current);
    cardRef.current.rotation.z = -velocity.current.x * 0.15;
    cardRef.current.rotation.x = velocity.current.y * 0.1;

    // Gambar Tali Melengkung (Curve Line)
    if (lineRef.current) {
      const p1 = new THREE.Vector3(0, 2.2, 0); // Titik Atas Tali
      const p2 = dragPos.current.clone().add(new THREE.Vector3(0, 0.85, 0)); // Titik Pengait Card
      const mid = p1.clone().add(p2).multiplyScalar(0.5);
      
      // Kelengkungan Tali saat ditarik
      mid.y -= 0.3 + Math.abs(velocity.current.x) * 0.05;

      const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
      const points = curve.getPoints(30);
      lineRef.current.geometry.setFromPoints(points);
    }
  });

  return (
    <>
      {/* 1. Tali Melengkung Dinamis */}
      <primitive object={new THREE.Line()} ref={lineRef}>
        <bufferGeometry />
        <lineBasicMaterial color="#3b82f6" linewidth={3} />
      </primitive>

      {/* 2. Kartu ID Card Interaktif */}
      <group
        ref={cardRef}
        onPointerDown={(e) => {
          e.stopPropagation();
          (e.target as HTMLElement).setPointerCapture(e.pointerId);
          setIsDragging(true);
        }}
        onPointerUp={(e) => {
          e.stopPropagation();
          (e.target as HTMLElement).releasePointerCapture(e.pointerId);
          setIsDragging(false);
        }}
      >
        {/* Ring Metallic Pengait */}
        <mesh position={[0, 0.85, 0.02]}>
          <torusGeometry args={[0.07, 0.018, 16, 32]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Klip Penjepit */}
        <mesh position={[0, 0.72, 0.03]}>
          <boxGeometry args={[0.22, 0.12, 0.05]} />
          <meshStandardMaterial color="#1e293b" roughness={0.5} />
        </mesh>

        {/* Card Base Frame */}
        <mesh position={[0, -0.3, 0]}>
          <boxGeometry args={[1.5, 2.0, 0.06]} />
          <meshStandardMaterial color="#090d16" roughness={0.2} metalness={0.5} />
        </mesh>

        {/* Card Layer Dalam */}
        <mesh position={[0, -0.3, 0.031]}>
          <planeGeometry args={[1.42, 1.92]} />
          <meshStandardMaterial color="#1e293b" roughness={0.8} />
        </mesh>

        {/* Foto Profil */}
        <mesh position={[0, -0.1, 0.04]}>
          <planeGeometry args={[1.2, 1.2]} />
          <meshBasicMaterial map={texture} />
        </mesh>

        {/* Teks ID Card */}
        <Text position={[0, -0.82, 0.04]} fontSize={0.095} color="#ffffff" anchorX="center" anchorY="middle">
          M. IRSYAD ALHAFIDZ
        </Text>

        <Text position={[0, -0.96, 0.04]} fontSize={0.065} color="#38bdf8" anchorX="center" anchorY="middle">
          WEB DEVELOPER
        </Text>
      </group>
    </>
  );
}

function LanyardCanvas() {
  return (
    <div className="relative w-full h-[450px] flex justify-center items-center overflow-visible cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 9], fov: 25 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} />
        <Suspense fallback={null}>
          <InteractiveLanyard />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default dynamic(() => Promise.resolve(LanyardCanvas), { ssr: false });