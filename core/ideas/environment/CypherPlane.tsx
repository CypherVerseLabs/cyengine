import { usePlane } from "@react-three/cannon";
import { Mesh } from "three";
import { memo } from "react";

type CypherPlaneProps = {
  height?: number;
  parcelSize?: number; // Prop for parcel size
  visible?: boolean;
  color?: string;
};

const CypherPlane = memo(function CypherPlane(props: CypherPlaneProps) {
  const { height = -0.0001, parcelSize = 1, visible, color = "#660000" } = props;

  const gridWidth = 8;
  const gridLength = 8;

  const size: [number, number] = [gridWidth * parcelSize, gridLength * parcelSize];

  const [ref] = usePlane<Mesh>(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, height, 0],
    args: size,
    type: "Static",
  }));

  if (!visible) return null;

  return (
    <mesh name="cypherverse-world-plane" ref={ref}>
      <planeGeometry args={size} />
      <meshPhongMaterial color={color} />
    </mesh>
  );
});

export { CypherPlane };
