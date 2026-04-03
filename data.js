/* ═══════════════════════════════════════════
   THE SOCIAL SPOT — data.js
   Save / Load / State Management
═══════════════════════════════════════════ */

let currentUser = null;
let trackingDataObj = { "Default Video": [] };
let currentVideoKey = "Default Video";

/* ─── TOAST ─── */
function showToast(msg) {
  const t = document.getElementById('toastEl');
  if (!t) return;
  t.textContent = msg; t.style.opacity = '1';
  clearTimeout(t._tt);
  t._tt = setTimeout(() => t.style.opacity = '0', 2800);
}

/* ─── BUILD SAVE PAYLOAD ─── */
function buildSavePayload() {
  const acctFields = ['ai_name','ai_username','ai_email','ai_password',
                      'ai_yt_link','ai_tt_link','ai_ig_link','ai_other_link','ai_bio'];
  const acctData = {};
  acctFields.forEach(f => { const el=document.getElementById(f); if(el) acctData[f]=el.value; });

  return {
    version: '1.0.0',
    savedAt: new Date().toISOString(),
    creator: currentUser,
    theme: currentTheme,
    font: currentFont,
    layout: currentLayout,
    trackerData: trackingDataObj,
    accountInfo: acctData,
    apiKeys: {
      ytApiKey: document.getElementById('yt_api_key')?.value || '',
      ytVideoIds: document.getElementById('yt_video_ids')?.value || '',
    }
  };
}

/* ─── SAVE SESSION ─── */
function saveFullSession() {
  const payload = buildSavePayload();
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  const safe = (currentUser||'session').replace(/[^a-z0-9]/gi,'_').toLowerCase();
  a.download = `social_spot_${safe}_${new Date().toISOString().slice(0,10)}.vcsave`;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(a.href);
  // Log to admin
  adminLog('info', `Session saved by ${currentUser}`);
  showToast('💾 Session saved!');
}

/* ─── LOAD FROM FILE ─── */
function loadFromFile(evt, onDone) {
  const file = evt.target.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const d = JSON.parse(e.target.result);
      currentUser = d.creator || 'Creator';
      if (d.theme)  applyTheme(d.theme, true);
      if (d.font)   applyFont(d.font, true);
      if (d.layout) applyLayout(d.layout, null);
      if (d.trackerData && typeof d.trackerData === 'object') {
        trackingDataObj = d.trackerData;
        try { localStorage.setItem('ss_tracker', JSON.stringify(trackingDataObj)); } catch(e) {}
      }
      if (d.accountInfo) restoreAccountInfo(d.accountInfo);
      if (d.apiKeys?.ytApiKey) {
        try { localStorage.setItem('ss_ytkey', d.apiKeys.ytApiKey); } catch(e) {}
        const el = document.getElementById('yt_api_key'); if(el) el.value = d.apiKeys.ytApiKey;
        const el2 = document.getElementById('cmp_api_key'); if(el2) el2.value = d.apiKeys.ytApiKey;
      }
      try { localStorage.setItem('ss_user', currentUser); } catch(e) {}
      adminLog('info', `Session loaded from file`);
      if (typeof onDone === 'function') onDone();
      showToast('✅ Session loaded!');
    } catch(err) { alert('Could not read save file.'); }
  };
  reader.readAsText(file);
  evt.target.value = '';
}

/* ─── TRACKER PERSISTENCE ─── */
function saveTrackerData() {
  try { localStorage.setItem('ss_tracker', JSON.stringify(trackingDataObj)); } catch(e) {}
}
function loadTrackerData() {
  const raw = localStorage.getItem('ss_tracker');
  if (raw) { try { trackingDataObj = JSON.parse(raw); } catch(e) {} }
}

