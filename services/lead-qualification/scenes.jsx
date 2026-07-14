/* Falaq — Lead Qualification · Screen-Studio Product Walkthrough (90s)
 * Depends on animations.jsx globals + ui-mocks.jsx globals.
 * Exposes: window.FalaqScene({ lang })
 */

const { useState: _uS, useEffect: _uE, useRef: _uR } = React;

// ── Timing (seconds) ──────────────────────────────────────────────────────
const T = {
  intro:      [0,   4],
  coldOpen:   [4,  11],
  deskWide:   [11, 19],
  meetFalaq:  [19, 25],
  autoReply:  [25, 36],
  qualify:    [36, 49],
  crmBook:    [49, 60],
  beforeAfter:[60, 70],
  stats:      [70, 80],
  cta:        [80, 86],
  outro:      [86, 90],
};
const DURATION = 90;

// ── Copy per language ─────────────────────────────────────────────────────
const COPY = {
  ar: {
    dir: 'rtl',
    font: F.ar,
    brand: 'فَلَق',
    brandSub: 'للذكاء الاصطناعي',
    productTitle: 'وكيل تأهيل العملاء المحتملين',
    productKicker: 'AI Agent · 01',

    // Cold open overlay
    coldTime: '3:47 ص',
    coldNote: 'رسالة واحدة كافية لضياع صفقة.',

    // Desk wide overlays
    deskUnread: 'رسالة بدون رد',
    deskPlatforms: 'منصات',
    deskAlone: 'شخص واحد لا يستطيع أن يكون في كل مكان',

    // Meet Falaq
    meetKicker: 'الحل',

    // Auto-reply demo
    incomingMsg: 'السلام عليكم، أبي أستفسر عن الفلل شمال الرياض',
    typingDraft: 'وعليكم السلام خالد 👋\nنعم عندنا خيارات ممتازة شمال الرياض...',
    replyBadge: 'رد فوري · فَلَق',

    // Qualification
    qualLabels: {
      score: 'درجة التأهيل',
      classification: 'التصنيف',
      tags: ['الميزانية ✓', 'الموقع ✓', 'الموعد ✓', 'صاحب القرار ✓'],
      badge: 'ساخن',
    },
    qMsgs: [
      { from:'bot',  text:'ما ميزانيتك التقديرية؟' },
      { from:'user', text:'٨٠٠ ألف تقريباً' },
      { from:'bot',  text:'ممتاز. متى تفكر بالشراء؟' },
      { from:'user', text:'خلال شهر إن شاء الله' },
      { from:'bot',  text:'هل أنت صاحب القرار؟' },
      { from:'user', text:'نعم، بمشاركة زوجتي' },
    ],

    // CRM/Booking overlays
    crmToast: 'عميل جديد · تم التسجيل تلقائياً',
    calendarToast: 'حجز موعد · تم الإرسال للمندوب',
    repName: 'ياسر — مندوب مبيعات',

    // Before / After
    baBefore: 'قبل فَلَق',
    baAfter: 'بعد فَلَق',
    baBeforeMain: '٤٧',
    baBeforeSub: 'رسالة بدون رد',
    baAfterMain: '٨',
    baAfterSub: 'صفقات ساخنة جاهزة',

    // Stats
    statsKicker: 'النتيجة',
    stats: [
      { big:'< 3', unit:'ثانية', lbl:'زمن أول رد' },
      { big:'24/7', unit:'',      lbl:'استقبال متواصل' },
      { big:'100%', unit:'',     lbl:'تسجيل تلقائي في CRM' },
    ],

    // CTA
    ctaH: 'اجعل عملاءك يبدأون\nمعك، لا مع منافسيك.',
    ctaBtn: 'تواصل معنا الآن',
    ctaMeta: 'falaq.ai',
  },
  en: {
    dir: 'ltr',
    font: F.en,
    brand: 'FALAQ',
    brandSub: 'AI',
    productTitle: 'The Lead Qualification Agent',
    productKicker: 'AI Agent · 01',

    coldTime: '3:47 AM',
    coldNote: 'One message. One lost deal.',

    deskUnread: 'unread',
    deskPlatforms: 'platforms',
    deskAlone: 'One person can’t be everywhere at once',

    meetKicker: 'The solution',

    incomingMsg: 'Hi, I’m looking at villas in north Riyadh.',
    typingDraft: 'Hi Khaled 👋\nWe do have great options in north Riyadh...',
    replyBadge: 'Instant reply · Falaq',

    qualLabels: {
      score: 'Lead score',
      classification: 'Classification',
      tags: ['Budget ✓', 'Location ✓', 'Timing ✓', 'Decision maker ✓'],
      badge: 'HOT',
    },
    qMsgs: [
      { from:'bot',  text:'What’s your budget?' },
      { from:'user', text:'Around 800K' },
      { from:'bot',  text:'Great. When do you plan to buy?' },
      { from:'user', text:'Within a month' },
      { from:'bot',  text:'Are you the decision-maker?' },
      { from:'user', text:'Yes, with my wife' },
    ],

    crmToast: 'New lead · auto-logged',
    calendarToast: 'Meeting booked · rep notified',
    repName: 'Yasser — Sales rep',

    baBefore: 'Before Falaq',
    baAfter: 'After Falaq',
    baBeforeMain: '47',
    baBeforeSub: 'unread messages',
    baAfterMain: '8',
    baAfterSub: 'hot deals ready to close',

    statsKicker: 'The result',
    stats: [
      { big:'< 3', unit:'sec',  lbl:'First reply time' },
      { big:'24/7', unit:'',     lbl:'Always on' },
      { big:'100%', unit:'',    lbl:'Auto-logged in CRM' },
    ],

    ctaH: 'Win the customer before\nyour competitors do.',
    ctaBtn: 'Get in touch',
    ctaMeta: 'falaq.ai',
  },
};

