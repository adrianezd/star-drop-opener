'use strict';

/* =========================================================
   Star Drop: Simulador de Recompensas
   Toda la lógica del juego. Sin dependencias externas.
   ========================================================= */

/* ---------- Datos: rarezas reales de Brawl Stars ---------- */
const RARITIES = ['rara', 'superrara', 'epica', 'mitica', 'legendaria', 'ultralegendaria'];
const RARITY_LABEL = {
  rara: 'Rara',
  superrara: 'Súper Rara',
  epica: 'Épica',
  mitica: 'Mítica',
  legendaria: 'Legendaria',
  ultralegendaria: 'Ultra Legendaria'
};
const RARITY_ICON = {
  rara: '🟩',
  superrara: '🟦',
  epica: '🟪',
  mitica: '🌸',
  legendaria: '⭐',
  ultralegendaria: '👑'
};

/* ---------- Datos: brawlers reales de Brawl Stars (52) ----------
   Nombres, rarezas reales, y (cuando se han podido confirmar) un
   Superpoder y un Gadget reales por brawler. Sin artwork oficial:
   solo texto/datos y emoji genéricos como icono. Proyecto de fan no
   oficial, no afiliado a Supercell. */
const CHARACTERS = [
  { id: 'shelly', name: 'Shelly', type: 'Ataque', emoji: '💥', rarity: 'rara', starPower: 'Shell Shock', gadget: 'Fast Forward' },
  { id: 'nita', name: 'Nita', type: 'Apoyo', emoji: '🐻', rarity: 'rara', starPower: 'Bear With Me', gadget: 'Bear Paws' },
  { id: 'colt', name: 'Colt', type: 'Ataque', emoji: '🤠', rarity: 'rara', starPower: 'Slick Boots', gadget: 'Speedloader' },
  { id: 'bull', name: 'Bull', type: 'Defensa', emoji: '🐂', rarity: 'rara', starPower: 'Berserker', gadget: 'T-Bone Injector' },
  { id: 'brock', name: 'Brock', type: 'Ataque', emoji: '🚀', rarity: 'rara', starPower: 'Incendiary', gadget: 'Rocket Laces' },
  { id: 'el-primo', name: 'El Primo', type: 'Defensa', emoji: '🤼', rarity: 'rara', starPower: 'El Fuego', gadget: 'Suplex Supplement' },
  { id: 'barley', name: 'Barley', type: 'Ataque', emoji: '🍺', rarity: 'rara', starPower: 'Medical Use', gadget: 'Sticky Syrup Mixer' },
  { id: 'poco', name: 'Poco', type: 'Apoyo', emoji: '🎸', rarity: 'rara', starPower: 'Da Capo!', gadget: 'Protective Tunes' },
  { id: 'rosa', name: 'Rosa', type: 'Defensa', emoji: '🌵', rarity: 'rara', starPower: 'Plant Life', gadget: 'Grow Light' },

  { id: 'jessie', name: 'Jessie', type: 'Apoyo', emoji: '🔧', rarity: 'superrara', starPower: 'Shocky', gadget: 'Spark Plug' },
  { id: 'dynamike', name: 'Dynamike', type: 'Ataque', emoji: '🧨', rarity: 'superrara', starPower: 'Dyna-Jump', gadget: 'Satchel Charge' },
  { id: 'tick', name: 'Tick', type: 'Ataque', emoji: '💣', rarity: 'superrara', starPower: 'Well Done', gadget: 'Landmine Sowing' },
  { id: '8-bit', name: '8-Bit', type: 'Ataque', emoji: '🕹️', rarity: 'superrara', starPower: 'PosiBoost Booster', gadget: 'Autoaim Software' },
  { id: 'rico', name: 'Rico', type: 'Ataque', emoji: '🏀', rarity: 'superrara', starPower: 'Robo Retreat', gadget: 'Multiball Launcher' },
  { id: 'darryl', name: 'Darryl', type: 'Defensa', emoji: '🛢️', rarity: 'superrara', starPower: 'Steel Hoops', gadget: 'Recoiling Rotator' },
  { id: 'penny', name: 'Penny', type: 'Ataque', emoji: '🏴‍☠️', rarity: 'superrara', starPower: 'Trick Shot', gadget: 'Heavy Coffers' },
  { id: 'carl', name: 'Carl', type: 'Ataque', emoji: '⛏️', rarity: 'superrara', starPower: 'Power Throw', gadget: 'Heat Rush' },
  { id: 'jacky', name: 'Jacky', type: 'Defensa', emoji: '🚧', rarity: 'superrara', starPower: 'Pneumatic Booster', gadget: 'Hardhat' },

  { id: 'bo', name: 'Bo', type: 'Ataque', emoji: '🏹', rarity: 'epica', starPower: 'Circling Eagle', gadget: 'Tripwire' },
  { id: 'emz', name: 'Emz', type: 'Ataque', emoji: '💄', rarity: 'epica' },
  { id: 'stu', name: 'Stu', type: 'Ataque', emoji: '🏎️', rarity: 'epica' },
  { id: 'piper', name: 'Piper', type: 'Ataque', emoji: '☂️', rarity: 'epica' },
  { id: 'frank', name: 'Frank', type: 'Defensa', emoji: '🔨', rarity: 'epica' },
  { id: 'bibi', name: 'Bibi', type: 'Ataque', emoji: '🏏', rarity: 'epica' },
  { id: 'bea', name: 'Bea', type: 'Ataque', emoji: '🐝', rarity: 'epica', starPower: 'Insta-Beeload', gadget: 'Honey Molasses' },
  { id: 'edgar', name: 'Edgar', type: 'Ataque', emoji: '🥊', rarity: 'epica' },
  { id: 'gale', name: 'Gale', type: 'Apoyo', emoji: '❄️', rarity: 'epica' },
  { id: 'colette', name: 'Colette', type: 'Ataque', emoji: '🍳', rarity: 'epica' },
  { id: 'berry', name: 'Berry', type: 'Apoyo', emoji: '🍓', rarity: 'epica', starPower: 'Floor Is Fine', gadget: 'Friendship Is Great' },
  { id: 'meeple', name: 'Meeple', type: 'Apoyo', emoji: '🎲', rarity: 'epica', starPower: 'Do Not Pass Go', gadget: 'Mansions Of Meeple' },

  { id: 'mortis', name: 'Mortis', type: 'Ataque', emoji: '🧛', rarity: 'mitica', starPower: 'Creepy Harvest', gadget: 'Combo Spinner' },
  { id: 'tara', name: 'Tara', type: 'Apoyo', emoji: '🔮', rarity: 'mitica' },
  { id: 'gene', name: 'Gene', type: 'Apoyo', emoji: '🧞', rarity: 'mitica' },
  { id: 'max', name: 'Max', type: 'Apoyo', emoji: '👟', rarity: 'mitica' },
  { id: 'mr-p', name: 'Mr. P', type: 'Apoyo', emoji: '🧳', rarity: 'mitica' },
  { id: 'sprout', name: 'Sprout', type: 'Apoyo', emoji: '🌱', rarity: 'mitica' },
  { id: 'chuck', name: 'Chuck', type: 'Apoyo', emoji: '🎫', rarity: 'mitica' },
  { id: 'charlie', name: 'Charlie', type: 'Apoyo', emoji: '🕷️', rarity: 'mitica', starPower: 'Digestive', gadget: 'Spiders' },
  { id: 'mico', name: 'Mico', type: 'Ataque', emoji: '🐒', rarity: 'mitica', starPower: 'Monkey Business', gadget: 'Clipping Scream' },
  { id: 'melodie', name: 'Melodie', type: 'Ataque', emoji: '🎧', rarity: 'mitica', starPower: 'Fast Beats', gadget: 'Perfect Pitch' },
  { id: 'lily', name: 'Lily', type: 'Ataque', emoji: '🌸', rarity: 'mitica', starPower: 'Spiky', gadget: 'Vanish' },
  { id: 'moe', name: 'Moe', type: 'Ataque', emoji: '🎳', rarity: 'mitica', starPower: 'Skipping Stones', gadget: 'Dodgy Digging' },

  { id: 'spike', name: 'Spike', type: 'Ataque', emoji: '🎯', rarity: 'legendaria', starPower: 'Fast Growth', gadget: 'Popping Pincushion' },
  { id: 'crow', name: 'Crow', type: 'Ataque', emoji: '🦅', rarity: 'legendaria', starPower: 'Extra Toxic', gadget: 'Defense Booster' },
  { id: 'leon', name: 'Leon', type: 'Ataque', emoji: '🃏', rarity: 'legendaria', starPower: 'Smoke Trails', gadget: 'Lollipop Drop' },
  { id: 'sandy', name: 'Sandy', type: 'Apoyo', emoji: '💤', rarity: 'legendaria' },
  { id: 'amber', name: 'Amber', type: 'Ataque', emoji: '🔥', rarity: 'legendaria' },
  { id: 'meg', name: 'Meg', type: 'Ataque', emoji: '🤖', rarity: 'legendaria' },
  { id: 'kit', name: 'Kit', type: 'Ataque', emoji: '🐱', rarity: 'legendaria', starPower: 'Power Hungry', gadget: 'Cardboard Box' },
  { id: 'draco', name: 'Draco', type: 'Defensa', emoji: '🐲', rarity: 'legendaria', starPower: 'Expose', gadget: 'Upper Cut' },

  { id: 'sirius', name: 'Sirius', type: 'Apoyo', emoji: '🌘', rarity: 'ultralegendaria', starPower: 'Dusk Runners', gadget: 'A Starr Is Born' },
  { id: 'kaze', name: 'Kaze', type: 'Ataque', emoji: '🥷', rarity: 'ultralegendaria', starPower: 'Advanced Techniques', gadget: 'Gracious Host' }
];

