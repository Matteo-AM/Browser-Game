/* ============================================================
   BROWSER GAME – main.js
   Placeholder scaffold. Game logic will be added in later phases.
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
  player: null,      // { username, level, hp, exp }
  inventory: [],     // array of item objects
  isRunning: false,
};

// ---------------------------------------------------------------------------
// CANVAS SETUP
// ---------------------------------------------------------------------------
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  const area = document.getElementById('game-area');
  if (!area) return;
  canvas.width = area.clientWidth;
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
// AUTH HELPERS  (stubs – replace with real API calls)
// ---------------------------------------------------------------------------
async function login(username, password) {
  // TODO: call CONFIG.API_BASE_URL + '/auth/login'
  // Placeholder: accept any non-empty credentials during development
  if (!username || !password) {
    throw new Error('Username and password are required.');
  }
  return { username, level: 1, hp: 100, exp: 0 };
}

function logout() {
  localStorage.removeItem(CONFIG.AUTH_TOKEN_KEY);
  gameState.isRunning = false;
  gameState.player = null;
  gameState.inventory = [];
  showScreen('screen-login');
}

// ---------------------------------------------------------------------------
// INVENTORY HELPERS  (stubs – replace with real API calls)
// ---------------------------------------------------------------------------
async function loadInventory(/* userId */) {
  // TODO: GET CONFIG.API_BASE_URL + '/inventory/:userId'
  return []; // placeholder: empty inventory
}

function renderInventory() {
  const list = document.getElementById('inventory-list');
  if (!list) return;
  list.innerHTML = '';
  gameState.inventory.forEach(item => {
    const li = document.createElement('li');
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
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set('hud-username', p.username);
  set('hud-level-value', p.level);
  set('hud-hp', p.hp);
  set('hud-exp', p.exp);
}

// ---------------------------------------------------------------------------
// EVENT LISTENERS
// ---------------------------------------------------------------------------
document.getElementById('form-login').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('input-username').value.trim();
  const password = document.getElementById('input-password').value;
  const errorEl = document.getElementById('login-error');
  errorEl.hidden = true;

  try {
    const player = await login(username, password);
    gameState.player = player;
    gameState.inventory = await loadInventory(player.username);
    gameState.isRunning = true;

    updateHUD();
    renderInventory();
    showScreen('screen-game');
    resizeCanvas();
    requestAnimationFrame(gameLoop);
  } catch (err) {
    console.error('[login] Authentication failed:', err);
    errorEl.hidden = false;
  }
});

document.getElementById('btn-logout').addEventListener('click', logout);

// ---------------------------------------------------------------------------
// INIT
// ---------------------------------------------------------------------------
showScreen('screen-login');

