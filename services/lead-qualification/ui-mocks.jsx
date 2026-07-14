/* Falaq — UI Mocks & Camera/Cursor helpers.
 * Registers on window: C, F, Camera, Cursor, ClickRipple, AgentOrb,
 *   PhoneFrame, MacWindow, WhatsAppMobile, WhatsAppWeb, CrmDashboard,
 *   CalendarView, HotLeadsDashboard, useCursorPath, useCameraPath.
 * Requires animations.jsx globals: React, Easing, interpolate, useSprite, useTime.
 */

const { useRef: _useRef, useMemo: _useMemo } = React;

// ── Tokens (Falaq — dawn palette) ─────────────────────────────────────────
const C = {
  bg:       '#0A0F1E',
  bgSoft:   '#0F1528',
  ink:      '#F6F4EF',
  inkDim:   '#B8BDCC',
  mute:     '#6E7488',
  muteDim:  '#3E4560',
  line:     '#242C46',
  lineHi:   '#33406A',
  card:     '#131A2E',
  cardHi:   '#1B2340',
  cardLo:   '#0C1224',
  gold:     '#E6B563',
  goldBrite:'#F4CE85',
  goldDim:  '#8A6A3D',
  hot:      '#F27260',
  warm:     '#E6B563',
  ok:       '#5FD3A7',
  info:     '#78A9F5',
  waGreen:  '#25D366',
  waBg:     '#0B141A',
  waPanel:  '#111B21',
  waPanel2: '#202C33',
  waIn:     '#202C33',
  waOut:    '#005C4B',
  waText:   '#E9EDEF',
  waMute:   '#8696A0',
};

const F = {
  ar: "'Tajawal', system-ui, sans-serif",
  en: "'Manrope', system-ui, sans-serif",
  mono: "'JetBrains Mono', ui-monospace, monospace",
  serif: "'Instrument Serif', Georgia, serif",
};

window.C = C;
window.F = F;

// ── Camera & Cursor helpers ───────────────────────────────────────────────

// Interpolate keyframes [{t,x,y,...}]. Returns lerped values at time t.
function interpKeys(keys, t, ease = Easing.easeInOutCubic, fields = ['x', 'y', 'zoom']) {
  if (!keys.length) return {};
  let prev = keys[0], next = keys[0];
  for (let i = 0; i < keys.length; i++) {
    if (keys[i].t <= t) prev = keys[i];
    if (keys[i].t > t) { next = keys[i]; break; }
    if (i === keys.length - 1) next = keys[i];
  }
  const dt = Math.max(0.0001, next.t - prev.t);
  const p = Math.max(0, Math.min(1, (t - prev.t) / dt));
  const e = ease(p);
  const out = {};
  fields.forEach(f => {
    if (prev[f] == null && next[f] == null) return;
    const a = prev[f] ?? next[f], b = next[f] ?? prev[f];
    out[f] = a + (b - a) * e;
  });
  return out;
}
window.interpKeys = interpKeys;

// ── PersonAvatar — near-realistic placeholder headshot (no letters/icons) ─
// Locally-rendered soft-portrait images (embed reliably; no external hotlinks).
function PersonAvatar({ size = 46, seed = 0 }) {
  const idx = seed % 8;
  const url = `avatars/portrait-${idx}.png`;
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', flexShrink: 0,
      overflow: 'hidden', background: C.muteDim,
    }}>
      <img src={url} width={size} height={size}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
    </div>
  );
}
window.PersonAvatar = PersonAvatar;