/* ---------- Datos: skins (20), cada una ligada a un brawler real ----------
   Línea "Golden" = línea de skins real y recurrente de Brawl Stars.
   "Sheriff Colt", "Werewolf Leon" y "Punk Shelly" son skins reales.
   El resto son nombres de estilo realista curados por el autor (no
   verificados uno a uno), siguiendo las convenciones de nombres de
   skins del juego. Ningún artwork oficial: solo texto y emoji. */
const SKINS = [
  { id: 'golden-shelly', name: 'Golden Shelly', charId: 'shelly', rarity: 'epica', emoji: '🟡' },
  { id: 'golden-colt', name: 'Golden Colt', charId: 'colt', rarity: 'epica', emoji: '🟡' },
  { id: 'golden-bull', name: 'Golden Bull', charId: 'bull', rarity: 'epica', emoji: '🟡' },
  { id: 'golden-nita', name: 'Golden Nita', charId: 'nita', rarity: 'epica', emoji: '🟡' },
  { id: 'golden-el-primo', name: 'Golden El Primo', charId: 'el-primo', rarity: 'epica', emoji: '🟡' },
  { id: 'golden-poco', name: 'Golden Poco', charId: 'poco', rarity: 'epica', emoji: '🟡' },
  { id: 'golden-jessie', name: 'Golden Jessie', charId: 'jessie', rarity: 'epica', emoji: '🟡' },
  { id: 'golden-brock', name: 'Golden Brock', charId: 'brock', rarity: 'epica', emoji: '🟡' },
  { id: 'golden-kaze', name: 'Golden Kaze', charId: 'kaze', rarity: 'ultralegendaria', emoji: '🟡' },

  { id: 'sheriff-colt', name: 'Sheriff Colt', charId: 'colt', rarity: 'rara', emoji: '⭐' },
  { id: 'werewolf-leon', name: 'Werewolf Leon', charId: 'leon', rarity: 'legendaria', emoji: '🐺' },
  { id: 'punk-shelly', name: 'Punk Shelly', charId: 'shelly', rarity: 'rara', emoji: '🎸' },

  { id: 'cyber-rosa', name: 'Cyber Rosa', charId: 'rosa', rarity: 'rara', emoji: '🤖' },
  { id: 'ghost-spike', name: 'Ghost Spike', charId: 'spike', rarity: 'mitica', emoji: '👻' },
  { id: 'ninja-leon', name: 'Ninja Leon', charId: 'leon', rarity: 'superrara', emoji: '🥷' },
  { id: 'toon-nita', name: 'Toon Nita', charId: 'nita', rarity: 'rara', emoji: '🎨' },
  { id: 'retro-bull', name: 'Retro Bull', charId: 'bull', rarity: 'rara', emoji: '📼' },
  { id: 'pharaoh-brock', name: 'Pharaoh Brock', charId: 'brock', rarity: 'mitica', emoji: '🏺' },
  { id: 'dragon-kit', name: 'Dragon Kit', charId: 'kit', rarity: 'legendaria', emoji: '🐉' },
  { id: 'street-jacky', name: 'Street Jacky', charId: 'jacky', rarity: 'superrara', emoji: '🛹' }
];

