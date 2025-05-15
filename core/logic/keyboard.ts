import { useEffect, useState } from "react";

interface Keyboard {
  getLayoutMap: () => Promise<KeyboardLayoutMap>;
}

interface KeyboardLayoutMap {
  get: (key: string) => string;
}

declare global {
  interface Navigator {
    keyboard: Keyboard;
  }
}

// Hook to detect keyboard layout (WASD or ZQSD) based on browser layout
export const useKeyboardLayout = (): string => {
  const [layout, setLayout] = useState("W/A/S/D");

  useEffect(() => {
    const IS_IN_IFRAME = window.self !== window.top;
    if (!navigator.keyboard || IS_IN_IFRAME) return;
    
    const keyboard = navigator.keyboard;
    keyboard.getLayoutMap().then((keyboardLayoutMap: KeyboardLayoutMap) => {
      const upKey = keyboardLayoutMap.get("KeyW");
      if (upKey === "z") setLayout("Z/Q/S/D");
    });
  }, []);

  return layout;
};
