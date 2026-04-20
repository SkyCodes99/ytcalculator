/* ═══════════════════════════════════════════════════════════════════
   THE SOCIAL SPOT — core.js
   State, session management, video profiles, section visibility,
   data save/load, tracker data, API key, unsaved-changes guard.
   Loaded first; all other modules depend on these globals.
═══════════════════════════════════════════════════════════════════ */

'use strict';

/* ─── Global state ─── */
let currentUser       = null;
let trackingDataObj   = { 'Default Video': [] };
let currentVideoKey   = 'Default Video';
let currentTheme      = localStorage.getItem('ccTheme')  || 'default';
let currentFont       = localStorage.getItem('ccFont')   || 'inter';
let currentBg         = localStorage.getItem('ccBg')     || 'none';
let currentTextSize   = localStorage.getItem('ccTextSize')|| 'md';
let currentLayout     = localStorage.getItem('ccLayout') || 'default';
let hasUnsavedChanges = false;
let allowClose        = false;
let videoProfiles     = { 'Video 1': {} };
let currentProfile    = 'Video 1';
let sectionVisibility = {};
let activePlatforms   = ['youtube'];
let liveTrackers      = [];
let liveTimerInterval = null;
let liveCountdown     = 10;
let abSavedTests      = JSON.parse(localStorage.getItem('ccABTests') || '[]');
let bgAnimFrame       = null;
let adminUnlocked     = false;
let _fieldTimestamps  = {};
let _fieldTimers      = {};

/* ─── Constants ─── */
const VP_FIELDS = [
  'viewsInput','likesInput','commentsInput','ctrNum','ctr','ret','retNum',
  'viewVelocity','impressionsInput','viewsCurrent','snap3_hours',
  'vlMins','vlSecs','twMins','twSecs','engInput',
  'dt_month','dt_day','dt_year','dt_hour','dt_minute','dt_ampm',
  'views24h','snap1_hours','views48h','snap2_hours',
  'midRetention','endRetention','cardCtr','rewatchRate',
  'channelSubs','avgViewsPerUpload','subsGained','nonSubViewPct',
];

const SCORE_PHASES = [
  { label:'⛔ Struggling',      min:0,  max:24,  color:'#f87171' },
  { label:'🔧 Needs Work',      min:25, max:44,  color:'#fb923c' },
  { label:'📈 Growing',         min:45, max:59,  color:'#fbbf24' },
  { label:'💪 Strong Growth',   min:60, max:74,  color:'#4ade80' },
  { label:'🚀 Viral Potential', min:75, max:89,  color:'#22d3ee' },
  { label:'🔥 Viral Breakout',  min:90, max:100, color:'#bf5fff' },
];

const SV_ALL_IDS = [
  'sv_fluff','sv_t1_pubhub','sv_t1_avd','sv_t1_ctr','sv_t1_hook','sv_t1_engagement',
  'sv_t1_channel','sv_t1_ret_detail','sv_t1_stall','sv_t1_score','sv_t1_breakdown',
  'sv_t1_scenarios','sv_t1_insight','sv_t1_algo','sv_t2_inputs','sv_t2_tier',
  'sv_t2_benchmarks','sv_t3_quickentry','sv_t3_eta','sv_t3_detailed','sv_t3_summary',
  'sv_t3_planner','sv_t4_lf','sv_t4_shorts','sv_t4_bench','sv_t4_roi',
  'sv_soc_switcher','sv_soc_tt_panel','sv_soc_ig_panel','sv_t7_inputs',
  'sv_t7_schedule_type','sv_t7_schedule_result','sv_t7_windows','sv_t7_checklist',
  'sv_t7_optimizer','sv_cp_t1','sv_cp_t2','sv_cp_t3','sv_cp_income','sv_vid_tracker',
  'sv_tab_ab_setup','sv_tab_ab_results','sv_tab_ab_history','sv_tab_ab_tip',
  'sv_cmp_lookup','sv_cmp_manual','sv_cmp_results','sv_live_add',
  'sv_hook_inputs','sv_hook_results','sv_hook_tip','sv_seo_t1','sv_seo_t2',
  'sv_rc_inputs','sv_rc_guide','sv_es_inputs','sv_es_cards','sv_es_rules',
  'sv_seo_t1_res','sv_seo_t2_res','sv_soc_tt_bands','sv_soc_ig_bands',
  'sv_soc_tt_score','sv_soc_tt_tiers','sv_soc_tt_proj','sv_soc_ig_score',
  'sv_soc_ig_tiers','sv_soc_ig_proj','sv_t1_vp_bar','sv_t3_progress',
];

