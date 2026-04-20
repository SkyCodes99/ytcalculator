/* ── STUDIO TOOLTIPS ── */
label[data-tip] {
  position: relative;
  cursor: help;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
label[data-tip]::after {
  content: "ℹ";
  font-size: 10px;
  font-style: normal;
  color: var(--text-muted);
  background: var(--card2);
  border: 1px solid var(--border-hi);
  border-radius: 50%;
  width: 14px;
  height: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  opacity: 0.7;
  transition: opacity 0.15s;
}
label[data-tip]:hover::after { opacity: 1; color: var(--primary); border-color: var(--primary); }
.tip-popup {
  display: none;
  position: fixed;
  z-index: 99990;
  background: var(--card);
  border: 1px solid var(--border-hi);
  border-radius: var(--radius);
  padding: 10px 13px;
  font-size: 11px;
  line-height: 1.65;
  color: var(--text);
  width: 260px;
  max-width: 80vw;
  box-shadow: 0 8px 32px rgba(0,0,0,0.5);
  pointer-events: none;
  font-weight: 400;
  white-space: normal;
}
.tip-popup strong { color: var(--primary); font-weight: 700; }
.tip-popup .tip-path { color: var(--accent); font-size: 10px; margin-top: 5px; display: block; font-weight: 600; }
/* tip-wrap for non-label elements */
.tip-wrap {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  position: relative;
  cursor: help;
}
.tip-wrap::after {
  content: "ℹ";
  font-size: 10px;
  color: var(--text-muted);
  background: var(--card2);
  border: 1px solid var(--border-hi);
  border-radius: 50%;
  width: 14px;
  height: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  opacity: 0.6;
  transition: opacity 0.15s;
}
.tip-wrap:hover::after { opacity: 1; color: var(--primary); border-color: var(--primary); }
/* ═══════════════════════════════════════════════════
   THE SOCIAL SPOT — Complete Design System
   Single source of truth. All colours via CSS vars.
═══════════════════════════════════════════════════ */

/* ── RESET ── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

/* ── DEFAULT THEME VARIABLES ── */
:root {
  --bg:          #0f1117;
  --bg2:         #161a24;
  --bg3:         #1c2130;
  --card:        #1e2330;
  --card2:       #252b3b;
  --border:      rgba(255,255,255,0.07);
  --border-hi:   rgba(255,255,255,0.14);
  --primary:     #6366f1;
  --primary-dim: rgba(99,102,241,0.15);
  --secondary:   #22d3ee;
  --secondary-dim: rgba(34,211,238,0.12);
  --accent:      #f472b6;
  --accent-dim:  rgba(244,114,182,0.12);
  --success:     #34d399;
  --success-dim: rgba(52,211,153,0.12);
  --warning:     #fbbf24;
  --warning-dim: rgba(251,191,36,0.12);
  --danger:      #f87171;
  --danger-dim:  rgba(248,113,113,0.12);
  --tiktok:      #69c9d0;
  --ig:          #e1306c;
  --text:        #c9d1e0;
  --text-dim:    #7480a0;
  --text-muted:  #4a5468;
  --text-bright: #f0f4ff;
  --radius:      10px;
  --radius-lg:   14px;
  --shadow:      0 4px 24px rgba(0,0,0,0.35);
  --border-bright: rgba(255,255,255,0.14);
}


[data-theme="warm"] {
  --bg:#13100e;--bg2:#1a1511;--bg3:#211a14;
  --card:#231d16;--card2:#2a241b;
  --border:rgba(255,220,150,0.07);--border-hi:rgba(255,180,80,0.16);
  --primary:#e8a44a;--primary-dim:rgba(232,164,74,0.14);
  --secondary:#f0c070;--secondary-dim:rgba(240,192,112,0.12);
  --accent:#c47a3f;--accent-dim:rgba(196,122,63,0.14);
  --success:#7ab87a;--success-dim:rgba(122,184,122,0.12);
  --warning:#fbbf24;--warning-dim:rgba(251,191,36,0.12);
  --danger:#e07070;--danger-dim:rgba(224,112,112,0.12);
  --tiktok:#88d8c0;--ig:#e07090;
  --text:#e8ddd0;--text-dim:#9a8870;--text-muted:#6a5840;--text-bright:#fdf6ee;
}

[data-theme="light"] {
  --bg:#f4f6fa;--bg2:#ffffff;--bg3:#edf0f7;
  --card:#ffffff;--card2:#f0f3fa;
  --border:rgba(0,0,0,0.08);--border-hi:rgba(99,102,241,0.25);
  --primary:#4f46e5;--primary-dim:rgba(79,70,229,0.10);
  --secondary:#0891b2;--secondary-dim:rgba(8,145,178,0.10);
  --accent:#db2777;--accent-dim:rgba(219,39,119,0.10);
  --success:#059669;--success-dim:rgba(5,150,105,0.10);
  --warning:#d97706;--warning-dim:rgba(217,119,6,0.10);
  --danger:#dc2626;--danger-dim:rgba(220,38,38,0.10);
  --tiktok:#0891b2;--ig:#be185d;
  --text:#1e2030;--text-dim:#5a6070;--text-muted:#94a3b8;--text-bright:#0a0c18;
  --shadow:0 2px 16px rgba(0,0,0,0.08);
}

[data-theme="purple"] {
  --bg:#0e0d16;--bg2:#141220;--bg3:#1a1829;
  --card:#1c1a2e;--card2:#22203a;
  --border:rgba(180,140,255,0.08);--border-hi:rgba(180,140,255,0.18);
  --primary:#a78bfa;--primary-dim:rgba(167,139,250,0.14);
  --secondary:#67e8f9;--secondary-dim:rgba(103,232,249,0.12);
  --accent:#f9a8d4;--accent-dim:rgba(249,168,212,0.12);
  --success:#6ee7b7;--success-dim:rgba(110,231,183,0.12);
  --warning:#fcd34d;--warning-dim:rgba(252,211,77,0.12);
  --danger:#fca5a5;--danger-dim:rgba(252,165,165,0.12);
  --text:#d4cff0;--text-dim:#7868a8;--text-muted:#4a4070;--text-bright:#f0ecff;
}

[data-theme="forest"] {
  --bg:#0b1109;--bg2:#10180d;--bg3:#151f11;
  --card:#182215;--card2:#1e2a1a;
  --border:rgba(100,200,100,0.07);--border-hi:rgba(100,200,100,0.16);
  --primary:#4ade80;--primary-dim:rgba(74,222,128,0.12);
  --secondary:#86efac;--secondary-dim:rgba(134,239,172,0.12);
  --accent:#fde047;--accent-dim:rgba(253,224,71,0.12);
  --success:#34d399;--success-dim:rgba(52,211,153,0.12);
  --warning:#fb923c;--warning-dim:rgba(251,146,60,0.12);
  --danger:#f87171;--danger-dim:rgba(248,113,113,0.12);
  --text:#d1f0c8;--text-dim:#5a8050;--text-muted:#3a5030;--text-bright:#f0ffe8;
}

[data-theme="ocean"] {
  --bg:#080f1a;--bg2:#0d1624;--bg3:#111e2e;
  --card:#142238;--card2:#192a44;
  --border:rgba(56,189,248,0.08);--border-hi:rgba(56,189,248,0.18);
  --primary:#38bdf8;--primary-dim:rgba(56,189,248,0.12);
  --secondary:#67e8f9;--secondary-dim:rgba(103,232,249,0.12);
  --accent:#818cf8;--accent-dim:rgba(129,140,248,0.14);
  --success:#34d399;--success-dim:rgba(52,211,153,0.12);
  --warning:#fbbf24;--warning-dim:rgba(251,191,36,0.12);
  --danger:#f87171;--danger-dim:rgba(248,113,113,0.12);
  --text:#bae6fd;--text-dim:#3a7090;--text-muted:#1e4a60;--text-bright:#f0f9ff;
}

[data-theme="rose"] {
  --bg:#12080e;--bg2:#180d13;--bg3:#1e1218;
  --card:#221520;--card2:#2a1a28;
  --border:rgba(251,113,133,0.08);--border-hi:rgba(251,113,133,0.18);
  --primary:#fb7185;--primary-dim:rgba(251,113,133,0.12);
  --secondary:#f9a8d4;--secondary-dim:rgba(249,168,212,0.12);
  --accent:#c084fc;--accent-dim:rgba(192,132,252,0.14);
  --success:#6ee7b7;--success-dim:rgba(110,231,183,0.12);
  --warning:#fcd34d;--warning-dim:rgba(252,211,77,0.12);
  --danger:#fca5a5;--danger-dim:rgba(252,165,165,0.12);
  --text:#fce7f3;--text-dim:#9a5070;--text-muted:#6a3050;--text-bright:#fff0f8;
}

[data-theme="midnight"] {
  --bg:#09090b;--bg2:#111113;--bg3:#18181b;
  --card:#1c1c1f;--card2:#242428;
  --border:rgba(255,255,255,0.06);--border-hi:rgba(255,255,255,0.12);
  --primary:#e879f9;--primary-dim:rgba(232,121,249,0.12);
  --secondary:#67e8f9;--secondary-dim:rgba(103,232,249,0.12);
  --accent:#fbbf24;--accent-dim:rgba(251,191,36,0.12);
  --success:#34d399;--success-dim:rgba(52,211,153,0.12);
  --warning:#fb923c;--warning-dim:rgba(251,146,60,0.12);
  --danger:#f87171;--danger-dim:rgba(248,113,113,0.12);
  --text:#d4d4d8;--text-dim:#71717a;--text-muted:#3f3f46;--text-bright:#fafafa;
}

[data-theme="sunset"] {
  --bg:#130a06;--bg2:#1c1009;--bg3:#25160c;
  --card:#2c1c12;--card2:#35231a;
  --border:rgba(251,146,60,0.08);--border-hi:rgba(251,146,60,0.2);
  --primary:#fb923c;--primary-dim:rgba(251,146,60,0.14);
  --secondary:#fcd34d;--secondary-dim:rgba(252,211,77,0.12);
  --accent:#f472b6;--accent-dim:rgba(244,114,182,0.12);
  --success:#6ee7b7;--success-dim:rgba(110,231,183,0.12);
  --warning:#fde68a;--warning-dim:rgba(253,230,138,0.12);
  --danger:#fca5a5;--danger-dim:rgba(252,165,165,0.12);
  --text:#fde8d8;--text-dim:#9a6850;--text-muted:#6a4030;--text-bright:#fff5ee;
}

[data-theme="sage"] {
  --bg:#0d1210;--bg2:#131a16;--bg3:#18221c;
  --card:#1e2a22;--card2:#26342a;
  --border:rgba(134,239,172,0.07);--border-hi:rgba(134,239,172,0.15);
  --primary:#86efac;--primary-dim:rgba(134,239,172,0.12);
  --secondary:#67e8f9;--secondary-dim:rgba(103,232,249,0.12);
  --accent:#fde047;--accent-dim:rgba(253,224,71,0.12);
  --success:#4ade80;--success-dim:rgba(74,222,128,0.12);
  --warning:#fb923c;--warning-dim:rgba(251,146,60,0.12);
  --danger:#f87171;--danger-dim:rgba(248,113,113,0.12);
  --text:#d1fae5;--text-dim:#6b8f78;--text-muted:#3d5a48;--text-bright:#f0fff8;
}

[data-theme="nord"] {
  --bg:#1a1f2e;--bg2:#222838;--bg3:#2a3045;
  --card:#2e3850;--card2:#36405c;
  --border:rgba(136,192,208,0.09);--border-hi:rgba(136,192,208,0.2);
  --primary:#88c0d0;--primary-dim:rgba(136,192,208,0.13);
  --secondary:#81a1c1;--secondary-dim:rgba(129,161,193,0.12);
  --accent:#b48ead;--accent-dim:rgba(180,142,173,0.14);
  --success:#a3be8c;--success-dim:rgba(163,190,140,0.12);
  --warning:#ebcb8b;--warning-dim:rgba(235,203,139,0.12);
  --danger:#bf616a;--danger-dim:rgba(191,97,106,0.14);
  --text:#d8dee9;--text-dim:#6a7890;--text-muted:#3a4558;--text-bright:#eceff4;
}

[data-theme="latte"] {
  --bg:#f5f0e8;--bg2:#faf7f2;--bg3:#eee8de;
  --card:#ffffff;--card2:#f0ece4;
  --border:rgba(0,0,0,0.07);--border-hi:rgba(120,80,40,0.2);
  --primary:#8b5e3c;--primary-dim:rgba(139,94,60,0.12);
  --secondary:#5c7c4a;--secondary-dim:rgba(92,124,74,0.12);
  --accent:#b85c38;--accent-dim:rgba(184,92,56,0.12);
  --success:#5c7c4a;--success-dim:rgba(92,124,74,0.12);
  --warning:#c49a2a;--warning-dim:rgba(196,154,42,0.12);
  --danger:#b84040;--danger-dim:rgba(184,64,64,0.12);
  --text:#3c2e20;--text-dim:#8a7060;--text-muted:#b8a898;--text-bright:#1a1008;
  --shadow:0 2px 16px rgba(0,0,0,0.07);
}

[data-theme="neon"] {
  --bg:#030308;--bg2:#07070f;--bg3:#0c0c18;
  --card:#0f0f20;--card2:#141428;
  --border:rgba(0,255,136,0.1);--border-hi:rgba(0,255,136,0.25);
  --primary:#00ff88;--primary-dim:rgba(0,255,136,0.12);
  --secondary:#00e5ff;--secondary-dim:rgba(0,229,255,0.12);
  --accent:#ff00cc;--accent-dim:rgba(255,0,204,0.12);
  --success:#00ff88;--success-dim:rgba(0,255,136,0.12);
  --warning:#ffee00;--warning-dim:rgba(255,238,0,0.12);
  --danger:#ff3355;--danger-dim:rgba(255,51,85,0.12);
  --text:#c8ffec;--text-dim:#406858;--text-muted:#204838;--text-bright:#ffffff;
}

[data-theme="slateblu"] {
  --bg:#0f1523;--bg2:#141c2e;--bg3:#1a2438;
  --card:#1e2d42;--card2:#24364f;
  --border:rgba(99,130,220,0.09);--border-hi:rgba(99,130,220,0.2);
  --primary:#6382dc;--primary-dim:rgba(99,130,220,0.13);
  --secondary:#34d399;--secondary-dim:rgba(52,211,153,0.12);
  --accent:#f472b6;--accent-dim:rgba(244,114,182,0.12);
  --success:#34d399;--success-dim:rgba(52,211,153,0.12);
  --warning:#fbbf24;--warning-dim:rgba(251,191,36,0.12);
  --danger:#f87171;--danger-dim:rgba(248,113,113,0.12);
  --text:#c8d8f0;--text-dim:#5a7090;--text-muted:#2a4060;--text-bright:#e8f0ff;
}

[data-theme="mocha"] {
  --bg:#110c08;--bg2:#18110c;--bg3:#201610;
  --card:#281c14;--card2:#30221a;
  --border:rgba(200,160,110,0.08);--border-hi:rgba(200,160,110,0.18);
  --primary:#c8a06e;--primary-dim:rgba(200,160,110,0.13);
  --secondary:#d4a96a;--secondary-dim:rgba(212,169,106,0.12);
  --accent:#8b6f9a;--accent-dim:rgba(139,111,154,0.14);
  --success:#7aad7a;--success-dim:rgba(122,173,122,0.12);
  --warning:#d4a96a;--warning-dim:rgba(212,169,106,0.12);
  --danger:#c87070;--danger-dim:rgba(200,112,112,0.12);
  --text:#e8d8c8;--text-dim:#907060;--text-muted:#604838;--text-bright:#fff8f0;
}

[data-theme="light"] body, [data-theme="latte"] body { color: var(--text); }


/* ═══════════════════════════════════════════════
   FONT SYSTEM — [data-font] on <html> element
   Uses !important to override any inline styles
═══════════════════════════════════════════════ */
html { font-size: 16px; }

/* Base font — applies before JS sets anything */
html, body, button, input, select, textarea, h1, h2, h3, h4, h5, h6, p, span, div, a, label {
  font-family: 'Inter', system-ui, sans-serif;
}

/* Font overrides — !important beats everything */
[data-font="inter"]     * { font-family: 'Inter', system-ui, sans-serif !important; }
[data-font="jakarta"]   * { font-family: 'Plus Jakarta Sans', system-ui, sans-serif !important; }
[data-font="outfit"]    * { font-family: 'Outfit', system-ui, sans-serif !important; }
[data-font="nunito"]    * { font-family: 'Nunito', system-ui, sans-serif !important; }
[data-font="syne"]      * { font-family: 'Syne', system-ui, sans-serif !important; }
[data-font="space"]     * { font-family: 'Space Grotesk', system-ui, sans-serif !important; }
[data-font="literata"]  * { font-family: 'Literata', Georgia, serif !important; }
[data-font="fraunces"]  * { font-family: 'Fraunces', Georgia, serif !important; }
[data-font="fira"]      * { font-family: 'Fira Code', 'Courier New', monospace !important; }
[data-font="source"]    * { font-family: 'Source Code Pro', 'Courier New', monospace !important; }
[data-font="mono"]      * { font-family: 'DM Mono', 'Courier New', monospace !important; }
[data-font="dmsans"]    * { font-family: 'DM Sans', system-ui, sans-serif !important; }
[data-font="bricolage"] * { font-family: 'Bricolage Grotesque', system-ui, sans-serif !important; }
[data-font="lexend"]    * { font-family: 'Lexend', system-ui, sans-serif !important; }
[data-font="cabinet"]   * { font-family: 'Cabinet Grotesk', system-ui, sans-serif !important; }

/* ═══════════════════════════════════════════════
   TEXT SIZE — [data-textsize] on <html>
   Sets base rem size; all 1rem elements scale
═══════════════════════════════════════════════ */
[data-textsize="sm"]  { font-size: 12px !important; }
[data-textsize="md"]  { font-size: 15px !important; }
[data-textsize="lg"]  { font-size: 18px !important; }
[data-textsize="xl"]  { font-size: 21px !important; }
[data-textsize="xxl"] { font-size: 25px !important; }

/* Force body to use rem so it inherits from html */
body {
  font-size: 1rem;
  line-height: 1.65;
  font-family: inherit;
  background: var(--bg);
  color: var(--text);
  min-height: 100vh;
  overflow-x: hidden;
  transition: background 0.35s, color 0.35s;
}

/* ═══════════════════════════════════════════════
   ANIMATED BACKGROUNDS
═══════════════════════════════════════════════ */
#bg-canvas {
  position: fixed; inset: 0; z-index: 0;
  pointer-events: none; width: 100%; height: 100%;
  display: none;
}
body::before {
  content: '';
  position: fixed; inset: 0; z-index: 0; pointer-events: none;
  background-image:
    linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
  background-size: 48px 48px;
  opacity: 1; transition: opacity 0.4s;
}
[data-theme="light"] body::before,
[data-theme="latte"] body::before {
  background-image:
    linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px);
}
[data-bg="none"]    body::before { opacity: 0; }
[data-bg="dots"]    body::before {
  background-image: radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px);
  background-size: 28px 28px;
}
[data-bg="crosshatch"] body::before {
  background-image:
    linear-gradient(45deg,  rgba(255,255,255,0.04) 1px, transparent 1px),
    linear-gradient(-45deg, rgba(255,255,255,0.04) 1px, transparent 1px);
  background-size: 36px 36px;
}
[data-bg="circuit"] body::before {
  background-image:
    linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px),
    linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
  background-size: 80px 80px, 80px 80px, 20px 20px, 20px 20px;
}
[data-bg="hexagon"] body::before {
  background-image: radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px);
  background-size: 30px 52px;
}
[data-bg="scanline"] body::before { opacity: 0; }
[data-bg="particles"] body::before { opacity: 0; }
[data-bg="waves"]     body::before { opacity: 0; }
[data-bg="matrix"]    body::before { opacity: 0; }
[data-bg="aurora"]    body::before { opacity: 0; }
[data-bg="nebula"]    body::before { opacity: 0; }
[data-bg="starfield"] body::before { opacity: 0; }

