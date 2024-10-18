import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import { useGLTF, useHelper } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { Body } from "./Body";

type GLTFResult = GLTF & {
  nodes: {
    head: THREE.SkinnedMesh;
    left_leg: THREE.SkinnedMesh;
    right_leg: THREE.SkinnedMesh;
    left_arm: THREE.SkinnedMesh;
    left_arm001: THREE.SkinnedMesh;
    torso: THREE.SkinnedMesh;
    Hips: THREE.Bone;
  };
  materials: {
    lambert2: THREE.MeshStandardMaterial;
  };
};

export function Female(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/female.glb") as unknown as GLTFResult;

  //
  const boneRef = useRef<THREE.Bone>(null);
  const skeletonRef = useRef<THREE.SkinnedMesh>(null);

  // useHelper(boneRef, THREE.SkeletonHelper);

  useEffect(() => {
    Body(skeletonRef.current!);
    // console.log(skeletonRef.current);
  }, [skeletonRef]);
  return (
    <group {...props} dispose={null}>
      <group
        position={[0, 0.38, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.05}
      >
        <primitive ref={boneRef} object={nodes.Hips} />
        <skinnedMesh
          ref={skeletonRef}
          geometry={nodes.head.geometry}
          material={materials.lambert2}
          skeleton={nodes.head.skeleton}
        />
        <skinnedMesh
          geometry={nodes.left_leg.geometry}
          material={materials.lambert2}
          skeleton={nodes.left_leg.skeleton}
        />
        <skinnedMesh
          geometry={nodes.right_leg.geometry}
          material={materials.lambert2}
          skeleton={nodes.right_leg.skeleton}
        />
        <skinnedMesh
          geometry={nodes.left_arm.geometry}
          material={materials.lambert2}
          skeleton={nodes.left_arm.skeleton}
        />
        <skinnedMesh
          geometry={nodes.left_arm001.geometry}
          material={materials.lambert2}
          skeleton={nodes.left_arm001.skeleton}
        />
        <skinnedMesh
          geometry={nodes.torso.geometry}
          material={materials.lambert2}
          skeleton={nodes.torso.skeleton}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/female.glb");
