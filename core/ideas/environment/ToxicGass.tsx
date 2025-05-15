import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { Color, ColorRepresentation, Fog as ThreeFog } from "three";

type ToxicGassProps = {
  color?: ColorRepresentation;
  near?: number;
  far?: number;
};

export function ToxicGass(props: ToxicGassProps) {
  const { color = "green", near = 10, far = 80 } = props;

  const scene = useThree((state) => state.scene);

  useEffect(() => {
    const col = (color as Color) instanceof Color ? color : new Color(color);
    scene.fog = new ThreeFog(col, near, far);

    return () => {
      scene.fog = null;
    };
  }, [scene, color, near, far]);

  return null;
}