/* Scanline sweep */
@keyframes ss-scanline { 0% { transform: translateY(-100vh); } 100% { transform: translateY(200vh); } }
body::after {
  content: ''; position: fixed; left: 0; top: 0;
  width: 100%; height: 4px; pointer-events: none; z-index: 1; opacity: 0; transition: opacity 0.3s;
  background: linear-gradient(transparent, var(--primary-dim), transparent);
  animation: ss-scanline 8s linear infinite;
}
[data-bg="scanline"] body::after { opacity: 1; }

/* ═══════════════════════════════════════════════
   LAYOUT MODES — [data-layout] on <html>
═══════════════════════════════════════════════ */
[data-layout="compact"] .tabcontent    { padding: 14px !important; }
[data-layout="compact"] .control-card { padding: 13px; margin-bottom: 10px; }
[data-layout="compact"] h2             { font-size: 0.9rem; }
[data-layout="compact"] h3             { font-size: 0.75rem; margin: 14px 0 8px; }
[data-layout="compact"] .tab-subtitle  { font-size: 0.75rem; margin-bottom: 12px; }
[data-layout="compact"] .score-val     { font-size: 3.5rem !important; }
[data-layout="compact"] .stat-mini     { padding: 12px; }
[data-layout="compact"] .tab-btn       { padding: 6px 10px; font-size: 0.75rem; }
[data-layout="minimal"] .tab-subtitle  { display: none; }
[data-layout="minimal"] .proj-explain  { display: none; }
[data-layout="minimal"] .insight-box   { display: none; }
[data-layout="minimal"] .info-card p   { display: none; }
[data-layout="minimal"] .faq-link-bar  { display: none; }
[data-layout="wide"] .container        { max-width: 1540px; }
[data-layout="wide"] .tabcontent       { padding: 32px; }
[data-layout="dashboard"] .container   { max-width: 1600px; }
[data-layout="dashboard"] .tabcontent  { padding: 12px !important; }
[data-layout="dashboard"] .control-card{ padding: 12px; margin-bottom: 8px; }
[data-layout="dashboard"] .tab-subtitle{ font-size: 0.75rem; margin-bottom: 8px; }
[data-layout="dashboard"] .score-val   { font-size: 3rem !important; }
[data-layout="dashboard"] body         { font-size: 0.85rem; }
[data-layout="cozy"] .container        { max-width: 900px; }
[data-layout="cozy"] .tabcontent       { padding: 36px; }
[data-layout="cozy"] .control-card     { padding: 24px; border-radius: 18px; }
[data-layout="cozy"] body              { font-size: 1.05rem; line-height: 1.8; }
[data-layout="cozy"] .score-val        { font-size: 6rem !important; }

