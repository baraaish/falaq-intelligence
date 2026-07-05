"""
Falaq Logo v4 — Fixed gradient, beam through crescent, better composition
"""
from PIL import Image, ImageDraw, ImageFilter, ImageFont
import arabic_reshaper
from bidi.algorithm import get_display
import os, colorsys

SIZE = 1200
HALF = SIZE // 2
VIOLET = (108, 76, 255)
BLUE   = (47, 123, 255)
CYAN   = (32, 215, 255)
WHITE  = (255, 255, 255)

def smooth_gradient_circle(size, cx, cy, r, color_stops):
    """Circle with smooth angular gradient using many thin pie slices."""
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    n = 720  # more slices = smoother
    for i in range(n):
        a1 = i * 360.0 / n - 90
        a2 = (i + 1.5) * 360.0 / n - 90  # slight overlap to avoid gaps
        t = i / n
        # Interpolate through color stops
        idx = t * (len(color_stops) - 1)
        i0 = int(idx)
        i1 = min(i0 + 1, len(color_stops) - 1)
        frac = idx - i0
        c = tuple(int(color_stops[i0][j] * (1 - frac) + color_stops[i1][j] * frac) for j in range(3))
        d.pieslice([cx - r, cy - r, cx + r, cy + r], a1, a2, fill=c + (255,))
    return img

def make_crescent(size, cx, cy, r_out, r_in, offset_x, colors):
    """Crescent with smooth multi-color gradient."""
    grad = smooth_gradient_circle(size, cx, cy, r_out, colors)
    mask = Image.new('L', (size, size), 0)
    d = ImageDraw.Draw(mask)
    d.ellipse([cx - r_out, cy - r_out, cx + r_out, cy + r_out], fill=255)
    d.ellipse([cx + offset_x - r_in, cy - r_in, cx + offset_x + r_in, cy + r_in], fill=0)
    result = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    result.paste(grad, mask=mask)
    return result

def beam(img, x1, y1, x2, y2, w, color, glow=20):
    g = Image.new('RGBA', img.size, (0, 0, 0, 0))
    ImageDraw.Draw(g).line([(x1, y1), (x2, y2)], fill=color + (45,), width=w + glow * 2)
    g = g.filter(ImageFilter.GaussianBlur(glow))
    c = Image.new('RGBA', img.size, (0, 0, 0, 0))
    ImageDraw.Draw(c).line([(x1, y1), (x2, y2)], fill=color + (255,), width=w)
    b = Image.new('RGBA', img.size, (0, 0, 0, 0))
    ImageDraw.Draw(b).line([(x1, y1), (x2, y2)], fill=WHITE + (140,), width=max(1, w // 3))
    img.paste(g, (0, 0), g)
    img.paste(c, (0, 0), c)
    img.paste(b, (0, 0), b)

def focal(img, cx, cy, r, color):
    for R, A in [(r*5, 12), (r*3, 25), (r*1.5, 55), (r, 100)]:
        g = Image.new('RGBA', img.size, (0, 0, 0, 0))
        ImageDraw.Draw(g).ellipse([cx-R, cy-R, cx+R, cy+R], fill=color+(A,))
        g = g.filter(ImageFilter.GaussianBlur(max(1, int(R * 0.6))))
        img.paste(g, (0, 0), g)
    c = Image.new('RGBA', img.size, (0, 0, 0, 0))
    ImageDraw.Draw(c).ellipse([cx-r, cy-r, cx+r, cy+r], fill=WHITE+(255,))
    img.paste(c, (0, 0), c)

def bidi(text):
    return get_display(arabic_reshaper.reshape(text))

def label(img, text, font, y, color, cx=HALF):
    t = bidi(text)
    d = ImageDraw.Draw(img)
    bb = d.textbbox((0, 0), t, font=font)
    d.text((cx - (bb[2]-bb[0])//2, y), t, fill=color, font=font)

def main():
    out = r"C:\Users\LENOVO\Desktop\Website\assets\generated"
    os.makedirs(out, exist_ok=True)

    # Crescent: left of center, opening faces right
    ccx, ccy = HALF - 100, HALF
    r_out, r_in, offset = 360, 290, 160

    # Smooth gradient: violet → blue → cyan → violet (cyclic)
    grad_colors = [VIOLET, (80, 60, 220), BLUE, (30, 150, 240), CYAN, (20, 200, 230), (60, 100, 200), VIOLET]

    print("Crescent...")
    cr = make_crescent(SIZE, ccx, ccy, r_out, r_in, offset, grad_colors)

    # Soft glow
    gw = cr.filter(ImageFilter.GaussianBlur(25))
    gw.putdata([(r, g, b, min(a, 40)) for r, g, b, a in gw.getdata()])

    # Beam goes FROM right edge TO inside the crescent opening
    bx1 = SIZE + 20  # start off-screen right
    by = HALF
    bx2 = ccx + offset - r_in + 60  # ends inside the crescent opening

    def base():
        c = Image.new('RGBA', (SIZE, SIZE), (0, 0, 0, 0))
        c.paste(gw, (0, 0), gw)
        c.paste(cr, (0, 0), cr)
        # Main beam
        beam(c, bx1, by, bx2, by, 5, CYAN, 24)
        # Sub-beams (diverge from focal point)
        beam(c, bx1, by, bx2 - 30, by - 50, 2, BLUE, 10)
        beam(c, bx1, by, bx2 - 30, by + 50, 2, BLUE, 10)
        # Focal point at right edge
        focal(c, SIZE - 40, by, 10, CYAN)
        return c

    b = base()
    b.save(os.path.join(out, "falaq-logo-symbol.png"))

    try:
        fb = ImageFont.truetype("C:\\Windows\\Fonts\\arial.ttf", 105)
        fm = ImageFont.truetype("C:\\Windows\\Fonts\\arial.ttf", 44)
        fs = ImageFont.truetype("C:\\Windows\\Fonts\\arial.ttf", 48)
    except:
        fb = fm = fs = ImageFont.load_default()

    en = base()
    label(en, "فَلَقْ", fb, HALF + 240, VIOLET + (255,))
    label(en, "INTELLIGENCE", fm, HALF + 355, CYAN + (220,))
    en.save(os.path.join(out, "falaq-logo-en.png"))

    ar = base()
    label(ar, "فَلَقْ", fb, HALF + 240, VIOLET + (255,))
    label(ar, "لحلول الذكاء الصناعي", fs, HALF + 360, CYAN + (220,))
    ar.save(os.path.join(out, "falaq-logo-ar.png"))

    for n, s in [("symbol-dark", b), ("en-dark", en), ("ar-dark", ar)]:
        d = Image.new('RGBA', (SIZE, SIZE), (10, 12, 18, 255))
        d.paste(s, (0, 0), s)
        d.save(os.path.join(out, f"{n}.png"))

    print("Done!")

if __name__ == "__main__":
    main()
