import { GroupProps } from "@react-three/fiber";
import { MutableRefObject, useEffect } from "react";
import { PerspectiveCamera } from "three";
import { cache } from "../../../logic";
import { useSpring, animated } from "@react-spring/three";
import { Text } from "@react-three/drei";
import { Key } from "../../../ideas";
import { useKeypress } from "../../../logic"; // Ensure this hook is available

const FONT_URL =
  "https://d27rt3a60hh1lx.cloudfront.net/fonts/Quicksand_Bold.otf";

type DesktopControls = {
  cam: MutableRefObject<PerspectiveCamera | undefined>;
  open: boolean; // open state is passed as a prop
  
  onSwitch: (t: boolean) => void; // Callback to toggle open state in parent
} & GroupProps;

export default function DesktopControls(props: DesktopControls) {
  const { cam, open, onSwitch, ...rest } = props;

  const LINE_LENGTH = 0.05;
  const LINE_THICKNESS = 0.008;
  const AREA_WIDTH = 0.24;
  const INDICATOR_WIDTH = 0.18;

  

  // Toggle open/close on pressing "T" key
  useKeypress(
    ["t", "T"], // Listen for both lowercase and uppercase "T"
    () => {
      onSwitch(!open); // Trigger parent state change when "T" is pressed
    },
    [open, onSwitch] // Depend on open state and onSwitch callback
  );

 

  return (
    <group {...rest}>
      <mesh material={cache.mat_standard_white}>
        <planeGeometry args={[INDICATOR_WIDTH, LINE_THICKNESS]} />
      </mesh>
      <animated.mesh
        material={cache.mat_standard_red}
        
        position-y={LINE_LENGTH / 2 - LINE_THICKNESS / 2}
      >
        <planeGeometry args={[LINE_THICKNESS, LINE_LENGTH]} />
      </animated.mesh>
      <Text
        font={FONT_URL}
        color="white"
        fontSize={0.032}
        anchorY="top"
        anchorX="right"
        position-y={-0.02}
        position-x={AREA_WIDTH / 2}
        position-z={0.01}
        lineHeight={1.3}
        renderOrder={10}
        textAlign="center"
        maxWidth={AREA_WIDTH}
      >
        {"Scroll to zoom\n\n\nClick to shoot\n\n\nPress T to close"}
      </Text>
      <Key keyCode={"T"} scale={0.05} position={[0.025, -0.29, 0.03]} />
    </group>
  );
}