/* ═══════════════════════════════════════════════
   PLATFORM GATING
═══════════════════════════════════════════════ */
[data-hide-youtube]   .plat-yt  { display: none !important; }
[data-hide-tiktok]    .plat-tt  { display: none !important; }
[data-hide-instagram] .plat-ig  { display: none !important; }
[data-hide-twitch]    .plat-tw  { display: none !important; }
[data-hide-twitter]   .plat-x   { display: none !important; }
[data-hide-linkedin]  .plat-li  { display: none !important; }

/* ═══════════════════════════════════════════════
   CONTAINER & STRUCTURE
═══════════════════════════════════════════════ */
.container {
  max-width: 1240px; margin: 0 auto;
  position: relative; z-index: 2; padding: 20px 16px;
}

/* ═══════════════════════════════════════════════
   TYPOGRAPHY
═══════════════════════════════════════════════ */
h1, h2, h3, h4 { color: var(--text-bright); }
h2 { font-size: 1.2rem; font-weight: 800; letter-spacing: -0.3px; margin-bottom: 4px; }
h3 {
  font-size: 0.8rem; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.8px; margin: 24px 0 12px;
  border-bottom: 1px solid var(--border); padding-bottom: 8px;
  display: flex; align-items: center; gap: 8px;
}
.tab-subtitle {
  color: var(--text-dim); font-size: 0.875rem; margin-bottom: 20px;
  line-height: 1.65; max-width: 800px;
  border-left: 3px solid var(--primary); padding-left: 12px;
}
p { color: var(--text); }
a { color: var(--primary); }

/* ═══════════════════════════════════════════════
   AUTH OVERLAY
═══════════════════════════════════════════════ */
.auth-overlay {
  position: fixed; inset: 0; background:rgba(0,0,0,0.92);
  backdrop-filter: blur(20px); display: flex;
  justify-content: center; align-items: center; z-index: 2000;
}
.auth-modal {
  background: var(--card); border: 1px solid var(--border-hi);
  border-radius: var(--radius-lg); padding: 44px 36px;
  width: 90%; max-width: 440px; text-align: center; position: relative;
  box-shadow: 0 24px 80px rgba(0,0,0,0.5);
}
.auth-modal::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
  background: linear-gradient(90deg, var(--primary), var(--accent));
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
}
.auth-modal .icon-wrap {
  width: 64px; height: 64px; background: var(--primary-dim);
  border: 1px solid var(--primary); border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 16px; font-size: 26px;
}
.auth-modal 
.auth-modal p  { color: var(--text-dim); font-size: 0.875rem; margin-bottom: 20px; }
.auth-input {
  width: 100%; padding: 12px 16px; margin: 6px 0;
  background: var(--bg2); border: 1px solid var(--border-hi);
  border-radius: var(--radius); font-size: 1rem;
  color: var(--text-bright); transition: 0.2s;
}
.auth-

/* ═══════════════════════════════════════════════
   HEADER
═══════════════════════════════════════════════ */
.header-area {
  background: var(--bg2); border: 1px solid var(--border);
  border-radius: var(--radius-lg); padding: 20px 20px 0;
  margin-bottom: 14px; position: relative; z-index: 100;
}
.header-area::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, var(--primary), var(--accent));
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
}
.header-glow-orb { display: none; }
.header-area h1 {
  font-size: 1.4rem; font-weight: 800; text-align: center;
  margin-bottom: 16px; color: var(--text-bright); letter-spacing: -0.5px;
}
.header-area h1 span { color: var(--primary); }
.user-bar {
  display: flex; gap: 10px; align-items: center;
  margin-bottom: 12px; flex-wrap: wrap; font-size: 0.8rem;
  font-weight: 600; color: var(--text-dim);
}
.user-bar > span { color: var(--primary); }

