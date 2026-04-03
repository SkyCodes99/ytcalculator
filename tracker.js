/* ═══════════════════════════════════════════
   THE SOCIAL SPOT — tracker.js
   Video Tracker + Channel Compare + Live Sub Tracker
═══════════════════════════════════════════ */

/* ══════════════
   VIDEO TRACKER
══════════════ */
function saveAPIKeyT() {
  try {
    localStorage.setItem('ss_ytkey', document.getElementById('yt_api_key')?.value||'');
    localStorage.setItem('ss_ytids', document.getElementById('yt_video_ids')?.value||'');
  } catch(e) {}
}
function loadAPIKeyT() {
  const k=localStorage.getItem('ss_ytkey'); const v=localStorage.getItem('ss_ytids');
  if(k && document.getElementById('yt_api_key')) document.getElementById('yt_api_key').value=k;
  if(v && document.getElementById('yt_video_ids')) document.getElementById('yt_video_ids').value=v;
}
async function fetchAPIData() {
  const key = document.getElementById('yt_api_key')?.value.trim();
  const ids = document.getElementById('yt_video_ids')?.value.trim();
  const st  = document.getElementById('api_status');
  if(!key||!ids){if(st)st.innerHTML='<span style="color:var(--danger)">⚠ Enter API key and Video ID(s)</span>';return;}
  const vids = ids.split(',').map(s=>s.trim()).filter(Boolean).slice(0,5);
  if(st)st.innerHTML='<span style="color:var(--text-dim)">🔄 Fetching...</span>';
  const btn=document.getElementById('apiFetchBtn');if(btn)btn.disabled=true;
  const today=new Date().toISOString().split('T')[0]; let fetched=0;
  for(const vid of vids){
    try{
      const r=await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${vid}&part=statistics,contentDetails,snippet&key=${key}`);
      const j=await r.json(); if(j.error){if(st)st.innerHTML=`<span style="color:var(--danger)">❌ ${j.error.message}</span>`;break;}
      if(!j.items?.length){if(st)st.innerHTML+=`<br><span style="color:var(--warning)">⚠ Not found: ${vid}</span>`;continue;}
      const item=j.items[0]; const title=item.snippet.title.substring(0,40);
      const stats=item.statistics; const views=parseInt(stats.viewCount)||0; const likes=parseInt(stats.likeCount)||0;
      const k2=title||vid;
      if(!trackingDataObj[k2])trackingDataObj[k2]=[];
      const entry={date:today,imp:0,views,ctr:0,avd:0,likes,apiNote:'Auto-fetched.'};
      const ex=trackingDataObj[k2].find(e=>e.date===today);
      if(!ex)trackingDataObj[k2].push(entry);else Object.assign(ex,entry);
      fetched++;
    }catch(err){if(st)st.innerHTML=`<span style="color:var(--danger)">❌ ${err.message}</span>`;break;}
  }
  if(fetched>0){saveTrackerData();updateVideoDropdown();if(st)st.innerHTML=`<span style="color:var(--success)">✅ Fetched ${fetched} video(s).</span>`;}
  if(btn)btn.disabled=false;
  adminLog('info', `API fetch: ${fetched} video(s) fetched`);
}
function updateVideoDropdown(){
  const sel=document.getElementById('videoSelect');if(!sel)return;
  sel.innerHTML='';
  for(const key in trackingDataObj){const opt=document.createElement('option');opt.value=key;opt.textContent=key;sel.appendChild(opt);}
  if(!trackingDataObj[currentVideoKey])currentVideoKey=Object.keys(trackingDataObj)[0]||'Default Video';
  sel.value=currentVideoKey;renderTracker();
}
function switchVideo(){currentVideoKey=document.getElementById('videoSelect')?.value||'Default Video';renderTracker();}
function createNewVideo(){
  const name=document.getElementById('newVideoName')?.value.trim();
  if(!name||trackingDataObj[name]){if(trackingDataObj[name])alert('Already exists');return;}
  trackingDataObj[name]=[];currentVideoKey=name;
  document.getElementById('newVideoName').value='';
  updateVideoDropdown();saveTrackerData();
}
function deleteCurrentVideo(){
  if(Object.keys(trackingDataObj).length<=1){alert('Keep at least one');return;}
  if(confirm(`Delete "${currentVideoKey}"?`)){delete trackingDataObj[currentVideoKey];currentVideoKey=Object.keys(trackingDataObj)[0];updateVideoDropdown();saveTrackerData();}
}
function addTrackerEntry(){
  const entry={
    date:document.getElementById('trk_date')?.value,
    imp:parseInt(document.getElementById('trk_imp')?.value)||0,
    views:parseInt(document.getElementById('trk_views')?.value)||0,
    ctr:parseFloat(document.getElementById('trk_ctr')?.value)||0,
    avd:parseFloat(document.getElementById('trk_avd')?.value)||0,
    likes:parseInt(document.getElementById('trk_likes')?.value)||0
  };
  if(!entry.date){alert('Select a date');return;}
  trackingDataObj[currentVideoKey].push(entry);renderTracker();saveTrackerData();
}
function renderTracker(){
  const tbody=document.getElementById('trackerBody');if(!tbody)return;
  let data=trackingDataObj[currentVideoKey]||[];
  data.sort((a,b)=>new Date(a.date)-new Date(b.date));
  tbody.innerHTML=data.map((e,i)=>`<tr style="border-bottom:1px solid var(--border);">
    <td style="padding:10px 13px;font-size:11px;color:var(--text-dim)">${e.date}</td>
    <td style="padding:10px 13px">${e.imp?e.imp.toLocaleString():'—'}</td>
    <td style="padding:10px 13px;font-weight:700;color:var(--primary)">${e.views.toLocaleString()}</td>
    <td style="padding:10px 13px">${e.ctr?e.ctr.toFixed(1)+'%':'—'}</td>
    <td style="padding:10px 13px">${e.avd?e.avd.toFixed(1)+'%':'—'}</td>
    <td style="padding:10px 13px">${e.likes?e.likes.toLocaleString():'—'}</td>
    <td style="padding:10px 13px"><button onclick="removeEntry(${i})" style="background:var(--danger-dim);color:var(--danger);border:none;border-radius:5px;padding:3px 9px;cursor:pointer;font-size:10px;">✕</button></td>
  </tr>`).join('');
  generateInsight(data);renderSummary(data);
}
function removeEntry(i){trackingDataObj[currentVideoKey].splice(i,1);renderTracker();saveTrackerData();}
function renderSummary(data){
  const box=document.getElementById('trackerSummary');if(!box)return;
  if(!data.length){box.style.display='none';return;}
  box.style.display='grid';
  const tv=data.reduce((s,e)=>s+(e.views||0),0);
  const ac=data.filter(e=>e.ctr>0);const avgCtr=ac.length?ac.reduce((s,e)=>s+e.ctr,0)/ac.length:0;
  const aa=data.filter(e=>e.avd>0);const avgAvd=aa.length?aa.reduce((s,e)=>s+e.avd,0)/aa.length:0;
  box.innerHTML=`
    <div class="stat-card"><div class="stat-label">Total Views</div><div class="stat-value" style="font-size:17px;color:var(--danger)">${tv.toLocaleString()}</div></div>
    <div class="stat-card"><div class="stat-label">Avg CTR</div><div class="stat-value" style="font-size:17px;color:var(--primary)">${avgCtr.toFixed(1)}%</div></div>
    <div class="stat-card"><div class="stat-label">Avg AVD</div><div class="stat-value" style="font-size:17px;color:var(--success)">${avgAvd.toFixed(1)}%</div></div>
    <div class="stat-card"><div class="stat-label">Data Points</div><div class="stat-value" style="font-size:17px">${data.length}</div></div>`;
}
function generateInsight(data){
  const box=document.getElementById('trackerInsightBox');const txt=document.getElementById('trackerInsightText');
  if(!box||!txt)return;
  if(data.length<2){box.style.display='none';return;}
  box.style.display='flex';
  const prev=data[data.length-2];const curr=data[data.length-1];
  const vD=curr.views-prev.views;const iD=curr.imp-prev.imp;const cD=curr.ctr-prev.ctr;
  let insight='';
  if(iD>prev.imp*0.15){insight='<strong>📈 Algorithmic Spike:</strong> Reach expanding. '+(cD<-0.5?'CTR dropped — normal during expansion.':'CTR holding — breakout likely continuing.');}
  else if(vD>prev.views*0.2){insight='<strong>🚀 View Velocity Surge:</strong> Views growing faster than impressions — strong search discovery.';}
  else if(iD<=0&&cD<-1){insight='<strong>⚠️ Fatigue Alert:</strong> Impressions flat and CTR dropping. Consider a thumbnail A/B test.';}
  else if(vD<0){insight='<strong>📉 Cooling Off:</strong> View velocity declining. Normal past day 7–14. Consider cross-promotion.';}
  else{insight='<strong>📊 Steady State:</strong> Performance consistent with your core audience benchmarks.';}
  txt.innerHTML=insight;
}
function exportTrackerData(){
  const b=new Blob([JSON.stringify({version:'1.0',exported:new Date().toISOString(),data:trackingDataObj},null,2)],{type:'application/json'});
  const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='tracker_export.json';a.click();
}
function importTrackerData(evt){
  const f=evt.target.files[0];if(!f)return;
  const r=new FileReader();
  r.onload=e=>{try{const p=JSON.parse(e.target.result);const d=p.data||p;if(typeof d==='object'){if(confirm('Merge with existing?')){Object.assign(trackingDataObj,d);saveTrackerData();updateVideoDropdown();showToast('✅ Import successful!');}}}catch(err){alert('Invalid file');}};
  r.readAsText(f);evt.target.value='';
}
function clearAllData(){if(confirm('Clear ALL video tracking data?')){trackingDataObj={'Default Video':[]};saveTrackerData();updateVideoDropdown();}}

/* ══════════════
   CHANNEL COMPARE + CHANNEL ID LOOKUP
══════════════ */
function syncCmpApiKey(){
  const key=document.getElementById('cmp_api_key')?.value||'';
  try{localStorage.setItem('ss_ytkey',key);}catch(e){}
  const yt=document.getElementById('yt_api_key');if(yt&&!yt.value)yt.value=key;
}

async function lookupChannelId(){
  const raw=document.getElementById('lookup_handle')?.value.trim();
  if(!raw)return;
  const apiKey=document.getElementById('cmp_api_key')?.value.trim()||localStorage.getItem('ss_ytkey')||'';
  const res_el=document.getElementById('lookup_result');
  if(!apiKey){if(res_el)res_el.innerHTML='<span style="color:var(--danger)">⚠ Enter API key first</span>';return;}
  if(res_el)res_el.innerHTML='<span style="color:var(--text-dim)">🔄 Looking up...</span>';
  try{
    const h=raw.startsWith('@')?raw:'@'+raw;
    const resp=await fetch(`https://www.googleapis.com/youtube/v3/channels?part=id,snippet&forHandle=${encodeURIComponent(h)}&key=${apiKey}`);
    const json=await resp.json();
    if(json.error)throw new Error(json.error.message);
    if(!json.items?.length)throw new Error('Channel not found');
    const ch=json.items[0]; const id=ch.id; const name=ch.snippet.title;
    if(res_el)res_el.innerHTML=`
      <div style="background:var(--card2);border:1px solid var(--border);border-radius:var(--radius-lg);padding:12px;margin-top:8px;">
        <div style="font-weight:700;color:var(--text-bright);margin-bottom:5px;">${name}</div>
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
          <code style="background:var(--bg);border:1px solid var(--border-bright);padding:5px 11px;border-radius:7px;font-size:12px;color:var(--primary);font-family:'DM Mono',monospace;">${id}</code>
          <button class="btn btn-ghost btn-sm" onclick="navigator.clipboard.writeText('${id}');showToast('✅ Copied!')">Copy</button>
          <button class="btn btn-primary btn-sm" onclick="document.getElementById('cmp_id1').value='${id}';showToast('✅ Set as Channel 1')">Use in Compare</button>
        </div>
      </div>`;
    adminLog('info', `Channel ID lookup: ${name} → ${id}`);
  }catch(err){if(res_el)res_el.innerHTML=`<span style="color:var(--danger)">❌ ${err.message}</span>`;}
}

async function fetchChannel(num){
  const apiKey=document.getElementById('cmp_api_key')?.value.trim()||localStorage.getItem('ss_ytkey')||'';
  if(!apiKey){document.getElementById(`cmp_status${num}`).innerHTML='<span style="color:var(--danger)">⚠ Enter API key</span>';return;}
  const raw=document.getElementById(`cmp_id${num}`)?.value.trim();if(!raw)return;
  const st=document.getElementById(`cmp_status${num}`);st.innerHTML='🔄 Fetching...';
  try{
    let channelId=raw;
    if(raw.startsWith('@')||!raw.startsWith('UC')){
      const h=raw.startsWith('@')?raw:'@'+raw;
      const r=await fetch(`https://www.googleapis.com/youtube/v3/channels?part=id,snippet,statistics&forHandle=${encodeURIComponent(h)}&key=${apiKey}`);
      const j=await r.json();if(j.error)throw new Error(j.error.message);
      if(j.items?.length){await populateChannel(num,j.items[0]);st.innerHTML='<span style="color:var(--success)">✅ Loaded</span>';return;}
      const sr=await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${encodeURIComponent(raw)}&maxResults=1&key=${apiKey}`);
      const sj=await sr.json();if(sj.error)throw new Error(sj.error.message);
      if(!sj.items?.length)throw new Error('Not found');
      channelId=sj.items[0].snippet?.channelId||sj.items[0].id?.channelId;
    }
    const r=await fetch(`https://www.googleapis.com/youtube/v3/channels?part=id,snippet,statistics&id=${encodeURIComponent(channelId)}&key=${apiKey}`);
    const j=await r.json();if(j.error)throw new Error(j.error.message);
    if(!j.items?.length)throw new Error('Not found');
    await populateChannel(num,j.items[0]);
    st.innerHTML='<span style="color:var(--success)">✅ Loaded</span>';
  }catch(err){st.innerHTML=`<span style="color:var(--danger)">❌ ${err.message}</span>`;}
}
async function populateChannel(num,item){
  const st=item.statistics||{};const sn=item.snippet||{};
  const subs=parseInt(st.subscriberCount)||0;const total=parseInt(st.viewCount)||0;const vcount=parseInt(st.videoCount)||0;
  let monthly=0;
  if(sn.publishedAt&&total>0){const age=Math.max((Date.now()-new Date(sn.publishedAt))/(86400000*30.4),1);monthly=Math.round(total/age);}
  const setV=(id,v)=>{const e=document.getElementById(id);if(e)e.value=v;};
  setV(`cmp_subs${num}`,subs);setV(`cmp_totalviews${num}`,total);setV(`cmp_videocount${num}`,vcount);setV(`cmp_views${num}`,monthly);
  const thumb=sn.thumbnails?.default?.url||'';
  const name=sn.title||item.id; const handle=sn.customUrl||item.id;
  const ti=document.getElementById(`cmp_thumb${num}`);if(ti)ti.src=thumb;
  const ni=document.getElementById(`cmp_chname${num}`);if(ni)ni.textContent=name;
  const hi=document.getElementById(`cmp_chhandle${num}`);if(hi)hi.textContent=handle;
  const pi=document.getElementById(`cmp_preview${num}`);if(pi)pi.style.display='block';
  const in1=document.getElementById(`cmp_id${num}`);if(in1)in1.dataset.resolvedName=name;
  adminLog('info', `Fetched channel data: ${name}`);
  runCompare();
}

function runCompare(){
  const cols=['var(--primary)','var(--secondary)','var(--accent)'];
  const channels=[1,2,3].map(i=>{
    const ni=document.getElementById(`cmp_id${i}`);
    return{
      name:(ni?.dataset?.resolvedName)||(ni?.value?.trim())||`Channel ${i}`,
      subs:parseFloat(document.getElementById(`cmp_subs${i}`)?.value)||0,
      totalViews:parseFloat(document.getElementById(`cmp_totalviews${i}`)?.value)||0,
      videoCount:parseFloat(document.getElementById(`cmp_videocount${i}`)?.value)||0,
      views:parseFloat(document.getElementById(`cmp_views${i}`)?.value)||0,
      ctr:parseFloat(document.getElementById(`cmp_ctr${i}`)?.value)||0,
      avd:parseFloat(document.getElementById(`cmp_avd${i}`)?.value)||0,
      rpm:parseFloat(document.getElementById(`cmp_rpm${i}`)?.value)||0,
    };
  });
  const active=channels.filter(c=>c.subs>0||c.views>0||c.totalViews>0);
  if(active.length<2){document.getElementById('cmp_results').style.display='none';return;}
  document.getElementById('cmp_results').style.display='block';
  channels.forEach(c=>{
    c.viewsPerSub=c.subs>0&&c.views>0?((c.views/c.subs)*100).toFixed(2):null;
    c.viewsPerVideo=c.videoCount>0&&c.totalViews>0?Math.round(c.totalViews/c.videoCount):null;
    c.revLow=c.views>0?(c.rpm>0?c.views/1000*c.rpm:c.views/1000*2):0;
    c.revHigh=c.views>0?(c.rpm>0?c.views/1000*c.rpm:c.views/1000*8):0;
  });
  const metrics=[
    {label:'Subscribers',key:'subs',fmt:v=>v>0?v.toLocaleString():'—'},
    {label:'Total Lifetime Views',key:'totalViews',fmt:v=>v>0?v.toLocaleString():'—'},
    {label:'Videos Published',key:'videoCount',fmt:v=>v>0?v.toLocaleString():'—'},
    {label:'Avg Views/Video',key:'viewsPerVideo',fmt:v=>v>0?v.toLocaleString():'—'},
    {label:'Est. Monthly Views',key:'views',fmt:v=>v>0?v.toLocaleString():'—'},
    {label:'Monthly Views/Sub %',key:'viewsPerSub',fmt:v=>v!=null?v+'%':'—'},
    {label:'CTR % (manual)',key:'ctr',fmt:v=>v>0?v.toFixed(1)+'%':'—'},
    {label:'Watch Time (manual)',key:'avd',fmt:v=>v>0?v.toFixed(1)+' min':'—'},
    {label:'Est. RPM',key:'rpm',fmt:v=>v>0?'$'+v.toFixed(2):'—'},
  ];
  let t=`<table class="compare-table"><thead><tr><th>Metric</th>`;
  channels.forEach((c,i)=>t+=`<th style="color:${cols[i]};text-align:center;">${c.name}</th>`);
  t+=`</tr></thead><tbody>`;
  metrics.forEach(m=>{
    const vals=channels.map(c=>parseFloat(c[m.key])||0);const max=Math.max(...vals);
    t+=`<tr><td style="color:var(--text-dim);font-size:11px;">${m.label}</td>`;
    channels.forEach((c,i)=>{const v=parseFloat(c[m.key])||0;const best=max>0&&v===max;t+=`<td style="text-align:center;font-weight:${best?'700':'400'};color:${best?cols[i]:'var(--text)'};background:${best?cols[i]+'14':'transparent'}">${m.fmt(c[m.key])}${best&&v>0?' ★':''}</td>`;});
    t+=`</tr>`;
  });
  document.getElementById('cmp_table_wrap').innerHTML=t+`</tbody></table>`;
  document.getElementById('cmp_revenue_grid').innerHTML=channels.map((c,i)=>`
    <div class="stat-card" style="border-color:${cols[i]};border-width:2px;text-align:center;">
      <div class="stat-label" style="color:${cols[i]}">${c.name}</div>
      <div class="stat-value" style="font-size:16px;color:${cols[i]}">${c.revLow>0?'$'+Math.round(c.revLow).toLocaleString()+' – $'+Math.round(c.revHigh).toLocaleString():'—'}</div>
      <div class="stat-sub">/month est.</div>
    </div>`).join('');
  const rankCats=[{label:'🏆 Subscribers',key:'subs'},{label:'👁 Monthly Views',key:'views'},{label:'📹 Videos',key:'videoCount'},{label:'💰 Revenue',key:'revHigh'}];
  document.getElementById('cmp_rankings').innerHTML=rankCats.map(rc=>{
    const sorted=[...channels].map((c,i)=>({...c,_i:i})).filter(c=>(parseFloat(c[rc.key])||0)>0).sort((a,b)=>(parseFloat(b[rc.key])||0)-(parseFloat(a[rc.key])||0));
    if(!sorted.length)return'';
    const w=sorted[0];
    return`<div style="background:var(--card);border:1px solid var(--border);border-left:3px solid ${cols[w._i]};border-radius:var(--radius-lg);padding:12px;"><div style="font-size:10px;color:var(--text-dim);margin-bottom:3px;">${rc.label}</div><div style="font-size:15px;font-weight:700;color:${cols[w._i]}">${w.name}</div><div style="font-size:9px;color:var(--text-muted);margin-top:3px;">${sorted.map((c,ri)=>`#${ri+1} ${c.name}`).join(' · ')}</div></div>`;
  }).join('');
  const bestSubs=channels.reduce((a,b)=>a.subs>=b.subs?a:b);
  const bestViews=channels.reduce((a,b)=>a.views>=b.views?a:b);
  document.getElementById('cmp_insights').innerHTML=`
    <div style="background:var(--card);border:1px solid var(--border);border-left:3px solid var(--warning);border-radius:var(--radius-lg);padding:12px;margin-bottom:9px;"><strong style="color:var(--warning)">📡 Subscriber Leader: ${bestSubs.name}</strong><p style="font-size:11px;color:var(--text-dim);margin-top:3px;">${bestSubs.subs.toLocaleString()} subscribers. Compare their views-per-sub ratio to see engagement quality.</p></div>
    <div style="background:var(--card);border:1px solid var(--border);border-left:3px solid var(--primary);border-radius:var(--radius-lg);padding:12px;margin-bottom:9px;"><strong style="color:var(--primary)">👁 Reach Leader: ${bestViews.name}</strong><p style="font-size:11px;color:var(--text-dim);margin-top:3px;">Highest monthly views. High views relative to subs signals strong algorithmic distribution.</p></div>
    <div class="info-box"><span>💡</span><span style="font-size:10px;">API fetches: subscribers, total views, video count. CTR and watch time are private — enter manually if available from creator posts or interviews.</span></div>`;
}

/* ══════════════
   LIVE SUB TRACKER
══════════════ */
let liveTrackers = [];
let liveTimerInterval = null;

async function addLiveTracker(){
  if(liveTrackers.length>=5){showToast('Maximum 5 channels');return;}
  const platform=document.getElementById('lst_platform')?.value||'youtube';
  const handle=document.getElementById('lst_handle')?.value.trim();
  const apiKey=document.getElementById('lst_apikey')?.value.trim()||localStorage.getItem('ss_ytkey')||'';
  if(!handle){document.getElementById('lst_add_status').textContent='⚠ Enter a handle or ID';return;}
  if(platform==='youtube'&&!apiKey){document.getElementById('lst_add_status').textContent='⚠ YouTube requires an API key';return;}
  document.getElementById('lst_add_status').textContent='🔄 Resolving channel...';
  try{
    let name=handle; let count=null;
    if(platform==='youtube'){
      const isId=handle.startsWith('UC');
      const q=isId?`id=${encodeURIComponent(handle)}`:`forHandle=${encodeURIComponent(handle.startsWith('@')?handle:'@'+handle)}`;
      const r=await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&${q}&key=${apiKey}`);
      const j=await r.json();if(j.error)throw new Error(j.error.message);
      if(!j.items?.length)throw new Error('Channel not found');
      name=j.items[0].snippet.title; count=parseInt(j.items[0].statistics.subscriberCount)||0;
    }
    const tracker={platform,handle,name,count,prevCount:count,apiKey,id:Date.now()};
    liveTrackers.push(tracker);
    document.getElementById('lst_handle').value='';
    document.getElementById('lst_add_status').textContent='';
    renderLiveTrackers();startLiveTimer();
    showToast(`✅ Tracking ${name}`);
    adminLog('info', `Live tracker added: ${name}`);
  }catch(err){document.getElementById('lst_add_status').textContent=`❌ ${err.message}`;}
}
function renderLiveTrackers(){
  const grid=document.getElementById('lst_cards');if(!grid)return;
  if(!liveTrackers.length){
    grid.innerHTML='<div style="background:var(--card);border:2px dashed var(--border-bright);border-radius:var(--radius-xl);padding:28px;text-align:center;color:var(--text-muted);font-size:12px;">Add a channel above to start tracking</div>';
    return;
  }
  const pc={youtube:'#ff0000',twitch:'#9146ff'};
  grid.innerHTML=liveTrackers.map(t=>{
    const delta=t.count!=null&&t.prevCount!=null?t.count-t.prevCount:null;
    const ds=delta!=null?(delta>=0?`+${delta.toLocaleString()}`:delta.toLocaleString()):'';
    const dc=delta>0?'var(--success)':delta<0?'var(--danger)':'var(--text-muted)';
    const pColor=pc[t.platform]||'var(--primary)';
    return`<div class="sub-tracker-card active-track">
      <div class="pulse-dot"></div>
      <div class="platform-badge" style="background:${pColor}22;color:${pColor};">${t.platform==='youtube'?'▶ YouTube':'🎮 Twitch'}</div>
      <div class="channel-name" style="font-size:12px;font-weight:700;color:var(--text-bright);margin-bottom:5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${t.name}">${t.name}</div>
      <div class="sub-count">${t.count!=null?t.count.toLocaleString():'...'}</div>
      ${delta!=null&&delta!==0?`<div class="sub-delta" style="color:${dc}">${ds} since last check</div>`:''}
      <div class="last-update">Auto-refresh every 3 min</div>
      <button onclick="removeLiveTracker(${t.id})" style="margin-top:7px;background:var(--danger-dim);color:var(--danger);border:none;border-radius:5px;padding:3px 9px;cursor:pointer;font-size:10px;">Remove</button>
    </div>`;
  }).join('');
}
function removeLiveTracker(id){
  liveTrackers=liveTrackers.filter(t=>t.id!==id);
  renderLiveTrackers();if(!liveTrackers.length)stopLiveTimer();
}
function clearAllTrackers(){liveTrackers=[];renderLiveTrackers();stopLiveTimer();}
async function refreshAllTrackers(){
  for(const t of liveTrackers){
    try{
      if(t.platform==='youtube'){
        const isId=t.handle.startsWith('UC');
        const q=isId?`id=${encodeURIComponent(t.handle)}`:`forHandle=${encodeURIComponent(t.handle.startsWith('@')?t.handle:'@'+t.handle)}`;
        const r=await fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&${q}&key=${t.apiKey}`);
        const j=await r.json();if(j.error)continue;
        if(j.items?.length){t.prevCount=t.count;t.count=parseInt(j.items[0].statistics.subscriberCount)||t.count;}
      }
    }catch(e){}
  }
  renderLiveTrackers();
  adminLog('info', `Live tracker refresh: ${liveTrackers.length} channel(s)`);
}
function startLiveTimer(){
  if(liveTimerInterval)return;
  let rem=180;
  const badge=document.getElementById('lst_status_badge');
  const nextEl=document.getElementById('lst_next_refresh');
  if(badge)badge.innerHTML='<div style="width:7px;height:7px;border-radius:50%;background:var(--success);animation:pAnim 2s infinite"></div><span>Tracking live</span>';
  liveTimerInterval=setInterval(()=>{
    rem--;
    if(nextEl)nextEl.textContent=`Next refresh in ${rem}s`;
    if(rem<=0){rem=180;refreshAllTrackers();}
  },1000);
}
function stopLiveTimer(){
  if(liveTimerInterval){clearInterval(liveTimerInterval);liveTimerInterval=null;}
  const badge=document.getElementById('lst_status_badge');
  if(badge)badge.innerHTML='<div style="width:7px;height:7px;border-radius:50%;background:var(--text-muted)"></div><span>Not tracking</span>';
  const ne=document.getElementById('lst_next_refresh');if(ne)ne.textContent='';
}
