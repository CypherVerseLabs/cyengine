import { usePlane } from "@react-three/cannon";
import { Mesh } from "three";

type ParcelProps = {
  position: [number, number, number];
};

function Parcel({ position }: ParcelProps) {
  return (
    <mesh position={position}>
      <planeGeometry args={[16, 16]} />
      <meshPhongMaterial color="#008000" />
    </mesh>
  );
}

type FinitePlaneProps = {
  height?: number;
  size?: [number, number];
  visible?: boolean;
};

export function FinitePlane(props: FinitePlaneProps) {
  const { height = -0.0001, size = [2256, 2256], visible } = props;

  const [ref] = usePlane<Mesh>(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, height, 0],
    args: size,
    type: "Static",
  }));

  const parcels = [];
  const parcelSize = 16;  // Size of each parcel
  const rows = 141;
  const cols = 141;

  // Generate parcels for each row and column
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      parcels.push(
        <Parcel
          key={`${row}-${col}`}
          position={[col * parcelSize - size[0] / 2, 0, row * parcelSize - size[1] / 2]}
        />
      );
    }
  }

  if (!visible) return null;

  return (
    <mesh name="cypherverse-finite-plane" ref={ref}>
      <planeGeometry args={size} />
      <meshPhongMaterial color="#660000" />
      {parcels}
    </mesh>
  );
}
