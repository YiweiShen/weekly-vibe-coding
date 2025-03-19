
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FishProps {
  position: [number, number, number];
  speed?: number;
  rotationOffset?: number;
  amplitude?: number;
  size?: number;
}

export const Fish = ({ 
  position, 
  speed = 0.3, 
  rotationOffset = 0, 
  amplitude = 1,
  size = 1
}: FishProps) => {
  const fishRef = useRef<THREE.Group>(null);
  const tailRef = useRef<THREE.Mesh>(null);
  const finRightRef = useRef<THREE.Mesh>(null);
  const finLeftRef = useRef<THREE.Mesh>(null);
  
  const center = useRef<[number, number, number]>([0, position[1], 0]);
  const radius = useRef<number>(Math.sqrt(position[0] * position[0] + position[2] * position[2]));
  
  // Swimming animation path and tail motion
  useFrame(({ clock }) => {
    if (fishRef.current && tailRef.current && finRightRef.current && finLeftRef.current) {
      const time = clock.getElapsedTime();
      
      // Circular swimming motion
      const angle = time * speed + rotationOffset;
      const x = Math.cos(angle) * radius.current;
      const z = Math.sin(angle) * radius.current;
      const y = position[1] + Math.sin(time) * amplitude * 0.5;
      
      fishRef.current.position.set(x, y, z);
      
      // Rotate fish to face movement direction
      fishRef.current.rotation.y = Math.atan2(-Math.cos(angle), -Math.sin(angle));
      
      // Tail and fin wiggle animation
      tailRef.current.rotation.y = Math.sin(time * 5) * 0.4;
      finRightRef.current.rotation.z = Math.PI / 4 + Math.sin(time * 4) * 0.2;
      finLeftRef.current.rotation.z = -Math.PI / 4 - Math.sin(time * 4) * 0.2;
    }
  });

  const fishColor = new THREE.Color(
    0.1 + Math.random() * 0.2,
    0.4 + Math.random() * 0.4,
    0.7 + Math.random() * 0.3
  );

  return (
    <group ref={fishRef} position={position} scale={[size, size, size]}>
      {/* Fish body */}
      <mesh castShadow>
        <sphereGeometry args={[0.5, 32, 16]} />
        <meshStandardMaterial color={fishColor} metalness={0.2} roughness={0.3} />
        <group scale={[1, 0.6, 2]}>
          {/* This empty group scales the sphere into an ellipsoid shape */}
        </group>
      </mesh>
      
      {/* Fish tail */}
      <mesh ref={tailRef} position={[-0.8, 0, 0]} castShadow>
        <coneGeometry args={[0.3, 0.8, 2, 1]} />
        <meshStandardMaterial color={fishColor} metalness={0.2} roughness={0.3} />
      </mesh>
      
      {/* Fish fins */}
      <mesh ref={finRightRef} position={[0, 0, 0.3]} rotation={[0, 0, Math.PI / 4]} castShadow>
        <coneGeometry args={[0.1, 0.5, 2, 1]} />
        <meshStandardMaterial color={fishColor} metalness={0.2} roughness={0.3} />
      </mesh>
      
      <mesh ref={finLeftRef} position={[0, 0, -0.3]} rotation={[0, 0, -Math.PI / 4]} castShadow>
        <coneGeometry args={[0.1, 0.5, 2, 1]} />
        <meshStandardMaterial color={fishColor} metalness={0.2} roughness={0.3} />
      </mesh>
    </group>
  );
};