/* ═══════════════════════════════════════════════
   NAV TABS
═══════════════════════════════════════════════ */
.tab-container {
  display: flex; justify-content: center; flex-wrap: wrap;
  gap: 5px; padding-bottom: 16px; position: relative; z-index: 500;
}
.tab-btn {
  background: transparent; border: 1px solid var(--border-hi);
  color: var(--text-dim); padding: 7px 14px; border-radius: 8px;
  font-size: 0.8rem; font-weight: 600; cursor: pointer;
  transition: all 0.15s; white-space: nowrap;
}
.tab-btn:hover { background: var(--card); color: var(--text-bright); }
.tab-btn.active { background: var(--primary-dim); border-color: var(--primary); color: var(--primary); font-weight: 700; }
.dropdown { position: relative; display: inline-block; }
.dropdown-content {
  display: none; position: absolute; background: var(--card);
  border: 1px solid var(--border-hi); min-width: 220px; z-index: 99999;
  border-radius: var(--radius-lg); top: calc(100% + 5px); left: 0;
  box-shadow: 0 16px 48px rgba(0,0,0,0.5); overflow: hidden;
}
.dropdown-content.open { display: block; }
.dropdown-content a {
  display: block; padding: 11px 16px; color: var(--text); font-size: 0.875rem;
  font-weight: 600; border-bottom: 1px solid var(--border);
  text-decoration: none; cursor: pointer; transition: 0.12s;
}
.dropdown-content a:last-child { border-bottom: none; }
.dropdown-content a:hover { background: var(--primary-dim); color: var(--primary); padding-left: 20px; }

/* ═══════════════════════════════════════════════
   TAB CONTENT
═══════════════════════════════════════════════ */
.tabcontent {
  display: none; padding: 24px; background: var(--bg2);
  border: 1px solid var(--border); border-radius: var(--radius-lg);
  margin-bottom: 14px; position: relative; z-index: 1;
  animation: fadeInUp 0.2s ease-out;
}
@keyframes fadeInUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
@keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.6;transform:scale(1.3)} }
@keyframes pulse-glow { 0%,100%{opacity:0.7} 50%{opacity:1} }

/* ═══════════════════════════════════════════════
   CARDS
═══════════════════════════════════════════════ */
.control-card {
  background: var(--card); border: 1px solid var(--border);
  border-radius: var(--radius-lg); padding: 18px; margin-bottom: 14px;
  position: relative; overflow: hidden; transition: border-color 0.2s;
  color: var(--text);
}
.control-card:hover { border-color: var(--border-hi); }
.control-card.highlight::before { content:''; position:absolute; top:0;left:0;right:0;height:2px;background:var(--danger); }
.control-card.success::before  { content:''; position:absolute; top:0;left:0;right:0;height:2px;background:var(--success); }
.control-card.accent::before   { content:''; position:absolute; top:0;left:0;right:0;height:2px;background:var(--accent); }
.control-card.purple::before   { content:''; position:absolute; top:0;left:0;right:0;height:2px;background:var(--accent); }
.control-card.tt-card { border-top: 2px solid var(--tiktok) !important; }
.control-card.ig-card { border-top: 2px solid var(--ig) !important; }
.control-card.highlight { border-color: color-mix(in srgb, var(--danger) 30%, var(--border)); }
.control-card.success   { border-color: color-mix(in srgb, var(--success) 30%, var(--border)); }
.control-card.accent    { border-color: color-mix(in srgb, var(--accent) 30%, var(--border)); }

.info-card {
  background: var(--card2); border: 1px solid var(--border);
  border-radius: var(--radius); padding: 14px; margin-bottom: 10px; color: var(--text);
}
.info-card h4 { margin-bottom: 6px; font-size: 0.875rem; color: var(--primary); font-weight: 700; }

/* ═══════════════════════════════════════════════
   INPUTS & FORM ELEMENTS
═══════════════════════════════════════════════ */
.label-flex {
  display: flex; justify-content: space-between; align-items: center;
  font-weight: 600; margin-bottom: 10px; color: var(--text-bright); font-size: 0.875rem;
}
.val-badge {
  background: var(--primary-dim); color: var(--primary);
  border: 1px solid var(--primary); padding: 2px 10px;
  border-radius: 20px; font-size: 0.75rem; font-weight: 700;
}
.input-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(175px, 1fr)); gap: 12px; margin-top: 10px; }
.input-box  { display: flex; flex-direction: column; }
.input-box label {
  font-size: 0.7rem; color: var(--text-dim); margin-bottom: 5px;
  font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;
}
input[type=text], input[type=number], input[type=email], input[type=url],
input[type=password], input[type=date], select, textarea {
  padding: 9px 12px; background: var(--bg2); border: 1px solid var(--border-hi);
  border-radius: var(--radius); font-size: 1rem; color: var(--text-bright);
  transition: border-color 0.2s, background 0.2s; width: 100%;
}
input:focus, select:focus, textarea:focus {
  outline: none; border-color: var(--primary); background: var(--bg3);
}
select option { background: var(--card); color: var(--text); }
input[type=checkbox] { width: 16px; height: 16px; accent-color: var(--primary); cursor: pointer; }

/* ═══════════════════════════════════════════════
   IMPROVED SLIDERS
═══════════════════════════════════════════════ */
input[type=range] {
  -webkit-appearance: none; appearance: none; width: 100%;
  height: 6px; border-radius: 6px; outline: none; cursor: pointer;
  background: linear-gradient(to right,
    var(--primary) 0%,
    var(--primary) var(--val, 0%),
    var(--border-hi) var(--val, 0%),
    var(--border-hi) 100%);
  transition: background 0.1s;
}
input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none; width: 20px; height: 20px; border-radius: 50%;
  background: var(--primary); cursor: pointer; border: 3px solid var(--bg);
  box-shadow: 0 0 0 3px var(--primary-dim), 0 2px 8px rgba(0,0,0,0.4);
  transition: transform 0.15s, box-shadow 0.15s;
}
input[type=range]::-webkit-slider-thumb:hover {
  transform: scale(1.25);
  box-shadow: 0 0 0 5px var(--primary-dim), 0 4px 14px rgba(0,0,0,0.5);
}
input[type=range]::-moz-range-thumb {
  width: 20px; height: 20px; border-radius: 50%;
  background: var(--primary); cursor: pointer; border: 3px solid var(--bg);
  box-shadow: 0 0 0 3px var(--primary-dim);
}
input[type=range]:focus::-webkit-slider-thumb { box-shadow: 0 0 0 6px var(--primary-dim); }

.insight-box {
  display: flex; gap: 10px; background: var(--primary-dim);
  border: 1px solid rgba(99,102,241,0.25); padding: 12px;
  border-radius: var(--radius); margin-top: 12px;
  font-size: 0.875rem; color: var(--text); line-height: 1.6;
}
.insight-box .icon { font-size: 1rem; flex-shrink: 0; }

/* ═══════════════════════════════════════════════
   SCORE DISPLAY
═══════════════════════════════════════════════ */
.score-display {
  text-align: center; background: var(--card); border: 1px solid var(--border-hi);
  border-radius: var(--radius-lg); padding: 28px 20px; margin: 20px 0;
  position: relative; overflow: hidden; color: var(--text);
}
.score-display::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
  background: linear-gradient(90deg, var(--primary), var(--accent));
}
.score-val {
  font-size: 5rem; font-weight: 800; line-height: 1;
  color: var(--primary); letter-spacing: -2px; margin: 10px 0;
  font-variant-numeric: tabular-nums;
}
.rating-badge {
  display: inline-block; padding: 5px 18px; border-radius: 20px;
  font-size: 0.875rem; font-weight: 700; margin-bottom: 8px;
}
.rating-desc { color: var(--text-dim); font-size: 0.875rem; }

/* ═══════════════════════════════════════════════
   BREAKDOWN & STAT MINIS
═══════════════════════════════════════════════ */
.breakdown {
  background: var(--card); padding: 16px; border-radius: var(--radius-lg);
  border: 1px solid var(--border); margin-top: 16px; color: var(--text);
}
.breakdown h4 {
  margin-bottom: 12px; color: var(--text-bright); border-bottom: 1px solid var(--border);
  padding-bottom: 7px; font-size: 0.75rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.8px;
}
.breakdown div { display: flex; justify-content: space-between; margin-bottom: 7px; padding: 4px 0; border-bottom: 1px dashed var(--border); font-size: 0.875rem; }
.breakdown div:last-child { border-bottom: none; }
.breakdown div span:last-child { font-weight: 700; color: var(--primary); }

.stat-mini { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 14px; color: var(--text); }
.stat-mini .label { font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.6px; color: var(--text-dim); margin-bottom: 4px; }
.stat-mini .value { font-size: 1.4rem; font-weight: 700; color: var(--text-bright); line-height: 1.15; }
.stat-mini .sub   { font-size: 0.7rem; color: var(--text-dim); margin-top: 3px; }

