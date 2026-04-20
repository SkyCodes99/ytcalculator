/* ═══════════════════════════════════════════════════════════════════
   THE SOCIAL SPOT — tabs.js
   Tab update functions (Tab2-7, Social, Live, CP, A/B, Compare),
   Video Tracker, A/B tester, Live Sub Tracker, Channel Compare.
═══════════════════════════════════════════════════════════════════ */

'use strict';



  function updateTab2() {
    const vlMins = parseInt(document.getElementById('t2_vlMins')?.value || '0')||0;
    const baseAvd = getAvdTarget(vlMins);
    const tiers = [
      { name: 'Subscriber Seed Pool', c: '4–8', m: 1.15, d: 'Shown first to existing subscribers. Core fans watch more — highest AVD expectations here.', goal: 'Impress your most loyal viewers first — they set the baseline score.' },
      { name: 'Niche Broadening', c: '3–6', m: 1.05, d: 'Served to viewers with matching watch histories. CTR drops naturally with colder audiences.', goal: 'Maintain watch time as the audience widens beyond your core.' },
      { name: 'Suggested / Browse', c: '2–5', m: 0.95, d: 'Competing for Browse Feature and sidebar clicks. 3%+ CTR here is excellent.', goal: 'Win the thumbnail/title battle against competing suggestions.' },
      { name: 'Home Feed Expansion', c: '2–4', m: 0.85, d: 'Home page push to casual viewers. AVD is the main signal sustaining distribution.', goal: 'Keep casual viewers watching long enough to trigger continued pushes.' },
      { name: 'Broad Viral Push', c: '1.5–3', m: 0.75, d: 'Mass audience exposure. Only universally accessible content maintains this reach.', goal: 'Prove universal appeal — content must work for complete newcomers.' }
    ];
    let html = '';
    tiers.forEach(t => {
      const reqA = Math.min(baseAvd*t.m, 100);
      html += `<div class="target-card"><div class="tier-name">${t.name}</div>
        <p style="font-size:12px;color:var(--text-dim);margin-bottom:13px;">${t.d}</p>
        <div class="stat-row"><span>Target CTR Range:</span><span class="stat-val">${t.c}%</span></div>
        <div class="stat-row"><span>Required AVD:</span><span class="stat-val">${reqA.toFixed(1)}%+</span></div>
        <div class="tier-goal">GOAL: ${t.goal}</div></div>`;
    });
    document.getElementById('tierGrid').innerHTML = html;
  }


  function updateTab3() {
    const curr = parseFloat(document.getElementById('m_currentHours')?.value || '0')||0;
    const vel = parseFloat(document.getElementById('m_currentDailyVelocity')?.value || '0')||0;
    const d1 = new Date((document.getElementById('m_todayDate')?.value ?? ''));
    const d2 = new Date((document.getElementById('m_targetDate')?.value ?? ''));
    const diffDays = Math.max(Math.ceil((d2-d1)/(1000*60*60*24)),1);
    const sHrs = parseFloat(document.getElementById('m_streamHrs')?.value || '0')||0;
    const sView = parseFloat(document.getElementById('m_streamViewers')?.value || '0')||0;
    const sTotalWk = sHrs*sView;
    const sDailyHrs = sTotalWk/7;
    const rem3k = Math.max(3000-curr, 0);
    const rem4k = Math.max(4000-curr, 0);

    // Progress bars
    const vod3kPct = Math.min((curr/3000)*100, 100);
    const vod4kPct = Math.min((curr/4000)*100, 100);
    const streamAccum = sTotalWk*(diffDays/7);
    const stream4kPct = Math.min((streamAccum/4000)*100, 100-vod4kPct);
    document.getElementById('m_progress3k').style.width = vod3kPct.toFixed(1)+'%';
    document.getElementById('m_progressVod2').style.width = vod4kPct.toFixed(1)+'%';
    document.getElementById('m_progressStream2').style.width = Math.max(stream4kPct,0).toFixed(1)+'%';
    document.getElementById('m_progressPct3k').innerText = vod3kPct.toFixed(1)+'%';
    document.getElementById('m_progressPct').innerText = vod4kPct.toFixed(1)+'%'+(stream4kPct>0?` + ${stream4kPct.toFixed(1)}% stream`:'');

    document.getElementById('m_streamTotal').innerText = Math.floor(sTotalWk).toLocaleString()+' hrs / week';

    // 3k estimates
    if (vel>0 && rem3k>0) { const d=new Date(d1); d.setDate(d.getDate()+Math.ceil(rem3k/vel)); document.getElementById('m_estimatedDate3k').innerText = d.toLocaleDateString(undefined,{weekday:'short',year:'numeric',month:'short',day:'numeric'}); }
    else document.getElementById('m_estimatedDate3k').innerText = curr>=3000?'✅ Milestone Hit!':'Enter daily hours above';
    const combined3k = vel+sDailyHrs;
    if (combined3k>0 && rem3k>0) { const d=new Date(d1); d.setDate(d.getDate()+Math.ceil(rem3k/combined3k)); document.getElementById('m_estimatedDate3kStream').innerText = d.toLocaleDateString(undefined,{weekday:'short',year:'numeric',month:'short',day:'numeric'}); }
    else document.getElementById('m_estimatedDate3kStream').innerText = curr>=3000?'✅ Milestone Hit!':'Enter stream data';

    // 4k estimates
    if (vel>0 && rem4k>0) { const d=new Date(d1); d.setDate(d.getDate()+Math.ceil(rem4k/vel)); document.getElementById('m_estimatedDate').innerText = d.toLocaleDateString(undefined,{weekday:'short',year:'numeric',month:'short',day:'numeric'}); }
    else document.getElementById('m_estimatedDate').innerText = curr>=4000?'✅ Goal Hit!':'Enter daily hours above';
    const combinedDailyVel = vel+sDailyHrs;
    if (combinedDailyVel>0 && rem4k>0) {
      const daysNeeded = Math.ceil(rem4k/combinedDailyVel);
      const estD2=new Date(d1); estD2.setDate(estD2.getDate()+daysNeeded);
      document.getElementById('m_estimatedDateStream').innerText = estD2.toLocaleDateString(undefined,{weekday:'short',year:'numeric',month:'short',day:'numeric'});
      if (vel>0) { const saved=Math.ceil(rem4k/vel)-daysNeeded; document.getElementById('m_streamDaysSaved').innerText = saved>0?`⚡ ${saved} days sooner`:''; }
    } else { document.getElementById('m_estimatedDateStream').innerText = curr>=4000?'✅ Goal Hit!':'Enter stream data'; document.getElementById('m_streamDaysSaved').innerText =''; }

    // Velocity
    if (rem4k>0 && diffDays>0) {
      const reqHPD = Math.max((rem4k/diffDays)-sDailyHrs, 0);
      const avdMins = parseFloat(document.getElementById('m_avdMins')?.value || '0')||0;
      const totalAvd = avdMins+((parseFloat(document.getElementById('m_avdSecs')?.value || '0')||0)/60);
      const dailyViews = totalAvd>0?(reqHPD*60)/totalAvd:0;
      document.getElementById('m_dailyHours').innerText = reqHPD.toFixed(1);
      document.getElementById('m_streamPerDay').innerText = sDailyHrs.toFixed(1);
      document.getElementById('m_weeklyHours').innerText = ((reqHPD+sDailyHrs)*7).toFixed(1);
      document.getElementById('m_dailyViews').innerText = Math.ceil(dailyViews).toLocaleString();
      document.getElementById('m_conclusion').innerHTML = `To hit your goal by ${d2.toLocaleDateString()}, you need <strong style="color:var(--primary);">${(reqHPD+sDailyHrs).toFixed(1)} combined watch hrs/day</strong>${sDailyHrs>0?` — streams already cover <strong>${sDailyHrs.toFixed(1)} hrs/day</strong>, so your videos need <strong>${reqHPD.toFixed(1)} hrs/day</strong>`:' — add stream data above to accelerate this'}.`;
    } else if (rem4k<=0) {
      document.getElementById('m_dailyHours').innerText ='0.0'; document.getElementById('m_streamPerDay').innerText =sDailyHrs.toFixed(1); document.getElementById('m_weeklyHours').innerText =(sDailyHrs*7).toFixed(1);
      document.getElementById('m_conclusion').innerHTML = '🎉 <strong>You\'ve hit the 4,000 hour threshold!</strong> Apply for YPP now if you also have 1,000 subscribers.';
    }
    document.getElementById('m_stat_remaining').innerText = rem4k.toLocaleString()+' hrs';
    document.getElementById('m_stat_streamWeekly').innerText = Math.floor(sTotalWk).toLocaleString();
    document.getElementById('m_stat_totalWeekly').innerText = ((vel*7)+sTotalWk).toFixed(1);
    document.getElementById('m_stat_pct').innerText = Math.min(curr/4000*100,100).toFixed(1)+'%';
  }


  function updateRpmSliders(changed) {
    let min = parseFloat(document.getElementById('c_rpm_min')?.value || '0');
    let max = parseFloat(document.getElementById('c_rpm_max')?.value || '0');
    if (min>max) { if (changed==='min') { document.getElementById('c_rpm_max').value=min; max=min; } else { document.getElementById('c_rpm_min').value=max; min=max; } }
    document.getElementById('c_rpm_val').innerText = `$${min.toFixed(2)} – $${max.toFixed(2)}`;
    const avg = (min+max)/2; let s = '';
    if (avg<3.5) s='<strong>Gaming</strong>, <strong>Memes</strong>, <strong>Reactions</strong>, <strong>Challenges</strong>.';
    else if (avg<6) s='<strong>Vlogs</strong>, <strong>Lifestyle</strong>, <strong>Entertainment</strong>, <strong>Pranks</strong>.';
    else if (avg<10) s='<strong>Collectibles</strong>, <strong>DIY</strong>, <strong>Cooking</strong>, <strong>Fitness</strong>, <strong>Travel</strong>.';
    else if (avg<16) s='<strong>Tech Reviews</strong>, <strong>Education</strong>, <strong>Automotive</strong>, <strong>Photography</strong>.';
    else if (avg<25) s='<strong>Software</strong>, <strong>Real Estate</strong>, <strong>Medical</strong>, <strong>High-End Lifestyle</strong>.';
    else s='<strong>Finance</strong>, <strong>Investing</strong>, <strong>B2B SaaS</strong>, <strong>Insurance / Legal</strong>.';
    document.getElementById('c_niche_suggestion').innerHTML = `<strong style="color:var(--primary);">Likely Niches at this RPM:</strong> ${s}`;
    generateReport();
  }


  function updateTT() {
    const avd   = parseFloat(document.getElementById('tt_avdNum')?.value) || 0;
    const hook  = parseFloat(document.getElementById('tt_hookNum')?.value) || 0;
    const views = parseFloat(document.getElementById('tt_views')?.value)   || 0;
    const likes = parseFloat(document.getElementById('tt_likes')?.value)   || 0;
    const comments = parseFloat(document.getElementById('tt_comments')?.value) || 0;
    const vel   = parseFloat(document.getElementById('tt_velocity')?.value) || 0;

    const engRate = views > 0 ? ((likes + comments) / views * 100) : 0;
    const avdPts  = Math.min((avd / 55) * 35, 35);
    const hookPts = Math.min((hook / 50) * 30, 30);
    const engPts  = Math.min((engRate / 5) * 20, 20);
    const velPts  = Math.min((vel / 500) * 15, 15);
    const score   = (avdPts + hookPts + engPts + velPts).toFixed(1);

    const setEl = (id, val) => { const el = document.getElementById(id); if (el) el.innerText = val; };
    setEl('tt_avdVal',    avd.toFixed(1) + '%');
    setEl('tt_hookVal',   hook.toFixed(1) + '%');
    setEl('tt_totalScore', score);

    let r, c;
    if      (score < 30) { r = '📉 Low Reach';       c = '#f87171'; }
    else if (score < 55) { r = '📈 Growing';         c = '#fbbf24'; }
    else if (score < 75) { r = '🚀 FYP Trending';    c = '#4ade80'; }
    else                 { r = '🔥 Viral Breakout';   c = '#bf5fff'; }
    setEl('tt_ratingText', r);
    const rtEl = document.getElementById('tt_ratingText');
    if (rtEl) { rtEl.style.color = c; rtEl.style.borderColor = c; rtEl.style.background = c + '22'; }

    // Breakdown
    const bdEl = document.getElementById('tt_breakdown');
    if (bdEl) bdEl.innerHTML =
      '<div><span>AVD Quality:</span><span>' + avdPts.toFixed(1) + ' / 35</span></div>' +
      '<div><span>Hook Retention:</span><span>' + hookPts.toFixed(1) + ' / 30</span></div>' +
      '<div><span>Engagement Rate:</span><span>' + engPts.toFixed(1) + ' / 20</span></div>' +
      '<div><span>Velocity:</span><span>' + velPts.toFixed(1) + ' / 15</span></div>';
  }


  function updateIG() {
    const avd      = parseFloat(document.getElementById('ig_avdNum')?.value)   || 0;
    const saves    = parseFloat(document.getElementById('ig_saves')?.value)    || 0;
    const sends    = parseFloat(document.getElementById('ig_sends')?.value)    || 0;
    const reach    = parseFloat(document.getElementById('ig_reach')?.value)    || 0;
    const nonfol   = parseFloat(document.getElementById('ig_nonfollower')?.value) || 0;
    const views    = parseFloat(document.getElementById('ig_views')?.value)    || 0;
    const vel      = parseFloat(document.getElementById('ig_velocity')?.value) || 0;

    const saveRate = views > 0 ? (saves / views * 100) : 0;
    const sendRate = views > 0 ? (sends / views * 100) : 0;
    const avdPts   = Math.min((avd / 100) * 30, 30);
    const savePts  = Math.min((saveRate / 5) * 25, 25);
    const sendPts  = Math.min((sendRate / 3) * 20, 20);
    const nfPts    = Math.min((nonfol / 60) * 15, 15);
    const velPts   = Math.min((vel / 300) * 10, 10);
    const score    = (avdPts + savePts + sendPts + nfPts + velPts).toFixed(1);

    const setEl = (id, val) => { const el = document.getElementById(id); if (el) el.innerText = val; };
    setEl('ig_avdVal',    avd.toFixed(1) + '%');
    setEl('ig_totalScore', score);

    let r, c;
    if      (score < 25) { r = '📉 Static';        c = '#f87171'; }
    else if (score < 50) { r = '📈 Growing';       c = '#fbbf24'; }
    else if (score < 75) { r = '🚀 Explore Feed';  c = '#4ade80'; }
    else                 { r = '🌍 Global Reach';   c = '#bf5fff'; }
    setEl('ig_ratingText', r);
    const rtEl = document.getElementById('ig_ratingText');
    if (rtEl) { rtEl.style.color = c; rtEl.style.borderColor = c; rtEl.style.background = c + '22'; }

    const bdEl = document.getElementById('ig_breakdown');
    if (bdEl) bdEl.innerHTML =
      '<div><span>AVD Quality:</span><span>' + avdPts.toFixed(1) + ' / 30</span></div>' +
      '<div><span>Save Rate:</span><span>' + savePts.toFixed(1) + ' / 25</span></div>' +
      '<div><span>Send Rate:</span><span>' + sendPts.toFixed(1) + ' / 20</span></div>' +
      '<div><span>Non-follower %:</span><span>' + nfPts.toFixed(1) + ' / 15</span></div>' +
      '<div><span>Velocity:</span><span>' + velPts.toFixed(1) + ' / 10</span></div>';
  }


  function updateYTSubProjection() {
    const curr = parseInt(document.getElementById('yt_curr_subs')?.value || '0')||0;
    const monthly = parseInt(document.getElementById('yt_monthly_views')?.value || '0')||0;
    const rate = parseFloat(document.getElementById('yt_sub_rate')?.value || '0')||1;
    document.getElementById('yt_sub_projection').innerHTML = buildSubProjectionHTML(curr,monthly,rate,'subscribers');
  }


  function updateTTSubProjection() {
    const curr = parseInt(document.getElementById('tt_curr_subs')?.value || '0')||0;
    const monthly = parseInt(document.getElementById('tt_monthly_views')?.value || '0')||0;
    const rate = parseFloat(document.getElementById('tt_follow_rate')?.value || '0')||2;
    document.getElementById('tt_sub_projection').innerHTML = buildSubProjectionHTML(curr,monthly,rate,'followers');
  }


  function updateIGSubProjection() {
    const curr = parseInt(document.getElementById('ig_curr_subs')?.value || '0')||0;
    const monthly = parseInt(document.getElementById('ig_monthly_views')?.value || '0')||0;
    const rate = parseFloat(document.getElementById('ig_follow_rate')?.value || '0')||1.5;
    document.getElementById('ig_sub_projection').innerHTML = buildSubProjectionHTML(curr,monthly,rate,'followers');
  }


  function buildSubProjectionHTML(curr, monthly, rate, currency) {
    const monthlyNew = monthly*(rate/100);
    const months = [1,3,6,9,12];
    return months.map(m => {
      const val = Math.round(curr + monthlyNew*m);
      const label = m===1?'1 Month':m+' Months';
      return `<div class="stat-mini"><div class="label" style="color:var(--secondary);">${label}</div><div class="value" style="color:var(--secondary);font-size:20px;">${val.toLocaleString()}</div><div class="sub">${currency}</div></div>`;
    }).join('');
  }


  function updateChannelProjections() {
    const subs = parseInt(document.getElementById('cp_subs')?.value || '0')||0;
    const views = parseInt(document.getElementById('cp_views')?.value || '0')||0;
    const avd = parseFloat(document.getElementById('cp_avd')?.value || '0')||0;
    const rate = parseFloat(document.getElementById('cp_sub_rate')?.value || '0')||1;
    const uploads = parseInt(document.getElementById('cp_uploads')?.value || '0')||4;
    const ctr = parseFloat(document.getElementById('cp_ctr')?.value || '0')||3;
    const optRate = parseFloat(document.getElementById('cp_opt_rate')?.value || '0')||2.5;
    const optViews = parseInt(document.getElementById('cp_opt_views')?.value || '0')||views;
    const aggUploads = parseInt(document.getElementById('cp_agg_uploads')?.value || '0')||12;
    const targetCtr = parseFloat(document.getElementById('cp_target_ctr')?.value || '0')||5;

    // Monthly new subs at current rate
    const monthlySubs = views*(rate/100);
    // Subscriber projection
    const subMonths = [1,3,6,9,12];
    document.getElementById('cp_current_proj').innerHTML = subMonths.map(m => {
      const val = Math.round(subs + monthlySubs*m);
      return `<div class="stat-mini"><div class="label" style="color:var(--primary);">${m===1?'1 Month':m+' Months'}</div><div class="value" style="color:var(--primary);font-size:20px;">${val.toLocaleString()}</div><div class="sub">subscribers</div></div>`;
    }).join('');

    // Monthly watch hours
    const monthlyWH = (views * avd) / 60;
    document.getElementById('cp_view_proj').innerHTML = subMonths.map(m => {
      const projViews = Math.round(views * m);
      const wh = Math.round(monthlyWH * m);
      return `<div class="stat-mini"><div class="label" style="color:var(--accent);">${m===1?'1 Month':m+' Months'}</div><div class="value" style="color:var(--accent);font-size:18px;">${projViews.toLocaleString()}</div><div class="sub">${wh.toLocaleString()} watch hrs</div></div>`;
    }).join('');

    // Scenarios
    const scenarios = [
      {
        label: 'Current Trajectory',
        color: 'var(--text-dim)',
        badge: '📊 BASELINE',
        desc: `At ${views.toLocaleString()} monthly views and a ${rate}% conversion rate, you're adding ~${Math.round(monthlySubs).toLocaleString()} subscribers/month. With ${uploads} uploads/month, this is your current pace.`,
        sub6: Math.round(subs + monthlySubs*6),
        sub12: Math.round(subs + monthlySubs*12)
      },
      {
        label: `CTR Optimization (+${Math.round(targetCtr-ctr)}%)`,
        color: 'var(--warning)',
        badge: '🎯 CTR BOOST',
        desc: `Improving CTR from ${ctr}% to ${targetCtr}% through better thumbnails/titles would increase impressions-to-views by ~${Math.round((targetCtr/ctr-1)*100)}%. This directly scales your monthly views and watch hours without changing content quality.`,
        sub6: Math.round(subs + monthlySubs*(targetCtr/Math.max(ctr,0.1))*6),
        sub12: Math.round(subs + monthlySubs*(targetCtr/Math.max(ctr,0.1))*12)
      },
      {
        label: 'Increased Upload Frequency',
        color: 'var(--secondary)',
        badge: '🚀 MORE UPLOADS',
        desc: `Scaling from ${uploads} to ${aggUploads} uploads/month proportionally increases your total view pool. Assuming consistent performance per video, this could multiply your monthly reach by ${(aggUploads/Math.max(uploads,1)).toFixed(1)}×.`,
        sub6: Math.round(subs + monthlySubs*(aggUploads/Math.max(uploads,1))*6),
        sub12: Math.round(subs + monthlySubs*(aggUploads/Math.max(uploads,1))*12)
      },
      {
        label: 'Optimistic Growth Path',
        color: 'var(--primary)',
        badge: '⚡ FULL OPTIMIZED',
        desc: `Combining optimistic views (${optViews.toLocaleString()}/mo), a ${optRate}% conversion rate, and increased uploads — this represents your maximum realistic growth ceiling based on your niche and current engagement quality.`,
        sub6: Math.round(subs + optViews*(optRate/100)*6),
        sub12: Math.round(subs + optViews*(optRate/100)*12)
      }
    ];
    document.getElementById('cp_scenarios').innerHTML = scenarios.map(s => `
      <div class="proj-scenario" style="border-color:${s.color};">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;flex-wrap:wrap;">
          <span style="font-size:11px;font-weight:700;color:${s.color};background:${s.color}22;border:1px solid ${s.color};padding:4px 10px;border-radius:20px;font-family:var(--font-mono);letter-spacing:1px;">${s.badge}</span>
          <span style="font-weight:700;color:var(--text-bright);font-size:14px;">${s.label}</span>
        </div>
        <p style="font-size:13px;color:var(--text);line-height:1.7;margin-bottom:14px;">${s.desc}</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div style="background:var(--card2);border:1px solid var(--border);border-radius:8px;padding:12px;text-align:center;">
            <div style="font-size:11px;color:var(--text-dim);font-family:var(--font-mono);margin-bottom:4px;">6 MONTHS</div>
            <div style="font-size:20px;font-weight:700;color:${s.color};font-family:var(--font-display);">${s.sub6.toLocaleString()}</div>
          </div>
          <div style="background:var(--card2);border:1px solid var(--border);border-radius:8px;padding:12px;text-align:center;">
            <div style="font-size:11px;color:var(--text-dim);font-family:var(--font-mono);margin-bottom:4px;">12 MONTHS</div>
            <div style="font-size:20px;font-weight:700;color:${s.color};font-family:var(--font-display);">${s.sub12.toLocaleString()}</div>
          </div>
        </div>
      </div>`).join('');

    // Insights
    const insightItems = [];
    if (ctr < 3) insightItems.push({ icon: '🎨', color: 'var(--warning)', title: 'Thumbnail & Title Upgrade', text: `Your ${ctr}% CTR is below the 3–5% benchmark. A/B test your thumbnails using YouTube Studio's "Test & Compare" feature. Bright colors, faces showing emotion, and curiosity-gap titles consistently outperform static imagery.` });
    if (avd < 5) insightItems.push({ icon: '⏱️', color: 'var(--danger)', title: 'Improve Watch Time Retention', text: 'Low average watch time suppresses algorithmic distribution. Use pattern interrupts every 60–90 seconds: cut to B-roll, change camera angles, or add graphics overlays. Strong re-hooks after the first 30 seconds dramatically improve AVD.' });
    if (rate < 1) insightItems.push({ icon: '📣', color: 'var(--primary)', title: 'Improve Call-to-Action Strategy', text: `Your ${rate}% conversion rate is below average. Add a contextual subscribe CTA at your video's emotional peak (not just the end). Create a "subscriber value proposition" — tell viewers exactly what they gain by subscribing.` });
    if (uploads < 4) insightItems.push({ icon: '📅', color: 'var(--secondary)', title: 'Increase Upload Consistency', text: `${uploads} uploads/month is below the recommended 4–8 for early growth. YouTube's algorithm rewards consistent upload cadence — it trains notification delivery and helps predict your next video's performance window.` });
    insightItems.push({ icon: '🔗', color: 'var(--accent)', title: 'Cross-Platform Traffic Funnel', text: 'Push TikTok/Reels viewers to YouTube by creating "teaser" short-form clips of your long-form content. Include your channel name or link in your bio. The algorithm boosts channels that show consistent external traffic signals.' });
    insightItems.push({ icon: '🎯', color: 'var(--warning)', title: 'Niche Consistency Compounds Growth', text: 'Every video outside your defined niche resets algorithmic targeting. YouTube builds an audience "profile" for your channel — the tighter your niche, the more efficiently the algorithm finds your next viewer. Compound consistency beats viral outliers long-term.' });

    document.getElementById('cp_insights').innerHTML = insightItems.map(i => `
      <div class="info-card" style="border-left:3px solid ${i.color};margin-bottom:10px;">
        <h4 style="color:${i.color};">${i.icon} ${i.title}</h4>
        <p style="margin:0;font-size:13px;color:var(--text);line-height:1.7;">${i.text}</p>
      </div>`).join('');

    // Summary
    const best12 = Math.round(subs + optViews*(optRate/100)*12);
    const base12 = Math.round(subs + monthlySubs*12);
    document.getElementById('cp_summary').innerHTML = `
      <div class="control-card" style="border-color:var(--primary);background:var(--primary-dim);">
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px;">
          <div class="stat-mini" style="border-color:var(--text-dim);">
            <div class="label" style="color:var(--text-dim);">Current Path (12mo)</div>
            <div class="value" style="font-size:22px;">${base12.toLocaleString()}</div>
            <div class="sub">subscribers projected</div>
          </div>
          <div class="stat-mini" style="border-color:var(--primary);">
            <div class="label" style="color:var(--primary);">Optimized Path (12mo)</div>
            <div class="value" style="color:var(--primary);font-size:22px;">${best12.toLocaleString()}</div>
            <div class="sub">subscribers possible</div>
          </div>
          <div class="stat-mini" style="border-color:var(--secondary);">
            <div class="label" style="color:var(--secondary);">Growth Potential</div>
            <div class="value" style="color:var(--secondary);font-size:22px;">+${Math.max(0,best12-base12).toLocaleString()}</div>
            <div class="sub">additional subs unlocked</div>
          </div>
          <div class="stat-mini" style="border-color:var(--accent);">
            <div class="label" style="color:var(--accent);">Multiplier</div>
            <div class="value" style="color:var(--accent);font-size:22px;">${base12>0?(best12/base12).toFixed(1)+'×':'N/A'}</div>
            <div class="sub">growth vs current path</div>
          </div>
        </div>
      </div>`;
  }


  function updateShortsRpm(){const n=document.getElementById('cs_niche')?.value;const rpmMap={gaming:0.025,lifestyle:0.04,tech:0.05,finance:0.08,beauty:0.04,fitness:0.045,food:0.035,news:0.05};const rpmEl=document.getElementById('cs_rpm'),noteEl=document.getElementById('cs_niche_note');if(!rpmEl)return;if(n&&n!=='custom'&&rpmMap[n]){rpmEl.value=rpmMap[n].toFixed(3);if(noteEl)noteEl.innerHTML='📌 '+n+' Shorts RPM';}else if(noteEl)noteEl.innerHTML='';}


  function calculateUploadTime() {
    const f = (document.getElementById('u_format')?.value ?? '');
    const n = (document.getElementById('u_niche')?.value ?? '');
    const tz = (document.getElementById('u_tz')?.value ?? '');
    const freq = parseInt(document.getElementById('u_freq')?.value || '0')||3;
    const age = document.getElementById('u_age') ? (document.getElementById('u_age')?.value ?? '') : 'any';
    const geo = document.getElementById('u_geo') ? (document.getElementById('u_geo')?.value ?? '') : 'us';
    const chsize = document.getElementById('u_chsize') ? (document.getElementById('u_chsize')?.value ?? '') : 'mid';
    const vidlen = document.getElementById('u_vidlen') ? (document.getElementById('u_vidlen')?.value ?? '') : 'medium';

    const tzUTCOffsets = {
      HST: -10, AKST: -9, PST: -8, MST: -7, CST: -6, EST: -5,
      AST: -4, BRT: -3, GST: -2, CVT: -1, GMT: 0, CET: 1, EET: 2,
      MSK: 3, GST4: 4, PKT: 5, IST: 5.5, BST6: 6, ICT: 7, CST8: 8,
      JST: 9, AEST: 10, SBT: 11, NZST: 12
    };
    const hDiff = (tzUTCOffsets[tz] ?? -5) - (-5);

    function shiftTime(timeStr, hrs) {
      const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/);
      if (!match) return timeStr;
      let h = parseInt(match[1]); const m = match[2]; let period = match[3];
      if (period==='PM' && h!==12) h+=12;
      if (period==='AM' && h===12) h=0;
      h = ((h+hrs)%24+24)%24;
      return `${h%12===0?12:h%12}:${m} ${h>=12?'PM':'AM'}`;
    }

    // Extended niche data — 10 niches, 4 slots each
    const nicheData = {
      gaming:       { slots:[{l:'Primary',t:'4:00 PM'},{l:'Alt 1',t:'7:00 PM'},{l:'Alt 2',t:'9:00 AM'},{l:'Late Night',t:'9:00 PM'}], peak:'6:00 PM', days:['Tuesday','Thursday','Saturday','Sunday','Monday','Wednesday','Friday'], logic:'Gaming audiences spike after school/work (3–9 PM). Thursday–Sunday evenings dominate. Teen/young adult demographic peaks on weekends.' },
      finance:      { slots:[{l:'Primary',t:'6:30 AM'},{l:'Alt 1',t:'8:00 AM'},{l:'Lunch',t:'12:00 PM'},{l:'Evening',t:'7:00 PM'}], peak:'8:00 AM', days:['Tuesday','Wednesday','Thursday','Monday','Friday','Saturday','Sunday'], logic:'Finance viewers engage during morning commute. Tuesday–Thursday dominate. Early AM uploads capture pre-market traders.' },
      vlogs:        { slots:[{l:'Primary',t:'3:00 PM'},{l:'Alt 1',t:'5:30 PM'},{l:'Alt 2',t:'11:00 AM'},{l:'Evening',t:'8:00 PM'}], peak:'5:00 PM', days:['Wednesday','Friday','Sunday','Tuesday','Thursday','Monday','Saturday'], logic:'Lifestyle peaks at prime time. Wednesday and Friday capture end-of-week browsing surges. Sunday morning is strong for long-form.' },
      tech:         { slots:[{l:'Primary',t:'12:00 PM'},{l:'Alt 1',t:'2:00 PM'},{l:'Morning',t:'8:00 AM'},{l:'Evening',t:'6:00 PM'}], peak:'2:00 PM', days:['Tuesday','Thursday','Wednesday','Monday','Friday','Saturday','Sunday'], logic:'Tech audiences peak during lunch and early afternoon. Tuesday and Thursday have highest CTR for this niche.' },
      collectibles: { slots:[{l:'Primary',t:'2:00 PM'},{l:'Alt 1',t:'4:30 PM'},{l:'Alt 2',t:'7:00 PM'},{l:'Morning',t:'10:00 AM'}], peak:'4:00 PM', days:['Saturday','Sunday','Friday','Wednesday','Thursday','Tuesday','Monday'], logic:'Hobby audiences most active on weekends and Friday evenings. Saturday afternoon is the top window.' },
      fitness:      { slots:[{l:'Primary',t:'6:00 AM'},{l:'Lunch',t:'12:00 PM'},{l:'Alt 1',t:'5:00 PM'},{l:'Evening',t:'7:30 PM'}], peak:'6:00 AM', days:['Monday','Wednesday','Friday','Tuesday','Thursday','Saturday','Sunday'], logic:'Fitness audiences watch during morning workout time and lunch. Monday is #1 — people restart routines. Post-work evening is strong.' },
      food:         { slots:[{l:'Brunch',t:'11:00 AM'},{l:'Primary',t:'5:00 PM'},{l:'Dinner Prep',t:'6:30 PM'},{l:'Morning',t:'9:00 AM'}], peak:'11:00 AM', days:['Sunday','Thursday','Wednesday','Friday','Saturday','Tuesday','Monday'], logic:'Food content peaks before meal times — brunch and dinner prep windows. Sunday and Thursday are highest engagement days.' },
      beauty:       { slots:[{l:'Primary',t:'3:00 PM'},{l:'Alt 1',t:'7:00 PM'},{l:'Morning',t:'10:00 AM'},{l:'Weekend',t:'11:00 AM'}], peak:'5:00 PM', days:['Wednesday','Friday','Saturday','Sunday','Tuesday','Thursday','Monday'], logic:'Beauty audiences active after school/work. Weekday afternoons and Saturday mornings perform best.' },
      news:         { slots:[{l:'AM',t:'7:30 AM'},{l:'Lunch',t:'12:00 PM'},{l:'Evening',t:'5:00 PM'},{l:'Late',t:'9:00 PM'}], peak:'8:00 AM', days:['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], logic:'News audiences check in at morning, lunch, and after work. Publish ASAP for breaking news. Weekdays dominate.' },
      kids:         { slots:[{l:'After School',t:'2:30 PM'},{l:'Morning',t:'9:00 AM'},{l:'Alt 1',t:'5:30 PM'},{l:'Weekend AM',t:'8:30 AM'}], peak:'3:30 PM', days:['Saturday','Sunday','Friday','Monday','Wednesday','Tuesday','Thursday'], logic:'Kids content peaks after school and on weekend mornings. Saturday is #1. Parents often pre-load content.' }
    };

    // Short-form platform-specific slots
    const shortSlots = {
      yt_short: [{l:'Primary',t:'12:00 PM'},{l:'Alt 1',t:'6:00 PM'},{l:'Morning',t:'9:00 AM'},{l:'Night',t:'9:00 PM'}],
      tiktok:   [{l:'Evening',t:'7:00 PM'},{l:'Peak Night',t:'9:00 PM'},{l:'Lunch',t:'12:00 PM'},{l:'Morning',t:'10:00 AM'}],
      reels:    [{l:'Morning',t:'8:00 AM'},{l:'Primary',t:'11:00 AM'},{l:'Prime Time',t:'7:00 PM'},{l:'Late Eve',t:'9:30 PM'}],
      linkedin: [{l:'Early AM',t:'7:30 AM'},{l:'Morning',t:'9:00 AM'},{l:'Lunch',t:'12:00 PM'},{l:'PM',t:'5:00 PM'}],
      twitter:  [{l:'Morning',t:'8:00 AM'},{l:'Lunch',t:'12:00 PM'},{l:'Evening',t:'5:30 PM'},{l:'Night',t:'9:00 PM'}]
    };

    const isShort = ['yt_short','tiktok','reels','linkedin','twitter'].includes(f);
    const nd = nicheData[n] || nicheData.vlogs;
    const baseSlots = isShort ? (shortSlots[f] || shortSlots.tiktok) : nd.slots;
    const adjusted = baseSlots.map(s => ({...s, t: shiftTime(s.t, hDiff)}));
    const tzLabel = tz.replace(/\d/g,'');

    // Audience profile adjustments
    const notes = [];
    if (age==='u18')    notes.push('Under-18 audience: favour after-school (3–6 PM) and weekend mornings.');
    if (age==='45plus') notes.push('45+ audience: morning (7–10 AM) and evening (7–9 PM) outperform afternoon slots.');
    if (age==='25-34')  notes.push('25–34 audience: lunch breaks (11 AM–1 PM) and post-work evenings (6–9 PM) are peak.');
    if (geo==='eu')     notes.push('European audience: add 5–6 hours — morning uploads here hit European prime time.');
    if (geo==='asia')   notes.push('Asia Pacific: 13–16 hr offset from EST. Evening here = morning there.');
    if (chsize==='new') notes.push('New channel: prioritise consistency over perfect timing — volume helps the algorithm learn your pattern.');
    if (chsize==='large') notes.push('Large channel: your notification subscribers matter most — publish at their active window.');
    if (vidlen==='vlong') notes.push('30+ min video: publish 3–4 hours before peak — longer indexing window needed.');

    const contextNote = notes.length ? '<br><br>📌 <strong style="color:var(--secondary);">Audience adjustments:</strong> ' + notes.join(' ') : '';
    const formatNote = isShort
      ? `<br><br><strong style="color:var(--primary);">Short-Form Logic:</strong> Post <em>during</em> the peak window — the first 30–60 minutes determine batch expansion.`
      : `<br><br><strong style="color:var(--primary);">Long-Form Logic:</strong> Post 2 hours <em>before</em> peak so YouTube's indexing and notification delivery complete before your audience's active session.`;

    document.getElementById('u_logic').innerHTML = nd.logic + contextNote + formatNote;

    // Render multi-slot cards
    const slotsEl = document.getElementById('u_publish_slots');
    if (slotsEl) {
      slotsEl.innerHTML = adjusted.map((s,i) => `
        <div style="background:var(--card);border:1px solid ${i===0?'var(--accent)':'var(--border)'};border-radius:12px;padding:16px;text-align:center;${i===0?'box-shadow:0 0 18px rgba(191,95,255,0.15);':''}">
          <div style="font-size:10px;font-weight:700;color:${i===0?'var(--accent)':'var(--text-dim)'};text-transform:uppercase;letter-spacing:1px;margin-bottom:5px;font-family:var(--font-mono);">${s.l}${i===0?' ★':''}</div>
          <div style="font-size:22px;font-weight:800;color:${i===0?'var(--accent)':'var(--text-bright)'};font-family:var(--font-display);">${s.t}</div>
          <div style="font-size:10px;color:var(--text-dim);margin-top:4px;font-family:var(--font-mono);">${tzLabel}</div>
        </div>`).join('');
    }

    const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    const publishDays = nd.days.slice(0, freq);
    const primaryTime = adjusted[0]?.t || '';
    document.getElementById('u_schedule_grid').innerHTML = days.map(day => {
      const isPub = publishDays.includes(day);
      return `<div style="border-radius:10px;padding:14px 10px;text-align:center;font-size:12px;font-weight:700;
        background:${isPub?'var(--accent-dim)':'var(--card)'};
        color:${isPub?'var(--accent)':'var(--text-dim)'};
        border:${isPub?'1px solid var(--accent)':'1px solid var(--border)'};
        box-shadow:${isPub?'0 0 16px rgba(191,95,255,0.15)':'none'};
        font-family:var(--font-sans);">
        <div style="font-size:10px;text-transform:uppercase;letter-spacing:1px;margin-bottom:5px;opacity:0.7;font-family:var(--font-mono);">${day.substring(0,3)}</div>
        <div style="font-size:18px;margin-bottom:5px;">${isPub?'🎬':'—'}</div>
        <div style="letter-spacing:1px;">${isPub?'PUBLISH':'Rest'}</div>
        ${isPub?`<div style="font-size:10px;margin-top:5px;opacity:0.8;font-family:var(--font-mono);">${primaryTime}</div>`:''}
      </div>`;
    }).join('');

    const nLabel = n.charAt(0).toUpperCase()+n.slice(1);
    document.getElementById('u_insights').innerHTML = `
      <div class="control-card" style="margin:0;border-top:3px solid var(--danger);">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:var(--danger);margin-bottom:8px;font-family:var(--font-mono);letter-spacing:1px;">📊 Consistency Signal</div>
        <p style="margin:0;font-size:13px;color:var(--text);">YouTube models your upload cadence. A <strong>predictable schedule</strong> trains subscriber notifications and helps the algorithm forecast your next video's performance window.</p>
      </div>
      <div class="control-card" style="margin:0;border-top:3px solid var(--secondary);">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:var(--secondary);margin-bottom:8px;font-family:var(--font-mono);letter-spacing:1px;">⚡ ${isShort?'First 60 Minutes':'First 48 Hours'}</div>
        <p style="margin:0;font-size:13px;color:var(--text);">${isShort?'Short-form platforms batch-test within the <strong>first hour</strong>. Share to Stories and DMs immediately after posting.':'YouTube evaluates momentum during the <strong>first 48 hours</strong>. Schedule cross-posts and Community Posts to fire within the first few hours.'}</p>
      </div>
      <div class="control-card" style="margin:0;border-top:3px solid var(--primary);">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:var(--primary);margin-bottom:8px;font-family:var(--font-mono);letter-spacing:1px;">📅 Best Days for ${nLabel}</div>
        <p style="margin:0;font-size:13px;color:var(--text);">Audience activity ranking: <strong style="color:var(--primary);">${nd.days.slice(0,4).join(' › ')}</strong>. Reserve highest-production uploads for top 1–2 days.</p>
      </div>`;
  }

  


  function updatePublishChecklist(platform) {
    const before_el = document.getElementById('pubChecklist_before');
    const after_el  = document.getElementById('pubChecklist_after');
    if (!before_el || !after_el) return;

    const checklists = {
      yt_long: {
        before: ['\\u2610 Thumbnail A/B tested (use Title/Thumbnail Checker)','\\u2610 Title has a number, emotion, or power word','\\u2610 First 30 seconds reviewed \\u2014 hook is strong','\\u2610 End screen and cards set up','\\u2610 Description with timestamps and relevant links','\\u2610 Tags set (15\\u201320 relevant tags)','\\u2610 Subtitles / CC added (boosts watch time ~10%)'],
        after:  ['\\u2610 Community Post linking to video (within 30 min)','\\u2610 Story / Reel teaser posted','\\u2610 Pin video in comments section','\\u2610 Share to relevant Discord / Reddit / Facebook groups','\\u2610 Reply to first 10\\u201315 comments within 1 hour','\\u2610 Check Studio for flagging or copyright issues']
      },
      yt_short: {
        before: ['\\u2610 First 1\\u20132 seconds are the hook \\u2014 no intro','\\u2610 Vertical 9:16 format verified','\\u2610 Captions / text overlays for muted viewing','\\u2610 Loop ending considered (last frame \\u2192 first frame)','\\u2610 Hashtag #Shorts included in title or description','\\u2610 Thumbnail set (optional for Shorts but helps in Search)'],
        after:  ['\\u2610 Share to Community tab immediately','\\u2610 Share clip to Instagram Reels / TikTok if repurposing','\\u2610 Reply to early comments within 30 min','\\u2610 Check if it appears in the Shorts shelf (can take 10\\u201330 min)','\\u2610 Post a second Short within 24 hrs to maintain cadence']
      },
      tiktok: {
        before: ['\\u2610 First 1\\u20133 seconds have a visual or audio hook','\\u2610 Caption written with CTA (follow / duet / comment)','\\u2610 3\\u20135 relevant hashtags added (mix niche + broad)','\\u2610 Trending sound selected (if applicable)','\\u2610 Loop ending reviewed \\u2014 last frame connects to first','\\u2610 Captions / subtitles added for muted viewing'],
        after:  ['\\u2610 Reply to every comment in first hour (boosts video in FYP)','\\u2610 Share to Instagram Stories as a cross-post','\\u2610 Duet / Stitch with a trending video in niche (optional)','\\u2610 Check For You Page performance after 30 min','\\u2610 If <500 views in 2 hrs, consider re-posting at a different time']
      },
      reels: {
        before: ['\\u2610 Vertical 9:16 format, no black bars','\\u2610 Cover frame set (custom still, not auto-generated)','\\u2610 First 1\\u20132 seconds are the hook \\u2014 no slow intros','\\u2610 Caption includes CTA: \\"save this\\" / \\"share with a friend\\"','\\u2610 3\\u20135 hashtags added (niche-specific, not mega-tags)','\\u2610 Audio: original voice-over has captions added'],
        after:  ['\\u2610 Share to Stories immediately (2nd distribution wave)','\\u2610 Share to Close Friends Story if applicable','\\u2610 Reply to early comments within 30 min','\\u2610 Check Insights after 1 hr \\u2014 watch reach vs follower ratio','\\u2610 If Reels is underperforming, re-share to Stories with a teaser hook']
      },
      linkedin: {
        before: ['\\u2610 First 2 lines of text are the hook (visible before \\"see more\\")','\\u2610 Video uploaded natively (NOT as a link post)','\\u2610 No external links in the post body \\u2014 put URL in first comment','\\u2610 Tag 1\\u20133 relevant connections (not spamming)','\\u2610 Subtitles added \\u2014 80%+ of LinkedIn video watched muted'],
        after:  ['\\u2610 Post your link as the first comment immediately after publishing','\\u2610 Reply to every comment within 2 hrs (LinkedIn rewards dwell time)','\\u2610 Share to relevant LinkedIn Groups','\\u2610 DM 3\\u20135 connections who would genuinely find it useful','\\u2610 Check reach at 24 hrs \\u2014 LinkedIn content peaks at 18\\u201324 hr mark']
      },
      twitter: {
        before: ['\\u2610 Tweet copy is hook + context (not just a title re-paste)','\\u2610 Video is under 2:20 (Twitter/X native limit)','\\u2610 If thread: first tweet stands alone as a complete thought','\\u2610 Pinning strategy decided \\u2014 pin for 24\\u201348 hrs if expecting virality'],
        after:  ['\\u2610 Engage with replies within 30 min (retweet velocity matters)','\\u2610 If thread: reply #2 posted within 10 min','\\u2610 Bookmark and quote-tweet from secondary account (if available)','\\u2610 Share to relevant Spaces or communities','\\u2610 Check impressions at 2 hr mark \\u2014 Twitter content has 2\\u20134 hr half-life']
      }
    };

    const cl = checklists[platform] || checklists.yt_long;
    before_el.innerHTML = cl.before.map(i => `<div>${i}</div>`).join('');
    after_el.innerHTML  = cl.after.map(i  => `<div>${i}</div>`).join('');
  }


  function addTrackerEntry() {
    const date   = document.getElementById('trk_date')?.value;
    const imp    = parseInt(document.getElementById('trk_imp')?.value)||0;
    const views  = parseInt(document.getElementById('trk_views')?.value)||0;
    const ctr    = parseFloat(document.getElementById('trk_ctr')?.value)||0;
    const avd    = parseFloat(document.getElementById('trk_avd')?.value)||0;
    const likes  = parseInt(document.getElementById('trk_likes')?.value)||0;
    if (!date) { if (typeof showToast==='function') showToast('⚠️ Enter a date.','var(--warning)'); return; }
    if (!trackingDataObj[currentVideoKey]) trackingDataObj[currentVideoKey] = [];
    trackingDataObj[currentVideoKey].push({ date, imp, views, ctr, avd, likes });
    saveTrackerData();
    // Clear inputs
    ['trk_imp','trk_views','trk_ctr','trk_avd','trk_likes'].forEach(id => {
      const el = document.getElementById(id); if (el) el.value = '';
    });
    renderTracker();
    if (typeof showToast==='function') showToast('✅ Entry added.','var(--success)');
  }


  function renderTracker() {
    const tbody = document.getElementById('trackerBody');
    if (!tbody) return;
    tbody.innerHTML = '';
    let data = trackingDataObj[currentVideoKey] || [];
    data.sort((a,b) => new Date(a.date) - new Date(b.date));
    data.forEach((entry, i) => {
      const note = entry.apiNote ? `<br><span style="font-size:11px;color:var(--text-dim);">${entry.apiNote}</span>` : '';
      // Color-code CTR
      const ctrColor = !entry.ctr ? 'var(--text-dim)'
        : entry.ctr >= 6 ? '#4ade80' : entry.ctr >= 4 ? '#fbbf24'
        : entry.ctr >= 2 ? '#fb923c' : '#f87171';
      // Color-code AVD
      const avdColor = !entry.avd ? 'var(--text-dim)'
        : entry.avd >= 50 ? '#4ade80' : entry.avd >= 35 ? '#fbbf24'
        : entry.avd >= 20 ? '#fb923c' : '#f87171';
      // Color-code views (relative to max)
      const maxViews = Math.max(...data.map(e => e.views||0), 1);
      const viewPct = (entry.views||0) / maxViews;
      const viewColor = viewPct >= 0.8 ? '#bf5fff' : viewPct >= 0.5 ? '#22d3ee'
        : viewPct >= 0.2 ? '#4ade80' : 'var(--text)';
      tbody.innerHTML += `<tr style="border-bottom:1px solid var(--border);">
        <td style="font-family:var(--font-mono);font-size:12px;padding:8px 10px;">${entry.date}</td>
        <td style="padding:8px 10px;">${entry.imp ? entry.imp.toLocaleString() : '—'}</td>
        <td style="padding:8px 10px;font-weight:700;color:${viewColor};font-family:var(--font-mono);">${(entry.views||0).toLocaleString()}</td>
        <td style="padding:8px 10px;font-weight:700;color:${ctrColor};">${entry.ctr ? entry.ctr.toFixed(1)+'%' : '—'}</td>
        <td style="padding:8px 10px;font-weight:700;color:${avdColor};">${entry.avd ? entry.avd.toFixed(1)+'%' : '—'}</td>
        <td style="padding:8px 10px;">${entry.likes ? entry.likes.toLocaleString() : '—'}</td>
        <td style="padding:8px 10px;"><button class="btn-secondary" onclick="removeEntry(${i})" style="padding:5px 12px;font-size:11px;">✕</button>${note}</td>
      </tr>`;
    });
    generateInsight(data); renderSummary(data);
  }


  function renderSummary(data) {
    const box = document.getElementById('trackerSummary');
    if (!box) return;
    if (data.length === 0) { box.style.display = 'none'; return; }
    box.style.display = 'grid';
    box.style.gridTemplateColumns = 'repeat(auto-fit,minmax(140px,1fr))';
    box.style.gap = '12px';
    box.style.marginBottom = '16px';
    const totalViews = data.reduce((s,e) => s+(e.views||0), 0);
    const totalLikes = data.reduce((s,e) => s+(e.likes||0), 0);
    const ctrData    = data.filter(e=>e.ctr>0);
    const avdData    = data.filter(e=>e.avd>0);
    const avgCtr     = ctrData.length ? ctrData.reduce((s,e)=>s+e.ctr,0)/ctrData.length : 0;
    const avgAvd     = avdData.length ? avdData.reduce((s,e)=>s+e.avd,0)/avdData.length : 0;
    const likeRate   = totalViews > 0 ? (totalLikes/totalViews*100) : 0;
    // CTR color
    const ctrC = avgCtr>=6?'#4ade80':avgCtr>=4?'#fbbf24':avgCtr>=2?'#fb923c':'#f87171';
    const avdC = avgAvd>=50?'#4ade80':avgAvd>=35?'#fbbf24':avgAvd>=20?'#fb923c':'#f87171';
    box.innerHTML = `
      <div class="stat-mini"><div class="label" style="color:var(--primary);">Total Views</div>
        <div class="value" style="color:var(--primary);font-size:22px;">${totalViews.toLocaleString()}</div></div>
      <div class="stat-mini"><div class="label" style="color:${ctrC};">Avg CTR</div>
        <div class="value" style="color:${ctrC};font-size:22px;">${avgCtr.toFixed(1)}%</div></div>
      <div class="stat-mini"><div class="label" style="color:${avdC};">Avg AVD</div>
        <div class="value" style="color:${avdC};font-size:22px;">${avgAvd.toFixed(1)}%</div></div>
      <div class="stat-mini"><div class="label" style="color:var(--text-dim);">Like Rate</div>
        <div class="value" style="font-size:22px;">${likeRate.toFixed(2)}%</div></div>
      <div class="stat-mini"><div class="label" style="color:var(--text-dim);">Data Points</div>
        <div class="value" style="font-size:22px;">${data.length}</div></div>`;
  }


  function removeEntry(i) { trackingDataObj[currentVideoKey].splice(i, 1); renderTracker(); saveTrackerData(); }


  function generateInsight(data) {
    const box = document.getElementById('trackerInsightBox'); const text = document.getElementById('trackerInsightText');
    if (data.length < 2) { box.style.display = 'none'; return; }
    box.style.display = 'flex';
    const prev = data[data.length-2]; const curr = data[data.length-1];
    const viewD = curr.views-prev.views; const impD = curr.imp-prev.imp; const ctrD = curr.ctr-prev.ctr;
    let insight = '';
    if (impD > prev.imp*0.15) { insight = '<strong>📈 Algorithmic Spike:</strong> Reach is expanding to a broader audience. '; insight += ctrD < -0.5 ? 'CTR dropped — normal during expansion. Monitor AVD to confirm quality holds.' : 'CTR is holding strong during expansion. Breakout is likely continuing.'; }
    else if (viewD > prev.views*0.2) { insight = '<strong>🚀 View Velocity Surge:</strong> Views growing faster than impressions. Strong word-of-mouth or search discovery is contributing.'; }
    else if (impD <= 0 && ctrD < -1.0) { insight = '<strong>⚠️ Fatigue Alert:</strong> Impressions flat and CTR dropping. Consider a thumbnail A/B test or title refresh to restart the algorithm.'; }
    else if (viewD < 0) { insight = '<strong>📉 Cooling Off:</strong> View velocity is declining. Normal past day 7–14. Consider a Community Post or cross-promotion to extend the tail.'; }
    else { insight = '<strong>📊 Steady State:</strong> Performance consistent with your core audience benchmarks. No major algorithmic pushes detected.'; }
    text.innerHTML = insight;
  }


  function generateReport() {
    const type = document.getElementById('c_view_type').value;
    let minV = parseFloat(document.getElementById('c_views_min').value)||0;
    let maxV = parseFloat(document.getElementById('c_views_max').value)||0;
    if (type==='daily') { minV*=30; maxV*=30; }
    const minR = parseFloat(document.getElementById('c_rpm_min').value);
    const maxR = parseFloat(document.getElementById('c_rpm_max').value);
    const revMin=(minV/1000)*minR; const revMax=(maxV/1000)*maxR;
    const sMinV=parseFloat(document.getElementById('cs_views_min').value)||0;
    const sMaxV=parseFloat(document.getElementById('cs_views_max').value)||0;
    const sRpm=parseFloat(document.getElementById('cs_rpm').value)||0.05;
    const sMinRev=(sMinV/1000)*sRpm; const sMaxRev=(sMaxV/1000)*sRpm;
    const tMinM=revMin+sMinRev; const tMaxM=revMax+sMaxRev;
    document.getElementById('r_vod_monthly').innerText =`$${Math.floor(revMin).toLocaleString()} – $${Math.floor(revMax).toLocaleString()}`;
    document.getElementById('r_shorts_monthly').innerText =`$${Math.floor(sMinRev).toLocaleString()} – $${Math.floor(sMaxRev).toLocaleString()}`;
    document.getElementById('r_monthly').innerText =`$${Math.floor(tMinM).toLocaleString()} – $${Math.floor(tMaxM).toLocaleString()}`;
    document.getElementById('r_yearly').innerText =`$${Math.floor(tMinM*12).toLocaleString()} – $${Math.floor(tMaxM*12).toLocaleString()}`;
    if (tMinM>0||tMaxM>0) document.getElementById('c_report').style.display ='block';
  }


  function popoutTracker(id) {
    const t = liveTrackers.find(x => x.id === id);
    if (!t) return;
    const pc = t.platform === 'youtube' ? '#ff4444' : '#9146ff';
    const platLabel = t.platform === 'youtube' ? '▶ YouTube' : '🎮 Twitch';
    const showViews = t.platform === 'youtube' && t.trackViews;
    const html = '<!DOCTYPE html><html><head><title>' + t.name + ' — Live Tracker</title>'
      + '<style>*{margin:0;padding:0;box-sizing:border-box;}body{background:#0f0f13;color:#f1f5f9;font-family:system-ui,sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;text-align:center;padding:24px;}.plat{font-size:13px;font-weight:700;color:' + pc + ';letter-spacing:1px;margin-bottom:6px;}.name{font-size:18px;font-weight:700;margin-bottom:12px;}.label{font-size:10px;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;margin-bottom:2px;}.count{font-size:52px;font-weight:900;color:#f8fafc;letter-spacing:-2px;line-height:1;}.timer{font-size:11px;color:#94a3b8;margin-top:14px;}.pulse{width:10px;height:10px;background:' + pc + ';border-radius:50%;animation:pulse 1.5s ease-in-out infinite;display:inline-block;margin-right:6px;}@keyframes pulse{0%,100%{opacity:1;transform:scale(1);}50%{opacity:0.4;transform:scale(1.4);}}</style></head><body>'
      + '<div class="plat"><span class="pulse"></span>' + platLabel + '</div>'
      + '<div class="name">' + t.name + '</div>'
      + '<div class="label">Subscribers</div>'
      + '<div class="count" id="pc_count">' + (t.count !== null ? t.count.toLocaleString() : '…') + '</div>'
      + '<div id="pc_delta" style="min-height:18px;font-size:13px;margin-top:4px;"></div>'
      + (showViews ? '<div class="label" style="margin-top:14px;">Total Video Views</div><div class="count" style="font-size:32px;color:#a78bfa;" id="pc_views">' + (t.viewCount !== undefined ? t.viewCount.toLocaleString() : '…') + '</div><div id="pc_vdelta"></div>' : '')
      + '<div class="timer" id="pc_timer">Updating…</div>'
      + '<scr' + 'ipt>'
      + 'let prevSubs=' + (t.count !== null ? t.count : 'null') + ';'
      + 'let prevViews=' + (t.viewCount !== undefined ? t.viewCount : 'null') + ';'
      + 'let countdown=20;'
      + 'function tick(){document.getElementById("pc_timer").textContent="Next refresh in "+countdown+"s";if(--countdown<=0){countdown=20;refresh();}}'
      + 'async function refresh(){try{const apiKey=' + JSON.stringify(t.apiKey||'') + ';if(!apiKey)return;const cid=' + JSON.stringify(t.channelId||t.handle||'') + ';const param=cid.startsWith("UC")?"id="+encodeURIComponent(cid):"forHandle="+encodeURIComponent(cid.startsWith("@")?cid:"@"+cid);const r=await fetch("https://www.googleapis.com/youtube/v3/channels?part=statistics&"+param+"&key="+apiKey);const d=await r.json();const stats=d?.items?.[0]?.statistics;if(!stats)return;const subs=parseInt(stats.subscriberCount||0);const el=document.getElementById("pc_count");const de=document.getElementById("pc_delta");if(el&&subs){const diff=prevSubs!==null?subs-prevSubs:0;el.textContent=subs.toLocaleString();if(de){de.textContent=diff!==0?(diff>0?"+":"")+diff.toLocaleString()+" since last check":"";de.style.color=diff>0?"#4ade80":diff<0?"#f87171":"#94a3b8";}prevSubs=subs;}const views=parseInt(stats.viewCount||0);const ve=document.getElementById("pc_views");if(ve&&views){const vdiff=prevViews!==null?views-prevViews:0;ve.textContent=views.toLocaleString();const vd=document.getElementById("pc_vdelta");if(vd){vd.textContent=vdiff!==0?(vdiff>0?"+":"")+vdiff.toLocaleString():"";vd.style.color=vdiff>0?"#a78bfa":"#94a3b8";}prevViews=views;}}catch(e){}countdown=20;}'
      + 'setInterval(tick,1000);'
      + '</scr' + 'ipt></body></html>';
    const w = window.open('', '_blank', 'width=340,height=' + (showViews ? 420 : 320) + ',resizable=yes,menubar=no,toolbar=no,location=no,status=no');
    if (w) { w.document.open(); w.document.write(html); w.document.close(); }
  }


  async function addLiveTracker() {
    if (liveTrackers.length >= 5) { showToast('Maximum 5 channels', 'var(--warning)'); return; }
    const platform = document.getElementById('lst_platform')?.value || 'youtube';
    const handle = (document.getElementById('lst_handle')?.value || '').trim();
    const statusEl = document.getElementById('lst_add_status');
    const setStatus = (msg) => { if (statusEl) statusEl.textContent = msg; };

    if (!handle) { setStatus('⚠️ Enter a handle or username'); return; }

    if (platform === 'youtube') {
      const apiKey = (document.getElementById('lst_apikey')?.value || '').trim()
                   || localStorage.getItem('ccYTApiKey') || '';
      if (!apiKey) { setStatus('⚠️ Enter your YouTube API key above'); return; }
      setStatus('🔄 Resolving YouTube channel...');
      try {
        // Try forHandle first
        const isId = handle.startsWith('UC');
        const cleanHandle = handle.startsWith('@') ? handle : (isId ? handle : '@' + handle);
        const param = isId ? `id=${encodeURIComponent(handle)}` : `forHandle=${encodeURIComponent(cleanHandle)}`;
        const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&${param}&key=${apiKey}`;
        const resp = await fetch(url);
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const data = await resp.json();
        if (data.error) throw new Error(data.error.message || JSON.stringify(data.error));
        if (!data.items || data.items.length === 0) {
          // Try search as fallback
          const sr = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${encodeURIComponent(handle)}&maxResults=1&key=${apiKey}`);
          const sj = await sr.json();
          if (sj.error) throw new Error(sj.error.message);
          if (!sj.items?.length) throw new Error('Channel not found. Try the exact @handle from their YouTube About page.');
          const chId = sj.items[0].snippet.channelId || sj.items[0].id?.channelId;
          // Fetch by ID
          const cr = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${chId}&key=${apiKey}`);
          const cj = await cr.json();
          if (!cj.items?.length) throw new Error('Could not resolve channel');
          const item = cj.items[0];
          liveTrackers.push({ platform, handle, name: item.snippet.title, count: parseInt(item.statistics.subscriberCount)||0, prevCount: parseInt(item.statistics.subscriberCount)||0, apiKey, id: Date.now() });
        } else {
          const item = data.items[0];
          liveTrackers.push({ platform, handle, name: item.snippet.title, count: parseInt(item.statistics.subscriberCount)||0, prevCount: parseInt(item.statistics.subscriberCount)||0, apiKey, id: Date.now() });
        }
        document.getElementById('lst_handle').value = '';
        setStatus('');
        renderLiveCards();
        startLiveTimer();
        showToast(`✅ Now tracking ${liveTrackers[liveTrackers.length-1].name}`, 'var(--success)');
      } catch(err) {
        setStatus('❌ ' + err.message);
        console.error('YT tracker error:', err);
      }

    } else if (platform === 'twitch') {
      const clientId = (document.getElementById('lst_twitch_clientid')?.value || '').trim();
      const token    = (document.getElementById('lst_twitch_token')?.value || '').trim();
      if (!clientId || !token) { setStatus('⚠️ Enter your Twitch Client ID and Access Token'); return; }
      setStatus('🔄 Resolving Twitch channel...');
      try {
        const username = handle.replace(/^@/, '').toLowerCase();
        const resp = await fetch(`https://api.twitch.tv/helix/users?login=${encodeURIComponent(username)}`, {
          headers: { 'Client-ID': clientId, 'Authorization': `Bearer ${token}` }
        });
        if (!resp.ok) throw new Error(`HTTP ${resp.status} — check your Client ID and Token`);
        const data = await resp.json();
        if (!data.data?.length) throw new Error('Twitch user not found');
        const user = data.data[0];
        // Get follower count
        const fr = await fetch(`https://api.twitch.tv/helix/channels/followers?broadcaster_id=${user.id}`, {
          headers: { 'Client-ID': clientId, 'Authorization': `Bearer ${token}` }
        });
        const fj = await fr.json();
        const count = fj.total || 0;
        liveTrackers.push({ platform, handle: username, name: user.display_name, count, prevCount: count, clientId, token, userId: user.id, id: Date.now() });
        document.getElementById('lst_handle').value = '';
        setStatus('');
        renderLiveCards();
        startLiveTimer();
        showToast(`✅ Now tracking ${user.display_name}`, 'var(--success)');
      } catch(err) {
        setStatus('❌ ' + err.message);
        console.error('Twitch tracker error:', err);
      }
    }
  }


  function renderLiveCards() {
    const grid = document.getElementById('lst_cards');
    if (!grid) return;
    if (!liveTrackers.length) {
      grid.innerHTML = `<div style="background:var(--card);border:2px dashed var(--border-hi);border-radius:var(--radius-lg);padding:28px;text-align:center;color:var(--text-dim);font-size:13px;grid-column:1/-1;"><div style="font-size:28px;margin-bottom:8px;">📡</div>Add a channel above to begin live tracking.</div>`;
      return;
    }
    const pColors = { youtube:'#ff4444', twitch:'#9146ff' };
    grid.innerHTML = liveTrackers.map(t => {
      const delta = (t.count !== null && t.prevCount !== null) ? t.count - t.prevCount : null;
      const dStr = delta !== null ? (delta >= 0 ? `+${delta.toLocaleString()}` : delta.toLocaleString()) : '';
      const dColor = delta > 0 ? 'var(--success)' : delta < 0 ? 'var(--danger)' : 'var(--text-muted)';
      const pc = pColors[t.platform] || 'var(--primary)';
      return `<div class="live-card" style="border-top:3px solid ${pc};">
        <div class="live-pulse"></div>
        <div class="live-platform" style="color:${pc};">${t.platform === 'youtube' ? '▶ YouTube' : '🎮 Twitch'}</div>
        <div class="live-name" title="${t.name}">${t.name}</div>
        <div class="live-count">${t.count !== null ? t.count.toLocaleString() : '…'}</div>
        ${delta !== null && delta !== 0 ? `<div class="live-delta" style="color:${dColor};">${dStr} since last check</div>` : '<div style="height:18px;"></div>'}
        <div class="live-timer" id="lt_timer_${t.id}">Next refresh in ${liveCountdown}s</div>
        <button onclick="removeLiveTracker(${t.id})" style="margin-top:10px;background:var(--danger-dim);color:var(--danger);border:1px solid var(--danger);border-radius:6px;padding:3px 10px;cursor:pointer;font-size:11px;">Remove</button>
      </div>`;
    }).join('');
  }


  function removeLiveTracker(id) {
    liveTrackers = liveTrackers.filter(t => t.id !== id);
    renderLiveCards();
    if (!liveTrackers.length) stopLiveTimer();
  }


  function clearAllTrackers() {
    liveTrackers = [];
    renderLiveCards();
    stopLiveTimer();
  }


  async function lstRefreshNow() {
    liveCountdown = 10;
    await doLiveRefresh();
  }


  async function doLiveRefresh() {
    for (const t of liveTrackers) {
      try {
        if (t.platform === 'youtube') {
          const isId = t.handle.startsWith('UC');
          const param = isId ? `id=${encodeURIComponent(t.handle)}` : `forHandle=${encodeURIComponent(t.handle.startsWith('@')?t.handle:'@'+t.handle)}`;
          const r = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&${param}&key=${t.apiKey}`);
          const j = await r.json();
          if (j.error || !j.items?.length) continue;
          t.prevCount = t.count;
          t.count = parseInt(j.items[0].statistics.subscriberCount) || t.count;
        } else if (t.platform === 'twitch') {
          const r = await fetch(`https://api.twitch.tv/helix/channels/followers?broadcaster_id=${t.userId}`, {
            headers: { 'Client-ID': t.clientId, 'Authorization': `Bearer ${t.token}` }
          });
          if (!r.ok) continue;
          const j = await r.json();
          t.prevCount = t.count;
          t.count = j.total ?? t.count;
        }
      } catch(e) { console.warn('refresh error for', t.name, e); }
    }
    renderLiveCards();
  }


  function startLiveTimer() {
    if (liveTimerInterval) return;
    liveCountdown = 10;
    const dot = document.getElementById('lst_dot');
    const txt = document.getElementById('lst_status_text');
    const nxt = document.getElementById('lst_next_refresh');
    if (dot) { dot.style.background = 'var(--success)'; dot.style.animation = 'pulse-dot 2s ease-in-out infinite'; }
    if (txt) txt.textContent = '🔴 Tracking live';
    liveTimerInterval = setInterval(() => {
      liveCountdown--;
      if (nxt) nxt.textContent = `Auto-refresh in ${liveCountdown}s`;
      // Update timer labels on cards
      liveTrackers.forEach(t => {
        const el = document.getElementById('lt_timer_' + t.id);
        if (el) el.textContent = `Next refresh in ${liveCountdown}s`;
      });
      if (liveCountdown <= 0) {
        liveCountdown = 10;
        doLiveRefresh();
      }
    }, 1000);
  }


  function stopLiveTimer() {
    if (liveTimerInterval) { clearInterval(liveTimerInterval); liveTimerInterval = null; }
    const dot = document.getElementById('lst_dot');
    const txt = document.getElementById('lst_status_text');
    const nxt = document.getElementById('lst_next_refresh');
    if (dot) { dot.style.background = 'var(--text-muted)'; dot.style.animation = 'none'; }
    if (txt) txt.textContent = 'Not tracking';
    if (nxt) nxt.textContent = '';
  }


  async function refreshAllTrackers() { await lstRefreshNow(); }


  function lst_platformChanged() {
    const plat = document.getElementById('lst_platform')?.value;
    const ytRow = document.getElementById('lst_yt_row');
    const twRow = document.getElementById('lst_tw_row');
    const lbl = document.getElementById('lst_handle_label');
    if (plat === 'twitch') {
      if (ytRow) ytRow.style.display = 'none';
      if (twRow) twRow.style.display = 'grid';
      if (lbl) lbl.textContent = 'Twitch Username (lowercase)';
    } else {
      if (ytRow) ytRow.style.display = 'grid';
      if (twRow) twRow.style.display = 'none';
      if (lbl) lbl.textContent = '@Handle or Channel ID (UCxxxx)';
    }
  }


  function ab_recalculate() {
    const variants = document.querySelectorAll('.ab-variant');
    if (!variants.length) return;

    const results = [];
    let maxCTR = 0;
    variants.forEach((v, i) => {
      const impr = parseFloat(v.querySelector('.ab-impr')?.value) || 0;
      const clicks = parseFloat(v.querySelector('.ab-clicks')?.value) || 0;
      const avd = parseFloat(v.querySelector('.ab-avd')?.value) || 0;
      const likes = parseFloat(v.querySelector('.ab-likes')?.value) || 0;
      const ctr = impr > 0 ? (clicks / impr) * 100 : 0;
      const engRate = clicks > 0 ? (likes / clicks) * 100 : 0;
      // Composite score: CTR 60% + engagement 20% + watch time 20%
      const score = (ctr/15)*60 + Math.min(engRate/5*20, 20) + Math.min(avd/10*20, 20);
      if (ctr > maxCTR) maxCTR = ctr;
      results.push({ i, impr, clicks, ctr, avd, likes, engRate, score });

      // Update bar
      const bar = v.querySelector('.ab-ctr-bar');
      if (bar) bar.style.width = Math.min(ctr/15*100, 100) + '%';
      // Update result row
      const row = v.querySelector('.ab-result-row');
      if (row && impr > 0) {
        row.innerHTML = `
          <span style="color:var(--primary);font-weight:700;">CTR: ${ctr.toFixed(2)}%</span>
          <span>Clicks: ${clicks.toLocaleString()}</span>
          <span>Eng: ${engRate.toFixed(1)}%</span>
          ${avd > 0 ? `<span>Avg Watch: ${avd.toFixed(1)} min</span>` : ''}
          <span style="color:var(--text-dim);">Score: ${score.toFixed(1)}</span>`;
      }
    });

    if (results.every(r => r.impr === 0)) { document.getElementById('ab_results_panel').style.display ='none'; return; }
    document.getElementById('ab_results_panel').style.display = 'block';

    const winner = results.reduce((a, b) => a.score > b.score ? a : b);
    // Mark winner visual
    variants.forEach((v, i) => {
      v.classList.toggle('winner', i === winner.i && results.filter(r=>r.impr>0).length > 1);
    });

    // Winner banner
    const wb = document.getElementById('ab_winner_banner');
    const variantLetters = ['A','B','C','D','E'];
    if (wb && results.filter(r=>r.impr>0).length > 1) {
      wb.innerHTML = `<div style="font-size:24px;margin-bottom:6px;">🏆</div><div style="font-weight:800;font-size:16px;color:var(--success);">Variant ${variantLetters[winner.i]} is leading</div><div style="font-size:12px;color:var(--text-dim);margin-top:4px;">CTR ${winner.ctr.toFixed(2)}% · Score ${winner.score.toFixed(1)}/100 ${winner.impr < 1000 ? '· ⚠️ Need more impressions for confidence' : '· ✅ Statistically meaningful'}</div>`;
    }

    // Results grid
    const rg = document.getElementById('ab_results_grid');
    if (rg) {
      rg.innerHTML = results.filter(r=>r.impr>0).map(r => `
        <div class="stat-mini" style="border-left:3px solid ${AB_COLORS[r.i]};">
          <div class="label" style="color:${AB_COLORS[r.i]};">Variant ${variantLetters[r.i]}</div>
          <div class="value" style="color:${AB_COLORS[r.i]};">${r.ctr.toFixed(2)}%</div>
          <div class="sub">CTR · ${r.clicks.toLocaleString()} clicks · ${r.impr.toLocaleString()} impr</div>
          ${r.avd > 0 ? `<div class="sub">Avg watch: ${r.avd.toFixed(1)} min</div>` : ''}
        </div>`).join('');
    }

    // Title analysis
    const ta = document.getElementById('ab_title_analysis');
    if (ta) {
      const titleInsights = [
        { label:'Use numbers', check: t => /\d/.test(t), tip:'Titles with specific numbers (e.g. "7 Ways", "$5,000") typically outperform vague ones by 20–30% CTR.' },
        { label:'Power words', check: t => /secret|hack|trick|mistake|warning|why|how|best|worst|never|always|free|proven|instant/i.test(t), tip:'Emotionally charged words trigger curiosity. Combine with specificity for best effect.' },
        { label:'Question format', check: t => /\?/.test(t), tip:"Questions create an open loop in the viewer's mind and drive completion of the thought — in your video." },
        { label:'Length (50–70 chars)', check: t => t.length >= 40 && t.length <= 70, tip:'YouTube shows ~60 characters in search. Shorter titles lose context; longer titles get cut off.' },
        { label:'Colons or dashes', check: t => /[:\-–]/.test(t), tip:'Punctuation creates natural emphasis and splits the topic from the hook (e.g. "YouTube Growth: The Truth").' },
      ];
      const varDivs = document.querySelectorAll('.ab-variant');
      ta.innerHTML = Array.from(varDivs).map((v, i) => {
        const title = v.querySelector('.ab-title')?.value || '';
        if (!title) return '';
        const passed = titleInsights.filter(ti => ti.check(title));
        const score = Math.round((passed.length / titleInsights.length) * 100);
        return `
          <div style="background:var(--card);border:1px solid var(--border);border-left:3px solid ${AB_COLORS[i]};border-radius:var(--radius-lg);padding:14px;">
            <div style="font-weight:700;color:${AB_COLORS[i]};font-size:12px;margin-bottom:8px;">Variant ${variantLetters[i]} — Title Score: ${score}/100</div>
            <div style="font-size:11px;color:var(--text-dim);margin-bottom:8px;word-break:break-word;">"${title}"</div>
            ${titleInsights.map(ti => `<div style="display:flex;align-items:center;gap:6px;font-size:11px;padding:3px 0;color:${ti.check(title)?'var(--success)':'var(--text-muted)'};">${ti.check(title)?'✅':'○'} ${ti.label}</div>`).join('')}
          </div>`;
      }).filter(Boolean).join('');
    }

    // Thumbnail insights
    const ti = document.getElementById('ab_thumb_insights');
    if (ti) {
      const thumbInsights = [
        { key:'face', label:'Human face', check: t => /face|person|people|me|look|eye|expression|surprised|shocked|smile/i.test(t), tip:"Faces with visible emotion increase CTR by up to 38% vs no-face thumbnails." },
        { key:'text', label:'Bold text overlay', check: t => /text|word|title|label|number|overlay/i.test(t), tip:"Text reinforces the title and helps viewers with the sound off understand the topic." },
        { key:'contrast', label:'High contrast', check: t => /contrast|bright|bold|vivid|pop|neon|dark background|white text|black/i.test(t), tip:"Thumbnails that \"pop\" against YouTube's white/dark background stop the scroll." },
        { key:'arrow', label:'Visual focal point', check: t => /arrow|point|circle|highlight|zoom|close.?up|focus/i.test(t), tip:"Directing the eye to the key element increases information processing speed." },
        { key:'brand', label:'Brand consistency', check: t => /logo|brand|consistent|colour|color|style|template/i.test(t), tip:"Consistent thumbnail style builds channel recognition and return-viewer CTR." },
      ];
      const varDivs = document.querySelectorAll('.ab-variant');
      ti.innerHTML = `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px;">` +
        Array.from(varDivs).map((v, i) => {
          const thumb = v.querySelector('.ab-thumb')?.value || '';
          if (!thumb) return '';
          const passed = thumbInsights.filter(t => t.check(thumb));
          const score = Math.round((passed.length / thumbInsights.length) * 100);
          return `
            <div style="background:var(--card);border:1px solid var(--border);border-left:3px solid ${AB_COLORS[i]};border-radius:var(--radius-lg);padding:14px;">
              <div style="font-weight:700;color:${AB_COLORS[i]};font-size:12px;margin-bottom:6px;">Variant ${variantLetters[i]} Thumbnail — ${score}/100</div>
              <div style="font-size:11px;color:var(--text-dim);margin-bottom:8px;font-style:italic;">"${thumb.substring(0,80)}${thumb.length>80?'...':''}"</div>
              ${thumbInsights.map(t => `<div style="display:flex;align-items:flex-start;gap:6px;font-size:11px;padding:3px 0;color:${t.check(thumb)?'var(--success)':'var(--text-muted)'};">${t.check(thumb)?'✅':'○'} <span><strong>${t.label}</strong>${!t.check(thumb)?`<br><span style="font-size:10px;color:var(--text-muted);">${t.tip}</span>`:''}</span></div>`).join('')}
            </div>`;
        }).filter(Boolean).join('') + '</div>';
    }
    markUnsaved();
  }


  function ab_addVariant() {
    const container = document.getElementById('ab_variants_container');
    const count = container.querySelectorAll('.ab-variant').length;
    if (count >= 5) { showToast('Maximum 5 variants', 'var(--warning)'); return; }
    const letters = ['A','B','C','D','E'];
    const color = AB_COLORS[count];
    const div = document.createElement('div');
    div.className = 'ab-variant';
    div.id = `ab_variant_${count}`;
    div.style.marginTop = '12px';
    div.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;flex-wrap:wrap;gap:8px;">
        <div style="font-weight:700;color:${color};font-size:13px;">Variant ${letters[count]}</div>
        <button onclick="ab_removeVariant(${count})" style="background:var(--danger-dim);color:var(--danger);border:1px solid var(--danger);padding:3px 10px;border-radius:6px;cursor:pointer;font-size:11px;">Remove</button>
      </div>
      <div class="input-grid">
        <div class="input-box" style="grid-column:1/-1;"><label>Title</label><input type="text" class="ab-title" placeholder="Variant ${letters[count]} title..." oninput="ab_recalculate()"></div>
        <div class="input-box" style="grid-column:1/-1;"><label>Thumbnail Concept</label><input type="text" class="ab-thumb" placeholder="Describe your thumbnail concept..."></div>
        <div class="input-box"><label>Impressions</label><input type="number" class="ab-impr" placeholder="0" min="0" oninput="ab_recalculate()"></div>
        <div class="input-box"><label>Clicks</label><input type="number" class="ab-clicks" placeholder="0" min="0" oninput="ab_recalculate()"></div>
        <div class="input-box"><label>Avg Watch (mins)</label><input type="number" class="ab-avd" placeholder="0" step="0.1" oninput="ab_recalculate()"></div>
        <div class="input-box"><label>Likes</label><input type="number" class="ab-likes" placeholder="0" min="0" oninput="ab_recalculate()"></div>
      </div>
      <div class="ab-ctr-bar-wrap" style="margin-top:12px;"><div class="ab-ctr-bar" style="width:0%;background:${color};"></div></div>
      <div class="ab-result-row" style="display:flex;gap:16px;margin-top:8px;flex-wrap:wrap;font-size:12px;color:var(--text-dim);"></div>`;
    container.appendChild(div);
  }


  function ab_removeVariant(idx) {
    const v = document.getElementById(`ab_variant_${idx}`);
    if (v) v.remove();
    ab_recalculate();
  }


  function ab_saveTest() {
    const name = document.getElementById('ab_test_name')?.value || 'Untitled Test';
    const variants = [];
    document.querySelectorAll('.ab-variant').forEach(v => {
      variants.push({
        title: v.querySelector('.ab-title')?.value || '',
        thumb: v.querySelector('.ab-thumb')?.value || '',
        impr: parseFloat(v.querySelector('.ab-impr')?.value) || 0,
        clicks: parseFloat(v.querySelector('.ab-clicks')?.value) || 0,
        avd: parseFloat(v.querySelector('.ab-avd')?.value) || 0,
        likes: parseFloat(v.querySelector('.ab-likes')?.value) || 0,
      });
    });
    const test = { id: Date.now(), name, niche: document.getElementById('ab_niche')?.value, savedAt: new Date().toISOString(), variants };
    abSavedTests.unshift(test);
    if (abSavedTests.length > 20) abSavedTests.pop();
    try { localStorage.setItem('ccABTests', JSON.stringify(abSavedTests)); } catch(e) {}
    renderABHistory();
    showToast('✅ Test saved!', 'var(--success)');
  }


  function ab_clearCurrent() {
    document.getElementById('ab_test_name').value = '';
    document.querySelectorAll('.ab-variant input').forEach(i => i.value = '');
    document.querySelectorAll('.ab-ctr-bar').forEach(b => b.style.width = '0%');
    document.querySelectorAll('.ab-result-row').forEach(r => r.innerHTML = '');
    document.getElementById('ab_results_panel').style.display = 'none';
  }


  function ab_loadTest(ti) {
    const test = abSavedTests[ti];
    if (!test) return;
    document.getElementById('ab_test_name').value = test.name;
    const niEl = document.getElementById('ab_niche');
    if (niEl && test.niche) niEl.value = test.niche;
    // Clear current variants
    const container = document.getElementById('ab_variants_container');
    container.innerHTML = '';
    test.variants.forEach((v, i) => {
      // add variant
      if (i > 0) ab_addVariant();
      const vEl = document.getElementById(`ab_variant_${i}`);
      if (!vEl) return;
      if (vEl.querySelector('.ab-title')) vEl.querySelector('.ab-title').value = v.title;
      if (vEl.querySelector('.ab-thumb')) vEl.querySelector('.ab-thumb').value = v.thumb;
      if (vEl.querySelector('.ab-impr')) vEl.querySelector('.ab-impr').value = v.impr;
      if (vEl.querySelector('.ab-clicks')) vEl.querySelector('.ab-clicks').value = v.clicks;
      if (vEl.querySelector('.ab-avd')) vEl.querySelector('.ab-avd').value = v.avd;
      if (vEl.querySelector('.ab-likes')) vEl.querySelector('.ab-likes').value = v.likes;
    });
    // Re-add variant A which was cleared
    if (test.variants.length > 0) {
      const v = test.variants[0];
      const vEl = document.getElementById('ab_variant_0');
      if (vEl) {
        if (vEl.querySelector('.ab-title')) vEl.querySelector('.ab-title').value = v.title;
        if (vEl.querySelector('.ab-thumb')) vEl.querySelector('.ab-thumb').value = v.thumb;
        if (vEl.querySelector('.ab-impr')) vEl.querySelector('.ab-impr').value = v.impr;
        if (vEl.querySelector('.ab-clicks')) vEl.querySelector('.ab-clicks').value = v.clicks;
        if (vEl.querySelector('.ab-avd')) vEl.querySelector('.ab-avd').value = v.avd;
        if (vEl.querySelector('.ab-likes')) vEl.querySelector('.ab-likes').value = v.likes;
      }
    }
    ab_recalculate();
    showToast('✅ Test loaded', 'var(--success)');
  }


  function ab_deleteTest(ti) {
    if (!confirm('Delete this saved test?')) return;
    abSavedTests.splice(ti, 1);
    try { localStorage.setItem('ccABTests', JSON.stringify(abSavedTests)); } catch(e) {}
    renderABHistory();
  }


  function renderABHistory() {
    const el = document.getElementById('ab_history_list');
    if (!el) return;
    if (!abSavedTests.length) {
      el.innerHTML = '<div style="background:var(--card2);border:1px dashed var(--border-hi);border-radius:var(--radius);padding:16px;text-align:center;color:var(--text-dim);font-size:12px;">No saved tests yet.</div>';
      return;
    }
    el.innerHTML = abSavedTests.map((test, ti) => {
      const bestVariant = test.variants.reduce((best, v, i) => {
        const ctr = v.impr > 0 ? (v.clicks/v.impr)*100 : 0;
        return ctr > best.ctr ? {ctr, idx: i} : best;
      }, {ctr: 0, idx: 0});
      const letters = ['A','B','C','D','E'];
      return `
        <div style="background:var(--card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:16px;margin-bottom:10px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
          <div>
            <div style="font-weight:700;color:var(--text-bright);font-size:13px;">${test.name}</div>
            <div style="font-size:11px;color:var(--text-dim);margin-top:3px;">${new Date(test.savedAt).toLocaleDateString()} · ${test.variants.length} variants${bestVariant.ctr > 0 ? ' · Best: Variant '+letters[bestVariant.idx]+' ('+bestVariant.ctr.toFixed(2)+'% CTR)' : ''}</div>
          </div>
          <div style="display:flex;gap:8px;">
            <button onclick="ab_loadTest(${ti})" class="btn-secondary" style="font-size:11px;padding:5px 12px;">Load</button>
            <button onclick="ab_deleteTest(${ti})" style="background:var(--danger-dim);color:var(--danger);border:1px solid var(--danger);border-radius:6px;padding:5px 12px;cursor:pointer;font-size:11px;">Delete</button>
          </div>
        </div>`;
    }).join('');
  }


  async function fetchChannel(num) {
    const apiKey = document.getElementById('cmp_api_key').value.trim()
      || (document.getElementById('yt_api_key') ? document.getElementById('yt_api_key').value.trim() : '');
    if (!apiKey) {
      document.getElementById(`cmp_status${num}`).innerHTML = '<span style="color:var(--danger);">⚠ Paste your API key above first</span>';
      return;
    }
    const raw = document.getElementById(`cmp_id${num}`).value.trim();
    if (!raw) return;
    const statusEl = document.getElementById(`cmp_status${num}`);
    statusEl.innerHTML = '<span style="color:var(--text-dim);">🔄 Fetching...</span>';

    try {
      let channelId = raw;
      // If it's a handle (@name) or username, resolve to channel ID first
      if (raw.startsWith('@') || !raw.startsWith('UC')) {
        const handle = raw.startsWith('@') ? raw.slice(1) : raw;
        // Try forHandle
        const handleRes = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=id,snippet,statistics&forHandle=${encodeURIComponent(raw.startsWith('@') ? raw : '@'+raw)}&key=${apiKey}`);
        const handleJson = await handleRes.json();
        if (handleJson.error) throw new Error(handleJson.error.message);
        if (handleJson.items && handleJson.items.length > 0) {
          await populateChannel(num, handleJson.items[0], apiKey);
          statusEl.innerHTML = '<span style="color:var(--secondary);">✅ Loaded via handle</span>';
          return;
        }
        // Fallback: try forUsername
        const userRes = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=id,snippet,statistics&forUsername=${encodeURIComponent(handle)}&key=${apiKey}`);
        const userJson = await userRes.json();
        if (userJson.items && userJson.items.length > 0) {
          await populateChannel(num, userJson.items[0], apiKey);
          statusEl.innerHTML = '<span style="color:var(--secondary);">✅ Loaded via username</span>';
          return;
        }
        // Fallback: search
        const searchRes = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${encodeURIComponent(raw)}&maxResults=1&key=${apiKey}`);
        const searchJson = await searchRes.json();
        if (searchJson.error) throw new Error(searchJson.error.message);
        if (!searchJson.items || !searchJson.items.length) throw new Error('Channel not found');
        channelId = searchJson.items[0].snippet.channelId || searchJson.items[0].id.channelId;
      }
      // Fetch by channel ID
      const res = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=id,snippet,statistics,contentDetails&id=${encodeURIComponent(channelId)}&key=${apiKey}`);
      const json = await res.json();
      if (json.error) throw new Error(json.error.message);
      if (!json.items || !json.items.length) throw new Error('Channel not found');
      await populateChannel(num, json.items[0], apiKey);
      statusEl.innerHTML = '<span style="color:var(--secondary);">✅ Loaded</span>';
    } catch(err) {
      statusEl.innerHTML = `<span style="color:var(--danger);">❌ ${err.message}</span>`;
    }
  }


  async function populateChannel(num, item, apiKey) {
    const colors = ['var(--primary)', 'var(--secondary)', 'var(--accent)'];
    const col = colors[num - 1];
    const stats = item.statistics || {};
    const snippet = item.snippet || {};
    const subs = parseInt(stats.subscriberCount) || 0;
    const totalViews = parseInt(stats.viewCount) || 0;
    const videoCount = parseInt(stats.videoCount) || 0;

    // Estimate channel age from publishedAt to estimate monthly views
    let monthlyViews = 0;
    if (snippet.publishedAt && totalViews > 0) {
      const ageMs = Date.now() - new Date(snippet.publishedAt).getTime();
      const ageMonths = Math.max(ageMs / (1000 * 60 * 60 * 24 * 30.4), 1);
      monthlyViews = Math.round(totalViews / ageMonths);
    }

    // Fill in fields
    document.getElementById(`cmp_subs${num}`).value = subs;
    document.getElementById(`cmp_totalviews${num}`).value = totalViews;
    document.getElementById(`cmp_videocount${num}`).value = videoCount;
    document.getElementById(`cmp_views${num}`).value = monthlyViews;

    // Thumbnail + name
    const thumb = snippet.thumbnails?.default?.url || snippet.thumbnails?.medium?.url || '';
    const chName = snippet.title || item.id;
    const chHandle = snippet.customUrl || item.id;
    document.getElementById(`cmp_thumb${num}`).src = thumb;
    document.getElementById(`cmp_chname${num}`).innerText = chName;
    document.getElementById(`cmp_chhandle${num}`).innerText = chHandle;
    document.getElementById(`cmp_preview${num}`).style.display = 'block';

    // Store name for compare
    const nameInput = document.getElementById(`cmp_id${num}`);
    nameInput.dataset.resolvedName = chName;

    runCompare();
  }


  function runCompare() {
    const colors = ['var(--primary)', 'var(--secondary)', 'var(--accent)'];

    const channels = [1,2,3].map(i => {
      const nameEl = document.getElementById(`cmp_id${i}`);
      const name = (nameEl && nameEl.dataset.resolvedName) || (nameEl && nameEl.value.trim()) || `Channel ${i}`;
      return {
        name,
        subs: parseFloat(document.getElementById(`cmp_subs${i}`)?.value)||0,
        totalViews: parseFloat(document.getElementById(`cmp_totalviews${i}`)?.value)||0,
        videoCount: parseFloat(document.getElementById(`cmp_videocount${i}`)?.value)||0,
        views: parseFloat(document.getElementById(`cmp_views${i}`)?.value)||0,
        ctr: parseFloat(document.getElementById(`cmp_ctr${i}`)?.value)||0,
        avd: parseFloat(document.getElementById(`cmp_avd${i}`)?.value)||0,
        rpm: parseFloat(document.getElementById(`cmp_rpm${i}`)?.value)||0,
      };
    });

    const active = channels.filter(c => c.subs > 0 || c.views > 0 || c.totalViews > 0);
    if (active.length < 2) { document.getElementById('cmp_results').style.display = 'none'; return; }
    document.getElementById('cmp_results').style.display = 'block';

    // Derived metrics
    channels.forEach(c => {
      c.viewsPerSub = c.subs > 0 && c.views > 0 ? ((c.views / c.subs) * 100).toFixed(2) : null;
      c.viewsPerVideo = c.videoCount > 0 && c.totalViews > 0 ? Math.round(c.totalViews / c.videoCount) : null;
      c.revenueMonthLow = c.views > 0 ? (c.rpm > 0 ? c.views / 1000 * c.rpm : c.views / 1000 * 2) : 0;
      c.revenueMonthHigh = c.views > 0 ? (c.rpm > 0 ? c.views / 1000 * c.rpm : c.views / 1000 * 8) : 0;
    });

    // Comparison table
    const metrics = [
      { label: 'Subscribers', key: 'subs', fmt: v => v > 0 ? v.toLocaleString() : '—' },
      { label: 'Total Lifetime Views', key: 'totalViews', fmt: v => v > 0 ? v.toLocaleString() : '—' },
      { label: 'Videos Published', key: 'videoCount', fmt: v => v > 0 ? v.toLocaleString() : '—' },
      { label: 'Est. Avg Views / Video', key: 'viewsPerVideo', fmt: v => v != null && v > 0 ? v.toLocaleString() : '—' },
      { label: 'Est. Monthly Views', key: 'views', fmt: v => v > 0 ? v.toLocaleString() : '—' },
      { label: 'Monthly Views / Sub %', key: 'viewsPerSub', fmt: v => v != null ? v+'%' : '—' },
      { label: 'Avg CTR % (manual)', key: 'ctr', fmt: v => v > 0 ? v.toFixed(1)+'%' : '—' },
      { label: 'Avg Watch Time (manual)', key: 'avd', fmt: v => v > 0 ? v.toFixed(1)+' min' : '—' },
      { label: 'Est. RPM (manual)', key: 'rpm', fmt: v => v > 0 ? '$'+v.toFixed(2) : '—' },
    ];

    let thtml = `<table style="width:100%;border-collapse:collapse;font-size:14px;"><thead><tr>
      <th style="padding:11px 14px;text-align:left;background:var(--card);color:var(--text-dim);font-family:var(--font-mono);font-size:11px;text-transform:uppercase;border-bottom:2px solid var(--border);">Metric</th>`;
    channels.forEach((c,i) => {
      thtml += `<th style="padding:11px 14px;text-align:center;background:var(--card);color:${colors[i]};font-size:13px;border-bottom:2px solid var(--border);border-left:1px solid var(--border);">${c.name}</th>`;
    });
    thtml += `</tr></thead><tbody>`;
    metrics.forEach(m => {
      const vals = channels.map(c => parseFloat(c[m.key]) || 0);
      const maxVal = Math.max(...vals);
      thtml += `<tr><td style="padding:11px 14px;color:var(--text-dim);font-size:13px;border-bottom:1px solid var(--border);font-weight:600;">${m.label}</td>`;
      channels.forEach((c,i) => {
        const numV = parseFloat(c[m.key]) || 0;
        const isBest = maxVal > 0 && numV === maxVal;
        thtml += `<td style="padding:11px 14px;text-align:center;font-weight:700;font-family:var(--font-mono);font-size:13px;border-bottom:1px solid var(--border);border-left:1px solid var(--border);color:${isBest ? colors[i] : 'var(--text)'};background:${isBest ? colors[i].replace('var(--','').replace(')','')+'11' : 'transparent'};">${m.fmt(c[m.key])}${isBest && numV > 0 ? ' ★' : ''}</td>`;
      });
      thtml += `</tr>`;
    });
    thtml += `</tbody></table>`;
    document.getElementById('cmp_table_wrap').innerHTML = thtml;

    // Revenue cards
    document.getElementById('cmp_revenue_grid').innerHTML = channels.map((c,i) => `
      <div class="stat-mini" style="border-color:${colors[i]};border-width:2px;">
        <div class="label" style="color:${colors[i]};">${c.name}</div>
        <div class="value" style="color:${colors[i]};font-size:20px;">${c.revenueMonthLow > 0 ? '$'+Math.round(c.revenueMonthLow).toLocaleString()+' – $'+Math.round(c.revenueMonthHigh).toLocaleString() : '—'}</div>
        <div class="sub">/month est. range</div>
      </div>`).join('');

    // Rankings
    const rankCats = [
      { label: '🏆 Most Subscribers', key: 'subs' },
      { label: '👁️ Most Monthly Views', key: 'views' },
      { label: '📹 Most Videos', key: 'videoCount' },
      { label: '📊 Best Views/Video', key: 'viewsPerVideo' },
      { label: '💰 Highest Est. Revenue', key: 'revenueMonthHigh' },
    ];
    document.getElementById('cmp_rankings').innerHTML = rankCats.map(rc => {
      const sorted = [...channels].map((c,i) => ({...c,_i:i}))
        .filter(c => (parseFloat(c[rc.key])||0) > 0)
        .sort((a,b) => (parseFloat(b[rc.key])||0)-(parseFloat(a[rc.key])||0));
      if (!sorted.length) return '';
      const w = sorted[0];
      return `<div class="info-card" style="border-left:3px solid ${colors[w._i]};margin-bottom:0;">
        <h4 style="color:${colors[w._i]};margin-bottom:4px;">${rc.label}</h4>
        <div style="font-size:17px;font-weight:800;color:${colors[w._i]};font-family:var(--font-display);">${w.name}</div>
        <div style="font-size:11px;color:var(--text-dim);margin-top:4px;">${sorted.map((c,ri)=>`#${ri+1} ${c.name}`).join(' · ')}</div>
      </div>`;
    }).join('');

    // Insights
    const bestSubs = channels.reduce((a,b)=>a.subs>=b.subs?a:b);
    const bestViews = channels.reduce((a,b)=>a.views>=b.views?a:b);
    document.getElementById('cmp_insights').innerHTML = `
      <div class="info-card" style="border-left:3px solid var(--warning);">
        <h4 style="color:var(--warning);">📡 Subscriber Leader: ${bestSubs.name}</h4>
        <p style="margin:0;font-size:13px;color:var(--text);">With ${bestSubs.subs.toLocaleString()} subscribers, ${bestSubs.name} has the largest established audience. Compare their views-per-sub ratio to understand how actively their audience watches content.</p>
      </div>
      <div class="info-card" style="border-left:3px solid var(--primary);">
        <h4 style="color:var(--primary);">👁️ Reach Leader: ${bestViews.name}</h4>
        <p style="margin:0;font-size:13px;color:var(--text);">${bestViews.name} drives the most estimated monthly views. High monthly views relative to subscribers can signal strong algorithmic distribution — the content reaches well beyond the subscriber base.</p>
      </div>
      <div class="insight-box">
        <span class="icon">💡</span>
        <div><strong style="color:var(--primary);">API Note:</strong> The YouTube Data API provides subscriber count, total lifetime views, and video count publicly. CTR and average watch time are private analytics — add them manually if available. Monthly views are estimated from total views divided by channel age.</div>
      </div>`;
  }


  function syncCmpApiKey() {
    const key = document.getElementById('cmp_api_key').value;
    const ytField = document.getElementById('yt_api_key');
    if (ytField && !ytField.value) ytField.value = key;
    try { localStorage.setItem('ccYTApiKey', key); } catch(e) {}
  }


  async function lookupChannelId() {
    const raw = (document.getElementById('lookup_handle')?.value || '').trim();
    if (!raw) return;
    const apiKey = (document.getElementById('cmp_api_key')?.value || '').trim()
                || localStorage.getItem('ccYTApiKey') || '';
    const res = document.getElementById('lookup_result');
    if (!apiKey) {
      res.innerHTML = '<span style="color:var(--danger);font-family:\'Share Tech Mono\',monospace;font-size:12px;">⚠️ Enter your API key above first.</span>';
      return;
    }
    res.innerHTML = '<span style="color:var(--text-dim);font-family:\'Share Tech Mono\',monospace;font-size:12px;">🔄 Looking up...</span>';
    try {
      const handle = raw.startsWith('@') ? raw : '@' + raw;
      const r = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=id,snippet&forHandle=${encodeURIComponent(handle)}&key=${apiKey}`);
      const j = await r.json();
      if (j.error) throw new Error(j.error.message);
      if (!j.items?.length) throw new Error('Channel not found. Try the exact @handle from their YouTube page.');
      const ch = j.items[0];
      const id = ch.id;
      const name = ch.snippet?.title || id;
      res.innerHTML = `
        <div style="background:var(--card2);border:1px solid var(--border-bright);border-radius:10px;padding:14px;margin-top:4px;">
          <div style="font-weight:700;color:var(--text-bright);margin-bottom:8px;font-size:14px;">${name}</div>
          <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
            <code style="background:var(--bg);border:1px solid var(--primary);border-radius:6px;padding:6px 12px;font-size:13px;color:var(--primary);font-family:var(--font-mono);">${id}</code>
            <button class="btn-primary" onclick="navigator.clipboard.writeText('${id}');showToast('✅ Channel ID copied!','var(--secondary)')" style="font-size:12px;padding:7px 14px;">📋 Copy</button>
            <button class="btn-secondary" onclick="document.getElementById('cmp_id1').value='${id}';showToast('✅ Set as Channel 1','var(--primary)')" style="font-size:12px;padding:7px 14px;">→ Use in Compare</button>
          </div>
        </div>`;
    } catch (err) {
      res.innerHTML = `<span style="color:var(--danger);font-family:var(--font-mono);font-size:12px;">❌ ${err.message}</span>`;
    }
  }

  function updateLinkPreview() {
    const url = document.getElementById('yt_channel_url')?.value || '';
    const el = document.getElementById('link_preview');
    if (el) { el.href = url; el.innerText = url || '—'; }
  }
  function updateQuickLinks() {}
  function loadSaveFromAccountTab() { document.getElementById('loadFileInput')?.click(); }
