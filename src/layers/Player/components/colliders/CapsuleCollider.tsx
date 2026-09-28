import { ShapeType, useCompoundBody } from "@react-three/cannon";
import { MutableRefObject, useEffect } from "react";
import { useEnvironment } from "../../../Environment";
import { Group, Vector3 } from "three";

const RADIUS = 0.225;
const SEGMENTS = 8;

const SPHERE_SHAPE: ShapeType = "Sphere";

export const useCapsuleCollider = (
  initPos: MutableRefObject<Vector3>,
  height = 1.6
) => {
  const { paused } = useEnvironment();

  const sphereProps = {
    type: SPHERE_SHAPE,
    args: [RADIUS, SEGMENTS, SEGMENTS],
  };

  const topSphere = {
    ...sphereProps,
    position: [0, -RADIUS, 0],
  };

  const middleSphere = {
    ...sphereProps,
    position: [0, -(height / 2), 0],
  };

  const bottomSphere = {
    ...sphereProps,
    position: [0, -(height - RADIUS), 0],
  };

  const compoundBody = useCompoundBody<Group>(() => ({
    mass: 0,
    position: initPos.current.toArray(),
    fixedRotation: true,
    type: "Dynamic",
    shapes: [topSphere, middleSphere, bottomSphere],
  }));

  useEffect(() => {
    if (!paused) {
      compoundBody[1].mass.set(62);
    }
  }, [paused, compoundBody]);

  return compoundBody;
};

export function VisibleCapsuleCollider({
  height = 1.6,
}: {
  height?: number;
}) {
  const sphereProps = {
    type: SPHERE_SHAPE,
    args: [RADIUS, SEGMENTS, SEGMENTS],
  };

  const topSphere = {
    ...sphereProps,
    position: [0, -RADIUS, 0],
  };

  const middleSphere = {
    ...sphereProps,
    position: [0, -(height / 2), 0],
  };

  const bottomSphere = {
    ...sphereProps,
    position: [0, -(height - RADIUS), 0],
  };

  const createSphere = (sphere: any) => (
    <mesh position={sphere.position}>
      <sphereGeometry args={sphere.args} />
      <meshStandardMaterial
        color="red"
        wireframe={true}
      />
    </mesh>
  );

  return (
    <group name="collider">
      {createSphere(topSphere)}
      {createSphere(middleSphere)}
      {createSphere(bottomSphere)}
    </group>
  );
}