// ── BrandMark — Falaq agent icon (uploaded logo mark, gold, glowing) ─────
function BrandMark({ size = 40 }) {
  const imgSize = size * 1.3;
  return (
    <div style={{
      width: size, height: size, flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <img src="assets/agent-logo-gold.png" alt="Falaq agent"
        width={imgSize} height={imgSize}
        style={{
          width: imgSize, height: imgSize, objectFit: 'contain',
          filter: `drop-shadow(0 0 ${size*0.06}px rgba(244,206,133,0.85)) drop-shadow(0 0 ${size*0.16}px rgba(230,181,99,0.6)) drop-shadow(0 0 ${size*0.32}px rgba(230,181,99,0.35))`,
        }} />
    </div>
  );
}
window.BrandMark = BrandMark;

// Camera — pans/zooms so world-point (x,y) is at stage center (960,540) at scale zoom.
function Camera({ keys, localTime, children, width = 1920, height = 1080 }) {
  const { x = 960, y = 540, zoom = 1 } = interpKeys(keys, localTime);
  return (
    <div style={{
      position: 'absolute', inset: 0, overflow: 'hidden',
      background: C.bg,
    }}>
      <div style={{
        position: 'absolute', width, height,
        transform: `translate(${width/2}px, ${height/2}px) scale(${zoom}) translate(${-x}px, ${-y}px)`,
        transformOrigin: '0 0',
        transition: 'none',
      }}>
        {children}
      </div>
    </div>
  );
}
window.Camera = Camera;

// Cursor — arrow that follows keyframes with damped-cubic interpolation.
// keys: [{t,x,y,click?}]. Click ripples appear at each click keyframe.
function Cursor({ keys, localTime, camZoom = 1 }) {
  if (!keys || !keys.length) return null;
  const { x = 0, y = 0 } = interpKeys(keys, localTime);
  const clicks = keys.filter(k => k.click);
  return (
    <>
      {clicks.map((k, i) => {
        const dt = localTime - k.t;
        if (dt < 0 || dt > 0.6) return null;
        const p = dt / 0.6;
        const scale = 0.4 + p * 2.6;
        const opacity = (1 - p) * 0.9;
        return (
          <div key={i} style={{
            position: 'absolute', left: k.x, top: k.y,
            width: 40, height: 40, borderRadius: '50%',
            border: `2px solid ${C.goldBrite}`,
            transform: `translate(-50%, -50%) scale(${scale})`,
            opacity, pointerEvents: 'none',
          }} />
        );
      })}
      <svg style={{
        position: 'absolute', left: x, top: y,
        width: 26, height: 26, pointerEvents: 'none',
        transform: `translate(-4px, -2px)`,
        filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.5))',
      }} viewBox="0 0 24 24">
        <path d="M4 3 L4 19 L9 15 L12 22 L15 20 L12 13 L18 13 Z"
          fill="#ffffff" stroke="#0A0F1E" strokeWidth="1.4" strokeLinejoin="round"/>
      </svg>
    </>
  );
}
window.Cursor = Cursor;

