import { useState, useEffect, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useFont, OrbitControls, CameraControls } from "@react-three/drei";
import * as THREE from "three";

import MODEL from "../../Assets/test.glb";
import "./index.css";

export const Model = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [rotationX, setRotationX] = useState(0);
  const modelObj = useLoader(GLTFLoader, MODEL);
  const groupRef = useRef();
  const controls = useRef();

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //   const CameraMovement = () => {
  //     useFrame(() => {
  //       if (controls.current) {
  //         controls.current._removeAllEventListeners();
  //         controls.current.dolly(0.001);
  //         controls.current.smoothTime = 1.5;
  //         console.log(controls.current);
  //       }
  //     });

  //     return <CameraControls ref={controls} />;
  //   };

  const OBJ = () => {
    return (
      <group
        position={[0, -0.5, -1]}
        scale={3}
        rotation-x={0.25}
        rotation-y={-0.1}
        ref={groupRef}
        frustumCulled={false}
      >
        <primitive object={modelObj.scene} position={[0, 0, 0]} />
      </group>
    );
  };

  return (
    <div className="canvas-container">
      <Canvas
        frameloop="always"
        camera={{
          fov: 75,
          near: 0.001,
          far: 10000,
          position: [0, 0, 3],
        }}
        shadows
      >
        <directionalLight
          castShadow
          color="#87ceeb"
          intensity={10}
          position={[0, 0, 3]}
        />
        <directionalLight
          castShadow
          color="#87ceeb"
          intensity={5}
          position={[0, 0, -3]}
        />
        <OBJ />
        <OrbitControls />
        <EffectComposer>
          <Bloom mipmapBlur intensity={0.5} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

useFont.preload("../../Assets/model.glb");
