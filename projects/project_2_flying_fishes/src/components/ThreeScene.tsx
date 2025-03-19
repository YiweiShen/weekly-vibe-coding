import { Suspense, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Sky } from '@react-three/drei'
import * as THREE from 'three'
import { Tree } from './Tree'
import { Fish } from './Fish'
import { Ground } from './Ground'

const Scene = ({ fish }) => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />

      {/* Add sky component */}
      <Sky
        distance={450}
        sunPosition={[0, 1, 0]}
        inclination={0.6}
        azimuth={0.25}
        rayleigh={0.3} // Reduced atmosphere thickness for more vivid blue
        turbidity={0.5} // Clearer sky
      />

      {/* Smaller tree */}
      <Tree position={[0, 0, 0]} scale={0.7} />
      <Ground />

      <FishSchool fish={fish} />

      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.5}
        minDistance={5}
        maxDistance={20}
      />
    </>
  )
}

interface FishSchoolProps {
  fish: { position: [number, number, number]; color: string }[]
}

const FishSchool: React.FC<FishSchoolProps> = ({ fish }) => {
  return (
    <>
      {fish.map((config, index) => (
        <Fish key={index} position={config.position} />
      ))}
    </>
  )
}

const ThreeScene = () => {
  const [fish, setFish] = useState<
    { position: [number, number, number]; color: string }[]
  >([])

  const handleClick = (event: React.MouseEvent) => {
    const newFish = {
      position: [
        // random position
        (Math.random() - 0.5) * 50,
        Math.random() * 10,
        (Math.random() - 0.5) * 20
      ],
      color: `hsl(${Math.random() * 360}, 100%, 50%)`
    }
    setFish((prevFish) => [...prevFish, newFish])
  }

  return (
    <div className="canvas-container" onClick={handleClick}>
      <Suspense fallback={<LoadingScreen />}>
        <Canvas shadows>
          {/* Adjusted camera position to show more sky in the upper half */}
          <PerspectiveCamera makeDefault position={[0, 5, 30]} fov={80} />
          <Scene fish={fish} /> {/* Pass fish here */}
        </Canvas>
      </Suspense>
    </div>
  )
}

const LoadingScreen = () => {
  return (
    <div className="loading">
      <div className="loader"></div>
    </div>
  )
}

export default ThreeScene
