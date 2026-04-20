/* ═══════════════════════════════════════════════════════════════════
   THE SOCIAL SPOT — ui.js
   Appearance (themes, fonts, backgrounds, layout), navigation,
   dropdowns, admin panel, mini-games, animations.
═══════════════════════════════════════════════════════════════════ */

'use strict';

/* ─── Theme / Font / Layout constants ─── */
const THEMES = [
  {id:'default',  name:'Slate Dark',    bg:'#1e2330', dots:['#6366f1','#a78bfa','#22d3ee']},
  {id:'midnight', name:'Midnight',      bg:'#0d0d14', dots:['#7c3aed','#db2777','#f59e0b']},
  {id:'forest',   name:'Deep Forest',   bg:'#0f1f18', dots:['#10b981','#34d399','#6ee7b7']},
  {id:'ocean',    name:'Deep Ocean',    bg:'#0a1628', dots:['#0ea5e9','#38bdf8','#7dd3fc']},
  {id:'crimson',  name:'Crimson Night', bg:'#1a0e0e', dots:['#ef4444','#f97316','#fbbf24']},
  {id:'aurora',   name:'Aurora',        bg:'#0e1a2e', dots:['#22d3ee','#a78bfa','#4ade80']},
  {id:'mocha',    name:'Mocha',         bg:'#1c1410', dots:['#d97706','#b45309','#92400e']},
  {id:'neon',     name:'Neon City',     bg:'#0a0a12', dots:['#f0abfc','#c084fc','#818cf8']},
  {id:'light',    name:'Clean Light',   bg:'#f1f5f9', dots:['#6366f1','#0ea5e9','#10b981']},
];

const FONTS = [
  {id:'inter',    name:'Inter',       stack:"'Inter', system-ui, sans-serif"},
  {id:'mono',     name:'Mono',        stack:"'JetBrains Mono', 'Fira Code', monospace"},
  {id:'slab',     name:'Slab',        stack:"'Roboto Slab', serif"},
  {id:'rounded',  name:'Rounded',     stack:"'Nunito', 'Varela Round', sans-serif"},
  {id:'display',  name:'Display',     stack:"'Bebas Neue', 'Impact', sans-serif"},
  {id:'elegant',  name:'Elegant',     stack:"'Playfair Display', 'Georgia', serif"},
  {id:'system',   name:'System',      stack:"system-ui, -apple-system, sans-serif"},
];

