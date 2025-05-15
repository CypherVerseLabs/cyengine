import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";


// Styled components for the HUD elements
const HudContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;  // So it doesn’t interfere with other UI elements
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  color: white;
  z-index: 1000;
`;

const HudItem = styled.div`
  margin: 10px 0;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
`;

const HealthBar = styled.div`
  width: 200px;
  height: 20px;
  background: ${(props: { health: number }) =>
    props.health > 50
      ? "rgba(0, 255, 0, 0.5)"  // Green for healthy
      : props.health > 20
      ? "rgba(255, 255, 0, 0.5)"  // Yellow for moderate
      : "rgba(255, 0, 0, 0.5)"}; // Red for critical
  border-radius: 10px;
  overflow: hidden;
`;

const HealthFill = styled.div<{ health: number }>`
  height: 100%;
  background-color: ${(props) =>
    props.health > 50 ? "green" : props.health > 20 ? "yellow" : "red"};
  width: ${(props) => props.health}%;
  transition: width 0.3s ease-in-out;
`;

// Flashing animation for low health warning
const flash = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

const WarningText = styled.div`
  font-size: 24px;
  color: red;
  animation: ${flash} 1s ease-in-out infinite;
  font-weight: bold;
`;

const ShieldBar = styled.div`
  width: 200px;
  height: 20px;
  background: rgba(0, 0, 255, 0.5); /* Blue for shield */
  border-radius: 10px;
  overflow: hidden;
`;

const ShieldFill = styled.div<{ shield: number }>`
  height: 100%;
  background-color: blue;
  width: ${(props) => props.shield}%;
  transition: width 0.3s ease-in-out;
`;

const TimerDisplay = styled.div`
  font-size: 22px;
  margin-top: 20px;
  color: yellow;  // Timer text color
`;

interface HudProps {
  health: number;  // Represents the health of the player
  shield: number;  // Represents the shield of the player
  score: number;   // Represents the player's score
  ammo: number;    // Represents the player's ammo count
  timer: number;   // Timer for countdown (in seconds)
}

const Hud: React.FC<HudProps> = ({ health, shield, score, ammo, timer }) => {
  return (
    <HudContainer>
      {/* Health Bar */}
      <HudItem>
        <span>Health:</span>
        <HealthBar health={health}>
          <HealthFill health={health} />
        </HealthBar>
      </HudItem>

      {/* Flashing warning when health is low */}
      {health <= 20 && (
        <WarningText>Warning! Low Health!</WarningText>
      )}

      {/* Shield Bar */}
      <HudItem>
        <span>Shield:</span>
        <ShieldBar>
          <ShieldFill shield={shield} />
        </ShieldBar>
      </HudItem>

      {/* Score */}
      <HudItem>
        <span>Score:</span>
        <span>{score}</span>
      </HudItem>

      {/* Ammo */}
      <HudItem>
        <span>Ammo:</span>
        <span>{ammo}</span>
      </HudItem>

      {/* Timer */}
      <TimerDisplay>Time Left: {timer}s</TimerDisplay>
    </HudContainer>
  );
};

export default Hud;
