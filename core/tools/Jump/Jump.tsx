import { useEffect } from "react";
import { usePlayer } from "../../layers";
import { Vector3 } from "three";
import { isTyping } from "../../logic/dom";

type JumpProps = any;

const JUMP_STRENGTH = 2;  // Adjust this value to control jump height

export default function Jump(props: JumpProps) {
  const { velocity } = usePlayer();  // Assuming `velocity` is coming from a physics body

  useEffect(() => {
    // Define the jump action
    const jump = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === " " && !isTyping()) {
        // Apply an upward force when spacebar is pressed
        velocity.set(velocity.get().add(new Vector3(0, JUMP_STRENGTH, 0)));
      }
    };

    // Add event listener for spacebar keypress to trigger jump
    document.addEventListener("keypress", jump);
    
    // Cleanup: remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("keypress", jump);
    };
  }, [velocity]);

  return null;
}
