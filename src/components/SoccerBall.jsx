import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

import { AnimationMixer } from 'three';

export default function DancingModel() {
  const modelDancing =  useGLTF('./models/soccer_ball.glb');
  const mixer = useRef(null);

  useEffect(() => {
    if (modelDancing && modelDancing.animations.length) {
      mixer.current = new AnimationMixer(modelDancing.scene);
      const action = mixer.current.clipAction(modelDancing.animations[0]);
      action.play();
    }
  }, [modelDancing]);

  useFrame((_, delta) => {
    if (mixer.current) {
      mixer.current.update(delta);
    }
  });

  return (
    <>
      <primitive scale={0.9} position-y={-0.5} object={modelDancing.scene} />
    </>
  );
}