/* ─── ACCOUNT INFO ─── */
function saveAccountInfo() {
  const fields = ['ai_name','ai_username','ai_email','ai_password',
                  'ai_yt_link','ai_tt_link','ai_ig_link','ai_other_link','ai_bio'];
  const data = {};
  fields.forEach(f => { const el=document.getElementById(f); if(el) data[f]=el.value; });
  try { localStorage.setItem('ss_account', JSON.stringify(data)); } catch(e) {}
  updateQuickLinks();
}
function loadAccountInfo() {
  const raw = localStorage.getItem('ss_account'); if (!raw) return;
  try {
    const d = JSON.parse(raw);
    Object.entries(d).forEach(([k,v]) => { const el=document.getElementById(k); if(el) el.value=v; });
    updateQuickLinks();
  } catch(e) {}
}
function restoreAccountInfo(data) {
  if (!data) return;
  Object.entries(data).forEach(([k,v]) => { const el=document.getElementById(k); if(el) el.value=v; });
  try { localStorage.setItem('ss_account', JSON.stringify(data)); } catch(e) {}
  updateQuickLinks();
}
function clearAccountInfo() {
  if (!confirm('Clear all profile data?')) return;
  ['ai_name','ai_username','ai_email','ai_password','ai_yt_link',
   'ai_tt_link','ai_ig_link','ai_other_link','ai_bio'].forEach(id => {
    const el=document.getElementById(id); if(el) el.value='';
  });
  localStorage.removeItem('ss_account');
  updateQuickLinks();
}
function updateQuickLinks() {
  const links = [
    {id:'ai_yt_link',  label:'▶ YouTube',   color:'var(--danger)'},
    {id:'ai_tt_link',  label:'♪ TikTok',    color:'var(--secondary)'},
    {id:'ai_ig_link',  label:'📷 Instagram', color:'var(--accent)'},
    {id:'ai_other_link',label:'🔗 Other',    color:'var(--primary)'},
  ];
  const container = document.getElementById('ai_quick_links'); if (!container) return;
  const avail = links.filter(l => { const el=document.getElementById(l.id); return el&&el.value.startsWith('http'); });
  if (!avail.length) { container.innerHTML='<div style="font-size:11px;color:var(--text-muted);padding:10px;">No links saved yet.</div>'; return; }
  container.innerHTML = avail.map(l => {
    const url = document.getElementById(l.id).value;
    return `<a href="${url}" target="_blank" style="display:flex;align-items:center;justify-content:center;gap:5px;padding:10px;background:var(--card2);border:1px solid ${l.color};border-radius:var(--radius);color:${l.color};font-size:12px;font-weight:600;">${l.label}</a>`;
  }).join('');
}

/* ─── API KEY ─── */
function saveAPIKey() {
  try {
    localStorage.setItem('ss_ytkey', document.getElementById('yt_api_key')?.value||'');
    localStorage.setItem('ss_ytids', document.getElementById('yt_video_ids')?.value||'');
  } catch(e) {}
}
function loadAPIKey() {
  const k=localStorage.getItem('ss_ytkey'); const v=localStorage.getItem('ss_ytids');
  if(k && document.getElementById('yt_api_key')) document.getElementById('yt_api_key').value=k;
  if(v && document.getElementById('yt_video_ids')) document.getElementById('yt_video_ids').value=v;
  const c=document.getElementById('cmp_api_key'); if(c&&k&&!c.value) c.value=k;
}

/* ─── ADMIN LOG ─── */
const adminLogs = [];
function adminLog(level, msg) {
  const entry = { time: new Date().toLocaleTimeString(), level, msg };
  adminLogs.push(entry);
  if (adminLogs.length > 100) adminLogs.shift();
  // Update admin log display if visible
  renderAdminLog();
}
function renderAdminLog() {
  const el = document.getElementById('admin_log_output'); if (!el) return;
  el.innerHTML = adminLogs.slice().reverse().map(e =>
    `<span class="log-entry ${e.level}"><span class="time">[${e.time}]</span><span class="msg">${e.msg}</span></span>`
  ).join('');
}
