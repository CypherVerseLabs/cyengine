import { Physics, PhysicsProps } from "../layers/Physics";
import { Environment, EnvironmentProps } from "../layers/Environment";
import { Network, NetworkProps } from "../layers/Network";
import { Player, PlayerProps } from "../layers/Player";
import { CypherPlane } from "../ideas/environment/CypherPlane";
import { ReactNode } from "react";
import { Toolbelt, ToolbeltProps } from "../layers/Toolbelt";
import { Visual } from "../layers/Visual";

type CypherRealityProps = {
  children?: ReactNode | ReactNode[];
  environmentProps?: EnvironmentProps;
  physicsProps?: PhysicsProps;
  networkProps?: NetworkProps;
  playerProps?: PlayerProps;
  toolbeltProps?: ToolbeltProps;
  disableGround?: boolean;
};

export function CypherReality(props: CypherRealityProps) {
  const {
    children,
    environmentProps,
    physicsProps,
    networkProps,
    playerProps,
    toolbeltProps,
    disableGround = false,
  } = props;

  return (
    <Environment {...environmentProps}>
      <Physics {...physicsProps}>
        <Player {...playerProps}>
          <Toolbelt {...toolbeltProps}>
            <Network {...networkProps}>
              <Visual>
                {!disableGround && <CypherPlane />}
                {children}
              </Visual>
            </Network>
          </Toolbelt>
        </Player>
      </Physics>
    </Environment>
  );
}
