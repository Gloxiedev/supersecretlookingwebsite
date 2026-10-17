

const themes = [
  { id: 'default', name: 'Default', mode: 'dark', description: 'Keep the current panel appearance.', colors: ['#050505', '#121212', '#b15f2c', '#d4d4d4'] },
  { id: 'midnight', name: 'Midnight', mode: 'dark', description: 'Premium slate with quiet blue accents.', colors: ['#101722', '#192331', '#6e9eff', '#e7edf6'] },
  { id: 'amoled-black', name: 'AMOLED Black', mode: 'dark', description: 'Deep black canvas with precise OLED surfaces.', colors: ['#000000', '#0b0d10', '#8ab4ff', '#edf1f7'] },
  { id: 'cyberpunk', name: 'Cyberpunk', mode: 'dark', description: 'Graphite foundations with considered cyan and magenta.', colors: ['#11121b', '#1b1c28', '#50d9e8', '#f079c8'] },
  { id: 'ocean', name: 'Ocean', mode: 'dark', description: 'Calm navy surfaces and clear teal accents.', colors: ['#0d1b24', '#142832', '#55c6bd', '#e0eeef'] },
  { id: 'forest', name: 'Forest', mode: 'dark', description: 'Natural evergreen tones, composed for long sessions.', colors: ['#111a17', '#1a2922', '#8fc59d', '#e5eee8'] },
  { id: 'sunset', name: 'Sunset', mode: 'dark', description: 'Warm amber and coral with a restrained violet note.', colors: ['#1b1719', '#292124', '#f2aa70', '#f0e8e8'] },
  { id: 'arctic-light', name: 'Arctic Light', mode: 'light', description: 'Crisp cool neutrals with a clean blue accent.', colors: ['#f1f5f9', '#ffffff', '#3977d5', '#172536'] },
  { id: 'minimal-light', name: 'Minimal Light', mode: 'light', description: 'Quiet white surfaces, soft borders, minimal noise.', colors: ['#f5f5f4', '#ffffff', '#56677d', '#20242a'] },
];

const byId = new Map(themes.map((theme) => [theme.id, Object.freeze(theme)]));
function isThemeId(id) { return typeof id === 'string' && byId.has(id); }
function getTheme(id) { return byId.get(id) || byId.get('default'); }
function getThemes() { return themes.map((theme) => ({ ...theme })); }

module.exports = { getTheme, getThemes, isThemeId };
