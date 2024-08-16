import React, { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { BufferGeometry, BufferAttribute, Vector3, TextureLoader } from 'three';
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const Particles = () => {
  const { scene } = useGLTF('/models/satelite.glb');
  const particlesRef = useRef();
  const [texture, setTexture] = useState(null);
  const count = 50000; // Número de partículas

  const uniformsRef = useRef({
    mousePos: { value: new THREE.Vector3() },
    uDistortionStrength: { value: 1.0 },
    time: { value: 0 }
  });

  const mousePositionRef = useRef(new THREE.Vector2());

  useEffect(() => {
    const loader = new TextureLoader();
    loader.load('/textures/particle-texture.jpg', (loadedTexture) => {
      setTexture(loadedTexture);
    });
  }, []);

  useEffect(() => {
    const handleMouseMove = (event) => {
      mousePositionRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mousePositionRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (!scene || !texture) return;

    let mesh;
    scene.traverse((child) => {
      if (child.isMesh) {
        mesh = child;
      }
    });

    if (!mesh) {
      console.error('No se encontró ningún Mesh con geometría en la escena');
      return;
    }

    const sampler = new MeshSurfaceSampler(mesh)
      .setWeightAttribute(null)
      .build();

    const positions = new Float32Array(count * 3);
    const tempPosition = new Vector3();

    for (let i = 0; i < count; i++) {
      sampler.sample(tempPosition);
      positions.set([tempPosition.x, tempPosition.y, tempPosition.z], i * 3);
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(positions, 3));

    if (particlesRef.current) {
      particlesRef.current.geometry = geometry;
      particlesRef.current.material = new THREE.PointsMaterial({
        size: 0.1,
        color: 0xF7F7F7,
        map: texture,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: false,
        alphaTest: 0.5,
        onBeforeCompile: (shader) => {
          shader.uniforms.mousePos = uniformsRef.current.mousePos;
          shader.uniforms.uDistortionStrength = uniformsRef.current.uDistortionStrength;
          shader.uniforms.time = uniformsRef.current.time;

          shader.vertexShader = `
            uniform vec3 mousePos;
            uniform float uDistortionStrength;
            uniform float time;
            varying float vDistortion;
            varying vec3 vPosition;

            ${shader.vertexShader}
          `.replace(
            `#include <begin_vertex>`,
            `#include <begin_vertex>
              vec3 worldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
              vec3 seg = worldPosition - mousePos;
              float dist = length(seg);
              vec3 dir = normalize(seg);

              // Aplicar fuerza en función de la distancia
              float force = clamp(1.0 / (dist * dist + 0.1), 0.0, uDistortionStrength);
              transformed += dir * force;

              // Agregar distorsión basada en la posición, tiempo y movimiento sinusoidal
              transformed += sin(worldPosition * 10.0 + time * 2.0) * 0.1 * uDistortionStrength;
              
              // Pulso en el tamaño de las partículas
              float sizePulse = 1.0 + 0.5 * sin(time * 2.0 + position.y * 5.0);
              gl_PointSize *= sizePulse;

              vDistortion = force;
              vPosition = transformed;
            `
          );

          shader.fragmentShader = `
            varying float vDistortion;
            varying vec3 vPosition;

            ${shader.fragmentShader}
          `.replace(
            `#include <dithering_fragment>`,
            `#include <dithering_fragment>
              // Crear un efecto de color que cambie con la distorsión y la posición
              vec3 colorShift = vec3(1.0, 0.5 + sin(vPosition.x * 10.0), 0.5 + cos(vPosition.y * 10.0));
              gl_FragColor.rgb *= colorShift * (1.0 - vDistortion);
            `
          );
        },
      });
    }
  }, [scene, texture]);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001;
      

      if (uniformsRef.current) {
        uniformsRef.current.mousePos.value.set(
          mousePositionRef.current.x * 10,
          mousePositionRef.current.y * 10,
          0
        );

        uniformsRef.current.time.value = state.clock.getElapsedTime();
      }
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry />
      <pointsMaterial />
    </points>
  );
};

export default Particles;