/* ─── Background animation handle ─── */
let _bgAnimFrame = null;



  function applyTheme(id, skipSave) {
    currentTheme = id;
    const html = document.documentElement;
    if (id === 'default') { html.removeAttribute('data-theme'); }
    else { html.setAttribute('data-theme', id); }
    document.querySelectorAll('.theme-card').forEach(card => {
      const active = card.dataset.themeId === id;
      card.style.borderColor = active ? 'var(--primary)' : 'transparent';
      card.style.boxShadow = active ? '0 0 0 3px var(--primary-dim)' : 'none';
      const chk = card.querySelector('.theme-check');
      if (chk) chk.style.display = active ? 'flex' : 'none';
    });
    if (!skipSave) { try{localStorage.setItem('ccTheme',id);}catch(e){} showToast('🎨 Theme applied!','var(--primary)'); markUnsaved(); }
  }


  function loadTheme(id) { applyTheme(id||'default', true); }


  function applyFont(id, skipSave) {
    currentFont = id;
    const f = FONTS.find(f => f.id === id);
    const family = f ? f.family : 'Inter,system-ui,sans-serif';
    // Set on html element for CSS [data-font] rules
    if (id === 'inter') { document.documentElement.removeAttribute('data-font'); }
    else { document.documentElement.setAttribute('data-font', id); }
    // Also directly set on body and all major containers so it overrides body's own font-family
    document.body.style.fontFamily = family;
    // Update font picker UI
    document.querySelectorAll('.font-card').forEach(card => {
      const active = card.dataset.fontId === id;
      card.style.borderColor = active ? 'var(--primary)' : 'transparent';
      card.style.boxShadow = active ? '0 0 0 3px var(--primary-dim)' : 'none';
      const chk = card.querySelector('.font-check');
      if (chk) chk.style.display = active ? 'block' : 'none';
    });
    if (!skipSave) { try{localStorage.setItem('ccFont',id);}catch(e){} showToast('🔤 Font updated!','var(--primary)'); markUnsaved(); }
  }


  function loadFont(id) { applyFont(id||'inter', true); }


  function applyBg(id, btn) {
    currentBg = id;
    document.documentElement.setAttribute('data-bg', id);
    document.querySelectorAll('.bg-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    else { const b = document.querySelector('[data-bg="' + id + '"]'); if(b) b.classList.add('active'); }
    if (typeof bgAnimFrame !== 'undefined' && bgAnimFrame) { cancelAnimationFrame(bgAnimFrame); bgAnimFrame = null; }
    const canvas = document.getElementById('bg-canvas');
    if (canvas) { canvas.style.display='none'; const ctx=canvas.getContext('2d'); ctx.clearRect(0,0,canvas.width,canvas.height); }
    const animated = { particles:startParticles, waves:startWaves, matrix:startMatrix, starfield:startStarfield, aurora:startAurora, nebula:startNebula, fireworks:startFireworks, glitch:startGlitch, confetti:startConfetti, lightning:startLightning, vortex:startVortex };
    if (animated[id]) animated[id]();
    try{localStorage.setItem('ccBg',id);}catch(e){}
  }


  function applyTextSize(id,btn){currentTextSize=id;document.documentElement.setAttribute('data-textsize',id);document.querySelectorAll('.ts-btn').forEach(b=>b.classList.remove('active'));if(btn)btn.classList.add('active');else{const b=document.querySelector('.ts-btn[data-size="'+id+'"]');if(b)b.classList.add('active');}const lbl=document.getElementById('textSizeLabel');const TS={sm:'Small (13px)',md:'Medium (15px)',lg:'Large (17px)',xl:'X-Large (19px)',xxl:'Huge (22px)'};if(lbl)lbl.textContent=TS[id]||id;try{localStorage.setItem('ccTextSize',id);}catch(e){}if(typeof showToast==='function')showToast('Text: '+(TS[id]||id),'var(--accent)');}


  function setDashLayout(id) {
    currentLayout = id;
    // Update active state on layout cards
    document.querySelectorAll('.layout-card').forEach(c => c.classList.remove('active'));
    const lc = document.getElementById('lc_' + id);
    if (lc) lc.classList.add('active');
    // Clear any inline styles that might conflict with CSS layout rules
    document.querySelectorAll('.tabcontent').forEach(t => t.style.padding = '');
    const cont = document.querySelector('.container');
    if (cont) { cont.style.maxWidth = ''; cont.style.fontSize = ''; }
    document.querySelectorAll('.tab-subtitle,.proj-explain,.insight-box,.info-card p,.faq-link-bar').forEach(e => e.style.display = '');
    // Set data-layout — CSS rules take over from here
    document.documentElement.setAttribute('data-layout', id);
    try{localStorage.setItem('ccLayout',id);}catch(e){}
    showToast('📐 Layout: ' + id.charAt(0).toUpperCase() + id.slice(1), 'var(--primary)');
  }


  function renderThemePicker() {
    const el = document.getElementById('themePicker');
    if (!el) return;
    el.innerHTML = THEMES.map(t => `
      <div class="theme-card" data-theme-id="${t.id}" onclick="applyTheme('${t.id}')"
           style="background:${t.bg};border:2px solid ${currentTheme===t.id?'var(--primary)':'transparent'};box-shadow:${currentTheme===t.id?'0 0 0 3px var(--primary-dim)':'none'};">
        <div style="display:flex;gap:4px;margin-bottom:8px;">${t.dots.map(d=>`<div style="width:10px;height:10px;border-radius:50%;background:${d};"></div>`).join('')}</div>
        <div style="font-size:12px;font-weight:700;color:${t.dots[0]};margin-bottom:2px;">${t.name}</div>
        <div style="font-size:10px;color:#666;line-height:1.3;">${t.desc}</div>
        <div class="theme-check" style="display:${currentTheme===t.id?'flex':'none'};position:absolute;top:7px;right:7px;font-size:11px;color:${t.dots[0]};background:rgba(0,0,0,0.5);border-radius:50%;width:18px;height:18px;align-items:center;justify-content:center;">✔</div>
      </div>`).join('');
  }


  function renderFontPicker() {
    const el = document.getElementById('fontPicker');
    if (!el) return;
    el.innerHTML = FONTS.map(f => `
      <div class="font-card" data-font-id="${f.id}" onclick="applyFont('${f.id}')"
           style="border:2px solid ${currentFont===f.id?'var(--primary)':'transparent'};box-shadow:${currentFont===f.id?'0 0 0 3px var(--primary-dim)':'none'};">
        <div style="font-family:${f.family};font-size:20px;font-weight:700;color:var(--primary);margin-bottom:4px;line-height:1;">${f.sample}</div>
        <div style="font-family:${f.family};font-weight:700;font-size:12px;color:var(--text-bright);margin-bottom:2px;">${f.name}</div>
        <div style="font-size:10px;color:var(--text-dim);line-height:1.3;">${f.desc}</div>
        <div class="font-check" style="display:${currentFont===f.id?'block':'none'};position:absolute;top:7px;right:7px;color:var(--primary);font-size:12px;">✔</div>
      </div>`).join('');
  }


  function togglePlatform(plat,btn){const idx=activePlatforms.indexOf(plat);if(idx===-1){activePlatforms.push(plat);if(btn)btn.classList.add('active');}else{activePlatforms.splice(idx,1);if(btn)btn.classList.remove('active');}applyPlatformVisibility();try{localStorage.setItem('ccPlatforms',JSON.stringify(activePlatforms));}catch(e){}}


  function applyPlatformVisibility() {
    const html = document.documentElement;
    const all = ['youtube','tiktok','instagram','twitch','twitter','linkedin'];
    all.forEach(p => {
      if (activePlatforms.includes(p)) html.removeAttribute('data-hide-' + p);
      else html.setAttribute('data-hide-' + p, '1');
    });
    // Hide whole tabs for platform-specific pages
    const tabMap = { tiktok:'TabSocial', instagram:'TabSocial', twitch:'TabLive' };
    // Social tab: hide if BOTH tiktok and instagram are off
    const socialTab = document.querySelector('[onclick*=\\"TabSocial\\"]');
    if (socialTab) {
      const showSocial = activePlatforms.includes('tiktok') || activePlatforms.includes('instagram');
      socialTab.style.display = showSocial ? '' : 'none';
    }
    // Live tracker: hide if twitch AND youtube both off
    const liveTab = document.querySelector('[onclick*=\\"TabLive\\"]');
    if (liveTab) {
      const showLive = activePlatforms.includes('youtube') || activePlatforms.includes('twitch');
      liveTab.style.display = showLive ? '' : 'none';
    }
    // Update platform toggle buttons
    document.querySelectorAll('.plat-btn').forEach(b => {
      const p = b.dataset.plat;
      if (p) b.classList.toggle('active', activePlatforms.includes(p));
    });
  }


  function startMatrix() {
    const canvas=document.getElementById('bg-canvas');if(!canvas)return;
    canvas.style.display='block';canvas.width=window.innerWidth;canvas.height=window.innerHeight;
    const ctx=canvas.getContext('2d');
    const cols=Math.floor(canvas.width/16)+1;const drops=Array(cols).fill(1);
    const chars='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%';
    function draw(){
      canvas.width=window.innerWidth;canvas.height=window.innerHeight;
      ctx.fillStyle='rgba(0,0,0,0.04)';ctx.fillRect(0,0,canvas.width,canvas.height);
      ctx.fillStyle=getComputedStyle(document.documentElement).getPropertyValue('--primary').trim()||'#6366f1';
      ctx.font='14px monospace';
      drops.forEach((y,i)=>{const c=chars[Math.floor(Math.random()*chars.length)];ctx.fillText(c,i*16,y*16);if(y*16>canvas.height&&Math.random()>0.975)drops[i]=0;drops[i]++;});
      bgAnimFrame=requestAnimationFrame(draw);
    }
    if(bgAnimFrame){cancelAnimationFrame(bgAnimFrame);bgAnimFrame=null;}draw();
  }


  function startParticles(){const canvas=document.getElementById('bg-canvas');if(!canvas)return;canvas.style.display='block';canvas.width=window.innerWidth;canvas.height=window.innerHeight;const ctx=canvas.getContext('2d');const ps=Array.from({length:80},()=>({x:Math.random()*canvas.width,y:Math.random()*canvas.height,vx:(Math.random()-0.5)*0.4,vy:(Math.random()-0.5)*0.4,r:Math.random()*2+1,o:Math.random()*0.5+0.1}));function draw(){canvas.width=window.innerWidth;canvas.height=window.innerHeight;ctx.clearRect(0,0,canvas.width,canvas.height);const c=getComputedStyle(document.documentElement).getPropertyValue('--primary').trim()||'#6366f1';ps.forEach(p=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0)p.x=canvas.width;if(p.x>canvas.width)p.x=0;if(p.y<0)p.y=canvas.height;if(p.y>canvas.height)p.y=0;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.globalAlpha=p.o;ctx.fillStyle=c;ctx.fill();ctx.globalAlpha=1;});bgAnimFrame=requestAnimationFrame(draw);}if(bgAnimFrame){cancelAnimationFrame(bgAnimFrame);bgAnimFrame=null;}draw();}


  function startWaves(){const canvas=document.getElementById('bg-canvas');if(!canvas)return;canvas.style.display='block';let t=0;function draw(){canvas.width=window.innerWidth;canvas.height=window.innerHeight;const ctx=canvas.getContext('2d');ctx.clearRect(0,0,canvas.width,canvas.height);const c=getComputedStyle(document.documentElement).getPropertyValue('--primary').trim()||'#6366f1';for(let w=0;w<4;w++){ctx.beginPath();const a=30+w*15,f=0.008-w*0.001,ph=t*0.5+w*Math.PI/4,yB=canvas.height*(0.3+w*0.15);ctx.moveTo(0,yB);for(let x=0;x<=canvas.width;x+=4)ctx.lineTo(x,yB+Math.sin(x*f+ph)*a);ctx.lineTo(canvas.width,canvas.height);ctx.lineTo(0,canvas.height);ctx.closePath();ctx.globalAlpha=0.04+w*0.01;ctx.fillStyle=c;ctx.fill();ctx.globalAlpha=1;}t++;bgAnimFrame=requestAnimationFrame(draw);}if(bgAnimFrame){cancelAnimationFrame(bgAnimFrame);bgAnimFrame=null;}draw();}


  function startStarfield(){const canvas=document.getElementById('bg-canvas');if(!canvas)return;canvas.style.display='block';const ss=Array.from({length:200},()=>({x:Math.random(),y:Math.random(),size:Math.random()*1.8+0.3,speed:Math.random()*0.0003+0.0001,opacity:Math.random()*0.7+0.2}));function draw(){canvas.width=window.innerWidth;canvas.height=window.innerHeight;const ctx=canvas.getContext('2d');ctx.clearRect(0,0,canvas.width,canvas.height);const col=getComputedStyle(document.documentElement).getPropertyValue('--text-bright').trim()||'#fff';ss.forEach(s=>{s.x+=s.speed;if(s.x>1){s.x=0;s.y=Math.random();}ctx.beginPath();ctx.arc(s.x*canvas.width,s.y*canvas.height,s.size,0,Math.PI*2);ctx.fillStyle=col;ctx.globalAlpha=s.opacity;ctx.fill();ctx.globalAlpha=1;});bgAnimFrame=requestAnimationFrame(draw);}if(bgAnimFrame){cancelAnimationFrame(bgAnimFrame);bgAnimFrame=null;}draw();}


  function startAurora(){const canvas=document.getElementById('bg-canvas');if(!canvas)return;canvas.style.display='block';let t=0;function draw(){canvas.width=window.innerWidth;canvas.height=window.innerHeight;const ctx=canvas.getContext('2d');ctx.clearRect(0,0,canvas.width,canvas.height);const st=getComputedStyle(document.documentElement);const cols=[st.getPropertyValue('--primary').trim(),st.getPropertyValue('--accent').trim(),st.getPropertyValue('--secondary').trim()];for(let i=0;i<5;i++){const y=canvas.height*(0.1+i*0.15)+Math.sin(t*0.008+i*1.2)*60;const grad=ctx.createLinearGradient(0,y-80,0,y+80);const c=cols[i%3]||'#6366f1';grad.addColorStop(0,'transparent');grad.addColorStop(0.5,c+'40');grad.addColorStop(1,'transparent');ctx.fillStyle=grad;ctx.beginPath();ctx.moveTo(0,y-80);for(let x=0;x<=canvas.width;x+=8)ctx.lineTo(x,y+Math.sin(x*0.006+t*0.012+i)*40);ctx.lineTo(canvas.width,y+80);ctx.lineTo(0,y+80);ctx.closePath();ctx.fill();}t++;bgAnimFrame=requestAnimationFrame(draw);}if(bgAnimFrame){cancelAnimationFrame(bgAnimFrame);bgAnimFrame=null;}draw();}


  function startNebula(){const canvas=document.getElementById('bg-canvas');if(!canvas)return;canvas.style.display='block';const blobs=Array.from({length:8},()=>({x:Math.random(),y:Math.random(),vx:(Math.random()-0.5)*0.0008,vy:(Math.random()-0.5)*0.0006,size:Math.random()*0.25+0.12}));function draw(){canvas.width=window.innerWidth;canvas.height=window.innerHeight;const ctx=canvas.getContext('2d');ctx.clearRect(0,0,canvas.width,canvas.height);const st=getComputedStyle(document.documentElement);const cols=[st.getPropertyValue('--primary').trim(),st.getPropertyValue('--accent').trim(),st.getPropertyValue('--secondary').trim()];blobs.forEach((b,i)=>{b.x+=b.vx;b.y+=b.vy;if(b.x<0||b.x>1)b.vx*=-1;if(b.y<0||b.y>1)b.vy*=-1;const r=Math.max(canvas.width,canvas.height)*b.size;const grad=ctx.createRadialGradient(b.x*canvas.width,b.y*canvas.height,0,b.x*canvas.width,b.y*canvas.height,r);const c=cols[i%3]||'#6366f1';grad.addColorStop(0,c+'18');grad.addColorStop(0.5,c+'08');grad.addColorStop(1,'transparent');ctx.fillStyle=grad;ctx.fillRect(0,0,canvas.width,canvas.height);});bgAnimFrame=requestAnimationFrame(draw);}if(bgAnimFrame){cancelAnimationFrame(bgAnimFrame);bgAnimFrame=null;}draw();}


  function startFireworks() {
    const canvas=document.getElementById('bg-canvas');
    const ctx=canvas.getContext('2d');
    canvas.width=window.innerWidth; canvas.height=window.innerHeight;
    let particles=[];
    function Firework(x,y) {
      const angle=Math.random()*Math.PI*2, speed=Math.random()*4+2;
      return {x,y,vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed,
        life:1,color:`hsl(${Math.random()*360},100%,60%)`,size:Math.random()*3+1};
    }
    function explode(x,y){for(let i=0;i<60;i++)particles.push(Firework(x,y));}
    let frame=0;
    function draw(){
      ctx.fillStyle='rgba(0,0,0,0.15)'; ctx.fillRect(0,0,canvas.width,canvas.height);
      if(frame++%60===0)explode(Math.random()*canvas.width,Math.random()*canvas.height*0.7);
      particles=particles.filter(p=>{
        p.x+=p.vx; p.y+=p.vy; p.vy+=0.08; p.life-=0.016;
        ctx.globalAlpha=p.life; ctx.fillStyle=p.color;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.size,0,Math.PI*2); ctx.fill();
        return p.life>0;
      });
      ctx.globalAlpha=1;
      canvas._fw=requestAnimationFrame(draw);
    }
    if(canvas._fw)cancelAnimationFrame(canvas._fw);
    draw();
  }


  function startGlitch() {
    const canvas=document.getElementById('bg-canvas');
    const ctx=canvas.getContext('2d');
    canvas.width=window.innerWidth; canvas.height=window.innerHeight;
    function draw(){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      const glitchCount=Math.random()<0.3?Math.floor(Math.random()*8)+2:0;
      for(let i=0;i<glitchCount;i++){
        const y=Math.random()*canvas.height, h=Math.random()*30+5;
        const shift=Math.random()*40-20;
        ctx.save(); ctx.translate(shift,0);
        ctx.fillStyle=`rgba(${Math.random()<0.5?'0,255,200':'255,0,100'},${Math.random()*0.3+0.1})`;
        ctx.fillRect(0,y,canvas.width,h); ctx.restore();
      }
      // Scanlines
      for(let y=0;y<canvas.height;y+=4){
        ctx.fillStyle='rgba(0,0,0,0.04)'; ctx.fillRect(0,y,canvas.width,2);
      }
      canvas._gl=requestAnimationFrame(draw);
    }
    if(canvas._gl)cancelAnimationFrame(canvas._gl);
    draw();
  }


  function startConfetti() {
    const canvas=document.getElementById('bg-canvas');
    const ctx=canvas.getContext('2d');
    canvas.width=window.innerWidth; canvas.height=window.innerHeight;
    const pieces=Array.from({length:120},()=>({
      x:Math.random()*canvas.width, y:Math.random()*-canvas.height,
      w:Math.random()*10+4, h:Math.random()*6+3,
      rot:Math.random()*360, rotSpeed:Math.random()*6-3,
      speed:Math.random()*2+1, color:`hsl(${Math.random()*360},90%,60%)`,
      swing:Math.random()*2-1, swingSpeed:Math.random()*0.05
    }));
    let t=0;
    function draw(){
      ctx.clearRect(0,0,canvas.width,canvas.height); t+=0.05;
      pieces.forEach(p=>{
        p.y+=p.speed; p.rot+=p.rotSpeed; p.x+=Math.sin(t*p.swingSpeed+p.swing)*1.5;
        if(p.y>canvas.height+20){p.y=-20;p.x=Math.random()*canvas.width;}
        ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.rot*Math.PI/180);
        ctx.fillStyle=p.color; ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h); ctx.restore();
      });
      canvas._cf=requestAnimationFrame(draw);
    }
    if(canvas._cf)cancelAnimationFrame(canvas._cf);
    draw();
  }


  function startLightning() {
    const canvas=document.getElementById('bg-canvas');
    const ctx=canvas.getContext('2d');
    canvas.width=window.innerWidth; canvas.height=window.innerHeight;
    function bolt(x1,y1,x2,y2,depth){
      if(depth===0){ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();return;}
      const mx=(x1+x2)/2+(Math.random()-0.5)*(Math.abs(x2-x1)+Math.abs(y2-y1))*0.4;
      const my=(y1+y2)/2+(Math.random()-0.5)*(Math.abs(x2-x1)+Math.abs(y2-y1))*0.4;
      bolt(x1,y1,mx,my,depth-1); bolt(mx,my,x2,y2,depth-1);
      if(Math.random()<0.3)bolt(mx,my,mx+(Math.random()-0.5)*100,my+Math.random()*100,depth-2);
    }
    function draw(){
      ctx.fillStyle='rgba(0,0,0,0.4)'; ctx.fillRect(0,0,canvas.width,canvas.height);
      if(Math.random()<0.06){
        const x=Math.random()*canvas.width;
        ctx.strokeStyle=`rgba(180,180,255,${Math.random()*0.7+0.3})`;
        ctx.lineWidth=Math.random()*2+0.5; ctx.shadowBlur=20; ctx.shadowColor='#8888ff';
        bolt(x,0,x+(Math.random()-0.5)*200,canvas.height,6);
        ctx.shadowBlur=0;
      }
      canvas._lt=requestAnimationFrame(draw);
    }
    if(canvas._lt)cancelAnimationFrame(canvas._lt);
    draw();
  }


  function startVortex() {
    const canvas=document.getElementById('bg-canvas');
    const ctx=canvas.getContext('2d');
    canvas.width=window.innerWidth; canvas.height=window.innerHeight;
    const cx=canvas.width/2, cy=canvas.height/2;
    const particles=Array.from({length:300},()=>({
      angle:Math.random()*Math.PI*2, r:Math.random()*Math.min(cx,cy)*0.9,
      speed:Math.random()*0.02+0.005, inward:Math.random()<0.5,
      size:Math.random()*3+1, hue:Math.random()*360
    }));
    let t=0;
    function draw(){
      ctx.fillStyle='rgba(0,0,0,0.06)'; ctx.fillRect(0,0,canvas.width,canvas.height);
      t+=0.01;
      particles.forEach(p=>{
        p.angle+=p.speed*(p.inward?1:-1)*(1+3/Math.max(p.r,10));
        p.r+=p.inward?-0.5:0.5;
        if(p.r<5||p.r>Math.min(cx,cy)){p.r=Math.random()*Math.min(cx,cy)*0.9;p.angle=Math.random()*Math.PI*2;}
        const x=cx+Math.cos(p.angle)*p.r, y=cy+Math.sin(p.angle)*p.r;
        ctx.beginPath(); ctx.arc(x,y,p.size,0,Math.PI*2);
        ctx.fillStyle=`hsla(${(p.hue+t*30)%360},100%,60%,0.8)`; ctx.fill();
      });
      canvas._vx=requestAnimationFrame(draw);
    }
    if(canvas._vx)cancelAnimationFrame(canvas._vx);
    draw();
  }


  function openTab(evt, tabName) {
    document.querySelectorAll('.tabcontent').forEach(t => t.style.display='none');
    if (!evt.currentTarget || !evt.currentTarget.closest || !evt.currentTarget.closest('.dropdown')) {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      if (evt.currentTarget && evt.currentTarget.classList) evt.currentTarget.classList.add('active');
      document.getElementById('ytDropdownBtn').innerText = '📊 YT ANALYTICS ▼';
      document.getElementById('ytDropdownBtn').classList.remove('active');
    }
    document.getElementById(tabName).style.display = 'block';
    if (tabName==='Tab7') calculateUploadTime();
    if (tabName==='TabCP') updateChannelProjections();
    if (tabName==='TabCompare') {
      const storedKey = localStorage.getItem('ccYTApiKey') || '';
      const cmpKey = document.getElementById('cmp_api_key');
      if (cmpKey && !cmpKey.value && storedKey) cmpKey.value = storedKey;
    }
  }


  function goFAQ() {
    document.querySelectorAll('.tabcontent').forEach(t => t.style.display='none');
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('TabFAQ').style.display = 'block';
    // Highlight FAQ button
    document.querySelectorAll('.tab-btn').forEach(b => { if (b.textContent.includes('FAQ')) b.classList.add('active'); });
  }


  function switchSocialTab(which) {
    document.getElementById('socialPanel_tt').style.display = which === 'tt' ? 'block' : 'none';
    document.getElementById('socialPanel_ig').style.display = which === 'ig' ? 'block' : 'none';
    document.getElementById('socialTab_tt').className = which === 'tt' ? 'btn-primary' : 'btn-secondary';
    document.getElementById('socialTab_ig').className = which === 'ig' ? 'btn-primary' : 'btn-secondary';
    document.getElementById('socialTab_tt').style.cssText = 'font-size:13px;padding:10px 22px;';
    document.getElementById('socialTab_ig').style.cssText = 'font-size:13px;padding:10px 22px;';
  }


  function openDropdown() {
    clearTimeout(dropdownTimer);
    document.getElementById('ytDropdownMenu').classList.add('open');
  }


  function keepDropdown() {
    clearTimeout(dropdownTimer);
  }


  function closeDropdown() {
    dropdownTimer = setTimeout(() => {
      document.getElementById('ytDropdownMenu').classList.remove('open');
    }, 120);
  }


  function updateDropdownText(text) {
    document.getElementById('ytDropdownBtn').innerText = text + ' ▼';
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('ytDropdownBtn').classList.add('active');
    document.getElementById('ytDropdownMenu').classList.remove('open');
  }


  function openCreatorDropdown() {
    document.getElementById('creatorDropdownMenu').classList.add('open');
    document.getElementById('creatorDropdownBtn').classList.add('active');
  }


  function closeCreatorDropdown(){const m=document.getElementById('creatorDropdownMenu');if(m)m.classList.remove('open');const b=document.getElementById('creatorDropdownBtn');if(b)b.classList.remove('active');}


  function keepCreatorDropdown(){const m=document.getElementById('creatorDropdownMenu');if(m)m.classList.add('open');}


  function updateCreatorDropdownText(text) {
    document.getElementById('creatorDropdownBtn').innerText = text + ' \u25bc';
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('creatorDropdownBtn').classList.add('active');
    document.getElementById('ytDropdownBtn').innerText = '\ud83d\udcca YT ANALYTICS \u25bc';
    document.getElementById('ytDropdownBtn').classList.remove('active');
  }


  function openContactForm() { const m=document.getElementById('contactModal'); if(m){m.style.display='flex';document.body.style.overflow='hidden';} }


  function closeContactForm() { const m=document.getElementById('contactModal'); if(m){m.style.display='none';document.body.style.overflow='';} const st=document.getElementById('cf_status'); if(st) st.innerHTML=''; }


  function submitContactForm() {
    const name=(document.getElementById('cf_name')?.value||'').trim();
    const email=(document.getElementById('cf_email')?.value||'').trim();
    const msg=(document.getElementById('cf_message')?.value||'').trim();
    const st=document.getElementById('cf_status');
    if(!name){if(st)st.innerHTML='<span style="color:var(--danger);">Please enter your name.</span>';return;}
    if(!msg){if(st)st.innerHTML='<span style="color:var(--danger);">Please enter a message.</span>';return;}
    const subj=encodeURIComponent('Social Spot Feedback from '+name);
    const body=encodeURIComponent('Name: '+name+'\nEmail: '+(email||'n/a')+'\n\n'+msg);
    window.location.href='mailto:thecardarena@gmail.com?subject='+subj+'&body='+body;
    if(st)st.innerHTML='<span style="color:var(--success);">Your email client should open.</span>';
    setTimeout(closeContactForm,3000);
  }


  function openAdminModal() {
    const ov = document.getElementById('adminOverlay');
    if (ov) { ov.style.display='block'; document.body.style.overflow='hidden'; }
    if (adminUnlocked) refreshAdminStats();
  }


  function closeAdminModal() {
    const ov = document.getElementById('adminOverlay');
    if (ov) { ov.style.display='none'; document.body.style.overflow=''; }
  }


  function refreshAdminStats(){try{let sz=0;for(let k in localStorage)if(localStorage.hasOwnProperty(k))sz+=(localStorage[k].length+k.length)*2;const loads=parseInt(localStorage.getItem('tss_loads')||'0')+1;localStorage.setItem('tss_loads',loads);const g=id=>document.getElementById(id);if(g('admin_stat_loads'))g('admin_stat_loads').innerText=loads;if(g('admin_stat_theme'))g('admin_stat_theme').innerText=currentTheme||'default';if(g('admin_stat_font'))g('admin_stat_font').innerText=currentFont||'inter';if(g('admin_stat_storage'))g('admin_stat_storage').innerText=(sz/1024).toFixed(1)+' KB';}catch(e){}}


  function adminClearStorage(){try{localStorage.clear();}catch(e){}const st=document.getElementById('admin_action_status');if(st)st.innerText='✓ Local storage cleared.';}


  function adminExportDiag(){const d={theme:currentTheme,font:currentFont,timestamp:new Date().toISOString()};const b=new Blob([JSON.stringify(d,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='tss_diag.json';a.click();const st=document.getElementById('admin_action_status');if(st)st.innerText='✓ Exported.';}


  function adminResetTheme(){applyTheme('default');applyFont('inter');const st=document.getElementById('admin_action_status');if(st)st.innerText='✓ Reset.';}


  function adminForceRefresh(){location.reload(true);}


  function ctrGameStart(){if(typeof ctrScenarios==='undefined')return;if(!window._ctrG)window._ctrG={c:0,t:0};window._ctrIdx=Math.floor(Math.random()*ctrScenarios.length);window._ctrActive=true;const s=ctrScenarios[window._ctrIdx];const c=document.getElementById('ctr_game_card');if(c)c.innerHTML='<strong>Scenario:</strong><br>'+s.desc+'<br><br><strong>Is CTR above or below '+s.threshold+'%?</strong>';['ctr_guess_high','ctr_guess_low'].forEach(id=>{const el=document.getElementById(id);if(el)el.style.display='inline-block';});const btn=document.getElementById('ctr_game_start_btn');if(btn)btn.innerText='↺ New Scenario';const r=document.getElementById('ctr_game_result');if(r)r.innerText='';}


  function ctrGameGuess(guessHigh){if(!window._ctrActive)return;const s=ctrScenarios[window._ctrIdx];const correct=guessHigh===s.answer;if(!window._ctrG)window._ctrG={c:0,t:0};window._ctrG.t++;if(correct)window._ctrG.c++;const sc=document.getElementById('ctr_game_score');if(sc)sc.innerText='Score: '+window._ctrG.c+' / '+window._ctrG.t;const r=document.getElementById('ctr_game_result');if(r)r.innerHTML=(correct?'<span style="color:var(--success);">✅ Correct!</span>':'<span style="color:var(--danger);">✗ Wrong.</span>')+' '+s.explain;window._ctrActive=false;['ctr_guess_high','ctr_guess_low'].forEach(id=>{const el=document.getElementById(id);if(el)el.style.display='none';});}


  function quizStart(){if(typeof quizQs==='undefined')return;window._quiz={order:[...Array(quizQs.length).keys()].sort(()=>Math.random()-0.5),idx:0,correct:0,total:0};const s=document.getElementById('quiz_score');if(s)s.innerText='Score: 0 / 0';const btn=document.getElementById('quiz_start_btn');if(btn)btn.innerText='↺ Restart';quizShowQ();}


  function quizShowQ(){const q=window._quiz;if(!q||q.idx>=q.order.length){const c=document.getElementById('quiz_card');if(c)c.innerHTML='Quiz complete! <strong>'+(q?q.correct:0)+' / '+(q?q.total:0)+'</strong>';const o=document.getElementById('quiz_options');if(o)o.innerHTML='';return;}const qObj=quizQs[q.order[q.idx]];const c=document.getElementById('quiz_card');if(c)c.innerText='Q'+(q.idx+1)+': '+qObj.q;const o=document.getElementById('quiz_options');if(o)o.innerHTML=qObj.opts.map((opt,i)=>'<button onclick="quizAnswer('+i+')" style="background:var(--card2);border:1px solid var(--border-hi);border-radius:var(--radius);padding:8px 12px;font-size:12px;color:var(--text);cursor:pointer;">'+opt+'</button>').join('');const r=document.getElementById('quiz_result');if(r)r.innerText='';}


  function quizAnswer(idx){const q=window._quiz;if(!q)return;const qObj=quizQs[q.order[q.idx]];q.total++;const correct=idx===qObj.ans;if(correct)q.correct++;const s=document.getElementById('quiz_score');if(s)s.innerText='Score: '+q.correct+' / '+q.total;const r=document.getElementById('quiz_result');if(r)r.innerHTML=(correct?'<span style="color:var(--success);">✅ Correct!</span>':'<span style="color:var(--danger);">✗ Wrong: '+qObj.opts[qObj.ans]+'</span>')+' — '+qObj.explain;const o=document.getElementById('quiz_options');if(o)o.innerHTML='';q.idx++;setTimeout(quizShowQ,1800);}
