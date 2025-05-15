import React, { useState, useRef, useEffect, useCallback } from "react";
import { useSpring, animated } from "@react-spring/three";
import { useToolbelt } from "../../layers/Toolbelt";
import { Button, Image, Model } from "../../ideas";
import { useKeypress, isTyping } from "../../logic";
import * as THREE from "three";

export function Editor(props: { onCapture?: () => void }) {
  const { onCapture } = props;
  const { toolbelt } = (); // Assuming this provides the current active tool

  const [selectedElement, setSelectedElement] = useState<any>(null); // Element selected for editing
  const [elements, setElements] = useState<any[]>([]); // Store added elements (images, models, etc.)
  const [open, setOpen] = useState(false);

  // Raycasting setup
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());
  const camera = useRef<THREE.PerspectiveCamera | null>(null); // Reference to the camera

  const { scale, rotX, rotY } = useSpring({
    scale: open ? 1 : 0.1,
    rotX: open ? 0 : 0.3,
    rotY: open ? 0 : -0.1,
  });

  // Define the ENABLED constant based on the active tool in the toolbelt
  const ENABLED = toolbelt.activeTool?.name === "Editor";

  const handleButtonClick = (action: string) => {
    switch (action) {
      case "Add Image":
        const newImage = { id: Date.now(), src: "https://example.com/new_image.png", position: [0, 0, 0] };
        setElements((prev) => [...prev, newImage]);
        break;
      case "Add Model":
        const newModel = { id: Date.now(), src: "https://example.com/new_model.glb", position: [0, 0, 0] };
        setElements((prev) => [...prev, newModel]);
        break;
      case "Move":
        if (selectedElement) {
          setSelectedElement({
            ...selectedElement,
            position: [selectedElement.position[0] + 1, selectedElement.position[1], selectedElement.position[2]],
          });
        }
        break;
      case "Rotate":
        if (selectedElement) {
          setSelectedElement({
            ...selectedElement,
            rotation: [selectedElement.rotation[0], selectedElement.rotation[1] + Math.PI / 2, selectedElement.rotation[2]],
          });
        }
        break;
      case "Scale":
        if (selectedElement) {
          setSelectedElement({
            ...selectedElement,
            scale: selectedElement.scale + 0.1,
          });
        }
        break;
      default:
        break;
    }
  };

  const selectElement = (element: any) => {
    setSelectedElement(element);
  };

  // Set up mouse event listeners for raycasting
  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      // Normalize mouse position to [-1, 1] range
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    },
    []
  );

  const handleMouseClick = useCallback(() => {
    if (selectedElement) {
      // Implement additional click actions if needed
      console.log("Selected Element:", selectedElement);
    }
  }, [selectedElement]);

  // Perform raycasting on mouse movement
  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      handleMouseMove(event);

      if (camera.current) {
        // Update raycaster to cast from camera to mouse position
        raycaster.current.update();
        
        // Create the ray from the camera through the mouse position
        raycaster.current.ray.origin.setFromMatrixPosition(camera.current.matrixWorld);
        raycaster.current.ray.direction.set(mouse.current.x, mouse.current.y, 1).unproject(camera.current);
        
        // Check for intersections with elements
        const intersects = raycaster.current.intersectObjects(
          elements.map((element) => element.object)
        );
        if (intersects.length > 0) {
          const selected = intersects[0].object; // Select the closest intersected object
          selectElement(selected); // Select the intersected object
        }
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("click", handleMouseClick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", handleMouseClick);
    };
  }, [elements, selectedElement, handleMouseMove, handleMouseClick]);

  useEffect(() => {
    // Handle editor tool activation
    if (!ENABLED) {
      setOpen(false); // Close the editor when tool is not active
    }
  }, [ENABLED]);

  useKeypress(["E", "e"], () => {
    if (isTyping()) return; // Ignore if typing
    setOpen((prev) => !prev); // Toggle editor visibility
  });

  return (
    <animated.group scale={scale} rotation-x={rotX} rotation-y={rotY}>
      {open && (
        <group position={[0, 2, 0]}>
          <Button onClick={() => handleButtonClick("Add Image")}>Add Image</Button>
          <Button onClick={() => handleButtonClick("Add Model")}>Add Model</Button>
          <Button onClick={() => handleButtonClick("Move")}>Move</Button>
          <Button onClick={() => handleButtonClick("Rotate")}>Rotate</Button>
          <Button onClick={() => handleButtonClick("Scale")}>Scale</Button>
        </group>
      )}

      {elements.map((element, idx) => (
        <group
          key={idx}
          position={element.position}
          rotation={element.rotation}
          scale={element.scale}
        >
          {element.src.endsWith(".glb") && (
            <Model
              src={element.src}
              onClick={() => selectElement(element)}
              ref={(node) => {
                element.object = node; // Set the mesh reference for raycasting
              }}
            />
          )}
          {element.src.endsWith(".png") && (
            <Image
              src={element.src}
              onClick={() => selectElement(element)}
              ref={(node) => {
                element.object = node; // Set the mesh reference for raycasting
              }}
            />
          )}
        </group>
      ))}
    </animated.group>
  );
}
