import { Tool } from "../../ideas/modifiers/Tool";
import { Text } from "@react-three/drei";
import TalkieModel from "./components/TalkieModel";
import MicAccess from "./components/MicAccess";
import { Button } from "../../ideas";
import { useToolbelt } from "../../layers/Toolbelt";
import { useEnvironment } from "../../layers/Environment";
import { useEffect, useState } from "react";

const FONT_URL =
  "https://d27rt3a60hh1lx.cloudfront.net/fonts/Quicksand_Bold.otf";

const WALKIE_TALKIE_TEXT =
  "Proximity voice chat is enabled in this world.\n\nWalk up to someone and say hello!";

export function WalkieTalkie() {
  const TOOL_NAME = "Walkie Talkie";

  const toolbelt = useToolbelt();
  const { device } = useEnvironment();
  const [fontLoaded, setFontLoaded] = useState(false);

  const WIDTH = 0.5;
  const HEIGHT = 0.55;
  const DEPTH = 0.1;

  // Load font dynamically
  useEffect(() => {
    const font = new FontFace("Quicksand", `url(${FONT_URL})`);
    font
      .load()
      .then(() => {
        document.fonts.add(font);
        setFontLoaded(true);
      })
      .catch((error) => {
        console.error("Failed to load font:", error);
      });
  }, []);

  return (
    <Tool name={TOOL_NAME} pos={[0, 0]} range={device.mobile ? 0 : 0.2} pinY>
      <group position-y={-0.05} scale={1.25}>
        <TalkieModel width={WIDTH} height={HEIGHT} depth={DEPTH} />
        <group name="content" position-z={0.1 / 2 + 0.001}>
          <MicAccess position-y={0.15} width={WIDTH * 0.65} />
          {fontLoaded && (
            <Text
              fontSize={0.022}
              color="black"
              font={FONT_URL}
              maxWidth={WIDTH * 0.5}
              anchorY="top"
              position-y={-0.05}
              textAlign="center"
              scale={1.1}
            >
              {WALKIE_TALKIE_TEXT}
            </Text>
          )}
          <Button
            onClick={() => toolbelt.hide()}
            fontSize={0.03}
            position-y={-0.21}
            rotation-x={-0.4}
            color="#f2445e"
            aria-label="Close Walkie Talkie"
          >
            Close
          </Button>
        </group>
      </group>
    </Tool>
  );
}
