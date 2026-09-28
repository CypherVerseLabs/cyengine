import {
  useRef,
  useEffect,
  ReactNode,
  useMemo,
  createContext,
  useContext,
  useCallback,
} from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Camera, Quaternion, Raycaster, Vector3 } from "three";
import NippleMovement from "./components/controls/NippleMovement";
import KeyboardMovement from "./components/controls/KeyboardMovement";
import PointerLockControls from "./components/controls/PointerLockControls";
import TouchFPSCamera from "./components/controls/TouchFPSCamera";
import {
  useCapsuleCollider,
  VisibleCapsuleCollider,
} from "./components/colliders/CapsuleCollider";
import { GyroControls } from "./components/controls/GyroControls";
import { useSpringVelocity } from "./logic/velocity";
import { useEnvironment } from "../Environment";
import VRControllerMovement from "./components/controls/VRControllerMovement";
import { useControlLock } from "./logic/controls";
import { useBob } from "./logic/bob";

type PlayerVec = {
  set: (vec: Vector3) => void;
  get: () => Vector3;
};

type PlayerControls = {
  lock: () => void;
  unlock: () => void;
  isLocked: () => boolean;
};

type PlayerState = {
  position: PlayerVec;
  velocity: PlayerVec;
  controls: PlayerControls;
  raycaster: Raycaster;
};

export const PlayerContext = createContext({} as PlayerState);
export const usePlayer = () => useContext(PlayerContext);

const SPEED = 3.6;
const SHOW_PLAYER_HITBOX = false;

export type PlayerProps = {
  height?: number;
  pos?: number[];
  rot?: number;
  speed?: number;
  flying?: boolean;
  controls?: {
    disableGyro?: boolean;
  };
};

type PlayerLayer = {
  children: ReactNode[] | ReactNode;
} & PlayerProps;

export function Player(props: PlayerLayer) {
  const {
    children,
    height = 1.6,
    pos = [0, 0, 0],
    rot = 0,
    flying = false,
    speed = SPEED,
    controls = {
      disableGyro: true,
    },
  } = props;

  const camera = useThree((state) => state.camera);
  const defaultRaycaster = useThree((state) => state.raycaster);

  const { device } = useEnvironment();

  const initPos = useRef(new Vector3().fromArray(pos));
  const position = useRef(new Vector3());
  const velocity = useRef(new Vector3());
  const lockControls = useRef(false);

  const raycaster = useMemo(
    () => new Raycaster(new Vector3(), new Vector3(), 0, 5),
    []
  );

  // 1.6m tall player capsule
  const [, bodyApi] = useCapsuleCollider(initPos, height);

  const { direction, updateVelocity } = useSpringVelocity(bodyApi, speed);

  const bob = useBob(velocity, direction);

  useEffect(() => {
    camera.rotation.setFromQuaternion(
      new Quaternion().setFromAxisAngle(
        new Vector3(0, 1, 0),
        rot
      )
    );
  }, []);

  useEffect(() => {
    const unsubPos = bodyApi.position.subscribe((p) =>
      position.current.fromArray(p)
    );

    const unsubVel = bodyApi.velocity.subscribe((v) =>
      velocity.current.fromArray(v)
    );

    return () => {
      unsubPos();
      unsubVel();
    };
  }, [bodyApi, bodyApi.position, bodyApi.velocity]);

  useFrame(({ clock }) => {
    if (device.desktop) {
      raycaster.ray.origin.copy(position.current);
      raycaster.ray.direction.set(0, 0, -1);
      raycaster.ray.direction.applyQuaternion(camera.quaternion);
    }

    // Camera is positioned at the player's head/eye position.
    camera.position.copy(position.current);

    if (!lockControls.current) {
      updateVelocity(camera, velocity.current);
      bob.update(clock);
    }
  });

  const setPosition = useCallback(
    (pos: Vector3) => {
      initPos.current.copy(pos);

      bodyApi.position.set(pos.x, pos.y, pos.z);

      position.current.copy(pos);
    },
    [bodyApi.position]
  );

  const setVelocity = useCallback(
    (vel: Vector3) => {
      bodyApi.velocity.set(vel.x, vel.y, vel.z);

      velocity.current.copy(vel);
    },
    [bodyApi.velocity]
  );

  const controlLock = useControlLock(lockControls);

  const value = {
    position: {
      get: () => position.current.clone(),
      set: setPosition,
    },
    velocity: {
      get: () => velocity.current.clone(),
      set: setVelocity,
    },
    controls: controlLock,
    raycaster: device.mobile ? defaultRaycaster : raycaster,
  };

  return (
    <PlayerContext.Provider value={value}>
      {device.mobile && (
        <>
          {controls?.disableGyro && <TouchFPSCamera />}

          {!controls?.disableGyro && (
            <GyroControls fallback={<TouchFPSCamera />} />
          )}

          <NippleMovement direction={direction} />
        </>
      )}

      {device.desktop && (
        <>
          <KeyboardMovement
            direction={direction}
            flying={flying}
          />

          <PointerLockControls />
        </>
      )}

      {device.xr && (
        <VRControllerMovement
          position={position}
          direction={direction}
        />
      )}

      {SHOW_PLAYER_HITBOX && (
        <VisibleCapsuleCollider height={height} />
      )}

      {children}
    </PlayerContext.Provider>
  );
}