const ALL_SAVE_FIELDS = [
  'viewVelocity','impressionsInput','vlMins','vlSecs','twMins','twSecs',
  'newVideoToggle','viewsInput','likesInput','commentsInput',
  'channelSubs','avgViewsPerUpload','subsGained','nonSubViewPct',
  'midRetention','endRetention','cardCtr','rewatchRate',
  'views24h','snap1_hours','views48h','snap2_hours','viewsCurrent','snap3_hours',
  'ctrNum','retNum','t2_vlMins','t2_vlSecs','t2_ctr','t2_avd','t2_views','t2_subs',
  'gp_avd','gp_earned','gp_stream_hrs','gp_stream_viewers','gp_months',
  'c_views_min','c_views_max','c_rpm_minNum','c_rpm_maxNum','c_view_type',
  'cs_views_min','cs_views_max','cs_rpm','cs_niche',
  'roi_shorts_views','roi_shorts_time','roi_shorts_follow',
  'roi_lf_views','roi_lf_time','roi_lf_follow','roi_lf_avd','roi_rpm',
  'tt_views','tt_likes','tt_comments','tt_shares','tt_length','tt_velocity',
  'tt_avdNum','tt_hookNum','tt_curr_subs','tt_monthly_views','tt_follow_rate',
  'ig_views','ig_likes','ig_comments','ig_saves','ig_sends','ig_reach',
  'ig_nonfollower','ig_velocity','ig_avdNum','ig_curr_subs','ig_monthly_views','ig_follow_rate',
  'sch_tz','sch_niche','sch_freq','sch_format',
  'cp_subs','cp_views','cp_avd','cp_sub_rate','cp_uploads','cp_ctr','cp_rpm',
  'cp_opt_rate','cp_opt_views','cp_agg_uploads','cp_target_ctr',
  'yt_curr_subs','yt_monthly_views','yt_sub_rate','yt_subs_7d','yt_subs_28d',
  'ab_test_name','ab_total_impressions','ab_niche',
  'cmp_id1','cmp_subs1','cmp_totalviews1','cmp_videocount1','cmp_views1',
  'cmp_ctr1','cmp_avd1','cmp_rpm1','cmp_id2','cmp_subs2','cmp_totalviews2',
  'cmp_videocount2','cmp_views2','cmp_ctr2','cmp_avd2','cmp_rpm2',
  'cmp_id3','cmp_subs3','cmp_totalviews3','cmp_videocount3','cmp_views3',
  'cmp_ctr3','cmp_avd3','cmp_rpm3',
  'hook_topic','hook_niche','hook_platform',
  'seo_title','seo_keyword','seo_type',
  'sat_topic','sat_angle','sat_category','sat_volume',
  'rc_length','rc_30s','rc_1min','rc_25pct','rc_50pct','rc_75pct','rc_90pct','rc_avd',
  'es_length','es_avd','es_mid','es_70','es_80','es_90','es_dropoff',
  'es_current_ctr','es_rewatch','es_high_start','es_high_end','es_card_goal',
  'lst_twitch_clientid','lst_twitch_token','cmp_api_key',
  'u_yt_premiere','u_yt_community','u_yt_endscreen','u_tt_length','u_tt_loop',
  'u_tt_hashtags','u_tt_sound','u_ig_length','u_ig_caption','u_ig_cover','u_ig_story',
  'u_li_type','u_li_comment','u_li_tags','u_li_hook','u_tw_copy','u_tw_thread',
  'u_tw_pin','u_tw_cross','u_age','u_geo','u_chsize','u_vidlen','u_format',
  'u_niche','u_tz','u_freq',
];