// ── AgentOrb — Falaq agent identity (uploaded logo mark, gold, glowing) ──
const AGENT_PURPLE = '#5B4FE8';
const AGENT_PURPLE_BRITE = '#8B7CFF';
function AgentOrb({ size = 200, t = 0, active = true }) {
  const pulse = active ? 1 + Math.sin(t * 3.2) * 0.04 : 1;
  const g = active ? 0.75 + Math.sin(t * 2.4) * 0.2 : 0.55;
  const imgSize = size * 1.3;
  return (
    <div style={{
      position: 'relative', width: size, height: size,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <img src="assets/agent-logo-gold.png" alt="Falaq agent"
        width={imgSize} height={imgSize}
        style={{
          width: imgSize, height: imgSize, objectFit: 'contain',
          transform: `scale(${pulse})`,
          filter: `drop-shadow(0 0 ${size*0.05}px rgba(244,206,133,${g})) drop-shadow(0 0 ${size*0.12}px rgba(230,181,99,${g*0.85})) drop-shadow(0 0 ${size*0.26}px rgba(230,181,99,${g*0.6})) drop-shadow(0 0 ${size*0.45}px rgba(230,181,99,${g*0.35}))`,
        }} />
    </div>
  );
}
window.AgentOrb = AgentOrb;
window.AGENT_PURPLE = AGENT_PURPLE;
window.AGENT_PURPLE_BRITE = AGENT_PURPLE_BRITE;

// ── PhoneFrame ────────────────────────────────────────────────────────────
function PhoneFrame({ width = 380, height = 800, children, style }) {
  const bezel = 12;
  return (
    <div style={{
      position: 'relative', width, height,
      background: '#0A0A0C', borderRadius: 48,
      padding: bezel, boxSizing: 'border-box',
      boxShadow: `0 40px 80px rgba(0,0,0,0.6), 0 0 0 1.5px #2A2A32, inset 0 0 0 1px #1a1a20`,
      ...style,
    }}>
      {/* screen */}
      <div style={{
        width: '100%', height: '100%', borderRadius: 36,
        overflow: 'hidden', position: 'relative', background: '#000',
      }}>
        {/* notch */}
        <div style={{
          position: 'absolute', top: 10, left: '50%',
          transform: 'translateX(-50%)', width: 100, height: 24,
          background: '#0A0A0C', borderRadius: 14, zIndex: 20,
        }} />
        {children}
      </div>
    </div>
  );
}
window.PhoneFrame = PhoneFrame;

// ── MacWindow ─────────────────────────────────────────────────────────────
function MacWindow({ width = 1720, height = 960, title = '', children, style }) {
  return (
    <div style={{
      position: 'relative', width, height,
      background: '#0A0F1E', borderRadius: 14,
      boxShadow: '0 40px 120px rgba(0,0,0,0.6), 0 0 0 1px #2A3350',
      overflow: 'hidden', ...style,
    }}>
      <div style={{
        height: 40, background: '#0F1528',
        borderBottom: `1px solid ${C.line}`,
        display: 'flex', alignItems: 'center', padding: '0 16px', gap: 16,
      }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {['#FF5F57', '#FEBC2E', '#28C840'].map(c => (
            <div key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />
          ))}
        </div>
        <div style={{ flex: 1, textAlign: 'center', font: `500 13px ${F.en}`, color: C.mute }}>{title}</div>
        <div style={{ width: 60 }} />
      </div>
      <div style={{ width: '100%', height: 'calc(100% - 40px)', position: 'relative' }}>
        {children}
      </div>
    </div>
  );
}
window.MacWindow = MacWindow;

// ── WhatsAppMobile — phone chat list with 47 unread ───────────────────────
function WhatsAppMobile({ lang, t }) {
  const rtl = lang === 'ar';
  const font = F[lang];
  const chats = lang === 'ar' ? [
    { n: 'رقم غير معروف', p: '+966 55 ***', m: 'السلام عليكم، أبي أستفسر عن الفلل...', u: 3, time: '3:47 ص' },
    { n: 'خالد المطيري', p: '', m: 'ممكن رقم للمعاينة؟', u: 5, time: '3:12 ص' },
    { n: 'رقم غير معروف', p: '+966 50 ***', m: 'الميزانية 800 ألف تقريباً', u: 2, time: '2:41 ص' },
    { n: 'نورة العتيبي', p: '', m: 'متى ترد؟ 🙃', u: 7, time: '1:20 ص' },
    { n: 'موقع الشركة', p: '', m: 'استفسار جديد من نموذج الموقع', u: 4, time: '12:55 ص' },
    { n: 'إعلان ميتا', p: '', m: 'Lead جديد: عبدالله', u: 6, time: '11:32 م' },
    { n: 'رقم غير معروف', p: '+966 53 ***', m: 'هل التوصيل يشمل جدة؟', u: 8, time: '10:14 م' },
  ] : [
    { n: 'Unknown', p: '+966 55 ***', m: 'Hi, I’m asking about the villas...', u: 3, time: '3:47 AM' },
    { n: 'Khaled Al-Mutairi', p: '', m: 'Can I get a viewing number?', u: 5, time: '3:12 AM' },
    { n: 'Unknown', p: '+966 50 ***', m: 'Budget around 800k', u: 2, time: '2:41 AM' },
    { n: 'Noura Al-Otaibi', p: '', m: 'Hello? Anyone there? 🙃', u: 7, time: '1:20 AM' },
    { n: 'Website form', p: '', m: 'New inquiry from site form', u: 4, time: '12:55 AM' },
    { n: 'Meta Ad', p: '', m: 'New lead: Abdullah', u: 6, time: '11:32 PM' },
    { n: 'Unknown', p: '+966 53 ***', m: 'Do you deliver to Jeddah?', u: 8, time: '10:14 PM' },
  ];
  // "New message" bounces in at t=2
  const newMsgAppear = interpolate([2.0, 2.3], [0, 1], Easing.easeOutBack)(t);
  return (
    <div style={{
      width: '100%', height: '100%',
      background: C.waBg, direction: rtl ? 'rtl' : 'ltr',
      color: C.waText, font: `500 15px ${font}`,
      display: 'flex', flexDirection: 'column', paddingTop: 44,
    }}>
      {/* status bar */}
      <div style={{
        position: 'absolute', top: 12, left: 20, right: 20, display: 'flex',
        justifyContent: 'space-between', font: `600 13px ${F.en}`, color: '#fff', zIndex: 30,
      }}>
        <span>3:47</span>
        <span style={{ display:'flex', gap:6, alignItems:'center' }}>
          <span style={{ fontSize:11 }}>●●●●</span>
          <span>􀛨</span>
          <span>􀛩</span>
        </span>
      </div>
      {/* WA header */}
      <div style={{
        background: C.waPanel, padding: '14px 18px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: `1px solid ${C.waPanel2}`,
      }}>
        <div style={{ font: `800 22px ${font}`, color: '#fff' }}>WhatsApp</div>
        <div style={{ display: 'flex', gap: 20, color: C.waMute, fontSize: 20 }}>
          <span>⌕</span><span>⋮</span>
        </div>
      </div>
      {/* chats */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        {chats.map((chat, i) => {
          const isFirst = i === 0;
          const scale = isFirst ? (0.85 + newMsgAppear * 0.15) : 1;
          const highlight = isFirst && newMsgAppear > 0.5;
          return (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '14px 18px',
              borderBottom: `0.5px solid ${C.waPanel2}`,
              transform: `scale(${scale})`,
              background: highlight ? 'rgba(37,211,102,0.06)' : 'transparent',
            }}>
              <PersonAvatar size={46} seed={i} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display:'flex', justifyContent:'space-between', gap: 8 }}>
                  <div style={{ font: `700 15.5px ${font}`, color: '#fff', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{chat.n}</div>
                  <div style={{ font: `500 12px ${F.en}`, color: chat.u ? C.waGreen : C.waMute, direction:'ltr' }}>{chat.time}</div>
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', gap: 8, marginTop: 3 }}>
                  <div style={{ font: `400 13.5px ${font}`, color: C.waMute, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{chat.m}</div>
                  {chat.u > 0 && (
                    <div style={{
                      background: C.waGreen, color: '#0B141A',
                      minWidth: 22, height: 22, borderRadius: 11,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      font: `700 12px ${F.en}`, padding: '0 6px',
                    }}>{chat.u}</div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
window.WhatsAppMobile = WhatsAppMobile;

// ── WhatsAppWeb — desktop chat view with active conversation ──────────────
// Message reveals timed by messagesRevealAt (seconds since scene start).
function WhatsAppWeb({ lang, t, messages, typing = false, replyDraft = '' }) {
  const rtl = lang === 'ar';
  const font = F[lang];
  const headerName = lang === 'ar' ? 'خالد المطيري' : 'Khaled Al-Mutairi';
  const headerSub = lang === 'ar' ? 'متصل الآن' : 'online';
  return (
    <div style={{
      display: 'flex', width: '100%', height: '100%',
      background: C.waBg, direction: rtl ? 'rtl' : 'ltr',
      color: C.waText, font: `500 15px ${font}`,
    }}>
      {/* sidebar */}
      <div style={{
        width: 340, background: C.waPanel,
        borderInlineEnd: `1px solid ${C.waPanel2}`,
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ padding: '18px 16px', borderBottom: `1px solid ${C.waPanel2}` }}>
          <div style={{ font: `800 19px ${font}`, color: '#fff' }}>{rtl ? 'الدردشات' : 'Chats'}</div>
        </div>
        {[headerName, ...(rtl ? ['نورة العتيبي','عبدالله السالم','رقم غير معروف','موقع الشركة'] : ['Noura','Abdullah','Unknown','Website form'])].map((n, i) => (
          <div key={i} style={{
            padding: '12px 16px', borderBottom: `0.5px solid ${C.waPanel2}`,
            display: 'flex', alignItems: 'center', gap: 12,
            background: i === 0 ? 'rgba(255,255,255,0.04)' : 'transparent',
          }}>
            <PersonAvatar size={42} seed={i + 10} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ font:`600 14px ${font}`, color:'#fff' }}>{n}</div>
              <div style={{ font:`400 12px ${font}`, color: C.waMute, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{rtl ? 'آخر رسالة...' : 'last message...'}</div>
            </div>
          </div>
        ))}
      </div>
      {/* main pane */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column',
        background: `${C.waBg} url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'><circle cx='20' cy='20' r='1.2' fill='%23ffffff08'/></svg>")`,
      }}>
        {/* chat header */}
        <div style={{ background: C.waPanel, padding: '12px 20px',
          display:'flex', alignItems:'center', gap: 14, borderBottom: `1px solid ${C.waPanel2}` }}>
          <PersonAvatar size={42} seed={2} />
          <div style={{ flex: 1 }}>
            <div style={{ font:`700 16px ${font}`, color:'#fff' }}>{headerName}</div>
            <div style={{ font:`400 12px ${font}`, color: C.ok }}>{headerSub}</div>
          </div>
          <div style={{ display:'flex', gap: 22, color: C.waMute, fontSize: 18 }}>
            <span>⌕</span><span>⋮</span>
          </div>
        </div>
        {/* messages */}
        <div style={{ flex: 1, overflow: 'hidden', padding: '20px 60px', display: 'flex', flexDirection: 'column', gap: 8, justifyContent: 'flex-end' }}>
          {messages.map((m, i) => {
            const p = interpolate([m.at, m.at + 0.35], [0, 1], Easing.easeOutBack)(t);
            if (p <= 0) return null;
            const yOff = (1 - Math.min(1, p)) * 10;
            const isOut = m.from === 'bot';
            const alignSide = isOut
              ? (rtl ? 'flex-start' : 'flex-end')
              : (rtl ? 'flex-end' : 'flex-start');
            return (
              <div key={i} style={{
                alignSelf: alignSide, maxWidth: '68%',
                opacity: Math.min(1, p), transform: `translateY(${yOff}px)`,
                background: isOut ? C.waOut : C.waIn,
                color: '#E9EDEF',
                padding: '8px 12px 6px', borderRadius: 8,
                borderTopLeftRadius: isOut ? 8 : (rtl ? 8 : 2),
                borderTopRightRadius: isOut ? (rtl ? 2 : 8) : 8,
                font: `500 15px/1.4 ${font}`,
                boxShadow: '0 1px 0.5px rgba(0,0,0,0.13)',
                position: 'relative', minWidth: 60,
              }}>
                <div>{m.text}</div>
                <div style={{
                  font: `400 10.5px ${F.en}`, color: isOut ? '#8AC5B8' : C.waMute,
                  textAlign: 'end', marginTop: 2, direction: 'ltr',
                }}>{m.time || '3:47 AM'} {isOut ? '✓✓' : ''}</div>
              </div>
            );
          })}
          {typing && (
            <div style={{ alignSelf: rtl ? 'flex-start' : 'flex-end', background: C.waOut, padding:'10px 14px', borderRadius: 8, display:'flex', gap: 4 }}>
              {[0,1,2].map(i => {
                const p = ((t * 3 + i * 0.3) % 1);
                return <span key={i} style={{ width:6, height:6, borderRadius:'50%', background: '#fff', opacity: 0.3 + Math.abs(0.5 - p) * 1.4 }} />;
              })}
            </div>
          )}
        </div>
        {/* input bar with live draft */}
        <div style={{ background: C.waPanel, padding: '10px 16px', display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ color: C.waMute, fontSize: 22 }}>+</span>
          <div style={{
            flex: 1, background: C.waPanel2, borderRadius: 22,
            padding: '10px 18px', color: replyDraft ? '#E9EDEF' : C.waMute,
            font: `500 14px ${font}`, minHeight: 22,
          }}>{replyDraft || (rtl ? 'اكتب رسالة' : 'Type a message')}<span style={{ opacity: replyDraft ? 0.7 : 0, animation:'', display: replyDraft ? 'inline-block' : 'none' }}>|</span></div>
          <span style={{ color: C.waMute, fontSize: 22 }}>◉</span>
        </div>
      </div>
    </div>
  );
}
window.WhatsAppWeb = WhatsAppWeb;

// ── CRM Dashboard mock ────────────────────────────────────────────────────
function CrmDashboard({ lang, t, highlightNew = 0 }) {
  const rtl = lang === 'ar';
  const font = F[lang];
  const cols = lang === 'ar'
    ? ['العميل', 'المصدر', 'الميزانية', 'الموعد', 'النقاط', 'الحالة']
    : ['Lead', 'Source', 'Budget', 'Timing', 'Score', 'Status'];
  const rows = lang === 'ar' ? [
    { name: 'سارة الحربي', src: 'واتساب', budget: '450K', time: 'شهرين', score: 62, status: 'دافئ', color: C.warm },
    { name: 'محمد الغامدي', src: 'موقع', budget: '1.2M',  time: '3 أشهر', score: 54, status: 'دافئ', color: C.warm },
    { name: 'رقم غير معروف', src: 'إعلان', budget: '—', time: '—', score: 22, status: 'غير مؤهل', color: C.mute },
    { name: 'فهد القحطاني', src: 'واتساب', budget: '900K', time: 'شهر', score: 71, status: 'دافئ', color: C.warm },
  ] : [
    { name: 'Sarah Al-Harbi', src: 'WhatsApp', budget: '450K', time: '2 mo', score: 62, status: 'Warm', color: C.warm },
    { name: 'Mohammed Al-Ghamdi', src: 'Website', budget: '1.2M', time: '3 mo', score: 54, status: 'Warm', color: C.warm },
    { name: 'Unknown', src: 'Meta Ad', budget: '—', time: '—', score: 22, status: 'Unqualified', color: C.mute },
    { name: 'Fahad Al-Qahtani', src: 'WhatsApp', budget: '900K', time: '1 mo', score: 71, status: 'Warm', color: C.warm },
  ];
  const newRow = lang === 'ar'
    ? { name: 'خالد المطيري', src: 'واتساب', budget: '800K', time: 'شهر', score: 87, status: 'ساخن', color: C.hot }
    : { name: 'Khaled Al-Mutairi', src: 'WhatsApp', budget: '800K', time: '1 mo', score: 87, status: 'HOT', color: C.hot };

  return (
    <div style={{
      width: '100%', height: '100%', background: C.bg,
      direction: rtl ? 'rtl' : 'ltr', color: C.ink,
      font: `500 15px ${font}`, padding: '24px 32px', boxSizing: 'border-box',
    }}>
      {/* sub-header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
        <div style={{ width: 6, height: 32, background: C.gold, borderRadius: 3 }} />
        <div>
          <div style={{ font: `800 20px ${font}`, color: C.ink }}>
            {rtl ? 'إدارة العملاء المحتملين' : 'Lead Pipeline'}
          </div>
          <div style={{ font: `500 12px ${font}`, color: C.mute }}>
            {rtl ? 'مباشر · اليوم' : 'Live · Today'}
          </div>
        </div>
        <div style={{ marginInlineStart: 'auto', display: 'flex', gap: 10 }}>
          {(rtl ? ['اليوم','هذا الأسبوع','الشهر'] : ['Today','Week','Month']).map((tag, i) => (
            <div key={i} style={{
              padding: '6px 14px', borderRadius: 8,
              background: i === 0 ? C.cardHi : C.card,
              border: `1px solid ${i === 0 ? C.gold + '55' : C.line}`,
              color: i === 0 ? C.gold : C.inkDim, font: `600 12px ${font}`,
            }}>{tag}</div>
          ))}
        </div>
      </div>

      {/* KPI strip */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
        {[
          { l: rtl?'إجمالي اليوم':'Total today', v: '23', c: C.ink },
          { l: rtl?'ساخن':'Hot', v: '8', c: C.hot },
          { l: rtl?'دافئ':'Warm', v: '11', c: C.warm },
          { l: rtl?'موعد محجوز':'Booked', v: '5', c: C.ok },
        ].map((k, i) => (
          <div key={i} style={{
            flex: 1, padding: '14px 18px', borderRadius: 10,
            background: C.card, border: `1px solid ${C.line}`,
          }}>
            <div style={{ font: `500 11px ${font}`, color: C.mute, letterSpacing: 1 }}>{k.l}</div>
            <div style={{ font: `900 26px ${F.en}`, color: k.c, marginTop: 4 }}>{k.v}</div>
          </div>
        ))}
      </div>

      {/* table */}
      <div style={{
        background: C.card, border: `1px solid ${C.line}`, borderRadius: 12,
        overflow: 'hidden',
      }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '2.2fr 1.4fr 1fr 1fr 0.8fr 1.1fr',
          padding: '12px 18px', background: C.cardLo,
          borderBottom: `1px solid ${C.line}`,
          font: `600 12px ${font}`, color: C.mute, letterSpacing: 1,
          textTransform: rtl ? 'none' : 'uppercase',
        }}>{cols.map(c => <div key={c}>{c}</div>)}</div>
        {/* NEW hot row - appears with highlight */}
        {highlightNew > 0 && (() => {
          const p = Math.min(1, highlightNew);
          const glow = Math.max(0, 1 - Math.max(0, highlightNew - 1) / 2);
          return (
            <div style={{
              display: 'grid', gridTemplateColumns: '2.2fr 1.4fr 1fr 1fr 0.8fr 1.1fr',
              padding: '14px 18px', borderBottom: `1px solid ${C.line}`,
              background: `rgba(242,114,96,${0.15 * glow})`,
              boxShadow: `inset 0 0 0 2px rgba(242,114,96,${0.6 * glow})`,
              transform: `translateY(${(1 - p) * -20}px)`,
              opacity: p, alignItems: 'center',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: C.hot, boxShadow: `0 0 12px ${C.hot}` }} />
                <span style={{ font: `700 14px ${font}`, color: C.ink }}>{newRow.name}</span>
                <span style={{ font: `600 10px ${F.en}`, color: C.hot, background: 'rgba(242,114,96,0.14)', padding: '2px 6px', borderRadius: 4 }}>NEW</span>
              </div>
              <div style={{ color: C.inkDim }}>{newRow.src}</div>
              <div style={{ font: `600 14px ${F.mono}`, color: C.ink, direction: 'ltr' }}>{newRow.budget}</div>
              <div style={{ color: C.inkDim }}>{newRow.time}</div>
              <div style={{ font: `900 16px ${F.mono}`, color: C.gold, direction: 'ltr' }}>{newRow.score}</div>
              <div>
                <span style={{
                  padding: '4px 12px', borderRadius: 6,
                  background: `linear-gradient(135deg, ${C.hot}, #C74A38)`,
                  color: '#fff', font: `800 12px ${font}`, letterSpacing: 1,
                }}>{newRow.status} 🔥</span>
              </div>
            </div>
          );
        })()}
        {/* existing rows */}
        {rows.map((r, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '2.2fr 1.4fr 1fr 1fr 0.8fr 1.1fr',
            padding: '14px 18px', borderBottom: i === rows.length - 1 ? 'none' : `1px solid ${C.line}`,
            alignItems: 'center',
          }}>
            <div style={{ color: C.ink, font: `600 14px ${font}` }}>{r.name}</div>
            <div style={{ color: C.inkDim }}>{r.src}</div>
            <div style={{ font: `600 14px ${F.mono}`, color: C.inkDim, direction: 'ltr' }}>{r.budget}</div>
            <div style={{ color: C.inkDim }}>{r.time}</div>
            <div style={{ font: `700 14px ${F.mono}`, color: C.inkDim, direction: 'ltr' }}>{r.score}</div>
            <div>
              <span style={{
                padding: '3px 10px', borderRadius: 6,
                background: `${r.color}22`, color: r.color,
                font: `600 11px ${font}`, letterSpacing: 1,
              }}>{r.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
window.CrmDashboard = CrmDashboard;

// ── CalendarView — week grid with slot getting booked ─────────────────────
function CalendarView({ lang, t, bookSlot = 0 }) {
  const rtl = lang === 'ar';
  const font = F[lang];
  const days = rtl ? ['السبت','الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس'] : ['MON','TUE','WED','THU','FRI','SAT'];
  const hours = ['9:00','10:00','11:00','12:00','1:00','2:00','3:00','4:00','5:00'];
  const existing = [
    { d: 1, h: 1, l: rtl?'اجتماع فريق':'Team stand-up', c: C.info },
    { d: 2, h: 3, l: rtl?'عرض تقديمي':'Client presentation', c: C.info },
    { d: 3, h: 2, l: rtl?'مكالمة':'Discovery call', c: C.info },
    { d: 4, h: 5, l: rtl?'عرض عقار':'Property tour', c: C.info },
  ];
  return (
    <div style={{
      width: '100%', height: '100%', background: C.bg,
      direction: rtl ? 'rtl' : 'ltr', color: C.ink,
      font: `500 14px ${font}`, padding: '24px 32px', boxSizing: 'border-box',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
        <div style={{ width: 6, height: 32, background: C.gold, borderRadius: 3 }} />
        <div>
          <div style={{ font: `800 20px ${font}`, color: C.ink }}>
            {rtl ? 'تقويم فريق المبيعات' : 'Sales team calendar'}
          </div>
          <div style={{ font: `500 12px ${font}`, color: C.mute, direction: 'ltr' }}>Nov 12 — 17</div>
        </div>
      </div>
      <div style={{
        background: C.card, border: `1px solid ${C.line}`, borderRadius: 12, overflow: 'hidden',
        height: 'calc(100% - 70px)',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '80px repeat(6, 1fr)', borderBottom: `1px solid ${C.line}`, background: C.cardLo }}>
          <div />
          {days.map(d => (
            <div key={d} style={{
              padding: '12px', font: `700 12px ${font}`, color: C.inkDim,
              textAlign: 'center', letterSpacing: 1,
              borderInlineStart: `1px solid ${C.line}`,
            }}>{d}</div>
          ))}
        </div>
        <div style={{ position: 'relative', height: 'calc(100% - 42px)' }}>
          {hours.map((h, i) => (
            <div key={h} style={{
              display: 'grid', gridTemplateColumns: '80px repeat(6, 1fr)',
              borderBottom: i === hours.length - 1 ? 'none' : `1px solid ${C.line}`,
              height: `${100 / hours.length}%`,
            }}>
              <div style={{ padding: '6px 10px', font: `500 11px ${F.mono}`, color: C.mute, direction:'ltr' }}>{h}</div>
              {[0,1,2,3,4,5].map(d => <div key={d} style={{ borderInlineStart: `1px solid ${C.line}` }} />)}
            </div>
          ))}
          {/* existing events */}
          {existing.map((e, i) => (
            <div key={i} style={{
              position:'absolute',
              [rtl ? 'right' : 'left']: `calc(80px + ${(e.d) * (100/6)}% * (100% - 80px) / 100%)`,
              // simpler: use CSS grid overlay via absolute % of remaining after 80px
              // Let's use a wrapper. Actually recompute:
            }} />
          ))}
          {/* Simpler event render using a full absolute layer that mirrors grid */}
          <div style={{ position:'absolute', top: 0, left: 80, right: 0, bottom: 0, display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gridTemplateRows: `repeat(${hours.length},1fr)`, pointerEvents: 'none' }}>
            {existing.map((e, i) => (
              <div key={i} style={{
                gridColumn: e.d + 1, gridRow: e.h + 1,
                margin: 4, padding: '6px 10px', borderRadius: 6,
                background: `${e.c}22`, borderInlineStart: `3px solid ${e.c}`,
                font: `600 12px ${font}`, color: C.inkDim,
              }}>{e.l}</div>
            ))}
            {/* NEW booked slot — appears with pulse */}
            {bookSlot > 0 && (() => {
              const p = Math.min(1, bookSlot);
              const scale = interpolate([0, 0.5], [0.85, 1], Easing.easeOutBack)(bookSlot);
              const glow = Math.max(0, 1 - Math.max(0, bookSlot - 1) / 2);
              return (
                <div style={{
                  gridColumn: 3, gridRow: 5,
                  margin: 4, padding: '8px 12px', borderRadius: 6,
                  background: `linear-gradient(135deg, ${C.hot}, #C74A38)`,
                  boxShadow: `0 0 30px ${C.hot}${Math.floor(glow*99).toString(16).padStart(2,'0')}`,
                  transform: `scale(${scale})`, opacity: p,
                  font: `700 12px ${font}`, color: '#fff',
                }}>
                  <div style={{ font: `800 12px ${font}` }}>{rtl ? 'خالد · معاينة' : 'Khaled · Viewing'}</div>
                  <div style={{ font: `500 10px ${F.en}`, opacity: 0.85, marginTop: 2, direction:'ltr' }}>1:00 – 1:45 PM 🔥</div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}
window.CalendarView = CalendarView;

// ── HotLeadsDashboard — the "after" state ─────────────────────────────────
function HotLeadsDashboard({ lang, t }) {
  const rtl = lang === 'ar';
  const font = F[lang];
  const leads = lang === 'ar' ? [
    { n: 'خالد المطيري', s: 87, m: 'مهتم بفلل شمال الرياض · 800K', act: 'موعد ١:٠٠ م' },
    { n: 'سارة الحربي',   s: 82, m: 'استفسار عن الأقساط · 650K', act: 'اتصال ٢:٣٠ م' },
    { n: 'عبدالله السالم', s: 79, m: 'يريد معاينة نهاية الأسبوع', act: 'واتساب' },
    { n: 'نورة العتيبي',   s: 76, m: 'تحويل رأسمالي · 1.2M', act: 'اتصال ٤:٠٠ م' },
    { n: 'فهد القحطاني',   s: 74, m: 'شقة عائلية · 900K', act: 'موعد غداً' },
    { n: 'ريم الشمري',    s: 72, m: 'استثمار عقاري', act: 'كتالوج' },
    { n: 'ماجد الدوسري',   s: 70, m: 'مقيم بجدة، يريد نقل', act: 'اتصال' },
    { n: 'هند الفهد',     s: 68, m: 'أول عملية شراء · 500K', act: 'مكالمة توجيه' },
  ] : [
    { n: 'Khaled Al-Mutairi', s: 87, m: 'North Riyadh villas · 800K', act: '1:00 PM meeting' },
    { n: 'Sarah Al-Harbi',    s: 82, m: 'Installment inquiry · 650K', act: '2:30 PM call' },
    { n: 'Abdullah Al-Salem',  s: 79, m: 'Wants weekend viewing', act: 'WhatsApp' },
    { n: 'Noura Al-Otaibi',   s: 76, m: 'Capital transfer · 1.2M', act: '4:00 PM call' },
    { n: 'Fahad Al-Qahtani',  s: 74, m: 'Family apartment · 900K', act: 'Tomorrow' },
    { n: 'Reem Al-Shammari',  s: 72, m: 'Real-estate investment', act: 'Catalogue' },
    { n: 'Majed Al-Dossary',  s: 70, m: 'Relocating from Jeddah', act: 'Call' },
    { n: 'Hind Al-Fahd',      s: 68, m: 'First-time buyer · 500K', act: 'Intro call' },
  ];
  return (
    <div style={{
      width: '100%', height: '100%', background: C.bg,
      direction: rtl ? 'rtl' : 'ltr', color: C.ink,
      font: `500 14px ${font}`, padding: '20px 26px', boxSizing: 'border-box',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
        <BrandMark size={26} />
        <div style={{ flex: 1 }}>
          <div style={{ font: `800 18px ${font}`, color: C.ink }}>{rtl ? 'العملاء الساخنون · اليوم' : 'Hot leads · today'}</div>
          <div style={{ font: `500 11px ${font}`, color: C.mute }}>{rtl ? 'تم التأهيل بواسطة فَلَق' : 'qualified by Falaq'}</div>
        </div>
        <div style={{ padding: '6px 12px', borderRadius: 999, background: 'rgba(95,211,167,0.14)', border: `1px solid ${C.ok}55`, color: C.ok, font: `700 12px ${font}` }}>{rtl ? '٨ جاهزون للإغلاق' : '8 ready to close'}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {leads.map((L, i) => {
          const app = interpolate([0.2 + i * 0.08, 0.6 + i * 0.08], [0, 1], Easing.easeOutQuad)(t);
          return (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '2fr 3fr 1.4fr 60px',
              alignItems: 'center', gap: 12,
              padding: '10px 14px', borderRadius: 10,
              background: C.card, border: `1px solid ${C.line}`,
              opacity: app, transform: `translateY(${(1 - app) * 10}px)`,
            }}>
              <div style={{ display:'flex', alignItems:'center', gap: 10 }}>
                <PersonAvatar size={30} seed={i + 20} />
                <div style={{ font: `700 14px ${font}`, color: C.ink }}>{L.n}</div>
              </div>
              <div style={{ font: `500 13px ${font}`, color: C.inkDim }}>{L.m}</div>
              <div style={{ font: `600 12px ${font}`, color: C.gold }}>{L.act}</div>
              <div style={{ font: `900 20px ${F.mono}`, color: C.hot, textAlign: 'end', direction: 'ltr' }}>{L.s}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
window.HotLeadsDashboard = HotLeadsDashboard;
