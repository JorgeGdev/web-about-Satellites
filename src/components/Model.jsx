import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { AnimationMixer } from "three";
import { useScroll } from "@react-three/drei";

useGLTF.preload("./models/space.glb");

export default function Model({ speedFactor = 1, scaleFactor = 0.5, positionFactorY = 1.5, positionFactorX = 4.5, rotationY = Math.PI * 2 }) {
    const groupRef = useRef(null);
    const mixer = useRef(null);
    const actionsRef = useRef([]);
    const robotModel = useGLTF("./models/space.glb");
    const scroll = useScroll();

    useEffect(() => {
        if (robotModel && robotModel.animations.length) {
            mixer.current = new AnimationMixer(robotModel.scene);
            robotModel.animations.forEach((clip, index) => {
                const action = mixer.current.clipAction(clip);
                action.play(); // Iniciar la animación
                action.paused = true; // Pausar inmediatamente
                actionsRef.current[index] = action;
            });
        }
    }, [robotModel]);

    useFrame(() => {
        if (mixer.current && actionsRef.current.length) {
            const scrollPosition = scroll.offset; // Obtiene la posición del scroll
            const adjustedScrollPosition = scrollPosition * speedFactor; // Ajusta la velocidad
            actionsRef.current.forEach(action => {
                action.time = adjustedScrollPosition * action.getClip().duration;
            });
            mixer.current.update(0);
        }

        if (groupRef.current) {
            const scrollPosition = scroll.offset; // Obtiene la posición del scroll
            const newScale = 1 + (scrollPosition * scaleFactor); // Ajusta el scale basado en el scroll
            groupRef.current.scale.set(newScale, newScale, newScale); // Aplica el nuevo scale

            const newYPosition = scrollPosition * positionFactorY; // Ajusta la posición Y basado en el scroll
            groupRef.current.position.y = newYPosition; // Aplica la nueva posición Y

            const newXPosition = scrollPosition * positionFactorX; // Ajusta la posición X basado en el scroll
            groupRef.current.position.x = newXPosition; // Aplica la nueva posición X

            const newRotation = scrollPosition * rotationY; // Ajusta la rotación basado en el scroll en el eje Y
            groupRef.current.rotation.y = newRotation; // Aplica la rotación
        }
    });

    return (
        <group ref={groupRef}>
            <primitive scale={0.25} position-y={-1} object={robotModel.scene} />
        </group>
    );
}
