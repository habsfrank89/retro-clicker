// src/state.js
import Decimal from "break_infinity.js";

export const CLASSES = {
  CHAMP: {
    name: "Arcade Champ",
    description: "Active click specialist. High burst, weaker idle.",
    clickMult: 2.0,
    idleMult: 0.65,
  },
  SYSADMIN: {
    name: "SysAdmin",
    description: "Pure idle specialist. High automation, weak clicks.",
    clickMult: 0.4,
    idleMult: 1.4,
  },
  MODDER: {
    name: "Hardware Modder",
    description: "RNG specialist. Cheaper upgrades, volatile crit rate.",
    clickMult: 1.0,
    idleMult: 1.0,
    critChance: 0.1, // 10% chance
    critMult: 10.0,
    costDiscount: 0.85, // 15% cheaper
  }
};

export const gameState = {
  // Currencies (using Decimal for infinite scaling)
  bits: new Decimal(0),
  totalBitsEarned: new Decimal(0),
  tokens: 0, // Prestige currency

  // Player Progression
  level: 1,
  xp: 0,
  xpNeeded: 100,

  // Selected Class (Defaults to CHAMP)
  currentClass: "CHAMP",

  // Timestamp tracking for delta time & offline earnings
  lastTick: Date.now(),

  // Upgrades: Arcades, Consoles, Computers, Electronics
  upgrades: {
    vacuumTube: {
      name: "Vacuum Tube",
      category: "electronics",
      count: 0,
      baseCost: new Decimal(15),
      costMultiplier: 1.15,
      baseProduction: new Decimal(0.5), // Bits per sec
    },
    pongConsole: {
      name: "Home Pong Console",
      category: "consoles",
      count: 0,
      baseCost: new Decimal(100),
      costMultiplier: 1.14,
      baseProduction: new Decimal(4),
    },
    arcadeCabinet: {
      name: "Vector Arcade Cabinet",
      category: "arcades",
      count: 0,
      baseCost: new Decimal(1100),
      costMultiplier: 1.13,
      baseProduction: new Decimal(32),
    },
    commodore64: {
      name: "Commodore 64",
      category: "computers",
      count: 0,
      baseCost: new Decimal(12000),
      costMultiplier: 1.12,
      baseProduction: new Decimal(260),
    }
  },

  // Achievements Tracking
  achievements: {
    firstClick: false,
    reachLevel10: false,
    buyC64: false
  }
};