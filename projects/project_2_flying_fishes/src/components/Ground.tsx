
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const Ground = () => {
  const groundRef = useRef<THREE.Mesh>(null);
  
  return (
    <mesh 
      receiveShadow 
      rotation={[-Math.PI / 2, 0, 0]} 
      position={[0, -0.1, 0]}
      ref={groundRef}
    >
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="#a5d6a7" roughness={1} />
    </mesh>
  );
};
