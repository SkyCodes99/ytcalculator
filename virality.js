/* ═══════════════════════════════════════════
   THE SOCIAL SPOT — virality.js
   Virality Checker + Phase Bands
═══════════════════════════════════════════ */

/* Score phases with thresholds */
const SCORE_PHASES = [
  { label:'🔴 Needs Work',     min:0,  max:39,  color:'#f87171', desc:'Below seed-pool thresholds. Review thumbnail, title, and hook.' },
  { label:'🟡 Growing',        min:40, max:54,  color:'#fb923c', desc:'Starting to gain algorithmic traction. CTR or AVD needs improvement.' },
  { label:'🟢 Strong Growth',  min:55, max:74,  color:'#fbbf24', desc:'Consistent niche reach. The algorithm is distributing to targeted viewers.' },
  { label:'🚀 Viral Potential',min:75, max:89,  color:'#4ade80', desc:'Exceptional metrics. Distribution likely expanding to non-subscribers.' },
  { label:'🔥 Viral Breakout', min:90, max:100, color:'#6366f1', desc:'Top 5% performance. Algorithm pushing aggressively to browse and home feed.' },
];

function getAvdTarget(vlMins) {
  if (vlMins <= 1)  return 80;
  if (vlMins <= 3)  return 65;
  if (vlMins <= 8)  return 55;
  if (vlMins <= 15) return 45;
  return 35;
}

function calcEngRate() {
  const v = parseFloat(document.getElementById('viewsInput')?.value)||0;
  const e = parseFloat(document.getElementById('engInput')?.value)||0;
  const rate = v > 0 ? (e/v)*100 : 0;
  const sl = document.getElementById('engSlider'); if(sl) sl.value = Math.min(10, rate);
}
function syncEngSlider() {
  const val = parseFloat(document.getElementById('engSlider')?.value)||0;
  const ev = document.getElementById('engVal'); if(ev) ev.textContent = val.toFixed(1)+'%';
}

function updateTab1() {
  const isNew = document.getElementById('newVideoToggle')?.checked || false;
  const vlMins = parseInt(document.getElementById('vlMins')?.value)||0;
  const vlSecs = parseInt(document.getElementById('vlSecs')?.value)||0;
  const twMins = parseInt(document.getElementById('twMins')?.value)||0;
  const twSecs = parseInt(document.getElementById('twSecs')?.value)||0;
  const totalVl = vlMins*60 + vlSecs;
  const totalTw = twMins*60 + twSecs;
  const avd  = totalVl > 0 ? (totalTw/totalVl)*100 : 0;
  const raw  = totalTw / 60;
  const ctr  = parseFloat(document.getElementById('ctr')?.value)  || 0;
  const ret  = parseFloat(document.getElementById('ret')?.value)  || 0;
  const engPct = parseFloat(document.getElementById('engSlider')?.value) || 0;

  const set = (id, v) => { const e=document.getElementById(id); if(e) e.textContent=v; };
  set('twDisplay', avd.toFixed(1)+'% AVD | '+raw.toFixed(1)+' min raw');
  set('ctrVal', ctr.toFixed(1)+'%');
  set('retVal', ret.toFixed(0)+'%');
  set('engVal', engPct.toFixed(1)+'%');

  const targetAvd = getAvdTarget(totalVl/60);
  const ctrPts = Math.min((ctr/10)*25, 25);
  const rawPts = Math.min((raw/8)*20, 20);
  const engPts = Math.min((engPct/5)*10, 10);
  let avdPts, retPts, avdMax;

  if (isNew) {
    const rg = document.getElementById('retGroup'); if(rg) rg.style.opacity='0.4';
    retPts=0; avdMax=45; avdPts=Math.min((avd/targetAvd)*avdMax, avdMax);
  } else {
    const rg = document.getElementById('retGroup'); if(rg) rg.style.opacity='1';
    avdMax=30; retPts=Math.min((ret/70)*15, 15); avdPts=Math.min((avd/targetAvd)*avdMax, avdMax);
  }

  const total = parseFloat((ctrPts+avdPts+retPts+rawPts+engPts).toFixed(1));
  set('totalScore', total.toFixed(0));

  // Determine phase
  const phase = SCORE_PHASES.find(p => total >= p.min && total <= p.max) || SCORE_PHASES[0];
  const rt = document.getElementById('ratingText');
  const rd = document.getElementById('ratingDesc');
  if (rt) { rt.textContent = phase.label; rt.style.color = phase.color; }
  if (rd) rd.textContent = phase.desc;

  // Phase bands display
  renderPhaseBands(total);

  // Metric bars
  const maxMap = { ctr:25, avd:avdMax, hook:isNew?15:25, raw:20, eng:10 };
  const scored = { ctr:ctrPts, avd:avdPts, hook:retPts, raw:rawPts, eng:engPts };
  ['ctr','avd','hook','raw','eng'].forEach(k => {
    const b = document.getElementById('bar-'+k);
    const p = document.getElementById('pts-'+k);
    if (b) b.style.width = (maxMap[k]>0 ? (scored[k]/maxMap[k])*100 : 0)+'%';
    if (p) p.textContent = scored[k].toFixed(1)+' pts';
  });

  if (typeof updateYTSubProjection === 'function') updateYTSubProjection();
  adminLog('info', `Virality score calculated: ${total}`);
}

