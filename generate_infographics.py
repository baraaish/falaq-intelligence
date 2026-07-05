"""
Falaq Website — Generate all infographics and images
Service icons, industry icons, workflow diagrams, funnels, hero images
"""
from PIL import Image, ImageDraw, ImageFilter, ImageFont
import arabic_reshaper
from bidi.algorithm import get_display
import os, math

OUT = r"C:\Users\LENOVO\Desktop\Website\assets\infographics"
os.makedirs(OUT, exist_ok=True)

# ── Brand colors ──
VIOLET = (108, 76, 255)
BLUE   = (47, 123, 255)
CYAN   = (32, 215, 255)
DARK   = (10, 12, 18)
PANEL  = (18, 22, 35)
WHITE  = (255, 255, 255)
MUTED  = (140, 155, 180)
GRAD1  = (108, 76, 255)
GRAD2  = (47, 123, 255)
GRAD3  = (32, 215, 255)

def lerp(c1, c2, t):
    return tuple(int(a + (b - a) * t) for a, b in zip(c1, c2))

def gradient_bg(w, h, c1=DARK, c2=(15, 18, 28)):
    img = Image.new('RGB', (w, h))
    d = ImageDraw.Draw(img)
    for y in range(h):
        t = y / h
        c = lerp(c1, c2, t)
        d.line([(0, y), (w, y)], fill=c)
    return img

def rounded_rect(d, xy, r, fill, outline=None):
    x0, y0, x1, y1 = xy
    d.rounded_rectangle(xy, radius=r, fill=fill, outline=outline)

def icon_circle(draw, cx, cy, r, color, icon_type):
    """Draw a glowing circle with an icon inside."""
    # Glow
    for R in range(r + 15, r, -1):
        alpha = int(40 * (1 - (R - r) / 15))
        draw.ellipse([cx-R, cy-R, cx+R, cy+R], fill=color + (alpha,))
    # Main circle
    draw.ellipse([cx-r, cy-r, cx+r, cy+r], fill=color + (220,))
    # Icon (white)
    return (cx, cy, r)

