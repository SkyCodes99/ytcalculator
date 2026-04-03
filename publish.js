/* ═══════════════════════════════════════════
   THE SOCIAL SPOT — publish.js
   Publishing Hub — Expanded Time Recommendations
═══════════════════════════════════════════ */

const TZ_OFFSETS = {
  PST:-8,MST:-7,CST:-6,EST:-5,GMT:0,CET:1,EET:2,MSK:3,IST:5.5,CST8:8,JST:9,AEST:10
};

function shiftTime(t, hrs) {
  const m = t.match(/(\d+):(\d+)\s*(AM|PM)/); if(!m) return t;
  let h=parseInt(m[1]),min=m[2],p=m[3];
  if(p==='PM'&&h!==12)h+=12; if(p==='AM'&&h===12)h=0;
  h=((h+hrs)%24+24)%24;
  const np=h>=12?'PM':'AM'; const dh=h%12===0?12:h%12;
  return `${dh}:${min} ${np}`;
}

// Extended niche data with multiple recommended time slots
const NICHE_DATA = {
  gaming:      {
    slots:[{l:'Primary',t:'4:00 PM'},{l:'Alt 1',t:'7:00 PM'},{l:'Alt 2',t:'9:00 AM'},{l:'Late Night',t:'9:00 PM'}],
    peak:'6:00 PM', days:['Tuesday','Thursday','Saturday','Sunday','Monday','Wednesday','Friday'],
    logic:'Gaming audiences spike after school/work (3–9 PM). Thursday–Sunday evenings dominate. Teen/young adult demographic peaks on weekends.'
  },
  vlogs:       {
    slots:[{l:'Primary',t:'3:00 PM'},{l:'Alt 1',t:'5:30 PM'},{l:'Alt 2',t:'11:00 AM'},{l:'Evening',t:'8:00 PM'}],
    peak:'5:00 PM', days:['Wednesday','Friday','Sunday','Tuesday','Thursday','Monday','Saturday'],
    logic:'Lifestyle peaks at prime time. Wednesday and Friday capture end-of-week browsing surges. Sunday morning is strong for long-form vlogs.'
  },
  tech:        {
    slots:[{l:'Primary',t:'12:00 PM'},{l:'Alt 1',t:'2:00 PM'},{l:'Alt 2',t:'8:00 AM'},{l:'Evening',t:'6:00 PM'}],
    peak:'2:00 PM', days:['Tuesday','Thursday','Wednesday','Monday','Friday','Saturday','Sunday'],
    logic:'Tech audiences peak during lunch and early afternoon. Tuesday and Thursday have the highest CTR for this niche. Morning uploads catch commuters.'
  },
  finance:     {
    slots:[{l:'Primary',t:'6:30 AM'},{l:'Alt 1',t:'8:00 AM'},{l:'Lunch',t:'12:00 PM'},{l:'Evening',t:'7:00 PM'}],
    peak:'8:00 AM', days:['Tuesday','Wednesday','Thursday','Monday','Friday','Saturday','Sunday'],
    logic:'Finance viewers engage during morning commute. Tuesday–Thursday dominate. Early AM uploads capture pre-market traders and morning routine watchers.'
  },
  collectibles:{
    slots:[{l:'Primary',t:'2:00 PM'},{l:'Alt 1',t:'4:30 PM'},{l:'Alt 2',t:'7:00 PM'},{l:'Morning',t:'10:00 AM'}],
    peak:'4:00 PM', days:['Saturday','Sunday','Friday','Wednesday','Thursday','Tuesday','Monday'],
    logic:'Hobby audiences most active on weekends and Friday evenings. Saturday afternoon is the top window — leisure time drives highest session duration.'
  },
  fitness:     {
    slots:[{l:'Primary',t:'6:00 AM'},{l:'Lunch',t:'12:00 PM'},{l:'Alt 1',t:'5:00 PM'},{l:'Evening',t:'7:30 PM'}],
    peak:'6:00 AM', days:['Monday','Wednesday','Friday','Tuesday','Thursday','Saturday','Sunday'],
    logic:'Fitness audiences watch during morning workout time and lunch. Monday is the #1 day — people restart routines. Post-work evening is strong for motivation content.'
  },
  food:        {
    slots:[{l:'Brunch',t:'11:00 AM'},{l:'Primary',t:'5:00 PM'},{l:'Dinner Prep',t:'6:30 PM'},{l:'Alt 1',t:'9:00 AM'}],
    peak:'11:00 AM', days:['Sunday','Thursday','Wednesday','Friday','Saturday','Tuesday','Monday'],
    logic:'Food content peaks before meal times — brunch and dinner prep windows. Sunday and Thursday are highest engagement days. Morning recipe content drives saves.'
  },
  beauty:      {
    slots:[{l:'Primary',t:'3:00 PM'},{l:'Alt 1',t:'7:00 PM'},{l:'Morning',t:'10:00 AM'},{l:'Weekend',t:'11:00 AM'}],
    peak:'5:00 PM', days:['Wednesday','Friday','Saturday','Sunday','Tuesday','Thursday','Monday'],
    logic:'Beauty audiences active after school/work. Weekday afternoons and Saturday mornings perform best for routine and "get ready with me" formats.'
  },
  news:        {
    slots:[{l:'AM News',t:'7:30 AM'},{l:'Lunch',t:'12:00 PM'},{l:'Evening',t:'5:00 PM'},{l:'Late',t:'9:00 PM'}],
    peak:'8:00 AM', days:['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
    logic:'News audiences check in at morning, lunch, and after work. Publish ASAP for breaking news. Weekdays dominate; AM uploads capture commute scrolling.'
  },
  kids:        {
    slots:[{l:'After School',t:'2:30 PM'},{l:'Morning',t:'9:00 AM'},{l:'Alt 1',t:'5:30 PM'},{l:'Weekend AM',t:'8:30 AM'}],
    peak:'3:30 PM', days:['Saturday','Sunday','Friday','Monday','Wednesday','Tuesday','Thursday'],
    logic:'Kids content peaks after school and on weekend mornings. Saturday is the top day. Parents often pre-load content in the morning for afternoon viewing.'
  },
};

// Short-form platform-specific slots
const SHORT_SLOTS = {
  yt_short: [{l:'Primary',t:'12:00 PM'},{l:'Alt 1',t:'6:00 PM'},{l:'Morning',t:'9:00 AM'},{l:'Night',t:'9:00 PM'}],
  tiktok:   [{l:'Evening',t:'7:00 PM'},{l:'Peak Night',t:'9:00 PM'},{l:'Lunch',t:'12:00 PM'},{l:'Morning',t:'10:00 AM'}],
  reels:    [{l:'Morning',t:'8:00 AM'},{l:'Primary',t:'11:00 AM'},{l:'Prime Time',t:'7:00 PM'},{l:'Late Eve',t:'9:30 PM'}],
  linkedin: [{l:'Early AM',t:'7:30 AM'},{l:'Morning',t:'9:00 AM'},{l:'Lunch',t:'12:00 PM'},{l:'PM',t:'5:00 PM'}],
  twitter:  [{l:'Morning',t:'8:00 AM'},{l:'Lunch',t:'12:00 PM'},{l:'Evening',t:'5:30 PM'},{l:'Night',t:'9:00 PM'}],
};

function calculateUploadTime() {
  const format  = document.getElementById('u_format')?.value  || 'yt_long';
  const niche   = document.getElementById('u_niche')?.value   || 'vlogs';
  const tz      = document.getElementById('u_tz')?.value      || 'EST';
  const freq    = parseInt(document.getElementById('u_freq')?.value) || 3;
  const age     = document.getElementById('u_age')?.value     || 'any';
  const geo     = document.getElementById('u_geo')?.value     || 'us';
  const chsize  = document.getElementById('u_chsize')?.value  || 'small';
  const vidlen  = document.getElementById('u_vidlen')?.value  || 'medium';

  const hDiff = (TZ_OFFSETS[tz] ?? -5) - (-5);
  const nd = NICHE_DATA[niche] || NICHE_DATA.vlogs;
  const isShort = ['yt_short','tiktok','reels','linkedin','twitter'].includes(format);
  const baseSlots = isShort ? (SHORT_SLOTS[format] || SHORT_SLOTS.tiktok) : nd.slots;
  const adjusted = baseSlots.map(s => ({ ...s, t: shiftTime(s.t, hDiff) }));
  const peakAdj  = shiftTime(nd.peak, hDiff);
  const tzLabel  = tz.replace(/\d/g,'');

  // Contextual notes based on extra inputs
  const notes = [];
  if (age==='u18')    notes.push('Under-18 audience: favour after-school (3–6 PM) and weekend mornings.');
  if (age==='45plus') notes.push('45+ audience: morning (7–10 AM) and evening (7–9 PM) outperform afternoon slots.');
  if (age==='25-34')  notes.push('25–34 audience: lunch breaks (11 AM–1 PM) and post-work evenings (6–9 PM) are peak windows.');
  if (geo==='eu')     notes.push('European audience: add 5–6 hours for CET peak — morning uploads hit European prime time.');
  if (geo==='asia')   notes.push('Asia Pacific: 13–16 hr offset from EST. Evening uploads here = morning there.');
  if (chsize==='new') notes.push('New channel: prioritise consistency over perfect timing — volume helps the algorithm learn your pattern.');
  if (chsize==='large') notes.push('Large channel: your notification subscribers matter most — publish at their active window.');
  if (vidlen==='vlong') notes.push('30+ min video: publish 3–4 hours before peak — longer indexing + notification window needed.');
  if (vidlen==='short' && !isShort) notes.push('Under 5 min: 1 hour before peak is sufficient — indexing window is shorter.');

  const contextNote = notes.length ? '<br><br>📌 <strong>Audience adjustments:</strong> '+notes.join(' ') : '';
  const formatNote = isShort
    ? `<br><br><strong style="color:var(--primary)">Short-Form:</strong> Post <em>during</em> peak — the first 30–60 minutes determine batch expansion. Engage comments immediately after posting.`
    : `<br><br><strong style="color:var(--primary)">Long-Form:</strong> Post 2 hours <em>before</em> peak (${peakAdj} ${tzLabel}) so indexing and notifications fire before your audience's active session.`;

  const lg = document.getElementById('u_logic');
  if (lg) lg.innerHTML = nd.logic + contextNote + formatNote;

  // Render slot cards (show all 4 options)
  const ps = document.getElementById('u_publish_slots');
  if (ps) {
    ps.innerHTML = adjusted.map((s,i) => `
      <div style="background:var(--card2);border:1px solid ${i===0?'var(--primary)':'var(--border)'};border-radius:var(--radius-lg);padding:14px;text-align:center;">
        <div style="font-size:9px;font-weight:700;color:${i===0?'var(--primary)':'var(--text-dim)'};text-transform:uppercase;letter-spacing:1px;margin-bottom:5px;">${s.l}</div>
        <div style="font-size:19px;font-weight:800;color:${i===0?'var(--primary)':'var(--text-bright)'};">${s.t} <span style="font-size:12px;">${tzLabel}</span></div>
        ${i===0?'<div style="font-size:9px;color:var(--text-dim);margin-top:3px;">★ Recommended</div>':''}
      </div>`).join('');
  }

  // Weekly schedule
  const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
  const publishDays = nd.days.slice(0, freq);
  const sg = document.getElementById('u_schedule_grid');
  if (sg) {
    sg.innerHTML = days.map(day => {
      const isPub = publishDays.includes(day);
      return `<div class="schedule-day${isPub?' publish-day':''}">
        <div class="day-name">${day.slice(0,3)}</div>
        <div class="day-icon">${isPub?'🎬':'—'}</div>
        <div class="day-label">${isPub?'PUBLISH':'Rest'}</div>
        ${isPub?`<div class="day-time">${adjusted[0]?.t||''}</div>`:''}
      </div>`;
    }).join('');
  }

  // Insights
  const ui = document.getElementById('u_insights');
  if (ui) {
    ui.innerHTML = `
      <div class="card"><strong style="color:var(--danger)">📊 Consistency Signal</strong>
        <p style="font-size:11px;color:var(--text-dim);margin-top:5px;">YouTube models upload cadence. A predictable schedule trains notification delivery and helps the algorithm forecast your next video's performance window.</p>
      </div>
      <div class="card"><strong style="color:var(--secondary)">⚡ ${isShort?'First 60 Minutes':'First 48 Hours'}</strong>
        <p style="font-size:11px;color:var(--text-dim);margin-top:5px;">${isShort?'Short-form platforms batch-test within the first hour. Share to Stories and DMs immediately to spike early engagement signals.':'YouTube evaluates momentum during the first 48 hours. Schedule cross-posts and Community Posts to fire within the first few hours.'}</p>
      </div>
      <div class="card"><strong style="color:var(--primary)">📅 Best Days for ${niche.charAt(0).toUpperCase()+niche.slice(1)}</strong>
        <p style="font-size:11px;color:var(--text-dim);margin-top:5px;">Top days: <strong style="color:var(--primary)">${nd.days.slice(0,4).join(' › ')}</strong>. Reserve highest-production uploads for top 1–2 days.</p>
      </div>`;
  }
}