// ── AudioSprite (hidden mp3 with export attrs) ────────────────────────────
function AudioSprite({ src, start, end }) {
  const t = useTime();
  const { playing } = useTimeline();
  const ref = _uR(null);
  const duration = Math.max(0.1, end - start);
  _uE(() => {
    const a = ref.current; if (!a) return;
    const active = t >= start - 0.05 && t < end;
    if (!active || !playing) { try { a.pause(); } catch(_){} return; }
    const target = Math.max(0, t - start);
    if (Math.abs((a.currentTime || 0) - target) > 0.2) { try { a.currentTime = target; } catch(_){} }
    a.play().catch(() => {});
  }, [t, playing, start, end]);
  return (
    <video ref={ref} src={src} preload="metadata" playsInline
      data-om-exportable-video-play-start={0}
      data-om-exportable-video-play-end={duration}
      data-om-exportable-video-play-speed={1}
      style={{ position:'absolute', left:-9999, top:-9999, width:1, height:1, opacity:0, pointerEvents:'none' }}
      onError={() => {}}
    />
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────
function Kicker({ text, color = C.gold, dir = 'ltr', font, size = 16 }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 12,
      font: `700 ${size}px ${font}`, color, direction: dir,
      letterSpacing: dir === 'rtl' ? 0 : 3,
      textTransform: dir === 'rtl' ? 'none' : 'uppercase',
    }}>
      <span style={{ width: 22, height: 2, background: color, borderRadius: 2 }} />
      {text}
    </div>
  );
}

function CaptionOverlay({ text, dir, font, y = 90 }) {
  return (
    <div style={{
      position: 'absolute', bottom: y, left: 0, right: 0,
      display: 'flex', justifyContent: 'center', pointerEvents: 'none',
    }}>
      <div style={{
        background: 'rgba(10,15,30,0.72)',
        backdropFilter: 'blur(12px)',
        border: `1px solid ${C.line}`,
        borderRadius: 12, padding: '12px 22px',
        color: C.ink, font: `600 22px ${font}`, direction: dir,
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      }}>{text}</div>
    </div>
  );
}