# ══════════════════════════════════════════════
# SERVICE ICONS (512x512, transparent bg)
# ══════════════════════════════════════════════
def make_service_icons():
    print("Creating service icons...")
    size = 512
    icons = {
        "sales-marketing": ("SM", VIOLET),
        "whatsapp-agent": ("WA", (37, 211, 102)),
        "lead-agent": ("LA", BLUE),
        "proposal-agent": ("PA", (80, 180, 255)),
        "content-engine": ("CE", (180, 100, 255)),
        "clinic-agent": ("CA", (0, 200, 150)),
        "lab-assistant": ("LB", CYAN),
        "location-resolver": ("LR", (255, 160, 50)),
        "fleet-optimizer": ("FO", (100, 200, 255)),
    }

    for key, (label, color) in icons.items():
        img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
        d = ImageDraw.Draw(img)

        # Background circle
        cx, cy, r = size // 2, size // 2, 180
        for R in range(r + 30, r - 5, -1):
            t = (R - r) / 30
            a = int(60 * (1 - t))
            d.ellipse([cx-R, cy-R, cx+R, cy+R], fill=color + (a,))

        # Main circle with gradient feel
        d.ellipse([cx-r, cy-r, cx+r, cy+r], fill=color + (30,))
        d.ellipse([cx-r, cy-r, cx+r, cy+r], outline=color + (120,), width=3)

        # Inner ring
        d.ellipse([cx-r+20, cy-r+20, cx+r-20, cy+r-20], outline=color + (60,), width=2)

        # Label text
        try:
            font = ImageFont.truetype("C:\\Windows\\Fonts\\arialbd.ttf", 80)
        except:
            font = ImageFont.load_default()
        bb = d.textbbox((0, 0), label, font=font)
        tw, th = bb[2] - bb[0], bb[3] - bb[1]
        d.text((cx - tw//2, cy - th//2 - 10), label, fill=WHITE + (255,), font=font)

        img.save(os.path.join(OUT, f"icon-{key}.png"))
    print(f"  Created {len(icons)} service icons")

# ══════════════════════════════════════════════
# INDUSTRY ICONS (512x512, transparent bg)
# ══════════════════════════════════════════════
def make_industry_icons():
    print("Creating industry icons...")
    size = 512
    icons = {
        "sales-marketing": ("S&M", VIOLET),
        "healthcare": ("HC", (0, 200, 150)),
        "real-estate": ("RE", (255, 180, 50)),
        "logistics": ("LG", BLUE),
        "content-teams": ("CT", (180, 100, 255)),
    }

    for key, (label, color) in icons.items():
        img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
        d = ImageDraw.Draw(img)

        cx, cy = size // 2, size // 2

        # Hexagon background
        hex_r = 180
        points = []
        for i in range(6):
            angle = math.radians(60 * i - 30)
            points.append((cx + hex_r * math.cos(angle), cy + hex_r * math.sin(angle)))

        # Glow
        for offset in range(25, 0, -1):
            expanded = [(cx + (x - cx) * (1 + offset/200), cy + (y - cy) * (1 + offset/200)) for x, y in points]
            a = int(30 * (1 - offset / 25))
            d.polygon(expanded, fill=color + (a,))

        d.polygon(points, fill=color + (25,))
        d.polygon(points, outline=color + (120,), width=3)

        try:
            font = ImageFont.truetype("C:\\Windows\\Fonts\\arialbd.ttf", 70)
        except:
            font = ImageFont.load_default()
        bb = d.textbbox((0, 0), label, font=font)
        tw, th = bb[2] - bb[0], bb[3] - bb[1]
        d.text((cx - tw//2, cy - th//2 - 8), label, fill=WHITE + (255,), font=font)

        img.save(os.path.join(OUT, f"icon-{key}.png"))
    print(f"  Created {len(icons)} industry icons")

# ══════════════════════════════════════════════
# PIPELINE LEAKAGE FUNNEL (1200x600)
# ══════════════════════════════════════════════
def make_funnel():
    print("Creating funnel infographic...")
    w, h = 1200, 600
    img = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    stages = [
        ("Leads enter", "100%", 1000, VIOLET),
        ("Late response", "73%", 780, (90, 70, 220)),
        ("Weak qualification", "52%", 560, BLUE),
        ("Missed follow-up", "31%", 340, (30, 140, 240)),
        ("No CRM data", "14%", 180, CYAN),
    ]

    funnel_top = 40
    stage_h = 95
    gap = 8
    cx = w // 2

    for i, (label, pct, top_w, color) in enumerate(stages):
        y = funnel_top + i * (stage_h + gap)
        hw = top_w // 2

        # Trapezoid
        next_w = stages[i + 1][2] // 2 if i < len(stages) - 1 else hw - 60
        points = [
            (cx - hw, y),
            (cx + hw, y),
            (cx + next_w, y + stage_h),
            (cx - next_w, y + stage_h),
        ]

        # Glow
        for off in range(12, 0, -1):
            expanded = [(cx + (x - cx) * (1 + off/300), y + (yy - y) * (1 + off/300)) for x, yy in points]
            d.polygon(expanded, fill=color + (15,))

        d.polygon(points, fill=color + (50,))
        d.polygon(points, outline=color + (150,), width=2)

        # Text
        try:
            fnt = ImageFont.truetype("C:\\Windows\\Fonts\\arial.ttf", 26)
            fnt_b = ImageFont.truetype("C:\\Windows\\Fonts\\arialbd.ttf", 30)
        except:
            fnt = fnt_b = ImageFont.load_default()

        d.text((cx - hw + 30, y + 15), label, fill=WHITE + (230,), font=fnt)
        d.text((cx + hw - 90, y + 15), pct, fill=color + (255,), font=fnt_b)

        # Leakage arrow on the right
        if i > 0:
            arrow_x = cx + hw + 40
            arrow_y = y + stage_h // 2
            # Dripping down arrow
            d.line([(arrow_x, arrow_y - 15), (arrow_x, arrow_y + 20)], fill=(255, 80, 80, 150), width=3)
            d.polygon([(arrow_x - 6, arrow_y + 14), (arrow_x + 6, arrow_y + 14), (arrow_x, arrow_y + 24)],
                     fill=(255, 80, 80, 150))

    # Title
    try:
        ft = ImageFont.truetype("C:\\Windows\\Fonts\\arialbd.ttf", 28)
    except:
        ft = ImageFont.load_default()
    d.text((30, 10), "Pipeline Leakage", fill=WHITE + (200,), font=ft)

    img.save(os.path.join(OUT, "funnel-pipeline.png"))
    print("  Created funnel")

# ══════════════════════════════════════════════
# WORKFLOW DIAGRAM (1200x300, horizontal)
# ══════════════════════════════════════════════
def make_workflow(name, steps, filename):
    w, h = 1200, 300
    img = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    n = len(steps)
    box_w, box_h = 160, 120
    total_w = n * box_w + (n - 1) * 50
    start_x = (w - total_w) // 2
    cy = h // 2

    colors = [VIOLET, (80, 70, 220), BLUE, (30, 150, 240), CYAN, (20, 200, 230)]

    try:
        fb = ImageFont.truetype("C:\\Windows\\Fonts\\arialbd.ttf", 20)
        fn = ImageFont.truetype("C:\\Windows\\Fonts\\arial.ttf", 16)
    except:
        fb = fn = ImageFont.load_default()

    for i, step in enumerate(steps):
        x = start_x + i * (box_w + 50)
        y = cy - box_h // 2
        color = colors[i % len(colors)]

        # Box
        d.rounded_rectangle([x, y, x + box_w, y + box_h], radius=12,
                           fill=color + (35,), outline=color + (140,), width=2)

        # Step number circle
        ncx, ncy = x + 25, y + 25
        d.ellipse([ncx - 15, ncy - 15, ncx + 15, ncy + 15], fill=color + (200,))
        num_str = str(i + 1)
        bb = d.textbbox((0, 0), num_str, font=fb)
        d.text((ncx - (bb[2]-bb[0])//2, ncy - (bb[3]-bb[1])//2 - 2), num_str, fill=WHITE+(255,), font=fb)

        # Step text
        lines = step.split('\n')
        for li, line in enumerate(lines):
            bb = d.textbbox((0, 0), line, font=fn)
            lw = bb[2] - bb[0]
            d.text((x + (box_w - lw) // 2, y + 50 + li * 22), line, fill=WHITE + (220,), font=fn)

        # Arrow to next
        if i < n - 1:
            ax = x + box_w + 8
            ay = cy
            d.line([(ax, ay), (ax + 34, ay)], fill=color + (180,), width=3)
            d.polygon([(ax + 30, ay - 7), (ax + 30, ay + 7), (ax + 42, ay)], fill=color + (180,))

    # Title
    d.text((30, 15), name, fill=WHITE + (180,), font=fb)
    img.save(os.path.join(OUT, filename))
    print(f"  Created {filename}")

# ══════════════════════════════════════════════
# HERO ILLUSTRATIONS (1200x700)
# ══════════════════════════════════════════════
def make_hero(filename, title, subtitle, elements):
    w, h = 1200, 700
    img = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    # Background subtle gradient
    for y in range(h):
        t = y / h
        c = lerp((15, 18, 30), (10, 12, 18), t)
        d.line([(0, y), (w, y)], fill=c + (180,))

    # Decorative grid dots
    for gx in range(0, w, 60):
        for gy in range(0, h, 60):
            dist = math.sqrt((gx - w * 0.6) ** 2 + (gy - h * 0.4) ** 2)
            if dist < 300:
                a = int(40 * (1 - dist / 300))
                d.ellipse([gx - 1, gy - 1, gx + 1, gy + 1], fill=CYAN + (a,))

    # Central decorative circles
    for r, color in [(180, VIOLET), (130, BLUE), (80, CYAN)]:
        cx, cy = w * 0.62, h * 0.45
        for R in range(r + 20, r, -1):
            a = int(15 * (1 - (R - r) / 20))
            d.ellipse([cx-R, cy-R, cx+R, cy+R], fill=color + (a,))
        d.ellipse([cx-r, cy-r, cx+r, cy+r], outline=color + (40,), width=2)

    # Floating elements
    for ex, ey, es, ec in elements:
        d.rounded_rectangle([ex - es//2, ey - es//2, ex + es//2, ey + es//2],
                           radius=6, fill=ec + (30,), outline=ec + (80,), width=2)

    # Title
    try:
        ft = ImageFont.truetype("C:\\Windows\\Fonts\\arialbd.ttf", 42)
        fs = ImageFont.truetype("C:\\Windows\\Fonts\\arial.ttf", 22)
    except:
        ft = fs = ImageFont.load_default()

    d.text((60, h - 140), title, fill=WHITE + (220,), font=ft)
    d.text((60, h - 85), subtitle, fill=MUTED + (180,), font=fs)

    img.save(os.path.join(OUT, filename))
    print(f"  Created {filename}")

# ══════════════════════════════════════════════
# TEAM AVATARS (400x400)
# ══════════════════════════════════════════════
def make_team():
    print("Creating team avatars...")
    members = [
        ("BA", "Baraa", VIOLET),
        ("MN", "Mohammed", BLUE),
        ("YE", "Younis", CYAN),
    ]

    for initials, name, color in members:
        size = 400
        img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
        d = ImageDraw.Draw(img)

        cx, cy = size // 2, size // 2
        r = 160

        # Glow
        for R in range(r + 20, r, -1):
            a = int(30 * (1 - (R - r) / 20))
            d.ellipse([cx-R, cy-R, cx+R, cy+R], fill=color + (a,))

        # Circle bg
        d.ellipse([cx-r, cy-r, cx+r, cy+r], fill=PANEL + (255,))
        d.ellipse([cx-r, cy-r, cx+r, cy+r], outline=color + (150,), width=4)

        # Inner ring
        d.ellipse([cx-r+12, cy-r+12, cx+r-12, cy+r-12], outline=color + (50,), width=2)

        # Initials
        try:
            font = ImageFont.truetype("C:\\Windows\\Fonts\\arialbd.ttf", 100)
        except:
            font = ImageFont.load_default()
        bb = d.textbbox((0, 0), initials, font=font)
        tw, th = bb[2] - bb[0], bb[3] - bb[1]
        d.text((cx - tw//2, cy - th//2 - 15), initials, fill=color + (220,), font=font)

        # Small icon below
        d.ellipse([cx - 8, cy + r - 30, cx + 8, cy + r - 14], fill=color + (100,))

        img.save(os.path.join(OUT, f"team-{name.lower()}.png"))
    print("  Created team avatars")

# ══════════════════════════════════════════════
# INTEGRATION HUB (800x800)
# ══════════════════════════════════════════════
def make_integration_hub():
    print("Creating integration hub...")
    size = 800
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    cx, cy = size // 2, size // 2

    # Center circle
    cr = 60
    d.ellipse([cx-cr, cy-cr, cx+cr, cy+cr], fill=VIOLET + (60,), outline=VIOLET + (150,), width=3)
    try:
        fi = ImageFont.truetype("C:\\Windows\\Fonts\\arialbd.ttf", 24)
    except:
        fi = ImageFont.load_default()
    bb = d.textbbox((0, 0), "AI", font=fi)
    d.text((cx - (bb[2]-bb[0])//2, cy - (bb[3]-bb[1])//2 - 3), "AI", fill=WHITE+(255,), font=fi)

    # Spoke tools
    tools = [
        ("WhatsApp", (37, 211, 102)),
        ("CRM", VIOLET),
        ("Sheets", (52, 168, 83)),
        ("Email", BLUE),
        ("Calendar", (255, 160, 50)),
        ("Forms", CYAN),
    ]

    try:
        ft = ImageFont.truetype("C:\\Windows\\Fonts\\arial.ttf", 18)
    except:
        ft = ImageFont.load_default()

    spoke_r = 250
    for i, (name, color) in enumerate(tools):
        angle = math.radians(60 * i - 90)
        sx = cx + spoke_r * math.cos(angle)
        sy = cy + spoke_r * math.sin(angle)

        # Spoke line
        d.line([(cx, cy), (sx, sy)], fill=color + (80,), width=2)

        # Tool circle
        tr = 40
        d.ellipse([sx-tr, sy-tr, sx+tr, sy+tr], fill=color + (40,), outline=color + (120,), width=2)

        # Tool label
        bb = d.textbbox((0, 0), name, font=ft)
        tw = bb[2] - bb[0]
        d.text((sx - tw//2, sy + tr + 8), name, fill=color + (200,), font=ft)

    img.save(os.path.join(OUT, "integration-hub.png"))
    print("  Created integration hub")

# ══════════════════════════════════════════════
# CAPABILITIES DIAGRAM (1200x500)
# ══════════════════════════════════════════════
def make_capabilities():
    print("Creating capabilities diagram...")
    w, h = 1200, 500
    img = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    caps = [
        ("Capture", "Inbox", VIOLET),
        ("Qualify", "Filter", (80, 70, 220)),
        ("Follow Up", "Repeat", BLUE),
        ("Hand Off", "Deliver", CYAN),
    ]

    box_w, box_h = 220, 180
    total = len(caps) * box_w + (len(caps) - 1) * 60
    sx = (w - total) // 2
    cy = h // 2

    try:
        fb = ImageFont.truetype("C:\\Windows\\Fonts\\arialbd.ttf", 26)
        fs = ImageFont.truetype("C:\\Windows\\Fonts\\arial.ttf", 18)
    except:
        fb = fs = ImageFont.load_default()

    for i, (title, sub, color) in enumerate(caps):
        x = sx + i * (box_w + 60)
        y = cy - box_h // 2

        d.rounded_rectangle([x, y, x + box_w, y + box_h], radius=14,
                           fill=color + (25,), outline=color + (100,), width=2)

        # Top accent line
        d.line([(x + 20, y), (x + box_w - 20, y)], fill=color + (150,), width=3)

        # Title
        bb = d.textbbox((0, 0), title, font=fb)
        tw = bb[2] - bb[0]
        d.text((x + (box_w - tw) // 2, y + 40), title, fill=WHITE + (230,), font=fb)

        # Subtitle
        bb = d.textbbox((0, 0), sub, font=fs)
        tw = bb[2] - bb[0]
        d.text((x + (box_w - tw) // 2, y + 80), sub, fill=color + (180,), font=fs)

        # Arrow
        if i < len(caps) - 1:
            ax = x + box_w + 10
            ay = cy
            d.line([(ax, ay), (ax + 40, ay)], fill=color + (150,), width=3)
            d.polygon([(ax + 36, ay - 7), (ax + 36, ay + 7), (ax + 48, ay)], fill=color + (150,))

    d.text((30, 15), "Execution Capabilities", fill=WHITE + (180,), font=fb)
    img.save(os.path.join(OUT, "capabilities.png"))
    print("  Created capabilities")

# ══════════════════════════════════════════════
# FRICTION POINTS INFOGRAPHIC (1200x400)
# ══════════════════════════════════════════════
def make_friction(filename, title, points):
    w, h = 1200, 400
    img = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    n = len(points)
    card_w = (w - 80 - (n - 1) * 20) // n
    colors = [VIOLET, (80, 70, 220), BLUE, CYAN]

    try:
        fb = ImageFont.truetype("C:\\Windows\\Fonts\\arialbd.ttf", 22)
        fs = ImageFont.truetype("C:\\Windows\\Fonts\\arial.ttf", 16)
    except:
        fb = fs = ImageFont.load_default()

    d.text((30, 10), title, fill=WHITE + (180,), font=fb)

    for i, point in enumerate(points):
        x = 40 + i * (card_w + 20)
        y = 50
        color = colors[i % len(colors)]

        d.rounded_rectangle([x, y, x + card_w, y + h - 70], radius=10,
                           fill=color + (20,), outline=color + (80,), width=2)

        # Warning icon
        ix, iy = x + card_w // 2, y + 40
        d.polygon([(ix, iy - 18), (ix - 16, iy + 12), (ix + 16, iy + 12)],
                 fill=(255, 80, 80, 120), outline=(255, 80, 80, 200))
        d.text((ix - 4, iy - 8), "!", fill=WHITE + (255,), font=fb)

        # Text
        lines = point.split('\n')
        for li, line in enumerate(lines):
            bb = d.textbbox((0, 0), line, font=fs)
            lw = bb[2] - bb[0]
            d.text((x + (card_w - lw) // 2, y + 80 + li * 24), line, fill=WHITE + (200,), font=fs)

    img.save(os.path.join(OUT, filename))
    print(f"  Created {filename}")

# ══════════════════════════════════════════════
# RUN ALL
# ══════════════════════════════════════════════
if __name__ == "__main__":
    make_service_icons()
    make_industry_icons()
    make_funnel()
    make_team()
    make_integration_hub()
    make_capabilities()

    # Workflows
    make_workflow("Implementation Process", [
        "Map the\nworkflow",
        "Define\nagent rules",
        "Connect\ntools",
        "Launch &\nreview"
    ], "workflow-4step.png")

    make_workflow("Sales & Marketing Flow", [
        "Lead\narrives",
        "Agent\nresponds",
        "Qualify &\ncapture",
        "Follow-up\nsequence",
        "CRM\nupdated",
        "Outcome\nlogged"
    ], "workflow-6step.png")

    # Service-specific workflows
    for svc, steps in [
        ("whatsapp", ["Message\nreceived", "AI reads\n& classifies", "Auto-reply\nsent", "Escalate if\nneeded"]),
        ("lead", ["Lead\nenters", "Score &\nrank", "Route to\nrep", "Track\nstatus"]),
        ("proposal", ["Request\nreceived", "Gather\nrequirements", "Draft\nproposal", "Send &\nfollow-up"]),
        ("content", ["Topic\nbrief", "AI\nresearch", "Draft\ncreated", "Review &\npublish"]),
    ]:
        make_workflow(f"Agent Workflow", steps, f"workflow-{svc}.png")

    # Friction infographics
    make_friction("friction-sales.png", "Sales & Marketing Friction", [
        "Late\nresponse", "Inconsistent\nqualification",
        "Missed\nfollow-up", "No CRM\ndata"
    ])
    make_friction("friction-healthcare.png", "Healthcare Friction", [
        "Appointment\nbacklog", "Patient\ndrop-off",
        "Manual\nrecords", "Lab result\ndelays"
    ])
    make_friction("friction-realestate.png", "Real Estate Friction", [
        "Slow\ninquiry reply", "Poor\nlead matching",
        "Missing\nfollow-up", "Disorganized\nlistings"
    ])
    make_friction("friction-logistics.png", "Logistics Friction", [
        "Route\ninefficiency", "Manual\ndispatch",
        "No real-time\ntracking", "Paper-based\nrecords"
    ])
    make_friction("friction-content.png", "Content Teams Friction", [
        "Slow\nproduction", "Inconsistent\nbrand voice",
        "Manual\nrepetitive tasks", "Poor\ncollaboration"
    ])

    # Hero illustrations
    make_hero("hero-home.png", "AI Agents That Work", "Automate the work between people and systems",
              [(200, 150, 50, VIOLET), (350, 250, 35, BLUE), (900, 300, 45, CYAN),
               (750, 180, 30, VIOLET), (1000, 400, 40, BLUE), (500, 400, 25, CYAN)])
    make_hero("hero-services.png", "Solutions", "Purpose-built agents for specific operational paths",
              [(300, 200, 40, VIOLET), (700, 300, 50, BLUE), (950, 150, 35, CYAN),
               (500, 450, 30, VIOLET), (150, 350, 45, BLUE)])
    make_hero("hero-industries.png", "Industries", "AI agents tailored for your sector",
              [(250, 180, 45, VIOLET), (650, 280, 55, BLUE), (900, 200, 40, CYAN),
               (400, 420, 35, VIOLET), (800, 400, 30, BLUE)])
    make_hero("hero-about.png", "About Falaq", "The clear signal after the noise",
              [(400, 200, 60, VIOLET), (700, 350, 45, BLUE), (300, 400, 35, CYAN),
               (850, 180, 40, VIOLET), (550, 150, 30, BLUE)])
    make_hero("hero-contact.png", "Contact Us", "Show us your workflow — we will show you the pilot",
              [(350, 250, 50, VIOLET), (650, 200, 40, BLUE), (900, 350, 55, CYAN),
               (200, 350, 35, VIOLET), (750, 450, 30, BLUE)])
    make_hero("hero-thankyou.png", "Thank You", "We will be in touch within 24 hours",
              [(450, 280, 70, VIOLET), (650, 220, 50, BLUE), (350, 350, 40, CYAN),
               (800, 380, 35, VIOLET), (550, 150, 45, BLUE)])

    # Sales & Marketing AI hero
    make_hero("hero-sales.png", "Sales & Marketing AI", "From lead arrival to CRM — fully automated",
              [(300, 200, 50, VIOLET), (600, 300, 60, BLUE), (900, 200, 45, CYAN),
               (450, 450, 35, VIOLET), (750, 150, 40, BLUE), (200, 350, 30, CYAN)])

    print("\nAll infographics generated!")
