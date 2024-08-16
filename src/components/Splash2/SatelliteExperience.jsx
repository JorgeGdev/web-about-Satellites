import React, { useRef, useEffect } from 'react';
import { OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber'; 
import Particles from './Particles';

const SatelliteExperience = () => {
  const controlsRef = useRef();
  const { camera } = useThree(); // Accede a la cámara usando useThree

  useEffect(() => {
    // Ajusta la posición de la cámara desde aquí
    camera.position.set(-10, 5, -10);
    camera.updateProjectionMatrix(); // Asegúrate de actualizar la matriz de proyección de la cámara si cambias parámetros críticos
  }, [camera]);

  return (
    <>
      <ambientLight intensity={0.82} color={0xa0a0fc} />
      <directionalLight intensity={1.96} color={0xe8c37b} position={[-0.1, 0, 0]} />
      <OrbitControls enableZoom={false} ref={controlsRef} />
      <Particles />
    </>
  );
};

export default SatelliteExperience;