function Toast({ dir, font, color = C.ok, icon = '✓', text, sub, x, y, appear = 1, width = 320 }) {
  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      width, opacity: appear,
      transform: `translateY(${(1 - appear) * -14}px)`,
      background: C.cardHi, border: `1px solid ${color}55`,
      borderRadius: 12, padding: '14px 16px',
      display: 'flex', alignItems: 'center', gap: 14,
      direction: dir, boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${color}22`,
      zIndex: 40,
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: '50%',
        background: color, color: '#0A0F1E',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        font: `900 18px ${font}`,
      }}>{icon}</div>
      <div>
        <div style={{ font: `700 15px ${font}`, color: C.ink }}>{text}</div>
        {sub && <div style={{ font: `500 12px ${font}`, color: C.mute, marginTop: 2 }}>{sub}</div>}
      </div>
    </div>
  );
}

// Chapter / time HUD
function HUD({ lang }) {
  const c = COPY[lang];
  const t = useTime();
  const chapters = [
    { n: c.dir === 'rtl' ? 'الافتتاحية' : 'Cold open',   start: T.coldOpen[0] },
    { n: c.dir === 'rtl' ? 'الحاجة'      : 'The need',    start: T.deskWide[0] },
    { n: c.dir === 'rtl' ? 'دخول فَلَق'  : 'Meet Falaq',   start: T.meetFalaq[0] },
    { n: c.dir === 'rtl' ? 'ديمو ١'      : 'Demo · 1',    start: T.autoReply[0] },
    { n: c.dir === 'rtl' ? 'ديمو ٢'      : 'Demo · 2',    start: T.qualify[0] },
    { n: c.dir === 'rtl' ? 'ديمو ٣'      : 'Demo · 3',    start: T.crmBook[0] },
    { n: c.dir === 'rtl' ? 'قبل / بعد'   : 'Before · After', start: T.beforeAfter[0] },
    { n: c.dir === 'rtl' ? 'النتيجة'    : 'Result',      start: T.stats[0] },
    { n: 'CTA', start: T.cta[0] },
  ];
  let active = chapters[0];
  for (const ch of chapters) if (t >= ch.start) active = ch;
  const p = Math.min(1, Math.max(0, (t - T.coldOpen[0]) / (T.cta[1] - T.coldOpen[0])));
  return (
    <>
      {/* brand top-left */}
      <div style={{
        position:'absolute', top: 30, [c.dir==='rtl' ? 'right' : 'left']: 40,
        display:'flex', alignItems:'center', gap: 10, pointerEvents:'none', zIndex: 100,
      }}>
        <BrandMark size={30} />
        <div style={{ font:`800 16px ${c.font}`, color: C.gold, letterSpacing: c.dir==='rtl'?0:2 }}>
          {c.brand}
          <span style={{ color: C.mute, fontWeight: 400, marginInlineStart: 6, fontSize: 11 }}>{c.brandSub}</span>
        </div>
      </div>
      {/* chapter + progress bottom */}
      <div style={{
        position:'absolute', bottom: 26, left: 40, right: 40, height: 30,
        display:'flex', alignItems:'center', gap: 16, direction: c.dir,
        pointerEvents:'none', zIndex: 100,
      }}>
        <div style={{ font:`600 11px ${F.mono}`, color: C.mute, letterSpacing: 2, minWidth: 100 }}>
          {String(active === chapters[0] ? '' : chapters.indexOf(active)+1).padStart(2,'0')} · {active.n}
        </div>
        <div style={{ flex: 1, height: 2, background: C.line, borderRadius: 2, overflow: 'hidden' }}>
          <div style={{
            width: `${p * 100}%`, height: '100%',
            background: `linear-gradient(90deg, ${C.goldDim}, ${C.gold}, ${C.goldBrite})`,
          }} />
        </div>
        <div style={{ font:`500 11px ${F.mono}`, color: C.mute, direction:'ltr', minWidth: 60, textAlign: c.dir==='rtl'?'left':'right' }}>
          {Math.floor(t).toString().padStart(2,'0')} / {DURATION}
        </div>
      </div>
    </>
  );
}

// ── Scenes ────────────────────────────────────────────────────────────────

// 01 — Intro wordmark (no logo here — logo appears only in the outro)
function IntroScene({ lang }) {
  const { localTime: lt, duration } = useSprite();
  const fade = interpolate([0, 0.4, duration - 0.4, duration], [0, 1, 1, 0])(lt);
  return (
    <div style={{ position:'absolute', inset:0, background: C.bg, overflow:'hidden' }}>
      <div style={{
        position:'absolute', inset:0, display:'flex', flexDirection:'column',
        alignItems:'center', justifyContent:'center', gap: 20, opacity: fade,
      }}>
        <div style={{
          font: lang === 'ar' ? `900 180px ${F.ar}` : `900 160px ${F.en}`,
          background: `linear-gradient(180deg, ${C.goldBrite}, ${C.gold} 50%, ${C.goldDim})`,
          WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
          letterSpacing: lang === 'ar' ? 0 : -4,
        }}>{lang === 'ar' ? 'فَلَق' : 'FALAQ'}</div>
      </div>
    </div>
  );
}

// 02 — Cold open · phone POV
function ColdOpenScene({ lang }) {
  const c = COPY[lang];
  const { localTime: lt, duration } = useSprite();
  const camKeys = [
    { t: 0,   x: 960, y: 540, zoom: 1.05 },
    { t: 1.5, x: 960, y: 540, zoom: 1.15 },
    { t: 4,   x: 960, y: 350, zoom: 1.35 }, // zoom to top chat
    { t: 6.5, x: 960, y: 350, zoom: 1.4 },
    { t: 7,   x: 960, y: 400, zoom: 1.3 },
  ];
  const outFade = interpolate([duration - 0.4, duration], [1, 0])(lt);
  return (
    <div style={{ position:'absolute', inset:0, background: C.bg, opacity: outFade }}>
      <Camera keys={camKeys} localTime={lt}>
        {/* ambient dark room */}
        <div style={{ position:'absolute', inset:0,
          background: `radial-gradient(ellipse 80% 60% at 50% 50%, rgba(230,181,99,0.06) 0%, transparent 60%), ${C.bg}` }} />
        <div style={{ position:'absolute', left: 770, top: 90, width: 380, height: 800 }}>
          <PhoneFrame width={380} height={820}>
            <WhatsAppMobile lang={lang} t={lt} />
          </PhoneFrame>
        </div>
        {/* pulsing notification indicator */}
        {lt >= 2 && lt <= 3 && (
          <div style={{
            position:'absolute', left: 770 + 30, top: 90 + 60,
            width: 320, height: 3,
          }}>
            <div style={{ position:'absolute', inset:0,
              background: C.waGreen, borderRadius: 2,
              opacity: interpolate([2, 2.2, 2.8, 3], [0, 1, 1, 0])(lt),
              boxShadow: `0 0 20px ${C.waGreen}` }}/>
          </div>
        )}
      </Camera>
      {/* timestamp corner */}
      <div style={{
        position:'absolute', top: 100, [c.dir==='rtl' ? 'right' : 'left']: 100,
        opacity: interpolate([0.3, 1], [0, 1])(lt),
      }}>
        <div style={{ font:`500 14px ${F.mono}`, color: C.mute, letterSpacing: 3 }}>KHALED’S PHONE</div>
        <div style={{ font:`900 96px ${F.mono}`, color: C.hot, lineHeight: 1, marginTop: 8, direction:'ltr' }}>{c.coldTime}</div>
        <div style={{ font:`500 18px ${c.font}`, color: C.inkDim, marginTop: 10, maxWidth: 340, direction: c.dir }}>
          {c.coldNote}
        </div>
      </div>
    </div>
  );
}

// 03 — Desk wide (macOS window with WhatsApp Web + CRM)
function DeskWideScene({ lang }) {
  const c = COPY[lang];
  const { localTime: lt, duration } = useSprite();
  const camKeys = [
    { t: 0, x: 960, y: 540, zoom: 0.9 },
    { t: 2, x: 960, y: 540, zoom: 1.0 },
    { t: 5, x: 500, y: 400, zoom: 1.35 }, // zoom into unread count
    { t: 7, x: 500, y: 400, zoom: 1.5 },
  ];
  const outFade = interpolate([duration - 0.5, duration], [1, 0])(lt);
  const emptyMsgs = []; // empty chat list preview
  return (
    <div style={{ position:'absolute', inset:0, background: C.bg, opacity: outFade }}>
      <Camera keys={camKeys} localTime={lt}>
        <div style={{ position:'absolute', left: 100, top: 60, width: 1720, height: 960 }}>
          <MacWindow width={1720} height={960} title="WhatsApp Web · Chats">
            <WhatsAppWeb lang={lang} t={lt} messages={emptyMsgs} />
          </MacWindow>
          {/* 47 unread badge overlay */}
          <div style={{
            position:'absolute', left: 320, top: 145,
            width: 44, height: 44, borderRadius: '50%',
            background: C.hot, color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            font: `900 20px ${F.mono}`, opacity: interpolate([1, 1.6], [0, 1])(lt),
            transform: `scale(${interpolate([1, 1.6], [0.6, 1], Easing.easeOutBack)(lt)})`,
            boxShadow: `0 0 30px ${C.hot}88, 0 0 60px ${C.hot}55`,
            zIndex: 30,
          }}>47</div>
        </div>
      </Camera>
      {/* callout labels floating */}
      <div style={{
        position:'absolute', top: 380, left: 120, direction: c.dir,
        opacity: interpolate([1.5, 2.3], [0, 1])(lt),
      }}>
        <div style={{
          padding: '12px 20px', borderRadius: 10,
          background: 'rgba(242,114,96,0.14)', border: `1px solid ${C.hot}66`,
          font: `800 42px ${F.en}`, color: C.hot, letterSpacing: -1,
          direction: 'ltr', display: 'inline-block',
        }}>47 <span style={{ font: `500 20px ${c.font}`, color: C.ink, marginInlineStart: 8, direction: c.dir }}>{c.deskUnread}</span></div>
      </div>
      <div style={{
        position:'absolute', top: 380, right: 120, direction: c.dir, textAlign: c.dir==='rtl'?'left':'right',
        opacity: interpolate([2.8, 3.6], [0, 1])(lt),
      }}>
        <div style={{
          padding: '12px 20px', borderRadius: 10,
          background: 'rgba(120,169,245,0.10)', border: `1px solid ${C.info}66`,
          font: `800 42px ${F.en}`, color: C.info, display: 'inline-block',
        }}>3 <span style={{ font: `500 20px ${c.font}`, color: C.ink, marginInlineStart: 8 }}>{c.deskPlatforms}</span></div>
      </div>
      <div style={{
        position:'absolute', bottom: 180, left: 0, right: 0,
        opacity: interpolate([4.5, 5.5], [0, 1])(lt),
        textAlign: 'center', direction: c.dir,
      }}>
        <div style={{ font:`700 26px ${c.font}`, color: C.ink, letterSpacing: c.dir==='rtl'?0:-0.5 }}>{c.deskAlone}</div>
      </div>
    </div>
  );
}

// 04 — Meet Falaq · orb materializes
function MeetFalaqScene({ lang }) {
  const c = COPY[lang];
  const { localTime: lt, duration } = useSprite();
  const orbScale = interpolate([0, 1.2], [0, 1], Easing.easeOutBack)(lt);
  const orbY = interpolate([0, 1.2], [60, 0], Easing.easeOutQuad)(lt);
  const titleIn = interpolate([1.0, 2.0], [0, 1], Easing.easeOutQuad)(lt);
  const titleY = interpolate([1.0, 2.0], [24, 0], Easing.easeOutQuad)(lt);
  const kickerIn = interpolate([1.5, 2.2], [0, 1])(lt);
  const outFade = interpolate([duration - 0.5, duration], [1, 0])(lt);
  return (
    <div style={{ position:'absolute', inset: 0,
      background: `radial-gradient(ellipse 60% 80% at 50% 60%, #1B2340 0%, ${C.bg} 60%)`,
      opacity: outFade,
      display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap: 34,
      direction: c.dir,
    }}>
      <div style={{ transform: `translateY(${orbY}px) scale(${orbScale})` }}>
        <AgentOrb size={240} t={lt} active />
      </div>
      <div style={{ opacity: kickerIn }}>
        <Kicker text={c.meetKicker} font={c.font} dir={c.dir} size={16} />
      </div>
      <h1 style={{
        margin: 0, textAlign: 'center', maxWidth: 1200,
        font: `800 ${lang === 'ar' ? 76 : 72}px/1.1 ${c.font}`, color: C.ink,
        opacity: titleIn, transform: `translateY(${titleY}px)`,
        letterSpacing: c.dir === 'rtl' ? 0 : -1.5,
      }}>{c.productTitle}</h1>
      <div style={{ opacity: titleIn, font:`500 15px ${F.mono}`, color: C.mute, letterSpacing: 3 }}>
        {c.productKicker}
      </div>
    </div>
  );
}