/* ═══════════════════════════════════════════════
   TARGET/TIER CARDS
═══════════════════════════════════════════════ */
.target-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 12px; }
.target-card {
  background: var(--card); border: 1px solid var(--border); border-radius: var(--radius-lg);
  padding: 16px; position: relative; overflow: hidden; color: var(--text); transition: 0.2s;
}
.target-card:hover { transform: translateY(-2px); border-color: var(--border-hi); box-shadow: var(--shadow); }
.target-card::before { content:''; position:absolute; top:0;left:0;bottom:0;width:3px;background:var(--primary); }
.target-card .tier-name { font-size: 0.7rem; text-transform: uppercase; font-weight: 700; color: var(--primary); margin-bottom: 6px; letter-spacing: 0.7px; }
.stat-row { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px dashed var(--border); font-size: 0.8rem; color: var(--text-dim); }
.stat-row:last-child { border-bottom: none; }
.stat-val { font-weight: 700; color: var(--secondary); }
.tier-goal { font-size: 0.7rem; color: var(--accent); font-weight: 600; margin-top: 7px; padding: 5px 8px; background: var(--accent-dim); border-radius: 5px; }

/* ═══════════════════════════════════════════════
   BUTTONS
═══════════════════════════════════════════════ */
.btn-primary {
  background: var(--primary); color: #fff; border: 1px solid var(--primary);
  padding: 9px 20px; border-radius: var(--radius); font-weight: 700;
  cursor: pointer; font-size: 0.875rem; transition: opacity 0.15s, transform 0.15s;
}
.btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }
.btn-secondary {
  background: transparent; color: var(--text); border: 1px solid var(--border-hi);
  padding: 9px 16px; border-radius: var(--radius); font-weight: 600;
  cursor: pointer; font-size: 0.875rem; transition: 0.15s;
}
.btn-secondary:hover { background: var(--card2); color: var(--text-bright); border-color: var(--border-hi); }
.btn-accent {
  background: transparent; color: var(--accent); border: 1px solid var(--accent);
  padding: 9px 20px; border-radius: var(--radius); font-weight: 600;
  cursor: pointer; font-size: 0.875rem; transition: 0.15s;
}
.btn-accent:hover { background: var(--accent-dim); }

/* ═══════════════════════════════════════════════
   TABLES
═══════════════════════════════════════════════ */
.tracker-table { width: 100%; border-collapse: collapse; font-size: 0.875rem; margin-top: 14px; }
.tracker-table th, .tracker-table td { padding: 11px 13px; text-align: left; border-bottom: 1px solid var(--border); }
.tracker-table th { background: var(--card2); color: var(--text-dim); font-weight: 600; text-transform: uppercase; font-size: 0.7rem; letter-spacing: 0.5px; }
.tracker-table td { color: var(--text); }
.tracker-table tr:hover td { background: var(--primary-dim); }
.rpm-table { width: 100%; border-collapse: collapse; font-size: 0.875rem; border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; margin-top: 14px; }
.rpm-table th, .rpm-table td { padding: 10px 13px; border: 1px solid var(--border); color: var(--text); }
.rpm-table th { background: var(--card2); color: var(--text-dim); font-weight: 700; text-transform: uppercase; font-size: 0.7rem; }

/* ═══════════════════════════════════════════════
   MISC COMPONENTS
═══════════════════════════════════════════════ */
.progress-track { background: var(--card2); border-radius: 20px; height: 12px; overflow: hidden; border: 1px solid var(--border); }
.progress-fill { height: 100%; border-radius: 20px; transition: width 0.4s; }
.proj-scenario { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 16px; margin-bottom: 12px; border-left: 3px solid; color: var(--text); }
.proj-explain { background: var(--primary-dim); border: 1px solid rgba(99,102,241,0.2); border-radius: var(--radius); padding: 12px; font-size: 0.875rem; color: var(--text); line-height: 1.7; margin-top: 10px; }
.sub-proj-card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 18px; margin-top: 16px; }
.wh-tier-card { background: var(--card2); border: 1px solid var(--border); border-radius: var(--radius); padding: 14px; border-left: 4px solid; margin-bottom: 10px; }
.report-card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 22px; margin-top: 18px; display: none; border-top: 3px solid var(--primary); }
.range-card { padding: 16px; border-radius: var(--radius); background: var(--card2); border: 1px solid var(--border); text-align: center; color: var(--text); }
.api-section { background: var(--card); border: 1px solid var(--border-hi); border-radius: var(--radius-lg); padding: 18px; margin-bottom: 16px; position: relative; overflow: hidden; }
.api-section::before { content:''; position:absolute; top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--accent),var(--primary)); }
.api-note { color: var(--text-muted); font-size: 0.7rem; margin-top: 4px; line-height: 1.5; }

.account-field { margin-bottom: 12px; }
.account-field label { display: block; font-size: 0.7rem; color: var(--text-dim); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
.save-badge { display: inline-flex; align-items: center; gap: 5px; background: var(--success-dim); border: 1px solid var(--success); color: var(--success); padding: 3px 10px; border-radius: 20px; font-size: 0.7rem; font-weight: 700; }
.link-preview { background: var(--card2); border: 1px solid var(--border); border-radius: var(--radius); padding: 9px; margin-top: 6px; font-size: 0.75rem; }
.link-preview a { color: var(--primary); text-decoration: none; word-break: break-all; }

.faq-section { border: 1px solid var(--border); border-radius: var(--radius-lg); margin-bottom: 8px; overflow: hidden; }
.faq-header { background: var(--card); padding: 14px 18px; font-weight: 700; font-size: 0.875rem; color: var(--text-bright); cursor: pointer; display: flex; align-items: center; gap: 8px; transition: background 0.2s, color 0.2s; }
.faq-header:hover { background: var(--card2); }
.faq-body { padding: 14px 16px; background: var(--bg2); font-size: 0.875rem; color: var(--text-dim); line-height: 1.75; }
.faq-list { margin: 8px 0 6px 16px; }
.faq-list li { margin-bottom: 5px; }
.faq-note { margin-top: 8px; color: var(--primary); font-size: 0.75rem; font-weight: 600; border-left: 2px solid var(--primary); padding-left: 9px; }
.faq-link-bar { margin-top: 20px; padding: 10px 14px; background: var(--card); border: 1px dashed var(--border-hi); border-radius: var(--radius); font-size: 0.75rem; color: var(--text-dim); }
.faq-link-bar a { color: var(--primary); cursor: pointer; font-weight: 600; }

.live-card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 18px; text-align: center; position: relative; color: var(--text); transition: 0.2s; }
.live-card:hover { border-color: var(--border-hi); transform: translateY(-2px); }
.live-pulse { position: absolute; top: 11px; right: 11px; width: 9px; height: 9px; border-radius: 50%; background: var(--danger); box-shadow: 0 0 0 2px var(--danger-dim); animation: pulse-dot 1.5s ease-in-out infinite; }
.live-count { font-size: 2.2rem; font-weight: 800; color: var(--text-bright); line-height: 1; font-variant-numeric: tabular-nums; }

#saveBanner { position:fixed;top:0;left:0;right:0;z-index:1000;background:var(--warning);color:#1a1000;padding:9px 18px;text-align:center;font-size:0.875rem;font-weight:700;display:none;align-items:center;justify-content:center;gap:10px;box-shadow:0 2px 12px rgba(0,0,0,0.3); }
#saveBanner button { background:rgba(0,0,0,0.2);color:#1a1000;border:1px solid rgba(0,0,0,0.3);padding:4px 12px;border-radius:6px;cursor:pointer;font-weight:700;font-size:0.8rem; }

#unsavedModal { display:none;position:fixed;inset:0;background:rgba(0,0,0,0.75);backdrop-filter:blur(8px);z-index:5000;align-items:center;justify-content:center; }
#unsavedModal .um-box { background:var(--card);border:1px solid var(--border-hi);border-radius:var(--radius-lg);padding:30px 26px;max-width:380px;width:90%;text-align:center;box-shadow:0 24px 80px rgba(0,0,0,0.5); }

.theme-card { cursor:pointer;border-radius:var(--radius-lg);padding:11px;border:2px solid transparent;transition:all 0.15s;position:relative; }
.theme-check { display:none;align-items:center;justify-content:center; }
.font-card { cursor:pointer;border-radius:var(--radius);padding:11px;border:2px solid transparent;background:var(--card);position:relative;transition:all 0.15s; }
.font-check { display:none; }
.layout-picker-grid { display:grid;grid-template-columns:repeat(2,1fr);gap:9px; }
.layout-card { cursor:pointer;border-radius:var(--radius-lg);padding:14px;border:2px solid var(--border-hi);background:var(--card2);transition:all 0.15s;text-align:center; }
.layout-card:hover, .layout-card.active { border-color:var(--primary);background:var(--primary-dim); }
.lc-icon { font-size:1.4rem;margin-bottom:5px; }
.lc-name { font-weight:700;font-size:0.875rem;color:var(--text-bright);margin-bottom:2px; }
.lc-desc { font-size:0.7rem;color:var(--text-dim);line-height:1.3; }

