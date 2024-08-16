import { useRef } from 'react';
import { useFrame } from '@react-three/fiber'
import { Float, Center, Environment, OrbitControls } from '@react-three/drei';
import SoccerBall from './SoccerBall.jsx'



export default function DancingModelExperience() {

    const groupRef = useRef()



  useFrame((_, delta) => {
    groupRef.current.rotation.y += delta / 10

  })

  return (
    <>
        <OrbitControls enableZoom= {false} />
      <Environment preset='city' />
      <directionalLight cast position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />


        <Float rotationIntensity={0.4}>
           
                <group ref={groupRef} >
                    <SoccerBall />
                </group>
           
        </Float>

        

    </>
  )}