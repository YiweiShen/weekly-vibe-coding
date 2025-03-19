
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface TreeProps {
  position?: [number, number, number];
  scale?: number;
}

export const Tree = ({ position = [0, 0, 0], scale = 1 }: TreeProps) => {
  const treeRef = useRef<THREE.Group>(null);
  const leavesRef = useRef<THREE.Mesh>(null);
  
  // Gentle swaying animation for the tree
  useFrame(({ clock }) => {
    if (treeRef.current) {
      const time = clock.getElapsedTime();
      treeRef.current.rotation.y = Math.sin(time * 0.1) * 0.05;
    }
    
    if (leavesRef.current) {
      const time = clock.getElapsedTime();
      leavesRef.current.rotation.y = Math.sin(time * 0.2) * 0.1;
      leavesRef.current.position.y = 4 + Math.sin(time * 0.3) * 0.05;
    }
  });

  return (
    <group ref={treeRef} position={position} castShadow receiveShadow scale={[scale, scale, scale]}>
      {/* Tree trunk */}
      <mesh castShadow position={[0, 2, 0]}>
        <cylinderGeometry args={[0.5, 0.8, 4, 8]} />
        <meshStandardMaterial color="#5d4037" roughness={0.8} />
      </mesh>
      
      {/* Tree leaves */}
      <mesh ref={leavesRef} castShadow position={[0, 4, 0]}>
        <coneGeometry args={[3, 4, 8]} />
        <meshStandardMaterial color="#81c784" roughness={0.7} />
      </mesh>
    </group>
  );
};
