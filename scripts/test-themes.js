const test = require('node:test');
const assert = require('node:assert/strict');
const { getTheme, getThemes, isThemeId } = require('../src/lib/builtInThemes');
const { saveThemePreference } = require('../src/services/themePreferences');

test('registry contains the requested distinct themes and safe fallback', () => {
  const all = getThemes();
  assert.equal(all.length, 9); 
  assert.equal(new Set(all.map((theme) => theme.id)).size, all.length);
  for (const id of ['midnight', 'amoled-black', 'cyberpunk', 'ocean', 'forest', 'sunset', 'arctic-light', 'minimal-light']) {
    assert.ok(isThemeId(id), `${id} is registered`);
  }
  assert.equal(getTheme('retired-theme').id, 'default');
  assert.equal(getTheme('arctic-light').mode, 'light');
  assert.equal(getTheme('midnight').mode, 'dark');
});

test('preference persistence validates ID and scopes update to the authenticated user ID', async () => {
  const calls = [];
  const users = { updateOne: async (...args) => { calls.push(args); return { matchedCount: 1 }; } };
  assert.equal(await saveThemePreference(users, 42, 'ocean'), 'ocean');
  assert.deepEqual(calls[0][0], { id: 42 });
  assert.equal(calls[0][1].$set.theme, 'ocean');
  assert.ok(calls[0][1].$set.updated_at);
  await assert.rejects(saveThemePreference(users, 42, 'url(https://invalid)'), /Unsupported theme/);
  await assert.rejects(saveThemePreference(users, 'not-a-user', 'ocean'), /Invalid user/);
  assert.equal(calls.length, 1);
});

test('preference save reports deleted or missing users', async () => {
  const users = { updateOne: async () => ({ matchedCount: 0 }) };
  await assert.rejects(saveThemePreference(users, 42, 'midnight'), /User not found/);
});