function renderPhaseBands(score) {
  const el = document.getElementById('scorePhaseBands'); if (!el) return;
  el.innerHTML = SCORE_PHASES.map(p => {
    const isActive = score >= p.min && score <= p.max;
    return `<div class="phase-chip${isActive?' active-phase':''}"
              style="color:${p.color};background:${p.color}18;${isActive?`border-color:${p.color};`:''}">
      <span>${p.label}</span>
      <span class="phase-range">${p.min}–${p.max}</span>
    </div>`;
  }).join('');
}

/* ─── Sub Projections ─── */
function buildSubProjectionHTML(curr, monthly, rate, currency) {
  const mNew = monthly*(rate/100);
  return [1,3,6,9,12].map(m => {
    const val = Math.round(curr + mNew*m);
    return `<div class="stat-card">
      <div class="stat-label">${m===1?'1 Month':m+' Months'}</div>
      <div class="stat-value" style="font-size:19px;color:var(--primary)">${val.toLocaleString()}</div>
      <div class="stat-sub">${currency}</div>
    </div>`;
  }).join('');
}
function updateYTSubProjection() {
  const c=parseInt(document.getElementById('yt_curr_subs')?.value)||0;
  const m=parseInt(document.getElementById('yt_monthly_views')?.value)||0;
  const r=parseFloat(document.getElementById('yt_sub_rate')?.value)||1;
  const el=document.getElementById('yt_sub_projection'); if(el) el.innerHTML=buildSubProjectionHTML(c,m,r,'subscribers');
}
function updateTTSubProjection() {
  const c=parseInt(document.getElementById('tt_curr_subs')?.value)||0;
  const m=parseInt(document.getElementById('tt_monthly_views')?.value)||0;
  const r=parseFloat(document.getElementById('tt_follow_rate')?.value)||2;
  const el=document.getElementById('tt_sub_projection'); if(el) el.innerHTML=buildSubProjectionHTML(c,m,r,'followers');
}
function updateIGSubProjection() {
  const c=parseInt(document.getElementById('ig_curr_subs')?.value)||0;
  const m=parseInt(document.getElementById('ig_monthly_views')?.value)||0;
  const r=parseFloat(document.getElementById('ig_follow_rate')?.value)||1.5;
  const el=document.getElementById('ig_sub_projection'); if(el) el.innerHTML=buildSubProjectionHTML(c,m,r,'followers');
}