/* ═══════════════════════════════════════════════════════
   LANDING / AUTH
═══════════════════════════════════════════════════════ */
function loginFresh() {
  const nameInput = document.getElementById('authUsername');
  const user = nameInput ? nameInput.value.trim() : '';
  if (!user) { if (nameInput) nameInput.focus(); return; }
  currentUser = user;
  try { localStorage.setItem('ccAnalytics_session', currentUser); } catch(e) {}
  const lo = document.getElementById('landingOverlay');
  if (lo) lo.classList.add('hidden');
  const ov = document.getElementById('authOverlay');
  if (ov) ov.style.display = 'none';
  const bar = document.getElementById('userBar');
  if (bar) bar.style.display = 'flex';
  const nm = document.getElementById('userNameDisplay');
  if (nm) nm.innerText = '▶ ' + currentUser.toUpperCase();
  try { loadTrackerData(); }    catch(e) { console.warn('loadTrackerData', e); }
  try { updateVideoDropdown(); } catch(e) { console.warn('updateVideoDropdown', e); }
  try { initAll(); }            catch(e) { console.warn('initAll', e); }
  hasUnsavedChanges = false;
  const sb = document.getElementById('saveBanner');
  if (sb) sb.style.display = 'none';
}

function dismissOverlay() {
  const overlay = document.getElementById('authOverlay');
  if (overlay) overlay.style.display = 'none';
  const bar = document.getElementById('userBar');
  if (bar) bar.style.display = 'flex';
  const nameEl = document.getElementById('userNameDisplay');
  if (nameEl) nameEl.innerText = '▶ ' + (currentUser || '').toUpperCase();
}

function logout() {
  try { localStorage.removeItem('ccAnalytics_session'); } catch(e) {}
  window.location.reload();
}

function showDashboard() {
  const lo = document.getElementById('landingOverlay');
  if (lo) lo.classList.add('hidden');
  const ao = document.getElementById('authOverlay');
  if (ao) ao.style.display = 'flex';
}
function showLanding() {
  const lo = document.getElementById('landingOverlay');
  if (lo) lo.classList.remove('hidden');
  const ao = document.getElementById('authOverlay');
  if (ao) ao.style.display = 'none';
}
function lo_switchToNew() {
  const ret = document.getElementById('lo_returning');
  const nf  = document.getElementById('lo_new_form');
  if (ret) ret.style.display = 'none';
  if (nf)  nf.style.display  = 'block';
}
function setViewMode(mode) {
  document.documentElement.setAttribute('data-viewmode', mode);
  try { localStorage.setItem('ssViewMode', mode); } catch(e) {}
}

function landingLoadAndShow(event) {
  const file = event.target.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = function(ev) {
    try {
      const parsed = JSON.parse(ev.target.result);
      currentUser = parsed.creator || 'Creator';
      if (parsed.theme) loadTheme(parsed.theme);
      if (parsed.font)  loadFont(parsed.font);
      if (parsed.trackerData) { trackingDataObj = parsed.trackerData; saveTrackerData(); }
      if (parsed.accountInfo) {
        Object.entries(parsed.accountInfo).forEach(([k,v]) => {
          const el = document.getElementById(k); if (el) el.value = v;
        });
      }
      if (parsed.apiKeys && parsed.apiKeys.ytApiKey) {
        const yk = document.getElementById('yt_api_key');
        if (yk) yk.value = parsed.apiKeys.ytApiKey;
        try { localStorage.setItem('ccYTApiKey', parsed.apiKeys.ytApiKey); } catch(e) {}
      }
      try { localStorage.setItem('ccAnalytics_session', currentUser); } catch(e) {}
      const lo = document.getElementById('landingOverlay'); if (lo) lo.classList.add('hidden');
      const ao = document.getElementById('authOverlay');    if (ao) ao.style.display = 'none';
      const bar = document.getElementById('userBar');       if (bar) bar.style.display = 'flex';
      const nm  = document.getElementById('userNameDisplay');
      if (nm) nm.innerText = '▶ ' + currentUser.toUpperCase();
      try { loadTrackerData(); } catch(e) {}
      try { updateVideoDropdown(); } catch(e) {}
      try { initAll(); } catch(e) {}
      hasUnsavedChanges = false;
      const sb = document.getElementById('saveBanner'); if (sb) sb.style.display = 'none';
      if (typeof showToast === 'function') showToast('✅ Session restored!', 'var(--secondary)');
    } catch(err) { alert('Could not read save file.'); }
  };
  reader.readAsText(file);
}