/* ---------- Datos: gotas (tiers) ---------- */
const DROP_TIERS = [
  {
    id: 'normal', name: 'Gota Normal', cost: 10, emoji: '💧',
    odds: { rara: 45, superrara: 30, epica: 15, mitica: 7, legendaria: 2.5, ultralegendaria: 0.5 }
  },
  {
    id: 'grande', name: 'Gota Grande', cost: 25, emoji: '🌊',
    odds: { rara: 25, superrara: 30, epica: 25, mitica: 13, legendaria: 5, ultralegendaria: 2 }
  },
  {
    id: 'mega', name: 'Gota Mega', cost: 60, emoji: '💎',
    odds: { rara: 10, superrara: 20, epica: 30, mitica: 25, legendaria: 11, ultralegendaria: 4 }
  },
  {
    id: 'especial', name: 'Gota Especial', cost: 120, emoji: '🌟',
    odds: { rara: 3, superrara: 10, epica: 22, mitica: 30, legendaria: 25, ultralegendaria: 10 }
  }
];

/* ---------- Odds de tipo de recompensa según rareza ---------- */
const TYPE_ODDS_BY_RARITY = {
  rara: { monedas: 45, poder: 28, gadget: 15, skin: 8, personaje: 4 },
  superrara: { monedas: 38, poder: 26, gadget: 14, skin: 14, personaje: 8 },
  epica: { monedas: 25, poder: 20, gadget: 10, skin: 25, personaje: 20 },
  mitica: { monedas: 15, poder: 10, gadget: 5, skin: 30, personaje: 40 },
  legendaria: { monedas: 10, poder: 5, gadget: 5, skin: 35, personaje: 45 },
  ultralegendaria: { monedas: 5, poder: 5, gadget: 5, skin: 35, personaje: 50 }
};

