import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { Color, ColorRepresentation, Fog as ThreeFog } from "three";

type FogProps = {
  color?: ColorRepresentation;
  near?: number;
  far?: number;
};

export function Fog(props: FogProps) {
  const { color = "white", near = 10, far = 80 } = props;
  const scene = useThree((state) => state.scene);

  useEffect(() => {
    const col = (color as Color) instanceof Color ? color : new Color(color);
    scene.fog = new ThreeFog(col, near, far);

    // Cleanup when component is unmounted or fog parameters change
    return () => {
      scene.fog = null;
    };
  }, [color, near, far, scene]);

  return null;
}

