"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useRef } from "react";

interface ModelProps {
  scrollProgress: number;
}

function Model({ scrollProgress }: ModelProps) {
  const { scene } = useGLTF("/com.glb");
  const modelRef = useRef<any>();

  useFrame((state, delta) => {
    if (modelRef.current) {
      // 移行期間（0.5-1.0）は回転速度を速くする
      const isTransitioning = scrollProgress > 0.5 && scrollProgress < 1.0;
      const rotationSpeed = isTransitioning ? 0.8 : 0.2;
      modelRef.current.rotation.y += delta * rotationSpeed;
    }
  });

  return <primitive ref={modelRef} object={scene} scale={1.2} position={[0, -1, 0]} />;
}

interface ModelViewerProps {
  scrollProgress?: number;
}

export default function ModelViewer({ scrollProgress = 0 }: ModelViewerProps) {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [2, 2, 7], fov: 40 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Model scrollProgress={scrollProgress} />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={true} />
      </Canvas>
    </div>
  );
}
