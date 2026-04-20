/* ═══════════════════════════════════════════════════════════════════
   THE SOCIAL SPOT — tab1.js
   Virality Checker (Tab 1): scoring, scenarios, date picker, staleness.
═══════════════════════════════════════════════════════════════════ */

'use strict';

/* ─── Staleness tracking ─── */
const STALE_FIELD_DEFS_FREQUENT = {
  viewsInput:1, likesInput:1, commentsInput:1, ctrNum:1,
  viewVelocity:1, impressionsInput:1, viewsCurrent:1, snap3_hours:1,
};
const STALE_FIELD_DEFS_DAILY = { retNum:1, nonSubViewPct:1 };

/* ─── Slider sync ─── */


  function syncSlider(sliderId, numberId) {
    const v = document.getElementById(sliderId)?.value;
    const n = document.getElementById(numberId);
    if (n && v !== undefined) { n.value = v; updateSliderFill(document.getElementById(sliderId)); }
  }


  function syncNum(numberId, sliderId) {
    // Inputs are type=\\"text\\" so the browser never mangles mid-entry values.
    // Only move the slider \u2014 never rewrite the text box while the user is typing.
    const el  = document.getElementById(numberId);
    const s   = document.getElementById(sliderId);
    if (!el || !s) return;
    const raw = el.value.trim();
    // Bail out silently while still mid-entry (empty, just a minus, just a dot, ending in dot)
    if (raw === '' || raw === '-' || raw === '.' || raw.endsWith('.')) return;
    const num = parseFloat(raw);
    if (isNaN(num)) return;
    const sMin = parseFloat(s.min) || 0;
    const sMax = parseFloat(s.max) || 100;
    const clamped = Math.min(Math.max(num, sMin), sMax);
    s.value = clamped;
    updateSliderFill(s);
    // Only snap the text box back if the value is genuinely out of range
    if (num > sMax) el.value = sMax;
    if (num < sMin) el.value = sMin;
  }


  function updateSliderFill(el){if(!el)return;const min=parseFloat(el.min)||0,max=parseFloat(el.max)||100,val=parseFloat(el.value)||0;el.style.setProperty('--val',((val-min)/(max-min)*100)+'%');}

  function dtBuildIso() {
    const month = parseInt(document.getElementById('dt_month')?.value) || 0;
    const day   = parseInt(document.getElementById('dt_day')?.value)   || 0;
    const year  = parseInt(document.getElementById('dt_year')?.value)  || 0;
    const hour12= parseInt(document.getElementById('dt_hour')?.value)  || 12;
    const min   = parseInt(document.getElementById('dt_minute')?.value)|| 0;
    const ampm  = document.getElementById('dt_ampm')?.value || 'AM';
    if (!year || !month || !day) return '';
    let hour24 = hour12 % 12;
    if (ampm === 'PM') hour24 += 12;
    const mm = String(month).padStart(2,'0');
    const dd = String(day).padStart(2,'0');
    const hh = String(hour24).padStart(2,'0');
    const mn = String(min).padStart(2,'0');
    return year + '-' + mm + '-' + dd + 'T' + hh + ':' + mn + ':00';
  }

  function dtSetAgeLabel(iso) {
    const label = document.getElementById('dtAgeLabel');
    if (!label) return;
    if (!iso) { label.innerText = 'Select date & time...'; return; }
    const pub = new Date(iso);
    if (isNaN(pub.getTime())) { label.innerText = 'Invalid date'; return; }
    const diffMs  = Date.now() - pub.getTime();
    const diffH   = Math.floor(diffMs / 3600000);
    const diffD   = Math.floor(diffH / 24);
    if (diffH < 1)       label.innerText = 'Just now';
    else if (diffH < 24) label.innerText = diffH + 'h ago';
    else if (diffD < 7)  label.innerText = diffD + 'd ' + (diffH % 24) + 'h ago';
    else                 label.innerText = pub.toLocaleDateString();
    // Update the trigger button text
    const trig = document.getElementById('dtTrigger');
    const span = trig ? trig.querySelector('span') : null;
    if (span) {
      span.innerText = pub.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})
        + ' ' + pub.toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'});
    }
  }

  function updateDateTimeAndTab1() {
    const iso = dtBuildIso();
    const hidden = document.getElementById('videoPublishedAt');
    if (hidden) hidden.value = iso;
    dtSetAgeLabel(iso);
    updateTab1();
  }

  function clearPublishTime() {
    ['dt_month','dt_day','dt_year','dt_hour','dt_minute'].forEach(id=>{
      const el=document.getElementById(id); if(el)el.value='';
    });
    const amEl=document.getElementById('dt_ampm'); if(amEl)amEl.value='AM';
    const pub=document.getElementById('videoPublishedAt'); if(pub)pub.value='';
    dtSetAgeLabel('');
    updateTab1();
  }


  function dtToggle() {
    var panel = document.getElementById('dtPanel');
    var trig  = document.getElementById('dtTrigger');
    if (!panel) return;
    var open = panel.style.display === 'block';
    panel.style.display = open ? 'none' : 'block';
    if (trig) trig.style.borderColor = open ? '' : 'var(--primary)';
  }

  function dtUpdate() {
    var mo = document.getElementById('dt_month').value;
    var dy = document.getElementById('dt_day').value;
    var yr = document.getElementById('dt_year').value;
    var hr = document.getElementById('dt_hour').value;
    var mn = document.getElementById('dt_minute').value;
    var ap = document.getElementById('dt_ampm').value;
    var disp = document.getElementById('dtDisplay');
    if (!disp) return;
    if (mo && dy && yr && hr && mn) {
      disp.style.color = 'var(--text-bright)';
      disp.textContent = mo.slice(0,3) + ' ' + dy + ', ' + yr + '  ' + hr + ':' + mn + ' ' + ap;
    } else {
      disp.style.color = 'var(--text-dim)';
      disp.textContent = 'Select date & time...';
    }
  }

  function dtConfirm() {
    var iso = dtBuildIso();
    var hidden = document.getElementById('videoPublishedAt');
    if (hidden) hidden.value = iso;
    dtSetAgeLabel(iso);
    dtUpdate();
    var panel = document.getElementById('dtPanel');
    var trig  = document.getElementById('dtTrigger');
    if (panel) panel.style.display = 'none';
    if (trig)  trig.style.borderColor = '';
    updateTab1();
  }

  function dtClear() {
    ['dt_month','dt_day','dt_year','dt_hour','dt_minute'].forEach(function(id) {
      var el = document.getElementById(id); if (el) el.value = '';
    });
    var amEl = document.getElementById('dt_ampm'); if (amEl) amEl.value = 'AM';
    var hidden = document.getElementById('videoPublishedAt'); if (hidden) hidden.value = '';
    dtSetAgeLabel('');
    dtUpdate();
    var panel = document.getElementById('dtPanel');
    var trig  = document.getElementById('dtTrigger');
    if (panel) panel.style.display = 'none';
    if (trig)  trig.style.borderColor = '';
    updateTab1();
  }


  function markFieldEdited(fieldId){if(typeof STALE_FIELD_DEFS_DAILY!=='undefined'&&STALE_FIELD_DEFS_DAILY[fieldId]){const pub=document.getElementById('videoPublishedAt');if(!pub||!pub.value)return;if((Date.now()-new Date(pub.value).getTime())/3600000<24)return;}_fieldTimestamps[fieldId]=Date.now();clearFieldStale(fieldId);if(_fieldTimers[fieldId])clearTimeout(_fieldTimers[fieldId]);_fieldTimers[fieldId]=setTimeout(()=>showFieldStale(fieldId),15*60*1000);}


  function showFieldStale(fieldId){const el=document.getElementById(fieldId);if(!el||!el.value||parseFloat(el.value)<=0)return;if(fieldId==='retNum'){const cbx=document.getElementById('newVideoToggle');if(cbx&&cbx.checked)return;}const ageMs=Date.now()-(_fieldTimestamps[fieldId]||Date.now());const ageMins=Math.round(ageMs/60000);const isRed=ageMins>=30;const col=isRed?'#f87171':'#fbbf24';let badge=document.getElementById('stale_'+fieldId);if(!badge){badge=document.createElement('div');badge.id='stale_'+fieldId;badge.style.cssText='display:inline-flex;align-items:center;gap:4px;font-size:10px;font-weight:700;padding:2px 7px;border-radius:4px;margin-top:3px;line-height:1.4;';const box=el.closest('.input-box')||el.parentElement;if(box)box.appendChild(badge);}badge.style.background='rgba('+(isRed?'239,68,68':'251,191,36')+',0.12)';badge.style.border='1px solid '+col;badge.style.color=col;badge.innerHTML=(isRed?'🔴':'🟡')+' '+ageMins+' min ago — '+(isRed?'update from Studio':'consider refreshing');el.style.setProperty('border-color',col,'important');el.style.setProperty('box-shadow','0 0 0 2px rgba('+(isRed?'239,68,68':'251,191,36')+',0.25)','important');_checkCollectiveStale();}


  function clearFieldStale(fieldId){const b=document.getElementById('stale_'+fieldId);if(b)b.remove();const el=document.getElementById(fieldId);if(el){el.style.removeProperty('border-color');el.style.removeProperty('box-shadow');}if(_fieldTimers&&_fieldTimers[fieldId+'_refresh']){clearInterval(_fieldTimers[fieldId+'_refresh']);delete _fieldTimers[fieldId+'_refresh'];}}


  function _checkCollectiveStale(){if(document.getElementById('stale_popup_shown'))return;if(typeof STALE_FIELD_DEFS_FREQUENT==='undefined')return;const now=Date.now(),dayMs=86400000,keys=Object.keys(STALE_FIELD_DEFS_FREQUENT);const withData=keys.filter(id=>{const el=document.getElementById(id);return el&&parseFloat(el.value)>0&&_fieldTimestamps[id];});const stale=withData.filter(id=>(now-_fieldTimestamps[id])>=dayMs);if(withData.length>=4&&stale.length===withData.length)_showCollectiveStalePopup();}


  function _showCollectiveStalePopup(){if(document.getElementById('stale_popup'))return;const p=document.createElement('div');p.id='stale_popup';p.style.cssText='position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:99998;background:var(--card);border:2px solid #f87171;border-radius:14px;padding:24px 28px;max-width:420px;width:90%;box-shadow:0 0 40px rgba(239,68,68,0.3);text-align:center;';p.innerHTML='<div style="font-size:32px;margin-bottom:10px;">⏰</div><div style="font-size:15px;font-weight:800;color:#f87171;margin-bottom:8px;">Data Over 24h Old</div><div style="font-size:13px;color:var(--text);margin-bottom:16px;">Refresh metrics from YouTube Studio for accurate readings.</div><button onclick="document.getElementById(\"stale_popup\").remove();" style="background:#f87171;color:#fff;border:none;border-radius:8px;padding:9px 24px;font-size:13px;font-weight:700;cursor:pointer;">Got it</button>';document.body.appendChild(p);const m=document.createElement('div');m.id='stale_popup_shown';m.style.display='none';document.body.appendChild(m);}


  function clearStalenessWarnings() {
    document.querySelectorAll('.stale-badge').forEach(b => b.remove());
    Object.keys(STALE_CARDS).forEach(cardId => {
      const card = document.getElementById(cardId);
      if (!card) return;
      const inner = card.querySelector('.control-card') || card;
      inner.style.removeProperty('box-shadow');
      inner.style.removeProperty('border-color');
    });
    const viewsEl = document.getElementById('viewsInput');
    if (viewsEl) { viewsEl.style.removeProperty('border-color'); viewsEl.style.removeProperty('box-shadow'); }
  }


  function checkStaleness() {
    if (!_dataLastEdited) return;
    const ageMs = Date.now() - _dataLastEdited;
    if (ageMs < 10 * 60 * 1000) return;  // not yet stale
    showStalenessWarnings(ageMs);
  }


  function showStalenessWarnings(ageMs) {
    const ageMins = Math.round(ageMs / 60000);
    const msg = `\\u26a0 Data may be outdated (entered ${ageMins} min ago) \\u2014 update from YouTube Studio`;
    // Highlight each stale card
    Object.keys(STALE_CARDS).forEach(cardId => {
      const card = document.getElementById(cardId);
      if (!card || card.classList.contains('sv-hidden')) return;
      // Only warn if the card actually has values entered
      const hasData = STALE_CARDS[cardId].some(fid => {
        const el = document.getElementById(fid);
        return el && parseFloat(el.value) > 0;
      });
      if (!hasData) return;
      // Apply red glow
      const inner = card.querySelector('.control-card') || card;
      inner.style.setProperty('box-shadow', '0 0 0 2px var(--danger), 0 0 18px rgba(239,68,68,0.3)', 'important');
      inner.style.setProperty('border-color', 'var(--danger)', 'important');
      // Add or update stale badge
      let badge = inner.querySelector('.stale-badge');
      if (!badge) {
        badge = document.createElement('div');
        badge.className = 'stale-badge';
        badge.style.cssText = 'background:var(--danger);color:#fff;font-size:10px;font-weight:700;padding:3px 8px;border-radius:4px;margin-bottom:8px;display:flex;align-items:center;gap:5px;line-height:1.4;';
        inner.insertBefore(badge, inner.firstChild);
      }
      badge.innerHTML = '\\ud83d\\udd34 ' + msg;
    });
    // Also highlight the viewsInput field directly
    const viewsEl = document.getElementById('viewsInput');
    if (viewsEl && parseFloat(viewsEl.value) > 0) {
      viewsEl.style.setProperty('border-color', 'var(--danger)', 'important');
      viewsEl.style.setProperty('box-shadow', '0 0 0 2px rgba(239,68,68,0.4)', 'important');
    }
  }


  function markDataEdited() {
    _dataLastEdited = Date.now();
    clearStalenessWarnings();
    // Reset the stale check timer
    if (_stalenessTimer) clearTimeout(_stalenessTimer);
    _stalenessTimer = setTimeout(checkStaleness, 10 * 60 * 1000 + 500); // 10min + buffer
  }


  function getAvdTarget(vlMins) {
    if (vlMins <= 1) return 80; if (vlMins <= 3) return 65; if (vlMins <= 8) return 55;
    if (vlMins <= 15) return 45; return 35;
  }


  function renderPhaseBands(score) {
    const el = document.getElementById('scorePhaseBands');
    if (!el) return;
    el.innerHTML = SCORE_PHASES.map(p => {
      const isActive = score >= p.min && score <= p.max;
      return `<div style="
        display:inline-flex;flex-direction:column;align-items:center;
        padding:6px 14px;border-radius:8px;font-size:11px;font-weight:700;
        color:${p.color};background:${p.color}18;
        border:${isActive ? `2px solid ${p.color}` : '1px solid transparent'};
        box-shadow:${isActive ? `0 0 14px ${p.color}44` : 'none'};
        transform:${isActive ? 'scale(1.06)' : 'scale(1)'};
        transition:0.2s;font-family:var(--font-mono);
      ">
        <span>${p.label}</span>
        <span style="font-size:9px;opacity:0.75;margin-top:2px;">${p.min}–${p.max}</span>
      </div>`;
    }).join('');
  }


  function updateViralityGoals(ctr, avd, vel, impr, vlMins) {
    const goals = {
      ctrGoal:  vlMins <= 3 ? '6–9%' : vlMins <= 10 ? '4–7%' : '3–6%',
      avdGoal:  vlMins <= 3 ? '60–80%' : vlMins <= 10 ? '45–60%' : '35–50%',
      velGoal:  '50–500+ views/hr in first 6h',
      imprGoal: 'Grows with CTR momentum',
      likeGoal: '2–5%',
      cmtGoal:  '0.1–1%',
    };
    const setGoal = function(inputId, text) {
      const el = document.getElementById(inputId);
      if (!el) return;
      let goalEl = document.getElementById(inputId + '_goal');
      if (!goalEl) {
        goalEl = document.createElement('div');
        goalEl.id = inputId + '_goal';
        goalEl.style.cssText = 'font-size:10px;color:var(--text-muted);margin-top:3px;';
        const parent = el.parentElement;
        if (parent) parent.appendChild(goalEl);
      }
      goalEl.textContent = '❆ Healthy: ' + text;
    };
    setGoal('ctr',              goals.ctrGoal);
    setGoal('retNum',           goals.avdGoal + ' AVD');
    setGoal('likesInput',       goals.likeGoal + ' like rate');
    setGoal('commentsInput',    goals.cmtGoal + ' comment rate');
    setGoal('viewVelocity',     goals.velGoal);
    setGoal('impressionsInput', goals.imprGoal);
  }


  function updateTab1() {
    const isNew = (document.getElementById('newVideoToggle')?.checked ?? false);
    const vlMins = parseInt(document.getElementById('vlMins')?.value || '0')||0;
    const vlSecs = parseInt(document.getElementById('vlSecs')?.value || '0')||0;
    const twMins = parseInt(document.getElementById('twMins')?.value || '0')||0;
    const twSecs = parseInt(document.getElementById('twSecs')?.value || '0')||0;
    const totalVl = (vlMins*60)+vlSecs; const totalTw = (twMins*60)+twSecs;
    const avd = totalVl > 0 ? (totalTw/totalVl)*100 : 0;
    const raw = totalTw/60;
    const ctr = parseFloat(document.getElementById('ctr')?.value || '0');
    const ret = parseFloat(document.getElementById('ret')?.value || '0');
    const views = parseFloat(document.getElementById('viewsInput')?.value || '0')||0;
    const engInput = parseFloat(document.getElementById('engInput')?.value || '0')||0;
    const eng = views > 0 ? (engInput/views)*100 : 0;
    document.getElementById('twDisplay').innerText = avd.toFixed(1)+'% AVD | '+raw.toFixed(1)+' min raw';
    document.getElementById('ctrVal').innerText = ctr.toFixed(1)+'%';
    document.getElementById('retVal').innerText = ret.toFixed(0)+'%';
    document.getElementById('engVal').innerText = eng.toFixed(1)+'% Rate';
    const targetAvd = getAvdTarget(totalVl/60);
    const ctrPts = Math.min((ctr/10)*25, 25);
    const rawPts = Math.min((raw/8)*20, 20);
    const engPts = Math.min((eng/5)*10, 10);
    let avdPts, retPts, avdMax;
    if (isNew) { document.getElementById('retGroup').style.opacity ='0.4'; retPts=0; avdMax=45; avdPts=Math.min((avd/targetAvd)*avdMax,avdMax); }
    else { document.getElementById('retGroup').style.opacity ='1'; avdMax=30; retPts=Math.min((ret/70)*15,15); avdPts=Math.min((avd/targetAvd)*avdMax,avdMax); }
    const total = (ctrPts+avdPts+retPts+rawPts+engPts).toFixed(1);
    document.getElementById('totalScore').innerText = total;
    // 6-band rating using SCORE_PHASES
    const totalNum = parseFloat(total);
    let r, c, d;
    if      (totalNum < 25) { r='⛔ Struggling';      c='#f87171'; d='Below seed-pool thresholds. Review thumbnail, title, and hook.'; }
    else if (totalNum < 45) { r='🔧 Needs Work';      c='#fb923c'; d='Some signals are weak. Focus on AVD and CTR improvements.'; }
    else if (totalNum < 60) { r='📈 Growing';         c='#fbbf24'; d='Decent performance. Consistent audience reach in your niche.'; }
    else if (totalNum < 75) { r='💪 Strong Growth';   c='#4ade80'; d='Strong metrics. Algorithm is rewarding your content well.'; }
    else if (totalNum < 90) { r='🚀 Viral Potential'; c='#22d3ee'; d='Exceptional signals. Algorithm likely pushing to non-subscribers.'; }
    else                    { r='🔥 Viral Breakout';  c='#bf5fff'; d='Top-tier metrics. Maximum algorithm amplification.'; }
    document.getElementById('ratingText').innerText = r;
    document.getElementById('ratingText').style.background = c + '22';
    document.getElementById('ratingText').style.color = c;
    document.getElementById('ratingText').style.borderColor = c;
    document.getElementById('ratingDesc').innerText = d;
    if (typeof renderPhaseBands === 'function') renderPhaseBands(totalNum);
    document.getElementById('breakdown-content').innerHTML =
      `<div><span>Packaging (CTR):</span><span>${ctrPts.toFixed(1)} pts</span></div>
       <div><span>AVD Quality:</span><span>${avdPts.toFixed(1)} pts</span></div>
       <div><span>Hook Efficiency:</span><span>${retPts.toFixed(1)} pts</span></div>
       <div><span>Session Watch Time:</span><span>${rawPts.toFixed(1)} pts</span></div>
       <div><span>Engagement Rate:</span><span>${engPts.toFixed(1)} pts</span></div>`;
    const velocity    = parseFloat(document.getElementById('viewVelocity')?.value) || 0;
    const impressions = parseFloat(document.getElementById('impressionsInput')?.value) || 0;
    const viewsCurrent = parseFloat(document.getElementById('viewsCurrent')?.value) || 0;
    const snap3hrs    = parseFloat(document.getElementById('snap3_hours')?.value) || 0;
    const likesInput  = parseFloat(document.getElementById('likesInput')?.value) || 0;
    const commentsInput = parseFloat(document.getElementById('commentsInput')?.value) || 0;
    const rawMins     = (totalVl > 0) ? (totalTw / 60) : 0;

    let hoursOld = null;
    const pubEl = document.getElementById('videoPublishedAt');
    if (pubEl && pubEl.value) {
      const pub = new Date(pubEl.value);
      if (!isNaN(pub.getTime())) hoursOld = (Date.now() - pub.getTime()) / 3600000;
    }

    const scenarioBox = document.getElementById('scenarioProjBox');
    const scenarioEmpty = document.getElementById('scenario_empty');
    if (scenarioBox && velocity > 0) {
      const signalStrength = (ctr >= 6 && avd >= 50) ? 'strong'
                           : (ctr >= 4 && avd >= 40) ? 'moderate' : 'weak';

      // baseViews: current total, or estimate from velocity×age if views not entered
      const baseViews = views > 0 ? views
                      : (velocity > 0 && hoursOld > 0 ? Math.round(velocity * hoursOld) : 0);

      // Projection model: cumulative views using log-integral of power-law decay
      // V_new = vel * (24/alpha) * ln(1 + alpha * T_hours/24)
      // This correctly accumulates views over the entire window (more time = more views)
      // alpha controls how fast velocity decays: low = sustained, high = quick stall
      function projViews(vel, hrsAhead, alpha) {
        if (hrsAhead <= 0 || vel <= 0) return baseViews;
        const newViews = alpha > 0
          ? vel * (24 / alpha) * Math.log(1 + alpha * hrsAhead / 24)
          : vel * hrsAhead;  // alpha=0 = constant velocity (no decay)
        return Math.round(baseViews + newViews);
      }

      // Watch hours from projected new views: new_views × avg_minutes / 60
      // rawMins = totalTw / 60 (the actual per-viewer average minutes watched)
      function projWatchHrs(projectedTotal) {
        if (rawMins <= 0) return null;
        const newViews = Math.max(0, projectedTotal - baseViews);
        return (newViews * rawMins / 60);
      }

      // Velocity modifiers per scenario
      const velBest     = velocity * (signalStrength === 'strong' ? 1.35 : signalStrength === 'moderate' ? 1.15 : 0.95);
      const velExpected = velocity;
      const velWorst    = velocity * 0.20;  // push stalls to ~20% of current

      // Decay rates (alpha): how quickly velocity decays per 24h
      // Low alpha = sustained push; high alpha = rapid decline
      const alphaBest     = signalStrength === 'strong' ? 0.3 : 0.5;   // slow decay
      const alphaExpected = signalStrength === 'strong' ? 0.8 : signalStrength === 'moderate' ? 1.1 : 1.4;
      const alphaWorst    = 3.5;  // rapid stall — most views in first few hours

      // Window-level alpha adjustments to model long-tail natural decay
      function windowAlpha(base, hrs) {
        if (hrs > 336) return base + 0.4;    // 14d+: some additional long-tail suppression
        if (hrs > 168) return base + 0.2;    // 7–14d
        return base;
      }

      const scenarios = [
        { id:'worst',    label:'📉 Worst',   vel:velWorst,    alpha:alphaWorst,    color:'#f87171',
          desc:'Algorithm stalls quickly. ~80% velocity loss. Organic long-tail only.' },
        { id:'expected', label:'📊 Expected', vel:velExpected, alpha:alphaExpected, color:'#fbbf24',
          desc:'Natural decay after initial push winds down. Most videos follow this.' },
        { id:'best',     label:'🚀 Best',     vel:velBest,     alpha:alphaBest,     color:'#4ade80',
          desc:'Algorithm sustains or builds the push. Browse + Suggested hold strong.' },
      ];

      const windows = [
        { id:'w48h', label:'48h',    hrs: 48  },
        { id:'w3d',  label:'3d',     hrs: 72  },
        { id:'w4d',  label:'4d',     hrs: 96  },
        { id:'w5d',  label:'5d',     hrs: 120 },
        { id:'w6d',  label:'6d',     hrs: 144 },
        { id:'w7d',  label:'7d',     hrs: 168 },
        { id:'w14d', label:'14d',    hrs: 336 },
        { id:'w21d', label:'21d',    hrs: 504 },
        { id:'w28d', label:'28d',    hrs: 672 },
      ];

      // Pre-compute all projections
      const projData = {};
      scenarios.forEach(sc => {
        projData[sc.id] = {};
        windows.forEach(w => {
          const hrsAhead = Math.max(0, w.hrs - (hoursOld || 0));
          const alpha    = windowAlpha(sc.alpha, w.hrs);
          const totalV   = projViews(sc.vel, hrsAhead, alpha);
          const wh       = projWatchHrs(totalV);
          projData[sc.id][w.id] = { views: totalV, wh };
        });
      });

      // ── Toggle state — stored on the DOM element to survive updateTab1 re-runs ──
      // We store on the scenarioBox element itself so it survives innerHTML overwrites
      // by reading BEFORE we overwrite, not after.
      const prevToggles = scenarioBox._scenToggles;
      const activeSc  = (prevToggles && prevToggles.sc)  || ['worst','expected','best'];
      const activeWin = (prevToggles && prevToggles.win) || ['w48h','w7d','w14d','w28d'];
      const visScen = scenarios.filter(s => activeSc.includes(s.id));
      const visWin  = windows.filter(w => activeWin.includes(w.id));

      // Signal badge + age info
      const signalBadge = signalStrength === 'strong'
        ? '<span style="background:#4ade8022;color:#4ade80;border:1px solid #4ade80;font-size:10px;padding:2px 8px;border-radius:10px;font-weight:700;">Strong Signals</span>'
        : signalStrength === 'moderate'
        ? '<span style="background:#fbbf2422;color:#fbbf24;border:1px solid #fbbf24;font-size:10px;padding:2px 8px;border-radius:10px;font-weight:700;">Moderate Signals</span>'
        : '<span style="background:#f8717122;color:#f87171;border:1px solid #f87171;font-size:10px;padding:2px 8px;border-radius:10px;font-weight:700;">Weak Signals</span>';
      const ageNote = hoursOld !== null
        ? `<span style="font-size:10px;color:var(--text-dim);">${hoursOld.toFixed(1)}h old &middot; ${velocity.toFixed(1)} views/hr &middot; base ${baseViews.toLocaleString()} views</span>`
        : `<span style="font-size:10px;color:var(--text-dim);">${velocity.toFixed(1)} views/hr &middot; ${baseViews.toLocaleString()} base views</span>`;

      // Build toggle button HTML — uses data-active for visual state only
      const scToggleHTML = scenarios.map(sc => {
        const on = activeSc.includes(sc.id);
        const bg = on ? `${sc.color}28` : 'var(--card)';
        const border = on ? sc.color : 'var(--border-hi)';
        const col = on ? sc.color : 'var(--text-dim)';
        return `<button data-scen-id="${sc.id}" data-scen-type="sc"
          style="padding:5px 14px;border-radius:20px;font-size:11px;font-weight:700;cursor:pointer;
            border:1.5px solid ${border};background:${bg};color:${col};transition:0.15s;"
        >${sc.label}</button>`;
      }).join('');

      const winToggleHTML = windows.map(w => {
        const on = activeWin.includes(w.id);
        const border = on ? 'var(--primary)' : 'var(--border-hi)';
        const bg = on ? 'var(--primary-dim)' : 'var(--card)';
        const col = on ? 'var(--primary)' : 'var(--text-dim)';
        return `<button data-scen-id="${w.id}" data-scen-type="win"
          style="padding:3px 10px;border-radius:14px;font-size:10px;font-weight:600;cursor:pointer;
            border:1px solid ${border};background:${bg};color:${col};transition:0.15s;"
        >${w.label}</button>`;
      }).join('');

      // Table HTML
      const showWH = rawMins > 0;
      const tableHTML = visScen.length > 0 && visWin.length > 0 ? `
        <div style="overflow-x:auto;margin-top:10px;">
          <table style="border-collapse:collapse;width:100%;font-size:11px;">
            <thead>
              <tr>
                <th style="padding:6px 10px;text-align:left;color:var(--text-dim);font-size:10px;text-transform:uppercase;letter-spacing:0.5px;border-bottom:1px solid var(--border);white-space:nowrap;min-width:110px;"></th>
                ${visWin.map(w => `<th colspan="${showWH ? 2 : 1}" style="padding:6px 6px;text-align:center;color:var(--primary);font-size:10px;font-weight:700;text-transform:uppercase;border-bottom:1px solid var(--border);white-space:nowrap;">${w.label}</th>`).join('')}
              </tr>
              ${showWH ? `<tr>
                <th style="padding:3px 10px;border-bottom:1px solid var(--border);"></th>
                ${visWin.map(() => `
                  <th style="padding:3px 5px;text-align:center;font-size:9px;color:var(--text-muted);font-weight:600;border-bottom:1px solid var(--border);">Views</th>
                  <th style="padding:3px 5px;text-align:center;font-size:9px;color:var(--text-muted);font-weight:600;border-bottom:1px solid var(--border);">Watch hrs</th>
                `).join('')}
              </tr>` : ''}
            </thead>
            <tbody>
              ${visScen.map((sc, ri) => {
                const rowBg = ri % 2 === 0 ? 'transparent' : 'var(--card2)';
                return `<tr style="background:${rowBg}">
                  <td style="padding:9px 10px;border-bottom:1px solid var(--border);">
                    <div style="font-size:12px;font-weight:800;color:${sc.color};">${sc.label}</div>
                    <div style="font-size:9px;color:var(--text-muted);margin-top:2px;line-height:1.3;max-width:160px;">${sc.desc}</div>
                  </td>
                  ${visWin.map(w => {
                    const d = projData[sc.id][w.id];
                    const isPast = (hoursOld || 0) >= w.hrs;
                    const vColor = isPast ? 'var(--text-muted)' : sc.color;
                    const viewsStr = isPast ? `<div style="font-size:11px;color:var(--text-muted);">past</div>` : `<div style="font-size:12px;font-weight:800;color:${vColor};">${d.views.toLocaleString()}</div>`;
                    const whStr = showWH
                      ? (isPast
                          ? `<td style="padding:9px 5px;text-align:center;border-bottom:1px solid var(--border);"><div style="font-size:11px;color:var(--text-muted);">—</div></td>`
                          : `<td style="padding:9px 5px;text-align:center;border-bottom:1px solid var(--border);"><div style="font-size:12px;font-weight:700;color:${sc.color};">${d.wh != null ? d.wh.toFixed(1) : '—'}</div></td>`)
                      : '';
                    return `<td style="padding:9px 5px;text-align:center;border-bottom:1px solid var(--border);">${viewsStr}</td>${whStr}`;
                  }).join('')}
                </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>` : `<div style="padding:10px 0;font-size:12px;color:var(--text-muted);">Select at least one scenario and one time window.</div>`;

      scenarioBox.style.display = 'block';
      if (scenarioEmpty) scenarioEmpty.style.display = 'none';
      scenarioBox.innerHTML = `<div style="background:var(--card);border:1px solid var(--border-hi);border-radius:var(--radius);padding:14px;">
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:10px;">
          ${signalBadge} ${ageNote}
        </div>
        <div style="margin-bottom:8px;">
          <div style="font-size:10px;color:var(--text-dim);font-weight:700;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:5px;">Scenarios</div>
          <div id="_scen_sc_btns" style="display:flex;gap:6px;flex-wrap:wrap;">${scToggleHTML}</div>
        </div>
        <div style="margin-bottom:6px;">
          <div style="font-size:10px;color:var(--text-dim);font-weight:700;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:5px;">Time windows</div>
          <div id="_scen_win_btns" style="display:flex;gap:5px;flex-wrap:wrap;">${winToggleHTML}</div>
        </div>
        ${tableHTML}
        <div style="font-size:9px;color:var(--text-muted);margin-top:8px;border-top:1px solid var(--border);padding-top:6px;line-height:1.6;">
          Cumulative totals from current position. Decay model: α ${alphaBest.toFixed(1)} best · ${alphaExpected.toFixed(1)} expected · ${alphaWorst.toFixed(1)} worst.${showWH ? ` Watch hrs use ${rawMins.toFixed(1)} min avg per view.` : ' Enter avg time watched for watch hour projections.'}
        </div>
      </div>`;

      // Store toggle state on the DOM node so it survives re-renders
      scenarioBox._scenToggles = { sc: activeSc.slice(), win: activeWin.slice() };

      // Wire toggle buttons via event delegation on scenarioBox
      scenarioBox.addEventListener('click', function _scenClick(e) {
        const btn = e.target.closest('[data-scen-id][data-scen-type]');
        if (!btn) return;
        const type = btn.dataset.scenType;
        const id   = btn.dataset.scenId;
        const ts   = scenarioBox._scenToggles || { sc:['worst','expected','best'], win:['w48h','w7d','w14d','w28d'] };
        const arr  = type === 'sc' ? ts.sc : ts.win;
        const i    = arr.indexOf(id);
        if (i === -1) { arr.push(id); }
        else if (arr.length > 1) { arr.splice(i, 1); }
        scenarioBox._scenToggles = ts;
        // Re-render: rebuild just the visible parts without calling full updateTab1
        // to avoid the DOM-reading loop bug
        const updBtn = scenarioBox.querySelectorAll('[data-scen-id][data-scen-type]');
        updBtn.forEach(b => {
          const bType = b.dataset.scenType;
          const bId   = b.dataset.scenId;
          const bArr  = bType === 'sc' ? ts.sc : ts.win;
          const isOn  = bArr.includes(bId);
          const sc    = scenarios.find(x => x.id === bId);
          const col   = sc ? sc.color : 'var(--primary)';
          if (bType === 'sc') {
            b.style.background = isOn ? `${col}28` : 'var(--card)';
            b.style.borderColor = isOn ? col : 'var(--border-hi)';
            b.style.color = isOn ? col : 'var(--text-dim)';
          } else {
            b.style.background = isOn ? 'var(--primary-dim)' : 'var(--card)';
            b.style.borderColor = isOn ? 'var(--primary)' : 'var(--border-hi)';
            b.style.color = isOn ? 'var(--primary)' : 'var(--text-dim)';
          }
        });
        // Re-render table only
        const newVisSc  = scenarios.filter(s => ts.sc.includes(s.id));
        const newVisWin = windows.filter(w => ts.win.includes(w.id));
        const newTable  = newVisSc.length > 0 && newVisWin.length > 0
          ? (() => {
              const inner = newVisSc.map((sc2, ri) => {
                const rowBg = ri % 2 === 0 ? 'transparent' : 'var(--card2)';
                return '<tr style="background:' + rowBg + '">' +
                  '<td style="padding:9px 10px;border-bottom:1px solid var(--border);">' +
                    '<div style="font-size:12px;font-weight:800;color:' + sc2.color + ';">' + sc2.label + '</div>' +
                    '<div style="font-size:9px;color:var(--text-muted);margin-top:2px;line-height:1.3;max-width:160px;">' + sc2.desc + '</div>' +
                  '</td>' +
                  newVisWin.map(w2 => {
                    const d2 = projData[sc2.id][w2.id];
                    const isPast2 = (hoursOld || 0) >= w2.hrs;
                    const vC = isPast2 ? 'var(--text-muted)' : sc2.color;
                    const vStr = isPast2
                      ? '<div style="font-size:11px;color:var(--text-muted);">past</div>'
                      : '<div style="font-size:12px;font-weight:800;color:' + vC + ';">' + d2.views.toLocaleString() + '</div>';
                    const whC = showWH
                      ? (isPast2
                          ? '<td style="padding:9px 5px;text-align:center;border-bottom:1px solid var(--border);"><div style="font-size:11px;color:var(--text-muted);">—</div></td>'
                          : '<td style="padding:9px 5px;text-align:center;border-bottom:1px solid var(--border);"><div style="font-size:12px;font-weight:700;color:' + sc2.color + ';">' + (d2.wh != null ? d2.wh.toFixed(1) : '—') + '</div></td>')
                      : '';
                    return '<td style="padding:9px 5px;text-align:center;border-bottom:1px solid var(--border);">' + vStr + '</td>' + whC;
                  }).join('') +
                '</tr>';
              }).join('');
              return '<div style="overflow-x:auto;margin-top:10px;"><table style="border-collapse:collapse;width:100%;font-size:11px;"><thead><tr>' +
                '<th style="padding:6px 10px;text-align:left;color:var(--text-dim);font-size:10px;text-transform:uppercase;border-bottom:1px solid var(--border);min-width:110px;"></th>' +
                newVisWin.map(w2 => '<th colspan="' + (showWH ? 2 : 1) + '" style="padding:6px 6px;text-align:center;color:var(--primary);font-size:10px;font-weight:700;text-transform:uppercase;border-bottom:1px solid var(--border);white-space:nowrap;">' + w2.label + '</th>').join('') +
                '</tr>' + (showWH ? '<tr><th style="border-bottom:1px solid var(--border);"></th>' + newVisWin.map(() => '<th style="padding:3px 5px;text-align:center;font-size:9px;color:var(--text-muted);font-weight:600;border-bottom:1px solid var(--border);">Views</th><th style="padding:3px 5px;text-align:center;font-size:9px;color:var(--text-muted);font-weight:600;border-bottom:1px solid var(--border);">Watch hrs</th>').join('') + '</tr>' : '') +
                '</thead><tbody>' + inner + '</tbody></table></div>';
            })()
          : '<div style="padding:10px 0;font-size:12px;color:var(--text-muted);">Select at least one scenario and one time window.</div>';
        // Replace table in DOM
        const existingTable = scenarioBox.querySelector('table');
        const noTableMsg    = scenarioBox.querySelector('.no-scen-msg');
        const tableWrapper  = existingTable ? existingTable.closest('div[style*="overflow-x"]') : noTableMsg;
        if (tableWrapper) {
          tableWrapper.outerHTML = newTable;
        } else {
          scenarioBox.querySelector('[style*="border-top:1px"]')?.insertAdjacentHTML('beforebegin', newTable);
        }
      }, { once: false });

    } else if (scenarioBox) {
      scenarioBox.style.display = 'none';
      if (scenarioEmpty) scenarioEmpty.style.display = 'block';
    }
    // ── Hook Analysis ──────────────────────────────────────────────
    const hookScoreEl = document.getElementById('hookScore');
    if (hookScoreEl) {
      const retVal = ret; // 30s hook retention %
      let hookMsg = '', hookCol = 'var(--text-dim)';
      if (retVal >= 75) { hookMsg = '🔥 Exceptional hook — 75%+ of viewers clearing 30s triggers strong push signal.'; hookCol = '#bf5fff'; }
      else if (retVal >= 60) { hookMsg = '✅ Strong hook — solid 30s retention. Algorithm rewards this with wider distribution.'; hookCol = '#4ade80'; }
      else if (retVal >= 45) { hookMsg = '📊 Average hook — room to improve opening. Test pattern interrupts in first 5 seconds.'; hookCol = '#22d3ee'; }
      else if (retVal >= 30) { hookMsg = '⚠️ Weak hook — nearly half of viewers leaving before 30s. Rethink the opening.'; hookCol = '#fbbf24'; }
      else if (retVal > 0)   { hookMsg = '🚨 Poor hook — critical drop before 30s. Algorithm will suppress distribution.'; hookCol = '#f87171'; }
      hookScoreEl.innerHTML = hookMsg ? `<div style="font-size:11px;color:${hookCol};padding:6px 8px;background:${hookCol}14;border-radius:5px;margin-top:4px;">${hookMsg}</div>` : '';
    }

    // ── Channel Context ─────────────────────────────────────────────
    const channelScoreEl = document.getElementById('channelScore');
    if (channelScoreEl) {
      const subs = parseFloat(document.getElementById('channelSubs')?.value)||0;
      const avgVid = parseFloat(document.getElementById('avgViewsPerUpload')?.value)||0;
      const subsGained = parseFloat(document.getElementById('subsGained')?.value)||0;
      if (subs > 0 || avgVid > 0) {
        const viewRatio = avgVid > 0 && subs > 0 ? avgVid/subs*100 : 0;
        const subConvRate = views > 0 && subsGained > 0 ? subsGained/views*100 : 0;
        let msgs = [];
        if (viewRatio > 0) {
          if (viewRatio >= 30) msgs.push('✅ Strong channel pull — ' + viewRatio.toFixed(0) + '% of subs watching per upload');
          else if (viewRatio >= 10) msgs.push('📊 Average reach — ' + viewRatio.toFixed(0) + '% of subs per upload');
          else msgs.push('⚠️ Low subscriber pull — only ' + viewRatio.toFixed(0) + '% of subs watching');
        }
        if (subConvRate > 0) msgs.push('Sub conversion: ' + subConvRate.toFixed(2) + '% of viewers subscribed');
        const col = viewRatio >= 30 ? '#4ade80' : viewRatio >= 10 ? '#22d3ee' : '#fbbf24';
        channelScoreEl.innerHTML = msgs.length ? `<div style="font-size:11px;color:${col};padding:6px 8px;background:${col}14;border-radius:5px;margin-top:4px;">${msgs.join(' · ')}</div>` : '';
      } else {
        channelScoreEl.innerHTML = '';
      }
    }


    // ── Stall Detection ─────────────────────────────────────────────
    const v1 = parseFloat(document.getElementById('views24h')?.value)||0;
    const t1h = parseFloat(document.getElementById('snap1_hours')?.value)||0;
    const v2 = parseFloat(document.getElementById('views48h')?.value)||0;
    const t2h = parseFloat(document.getElementById('snap2_hours')?.value)||0;
    const v3 = parseFloat(document.getElementById('viewsCurrent')?.value)||0;
    const t3h = parseFloat(document.getElementById('snap3_hours')?.value)||0;
    const stallEl = document.getElementById('stallAnalysis');
    if (stallEl) {
      const snap2valid = v1 > 0 && v2 > 0;
      const snap3valid = snap2valid && v3 > 0;
      if (snap2valid) {
        stallEl.style.display = 'block';
        const rate12 = t1h > 0 && t2h > t1h ? (v2 - v1) / (t2h - t1h) : 0;
        const rate13 = snap3valid && t3h > t2h ? (v3 - v2) / (t3h - t2h) : 0;
        const pct = rate12 > 0 && snap3valid ? ((rate13 - rate12) / rate12) * 100 : 0;
        let stallMsg = '', stallColor = 'var(--text-dim)';
        if (snap3valid && pct < -50) { stallMsg = '⚠️ Velocity dropping fast (' + pct.toFixed(0) + '%). Push may be stalling.'; stallColor = '#f87171'; }
        else if (snap3valid && pct < -20) { stallMsg = '📉 Slight velocity dip (' + pct.toFixed(0) + '%). Monitor closely.'; stallColor = '#fbbf24'; }
        else if (snap3valid && pct >= 0)  { stallMsg = '✅ Velocity holding or growing (' + (pct > 0 ? '+' : '') + pct.toFixed(0) + '%). Algorithm push sustained.'; stallColor = '#4ade80'; }
        else if (!snap3valid) { stallMsg = '📊 Add a 3rd snapshot to see velocity trend.'; stallColor = 'var(--text-dim)'; }
        stallEl.innerHTML = stallMsg ? '<div style="background:var(--card2);border-left:3px solid ' + stallColor + ';border-radius:6px;padding:9px 12px;font-size:12px;color:' + stallColor + ';margin-top:8px;">' + stallMsg + '</div>' : '';
      } else { stallEl.style.display = 'none'; }
    }

    // ── CTR Contextual Feedback ──────────────────────────────────────
    const ctrInsightEl = document.getElementById('ctrInsight');
    if (ctrInsightEl) {
      let ctrMsg = '', ctrCol = 'var(--text-dim)';
      if (ctr >= 8)       { ctrMsg = '🔥 Exceptional CTR — thumbnail + title are performing at top 5% of the platform.'; ctrCol = '#bf5fff'; }
      else if (ctr >= 6)  { ctrMsg = '✅ Strong CTR — algorithm will continue serving to Browse & Suggested.'; ctrCol = '#4ade80'; }
      else if (ctr >= 4)  { ctrMsg = '📊 Solid CTR — normal range. Room to test bolder thumbnails.'; ctrCol = '#22d3ee'; }
      else if (ctr >= 2)  { ctrMsg = '⚠️ Below-average CTR — thumbnail/title may need testing. Algorithm push will be limited.'; ctrCol = '#fbbf24'; }
      else if (ctr > 0)   { ctrMsg = '🚨 Low CTR — algorithm is suppressing distribution. Prioritise thumbnail redesign.'; ctrCol = '#f87171'; }
      ctrInsightEl.innerHTML = ctrMsg ? '<div style="font-size:11px;color:' + ctrCol + ';padding:6px 8px;background:' + ctrCol + '14;border-radius:5px;margin-top:4px;">' + ctrMsg + '</div>' : '';
    }

    // ── AVD Contextual Feedback ──────────────────────────────────────
    const avdInsightEl = document.getElementById('avdInsight');
    if (avdInsightEl) {
      let avdMsg = '', avdCol = 'var(--text-dim)';
      const avdGap = avd - targetAvd;
      if (avd >= targetAvd * 1.2)     { avdMsg = '🔥 Outstanding AVD — viewers love this video. Algorithm rewards this heavily.'; avdCol = '#bf5fff'; }
      else if (avd >= targetAvd)       { avdMsg = '✅ Good AVD — above benchmark for this video length. Healthy satisfaction signal.'; avdCol = '#4ade80'; }
      else if (avd >= targetAvd * 0.8) { avdMsg = '📊 Acceptable AVD — slightly below benchmark. Consider stronger hooks at key drop-off points.'; avdCol = '#fbbf24'; }
      else if (avd > 0)                { avdMsg = '⚠️ Low AVD — viewers are leaving early. Check audience retention graph for cliff points.'; avdCol = '#f87171'; }
      avdInsightEl.innerHTML = avdMsg ? '<div style="font-size:11px;color:' + avdCol + ';padding:6px 8px;background:' + avdCol + '14;border-radius:5px;margin-top:4px;">' + avdMsg + '</div>' : '';
    }

    // ── Engagement Contextual Feedback ───────────────────────────────
    const engInsightEl = document.getElementById('engInsight');
    if (engInsightEl) {
      let engMsg = '', engCol = 'var(--text-dim)';
      if (eng >= 6)      { engMsg = '🔥 Viral engagement — comment velocity will trigger Trending/Community signals.'; engCol = '#bf5fff'; }
      else if (eng >= 4) { engMsg = '✅ Strong engagement — audience is actively invested in the content.'; engCol = '#4ade80'; }
      else if (eng >= 2) { engMsg = '📊 Normal engagement for the niche. Encourage community interaction in CTA.'; engCol = '#22d3ee'; }
      else if (eng > 0)  { engMsg = '⚠️ Low engagement — try stronger CTAs and end-screen questions.'; engCol = '#fbbf24'; }
      engInsightEl.innerHTML = engMsg ? '<div style="font-size:11px;color:' + engCol + ';padding:6px 8px;background:' + engCol + '14;border-radius:5px;margin-top:4px;">' + engMsg + '</div>' : '';
    }

    // ── Retention Detail ─────────────────────────────────────────────
    const retDetailEl = document.getElementById('retentionDetail');
    if (retDetailEl) {
      const midRet  = parseFloat(document.getElementById('midRetention')?.value)||0;
      const endRet  = parseFloat(document.getElementById('endRetention')?.value)||0;
      const cardCtr = parseFloat(document.getElementById('cardCtr')?.value)||0;
      const rewatch = parseFloat(document.getElementById('rewatchRate')?.value)||0;
      let retHtml = '';
      if (midRet > 0) {
        const col = midRet >= 50 ? '#4ade80' : midRet >= 35 ? '#fbbf24' : '#f87171';
        retHtml += '<div style="font-size:11px;margin-bottom:4px;">Mid-video retention: <strong style="color:' + col + ';">' + midRet.toFixed(1) + '%</strong> — ' + (midRet >= 50 ? 'excellent hook maintenance' : midRet >= 35 ? 'typical mid-drop' : 'significant drop-off, add re-hook') + '</div>';
      }
      if (endRet > 0) {
        const col = endRet >= 30 ? '#4ade80' : endRet >= 15 ? '#fbbf24' : '#f87171';
        retHtml += '<div style="font-size:11px;margin-bottom:4px;">End-screen retention: <strong style="color:' + col + ';">' + endRet.toFixed(1) + '%</strong> — ' + (endRet >= 30 ? 'strong completion signal' : endRet >= 15 ? 'average completion' : 'most viewers leave early') + '</div>';
      }
      if (cardCtr > 0) {
        const col = cardCtr >= 2 ? '#4ade80' : '#fbbf24';
        retHtml += '<div style="font-size:11px;margin-bottom:4px;">Card CTR: <strong style="color:' + col + ';">' + cardCtr.toFixed(1) + '%</strong> — ' + (cardCtr >= 2 ? 'cards are converting' : 'consider repositioning cards') + '</div>';
      }
      retDetailEl.innerHTML = retHtml ? '<div style="background:var(--card2);border-radius:6px;padding:10px 12px;margin-top:8px;">' + retHtml + '</div>' : '';
    }


    if (typeof updateViralityGoals === "function") updateViralityGoals(ctr,avd,velocity,impressions,totalVl/60);

        updateYTSubProjection();
  }
