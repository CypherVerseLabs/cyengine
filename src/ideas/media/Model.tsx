import { Suspense, useMemo } from "react";
import { GroupProps } from "@react-three/fiber";
import { cache, useModel } from "../../logic";
import { Box3, Vector3 } from "three";
import { SkeletonUtils } from "three-stdlib";
import { ErrorBoundary } from "react-error-boundary";

type ModelProps = {
  src: string;
  center?: boolean;
  normalize?: boolean;
} & GroupProps;

function UnsuspensedModel(props: ModelProps) {
  const { src, center, normalize, ...rest } = props;

  const gltf = useModel(src);

  const model = useMemo(() => SkeletonUtils.clone(gltf.scene), [gltf.scene]);

  const { centerVec, normScale } = useMemo(() => {
    const bbox = new Box3().setFromObject(model);

    const centerVec = bbox.getCenter(new Vector3()).multiplyScalar(-1);

    const size = bbox.getSize(new Vector3());
    const maxSide = Math.max(size.x, size.y, size.z);

    return {
      centerVec,
      normScale: maxSide > 0 ? 1 / maxSide : 1,
    };
  }, [model]);

  return (
    <group name="cyengine-model" {...rest}>
      <group scale={normalize ? normScale : 1}>
        <primitive object={model} position={center ? centerVec : undefined} />
      </group>
    </group>
  );
}

function FallbackModel(props: ModelProps) {
  const { ...rest } = props;

  return (
    <group name="cyengine-fallback-model" {...rest}>
      <mesh material={cache.mat_basic_black_wireframe}>
        <boxGeometry args={[1, 1, 1]} />
      </mesh>
    </group>
  );
}

export function Model(props: ModelProps) {
  return (
    <ErrorBoundary
      fallbackRender={() => <FallbackModel {...props} />}
      onError={(err) => console.error(err)}
    >
      <Suspense fallback={null}>
        <UnsuspensedModel {...props} />
      </Suspense>
    </ErrorBoundary>
  );
}
