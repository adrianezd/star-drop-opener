'use strict';

/* =========================================================
   Star Drop: Simulador de Recompensas
   Toda la lógica del juego. Sin dependencias externas.
   ========================================================= */

/* ---------- Datos: rarezas ---------- */
const RARITIES = ['comun', 'rara', 'epica', 'mitica', 'legendaria'];
const RARITY_LABEL = {
  comun: 'Común',
  rara: 'Rara',
  epica: 'Épica',
  mitica: 'Mítica',
  legendaria: 'Legendaria'
};
const RARITY_ICON = {
  comun: '🟢',
  rara: '🔵',
  epica: '🟣',
  mitica: '🌸',
  legendaria: '⭐'
};

/* ---------- Datos: personajes originales (22) ---------- */
const CHARACTERS = [
  { id: 'chispa-voltia', name: 'Chispa Voltia', type: 'Ataque', emoji: '⚡', rarity: 'comun' },
  { id: 'roca-grumm', name: 'Roca Grumm', type: 'Defensa', emoji: '🪨', rarity: 'comun' },
  { id: 'enfermera-lux', name: 'Enfermera Lux', type: 'Apoyo', emoji: '✨', rarity: 'comun' },
  { id: 'sombra-kex', name: 'Sombra Kex', type: 'Ataque', emoji: '🗡️', rarity: 'comun' },
  { id: 'tanque-bruno', name: 'Tanque Bruno', type: 'Defensa', emoji: '🛡️', rarity: 'comun' },
  { id: 'brisa-nix', name: 'Brisa Nix', type: 'Apoyo', emoji: '🍃', rarity: 'comun' },

  { id: 'llama-ferro', name: 'Llama Ferro', type: 'Ataque', emoji: '🔥', rarity: 'rara' },
  { id: 'hielo-glacia', name: 'Hielo Glacia', type: 'Defensa', emoji: '❄️', rarity: 'rara' },
  { id: 'doctor-pip', name: 'Doctor Pip', type: 'Apoyo', emoji: '🧪', rarity: 'rara' },
  { id: 'trueno-rax', name: 'Trueno Rax', type: 'Ataque', emoji: '🌩️', rarity: 'rara' },
  { id: 'muralla-don', name: 'Muralla Don', type: 'Defensa', emoji: '🧱', rarity: 'rara' },
  { id: 'melodia-fay', name: 'Melodía Fay', type: 'Apoyo', emoji: '🎵', rarity: 'rara' },

  { id: 'veneno-kro', name: 'Veneno Kro', type: 'Ataque', emoji: '☠️', rarity: 'epica' },
  { id: 'coraza-beto', name: 'Coraza Beto', type: 'Defensa', emoji: '🐢', rarity: 'epica' },
  { id: 'chaman-uli', name: 'Chamán Uli', type: 'Apoyo', emoji: '🌀', rarity: 'epica' },
  { id: 'cometa-zoe', name: 'Cometa Zoe', type: 'Ataque', emoji: '☄️', rarity: 'epica' },
  { id: 'fortin-max', name: 'Fortín Max', type: 'Defensa', emoji: '🏰', rarity: 'epica' },

  { id: 'estelar-nova', name: 'Estelar Nova', type: 'Apoyo', emoji: '🌟', rarity: 'mitica' },
  { id: 'puno-rok', name: 'Puño Rok', type: 'Ataque', emoji: '👊', rarity: 'mitica' },
  { id: 'escudo-vega', name: 'Escudo Vega', type: 'Defensa', emoji: '🔰', rarity: 'mitica' },

  { id: 'curandera-bibi', name: 'Curandera Bibi', type: 'Apoyo', emoji: '💫', rarity: 'legendaria' },
  { id: 'rayo-fenn', name: 'Rayo Fenn', type: 'Ataque', emoji: '🐉', rarity: 'legendaria' }
];

