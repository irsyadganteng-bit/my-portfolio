'use client';

import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture, Environment } from '@react-three/drei';
import { Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';

export default function Lanyard({ position = [0, 0, 30], fov = 20 }: { position?: [number, number, number]; fov?: number }) {
  return (
    <div className="w-full h-[500px] relative flex items-center justify-center">
      <Canvas camera={{ position, fov }} gl={{ alpha: true }}>
        <ambientLight intensity={Math.PI} />
        <Environment preset="city" />
        <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
          <Band />
        </Physics>
      </Canvas>
    </div>
  );
}

function Band() {
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const card = useRef<any>(null);

  const texture = useTexture('/photo.png'); // Mengambil foto dari folder public/photo.png

  const vec = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const [dragged, drag] = useState<THREE.Vector3 | false>(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j2, card, [[0, 0, 0], [0, 1.45, 0]]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = 'pointer';
      return () => { document.body.style.cursor = 'auto'; };
    }
  }, [hovered]);

  useFrame((state) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - (dragged as THREE.Vector3).x,
        y: vec.y - (dragged as THREE.Vector3).y,
        z: vec.z - (dragged as THREE.Vector3).z
      });
    }
  });

  return (
    <>
      {/* Anchor / Pengait Atas */}
      <RigidBody ref={fixed} type="fixed" position={[0, 4, 0]} />
      
      {/* Sendi Tali */}
      <RigidBody ref={j1} position={[0.5, 2, 0]} linearDamping={2} angularDamping={2}>
        <mesh><sphereGeometry args={[0.1]} /><meshBasicMaterial visible={false} /></mesh>
      </RigidBody>
      <RigidBody ref={j2} position={[1, 0, 0]} linearDamping={2} angularDamping={2}>
        <mesh><sphereGeometry args={[0.1]} /><meshBasicMaterial visible={false} /></mesh>
      </RigidBody>

      {/* Kartu ID Card 3D */}
      <RigidBody
        ref={card}
        position={[1.5, -2, 0]}
        type={dragged ? 'kinematicPosition' : 'dynamic'}
        enabledRotations={[true, true, true]}
        linearDamping={2}
        angularDamping={2}
      >
        <mesh
          onPointerOver={() => hover(true)}
          onPointerOut={() => hover(false)}
          onPointerDown={(e: any) => {
            e.stopPropagation();
            drag(new THREE.Vector3().copy(e.point).sub(card.current.translation()));
          }}
          onPointerUp={() => drag(false)}
        >
          <boxGeometry args={[2.2, 3.4, 0.08]} />
          <meshStandardMaterial map={texture} roughness={0.3} metalness={0.1} />
        </mesh>
      </RigidBody>
    </>
  );
}