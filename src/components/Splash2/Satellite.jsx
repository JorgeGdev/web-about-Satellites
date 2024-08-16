import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

import { AnimationMixer } from 'three';

export default function Satellite( {position, scale}) {
  const modelSatellite =  useGLTF('./models/satellite1.glb');
  const mixer = useRef(null);

  useEffect(() => {
    if (modelSatellite && modelSatellite.animations.length) {
      mixer.current = new AnimationMixer(modelSatellite.scene);
      const action = mixer.current.clipAction(modelSatellite.animations[0]);
      action.play();
    }
  }, [modelSatellite]);

  useFrame((_, delta) => {
    if (mixer.current) {
      mixer.current.update(delta);
    }
  });

  return (
    <>
      <primitive scale={scale} position={position} object={modelSatellite.scene} />
    </>
  );
}