// 05 — Auto-reply demo (WhatsApp Web, camera zooms into reply)
function AutoReplyScene({ lang }) {
  const c = COPY[lang];
  const { localTime: lt, duration } = useSprite();
  const messages = [
    { at: 0.3, from: 'user', text: c.incomingMsg, time: c.dir==='rtl' ? '٣:٤٧ ص' : '3:47 AM' },
  ];
  // Cursor moves briefly then camera follows Falaq typing (no cursor click — it's automatic)
  const cursorKeys = [
    { t: 0,   x: 400, y: 400 },
    { t: 1.5, x: 800, y: 500 },
  ];
  const camKeys = [
    { t: 0,   x: 960, y: 540, zoom: 0.95 },
    { t: 2,   x: 960, y: 540, zoom: 1.0 },
    { t: 3.5, x: 1150, y: 850, zoom: 1.35 }, // zoom to input bar
    { t: 8,   x: 1150, y: 850, zoom: 1.4 },
    { t: 9.5, x: 960, y: 540, zoom: 1.05 },
  ];
  // Live typing draft — reveal char by char
  const typeStart = 4.5;
  const chars = c.typingDraft;
  const charsShown = Math.max(0, Math.min(chars.length, Math.floor((lt - typeStart) * 26)));
  const draft = chars.slice(0, charsShown);
  const showOrbOverlay = lt > 3 && lt < 8.5;
  const outFade = interpolate([duration - 0.5, duration], [1, 0])(lt);

  return (
    <div style={{ position:'absolute', inset:0, background: C.bg, opacity: outFade }}>
      <Camera keys={camKeys} localTime={lt}>
        <div style={{ position:'absolute', left: 100, top: 60, width: 1720, height: 960 }}>
          <MacWindow width={1720} height={960} title="WhatsApp Web · Khaled Al-Mutairi">
            <WhatsAppWeb lang={lang} t={lt} messages={messages} typing={lt > 3.0 && lt < 4.4} replyDraft={draft} />
          </MacWindow>
        </div>
        <Cursor keys={cursorKeys} localTime={lt} />
        {/* Falaq orb hovering above input */}
        {showOrbOverlay && (
          <div style={{
            position:'absolute', left: 1500, top: 780,
            opacity: interpolate([3, 3.5, 8, 8.5], [0, 1, 1, 0])(lt),
          }}>
            <AgentOrb size={90} t={lt} active />
          </div>
        )}
      </Camera>
      {/* Badge — reply typed by Falaq */}
      <div style={{
        position:'absolute', top: 100, [c.dir==='rtl'?'right':'left']: 100,
        opacity: interpolate([4.5, 5.3], [0, 1])(lt),
        transform:`translateY(${(1 - interpolate([4.5, 5.3], [0, 1])(lt))*-14}px)`,
      }}>
        <div style={{
          padding: '8px 16px', borderRadius: 999,
          background: 'rgba(95,211,167,0.14)', border: `1px solid ${C.ok}55`,
          color: C.ok, font: `700 15px ${c.font}`, direction: c.dir,
          display: 'inline-flex', alignItems: 'center', gap: 8,
        }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: C.ok, boxShadow: `0 0 10px ${C.ok}` }} />
          {c.replyBadge}
        </div>
      </div>
    </div>
  );
}

