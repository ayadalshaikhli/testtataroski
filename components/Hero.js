import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import React, { Suspense, useRef, useState, useEffect } from "react";
import {
  Environment,
  Html,
  PerspectiveCamera,
  useGLTF,
} from "@react-three/drei";
import { Section } from "./section";
import * as THREE from "three";
import { proxy, useSnapshot } from "valtio";
import { gsap, Expo } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
const color = new THREE.Color();
const tl = gsap.timeline({
  defaults: { ease: "power1.out" },
});

const Lights = () => {
  return (
    <>
      {/* Ambient Light illuminates lights for all objects */}
      <ambientLight intensity={10.3} />
      {/* Diretion light */}
      <directionalLight position={[10, 10, 5]} intensity={2.5} />
      <directionalLight
        castShadow
        position={[0, 10, 0]}
        intensity={1.5}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      {/* Spotlight Large overhead light */}
      <spotLight intensity={1.5} position={[1000, 0, 0]} castShadow />
    </>
  );
};

function Green() {
  const { nodes, materials } = useGLTF("/ringGreenddd.glb");
  const cup = useRef();
  const moon = useRef();
  const mark = useRef();
  // const [hovered, set] = useState();

  // for demonstrating first eye is same as second eye
  // Output: false, true=
  // useEffect(() => {
  //   if (hovered)
  //     moon.current.getObjectByName(hovered).material.color.set("white");
  //   document.body.style.cursor = hovered ? "pointer" : "auto";
  // }, [hovered]);
  // useFrame((state) => {
  //   moon.current.children[0].children.forEach((child, index) => {
  //     child.material.color.lerp(
  //       color
  //         .set(hovered === child.name ? "gold" : "white")
  //         .convertSRGBToLinear(),
  //       hovered ? 0.1 : 0.05
  //     );
  //   });
  // });

  useEffect((state) => {
    // cup.current.rotation.y = 6.2;
    cup.current.rotation.x = 6;

    tl.from(moon.current.position, 3, {
      y: 300,
      ease: Expo.easeInOut,
    });

    // tl.from(
    //   moon.current.rotation,
    //   60,
    //   {
    //     y: 7.26573,
    //     ease: "none",
    //     repeat: -1,
    //   },
    //   -3
    // );
    ScrollTrigger.create({
      trigger: ".product-list",
      start: "top 50%",
      end: "bottom 0%",

      onEnter: () => {
        gsap.to(".body", {
          duration: 1.0,
          backgroundColor: "#fff",
        });
      },

      onLeaveBack: () => {
        gsap.to(".body", {
          duration: 1.0,
          backgroundColor: "#000",
        });
      },
    });

    ScrollTrigger.create({
      trigger: ".wrap",

      scrub: 5,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        cup.current.rotation.x = -1.5 * self.progress;
        cup.current.rotation.y = -2 * Math.PI * self.progress;
        // cup.current.rotation.z = -2 * Math.PI * self.progress;
        // cup.current.position.y = -17 * self.progress;
        // cup.current.position.y = -2 * self.progress;
      },
    });
  });
  ScrollTrigger.clearScrollMemory();
  return (
    <>
      <group
        ref={moon}
        rotation={[0, 0, 0]}
        scale={30}
        position={[0, 150, 0]}
        dispose={null}
      >
        {/* <primitive object={firstGltf.scene} position={[0, 185, 0]} /> */}
        <group
          ref={cup}
          position={[0, 0, 0]}
          // onPointerOver={(e) => (e.stopPropagation(), set(e.object.name))}
          // onPointerOut={(e) => (e.stopPropagation(), set(null))}
        >
          <mesh
            ref={mark}
            name="Headphones"
            geometry={nodes.Round007.geometry}
            material={materials["Ring Material.001"]}
            material-color={"silver"}
            position={[-0.01, 1.49, 0]}
            scale={30.58}
          />
          <mesh
            geometry={nodes.Round.geometry}
            material={materials["Diamond.001"]}
            material-color={"#118D23"}
            // #5B8D32
            position={[-0.01, 2.38, 0]}
            scale={[3.64, 3.63, 3.64]}
          />
        </group>
      </group>
    </>
  );
}

const HTMLContent = ({ products }) => {
  return (
    <Section factor={1.5} offset={1}>
      {/* <group
        ref={ref}
        scale={50}
        position={[60, 185, 0]}
        dispose={null}
        // onPointerOver={(e) => (
        //   e.stopPropagation(), set(e.object.material.name)
        // )}
        // onPointerOut={(e) => e.intersections.length === 0 && set(null)}
        // onPointerMissed={() => (state.current = null)}
        // onClick={(e) => (
        //   e.stopPropagation(), (state.current = e.object.material.name)
        // )}
      >
        {/* <group position={[0.06, 9.41, -0.23]} rotation={[0, 0.87, 0]}>
          <mesh
            geometry={nodes.Plane.geometry}
            material={materials.MatPadren}
            position={[-0.06, -9.35, 0.39]}
            rotation={[0, -1.57, 0]}
            scale={20.84}
          />
        </group> */}
      {/* <group ref={cup} position={[0, 5, 0]} rotation={[250, 0, 0]}>
          <mesh
            geometry={nodes.Round007.geometry}
            material={materials["Ring Material.001"]}
            position={[-0.01, 1.49, 0]}
            scale={30.58}
          />
          <mesh
            geometry={nodes.Round.geometry}
            material={materials["Diamond.001"]}
            material-color={"#00ff00"}
            position={[-0.01, 2.38, 0]}
            scale={[3.64, 3.63, 3.64]}
          />
        </group>
      </group> */}

      {/* <mesh scale={25} position={[0, -18, 0]}>
          <Model />
          <meshMatcapMaterial map={colorMap} attachArray="material" />
        </mesh> */}

      {/* Hellod */}
      <Green />
      {/* <Pink />
      <White /> */}
      <Html fullscreen></Html>
    </Section>
  );
};

// function Picker() {
//   const snap = useSnapshot(state);
//   return (
//     <div>
//       <HexColorPicker
//         className="picker"
//         color={snap.items[snap.current]}
//         onChange={(color) => (state.items[snap.current] = color)}
//       />
//       <h1>{snap.current}</h1>
//     </div>
//   );
// }
function Dolly() {
  // This one makes the camera move in and out
  useFrame(({ clock, camera }) => {
    camera.position.z = 25 + Math.sin(clock.getElapsedTime()) * 2;
  });
  return null;
}

export default function Hero({ products }) {
  return (
    <>
      <Canvas
        style={{
          width: "100%",
          height: "100%",
          position: "fixed",
        }}
        id="main-canvas"
        linear
        colorManagment
        camera={{ position: [0, 380, 30], fov: 25, far: 500 }}
      >
        <Lights />
        <Suspense fallback={null}>
          <HTMLContent products={products} />
        </Suspense>
        <Dolly />
      </Canvas>
    </>
  );
}

useGLTF.preload("/ringGreend.glb");
