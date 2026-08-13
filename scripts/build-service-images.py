"""Convert downloaded service photographs to WebP at two widths.

Cards request the 1x file and let srcset pick 2x on dense screens. EXIF is
dropped: it can carry camera and location data that has no business shipping
on a marketing page.

Pillow, not ImageMagick — on Windows `convert` is the filesystem tool.

Run: python scripts/build-service-images.py
"""
import io, json, os, re, subprocess, sys
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIR = os.path.join(ROOT, "assets", "services")
WIDTHS = [(760, ""), (1520, "@2x")]
SOURCE_EXT = (".jpg", ".jpeg", ".png")

slugs = json.loads(subprocess.check_output(
    ["node", "-e", "console.log(JSON.stringify(require('./content/services.js').SERVICES.map(s=>s.slug)))"],
    cwd=ROOT, text=True))

converted, missing, before, after = 0, [], 0, 0

for slug in slugs:
    source = next((os.path.join(DIR, slug + e) for e in SOURCE_EXT
                   if os.path.exists(os.path.join(DIR, slug + e))), None)
    if not source:
        if not os.path.exists(os.path.join(DIR, slug + ".webp")):
            missing.append(slug)
        continue

    before += os.path.getsize(source)
    im = Image.open(source)
    # Apply any EXIF rotation, then discard the metadata entirely.
    try:
        from PIL import ImageOps
        im = ImageOps.exif_transpose(im)
    except Exception:
        pass
    im = im.convert("RGB")

    for width, suffix in WIDTHS:
        out = os.path.join(DIR, f"{slug}{suffix}.webp")
        w = min(width, im.width)
        h = round(im.height * w / im.width)
        im.resize((w, h), Image.LANCZOS).save(out, "WEBP", quality=80, method=6)
        after += os.path.getsize(out)
    converted += 1

kb = lambda n: f"{round(n/1024)} KB"
print(f"Converted {converted} of {len(slugs)} service images.")
if before:
    print(f"  source {kb(before)} -> webp {kb(after)} ({round((1-after/before)*100)}% smaller)")
if missing:
    print(f"  still missing: {', '.join(missing)}")
