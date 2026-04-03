/* ═══════════════════════════════════════════
   THE SOCIAL SPOT — admin.js
   Admin Console Logic
═══════════════════════════════════════════ */

const ADMIN_PASSWORD = 'admin123';
let adminUnlocked = false;

function checkAdminPassword() {
  const pw = document.getElementById('adminPwInput')?.value;
  if (pw === ADMIN_PASSWORD) {
    adminUnlocked = true;
    document.getElementById('adminLockOverlay').style.display = 'none';
    document.getElementById('adminContent').style.display = 'block';
    adminLog('info', 'Admin console unlocked');
    refreshAdminStats();
    renderAdminLog();
  } else {
    const err = document.getElementById('adminPwError');
    if (err) { err.textContent = '⚠ Incorrect password'; err.style.display = 'block'; }
    adminLog('warn', 'Failed admin login attempt');
  }
}

// Called from Account Info page — opens admin in new tab or redirects
function openAdminConsole() {
  window.location.href = 'admin.html';
}

function refreshAdminStats() {
  if (!adminUnlocked) return;

  // Storage usage
  let storageUsed = 0;
  try {
    for (const key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        storageUsed += (localStorage[key].length + key.length) * 2;
      }
    }
  } catch(e) {}
  const setTxt = (id, v) => { const el = document.getElementById(id); if(el) el.textContent = v; };
  setTxt('admin_storage', (storageUsed / 1024).toFixed(1) + ' KB');
  setTxt('admin_theme', currentTheme || '—');
  setTxt('admin_font', currentFont || '—');
  setTxt('admin_layout', currentLayout || '—');
  setTxt('admin_user', currentUser || 'Not logged in');
  setTxt('admin_version', '1.0.0');
  setTxt('admin_videos', Object.keys(trackingDataObj || {}).length);
  setTxt('admin_entries', Object.values(trackingDataObj || {}).reduce((s,a)=>s+a.length,0));
  setTxt('admin_trackers', (typeof liveTrackers !== 'undefined' ? liveTrackers.length : 0));
  setTxt('admin_logs', adminLogs.length);
  adminLog('info', 'Admin stats refreshed');
}

function adminClearStorage() {
  if (!adminUnlocked) return;
  if (confirm('Clear ALL local storage? This will log out and reset everything.')) {
    localStorage.clear();
    adminLog('warn', 'Storage cleared by admin');
    showToast('🗑 Storage cleared');
    setTimeout(() => location.reload(), 1500);
  }
}
function adminClearTrackerData() {
  if (!adminUnlocked) return;
  if (confirm('Clear all video tracker data?')) {
    trackingDataObj = { "Default Video": [] };
    saveTrackerData();
    adminLog('warn', 'Video tracker data cleared by admin');
    showToast('🗑 Tracker data cleared');
    refreshAdminStats();
  }
}
function adminClearLogs() {
  if (!adminUnlocked) return;
  adminLogs.length = 0;
  renderAdminLog();
  showToast('🗑 Logs cleared');
}
function adminExportLogs() {
  if (!adminUnlocked) return;
  const blob = new Blob([JSON.stringify(adminLogs, null, 2)], {type:'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `ss_admin_logs_${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  adminLog('info', 'Admin logs exported');
}
function adminResetTheme() {
  if (!adminUnlocked) return;
  applyTheme('clean-dark');
  applyFont('inter');
  applyLayout('intermediate', null);
  showToast('✅ Theme/Font/Layout reset to defaults');
  adminLog('info', 'Theme reset to defaults');
}
function adminForceLogout() {
  if (!adminUnlocked) return;
  if (confirm('Force logout and clear session?')) {
    localStorage.removeItem('ss_user');
    adminLog('warn', 'Forced logout by admin');
    setTimeout(() => location.reload(), 500);
  }
}
function adminSetLayout(layout) {
  if (!adminUnlocked) return;
  applyLayout(layout, null);
  refreshAdminStats();
  showToast(`✅ Layout set to ${layout}`);
}
function adminSetTheme(theme) {
  if (!adminUnlocked) return;
  applyTheme(theme);
  refreshAdminStats();
}
function adminDownloadFullDump() {
  if (!adminUnlocked) return;
  const dump = {
    timestamp: new Date().toISOString(),
    user: currentUser,
    theme: currentTheme, font: currentFont, layout: currentLayout,
    trackerData: trackingDataObj,
    logs: adminLogs,
    localStorage: {}
  };
  try { for (const k in localStorage) { if(localStorage.hasOwnProperty(k)) dump.localStorage[k]=localStorage[k]; } } catch(e) {}
  const blob = new Blob([JSON.stringify(dump, null, 2)], {type:'application/json'});
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
  a.download = `ss_full_dump_${new Date().toISOString().slice(0,10)}.json`; a.click();
  adminLog('info', 'Full data dump exported by admin');
}