/* ─── Algorithm Tracker ─── */
function updateTab2() {
  const vlMins = parseInt(document.getElementById('t2_vlMins')?.value)||10;
  const baseAvd = getAvdTarget(vlMins);
  const tiers = [
    { name:'Subscriber Seed Pool', range:'Initial test', color:'var(--text-dim)', c:'4–8', m:1.15, d:'Shown first to existing subscribers.', goal:'Impress your most loyal viewers first.' },
    { name:'Niche Broadening',     range:'1K–10K',       color:'var(--secondary)', c:'3–6', m:1.05, d:'Served to viewers with matching watch history.', goal:'Maintain watch time as audience widens.' },
    { name:'Suggested / Browse',   range:'10K–50K',      color:'var(--warning)',   c:'2–5', m:0.95, d:'Competing for sidebar and Browse Feature.', goal:'Win the thumbnail/title battle.' },
    { name:'Home Feed Expansion',  range:'50K–200K',     color:'var(--primary)',   c:'2–4', m:0.85, d:'Home page push to casual viewers.', goal:'Keep casual viewers watching long enough.' },
    { name:'Broad Viral Push',     range:'200K–1M+',     color:'var(--success)',   c:'1.5–3', m:0.75, d:'Mass audience — universally accessible content only.', goal:'Prove universal appeal.' },
  ];
  const grid = document.getElementById('tierGrid'); if (!grid) return;
  grid.innerHTML = tiers.map(t => `
    <div class="tier-card" style="border-top-color:${t.color};">
      <div class="tier-name" style="color:${t.color};">${t.name}</div>
      <div class="tier-range">${t.range}</div>
      <div class="tier-req"><span>CTR Range</span><span style="color:${t.color};font-weight:700;">${t.c}%</span></div>
      <div class="tier-req"><span>Required AVD</span><span style="color:${t.color};font-weight:700;">${Math.min(baseAvd*t.m,100).toFixed(1)}%+</span></div>
      <div class="tier-goal">${t.goal}</div>
    </div>`).join('');
}

/* ─── TikTok / IG ─── */
function updateTT() {
  const a=parseFloat(document.getElementById('tt_avd')?.value)||0;
  const h=parseFloat(document.getElementById('tt_hook')?.value)||0;
  const s=parseFloat(document.getElementById('tt_share')?.value)||0;
  const set=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v;};
  set('tt_avdVal',a+'%'); set('tt_hookVal',h+'%'); set('tt_shareVal',s+'%');
  const score=((a/55)*40+(h/50)*30+(s/3)*30).toFixed(1);
  set('tt_totalScore',score);
  set('tt_ratingText', parseFloat(score)<40?'Low Reach':parseFloat(score)<80?'FYP Trending 📈':'Viral Breakout 🚀');
}
function updateIG() {
  const a=parseFloat(document.getElementById('ig_avd')?.value)||0;
  const s=parseFloat(document.getElementById('ig_save')?.value)||0;
  const set=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v;};
  set('ig_avdVal',a+'%'); set('ig_saveVal',s+'%');
  const score=((a/100)*50+(s/3)*50).toFixed(1);
  set('ig_totalScore',score);
  set('ig_ratingText', parseFloat(score)<50?'Static':parseFloat(score)<85?'Explore Feed 📷':'Global Reach 🌍');
}
function switchSocialTab(which) {
  document.getElementById('socialPanelTT').style.display = which==='tt'?'block':'none';
  document.getElementById('socialPanelIG').style.display = which==='ig'?'block':'none';
  document.getElementById('socialTabTT').className = which==='tt'?'btn btn-primary btn-sm':'btn btn-ghost btn-sm';
  document.getElementById('socialTabIG').className = which==='ig'?'btn btn-primary btn-sm':'btn btn-ghost btn-sm';
}

