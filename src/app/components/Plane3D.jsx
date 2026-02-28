"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense } from "react";

function PlaneModel() {
  const { scene } = useGLTF("/plane.glb");

  return (
    <primitive
      object={scene}
      scale={0.5}
      position={[0, -1, 0]}
      rotation={[0, Math.PI / 2, 0]}
    />
  );
}

export default function Plane3D() {
  return (
    <div className="h-100 w-full">
      <Canvas
        camera={{ position: [0, 1, 5], fov: 50 }}
        dpr={[1, 1.5]} // performance safe
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[2, 3, 5]} intensity={2} />

        <Suspense fallback={null}>
          <PlaneModel />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
        />
      </Canvas>
    </div>
  );
}