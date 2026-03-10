/* ============================================================
   BROWSER GAME – game.js
   Game state, canvas, game loop, HUD, inventory, navigation,
   and logout logic.  Must be loaded before auth.js.
   ============================================================ */

'use strict';

// ---------------------------------------------------------------------------
// CONFIG  (placeholder – replace with real values when backend is ready)
// ---------------------------------------------------------------------------
const CONFIG = {
  API_BASE_URL: '', // e.g. 'https://api.example.com'
  AUTH_TOKEN_KEY: 'bg_auth_token',
};

// ---------------------------------------------------------------------------
// GAME STATE
// ---------------------------------------------------------------------------
let gameState = {
  player: null,    // { username, level, hp, maxHp, exp, gold, crystals }
  inventory: [],   // array of item objects
  isRunning: false,
};

// ---------------------------------------------------------------------------
// CANVAS SETUP
// ---------------------------------------------------------------------------
const canvas = document.getElementById('game-canvas');
const ctx    = canvas.getContext('2d');

function resizeCanvas() {
  const area = document.getElementById('game-content');
  if (!area) return;
  canvas.width  = area.clientWidth;
  canvas.height = area.clientHeight;
}

window.addEventListener('resize', resizeCanvas);

// ---------------------------------------------------------------------------
// GAME LOOP  (placeholder – renders a blank frame until game logic is added)
// ---------------------------------------------------------------------------
function gameLoop() {
  if (!gameState.isRunning) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // TODO: render game world
  // TODO: render player
  // TODO: render enemies
  // TODO: render UI overlays

  requestAnimationFrame(gameLoop);
}

// ---------------------------------------------------------------------------
// AUTH HELPERS
// ---------------------------------------------------------------------------
function logout() {
  localStorage.removeItem(CONFIG.AUTH_TOKEN_KEY);
  gameState.isRunning = false;
  gameState.player    = null;
  gameState.inventory = [];
  showScreen('screen-login');
}

// ---------------------------------------------------------------------------
// INVENTORY HELPERS  (stubs – replace with real API calls)
// ---------------------------------------------------------------------------
async function loadInventory(/* username – will become userId once backend is ready */) {
  // TODO: GET CONFIG.API_BASE_URL + '/inventory/:userId'
  return []; // placeholder: empty inventory
}

function renderInventory() {
  const list = document.getElementById('inventory-list');
  if (!list) return;
  list.innerHTML = '';
  gameState.inventory.forEach(item => {
    const li       = document.createElement('li');
    li.textContent = item.name ?? 'Unknown item';
    list.appendChild(li);
  });
}

// ---------------------------------------------------------------------------
// UI HELPERS
// ---------------------------------------------------------------------------
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active');
    s.hidden = id !== s.id;
  });
  const target = document.getElementById(id);
  if (target) {
    target.hidden = false;
    target.classList.add('active');
  }
}

function updateHUD() {
  const p = gameState.player;
  if (!p) return;
  const set = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };
  set('hud-username',    p.username);
  set('hud-level-value', p.level);
  set('hud-hp',          `${p.hp}/${p.maxHp}`);
  set('hud-exp',         p.exp);
  set('hud-gold',        p.gold     ?? 0);
  set('hud-crystals',    p.crystals ?? 0);

  // Update HP bar width
  const hpBar = document.getElementById('bar-hp');
  if (hpBar) hpBar.style.width = `${(p.hp / p.maxHp) * 100}%`;
}

// ---------------------------------------------------------------------------
// NAVIGATION
// ---------------------------------------------------------------------------
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    // TODO: load section content for item.dataset.section
  });
});

// ---------------------------------------------------------------------------
// EVENT LISTENERS
// ---------------------------------------------------------------------------
document.getElementById('btn-logout').addEventListener('click', logout);

// ---------------------------------------------------------------------------
// INIT
// ---------------------------------------------------------------------------
showScreen('screen-login');
