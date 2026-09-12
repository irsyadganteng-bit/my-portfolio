'use client';

import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { useGLTF, useTexture, Text } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

extend({ MeshLineGeometry, MeshLineMaterial });

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

function Band({ maxSpeed = 50, minSpeed = 10 }) {
  const band = useRef<any>(null);
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);
  const card = useRef<any>(null);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const segmentProps = {
    type: 'dynamic' as const,
    canSleep: true,
    colliders: false,
    angularDamping: 2,
    linearDamping: 2
  };

  const texture = useTexture('/foto-kamu.png');

  // Titik sambungan fisik antar ruas tali & kartu
  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.1, 0]]);

  const [curve] = useState(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3()
  ]));

  const [dragged, setDragged] = useState<THREE.Vector3 | false>(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = 'grab';
      return () => { document.body.style.cursor = 'auto'; };
    }
  }, [hovered]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(dragged);
      dir.multiplyScalar(state.camera.position.z);
      card.current?.wakeUp();
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z
      });
    }

    if (fixed.current) {
      // Memperbarui kurva visual tali mengikuti titik simpul fisika
      curve.points[0].copy(fixed.current.translation());
      curve.points[1].copy(j1.current.translation());
      curve.points[2].copy(j2.current.translation());
      curve.points[3].copy(j3.current.translation());
      curve.points[4].copy(card.current.translation());

      if (band.current) {
        band.current.geometry.setPoints(curve.getPoints(32));
      }

      // Menjaga rotasi kartu tetap tegak menghadap depan
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  return (
    <>
      {/* Titik Tumpuan Atas */}
      <RigidBody ref={fixed} type="fixed" position={[0, 4.5, 0]} />

      {/* Segmen Fisika Tali */}
      <RigidBody ref={j1} position={[0, 3.5, 0]} {...segmentProps}>
        <BallCollider args={[0.1]} />
      </RigidBody>
      <RigidBody ref={j2} position={[0, 2.5, 0]} {...segmentProps}>
        <BallCollider args={[0.1]} />
      </RigidBody>
      <RigidBody ref={j3} position={[0, 1.5, 0]} {...segmentProps}>
        <BallCollider args={[0.1]} />
      </RigidBody>

      {/* ID Card dengan fitur ditarik kursor (Drag) */}
      <RigidBody
        ref={card}
        position={[0, 0, 0]}
        type={dragged ? 'kinematicPosition' : 'dynamic'}
        colliders={false}
        angularDamping={2}
        linearDamping={2}
      >
        <CuboidCollider args={[0.8, 1.1, 0.05]} />
        
        <group
          onPointerDown={(e) => {
            e.stopPropagation();
            (e.target as HTMLElement).setPointerCapture(e.pointerId);
            setDragged(new THREE.Vector3().copy(e.point).sub(card.current.translation()));
          }}
          onPointerUp={(e) => {
            e.stopPropagation();
            (e.target as HTMLElement).releasePointerCapture(e.pointerId);
            setDragged(false);
          }}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          {/* Ring Besi Pengait */}
          <mesh position={[0, 1.15, 0]}>
            <torusGeometry args={[0.08, 0.02, 16, 32]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.1} />
          </mesh>

          {/* Bingkai ID Card */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.6, 2.2, 0.08]} />
            <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
          </mesh>

          {/* Foto Profil */}
          <mesh position={[0, 0.15, 0.05]}>
            <planeGeometry args={[1.3, 1.3]} />
            <meshBasicMaterial map={texture} />
          </mesh>

          {/* Teks Nama & Role */}
          <Text position={[0, -0.7, 0.05]} fontSize={0.11} color="#ffffff" anchorX="center" anchorY="middle">
            M. IRSYAD ALHAFIDZ
          </Text>
          <Text position={[0, -0.85, 0.05]} fontSize={0.07} color="#38bdf8" anchorX="center" anchorY="middle">
            WEB DEVELOPER
          </Text>
        </group>
      </RigidBody>

      {/* Tali Melengkung Halus (MeshLine Visual) */}
      <mesh ref={band}>
        {/* @ts-ignore */}
        <meshLineGeometry />
        {/* @ts-ignore */}
        <meshLineMaterial color="#2563eb" lineWidth={0.15} resolution={[1280, 720]} />
      </mesh>
    </>
  );
}