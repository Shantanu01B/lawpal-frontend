import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function RotatingGavel(props) {
  const mesh = useRef();
  const [hovered, setHover] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Rotate and animate gavel
  useFrame((state) => {
    if (mesh.current) {
      // Gentle continuous rotation
      mesh.current.rotation.y += 0.005;
      
      // Hover effect - slight lift and faster rotation
      if (hovered) {
        mesh.current.position.y = THREE.MathUtils.lerp(
          mesh.current.position.y,
          0.5,
          0.1
        );
        mesh.current.rotation.y += 0.02;
      } else {
        mesh.current.position.y = THREE.MathUtils.lerp(
          mesh.current.position.y,
          0,
          0.1
        );
      }

      // Click effect - gavel strike animation
      if (clicked) {
        mesh.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 10) * 0.2;
      } else {
        mesh.current.rotation.z = THREE.MathUtils.lerp(
          mesh.current.rotation.z,
          0,
          0.1
        );
      }
    }
  });

  // Create a more realistic gavel model
  const gavelHead = (
    <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
      <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} />
      <meshStandardMaterial color="#8B5A2B" roughness={0.4} metalness={0.1} />
    </mesh>
  );

  const gavelHandle = (
    <mesh position={[0, -0.5, 0]} castShadow receiveShadow>
      <cylinderGeometry args={[0.08, 0.08, 1.2, 32]} />
      <meshStandardMaterial color="#D2B48C" roughness={0.3} metalness={0.05} />
    </mesh>
  );

  const gavelStrikePlate = (
    <mesh position={[0, 0.6, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
      <cylinderGeometry args={[0.35, 0.35, 0.1, 32]} />
      <meshStandardMaterial color="#A0522D" roughness={0.5} metalness={0.2} />
    </mesh>
  );

  return (
    <group
      {...props}
      ref={mesh}
      scale={hovered ? 1.1 : 1}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      onClick={() => {
        setClicked(!clicked);
        // Play gavel sound effect
        new Audio('/gavel-sound.mp3').play().catch(e => console.log("Audio play failed:", e));
      }}
    >
      {gavelHead}
      {gavelHandle}
      {gavelStrikePlate}
    </group>
  );
}