const COIN_RANGE = {
  rara: [50, 100], superrara: [100, 200], epica: [250, 400], mitica: [500, 800], legendaria: [1000, 2000], ultralegendaria: [2000, 3500]
};
const POWER_RANGE = {
  rara: [10, 25], superrara: [25, 50], epica: [60, 100], mitica: [120, 200], legendaria: [250, 400], ultralegendaria: [400, 600]
};
const GADGET_RANGE = {
  rara: [1, 2], superrara: [2, 3], epica: [3, 5], mitica: [5, 8], legendaria: [10, 15], ultralegendaria: [15, 20]
};

/* ---------- Configuración de progresión ---------- */
const TICKET_INTERVAL_MS = 3 * 60 * 1000; // +1 ficha cada 3 minutos
const TICKET_CAP = 200;
const INITIAL_FICHAS = 50;
const FREE_DROP_COOLDOWN_MS = 4 * 60 * 60 * 1000; // 4 horas
const FREE_DROP_BONUS = 15;
const PITY_MAX = 30;
const STORAGE_KEY = 'starDropState_v1';

/* ---------- Estado ---------- */
let state = null;

function defaultState() {
  const now = Date.now();
  return {
    fichas: INITIAL_FICHAS,
    lastTicketTime: now,
    lastFreeClaim: 0,
    coins: 0,
    power: 0,
    gadgets: 0,
    pityCounter: 0,
    unlockedCharacters: [],
    unlockedSkins: [],
    totalOpens: 0,
    totalCoinsEarned: 0,
    totalPowerEarned: 0,
    totalGadgetsEarned: 0,
    totalLegendaries: 0,
    totalNewCharacters: 0,
    history: [],
    firstVisit: true
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    return Object.assign(defaultState(), parsed);
  } catch (e) {
    return defaultState();
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    /* almacenamiento no disponible: se continúa sin persistir */
  }
}

/* ---------- Utilidades ---------- */
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function weightedPick(weightsObj) {
  const entries = Object.entries(weightsObj).filter(([, w]) => w > 0);
  const total = entries.reduce((s, [, w]) => s + w, 0);
  let r = Math.random() * total;
  for (const [key, w] of entries) {
    if (r < w) return key;
    r -= w;
  }
  return entries[entries.length - 1][0];
}

function formatNumber(n) {
  return n.toLocaleString('es-ES');
}

