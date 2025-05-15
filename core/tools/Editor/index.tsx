import { useCallback, useEffect, useState } from "react";
import { useEnvironment } from "../../layers/Environment";
import { config, useSpring, animated } from "@react-spring/three";
import { Tool } from "../../ideas/modifiers/Tool";
import { useToolbelt } from "../../layers/Toolbelt";
import { HitBox, Model } from "../../ideas";
import { isTyping, useHudDims, useKeypress } from "../../logic";
import { Text } from '@react-three/drei';

// Replace with your actual icon URLs for the buttons
const Add_Model_ICON_URL = "https://example.com/add_model_icon.png";
const Undo_ICON_URL = "https://example.com/undo_icon.png";
const Redo_ICON_URL = "https://example.com/redo_icon.png";
const Move_ICON_URL = "https://example.com/move_icon.png";
const Rotate_ICON_URL = "https://example.com/rotate_icon.png";
const Scale_ICON_URL = "https://example.com/scale_icon.png";

type EditorProps = { onCapture?: () => void };

export function Editor(props: EditorProps) {
  const { onCapture } = props;

  const { device, paused } = useEnvironment();
  const toolbelt = useToolbelt();

  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedTool, setSelectedTool] = useState<string | null>(null); // Track selected tool (Move/Rotate/Scale)
  const [models, setModels] = useState<any[]>([]); // State for models
  const [history, setHistory] = useState<any[]>([]); // Action history stack for undo/redo
  const [future, setFuture] = useState<any[]>([]); // Future stack for redo

  const ENABLED = toolbelt.activeTool?.name === "Editor";

  const dims = useHudDims();
  const SCALE = Math.min(dims.width * 0.25, device.mobile ? 0.2 : 0.325);

  const { rotX, rotY, scale } = useSpring({
    rotX: open ? 0 : 0.3,
    rotY: open ? 0 : device.mobile ? Math.PI - 0.5 : -0.1,
    scale: open ? SCALE : device.mobile ? 0.1 : 0.25,
    config: config.stiff,
  });

  useEffect(() => {
    if (!ENABLED || paused || device.mobile || !open) return;
    const handleClick = () => {
      if (onCapture) onCapture(); // Invoke onCapture without shutter sound or delay
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [ENABLED, device.mobile, onCapture, open, paused]);

  // Use the "E" key to toggle the editor's open/close state
  useKeypress(
    ["E", "e"], 
    () => {
      if (isTyping() || !ENABLED) return; // Ignore if typing or if the tool is not enabled
      setOpen((prev) => !prev); // Toggle open state
    },
    [ENABLED]
  );

  const POS: [number, number] = open
    ? [0, 0]
    : device.mobile
    ? [0.9, 0.9]
    : [0.8, -0.8];

  // Action Handlers (for buttons)
  const handleAddModel = () => {
    const newModel = (
      <Model
        key={Date.now()}  // Use a unique key for each new model
        src="./RingOfLife.glb"
        center
        normalize
        rotation-y={Math.PI}
        scale={1}
      />
    );

    setModels((prevModels) => [...prevModels, newModel]);
    setHistory((prevHistory) => [
      ...prevHistory,
      { action: "ADD_MODEL", model: newModel },
    ]);
    setFuture([]); // Clear future stack when new action is taken
  };

  const handleUndo = () => {
    if (history.length === 0) return;

    const lastAction = history[history.length - 1];
    setHistory((prevHistory) => prevHistory.slice(0, -1));  // Remove the last action
    setFuture((prevFuture) => [lastAction, ...prevFuture]);  // Add to future stack

    if (lastAction.action === "ADD_MODEL") {
      setModels((prevModels) => prevModels.slice(0, -1));  // Remove the last added model
    }
  };

  const handleRedo = () => {
    if (future.length === 0) return;

    const nextAction = future[0];
    setFuture((prevFuture) => prevFuture.slice(1));  // Remove from future stack
    setHistory((prevHistory) => [...prevHistory, nextAction]);  // Add back to history

    if (nextAction.action === "ADD_MODEL") {
      setModels((prevModels) => [...prevModels, nextAction.model]);  // Re-add the model
    }
  };

  const handleMove = () => {
    setSelectedTool("MOVE");
  };

  const handleRotate = () => {
    setSelectedTool("ROTATE");
  };

  const handleScale = () => {
    setSelectedTool("SCALE");
  };

  return (
    <Tool
      name="Editor"
      pos={POS}
      pinY
      icon={Add_Model_ICON_URL}
      face={false}
      disableDraggable={open}
      onSwitch={(e) => {
        if (!e) setOpen(false);
      }}
    >
      <animated.group scale={scale} rotation-x={rotX} rotation-y={rotY}>
        {/* Model Rendering */}
        {models.map((model, index) => (
          <group key={index}>{model}</group>
        ))}

        {/* 3D UI Panel */}
        {open && (
          <mesh position={[0, -1, 0]}>
            <planeGeometry args={[3, 1.5]} /> {/* Define size of the panel */}
            <meshBasicMaterial color="rgba(0, 0, 0, 0.7)" /> {/* Transparent black background */}

            {/* 3D Button for Add Model */}
            <mesh position={[-1, 0, 0]} onClick={handleAddModel}>
              <planeGeometry args={[0.8, 0.4]} />
              <meshBasicMaterial color={isHovered ? "lightblue" : "green"} />
              <Text position={[0, 0, 0.1]} color="white" fontSize={0.2} anchorX="center" anchorY="middle">
                Add Model
              </Text>
            </mesh>

            {/* 3D Button for Undo */}
            <mesh position={[-1, -0.6, 0]} onClick={handleUndo}>
              <planeGeometry args={[0.8, 0.4]} />
              <meshBasicMaterial color={isHovered ? "lightblue" : "red"} />
              <Text position={[0, 0, 0.1]} color="white" fontSize={0.2} anchorX="center" anchorY="middle">
                Undo
              </Text>
            </mesh>

            {/* 3D Button for Redo */}
            <mesh position={[-1, -1.2, 0]} onClick={handleRedo}>
              <planeGeometry args={[0.8, 0.4]} />
              <meshBasicMaterial color={isHovered ? "lightblue" : "orange"} />
              <Text position={[0, 0, 0.1]} color="white" fontSize={0.2} anchorX="center" anchorY="middle">
                Redo
              </Text>
            </mesh>

            {/* 3D Button for Move */}
            <mesh position={[1, 0, 0]} onClick={handleMove}>
              <planeGeometry args={[0.8, 0.4]} />
              <meshBasicMaterial color={isHovered ? "lightblue" : "yellow"} />
              <Text position={[0, 0, 0.1]} color="white" fontSize={0.2} anchorX="center" anchorY="middle">
                Move
              </Text>
            </mesh>

            {/* 3D Button for Rotate */}
            <mesh position={[1, -0.6, 0]} onClick={handleRotate}>
              <planeGeometry args={[0.8, 0.4]} />
              <meshBasicMaterial color={isHovered ? "lightblue" : "purple"} />
              <Text position={[0, 0, 0.1]} color="white" fontSize={0.2} anchorX="center" anchorY="middle">
                Rotate
              </Text>
            </mesh>

            {/* 3D Button for Scale */}
            <mesh position={[1, -1.2, 0]} onClick={handleScale}>
              <planeGeometry args={[0.8, 0.4]} />
              <meshBasicMaterial color={isHovered ? "lightblue" : "pink"} />
              <Text position={[0, 0, 0.1]} color="white" fontSize={0.2} anchorX="center" anchorY="middle">
                Scale
              </Text>
            </mesh>
          </mesh>
        )}

        {/* Mobile-specific Hitbox */}
        {device.mobile && !open && (
          <HitBox
            args={[3, 1.8, 1.6]}
            position-z={0.3}
            onClick={() => setOpen(true)}
          />
        )}
      </animated.group>
    </Tool>
  );
}