/* ═══════════════════════════════════════════════════════
   SAVE / LOAD
═══════════════════════════════════════════════════════ */
function buildSavePayload() {
  const payload = { creator: currentUser || 'Creator', savedAt: new Date().toISOString(),
    theme: currentTheme, font: currentFont, layout: currentLayout, bg: currentBg,
    trackerData: trackingDataObj, videoProfiles, sectionVisibility,
    activePlatforms, abTests: abSavedTests };
  payload.fields = {};
  ALL_SAVE_FIELDS.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    if (el.type === 'checkbox' || el.type === 'radio') { payload.fields[id] = el.checked; }
    else { payload.fields[id] = el.value; }
  });
  const group = document.querySelector('input[name="trafficSource"]:checked');
  if (group) payload.fields._trafficSource = group.value;
  payload.accountInfo = {};
  ['yt_channel_url','yt_channel_id','yt_api_key','tt_handle','ig_handle'].forEach(id => {
    const el = document.getElementById(id); if (el) payload.accountInfo[id] = el.value;
  });
  payload.apiKeys = { ytApiKey: document.getElementById('yt_api_key')?.value || '' };
  return payload;
}

function saveFullSession() {
  const payload = buildSavePayload();
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'social_spot_session_' + new Date().toISOString().split('T')[0] + '.json';
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  markSaved();
  if (typeof showToast === 'function') showToast('💾 Session saved!', 'var(--secondary)');
}

function loadFromFile(event) {
  const file = event.target.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = function(ev) {
    try {
      const parsed = JSON.parse(ev.target.result);
      if (parsed.theme)  loadTheme(parsed.theme);
      if (parsed.font)   loadFont(parsed.font);
      if (parsed.layout) setDashLayout(parsed.layout, null);
      if (parsed.bg)     applyBg(parsed.bg, null);
      if (parsed.trackerData) { trackingDataObj = parsed.trackerData; saveTrackerData(); }
      if (parsed.videoProfiles) videoProfiles = parsed.videoProfiles;
      if (parsed.sectionVisibility) { sectionVisibility = parsed.sectionVisibility; svApplyAll(); }
      if (parsed.activePlatforms) { activePlatforms = parsed.activePlatforms; applyPlatformVisibility(); }
      if (parsed.abTests) { abSavedTests = parsed.abTests; renderABHistory(); }
      if (parsed.fields) {
        Object.entries(parsed.fields).forEach(([id, val]) => {
          const el = document.getElementById(id); if (!el) return;
          if (el.type === 'checkbox' || el.type === 'radio') el.checked = val;
          else el.value = val;
        });
        if (parsed.fields._trafficSource) {
          const r = document.querySelector(`input[name="trafficSource"][value="${parsed.fields._trafficSource}"]`);
          if (r) r.checked = true;
        }
      }
      if (parsed.accountInfo) {
        Object.entries(parsed.accountInfo).forEach(([k,v]) => {
          const el = document.getElementById(k); if (el) el.value = v;
        });
      }
      if (parsed.apiKeys && parsed.apiKeys.ytApiKey) {
        const yk = document.getElementById('yt_api_key');
        if (yk) yk.value = parsed.apiKeys.ytApiKey;
        try { localStorage.setItem('ccYTApiKey', parsed.apiKeys.ytApiKey); } catch(e) {}
      }
      // Re-apply the current profile's date
      if (videoProfiles && currentProfile && videoProfiles[currentProfile]) {
        const pd = videoProfiles[currentProfile];
        ['dt_month','dt_day','dt_year','dt_hour','dt_minute','dt_ampm'].forEach(id => {
          const el = document.getElementById(id);
          if (el && pd[id] !== undefined && pd[id] !== '') el.value = pd[id];
        });
        if (pd._videoPublishedAt) {
          const pub = document.getElementById('videoPublishedAt');
          if (pub) pub.value = pd._videoPublishedAt;
          if (typeof dtSetAgeLabel === 'function') dtSetAgeLabel(pd._videoPublishedAt);
        }
        if (typeof dtUpdate === 'function') dtUpdate();
      }
      updateVideoDropdown();
      vpInit();
      initAll();
      hasUnsavedChanges = false;
      const sb = document.getElementById('saveBanner'); if (sb) sb.style.display = 'none';
      if (typeof showToast === 'function') showToast('✅ Session loaded!', 'var(--secondary)');
    } catch(err) { alert('Error loading file: ' + err.message); }
  };
  reader.readAsText(file);
}

function saveAllFields() {
  const data = {};
  ALL_SAVE_FIELDS.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    if (el.type === 'checkbox' || el.type === 'radio') data[id] = el.checked;
    else data[id] = el.value;
  });
  return data;
}