/* ---------- Datos: skins originales (12), cada una ligada a un personaje ---------- */
const SKINS = [
  { id: 'skin-neon-artico', name: 'Neón Ártico', charId: 'hielo-glacia', rarity: 'rara', emoji: '🧊' },
  { id: 'skin-fuego-cosmico', name: 'Fuego Cósmico', charId: 'llama-ferro', rarity: 'epica', emoji: '🌠' },
  { id: 'skin-sombra-real', name: 'Sombra Real', charId: 'sombra-kex', rarity: 'mitica', emoji: '👑' },
  { id: 'skin-cristal-lunar', name: 'Cristal Lunar', charId: 'estelar-nova', rarity: 'rara', emoji: '🔮' },
  { id: 'skin-dorado-imperial', name: 'Dorado Imperial', charId: 'curandera-bibi', rarity: 'legendaria', emoji: '🏆' },
  { id: 'skin-pixel-retro', name: 'Pixel Retro', charId: 'chispa-voltia', rarity: 'comun', emoji: '🕹️' },
  { id: 'skin-tormenta-electrica', name: 'Tormenta Eléctrica', charId: 'trueno-rax', rarity: 'epica', emoji: '🌪️' },
  { id: 'skin-selva-mistica', name: 'Selva Mística', charId: 'brisa-nix', rarity: 'comun', emoji: '🌴' },
  { id: 'skin-robot-galactico', name: 'Robot Galáctico', charId: 'muralla-don', rarity: 'rara', emoji: '🤖' },
  { id: 'skin-fantasma-estelar', name: 'Fantasma Estelar', charId: 'puno-rok', rarity: 'mitica', emoji: '👻' },
  { id: 'skin-arcoiris-prisma', name: 'Arcoíris Prisma', charId: 'rayo-fenn', rarity: 'legendaria', emoji: '🌈' },
  { id: 'skin-magma-ardiente', name: 'Magma Ardiente', charId: 'cometa-zoe', rarity: 'epica', emoji: '🌋' }
];

/* ---------- Datos: gotas (tiers) ---------- */
const DROP_TIERS = [
  {
    id: 'normal', name: 'Gota Normal', cost: 10, emoji: '💧',
    odds: { comun: 55, rara: 30, epica: 12, mitica: 2.5, legendaria: 0.5 }
  },
  {
    id: 'grande', name: 'Gota Grande', cost: 25, emoji: '🌊',
    odds: { comun: 35, rara: 35, epica: 20, mitica: 8, legendaria: 2 }
  },
  {
    id: 'mega', name: 'Gota Mega', cost: 60, emoji: '💎',
    odds: { comun: 15, rara: 30, epica: 30, mitica: 18, legendaria: 7 }
  },
  {
    id: 'especial', name: 'Gota Especial', cost: 120, emoji: '🌟',
    odds: { comun: 5, rara: 15, epica: 30, mitica: 30, legendaria: 20 }
  }
];

/* ---------- Odds de tipo de recompensa según rareza ---------- */
const TYPE_ODDS_BY_RARITY = {
  comun: { monedas: 50, poder: 30, gadget: 15, skin: 4, personaje: 1 },
  rara: { monedas: 40, poder: 25, gadget: 15, skin: 12, personaje: 8 },
  epica: { monedas: 25, poder: 20, gadget: 10, skin: 25, personaje: 20 },
  mitica: { monedas: 15, poder: 10, gadget: 5, skin: 30, personaje: 40 },
  legendaria: { monedas: 10, poder: 5, gadget: 5, skin: 35, personaje: 45 }
};

const COIN_RANGE = {
  comun: [50, 100], rara: [100, 200], epica: [250, 400], mitica: [500, 800], legendaria: [1000, 2000]
};
const POWER_RANGE = {
  comun: [10, 25], rara: [25, 50], epica: [60, 100], mitica: [120, 200], legendaria: [250, 400]
};
const GADGET_RANGE = {
  comun: [1, 2], rara: [2, 3], epica: [3, 5], mitica: [5, 8], legendaria: [10, 15]
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

  if (reward.rarity === 'legendaria') {
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
    case 'personaje': return `Nuevo personaje: ${reward.character.name}`;
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
    case 'personaje': return `${reward.character.name} · Tipo: ${reward.character.type}`;
    case 'skin': {
      const char = CHARACTERS.find(c => c.id === reward.skin.charId);
      return `Skin para ${char ? char.name : 'personaje'}`;
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

    card.innerHTML = `
      <div class="char-icon">${unlocked ? c.emoji : '❓'}</div>
      <div class="char-name">${unlocked ? c.name : '???'}</div>
      <div class="char-type">${unlocked ? ('Tipo: ' + c.type) : 'Bloqueado'}</div>
      <span class="rarity-tag rarity-${c.rarity}">${RARITY_LABEL[c.rarity]}</span>
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
    revealNew.textContent = reward.type === 'personaje' ? '¡Nuevo personaje desbloqueado!' : '¡Nueva skin desbloqueada!';
  } else {
    revealNew.hidden = true;
  }

  revealOverlay.hidden = false;
}

function getRarityColor(rarity) {
  const map = {
    comun: '#8fd6a8', rara: '#4db8ff', epica: '#b479ff', mitica: '#ff5fb8', legendaria: '#ffb43f'
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