/* ─── Monetization Tracker ─── */
function updateTab3() {
  const curr = parseFloat(document.getElementById('m_currentHours')?.value)||0;
  const vel  = parseFloat(document.getElementById('m_currentDailyVelocity')?.value)||0;
  const d1   = new Date(document.getElementById('m_todayDate')?.value||new Date());
  const d2   = new Date(document.getElementById('m_targetDate')?.value||new Date());
  const diffDays = Math.max(Math.ceil((d2-d1)/86400000), 1);
  const sHrs   = parseFloat(document.getElementById('m_streamHrs')?.value)||0;
  const sView  = parseFloat(document.getElementById('m_streamViewers')?.value)||0;
  const sTotWk = sHrs*sView; const sDailyHrs = sTotWk/7;
  const rem3k  = Math.max(3000-curr,0); const rem4k = Math.max(4000-curr,0);
  const v3 = Math.min((curr/3000)*100,100);
  const v4 = Math.min((curr/4000)*100,100);
  const sa = sTotWk*(diffDays/7);
  const s4 = Math.min((sa/4000)*100, 100-v4);
  const setW=(id,v)=>{const e=document.getElementById(id);if(e)e.style.width=v+'%';};
  const txt=(id,v)=>{const e=document.getElementById(id);if(e)e.innerText=v;};
  setW('m_progress3k',v3.toFixed(1)); setW('m_progressVod2',v4.toFixed(1)); setW('m_progressStream2',Math.max(s4,0).toFixed(1));
  txt('m_progressPct3k',v3.toFixed(1)+'%');
  txt('m_progressPct',v4.toFixed(1)+'%'+(s4>0?` + ${s4.toFixed(1)}% stream`:''));
  txt('m_streamTotal',Math.floor(sTotWk).toLocaleString()+' hrs / week');
  const fmt=(d)=>d.toLocaleDateString(undefined,{month:'short',day:'numeric',year:'numeric'});
  const setDate=(id,v)=>{const e=document.getElementById(id);if(e)e.innerText=v;};
  // 3k estimates
  if(vel>0&&rem3k>0){const d=new Date(d1);d.setDate(d.getDate()+Math.ceil(rem3k/vel));setDate('m_estimatedDate3k',fmt(d));}
  else setDate('m_estimatedDate3k',curr>=3000?'✅ Hit!':'Enter velocity');
  const c3=vel+sDailyHrs;
  if(c3>0&&rem3k>0){const d=new Date(d1);d.setDate(d.getDate()+Math.ceil(rem3k/c3));setDate('m_estimatedDate3kStream',fmt(d));}
  else setDate('m_estimatedDate3kStream',curr>=3000?'✅ Hit!':'—');
  // 4k estimates
  if(vel>0&&rem4k>0){const d=new Date(d1);d.setDate(d.getDate()+Math.ceil(rem4k/vel));setDate('m_estimatedDate',fmt(d));}
  else setDate('m_estimatedDate',curr>=4000?'✅ Hit!':'Enter velocity');
  const cv=vel+sDailyHrs;
  if(cv>0&&rem4k>0){const dn=Math.ceil(rem4k/cv);const ed=new Date(d1);ed.setDate(ed.getDate()+dn);setDate('m_estimatedDateStream',fmt(ed));if(vel>0){const sv=Math.ceil(rem4k/vel)-dn;txt('m_streamDaysSaved',sv>0?`⚡ ${sv} days sooner`:'');}}
  else{setDate('m_estimatedDateStream',curr>=4000?'✅ Hit!':'—');txt('m_streamDaysSaved','');}
  if(rem4k>0&&diffDays>0){
    const rHPD=Math.max((rem4k/diffDays)-sDailyHrs,0);
    const avdM=parseFloat(document.getElementById('m_avdMins')?.value)||0;
    const totA=avdM+((parseFloat(document.getElementById('m_avdSecs')?.value)||0)/60);
    const dv=totA>0?(rHPD*60)/totA:0;
    txt('m_dailyHours',rHPD.toFixed(1)); txt('m_streamPerDay',sDailyHrs.toFixed(1));
    txt('m_weeklyHours',((rHPD+sDailyHrs)*7).toFixed(1));
    txt('m_dailyViews',Math.ceil(dv).toLocaleString());
    const mc=document.getElementById('m_conclusion');
    if(mc) mc.innerHTML=`To hit your goal by ${fmt(d2)}, you need <strong style="color:var(--primary)">${(rHPD+sDailyHrs).toFixed(1)} combined watch hrs/day</strong>${sDailyHrs>0?` — streams cover <strong>${sDailyHrs.toFixed(1)} hrs/day</strong>`:''}. ~<strong>${Math.ceil(dv).toLocaleString()} daily views</strong> needed at your current AVD.`;
  } else if(rem4k<=0){
    const mc=document.getElementById('m_conclusion');
    if(mc) mc.innerHTML='🎉 <strong>You\'ve hit 4,000 hours!</strong> Apply for YPP if you also have 1,000 subscribers.';
  }
  txt('m_stat_remaining',rem4k.toLocaleString()+' hrs');
  txt('m_stat_pct',Math.min(curr/4000*100,100).toFixed(1)+'%');
}

