import React, { useState, useEffect } from "react";
import Hud from "../Environment/ui/Hud/Hud"; // Adjust the path as needed

const Game: React.FC = () => {
  // Game states
  const [health, setHealth] = useState(100);
  const [shield, setShield] = useState(50); // Example shield value
  const [score, setScore] = useState(0);
  const [ammo, setAmmo] = useState(30);
  const [timer, setTimer] = useState(60); // Timer in seconds

  // Simulate game loop: Update score, health, and ammo
  useEffect(() => {
    const interval = setInterval(() => {
      setScore((prevScore) => prevScore + 1); // Score increases every second
      setHealth((prevHealth) => Math.max(0, prevHealth - 1)); // Health decreases over time
      setAmmo((prevAmmo) => Math.max(0, prevAmmo - 1)); // Ammo decreases over time
    }, 1000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  // Timer countdown effect
  useEffect(() => {
    if (timer > 0) {
      const timerInterval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(timerInterval); // Cleanup when timer reaches 0
    }
  }, [timer]);

  return (
    <div>
      {/* Render HUD with game stats */}
      <Hud health={health} shield={shield} score={score} ammo={ammo} timer={timer} />
      
      {/* Other game content like 3D scene, canvas, etc. */}
      {/* For example, you could have your 3D environment or game canvas here */}
    </div>
  );
};

export default Game;