function restoreAllFields(data) {
  if (!data) return;
  Object.entries(data).forEach(([id, val]) => {
    const el = document.getElementById(id); if (!el) return;
    if (el.type === 'checkbox' || el.type === 'radio') el.checked = val;
    else el.value = val;
  });
}

/* ─── Unsaved changes guard ─── */
function markUnsaved() { hasUnsavedChanges = true; const sb = document.getElementById('saveBanner'); if (sb) sb.style.display = 'flex'; }
function markSaved()   { hasUnsavedChanges = false; allowClose = false; const sb = document.getElementById('saveBanner'); if (sb) sb.style.display = 'none'; }
function closeUnsavedModal() { const m = document.getElementById('unsavedModal'); if (m) m.style.display = 'none'; }
function forceClose() { allowClose = true; closeUnsavedModal(); window.location.reload(); }

window.addEventListener('beforeunload', function(e) {
  if (hasUnsavedChanges && !allowClose) { e.preventDefault(); e.returnValue = ''; }
});

/* ─── Toast ─── */
function showToast(msg, color) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div'); t.id = 'toast';
    t.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:var(--card);border:1px solid var(--border-hi);border-radius:10px;padding:11px 22px;font-size:13px;font-weight:600;color:var(--text-bright);box-shadow:0 8px 32px rgba(0,0,0,0.4);z-index:99999;pointer-events:none;transition:opacity 0.3s;';
    document.body.appendChild(t);
  }
  t.style.borderColor = color || 'var(--border-hi)';
  t.style.color = color || 'var(--text-bright)';
  t.innerText = msg;
  t.style.opacity = '1';
  clearTimeout(t._hide);
  t._hide = setTimeout(() => { t.style.opacity = '0'; }, 2800);
}

/* ═══════════════════════════════════════════════════════
   TRACKER DATA
═══════════════════════════════════════════════════════ */
function saveTrackerData() {
  try { localStorage.setItem('ccTrackerData', JSON.stringify(trackingDataObj)); } catch(e) {}
}
function loadTrackerData() {
  try {
    const d = localStorage.getItem('ccTrackerData');
    if (d) trackingDataObj = JSON.parse(d);
  } catch(e) {}
}
function exportTrackerData() {
  const blob = new Blob([JSON.stringify(trackingDataObj, null, 2)], {type:'application/json'});
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
  a.download = 'tracker_data.json'; document.body.appendChild(a); a.click(); document.body.removeChild(a);
}
function importTrackerData(event) {
  const file = event.target.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = function(ev) {
    try {
      trackingDataObj = JSON.parse(ev.target.result);
      saveTrackerData(); updateVideoDropdown(); renderTracker();
      showToast('✅ Tracker data imported!', 'var(--secondary)');
    } catch(e) { alert('Invalid tracker file.'); }
  };
  reader.readAsText(file);
}
function clearAllData() {
  if (!confirm('Clear all data? This cannot be undone.')) return;
  trackingDataObj = { 'Default Video': [] }; saveTrackerData();
  updateVideoDropdown(); renderTracker();
  showToast('🗑️ Data cleared.', 'var(--danger)');
}

/* ─── API key ─── */
function saveAPIKey() {
  const el = document.getElementById('yt_api_key');
  if (!el) return;
  try { localStorage.setItem('ccYTApiKey', el.value); } catch(e) {}
  showToast('🔑 API key saved.', 'var(--success)');
}
function loadAPIKey() {
  const k = localStorage.getItem('ccYTApiKey') || '';
  const el = document.getElementById('yt_api_key'); if (el) el.value = k;
}

