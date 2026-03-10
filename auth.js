/* ============================================================
   BROWSER GAME – auth.js
   Authentication logic: login helpers + form event listener.
   Depends on game.js being loaded first (uses CONFIG, gameState,
   showScreen, updateHUD, renderInventory, resizeCanvas, gameLoop,
   loadInventory).
   ============================================================ */

'use strict';

// ---------------------------------------------------------------------------
// AUTH HELPERS  (stubs – replace with real API calls)
// ---------------------------------------------------------------------------

/**
 * Authenticate the user.
 * TODO: replace stub with a real POST to CONFIG.API_BASE_URL + '/auth/login'
 * @param {string} username
 * @param {string} password
 * @returns {Promise<{username:string, level:number, hp:number, maxHp:number, exp:number, gold:number, crystals:number}>}
 */
async function login(username, password) {
  if (!username || !password) {
    throw new Error('Username and password are required.');
  }
  // Placeholder: accept any non-empty credentials during development
  return { username, level: 1, hp: 100, maxHp: 100, exp: 0, gold: 250, crystals: 10 };
}

// ---------------------------------------------------------------------------
// LOGIN FORM EVENT LISTENER
// ---------------------------------------------------------------------------
document.getElementById('form-login').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('input-username').value.trim();
  const password = document.getElementById('input-password').value;
  const errorEl  = document.getElementById('login-error');
  errorEl.hidden = true;

  try {
    const player = await login(username, password);
    gameState.player    = player;
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