.plat-btn, .bg-btn, .ts-btn {
  padding: 7px 14px; border-radius: 8px; cursor: pointer; font-size: 0.875rem;
  font-weight: 600; border: 2px solid var(--border-hi); color: var(--text-dim);
  background: var(--card2); transition: all 0.15s;
}
.plat-btn.active { border-color:var(--primary);color:var(--primary);background:var(--primary-dim); }
.bg-btn.active   { border-color:var(--secondary);color:var(--secondary);background:var(--secondary-dim); }
.ts-btn.active   { border-color:var(--accent);color:var(--accent);background:var(--accent-dim); }

.ab-variant { background:var(--card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:18px;margin-bottom:12px;position:relative;transition:border-color 0.2s; }
.ab-variant.winner { border-color:var(--success)!important; }
.ab-ctr-bar-wrap { height:8px;background:var(--card2);border-radius:4px;overflow:hidden;margin-top:8px; }
.ab-ctr-bar { height:100%;border-radius:4px;transition:width 0.4s; }

#adminOverlay { display:none;position:fixed;inset:0;background:rgba(0,0,0,0.94);backdrop-filter:blur(18px);z-index:3000;overflow-y:auto; }
.version-footer { text-align:center;padding:20px;color:var(--text-muted);font-size:0.75rem;letter-spacing:1px; }
.version-footer span { color:var(--primary); }
hr { border:0;border-top:1px solid var(--border);margin:20px 0; }
.section-divider { height:1px;background:linear-gradient(90deg,transparent,var(--border-hi),transparent);margin:28px 0; }

/* Mobile hamburger */
#mobMenuBtn { display:none;background:var(--card2);border:1px solid var(--border-hi);border-radius:8px;padding:8px 14px;cursor:pointer;color:var(--text-bright);font-size:0.875rem;font-weight:600;gap:8px;align-items:center;margin-bottom:8px; }

/* ═══════════════════════════════════════════════
   RESPONSIVE / MOBILE
═══════════════════════════════════════════════ */
@media (max-width: 768px) {
  #mobMenuBtn { display: flex; }
  .tab-container { display: none; flex-direction: column; gap: 4px; padding-bottom: 12px; }
  .tab-container.mob-open { display: flex; }
  .tab-btn { text-align: left; border-radius: 8px; width: 100%; }
  .dropdown, .dropdown-content { width: 100%; position: static; box-shadow: none; }
  .header-area { padding: 14px 14px 0; }
  .header-area h1 { font-size: 1.1rem; }
  
  .container { padding: 10px 10px; }
  .input-grid { grid-template-columns: 1fr 1fr; }
  
  .target-grid { grid-template-columns: 1fr; }
}
@media (max-width: 480px) {
  .input-grid { grid-template-columns: 1fr; }
  
  .layout-picker-grid { grid-template-columns: 1fr 1fr; }
}

/* ═══════════════════════════════════════════════
   LANDING OVERLAY — scoped under #landingOverlay
   position:fixed so it covers the whole screen
═══════════════════════════════════════════════ */
#landingOverlay {
  position: fixed;
  inset: 0;
  z-index: 9000;
  overflow-y: auto;
  background: var(--bg);
  font-family: 'Inter', system-ui, sans-serif;
  color: var(--text);
}
#landingOverlay.hidden { display: none !important; }

/* Nav */
#landingOverlay nav {
  position: sticky; top: 0; z-index: 100;
  background:rgba(0,0,0,0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255,255,255,0.07);
  padding: 14px 32px;
  display: flex; align-items: center; justify-content: space-between;
}
#landingOverlay .nav-logo { display: flex; align-items: center; gap: 12px; }
#landingOverlay .orb {
  width: 38px; height: 38px; background: rgba(99,102,241,0.15);
  border: 1px solid #6366f1; border-radius: 10px;
  display: flex; align-items: center; justify-content: center; font-size: 18px;
}
#landingOverlay .brand { font-weight: 800; font-size: 15px; color: var(--primary); letter-spacing: 1px; }
#landingOverlay .version { font-size: 10px; color: #7480a0; margin-top: 1px; }
#landingOverlay .btn-launch {
  background: transparent; color: var(--primary); border: 1px solid var(--primary);
  padding: 9px 22px; border-radius: 8px; font-weight: 700; font-size: 13px;
  cursor: pointer; text-decoration: none; transition: all 0.15s;
  letter-spacing: 0.5px;
}
#landingOverlay .btn-launch:hover { background: var(--primary-dim); }

/* Hero */
#landingOverlay .hero {
  text-align: center; padding: 80px 20px 60px; position: relative;
}
#landingOverlay .hero::before {
  content: '';
  position: absolute; top: 0; left: 50%; transform: translateX(-50%);
  width: 600px; height: 500px;
  background: radial-gradient(circle, var(--primary-dim) 0%, transparent 70%);
  pointer-events: none;
}
#landingOverlay .hero-eyebrow {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--primary-dim); border: 1px solid var(--border-hi);
  color: var(--primary); padding: 5px 16px; border-radius: 20px;
  font-size: 11px; font-weight: 700; letter-spacing: 1.5px;
  text-transform: uppercase; margin-bottom: 24px;
}
#landingOverlay .eyebrow-dot {
  width: 6px; height: 6px; border-radius: 50%; background: #22d3ee;
  animation: pulse-dot 2s ease-in-out infinite;
}
#landingOverlay h1.hero-title {
  font-size: clamp(28px, 5.5vw, 60px); font-weight: 900;
  line-height: 1.08; color: #f0f4ff; letter-spacing: -1px;
  margin-bottom: 20px;
}
#landingOverlay h1.hero-title span { color: var(--primary); }
#landingOverlay .hero-sub {
  font-size: clamp(14px, 1.8vw, 17px); color: #7480a0;
  max-width: 600px; margin: 0 auto 36px; line-height: 1.75;
}
#landingOverlay .cta-group {
  display: flex; gap: 12px; justify-content: center;
  flex-wrap: wrap; margin-bottom: 60px;
}
#landingOverlay .cta-primary {
  background: var(--primary); color: #fff; border: 1px solid #6366f1;
  padding: 14px 36px; border-radius: 10px; font-weight: 700; font-size: 14px;
  cursor: pointer; text-decoration: none; transition: opacity 0.15s, transform 0.15s;
  display: inline-flex; align-items: center; gap: 8px;
}
#landingOverlay .cta-primary:hover { opacity: 0.88; transform: translateY(-2px); }
#landingOverlay .cta-secondary {
  background: transparent; color: #c9d1e0; border: 1px solid rgba(255,255,255,0.12);
  padding: 14px 28px; border-radius: 10px; font-weight: 600; font-size: 14px;
  cursor: pointer; text-decoration: none; transition: all 0.15s;
  display: inline-flex; align-items: center; gap: 8px;
}
#landingOverlay .cta-secondary:hover { border-color: rgba(255,255,255,0.25); color: #f0f4ff; }

/* Stats bar */
#landingOverlay .stats-bar {
  display: flex; justify-content: center; flex-wrap: wrap;
  gap: 32px; padding: 24px 32px;
  background: rgba(255,255,255,0.03);
  border-top: 1px solid rgba(255,255,255,0.07);
  border-bottom: 1px solid rgba(255,255,255,0.07);
}
#landingOverlay .stat-item { text-align: center; }
#landingOverlay .num {
  display: block; font-size: 24px; font-weight: 800;
  color: #6366f1; margin-bottom: 2px;
}
#landingOverlay .lbl {
  display: block; font-size: 11px; font-weight: 600;
  color: #7480a0; text-transform: uppercase; letter-spacing: 1px;
}

/* Features */
#landingOverlay .features-section {
  max-width: 1140px; margin: 0 auto; padding: 70px 24px;
}
#landingOverlay .section-label {
  text-align: center; font-size: 11px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 2px; color: #7480a0; margin-bottom: 10px;
}
#landingOverlay .section-title {
  text-align: center; font-size: clamp(20px, 2.8vw, 28px);
  font-weight: 800; color: #f0f4ff; letter-spacing: -0.5px; margin-bottom: 44px;
}
#landingOverlay .section-title span { color: var(--primary); }
#landingOverlay .features-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(270px, 1fr)); gap: 16px;
}
#landingOverlay .feature-card {
  background: var(--card); border: 1px solid rgba(255,255,255,0.07);
  border-radius: 14px; padding: 22px; transition: all 0.2s; position: relative;
}
#landingOverlay .feature-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, var(--primary), var(--accent));
  border-radius: 14px 14px 0 0; opacity: 0; transition: opacity 0.2s;
}
#landingOverlay .feature-card:hover { border-color: rgba(99,102,241,0.3); transform: translateY(-3px); }
#landingOverlay .feature-card:hover::before { opacity: 1; }
#landingOverlay .feature-icon { font-size: 26px; margin-bottom: 10px; display: block; }
#landingOverlay .feature-name { font-weight: 700; font-size: 13px; color: var(--primary); margin-bottom: 6px; }
#landingOverlay .feature-desc { font-size: 13px; color: #7480a0; line-height: 1.65; }
#landingOverlay .new-badge {
  display: inline-block; background: var(--secondary-dim); border: 1px solid var(--secondary);
  color: var(--secondary); font-size: 9px; font-weight: 700; padding: 2px 7px;
  border-radius: 10px; letter-spacing: 1px; text-transform: uppercase; margin-left: 6px;
}

