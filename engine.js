// src/engine.js
import Decimal from "break_infinity.js";
import { gameState, CLASSES } from "./state.js";

// 1. Calculate Idle Bits Per Second
export function getBitsPerSecond() {
  let bps = new Decimal(0);
  const activeClass = CLASSES[gameState.currentClass];

  for (const key in gameState.upgrades) {
    const item = gameState.upgrades[key];
    const production = item.baseProduction.times(item.count);
    bps = bps.plus(production);
  }

  // Apply class multiplier
  bps = bps.times(activeClass.idleMult);
  return bps;
}

// 2. Active Click Action
export function clickSolderIron() {
  const activeClass = CLASSES[gameState.currentClass];
  let clickPower = new Decimal(1).times(activeClass.clickMult);

  // Modder Crit Perk
  if (gameState.currentClass === "MODDER" && Math.random() < activeClass.critChance) {
    clickPower = clickPower.times(activeClass.critMult);
    console.log("CRITICAL SURGE!");
  }

  gameState.bits = gameState.bits.plus(clickPower);
  gameState.totalBitsEarned = gameState.totalBitsEarned.plus(clickPower);
  addXP(1);
}

// 3. Purchase Upgrades Math
export function getUpgradeCost(key) {
  const item = gameState.upgrades[key];
  const activeClass = CLASSES[gameState.currentClass];
  
  // Cost = Base * (Multiplier ^ Count)
  let cost = item.baseCost.times(Decimal.pow(item.costMultiplier, item.count));
  
  if (activeClass.costDiscount) {
    cost = cost.times(activeClass.costDiscount);
  }
  return cost.floor();
}

export function buyUpgrade(key) {
  const cost = getUpgradeCost(key);
  if (gameState.bits.greaterThanOrEqualTo(cost)) {
    gameState.bits = gameState.bits.minus(cost);
    gameState.upgrades[key].count++;
    addXP(10);
    return true;
  }
  return false;
}

// 4. Level System Math
export function addXP(amount) {
  gameState.xp += amount;
  while (gameState.xp >= gameState.xpNeeded) {
    gameState.xp -= gameState.xpNeeded;
    gameState.level++;
    // Exponential XP curve
    gameState.xpNeeded = Math.floor(gameState.xpNeeded * 1.25);
    console.log(`Level Up! Current Level: ${gameState.level}`);
  }
}

// 5. Delta-Time Tick Loop (Runs 20 times a second for smooth UI)
export function tick() {
  const now = Date.now();
  const delta = (now - gameState.lastTick) / 1000; // Time in seconds
  gameState.lastTick = now;

  if (delta > 0) {
    const bps = getBitsPerSecond();
    const bitsToAdd = bps.times(delta);
    
    gameState.bits = gameState.bits.plus(bitsToAdd);
    gameState.totalBitsEarned = gameState.totalBitsEarned.plus(bitsToAdd);
  }
}