// 06 — Qualification demo (chat + side score panel)
function QualifyScene({ lang }) {
  const c = COPY[lang];
  const { localTime: lt, duration } = useSprite();
  // Reveal msgs over ~9 seconds
  const messages = c.qMsgs.map((m, i) => ({ ...m, at: 0.6 + i * 1.4, time: c.dir==='rtl' ? '٣:٤٨ ص' : '3:48 AM' }));
  // Tags fill 6.5..9.5 ; score fills alongside
  const camKeys = [
    { t: 0,   x: 960, y: 540, zoom: 0.95 },
    { t: 2,   x: 1400, y: 540, zoom: 1.1 },   // right panel
    { t: 6,   x: 1400, y: 540, zoom: 1.15 },
    { t: 10,  x: 960, y: 540, zoom: 1.05 },
  ];
  const outFade = interpolate([duration - 0.5, duration], [1, 0])(lt);

  const scoreStart = 6.5;
  const score = Math.round(interpolate([scoreStart, scoreStart + 2.5], [0, 87], Easing.easeOutQuad)(lt));
  const badgeAppear = interpolate([9.2, 9.8], [0, 1], Easing.easeOutBack)(lt);

  return (
    <div style={{ position:'absolute', inset:0, background: C.bg, opacity: outFade }}>
      <Camera keys={camKeys} localTime={lt}>
        {/* left — WhatsApp Web (compact) */}
        <div style={{ position:'absolute', left: 60, top: 80, width: 1120, height: 920 }}>
          <MacWindow width={1120} height={920} title="WhatsApp Web · Khaled">
            <WhatsAppWeb lang={lang} t={lt} messages={messages} />
          </MacWindow>
        </div>
        {/* right — analysis panel */}
        <div style={{
          position:'absolute', left: 1220, top: 80, width: 640, height: 920,
          background: C.card, border: `1px solid ${C.line}`, borderRadius: 18,
          padding: 32, direction: c.dir, boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        }}>
          <div style={{ display:'flex', alignItems:'center', gap: 12, marginBottom: 6 }}>
            <AgentOrb size={38} t={lt} active />
            <div style={{ font:`500 11px ${F.mono}`, color: C.mute, letterSpacing: 2 }}>LEAD ANALYSIS · LIVE</div>
          </div>
          <div style={{ font:`800 26px ${c.font}`, color: C.ink, marginBottom: 28, direction: c.dir }}>
            {c.dir==='rtl' ? 'تحليل تلقائي' : 'Auto-qualification'}
          </div>
          {/* Tags reveal */}
          <div style={{ display:'flex', flexDirection:'column', gap: 12, marginBottom: 28 }}>
            {c.qualLabels.tags.map((tag, i) => {
              const tt = 2.8 + i * 0.9;
              const a = interpolate([tt, tt + 0.4], [0, 1], Easing.easeOutQuad)(lt);
              return (
                <div key={i} style={{
                  opacity: a,
                  transform: `translateX(${(1 - a) * (c.dir === 'rtl' ? 20 : -20)}px)`,
                  padding: '12px 16px', borderRadius: 10,
                  background: 'rgba(95,211,167,0.06)', border: `1px solid ${C.ok}44`,
                  display: 'flex', alignItems: 'center', gap: 12,
                  font: `600 17px ${c.font}`, color: C.ink,
                }}>
                  <span style={{
                    width: 22, height: 22, borderRadius: '50%',
                    background: C.ok, color: C.bg, display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    font: `900 13px ${c.font}`,
                  }}>✓</span>
                  {tag}
                </div>
              );
            })}
          </div>
          {/* Score bar */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between',
              font: `500 12px ${c.font}`, color: C.mute, marginBottom: 8 }}>
              <span>{c.qualLabels.score}</span>
              <span style={{ font: `800 18px ${F.mono}`, color: C.gold, direction: 'ltr', unicodeBidi: 'isolate' }}>{score} / 100</span>
            </div>
            <div style={{ height: 8, background: C.line, borderRadius: 4, overflow: 'hidden' }}>
              <div style={{
                width: `${score}%`, height: '100%',
                background: `linear-gradient(90deg, ${C.gold}, ${C.goldBrite})`,
                boxShadow: `0 0 20px ${C.gold}88`,
              }} />
            </div>
          </div>
          {/* Hot badge */}
          <div style={{
            opacity: badgeAppear, transform: `scale(${0.7 + badgeAppear * 0.3})`,
            padding: '18px 22px', borderRadius: 14,
            background: `linear-gradient(135deg, ${C.hot}, #C74A38)`,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div>
              <div style={{ font: `500 10px ${c.font}`, color: 'rgba(255,255,255,0.7)', letterSpacing: 2 }}>
                {c.qualLabels.classification}
              </div>
              <div style={{ font: `900 26px ${c.font}`, color: '#fff', marginTop: 2 }}>{c.qualLabels.badge}</div>
            </div>
            <div style={{ font: '900 34px' }}>🔥</div>
          </div>
        </div>
      </Camera>
    </div>
  );
}

// 07 — CRM + calendar automation
function CrmBookScene({ lang }) {
  const c = COPY[lang];
  const { localTime: lt, duration } = useSprite();
  const outFade = interpolate([duration - 0.5, duration], [1, 0])(lt);
  // Two panes side-by-side; camera pans between them.
  const camKeys = [
    { t: 0,   x: 700, y: 540, zoom: 1.05 },   // CRM
    { t: 3,   x: 700, y: 540, zoom: 1.1 },
    { t: 4.5, x: 1220, y: 540, zoom: 1.05 },  // pan right to calendar
    { t: 7,   x: 1220, y: 540, zoom: 1.15 },
    { t: 10,  x: 960, y: 540, zoom: 0.95 },   // both
  ];
  const crmNew = interpolate([0.6, 1.4, 3], [0, 1, 1.2])(lt);
  const bookSlot = interpolate([4.8, 5.6, 7], [0, 1, 1.2])(lt);
  const crmToast = interpolate([1.4, 2.0, 3.4, 4.0], [0, 1, 1, 0])(lt);
  const calToast = interpolate([5.6, 6.2, 8.0, 8.6], [0, 1, 1, 0])(lt);

  return (
    <div style={{ position:'absolute', inset:0, background: C.bg, opacity: outFade }}>
      <Camera keys={camKeys} localTime={lt}>
        {/* CRM */}
        <div style={{ position:'absolute', left: 40, top: 80, width: 1050, height: 920 }}>
          <MacWindow width={1050} height={920} title="Falaq · CRM">
            <CrmDashboard lang={lang} t={lt} highlightNew={crmNew} />
          </MacWindow>
        </div>
        {/* Calendar */}
        <div style={{ position:'absolute', left: 1120, top: 80, width: 760, height: 920 }}>
          <MacWindow width={760} height={920} title="Team · Calendar">
            <CalendarView lang={lang} t={lt} bookSlot={bookSlot} />
          </MacWindow>
        </div>
        {/* Toasts */}
        {crmToast > 0 && (
          <Toast dir={c.dir} font={c.font} color={C.ok}
            text={c.crmToast} sub={c.dir==='rtl' ? 'خالد المطيري · ٨٠٠ ألف' : 'Khaled Al-Mutairi · 800K'}
            x={140} y={620} appear={crmToast} width={320}
          />
        )}
        {calToast > 0 && (
          <Toast dir={c.dir} font={c.font} color={C.hot} icon="📅"
            text={c.calendarToast} sub={c.repName}
            x={1220} y={620} appear={calToast} width={360}
          />
        )}
        {/* small arrow connecting the two */}
        {lt > 4.4 && lt < 6.5 && (
          <div style={{
            position:'absolute', left: 1080, top: 500, width: 60, height: 40,
            opacity: interpolate([4.4, 4.9, 6, 6.5], [0, 1, 1, 0])(lt),
          }}>
            <svg viewBox="0 0 60 40" style={{ width:'100%', height:'100%' }}>
              <path d="M 0 20 L 50 20 M 40 10 L 50 20 L 40 30" stroke={C.gold} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
      </Camera>
    </div>
  );
}

// 08 — Before / After split
function BeforeAfterScene({ lang }) {
  const c = COPY[lang];
  const { localTime: lt, duration } = useSprite();
  const outFade = interpolate([duration - 0.5, duration], [1, 0])(lt);
  const splitP = interpolate([0.3, 1.3], [0, 1], Easing.easeOutQuad)(lt);
  const beforeIn = interpolate([0.5, 1.4], [0, 1])(lt);
  const afterIn  = interpolate([2.5, 3.4], [0, 1])(lt);
  return (
    <div style={{ position:'absolute', inset:0, background: C.bg, opacity: outFade, display:'flex' }}>
      {/* Left — chaotic before */}
      <div style={{
        width: `${splitP * 50}%`, height: '100%',
        background: 'radial-gradient(ellipse at 50% 40%, #2A1518 0%, #0A0F1E 70%)',
        borderRight: `1px solid ${C.line}`,
        opacity: beforeIn, overflow: 'hidden', position: 'relative',
        display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
      }}>
        <div style={{ font:`600 13px ${F.mono}`, color: C.hot, letterSpacing: 3, marginBottom: 24 }}>{c.baBefore.toUpperCase()}</div>
        <div style={{
          font: `900 220px ${F.en}`, color: C.hot,
          letterSpacing: -6, lineHeight: 1,
          textShadow: `0 0 60px ${C.hot}66`,
        }}>{c.baBeforeMain}</div>
        <div style={{ font:`600 24px ${c.font}`, color: C.ink, marginTop: 12, direction: c.dir }}>{c.baBeforeSub}</div>
        {/* scattered lost tags */}
        <div style={{ position:'absolute', inset:0, pointerEvents:'none' }}>
          {['⋯','✕','⋯','✕','⋯','✕','⋯'].map((s, i) => {
            const angle = (i * 51 + 30);
            const r = 260 + (i % 3) * 40;
            const cx = 50 + Math.cos(angle * Math.PI / 180) * (r/9);
            const cy = 50 + Math.sin(angle * Math.PI / 180) * (r/13);
            const app = interpolate([1 + i * 0.15, 1.4 + i * 0.15], [0, 1])(lt);
            return (
              <div key={i} style={{
                position:'absolute', left:`${cx}%`, top:`${cy}%`,
                font:`700 20px ${F.mono}`, color: C.mute, opacity: 0.4 * app,
                transform:'translate(-50%,-50%)',
              }}>{s}</div>
            );
          })}
        </div>
      </div>
      {/* Right — after: hot leads dashboard */}
      <div style={{
        width: `${splitP * 50}%`, height: '100%',
        background: 'radial-gradient(ellipse at 50% 40%, #142A22 0%, #0A0F1E 70%)',
        opacity: afterIn, overflow: 'hidden', position: 'relative',
        marginInlineStart: splitP === 1 ? 0 : 'auto',
      }}>
        <div style={{ position:'absolute', top: 60, left: 40, right: 40 }}>
          <div style={{ font:`600 13px ${F.mono}`, color: C.ok, letterSpacing: 3, marginBottom: 12 }}>{c.baAfter.toUpperCase()}</div>
          <div style={{ display:'flex', alignItems:'baseline', gap: 20 }}>
            <div style={{
              font: `900 160px ${F.en}`, color: C.ok,
              lineHeight: 1, letterSpacing: -4,
              textShadow: `0 0 60px ${C.ok}55`,
            }}>{c.baAfterMain}</div>
            <div style={{ font:`600 22px ${c.font}`, color: C.ink, direction: c.dir, maxWidth: 240 }}>{c.baAfterSub}</div>
          </div>
        </div>
        {/* mini dashboard */}
        <div style={{
          position:'absolute', bottom: 60, left: 40, right: 40, height: 460,
          background: C.card, border: `1px solid ${C.line}`, borderRadius: 12, overflow:'hidden',
        }}>
          <HotLeadsDashboard lang={lang} t={lt - 2.5} />
        </div>
      </div>
    </div>
  );
}

// 09 — Stats
function StatsScene({ lang }) {
  const c = COPY[lang];
  const { localTime: lt, duration } = useSprite();
  const outFade = interpolate([duration - 0.4, duration], [1, 0])(lt);
  const kickIn = interpolate([0, 0.5], [0, 1])(lt);
  return (
    <div style={{
      position:'absolute', inset:0, background: `radial-gradient(ellipse at 50% 30%, #1B2340 0%, ${C.bg} 60%)`, opacity: outFade,
      display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap: 60,
      direction: c.dir,
    }}>
      <div style={{ opacity: kickIn }}><Kicker text={c.statsKicker} font={c.font} dir={c.dir} /></div>
      <div style={{ display:'flex', gap: 36 }}>
        {c.stats.map((s, i) => {
          const delay = 0.5 + i * 0.4;
          const a = interpolate([delay, delay + 0.5], [0, 1], Easing.easeOutQuad)(lt);
          const y = interpolate([delay, delay + 0.5], [30, 0], Easing.easeOutQuad)(lt);
          const scale = interpolate([delay, delay + 0.5], [0.9, 1], Easing.easeOutBack)(lt);
          return (
            <div key={i} style={{
              opacity: a, transform: `translateY(${y}px) scale(${scale})`,
              width: 360, minHeight: 300, padding: 36,
              borderRadius: 22, background: C.card,
              border: `1px solid ${C.line}`,
              display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', gap: 12,
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position:'absolute', top: -60, right: -60,
                width: 200, height: 200, borderRadius: '50%',
                background: C.gold, opacity: 0.06, filter: 'blur(30px)',
              }} />
              <div style={{
                font: `900 ${s.big.length > 3 ? 100 : 120}px ${F.en}`,
                background: `linear-gradient(180deg, ${C.goldBrite}, ${C.gold})`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                lineHeight: 1, letterSpacing: -4,
              }}>{s.big}<span style={{ fontSize: 34, marginInlineStart: 10, verticalAlign:'top', opacity: 0.8 }}>{s.unit}</span></div>
              <div style={{
                font:`500 18px/1.4 ${c.font}`, color: C.inkDim,
                textAlign: 'center', maxWidth: 280, marginTop: 8,
              }}>{s.lbl}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// 10 — CTA
function CTAScene({ lang }) {
  const c = COPY[lang];
  const { localTime: lt, duration } = useSprite();
  const outFade = interpolate([duration - 0.3, duration], [1, 0])(lt);
  const brandIn = interpolate([0, 0.6], [0, 1])(lt);
  const hIn = interpolate([0.4, 1.0], [0, 1], Easing.easeOutQuad)(lt);
  const btnIn = interpolate([0.9, 1.4], [0, 1], Easing.easeOutBack)(lt);
  const pulse = 1 + Math.sin(lt * 3) * 0.02 * interpolate([1.4, 1.6], [0, 1])(lt);
  return (
    <div style={{
      position:'absolute', inset:0, background: C.bg, opacity: outFade,
      display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap: 26,
      direction: c.dir,
    }}>
      <div style={{
        position:'absolute', width: 900, height: 900, borderRadius: '50%',
        background: `radial-gradient(circle, ${C.gold}22, transparent 65%)`,
        opacity: brandIn,
      }}/>
      <div style={{ transform: `scale(${brandIn})` }}>
        <AgentOrb size={140} t={lt} />
      </div>
      <div style={{
        opacity: brandIn,
        font: `900 ${lang === 'ar' ? 96 : 88}px ${c.font}`,
        background: `linear-gradient(180deg, ${C.goldBrite}, ${C.gold} 55%, ${C.goldDim})`,
        WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
        letterSpacing: lang === 'ar' ? 0 : -3, lineHeight: 1, marginTop: 6,
      }}>{c.brand}</div>
      <h2 style={{
        opacity: hIn, transform: `translateY(${(1 - hIn) * 12}px)`,
        font: `700 44px/1.2 ${c.font}`, color: C.ink,
        margin: 0, textAlign: 'center', maxWidth: 960, whiteSpace: 'pre-line',
      }}>{c.ctaH}</h2>
      <div style={{
        opacity: btnIn, transform: `scale(${pulse})`, marginTop: 16,
        padding: '18px 44px', borderRadius: 999,
        background: `linear-gradient(180deg, ${C.goldBrite}, ${C.gold})`,
        color: '#1F1608', font: `800 22px ${c.font}`,
        boxShadow: `0 12px 40px ${C.gold}55, 0 0 0 1px ${C.goldBrite}`,
      }}>{c.ctaBtn}</div>
      <div style={{
        opacity: btnIn, marginTop: 10,
        font:`500 15px ${F.mono}`, color: C.mute, letterSpacing: 3,
      }}>{c.ctaMeta}</div>
    </div>
  );
}

// 11 — Outro logo
function OutroScene({ lang }) {
  const src = lang === 'ar' ? 'video/logo-ar.mp4' : 'video/logo-en.mp4';
  const { localTime: lt, duration } = useSprite();
  const fallback = interpolate([0, 0.4, duration - 0.4, duration], [0, 1, 1, 0])(lt);
  return (
    <div style={{ position:'absolute', inset:0, background: C.bg, overflow: 'hidden' }}>
      <video src={src} autoPlay muted playsInline
        style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'contain', background: C.bg }}
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
      />
      <div style={{
        position:'absolute', inset:0, display:'flex', flexDirection:'column',
        alignItems:'center', justifyContent:'center', gap: 20, opacity: fallback, zIndex: -1,
      }}>
        <AgentOrb size={140} t={lt} />
        <div style={{
          font: lang === 'ar' ? `900 130px ${F.ar}` : `900 120px ${F.en}`,
          background: `linear-gradient(180deg, ${C.goldBrite}, ${C.gold} 55%, ${C.goldDim})`,
          WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
          letterSpacing: lang === 'ar' ? 0 : -3,
        }}>{lang === 'ar' ? 'فَلَق' : 'FALAQ'}</div>
        <div style={{ font:`500 15px ${F.mono}`, color: C.mute, letterSpacing: 5 }}>falaq.ai</div>
      </div>
    </div>
  );
}

// ── Master ────────────────────────────────────────────────────────────────
function FalaqScene({ lang = 'ar' }) {
  return (
    <Stage width={1920} height={1080} duration={DURATION} background={C.bg} fps={30}>
      <Sprite start={T.intro[0]}      end={T.intro[1]}><IntroScene lang={lang}/></Sprite>
      <Sprite start={T.coldOpen[0]}   end={T.coldOpen[1]}><ColdOpenScene lang={lang}/></Sprite>
      <Sprite start={T.deskWide[0]}   end={T.deskWide[1]}><DeskWideScene lang={lang}/></Sprite>
      <Sprite start={T.meetFalaq[0]}  end={T.meetFalaq[1]}><MeetFalaqScene lang={lang}/></Sprite>
      <Sprite start={T.autoReply[0]}  end={T.autoReply[1]}><AutoReplyScene lang={lang}/></Sprite>
      <Sprite start={T.qualify[0]}    end={T.qualify[1]}><QualifyScene lang={lang}/></Sprite>
      <Sprite start={T.crmBook[0]}    end={T.crmBook[1]}><CrmBookScene lang={lang}/></Sprite>
      <Sprite start={T.beforeAfter[0]} end={T.beforeAfter[1]}><BeforeAfterScene lang={lang}/></Sprite>
      <Sprite start={T.stats[0]}      end={T.stats[1]}><StatsScene lang={lang}/></Sprite>
      <Sprite start={T.cta[0]}        end={T.cta[1]}><CTAScene lang={lang}/></Sprite>
      <Sprite start={T.outro[0]}      end={T.outro[1]}><OutroScene lang={lang}/></Sprite>

      {/* HUD across content scenes */}
      <Sprite start={T.coldOpen[0]} end={T.cta[1]} keepMounted>
        <HUD lang={lang} />
      </Sprite>

    </Stage>
  );
}

window.FalaqScene = FalaqScene;
