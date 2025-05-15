// WorldBuilder.tsx
import { useState, useEffect } from "react";
import { Tool } from "../../ideas/modifiers/Tool"; // Adjust path as needed
import { HitBox, Model } from "../../ideas"; // Adjust path as needed

type WorldBuilderProps = {
  selectedObject: string | null; // Type of selectedObject, in this case a string (could be more complex)
};

export function WorldBuilder({ selectedObject }: WorldBuilderProps) {
  const [toolState, setToolState] = useState("idle");

  // You can add more complex logic here to manipulate the selected object
  useEffect(() => {
    if (selectedObject) {
      console.log("Currently selected object:", selectedObject);
      // You can use `selectedObject` to perform actions like moving, scaling, or rotating it
    }
  }, [selectedObject]);

  return (
    <group name="world-builder-tool-resources">
      <Tool
        name="WorldBuilder"
        pos={[0, 0]} // Position the tool in the UI
        icon="path_to_builder_icon.png" // Set the icon for the builder tool
        pinY
      >
        <group position={[0, 0, 0]} scale={1}>
          <HitBox args={[3, 1.8, 1.6]} position={[0, 1, 0]} onClick={() => console.log("Tool clicked!")} />
        </group>
      </Tool>

      {/* You can display the selected object here */}
      {selectedObject && (
        <Model src={`path_to_${selectedObject}.glb`} center normalize scale={3} position={[0, 0, 0]} />
      )}
    </group>
  );
}
