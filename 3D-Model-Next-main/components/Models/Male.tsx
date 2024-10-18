import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { TransformControls, useGLTF, useHelper } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { Body } from "./Body";

type GLTFResult = GLTF & {
  nodes: {
    head: THREE.SkinnedMesh;
    left_arm: THREE.SkinnedMesh;
    left_leg: THREE.SkinnedMesh;
    right_arm: THREE.SkinnedMesh;
    right_leg: THREE.SkinnedMesh;
    torso: THREE.SkinnedMesh;
    mixamorigHips: THREE.Bone;
  };
  materials: {
    lambert3: THREE.MeshStandardMaterial;
  };
};

export function Male(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/male.glb") as unknown as GLTFResult;
  //
  const boneRef = useRef<THREE.Bone>(null);
  const skeletonRef = useRef<THREE.SkinnedMesh>(null);
  // useHelper(boneRef, THREE.SkeletonHelper);
  useEffect(() => {
    Body(skeletonRef.current!);
  }, [skeletonRef]);
  //////////////////////////////
  let material: any = materials.lambert3;
  useEffect(() => {
    const drawingCanvas: any = document.getElementById("drawing-canvas");
    const drawingContext = drawingCanvas!.getContext("2d");
    const drawStartPos = new THREE.Vector2();

    // draw white background
    drawingContext.fillStyle = "#FFFFFF";
    drawingContext.fillRect(0, 0, 128, 128);
    // set canvas as material.map (this could be done to any map, bump, displacement etc.)
    material.map = new THREE.CanvasTexture(drawingCanvas);
    // set the variable to keep track of when to draw
    const draw = (drawContext: any, x: any, y: any) => {
      drawContext.moveTo(drawStartPos.x, drawStartPos.y);
      drawContext.strokeStyle = "#000000";
      drawContext.lineTo(x, y);
      drawContext.stroke();
      // reset drawing start position to current position.
      drawStartPos.set(x, y);
      // need to flag the map as needing updating.
      material.map.needsUpdate = true;
    };

    let paint = false;

    // add canvas event listeners
    drawingCanvas?.addEventListener("pointerdown", function (e: any) {
      paint = true;
      drawStartPos.set(e.offsetX, e.offsetY);
    });

    drawingCanvas?.addEventListener("pointermove", function (e: any) {
      if (paint) draw(drawingContext, e.offsetX, e.offsetY);
    });

    drawingCanvas?.addEventListener("pointerup", function () {
      paint = false;
    });

    drawingCanvas?.addEventListener("pointerleave", function () {
      paint = false;
    });
  }, [material]);
  return (
    <>
      <group frustumCulled={false} {...props} dispose={null}>
        <group
          frustumCulled={false}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.01}
        >
          <primitive ref={boneRef} object={nodes.mixamorigHips} />
          <skinnedMesh
            frustumCulled={false}
            ref={skeletonRef}
            geometry={nodes.head.geometry}
            material={material}
            skeleton={nodes.head.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.left_arm.geometry}
            material={materials.lambert3}
            skeleton={nodes.left_arm.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.left_leg.geometry}
            material={materials.lambert3}
            skeleton={nodes.left_leg.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            name="hand"
            geometry={nodes.right_arm.geometry}
            material={materials.lambert3}
            skeleton={nodes.right_arm.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.right_leg.geometry}
            material={materials.lambert3}
            skeleton={nodes.right_leg.skeleton}
          />
          <skinnedMesh
            frustumCulled={false}
            geometry={nodes.torso.geometry}
            material={materials.lambert3}
            skeleton={nodes.torso.skeleton}
          />
        </group>
      </group>
    </>
  );
}

useGLTF.preload("/male.glb");
