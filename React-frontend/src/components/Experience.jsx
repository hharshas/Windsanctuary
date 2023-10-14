import { Float, PerspectiveCamera, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { BirdAvatar } from "./Bird_animations_alex";

import { Cloud } from "./Cloud";
import { Background } from "./Backgriund";

const LINE_NB_POINTS = 12000;

export const Experience = () => {

  // const {menuOpened} = props;


  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, 10),
        new THREE.Vector3(-2, 0, 20),
        new THREE.Vector3(-3, 0, 30),
        new THREE.Vector3(0, 0, 40),
        new THREE.Vector3(5, 0, 50),
        new THREE.Vector3(7, 0, 60),
        new THREE.Vector3(5, 0, 70),
        new THREE.Vector3(0, 0, 80),
        new THREE.Vector3(0, 0, 90),
        new THREE.Vector3(0, 0, 100),
      ],
      false,
      "catmullrom",
      0.5
    );
  }, []);

  const linePoints = useMemo(() => {
    return curve.getPoints(LINE_NB_POINTS);
  }, [curve]);

  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -0.2);
    shape.lineTo(0, 0.2);

    return shape;
  }, [curve]);

  const cameraGroup = useRef();
  const scroll = useScroll();

  useFrame((_state, delta) => {
    const curPointIndex = Math.min(
      Math.round(scroll.offset * linePoints.length),
      linePoints.length - 1
    );
    const curPoint = linePoints[curPointIndex];
    const pointAhead =
      linePoints[Math.min(curPointIndex + 1, linePoints.length - 1)];

    const xDisplacement = (pointAhead.x - curPoint.x) * 80;

    // Math.PI / 2 -> LEFT
    // -Math.PI / 2 -> RIGHT

    const angleRotation =
      (xDisplacement < 0 ? 1 : -1) *
      Math.min(Math.abs(xDisplacement), Math.PI / 3);

    const targetBirdQuaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        bird.current.rotation.x,
        bird.current.rotation.y,
        angleRotation
      )
    );
    const targetCameraQuaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        cameraGroup.current.rotation.x,
        angleRotation,
        cameraGroup.current.rotation.z
      )
    );

    bird.current.quaternion.slerp(targetBirdQuaternion, delta * 2);
    cameraGroup.current.quaternion.slerp(targetCameraQuaternion, delta * 2);

    cameraGroup.current.position.lerp(curPoint, delta * 24);
  });

  const bird = useRef();

  return (
    <>
      {/* <OrbitControls enableZoom={false} /> */}
      <group ref={cameraGroup}>
        <Background />
        {/* <ambientLight intensity={1} /> */}
        <PerspectiveCamera position={[0,0, 5]} fov={30} makeDefault />
        <group ref={bird}>
          <Float floatIntensity={2} speed={2}>
            <BirdAvatar
              // rotation-y={Math.PI}
              scale={[0.4, 0.4, 0.4]}
              position-y={-0.5}
            />
          </Float>
        </group>
      </group>

      {/* LINE */}
      <group position-y={-2}>
        {/* <mesh>
          <extrudeGeometry
            args={[
              shape,
              {
                steps: LINE_NB_POINTS,
                bevelEnabled: false,
                extrudePath: curve,
              },
            ]}
          />
          <meshStandardMaterial color={"white"} opacity={0.7} transparent />
        </mesh> */}
      </group>

      {/* CLOUDS */}
      <group scale={[2,2,2]}>
      <Cloud opacity={0.4} scale={[0.3, 0.3, 0.3]} position={[-2, 1, 3]} />
      <Cloud opacity={0.4} scale={[0.2, 0.3, 0.4]} position={[1.5, -0.5, 2]} />
      <Cloud
        opacity={0.7}
        scale={[0.3, 0.3, 0.4]}
        rotation-y={Math.PI / 9}
        position={[2, -0.2, 2]}
      />
      <Cloud
        opacity={0.7}
        scale={[0.4, 0.4, 0.4]}
        rotation-y={Math.PI / 9}
        position={[1, -0.2, 6]}
      />
      <Cloud opacity={0.2} scale={[0.3, 0.3, 0.3]} position={[-2, 1, -10]} />
      <Cloud opacity={0.7} scale={[0.3, 0.3, 0.3]} position={[2, 1, -14]} />
      <Cloud opacity={0.7} scale={[0.5, 0.5, 0.5]} position={[-1, 1, 9]} />
      <Cloud opacity={0.3} scale={[0.8, 0.8, 0.8]} position={[0, 1,20]} />
      <Cloud opacity={0.2} scale={[0.3, 0.3, 0.3]} position={[-2, 1, 40]} />
      <Cloud opacity={0.7} scale={[0.3, 0.3, 0.3]} position={[2, 1, 20]} />
      <Cloud opacity={1} scale={[0.3, 0.3, 0.3]} position={[-2, 1, 30]} />
      <Cloud opacity={1} scale={[0.4, 0.4, 0.4]} position={[2, 1, 35]} />
      <Cloud opacity={1} scale={[0.5, 0.5, 0.5]} position={[3, 1, 40]} />
      <Cloud opacity={0.8} scale={[0.3, 0.3, 0.3]} position={[-4, 1, 44]} />



      </group>
    </>
  );
};