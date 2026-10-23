// src/storage.js
import Decimal from "break_infinity.js";
import { gameState } from "./state.js";
import { getBitsPerSecond } from "./engine.js";

const SAVE_KEY = "RETRO_CLICKER_SAVE";

export function saveGame() {
  localStorage.setItem(SAVE_KEY, JSON.stringify(gameState));
}

export function loadGame() {
  const savedData = localStorage.getItem(SAVE_KEY);
  if (!savedData) return;

  const parsed = JSON.parse(savedData);
  
  // Restore primitives
  gameState.level = parsed.level;
  gameState.xp = parsed.xp;
  gameState.xpNeeded = parsed.xpNeeded;
  gameState.currentClass = parsed.currentClass;

  // Restore Decimals
  gameState.bits = new Decimal(parsed.bits);
  gameState.totalBitsEarned = new Decimal(parsed.totalBitsEarned);

  // Restore Upgrades
  for (const key in parsed.upgrades) {
    if (gameState.upgrades[key]) {
      gameState.upgrades[key].count = parsed.upgrades[key].count;
    }
  }

  // Calculate Offline Time
  const now = Date.now();
  const secondsOffline = (now - parsed.lastTick) / 1000;
  
  if (secondsOffline > 10) {
    const offlineBPS = getBitsPerSecond();
    const offlineEarnings = offlineBPS.times(secondsOffline).times(0.8); // 80% efficiency
    gameState.bits = gameState.bits.plus(offlineEarnings);
    alert(`Welcome back! You earned ${offlineEarnings.toFixed(0)} Bits while offline.`);
  }

  gameState.lastTick = now;
}