import { Canvas } from '@react-three/fiber';
import SatelliteExperience from './SatelliteExperience.jsx';

export default function SatelliteModel() {
  return (
    <Canvas
    camera={{
      fov: 35,
      near: 1,
      far: 100,
      
    }}
    style={{ background: '#000000' }} 
  >
    <SatelliteExperience />
  </Canvas>
  );
}