/* Footer */
#landingOverlay footer {
  text-align: center; padding: 28px 20px;
  border-top: 1px solid rgba(255,255,255,0.07);
  font-size: 12px; color: #7480a0; letter-spacing: 0.5px;
  background: rgba(255,255,255,0.02);
}
#landingOverlay footer span { color: var(--primary); }
#landingOverlay footer a { color: #7480a0; text-decoration: none; }
#landingOverlay footer a:hover { color: var(--primary); }

@media (max-width: 640px) {
  #landingOverlay nav { padding: 12px 16px; }
  #landingOverlay .hero { padding: 50px 16px 40px; }
  #landingOverlay .features-section { padding: 40px 16px; }
  #landingOverlay .stats-bar { gap: 20px; padding: 18px 16px; }
}


/* ═══ VIEW MODE — data-viewmode on <html> ═══ */
[data-viewmode="mobile"] .container { max-width: 480px !important; padding: 8px !important; }
[data-viewmode="mobile"] .tabcontent { padding: 12px !important; }
[data-viewmode="mobile"] .input-grid { grid-template-columns: 1fr !important; }
[data-viewmode="mobile"] .tab-container { display: none !important; }
[data-viewmode="mobile"] #mobMenuBtn { display: flex !important; }
[data-viewmode="mobile"] .score-val { font-size: 3rem !important; }
[data-viewmode="mobile"] .target-grid { grid-template-columns: 1fr !important; }
[data-viewmode="mobile"] .header-area h1 { font-size: 1rem; }
/* Desktop toggle button in header */
#viewModeToggle {
  position: fixed; bottom: 18px; right: 18px; z-index: 800;
  background: var(--card); border: 1px solid var(--border-hi);
  border-radius: 50px; padding: 8px 16px; cursor: pointer;
  font-size: 12px; font-weight: 600; color: var(--text-dim);
  box-shadow: 0 4px 16px rgba(0,0,0,0.3); transition: 0.15s;
  display: flex; align-items: center; gap: 6px;
}
#viewModeToggle:hover { color: var(--primary); border-color: var(--primary); }


/* ── ACCESSIBILITY ── */
button:focus-visible, a:focus-visible, input:focus-visible, select:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}
.btn-primary:focus-visible, .btn-secondary:focus-visible, .btn-accent:focus-visible {
  box-shadow: 0 0 0 3px var(--primary-dim);
}

/* Phase bands cleanup */
#scorePhaseBands { font-size: 0.8rem; }
#scorePhaseBands > div { user-select: none; }

/* ── FOCUS STATES ── */
input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px var(--primary-dim);
  background: var(--bg3, var(--bg2));
}


