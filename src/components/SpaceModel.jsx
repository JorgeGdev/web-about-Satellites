import { Canvas } from '@react-three/fiber';
import SpaceExperience from './SpaceExperience.jsx'

export default function DancingMainModel() {
  return (
    <Canvas 
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
      }}
    >
      <SpaceExperience />
    </Canvas>
  );
}