// Add this inside src/main.js
import { clickSolderIron } from "./engine.js";

// 1. Keyboard Hotkeys (Spacebar to Click)
window.addEventListener("keydown", (e) => {
  // Prevent spacebar from scrolling the page
  if (e.code === "Space") {
    e.preventDefault();
    clickSolderIron();
    logTerminal("Manual solder burst executed.");
  }

  // Quick Buy with Keys 1, 2, 3, 4
  if (e.key === "1") triggerBuy("vacuumTube");
  if (e.key === "2") triggerBuy("pongConsole");
  if (e.key === "3") triggerBuy("arcadeCabinet");
  if (e.key === "4") triggerBuy("commodore64");
});

// 2. Terminal Logger Helper
export function logTerminal(message) {
  const logBox = document.getElementById("terminal-log");
  const entry = document.createElement("p");
  entry.innerText = `> ${message}`;
  logBox.prepend(entry);
}