/* ═══════════════════════════════════
   THEME: TERMINAL — Green-on-black hacker aesthetic
═══════════════════════════════════ */
[data-theme="terminal"] {
  --bg:#000000;--bg2:#050f05;--bg3:#0a1a0a;
  --card:#0d1f0d;--card2:#122612;
  --border:rgba(0,255,65,0.15);--border-hi:rgba(0,255,65,0.3);
  --primary:#00ff41;--primary-dim:rgba(0,255,65,0.12);
  --secondary:#39ff14;--secondary-dim:rgba(57,255,20,0.1);
  --accent:#00e5ff;--accent-dim:rgba(0,229,255,0.1);
  --success:#00ff41;--success-dim:rgba(0,255,65,0.12);
  --warning:#ffff00;--warning-dim:rgba(255,255,0,0.1);
  --danger:#ff0040;--danger-dim:rgba(255,0,64,0.12);
  --tiktok:#00ff41;--ig:#39ff14;
  --text:#00ff41;--text-dim:#009921;--text-muted:#005c14;--text-bright:#ccffcc;
}
[data-theme="terminal"] body { font-family: 'Courier New', Courier, monospace !important; }
[data-theme="terminal"] h1, [data-theme="terminal"] h2, [data-theme="terminal"] h3 { letter-spacing: 2px; text-transform: uppercase; }
[data-theme="terminal"] .control-card { border-radius: 2px !important; }
[data-theme="terminal"] .score-display { border-radius: 2px !important; }
[data-theme="terminal"] .tab-btn { border-radius: 2px !important; font-family: 'Courier New', monospace !important; }
[data-theme="terminal"] .btn-primary, [data-theme="terminal"] .btn-secondary { border-radius: 2px !important; }
[data-theme="terminal"] input, [data-theme="terminal"] select, [data-theme="terminal"] textarea { border-radius: 2px !important; }
[data-theme="terminal"] .score-val { text-shadow: 0 0 20px rgba(0,255,65,0.8) !important; }
[data-theme="terminal"] h2::before { content: "> "; color: #00ff41; }
[data-theme="terminal"] .header-area { border-bottom: 1px solid #00ff41; }
[data-theme="terminal"] .container { box-shadow: none; }

/* ═══════════════════════════════════
   THEME: SAKURA — Soft Japanese cherry blossom
═══════════════════════════════════ */
[data-theme="sakura"] {
  --bg:#fdf2f5;--bg2:#fff5f7;--bg3:#ffffff;
  --card:#ffffff;--card2:#fce4ec;
  --border:rgba(236,64,122,0.12);--border-hi:rgba(236,64,122,0.25);
  --primary:#e91e8c;--primary-dim:rgba(233,30,140,0.1);
  --secondary:#9c27b0;--secondary-dim:rgba(156,39,176,0.1);
  --accent:#ff5722;--accent-dim:rgba(255,87,34,0.1);
  --success:#43a047;--success-dim:rgba(67,160,71,0.1);
  --warning:#f57c00;--warning-dim:rgba(245,124,0,0.1);
  --danger:#d32f2f;--danger-dim:rgba(211,47,47,0.1);
  --tiktok:#e91e8c;--ig:#9c27b0;
  --text:#4a1942;--text-dim:#9c6b96;--text-muted:#d4a8cf;--text-bright:#2d0f2a;
}
[data-theme="sakura"] .header-area { background: linear-gradient(135deg, #fce4ec, #f8bbd0) !important; border-bottom: 2px solid rgba(233,30,140,0.2); }
[data-theme="sakura"] .header-area h1 { color: #880e4f !important; }
[data-theme="sakura"] .control-card { border-radius: 16px !important; box-shadow: 0 2px 16px rgba(233,30,140,0.08); }
[data-theme="sakura"] .control-card.highlight { background: linear-gradient(135deg, #fff0f4, #fce4ec) !important; }
[data-theme="sakura"] .tab-btn { border-radius: 20px !important; }
[data-theme="sakura"] .btn-primary { border-radius: 20px !important; }
[data-theme="sakura"] .score-display { border-radius: 20px !important; background: linear-gradient(135deg, #fff0f4, #fce4ec) !important; }
[data-theme="sakura"] .tabcontent { background: var(--bg) !important; border: 1.5px solid rgba(233,30,140,0.1) !important; }

/* ═══════════════════════════════════
   THEME: OBSIDIAN — Ultra minimal black & gold luxury
═══════════════════════════════════ */
[data-theme="obsidian"] {
  --bg:#080808;--bg2:#0e0e0e;--bg3:#141414;
  --card:#111111;--card2:#181818;
  --border:rgba(212,175,55,0.15);--border-hi:rgba(212,175,55,0.3);
  --primary:#d4af37;--primary-dim:rgba(212,175,55,0.1);
  --secondary:#c0a020;--secondary-dim:rgba(192,160,32,0.1);
  --accent:#e8c84a;--accent-dim:rgba(232,200,74,0.1);
  --success:#4caf50;--success-dim:rgba(76,175,80,0.1);
  --warning:#ff9800;--warning-dim:rgba(255,152,0,0.1);
  --danger:#e53935;--danger-dim:rgba(229,57,53,0.1);
  --tiktok:#d4af37;--ig:#c0a020;
  --text:#d4c89a;--text-dim:#8a7a50;--text-muted:#3a3020;--text-bright:#f5e6a3;
}
[data-theme="obsidian"] body { letter-spacing: 0.3px; }
[data-theme="obsidian"] .control-card { border-left: 1px solid rgba(212,175,55,0.2) !important; border-top: 1px solid rgba(212,175,55,0.08) !important; }
[data-theme="obsidian"] .control-card.highlight { background: linear-gradient(135deg, #111, #151008) !important; border: 1px solid rgba(212,175,55,0.25) !important; }
[data-theme="obsidian"] h2 { color: #d4af37 !important; font-weight: 800; letter-spacing: 1px; }
[data-theme="obsidian"] h3 { color: #c0a020 !important; letter-spacing: 0.5px; }
[data-theme="obsidian"] .score-val { color: #d4af37 !important; text-shadow: 0 0 30px rgba(212,175,55,0.4) !important; }
[data-theme="obsidian"] .tab-btn { border-radius: 0 !important; border: none !important; border-bottom: 2px solid transparent !important; }
[data-theme="obsidian"] .tab-btn.active { border-bottom-color: #d4af37 !important; color: #d4af37 !important; }
[data-theme="obsidian"] .header-area { border-bottom: 1px solid rgba(212,175,55,0.2); }
[data-theme="obsidian"] .header-area h1 span { color: #d4af37 !important; }

/* ═══════════════════════════════════
   THEME: CANDY — Bright pastel fun / Gen-Z
═══════════════════════════════════ */
[data-theme="candy"] {
  --bg:#fff1f9;--bg2:#fff6fb;--bg3:#ffffff;
  --card:#ffffff;--card2:#fce7f6;
  --border:rgba(168,85,247,0.15);--border-hi:rgba(168,85,247,0.3);
  --primary:#a855f7;--primary-dim:rgba(168,85,247,0.12);
  --secondary:#06b6d4;--secondary-dim:rgba(6,182,212,0.12);
  --accent:#f97316;--accent-dim:rgba(249,115,22,0.12);
  --success:#22c55e;--success-dim:rgba(34,197,94,0.12);
  --warning:#eab308;--warning-dim:rgba(234,179,8,0.12);
  --danger:#ef4444;--danger-dim:rgba(239,68,68,0.12);
  --tiktok:#06b6d4;--ig:#a855f7;
  --text:#4c1d95;--text-dim:#7c3aed;--text-muted:#c4b5fd;--text-bright:#2e1065;
}
[data-theme="candy"] .control-card { border-radius: 20px !important; border: 2px solid transparent !important; background-clip: padding-box; }
[data-theme="candy"] .control-card.highlight { background: linear-gradient(135deg, #fdf4ff, #f0fdf4) !important; border: 2px solid rgba(168,85,247,0.2) !important; }
[data-theme="candy"] .control-card.success { background: linear-gradient(135deg, #f0fdfa, #ecfdf5) !important; }
[data-theme="candy"] .tab-btn { border-radius: 999px !important; font-weight: 700 !important; }
[data-theme="candy"] .btn-primary { border-radius: 999px !important; }
[data-theme="candy"] .score-display { border-radius: 24px !important; background: linear-gradient(135deg, #fdf4ff, #eff6ff) !important; }
[data-theme="candy"] h2 { background: linear-gradient(135deg, #a855f7, #06b6d4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
[data-theme="candy"] .header-area { background: linear-gradient(135deg, #fdf4ff, #eff6ff, #fff0fb) !important; border-bottom: none; box-shadow: 0 2px 20px rgba(168,85,247,0.1); }
[data-theme="candy"] .tabcontent { border-radius: 20px !important; }

/* ═══════════════════════════════════
   THEME: STEALTH — Dark military/brutalist
═══════════════════════════════════ */
[data-theme="stealth"] {
  --bg:#0a0a0a;--bg2:#111111;--bg3:#161616;
  --card:#141414;--card2:#1a1a1a;
  --border:rgba(255,255,255,0.06);--border-hi:rgba(255,255,255,0.1);
  --primary:#ffffff;--primary-dim:rgba(255,255,255,0.08);
  --secondary:#d4d4d4;--secondary-dim:rgba(212,212,212,0.08);
  --accent:#ff3b3b;--accent-dim:rgba(255,59,59,0.1);
  --success:#aaaaaa;--success-dim:rgba(170,170,170,0.08);
  --warning:#ff3b3b;--warning-dim:rgba(255,59,59,0.1);
  --danger:#ff3b3b;--danger-dim:rgba(255,59,59,0.1);
  --tiktok:#ffffff;--ig:#d4d4d4;
  --text:#cccccc;--text-dim:#666666;--text-muted:#333333;--text-bright:#ffffff;
}
[data-theme="stealth"] body { font-family: 'Helvetica Neue', Arial, sans-serif !important; letter-spacing: 0.5px; }
[data-theme="stealth"] .control-card { border-radius: 0 !important; border: none !important; border-top: 1px solid rgba(255,255,255,0.06) !important; border-left: 3px solid #333 !important; }
[data-theme="stealth"] .control-card.highlight { border-left-color: #fff !important; }
[data-theme="stealth"] .control-card.success  { border-left-color: #aaa !important; }
[data-theme="stealth"] .tab-btn { border-radius: 0 !important; border: none !important; border-bottom: 2px solid transparent !important; text-transform: uppercase !important; letter-spacing: 1px !important; font-size: 11px !important; }
[data-theme="stealth"] .tab-btn.active { border-bottom-color: #fff !important; color: #fff !important; }
[data-theme="stealth"] .tabcontent { border-radius: 0 !important; border: none !important; border-top: 2px solid rgba(255,255,255,0.08) !important; }
[data-theme="stealth"] h2 { text-transform: uppercase; letter-spacing: 3px; font-weight: 900; color: #fff !important; }
[data-theme="stealth"] h3 { text-transform: uppercase; letter-spacing: 2px; font-size: 11px !important; color: #999 !important; }
[data-theme="stealth"] .score-val { color: #fff !important; letter-spacing: -2px; }
[data-theme="stealth"] .btn-primary { border-radius: 0 !important; background: #fff !important; color: #000 !important; text-transform: uppercase; letter-spacing: 1px; font-size: 11px !important; }
[data-theme="stealth"] .header-area { border-bottom: 2px solid rgba(255,255,255,0.1); }
[data-theme="stealth"] .header-area h1 { color: #fff !important; letter-spacing: 4px; }
[data-theme="stealth"] .header-area h1 span { color: #ff3b3b !important; }
[data-theme="stealth"] .score-display { border-radius: 0 !important; border: 1px solid rgba(255,255,255,0.1) !important; }

[data-font="raleway"] * { font-family: 'Raleway', sans-serif !important; }
[data-font="josefin"] * { font-family: 'Josefin Sans', sans-serif !important; }
[data-font="playfair"] * { font-family: 'Playfair Display', serif !important; }
[data-font="bebas"] * { font-family: 'Bebas Neue', sans-serif !important; letter-spacing: 1px !important; }
[data-font="exo"] * { font-family: 'Exo 2', sans-serif !important; }

[data-font="raleway"]  * { font-family: 'Raleway', sans-serif !important; }
[data-font="josefin"]  * { font-family: 'Josefin Sans', sans-serif !important; }
[data-font="playfair"] * { font-family: 'Playfair Display', serif !important; }
[data-font="bebas"]    * { font-family: 'Bebas Neue', sans-serif !important; letter-spacing: 1px !important; }
[data-font="exo"]      * { font-family: 'Exo 2', sans-serif !important; }

/* ── Section Visibility Panel ── */
.sv-hidden { display: none !important; }
#svPanel {
  display:none; position:fixed; top:0; right:0; bottom:0;
  width:300px; max-width:90vw;
  background:var(--card); border-left:1px solid var(--border-hi);
  z-index:9998; overflow-y:auto;
  box-shadow:-8px 0 32px rgba(0,0,0,0.5);
  transition:transform 0.22s cubic-bezier(.4,0,.2,1);
  transform:translateX(100%);
}
#svPanel.open { display:block; transform:translateX(0); }
#svOverlay { display:none; position:fixed; inset:0; z-index:9997; background:rgba(0,0,0,0.35); }
#svOverlay.open { display:block; }
.sv-toggle-btn {
  position:fixed; bottom:80px; right:16px; z-index:9996;
  background:var(--card); border:1px solid var(--border-hi);
  color:var(--text-dim); border-radius:50%; width:38px; height:38px;
  display:flex; align-items:center; justify-content:center;
  cursor:pointer; font-size:16px;
  box-shadow:0 2px 12px rgba(0,0,0,0.3);
  transition:background 0.15s, color 0.15s;
}
.sv-toggle-btn:hover { background:var(--primary-dim); color:var(--primary); border-color:var(--primary); }
.-hidden { display:none !important; }
.sv-item { display:flex; align-items:center; justify-content:space-between; padding:8px 12px; border-bottom:1px solid var(--border); cursor:pointer; gap:8px; }
.sv-item:hover { background:var(--card2); }
.sv-item label { font-size:12px; color:var(--text); cursor:pointer; flex:1; line-height:1.4; }
.sv-item input[type=checkbox] { width:15px; height:15px; accent-color:var(--primary); cursor:pointer; flex-shrink:0; }
.sv-tab-header { padding:8px 12px 4px; font-size:10px; font-weight:700; color:var(--text-muted); text-transform:uppercase; letter-spacing:1px; background:var(--bg); border-bottom:1px solid var(--border); }