function formatDuration(ms) {
  if (ms <= 0) return '00:00';
  const totalSec = Math.ceil(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  if (h > 0) {
    return `${h}h ${String(m).padStart(2, '0')}m`;
  }
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

/* ---------- Ticket regen ---------- */
function reconcileTickets() {
  if (state.fichas >= TICKET_CAP) {
    state.lastTicketTime = Date.now();
    return;
  }
  const now = Date.now();
  const elapsed = now - state.lastTicketTime;
  const gained = Math.floor(elapsed / TICKET_INTERVAL_MS);
  if (gained > 0) {
    const canGain = Math.min(gained, TICKET_CAP - state.fichas);
    state.fichas += canGain;
    state.lastTicketTime += gained * TICKET_INTERVAL_MS;
  }
}

/* ---------- Selección de recompensa ---------- */
function chooseRarity(tier, forcedLegendary) {
  if (forcedLegendary) return 'legendaria';
  return weightedPick(tier.odds);
}

function pickCharacterOfRarity(rarity) {
  const pool = CHARACTERS.filter(c => c.rarity === rarity && !state.unlockedCharacters.includes(c.id));
  if (pool.length) return pool[randInt(0, pool.length - 1)];
  // buscar en cualquier rareza si no queda ninguno de esa rareza
  const anyPool = CHARACTERS.filter(c => !state.unlockedCharacters.includes(c.id));
  if (anyPool.length) return anyPool[randInt(0, anyPool.length - 1)];
  return null;
}

function pickSkinOfRarity(rarity) {
  const pool = SKINS.filter(s => s.rarity === rarity && !state.unlockedSkins.includes(s.id));
  if (pool.length) return pool[randInt(0, pool.length - 1)];
  const anyPool = SKINS.filter(s => !state.unlockedSkins.includes(s.id));
  if (anyPool.length) return anyPool[randInt(0, anyPool.length - 1)];
  return null;
}

function generateReward(tier) {
  const forcedLegendary = state.pityCounter >= PITY_MAX - 1;
  const rarity = chooseRarity(tier, forcedLegendary);
  let type = weightedPick(TYPE_ODDS_BY_RARITY[rarity]);

  const reward = { rarity, type, isNew: false };

  if (type === 'personaje') {
    const char = pickCharacterOfRarity(rarity);
    if (!char) {
      type = 'monedas';
    } else {
      reward.type = 'personaje';
      reward.character = char;
      reward.isNew = true;
    }
  }

  if (type === 'skin') {
    const skin = pickSkinOfRarity(rarity);
    if (!skin) {
      type = 'monedas';
    } else {
      reward.type = 'skin';
      reward.skin = skin;
      reward.isNew = true;
      reward.skinCharUnlocked = !state.unlockedCharacters.includes(skin.charId);
    }
  }

  if (type === 'monedas') {
    const [lo, hi] = COIN_RANGE[rarity];
    reward.type = 'monedas';
    reward.amount = randInt(lo, hi);
  } else if (type === 'poder') {
    const [lo, hi] = POWER_RANGE[rarity];
    reward.type = 'poder';
    reward.amount = randInt(lo, hi);
  } else if (type === 'gadget') {
    const [lo, hi] = GADGET_RANGE[rarity];
    reward.type = 'gadget';
    reward.amount = randInt(lo, hi);
  }

  return reward;
}

function applyReward(reward) {
  switch (reward.type) {
    case 'monedas':
      state.coins += reward.amount;
      state.totalCoinsEarned += reward.amount;
      break;
    case 'poder':
      state.power += reward.amount;
      state.totalPowerEarned += reward.amount;
      break;
    case 'gadget':
      state.gadgets += reward.amount;
      state.totalGadgetsEarned += reward.amount;
      break;
    case 'personaje':
      state.unlockedCharacters.push(reward.character.id);
      state.totalNewCharacters += 1;
      break;
    case 'skin':
      state.unlockedSkins.push(reward.skin.id);
      if (reward.skinCharUnlocked && !state.unlockedCharacters.includes(reward.skin.charId)) {
        state.unlockedCharacters.push(reward.skin.charId);
        state.totalNewCharacters += 1;
      }
      break;
  }

  if (reward.rarity === 'legendaria' || reward.rarity === 'ultralegendaria') {
    state.pityCounter = 0;
    state.totalLegendaries += 1;
  } else {
    state.pityCounter += 1;
  }

  state.totalOpens += 1;

  const label = rewardLabel(reward);
  state.history.unshift({ label, rarity: reward.rarity, ts: Date.now() });
  state.history = state.history.slice(0, 25);
}

function rewardLabel(reward) {
  switch (reward.type) {
    case 'monedas': return `+${reward.amount} Monedas`;
    case 'poder': return `+${reward.amount} Puntos de Poder`;
    case 'gadget': return `+${reward.amount} Gadget`;
    case 'personaje': return `Nuevo brawler: ${reward.character.name}`;
    case 'skin': return `Nueva skin: ${reward.skin.name}`;
    default: return 'Recompensa';
  }
}

function rewardIconEmoji(reward) {
  switch (reward.type) {
    case 'monedas': return '🪙';
    case 'poder': return '🔷';
    case 'gadget': return '🛠️';
    case 'personaje': return reward.character.emoji;
    case 'skin': return reward.skin.emoji;
    default: return '🎁';
  }
}

function rewardDesc(reward) {
  switch (reward.type) {
    case 'monedas': return `Has recibido ${reward.amount} Monedas.`;
    case 'poder': return `Has recibido ${reward.amount} Puntos de Poder.`;
    case 'gadget': return `Has recibido ${reward.amount} Gadget nuevo${reward.amount > 1 ? 's' : ''}.`;
    case 'personaje': {
      const c = reward.character;
      const ability = c.starPower ? ` · Superpoder: ${c.starPower} · Gadget: ${c.gadget}` : '';
      return `${c.name} · Tipo: ${c.type}${ability}`;
    }
    case 'skin': {
      const char = CHARACTERS.find(c => c.id === reward.skin.charId);
      return `Skin para ${char ? char.name : 'brawler'}`;
    }
    default: return '';
  }
}

/* ---------- DOM refs ---------- */
const el = (id) => document.getElementById(id);

const fichasCountEl = el('fichas-count');
const coinsCountEl = el('coins-count');
const powerCountEl = el('power-count');
const gadgetCountEl = el('gadget-count');
const fichasPillEl = el('fichas-pill');
const nextTicketTimerEl = el('next-ticket-timer');
const ticketCapEl = el('ticket-cap');
const freeDropBtn = el('free-drop-btn');
const freeDropTimerEl = el('free-drop-timer');
const pityCountEl = el('pity-count');
const pityMaxEl = el('pity-max');
const dropGridEl = el('drop-grid');
const collectionGridEl = el('collection-grid');
const charsUnlockedEl = el('chars-unlocked');
const charsTotalEl = el('chars-total');
const skinsUnlockedEl = el('skins-unlocked');
const skinsTotalEl = el('skins-total');
const statOpensEl = el('stat-opens');
const statCoinsEl = el('stat-coins');
const statPowerEl = el('stat-power');
const statGadgetsEl = el('stat-gadgets');
const statLegendariesEl = el('stat-legendaries');
const statCharsEl = el('stat-chars');
const historyListEl = el('history-list');
const resetBtn = el('reset-btn');

const openOverlay = el('open-overlay');
const openOrb = el('open-orb');
const openOrbIcon = el('open-orb-icon');
const openHint = el('open-hint');

const revealOverlay = el('reveal-overlay');
const revealCard = el('reveal-card');
const revealRarity = el('reveal-rarity');
const revealIcon = el('reveal-icon');
const revealName = el('reveal-name');
const revealDesc = el('reveal-desc');
const revealNew = el('reveal-new');
const revealContinue = el('reveal-continue');

const particleLayer = el('particle-layer');
const shakeFlash = el('shake-flash');

let pendingTier = null;

/* ---------- Render ---------- */
function renderCurrency() {
  fichasCountEl.textContent = formatNumber(Math.floor(state.fichas));
  coinsCountEl.textContent = formatNumber(state.coins);
  powerCountEl.textContent = formatNumber(state.power);
  gadgetCountEl.textContent = formatNumber(state.gadgets);
  ticketCapEl.textContent = formatNumber(TICKET_CAP);
  pityCountEl.textContent = state.pityCounter;
  pityMaxEl.textContent = PITY_MAX;
}

function renderDropGrid() {
  dropGridEl.innerHTML = '';
  DROP_TIERS.forEach(tier => {
    const card = document.createElement('div');
    card.className = 'drop-card';
    card.dataset.tier = tier.id;

    const oddsText = RARITIES.map(r => `${RARITY_LABEL[r]} ${tier.odds[r]}%`).join(' · ');

    card.innerHTML = `
      <div class="drop-orb-preview">${tier.emoji}</div>
      <div class="drop-name">${tier.name}</div>
      <div class="drop-odds">${oddsText}</div>
      <div class="drop-cost"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><path d="M12 3 L14 10 L21 12 L14 14 L12 21 L10 14 L3 12 L10 10 Z"/></svg> ${tier.cost}</div>
      <button type="button" class="btn btn-secondary drop-open-btn" data-open="${tier.id}">Abrir</button>
    `;
    dropGridEl.appendChild(card);
  });

  dropGridEl.querySelectorAll('[data-open]').forEach(btn => {
    btn.addEventListener('click', () => startOpen(btn.dataset.open));
    updateDropButtonState(btn);
  });
}

function updateDropButtonState(btn) {
  const tier = DROP_TIERS.find(t => t.id === btn.dataset.open);
  const canAfford = state.fichas >= tier.cost;
  btn.disabled = !canAfford;
  btn.textContent = canAfford ? 'Abrir' : `Faltan ${tier.cost - Math.floor(state.fichas)} 💠`;
}

function refreshDropButtons() {
  dropGridEl.querySelectorAll('[data-open]').forEach(updateDropButtonState);
}

function renderCollection() {
  collectionGridEl.innerHTML = '';
  charsTotalEl.textContent = CHARACTERS.length;
  skinsTotalEl.textContent = SKINS.length;
  charsUnlockedEl.textContent = state.unlockedCharacters.length;
  skinsUnlockedEl.textContent = state.unlockedSkins.length;

  CHARACTERS.forEach(c => {
    const unlocked = state.unlockedCharacters.includes(c.id);
    const card = document.createElement('div');
    card.className = 'char-card' + (unlocked ? '' : ' locked');

    const charSkins = SKINS.filter(s => s.charId === c.id);
    const unlockedSkinsForChar = charSkins.filter(s => state.unlockedSkins.includes(s.id));

    let skinsHtml = '';
    if (unlocked && unlockedSkinsForChar.length) {
      skinsHtml = `<div class="char-skins">${unlockedSkinsForChar.map(s => `<span class="skin-chip">${s.emoji} ${s.name}</span>`).join('')}</div>`;
    } else if (unlocked && charSkins.length) {
      skinsHtml = `<div class="char-skins">Skins: 0/${charSkins.length}</div>`;
    }

    const abilityHtml = (unlocked && c.starPower)
      ? `<div class="char-ability">⭐ ${c.starPower} · 🔧 ${c.gadget}</div>`
      : '';

    card.innerHTML = `
      <div class="char-icon">${unlocked ? c.emoji : '❓'}</div>
      <div class="char-name">${unlocked ? c.name : '???'}</div>
      <div class="char-type">${unlocked ? ('Tipo: ' + c.type) : 'Bloqueado'}</div>
      <span class="rarity-tag rarity-${c.rarity}">${RARITY_LABEL[c.rarity]}</span>
      ${abilityHtml}
      ${skinsHtml}
    `;
    collectionGridEl.appendChild(card);
  });
}

function renderStats() {
  statOpensEl.textContent = formatNumber(state.totalOpens);
  statCoinsEl.textContent = formatNumber(state.totalCoinsEarned);
  statPowerEl.textContent = formatNumber(state.totalPowerEarned);
  statGadgetsEl.textContent = formatNumber(state.totalGadgetsEarned);
  statLegendariesEl.textContent = formatNumber(state.totalLegendaries);
  statCharsEl.textContent = formatNumber(state.totalNewCharacters);

  historyListEl.innerHTML = '';
  if (!state.history.length) {
    const li = document.createElement('li');
    li.textContent = 'Aún no has abierto ninguna gota.';
    historyListEl.appendChild(li);
  } else {
    state.history.forEach(h => {
      const li = document.createElement('li');
      const time = new Date(h.ts).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
      li.innerHTML = `<span class="history-entry"><span class="history-dot" style="background:${getRarityColor(h.rarity)}"></span>${h.label}</span><span>${time}</span>`;
      historyListEl.appendChild(li);
    });
  }
}

function renderAll() {
  renderCurrency();
  refreshDropButtons();
  renderCollection();
  renderStats();
}

/* ---------- Timers UI ---------- */
function tickTimers() {
  reconcileTickets();

  if (state.fichas >= TICKET_CAP) {
    nextTicketTimerEl.textContent = 'Máximo';
  } else {
    const msLeft = TICKET_INTERVAL_MS - (Date.now() - state.lastTicketTime);
    nextTicketTimerEl.textContent = formatDuration(msLeft);
  }

  const freeElapsed = Date.now() - state.lastFreeClaim;
  const freeLeft = FREE_DROP_COOLDOWN_MS - freeElapsed;
  if (freeLeft <= 0) {
    freeDropBtn.disabled = false;
    freeDropTimerEl.textContent = 'lista';
  } else {
    freeDropBtn.disabled = true;
    freeDropTimerEl.textContent = formatDuration(freeLeft);
  }

  renderCurrency();
  refreshDropButtons();
  saveState();
}

/* ---------- Apertura de gotas ---------- */
function startOpen(tierId) {
  const tier = DROP_TIERS.find(t => t.id === tierId);
  if (!tier || state.fichas < tier.cost) return;

  pendingTier = tier;
  state.fichas -= tier.cost;
  renderCurrency();
  refreshDropButtons();
  saveState();

  openOrbIcon.textContent = tier.emoji;
  openOrb.className = 'open-orb';
  openHint.textContent = 'Toca la gota para abrirla';
  openOverlay.hidden = false;

  const handler = () => {
    openOrb.removeEventListener('click', handler);
    openHint.textContent = 'Abriendo...';
    openOrb.classList.add('spinning');
    setTimeout(() => finishOpen(tier), 950);
  };
  openOrb.addEventListener('click', handler);
}

function finishOpen(tier) {
  openOverlay.hidden = true;
  openOrb.classList.remove('spinning');

  const reward = generateReward(tier);
  applyReward(reward);
  saveState();

  spawnParticles(reward.rarity);
  if (reward.rarity === 'mitica' || reward.rarity === 'legendaria') {
    triggerShake();
  }

  showReveal(reward);
  renderAll();
}

function showReveal(reward) {
  revealCard.className = 'reveal-card rarity-' + reward.rarity + '-card';
  revealRarity.textContent = RARITY_LABEL[reward.rarity];
  revealRarity.style.color = getRarityColor(reward.rarity);
  revealIcon.textContent = rewardIconEmoji(reward);

  if (reward.type === 'personaje') {
    revealName.textContent = reward.character.name;
  } else if (reward.type === 'skin') {
    revealName.textContent = reward.skin.name;
  } else if (reward.type === 'monedas') {
    revealName.textContent = 'Monedas';
  } else if (reward.type === 'poder') {
    revealName.textContent = 'Puntos de Poder';
  } else {
    revealName.textContent = 'Gadget';
  }

  revealDesc.textContent = rewardDesc(reward);

  if (reward.isNew) {
    revealNew.hidden = false;
    revealNew.textContent = reward.type === 'personaje' ? '¡Nuevo brawler desbloqueado!' : '¡Nueva skin desbloqueada!';
  } else {
    revealNew.hidden = true;
  }

  revealOverlay.hidden = false;
}

function getRarityColor(rarity) {
  const map = {
    rara: '#8fd6a8', superrara: '#4db8ff', epica: '#b479ff', mitica: '#ff5fb8', legendaria: '#ffb43f', ultralegendaria: '#ff4d4d'
  };
  return map[rarity];
}

revealContinue.addEventListener('click', () => {
  revealOverlay.hidden = true;
});

/* ---------- Partículas ---------- */
function spawnParticles(rarity) {
  const count = rarity === 'legendaria' ? 40 : rarity === 'mitica' ? 28 : rarity === 'epica' ? 18 : 12;
  const color = getRarityColor(rarity);
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('span');
    p.className = 'particle';
    const size = randInt(4, 9);
    const angle = Math.random() * Math.PI * 2;
    const dist = randInt(80, 260);
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist;
    p.style.left = cx + 'px';
    p.style.top = cy + 'px';
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.background = color;
    p.style.boxShadow = `0 0 ${size * 2}px ${color}`;
    p.style.setProperty('--dx', dx + 'px');
    p.style.setProperty('--dy', dy + 'px');
    particleLayer.appendChild(p);
    setTimeout(() => p.remove(), 950);
  }
}

function triggerShake() {
  document.body.classList.add('shaking');
  shakeFlash.classList.add('flash');
  setTimeout(() => {
    document.body.classList.remove('shaking');
    shakeFlash.classList.remove('flash');
  }, 450);
}

/* ---------- Gota gratis ---------- */
freeDropBtn.addEventListener('click', () => {
  const freeLeft = FREE_DROP_COOLDOWN_MS - (Date.now() - state.lastFreeClaim);
  if (freeLeft > 0) return;
  state.lastFreeClaim = Date.now();
  state.fichas = Math.min(TICKET_CAP, state.fichas + FREE_DROP_BONUS);
  fichasPillEl.classList.remove('pulse');
  void fichasPillEl.offsetWidth;
  fichasPillEl.classList.add('pulse');
  saveState();
  renderCurrency();
  refreshDropButtons();
  tickTimers();
});

/* ---------- Tabs ---------- */
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    el(btn.dataset.tab).classList.add('active');
  });
});

/* ---------- Reset ---------- */
resetBtn.addEventListener('click', () => {
  const ok = window.confirm('¿Seguro que quieres reiniciar todo tu progreso? Esta acción no se puede deshacer.');
  if (!ok) return;
  state = defaultState();
  state.firstVisit = false;
  saveState();
  renderAll();
  tickTimers();
});

/* ---------- Inicialización ---------- */
function init() {
  state = loadState();
  const isFirst = state.firstVisit;
  reconcileTickets();
  if (isFirst) {
    state.firstVisit = false;
  }
  saveState();

  renderDropGrid();
  renderAll();
  tickTimers();

  setInterval(tickTimers, 15000);
}

document.addEventListener('DOMContentLoaded', init);
