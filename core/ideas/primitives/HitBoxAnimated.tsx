import { ColorRepresentation, Mesh } from "three";
import { Interactable, InteractableProps } from "../modifiers/Interactable";
import { MeshProps } from "@react-three/fiber";
import { forwardRef, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";

type HitBoxAnimatedProps = {
  shape: "box" | "sphere" | "torus";  // Supported shapes: box, sphere, torus
  args: [number, number, number] | [number]; // Arguments based on shape type
  visible?: boolean;
  color?: ColorRepresentation;
  animation?: { rotationSpeed?: number; position?: [number, number, number] };
  materialProps?: {
    wireframe?: boolean;
    transparent?: boolean;
    opacity?: number;
  };
} & Omit<InteractableProps, "children"> & Omit<MeshProps, "args">;

export const HitBoxAnimated = forwardRef<Mesh, HitBoxAnimatedProps>((props, ref) => {
  const {
    shape,
    args = [1, 1, 1],  // Default args for box, sphere, and torus
    visible = true,
    color = "red",
    animation = {},
    materialProps = {},
    onClick,
    onHover,
    onUnHover,
    raycaster,
    ...rest
  } = props;

  const meshRef = useRef<Mesh>(null);

  // Use frame hook to animate rotation
  useFrame(() => {
    if (meshRef.current && animation.rotationSpeed) {
      meshRef.current.rotation.y += animation.rotationSpeed;
    }
    if (meshRef.current && animation.position) {
      meshRef.current.position.set(...animation.position);
    }
  });

  // Determine geometry based on the shape
  const getGeometry = () => {
    switch (shape) {
      case "box":
        // Default dimensions: width = 1, height = 1, depth = 1
        return <boxGeometry args={args as [number, number, number]} />;
      case "sphere":
        // Default: radius = 1, widthSegments = 16, heightSegments = 16
        return <sphereGeometry args={[args[0], 16, 16]} />;
      case "torus":
        // Default: radius = 1, tube = 0.4, radialSegments = 16, tubularSegments = 100
        return <torusGeometry args={[args[0], 0.4, 16, 100]} />;
      default:
        return <boxGeometry args={args as [number, number, number]} />;
    }
  };

  return (
    <Interactable onClick={onClick} onHover={onHover} onUnHover={onUnHover} raycaster={raycaster}>
      <mesh ref={meshRef} visible={visible} {...rest}>
        {getGeometry()}
        <meshBasicMaterial
          color={color}
          transparent={materialProps.transparent || false}
          opacity={materialProps.opacity || 1}
          wireframe={materialProps.wireframe || false}
        />
      </mesh>
    </Interactable>
  );
});
