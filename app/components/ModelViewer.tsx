"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useRef, useEffect } from "react";
import * as THREE from "three";

// 定数定義
const MODEL_CONFIG = {
  PATH: "/com.glb",
  SCALE: 1.2,
  POSITION: [0, -1, 0] as [number, number, number],
} as const;

const ROTATION_SPEEDS = {
  MOVING: 5.0,
  IDLE: 0.2,
} as const;

const CAMERA_CONFIG = {
  POSITION: [2, 2, 7] as [number, number, number],
  FOV: 40,
} as const;

const LIGHT_CONFIG = {
  AMBIENT_INTENSITY: 0.5,
  DIRECTIONAL_INTENSITY: 1,
  DIRECTIONAL_POSITION: [10, 10, 5] as [number, number, number],
} as const;

interface ModelProps {
  isMoving: boolean;
}

function Model({ isMoving }: ModelProps) {
  const { scene } = useGLTF(MODEL_CONFIG.PATH);
  const modelRef = useRef<THREE.Group>(null);
  const isMovingRef = useRef(isMoving);

  // isMovingの最新値をrefに保存
  useEffect(() => {
    isMovingRef.current = isMoving;
  }, [isMoving]);

  useFrame((state, delta) => {
    if (modelRef.current) {
      // 移動中は回転速度を速くする
      const rotationSpeed = isMovingRef.current ? ROTATION_SPEEDS.MOVING : ROTATION_SPEEDS.IDLE;
      modelRef.current.rotation.y += delta * rotationSpeed;
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={MODEL_CONFIG.SCALE}
      position={MODEL_CONFIG.POSITION}
    />
  );
}

interface ModelViewerProps {
  isMoving?: boolean;
}

export default function ModelViewer({ isMoving = false }: ModelViewerProps) {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: CAMERA_CONFIG.POSITION, fov: CAMERA_CONFIG.FOV }}>
        <ambientLight intensity={LIGHT_CONFIG.AMBIENT_INTENSITY} />
        <directionalLight
          position={LIGHT_CONFIG.DIRECTIONAL_POSITION}
          intensity={LIGHT_CONFIG.DIRECTIONAL_INTENSITY}
        />
        <Suspense fallback={null}>
          <Model isMoving={isMoving} />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={true} />
      </Canvas>
    </div>
  );
}
