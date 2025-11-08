"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useRef } from "react";

function Model() {
  const { scene } = useGLTF("/com.glb");
  const modelRef = useRef<any>();

  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.2;
    }
  });

  return <primitive ref={modelRef} object={scene} scale={1.2} position={[0, -1, 0]} />;
}

export default function ModelViewer() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [2, 2, 7], fov: 40 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
        <OrbitControls enableZoom={true} enablePan={true} />
      </Canvas>
    </div>
  );
}