/* ─── RPM ─── */
function updateRpmSliders(changed) {
  let min=parseFloat(document.getElementById('c_rpm_min')?.value)||2;
  let max=parseFloat(document.getElementById('c_rpm_max')?.value)||5;
  if(min>max){if(changed==='min'){document.getElementById('c_rpm_max').value=min;max=min;}else{document.getElementById('c_rpm_min').value=max;min=max;}}
  const rv=document.getElementById('c_rpm_val'); if(rv) rv.textContent=`$${min.toFixed(2)} – $${max.toFixed(2)}`;
  const avg=(min+max)/2; let s='';
  if(avg<3.5)s='Gaming, Memes, Reactions';else if(avg<6)s='Vlogs, Lifestyle, Entertainment';
  else if(avg<10)s='DIY, Fitness, Travel';else if(avg<16)s='Tech, Education, Auto';
  else if(avg<25)s='Software, Real Estate, Medical';else s='Finance, B2B SaaS, Legal';
  const ns=document.getElementById('c_niche_suggestion');
  if(ns) ns.innerHTML=`<strong style="color:var(--primary)">Typical niches:</strong> ${s}`;
  generateReport();
}
function generateReport() {
  const type=document.getElementById('c_view_type')?.value||'monthly';
  let minV=parseFloat(document.getElementById('c_views_min')?.value)||0;
  let maxV=parseFloat(document.getElementById('c_views_max')?.value)||0;
  if(type==='daily'){minV*=30;maxV*=30;}
  const minR=parseFloat(document.getElementById('c_rpm_min')?.value)||2;
  const maxR=parseFloat(document.getElementById('c_rpm_max')?.value)||5;
  const revMin=(minV/1000)*minR; const revMax=(maxV/1000)*maxR;
  const sMinV=parseFloat(document.getElementById('cs_views_min')?.value)||0;
  const sMaxV=parseFloat(document.getElementById('cs_views_max')?.value)||0;
  const sRpm=parseFloat(document.getElementById('cs_rpm')?.value)||0.05;
  const sMin=(sMinV/1000)*sRpm; const sMax=(sMaxV/1000)*sRpm;
  const tMin=revMin+sMin; const tMax=revMax+sMax;
  const set=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v;};
  set('r_vod_monthly',`$${Math.floor(revMin).toLocaleString()} – $${Math.floor(revMax).toLocaleString()}`);
  set('r_shorts_monthly',`$${Math.floor(sMin).toLocaleString()} – $${Math.floor(sMax).toLocaleString()}`);
  set('r_monthly',`$${Math.floor(tMin).toLocaleString()} – $${Math.floor(tMax).toLocaleString()}`);
  set('r_yearly',`$${Math.floor(tMin*12).toLocaleString()} – $${Math.floor(tMax*12).toLocaleString()}`);
  const rp=document.getElementById('c_report'); if(rp&&(tMin>0||tMax>0)) rp.style.display='block';
}

