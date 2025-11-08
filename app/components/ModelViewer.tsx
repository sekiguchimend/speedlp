"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useRef } from "react";

interface ModelProps {
  isMoving: boolean;
}

function Model({ isMoving }: ModelProps) {
  const { scene } = useGLTF("/com.glb");
  const modelRef = useRef<any>();
  const isMovingRef = useRef(isMoving);

  // isMovingの最新値をrefに保存
  isMovingRef.current = isMoving;

  useFrame((state, delta) => {
    if (modelRef.current) {
      // 移動中は回転速度を速くする
      const rotationSpeed = isMovingRef.current ? 5.0 : 0.2;
      modelRef.current.rotation.y += delta * rotationSpeed;
    }
  });

  return <primitive ref={modelRef} object={scene} scale={1.2} position={[0, -1, 0]} />;
}

interface ModelViewerProps {
  isMoving?: boolean;
}

export default function ModelViewer({ isMoving = false }: ModelViewerProps) {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [2, 2, 7], fov: 40 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Model isMoving={isMoving} />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={true} />
      </Canvas>
    </div>
  );
}
