import { ShapeType, useCompoundBody } from "@react-three/cannon";
import { MutableRefObject, useEffect } from "react";
import { useEnvironment } from "../../../Environment";
import { Group, Vector3 } from "three";

// height of 0.9 (eye level) for a perceived height of 1
const HEIGHT = 2;
const RADIUS = 0.225;
const SEGMENTS = 8;

const SPHERE_SHAPE: ShapeType = "Sphere";

const sphereProps = { type: SPHERE_SHAPE, args: [RADIUS, SEGMENTS, SEGMENTS] };

const topSphere = { ...sphereProps, position: [0, -RADIUS, 0] };
const middleSphere = { ...sphereProps, position: [0, -(HEIGHT / 2), 0] };
const bottomSphere = { ...sphereProps, position: [0, -(HEIGHT - RADIUS), 0] };

export const useCapsuleCollider = (initPos: MutableRefObject<Vector3>) => {
  const { paused } = useEnvironment();

  const compoundBody = useCompoundBody<Group>(() => ({
    mass: 0,
    position: initPos.current.toArray(),
    segments: SEGMENTS,
    fixedRotation: true,
    type: "Dynamic",
    shapes: [topSphere, middleSphere, bottomSphere],
  }));

  useEffect(() => {
    if (!paused) compoundBody[1].mass.set(62);
  }, [paused, compoundBody]);

  return compoundBody;
};

export function VisibleCapsuleCollider() {
  const createSphere = (sphere: any) => (
    <mesh position={sphere.position}>
      <sphereGeometry args={sphere.args} />
      <meshStandardMaterial color="red" wireframe={true} />
    </mesh>
  );

  return (
    <group name="collider" position={[1.5, -HEIGHT, 0]}>
      {createSphere(topSphere)}
      {createSphere(middleSphere)}
      {createSphere(bottomSphere)}
    </group>
  );
}