/* ─── Channel Projections ─── */
function updateChannelProjections() {
  const subs=parseInt(document.getElementById('cp_subs')?.value)||0;
  const views=parseInt(document.getElementById('cp_views')?.value)||0;
  const avd=parseFloat(document.getElementById('cp_avd')?.value)||0;
  const rate=parseFloat(document.getElementById('cp_sub_rate')?.value)||1;
  const uploads=parseInt(document.getElementById('cp_uploads')?.value)||4;
  const ctr=parseFloat(document.getElementById('cp_ctr')?.value)||3;
  const optRate=parseFloat(document.getElementById('cp_opt_rate')?.value)||2.5;
  const optViews=parseInt(document.getElementById('cp_opt_views')?.value)||views;
  const aggUploads=parseInt(document.getElementById('cp_agg_uploads')?.value)||12;
  const targetCtr=parseFloat(document.getElementById('cp_target_ctr')?.value)||5;
  const monthlySubs=views*(rate/100);
  const months=[1,3,6,9,12];
  const cp=document.getElementById('cp_current_proj');
  if(cp) cp.innerHTML=months.map(m=>{const v=Math.round(subs+monthlySubs*m);return `<div class="stat-card"><div class="stat-label">${m===1?'1 Month':m+' Months'}</div><div class="stat-value" style="font-size:17px;color:var(--primary)">${v.toLocaleString()}</div><div class="stat-sub">subs</div></div>`;}).join('');
  const mWH=(views*avd)/60;
  const vp=document.getElementById('cp_view_proj');
  if(vp) vp.innerHTML=months.map(m=>{const pv=Math.round(views*m);const wh=Math.round(mWH*m);return `<div class="stat-card"><div class="stat-label">${m===1?'1 Month':m+' Months'}</div><div class="stat-value" style="font-size:17px;color:var(--accent)">${pv.toLocaleString()}</div><div class="stat-sub">${wh.toLocaleString()} watch hrs</div></div>`;}).join('');
  const scenarios=[
    {label:'Current Trajectory',color:'var(--text-dim)',badge:'📊 BASELINE',desc:`${views.toLocaleString()} monthly views, ${rate}% conversion — adding ~${Math.round(monthlySubs).toLocaleString()} subs/month.`,sub6:Math.round(subs+monthlySubs*6),sub12:Math.round(subs+monthlySubs*12)},
    {label:`CTR Boost (+${Math.round(targetCtr-ctr)}%)`,color:'var(--warning)',badge:'🎯 CTR BOOST',desc:`Improving CTR from ${ctr}% to ${targetCtr}% increases views by ~${Math.round((targetCtr/Math.max(ctr,0.1)-1)*100)}%.`,sub6:Math.round(subs+monthlySubs*(targetCtr/Math.max(ctr,0.1))*6),sub12:Math.round(subs+monthlySubs*(targetCtr/Math.max(ctr,0.1))*12)},
    {label:'More Uploads',color:'var(--secondary)',badge:'🚀 UPLOADS',desc:`Scaling ${uploads} → ${aggUploads} uploads/month multiplies reach ${(aggUploads/Math.max(uploads,1)).toFixed(1)}×.`,sub6:Math.round(subs+monthlySubs*(aggUploads/Math.max(uploads,1))*6),sub12:Math.round(subs+monthlySubs*(aggUploads/Math.max(uploads,1))*12)},
    {label:'Optimistic Growth',color:'var(--primary)',badge:'⚡ OPTIMIZED',desc:`${optViews.toLocaleString()}/mo views + ${optRate}% conversion — maximum realistic ceiling.`,sub6:Math.round(subs+optViews*(optRate/100)*6),sub12:Math.round(subs+optViews*(optRate/100)*12)},
  ];
  const sc=document.getElementById('cp_scenarios');
  if(sc) sc.innerHTML=scenarios.map(s=>`<div style="background:var(--card);border:1px solid var(--border);border-left:3px solid ${s.color};border-radius:var(--radius-lg);padding:14px;margin-bottom:11px;"><div style="display:flex;align-items:center;gap:8px;margin-bottom:7px;flex-wrap:wrap;"><span style="font-size:9px;font-weight:700;color:${s.color};background:${s.color}1a;border:1px solid ${s.color};padding:2px 7px;border-radius:9px;">${s.badge}</span><span style="font-weight:700;color:var(--text-bright);font-size:12px;">${s.label}</span></div><p style="font-size:11px;color:var(--text-dim);margin-bottom:9px;">${s.desc}</p><div style="display:grid;grid-template-columns:1fr 1fr;gap:7px;"><div style="background:var(--card2);border-radius:7px;padding:9px;text-align:center;"><div style="font-size:9px;color:var(--text-dim);margin-bottom:2px;">6 MONTHS</div><div style="font-size:17px;font-weight:700;color:${s.color};">${s.sub6.toLocaleString()}</div></div><div style="background:var(--card2);border-radius:7px;padding:9px;text-align:center;"><div style="font-size:9px;color:var(--text-dim);margin-bottom:2px;">12 MONTHS</div><div style="font-size:17px;font-weight:700;color:${s.color};">${s.sub12.toLocaleString()}</div></div></div></div>`).join('');
  const insights=[];
  if(ctr<3)insights.push({color:'var(--warning)',icon:'🎨',title:'CTR Needs Work',text:`Your ${ctr}% CTR is below benchmark. A/B test thumbnails in YouTube Studio. Faces, bright colors, curiosity-gap titles outperform consistently.`});
  if(avd<5)insights.push({color:'var(--danger)',icon:'⏱️',title:'Improve Watch Time',text:'Low AVD suppresses distribution. Add pattern interrupts every 60–90s. First 30 seconds must earn the next 5 minutes.'});
  if(rate<1)insights.push({color:'var(--primary)',icon:'📣',title:'Weak Sub Conversion',text:`${rate}% conversion is below average. Add a contextual CTA at your video's emotional peak.`});
  if(uploads<4)insights.push({color:'var(--secondary)',icon:'📅',title:'Upload Consistency',text:`${uploads} uploads/month is below the 4–8 recommended. Consistent cadence trains notification delivery.`});
  const ins=document.getElementById('cp_insights');
  if(ins) ins.innerHTML=insights.map(i=>`<div style="background:var(--card);border:1px solid var(--border);border-left:3px solid ${i.color};border-radius:var(--radius-lg);padding:12px;margin-bottom:9px;"><strong style="color:${i.color}">${i.icon} ${i.title}</strong><p style="font-size:11px;color:var(--text-dim);margin-top:3px;">${i.text}</p></div>`).join('');
  const best12=Math.round(subs+optViews*(optRate/100)*12);
  const base12=Math.round(subs+monthlySubs*12);
  const cs=document.getElementById('cp_summary');
  if(cs) cs.innerHTML=`<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px;"><div class="stat-card"><div class="stat-label">Current Path (12mo)</div><div class="stat-value" style="font-size:17px;">${base12.toLocaleString()}</div><div class="stat-sub">projected subs</div></div><div class="stat-card" style="border-color:var(--primary)"><div class="stat-label">Optimized (12mo)</div><div class="stat-value" style="font-size:17px;color:var(--primary)">${best12.toLocaleString()}</div><div class="stat-sub">possible subs</div></div><div class="stat-card" style="border-color:var(--success)"><div class="stat-label">Extra Subs Unlocked</div><div class="stat-value" style="font-size:17px;color:var(--success)">+${Math.max(0,best12-base12).toLocaleString()}</div></div><div class="stat-card" style="border-color:var(--secondary)"><div class="stat-label">Growth Multiplier</div><div class="stat-value" style="font-size:17px;color:var(--secondary)">${base12>0?(best12/base12).toFixed(1)+'×':'N/A'}</div></div></div>`;
}
