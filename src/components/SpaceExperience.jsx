import React, { useEffect, useState, Suspense } from 'react';
import * as drei from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import CardBasic from './Cards/CardBasic';
import CardFalcon from './Cards/CardFalcon';
import CardHeavy from './Cards/CardHeavy';
import StarShip from './Cards/Starship';
import Model from './Model';

const { Html, Float, ScrollControls } = drei;

export default function SpaceExperience() {
  const { size } = useThree();
  const [positions, setPositions] = useState([
    [-4.2, -2.5, 0],
    [2.5, -5.5, 0],
    [-4.2, -8.5, 0],
    [2, -12, 0],
  ]);

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      if (width <= 1200) {
        setPositions([
          [-0.8, -2.5, 0],
          [-0.8, -5.5, 0],
          [-0.8, -8.5, 0],
          [-0.8, -12, 0],
        ]);
      } else if (width <= 1700) {
        setPositions([
          [-3.8, -2.5, 0],
          [1, -5.5, 0],
          [-3.5, -8.5, 0],
          [1, -12, 0],
        ]);
      } else {
        setPositions([
          [-4.1, -2.5, 0],
          [2, -5.5, 0],
          [-4.1, -8.5, 0],
          [2, -12, 0],
        ]);
    }
}

    window.addEventListener('resize', handleResize);
    handleResize(); // Call the function initially

    return () => window.removeEventListener('resize', handleResize);
  }, [size]);

  return (
    <>
      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />
      <Suspense fallback={null}>
        <Html position={positions[0]}><CardBasic /></Html>
        <Html position={positions[1]}><CardFalcon /></Html>
        <Html position={positions[2]}><CardHeavy /></Html>
        <Html position={positions[3]}><StarShip /></Html>
        <ScrollControls damping={0.2} pages={3}>
          <Float rotationIntensity={2.5} speed={2} floatIntensity={2}>
            <Model speedFactor={0.5} scaleFactor={1.5} positionFactorY={-2.5} positionFactorX={-1.5} rotationY={Math.PI * 2} />
          </Float>
        </ScrollControls>
      </Suspense>
    </>
  );
}
