import { ReactNode } from "react";
import { Container } from "./ui/Container";
import GlobalStyles from "./ui/GlobalStyles";
import LoadingScreen from "./ui/LoadingScreen";
import PauseMenu from "./ui/PauseMenu";
import Crosshair from "./ui/Crosshair";
import { RegisterMenuItems } from "./logic/menu";
import { Props as ContainerProps } from "@react-three/fiber/dist/declarations/src/web/Canvas";
import { defaultCanvasProps } from "./logic/canvas";
import { EnvironmentContext, useEnvironmentState } from "./logic/environment";
import MuteOnHide from "./components/MuteOnHide";
import { Canvas } from "@react-three/fiber";
import { XR } from "@react-three/xr";

export * from "./logic/environment";

export type EnvironmentProps = {
  name?: string;
  pauseMenu?: ReactNode;
  loadingScreen?: ReactNode;
  dev?: boolean;
  canvasProps?: Partial<ContainerProps>;
};

type EnvironmentLayerProps = {
  children: ReactNode | ReactNode[];
} & EnvironmentProps;

export function Environment(props: EnvironmentLayerProps) {
  const {
    loadingScreen,
    pauseMenu,
    dev,
    canvasProps,
    name = "cypherverse",
    children,
  } = props;

  const state = useEnvironmentState(name);

  return (
    <>
      <GlobalStyles />
      <MuteOnHide />
      <Container id="__cypherverse" ref={state.containerRef}>
        <EnvironmentContext.Provider value={state}>
          {loadingScreen || <LoadingScreen />}
          {pauseMenu || <PauseMenu dev={dev} title={name} />}
          <Crosshair />
        </EnvironmentContext.Provider>
        <Canvas {...defaultCanvasProps} {...canvasProps}>
          <XR>
            <EnvironmentContext.Provider value={state}>
              <RegisterMenuItems />
              {children}
            </EnvironmentContext.Provider>
          </XR>
        </Canvas>
      </Container>
    </>
  );
}
