/* ═══════════════════════════════════════════
   THE SOCIAL SPOT — theme.js
   Theme / Font / Layout Management
═══════════════════════════════════════════ */

const THEMES = [
  { id:'clean-dark', name:'Clean Dark',  sub:'Default indigo',      bg:'#16161e', dots:['#6366f1','#22d3ee','#f472b6'] },
  { id:'yt-red',     name:'YT Red',      sub:'YouTube-inspired',     bg:'#1c0000', dots:['#ff0000','#ff6b6b','#ffaa00'] },
  { id:'light',      name:'Light',       sub:'Clean white',          bg:'#f8fafc', dots:['#4f46e5','#0891b2','#db2777'] },
  { id:'cyber',      name:'Cyber Neon',  sub:'Electric teal',        bg:'#000d1a', dots:['#00f5ff','#00ff88','#bf5fff'] },
  { id:'sunset',     name:'Sunset',      sub:'Warm amber & coral',   bg:'#1e1008', dots:['#ff8c42','#ffd166','#ff6b6b'] },
  { id:'ocean',      name:'Ocean',       sub:'Deep bioluminescent',  bg:'#071628', dots:['#00d4e8','#06b6d4','#818cf8'] },
  { id:'forest',     name:'Forest',      sub:'Earthy greens',        bg:'#0b160c', dots:['#4ade80','#86efac','#fde047'] },
  { id:'rose',       name:'Rose Gold',   sub:'Pink luxury',          bg:'#211018', dots:['#f9a8c9','#fbbf24','#c084fc'] },
  { id:'slate',      name:'Slate',       sub:'Pro grey + orange',    bg:'#18181f', dots:['#fb923c','#94a3b8','#60a5fa'] },
  { id:'matrix',     name:'Matrix',      sub:'Terminal green',       bg:'#020e02', dots:['#00ff41','#00cc33','#ccff00'] },
  { id:'midnight',   name:'Midnight',    sub:'Deep purple',          bg:'#12121c', dots:['#a78bfa','#34d399','#fb7185'] },
];

const FONTS = [
  { id:'inter',       name:'Inter',       sub:'Clean sans-serif',      preview:'Inter' },
  { id:'space',       name:'Space',       sub:'Space Grotesk',         preview:'Space Grotesk' },
  { id:'syne',        name:'Syne',        sub:'Bold editorial',        preview:'Syne' },
  { id:'bricolage',   name:'Bricolage',   sub:'Expressive variable',   preview:'Bricolage Grotesque' },
  { id:'mono',        name:'Mono',        sub:'Geist Mono code',       preview:'Geist Mono' },
  { id:'instrument',  name:'Serif',       sub:'Instrument Serif',      preview:'Instrument Serif' },
];

let currentTheme  = localStorage.getItem('ss_theme')  || 'clean-dark';
let currentFont   = localStorage.getItem('ss_font')   || 'inter';
let currentLayout = localStorage.getItem('ss_layout') || 'intermediate';

function applyTheme(id, skipSave) {
  currentTheme = id;
  document.documentElement.setAttribute('data-theme', id);
  document.querySelectorAll('.picker-item[data-theme-id]').forEach(el =>
    el.classList.toggle('selected', el.dataset.themeId === id)
  );
  if (!skipSave) {
    try { localStorage.setItem('ss_theme', id); } catch(e) {}
    if (typeof showToast === 'function') showToast('🎨 Theme applied!');
  }
}

function applyFont(id, skipSave) {
  currentFont = id;
  document.documentElement.setAttribute('data-font', id);
  document.querySelectorAll('.picker-item[data-font-id]').forEach(el =>
    el.classList.toggle('selected', el.dataset.fontId === id)
  );
  if (!skipSave) {
    try { localStorage.setItem('ss_font', id); } catch(e) {}
  }
}

function applyLayout(id, el) {
  currentLayout = id;
  document.documentElement.setAttribute('data-layout', id);
  document.querySelectorAll('.layout-item').forEach(i => i.classList.remove('selected'));
  if (el) el.classList.add('selected');
  else document.querySelector(`[data-layout="${id}"]`)?.classList.add('selected');
  try { localStorage.setItem('ss_layout', id); } catch(e) {}
}

function renderThemePicker(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = THEMES.map(t => `
    <div class="picker-item${t.id===currentTheme?' selected':''}"
         data-theme-id="${t.id}" onclick="applyTheme('${t.id}')"
         style="background:${t.bg};">
      <div class="picker-dots">${t.dots.map(d=>`<div class="picker-dot" style="background:${d}"></div>`).join('')}</div>
      <div class="picker-name" style="color:${t.dots[0]}">${t.name}</div>
      <div class="picker-sub">${t.sub}</div>
      <div class="picker-check">✔</div>
    </div>`).join('');
}

function renderFontPicker(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = FONTS.map(f => `
    <div class="picker-item${f.id===currentFont?' selected':''}"
         data-font-id="${f.id}" onclick="applyFont('${f.id}')"
         style="background:var(--card);">
      <div style="font-family:'${f.preview}',sans-serif;font-size:20px;font-weight:700;color:var(--primary);margin-bottom:5px;">Aa</div>
      <div class="picker-name">${f.name}</div>
      <div class="picker-sub">${f.sub}</div>
      <div class="picker-check">✔</div>
    </div>`).join('');
}

// Init themes on page load immediately to avoid flash
(function(){
  const t = localStorage.getItem('ss_theme') || 'clean-dark';
  const f = localStorage.getItem('ss_font')  || 'inter';
  const l = localStorage.getItem('ss_layout')|| 'intermediate';
  document.documentElement.setAttribute('data-theme', t);
  document.documentElement.setAttribute('data-font', f);
  document.documentElement.setAttribute('data-layout', l);
})();
