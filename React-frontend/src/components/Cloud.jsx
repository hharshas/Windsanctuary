import { useGLTF } from "@react-three/drei";
import React from "react";

export function Cloud({ opacity, ...props }) {
  const { nodes, materials } = useGLTF("./models/cloud.glb");
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Node.geometry}>
        <meshStandardMaterial
          {...materials["lambert2SG.001"]}
          transparent
          opacity={opacity}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("./models/cloud.glb");