/* ─── fetchAPIData ─── */
async function fetchAPIData() {
  const keyEl = document.getElementById('yt_api_key');
  const vidEl = document.getElementById('yt_video_id');
  if (!keyEl || !vidEl) return;
  const apiKey = keyEl.value.trim(); const videoId = vidEl.value.trim();
  if (!apiKey || !videoId) { showToast('⚠️ Enter API key and Video ID.', 'var(--warning)'); return; }
  try {
    const r = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${apiKey}`);
    const data = await r.json();
    if (!data.items || !data.items[0]) { showToast('❌ Video not found.', 'var(--danger)'); return; }
    const s = data.items[0].statistics;
    const setVal = (id, v) => { const el=document.getElementById(id); if(el) el.value=v; };
    setVal('viewsInput', s.viewCount||0); setVal('likesInput', s.likeCount||0);
    setVal('commentsInput', s.commentCount||0);
    updateTab1(); showToast('✅ Stats loaded from API!', 'var(--success)');
  } catch(e) { showToast('❌ API error: ' + e.message, 'var(--danger)'); }
}

/* ═══════════════════════════════════════════════════════
   VIDEO DROPDOWN / TRACKER
═══════════════════════════════════════════════════════ */
function updateVideoDropdown() {
  const sel = document.getElementById('videoSelect');
  if (!sel) return;
  sel.innerHTML = Object.keys(trackingDataObj)
    .map(k => `<option value="${k}"${k===currentVideoKey?' selected':''}>${k}</option>`).join('');
}
function switchVideo() {
  const sel = document.getElementById('videoSelect');
  if (sel) currentVideoKey = sel.value;
  renderTracker();
}
function createNewVideo() {
  const name = prompt('Video name:'); if (!name || !name.trim()) return;
  const key = name.trim();
  if (trackingDataObj[key]) { showToast('⚠️ Name already exists.', 'var(--warning)'); return; }
  trackingDataObj[key] = []; currentVideoKey = key;
  saveTrackerData(); updateVideoDropdown(); renderTracker();
}
function deleteCurrentVideo() {
  if (Object.keys(trackingDataObj).length <= 1) { showToast('⚠️ Cannot delete last video.', 'var(--warning)'); return; }
  if (!confirm(`Delete "${currentVideoKey}"?`)) return;
  delete trackingDataObj[currentVideoKey];
  currentVideoKey = Object.keys(trackingDataObj)[0];
  saveTrackerData(); updateVideoDropdown(); renderTracker();
}

/* ═══════════════════════════════════════════════════════
   VIDEO PROFILES (VP)
═══════════════════════════════════════════════════════ */
function vpRead() {
  const data = {};
  VP_FIELDS.forEach(id => {
    const el = document.getElementById(id);
    if (el) data[id] = el.value;
  });
  const radio = document.querySelector('input[name="trafficSource"]:checked');
  if (radio) data._trafficSource = radio.value;
  // Save date picker state & published timestamp
  const pub = document.getElementById('videoPublishedAt');
  if (pub) data._videoPublishedAt = pub.value;
  return data;
}

function vpWrite(data) {
  if (!data) return;
  VP_FIELDS.forEach(id => {
    const el = document.getElementById(id);
    if (el && data[id] !== undefined) el.value = data[id];
  });
  if (data._trafficSource) {
    const r = document.getElementById('src_' + data._trafficSource);
    if (r) r.checked = true;
  }
  // Always clear date picker first, then restore
  ['dt_month','dt_day','dt_year','dt_hour','dt_minute'].forEach(id => {
    const el = document.getElementById(id); if (el) el.value = '';
  });
  const amEl = document.getElementById('dt_ampm'); if (amEl) amEl.value = 'AM';
  const pubH = document.getElementById('videoPublishedAt'); if (pubH) pubH.value = '';
  if (typeof dtSetAgeLabel === 'function') dtSetAgeLabel('');
  ['dt_month','dt_day','dt_year','dt_hour','dt_minute','dt_ampm'].forEach(id => {
    const el = document.getElementById(id);
    if (el && data[id] !== undefined && data[id] !== '') el.value = data[id];
  });
  if (typeof dtUpdate === 'function') dtUpdate();
  if (data._videoPublishedAt) {
    const pub = document.getElementById('videoPublishedAt');
    if (pub) pub.value = data._videoPublishedAt;
    if (typeof dtSetAgeLabel === 'function') dtSetAgeLabel(data._videoPublishedAt);
  }
  ['ctr','ret'].forEach(s => { if (typeof syncNum === 'function') syncNum(s+'Num', s); });
  if (typeof updateTab1 === 'function') updateTab1();
}

function vpSave() {
  const cur = vpRead();
  videoProfiles[currentProfile] = cur;
}

function vpSwitch(name) {
  if (!videoProfiles[name]) return;
  vpSave();
  currentProfile = name;
  vpWrite(videoProfiles[currentProfile] || {});
  vpUpdateSelect();
}

function vpAdd() {
  const name = prompt('Name for new video profile:'); if (!name || !name.trim()) return;
  if (videoProfiles[name.trim()]) { showToast('⚠️ Name already exists.', 'var(--warning)'); return; }
  vpSave();
  currentProfile = name.trim();
  videoProfiles[currentProfile] = {};
  vpUpdateSelect();
  vpWrite({});
  showToast('✦ Profile "' + currentProfile + '" created.', 'var(--primary)');
}

function vpRename() {
  const newName = prompt('Rename "' + currentProfile + '" to:', currentProfile);
  if (!newName || !newName.trim() || newName.trim() === currentProfile) return;
  if (videoProfiles[newName.trim()]) { showToast('⚠️ Name taken.', 'var(--warning)'); return; }
  videoProfiles[newName.trim()] = videoProfiles[currentProfile];
  delete videoProfiles[currentProfile];
  currentProfile = newName.trim();
  vpUpdateSelect();
  showToast('✏️ Renamed to "' + currentProfile + '".', 'var(--primary)');
}

function vpDelete() {
  if (Object.keys(videoProfiles).length <= 1) { showToast('⚠️ Cannot delete last profile.', 'var(--warning)'); return; }
  if (!confirm('Delete profile "' + currentProfile + '"?')) return;
  delete videoProfiles[currentProfile];
  currentProfile = Object.keys(videoProfiles)[0];
  vpWrite(videoProfiles[currentProfile] || {});
  vpUpdateSelect();
}

function vpUpdateSelect() {
  const sel = document.getElementById('vp_select');
  if (!sel) return;
  const keys = Object.keys(videoProfiles);
  sel.innerHTML = keys.map(n => `<option value="${n}"${n===currentProfile?' selected':''}>${n}</option>`).join('');
  const counter = document.getElementById('vp_counter');
  if (counter) {
    const idx = keys.indexOf(currentProfile) + 1;
    counter.textContent = `${idx} of ${keys.length} video${keys.length!==1?'s':''} — use ◀ ▶ to cycle`;
  }
}

function vpInit() {
  vpUpdateSelect();
  if (videoProfiles[currentProfile] && Object.keys(videoProfiles[currentProfile]).length > 0) {
    vpWrite(videoProfiles[currentProfile]);
  } else {
    // Clear date picker for fresh profiles
    ['dt_month','dt_day','dt_year','dt_hour','dt_minute'].forEach(id => {
      const el = document.getElementById(id); if (el) el.value = '';
    });
    const amEl = document.getElementById('dt_ampm'); if (amEl) amEl.value = 'AM';
    if (typeof dtUpdate === 'function') dtUpdate();
  }
}

function vpToSave() { vpSave(); return { profiles: videoProfiles, current: currentProfile }; }
function vpFromSave(data) {
  if (data && typeof data === 'object') {
    if (data.profiles) videoProfiles = data.profiles;
    if (data.current && videoProfiles[data.current]) currentProfile = data.current;
    vpInit();
  }
}
function vpPrev() {
  const keys = Object.keys(videoProfiles); if (keys.length <= 1) return;
  vpSwitch(keys[(keys.indexOf(currentProfile) - 1 + keys.length) % keys.length]);
}
function vpNext() {
  const keys = Object.keys(videoProfiles); if (keys.length <= 1) return;
  vpSwitch(keys[(keys.indexOf(currentProfile) + 1) % keys.length]);
}
function vpDuplicate() {
  const base = currentProfile + ' (copy)'; let name = base, n = 2;
  while (videoProfiles[name]) { name = base + ' ' + n++; }
  vpSave();
  videoProfiles[name] = JSON.parse(JSON.stringify(videoProfiles[currentProfile] || {}));
  currentProfile = name;
  vpUpdateSelect();
  showToast('⧉ Duplicated as "' + name + '"', 'var(--primary)');
}

/* ═══════════════════════════════════════════════════════
   SECTION VISIBILITY (SV)
═══════════════════════════════════════════════════════ */
function svInit() {
  SV_ALL_IDS.forEach(id => {
    if (sectionVisibility[id] === undefined) sectionVisibility[id] = true;
  });
  svApplyAll();
}
function svApply(id) {
  const chk = document.getElementById('sv_chk_' + id);
  const wrap = document.getElementById(id);
  const vis = sectionVisibility[id] !== false;
  if (chk) chk.checked = vis;
  if (wrap) wrap.style.display = vis ? '' : 'none';
}
function svApplyAll() { SV_ALL_IDS.forEach(svApply); }
function svToggle(id) {
  sectionVisibility[id] = !(sectionVisibility[id] !== false);
  svApply(id);
  try { localStorage.setItem('ccSectionVis', JSON.stringify(sectionVisibility)); } catch(e) {}
}
function svShowAll() { SV_ALL_IDS.forEach(id => { sectionVisibility[id] = true; svApply(id); }); }
function svHideAll() { SV_ALL_IDS.forEach(id => { sectionVisibility[id] = false; svApply(id); }); }
function svPanelToggle() {
  const p = document.getElementById('svPanel'); if (!p) return;
  p.style.display = p.style.display === 'block' ? 'none' : 'block';
}
function svPanelClose() {
  const p = document.getElementById('svPanel'); if (p) p.style.display = 'none';
}
function svFromSave(data) {
  if (data && typeof data === 'object') { Object.assign(sectionVisibility, data); svApplyAll(); }
}

/* ═══════════════════════════════════════════════════════
   initAll — wires everything on login/load
═══════════════════════════════════════════════════════ */
function initAll() {
  try { updateTab1(); }    catch(e) { console.warn('initAll updateTab1', e); }
  try { updateTab2(); }    catch(e) {}
  try { updateTab3(); }    catch(e) {}
  try { updateRpmSliders('min'); } catch(e) {}
  try { updateTT(); }      catch(e) {}
  try { updateIG(); }      catch(e) {}
  try { calculateUploadTime(); } catch(e) {}
  try { updateYTSubProjection(); } catch(e) {}
  try { updateTTSubProjection(); } catch(e) {}
  try { updateIGSubProjection(); } catch(e) {}
  try { updateChannelProjections(); } catch(e) {}
  // Restore UI state
  try {
    const savedTheme  = localStorage.getItem('ccTheme')  || 'default';
    const savedFont   = localStorage.getItem('ccFont')   || 'inter';
    const savedLayout = localStorage.getItem('ccLayout') || 'default';
    const savedBg     = localStorage.getItem('ccBg')     || 'none';
    applyTheme(savedTheme, true);
    applyFont(savedFont, true);
    setDashLayout(savedLayout, null);
    if (savedBg && savedBg !== 'none') applyBg(savedBg, null);
  } catch(e) {}
  try { vpInit(); }        catch(e) {}
  try { svInit(); }        catch(e) {}
  try { renderThemePicker(); renderFontPicker(); } catch(e) {}
  try { renderABHistory(); } catch(e) {}
  // Restore LST API key
  const savedKey = localStorage.getItem('ccYTApiKey') || '';
  const lstKey = document.getElementById('lst_apikey');
  if (lstKey && savedKey && !lstKey.value) lstKey.value = savedKey;
  setTimeout(() => { hasUnsavedChanges = false; markSaved(); }, 400);
}

/* ═══════════════════════════════════════════════════════
   ACCOUNT
═══════════════════════════════════════════════════════ */
function saveAccountInfo() {
  const fields = ['yt_channel_url','yt_channel_id','tt_handle','ig_handle'];
  const data = {};
  fields.forEach(id => { const el = document.getElementById(id); if (el) data[id] = el.value; });
  try { localStorage.setItem('ccAccountInfo', JSON.stringify(data)); } catch(e) {}
  showToast('✅ Account info saved.', 'var(--success)');
}
function loadAccountInfo() {
  try {
    const d = localStorage.getItem('ccAccountInfo');
    if (!d) return;
    const data = JSON.parse(d);
    Object.entries(data).forEach(([k,v]) => { const el = document.getElementById(k); if (el) el.value = v; });
  } catch(e) {}
}
function clearAccountInfo() {
  try { localStorage.removeItem('ccAccountInfo'); } catch(e) {}
  ['yt_channel_url','yt_channel_id','tt_handle','ig_handle'].forEach(id => {
    const el = document.getElementById(id); if (el) el.value = '';
  });
  showToast('🗑️ Account info cleared.', 'var(--danger)');
}
function showSavedBadge() {
  const b = document.getElementById('savedBadge');
  if (!b) return;
  b.style.opacity = '1';
  setTimeout(() => { b.style.opacity = '0'; }, 2000);
}
function updateLinkPreview() {
  const url = document.getElementById('yt_channel_url')?.value || '';
  const el = document.getElementById('link_preview');
  if (el) el.href = url;
}
function updateQuickLinks() {}
function loadSaveFromAccountTab() { document.getElementById('loadFileInput')?.click(); }

