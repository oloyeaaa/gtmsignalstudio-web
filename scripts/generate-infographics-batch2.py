"""
Batch 2: Infographics for posts 6-10
"""
import requests, os, io
from PIL import Image, ImageDraw, ImageFont, ImageEnhance

FONTS_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "fonts")
LOGO_PATH = os.path.join(os.path.dirname(__file__), "..", "public", "gss-logo.png")
OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "blog-images", "infographics")

env = {}
env_path = os.path.join(os.path.dirname(__file__), "..", "..", "GSS", "config", ".env")
if os.path.exists(env_path):
    with open(env_path) as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, v = line.split("=", 1)
                env[k.strip()] = v.strip()
FAL_KEY = env.get("FAL_API_KEY", "")

ORANGE = "#f17021"
WHITE = "#ffffff"
MUTED = "#7a9aaa"
NAVY = "#07202b"

f_bold_36 = ImageFont.truetype(os.path.join(FONTS_DIR, "Montserrat-Bold.ttf"), 36)
f_bold_28 = ImageFont.truetype(os.path.join(FONTS_DIR, "Montserrat-Bold.ttf"), 28)
f_bold_22 = ImageFont.truetype(os.path.join(FONTS_DIR, "Montserrat-Bold.ttf"), 22)
f_semi_20 = ImageFont.truetype(os.path.join(FONTS_DIR, "Montserrat-SemiBold.ttf"), 20)
f_semi_18 = ImageFont.truetype(os.path.join(FONTS_DIR, "Montserrat-SemiBold.ttf"), 18)
f_reg_18 = ImageFont.truetype(os.path.join(FONTS_DIR, "Montserrat-Regular.ttf"), 18)
f_reg_16 = ImageFont.truetype(os.path.join(FONTS_DIR, "Montserrat-Regular.ttf"), 16)
f_mono_14 = ImageFont.truetype(os.path.join(FONTS_DIR, "RobotoMono-Bold.ttf"), 14)
f_mono_12 = ImageFont.truetype(os.path.join(FONTS_DIR, "RobotoMono-Regular.ttf"), 12)


def get_bg(prompt):
    try:
        r = requests.post("https://fal.run/fal-ai/nano-banana",
            headers={"Authorization": f"Key {FAL_KEY}", "Content-Type": "application/json"},
            json={"prompt": prompt, "image_size": "square", "num_images": 1}, timeout=30)
        if r.status_code == 200:
            img = Image.open(io.BytesIO(requests.get(r.json()["images"][0]["url"], timeout=15).content))
            return ImageEnhance.Brightness(img.convert("RGB").resize((1080, 1080), Image.LANCZOS)).enhance(0.4)
    except Exception as e:
        print(f"  fal: {e}")
    return Image.new("RGB", (1080, 1080), NAVY)


def logo(img):
    l = Image.open(LOGO_PATH).convert("RGBA")
    lh = 40; lw = int(lh * (l.width / l.height))
    l = l.resize((lw, lh), Image.LANCZOS)
    img.paste(l, (40, 30), l)


def footer(draw):
    draw.text((540, 1060), "gtmsignalstudio.com", font=f_mono_12, fill=ORANGE, anchor="mm")


def gen_tools_compared(slug):
    """SmartLead vs Clay vs Instantly comparison"""
    bg = get_bg("Abstract dark navy with three vertical columns of light, comparison layout, minimal geometric")
    bg_rgba = bg.convert("RGBA")
    ov = Image.new("RGBA", (1080, 1080), (0,0,0,0))
    ImageDraw.Draw(ov).rectangle([(0,0),(1080,80)], fill=(7,32,43,220))
    bg_rgba = Image.alpha_composite(bg_rgba, ov)
    draw = ImageDraw.Draw(bg_rgba)
    logo(bg_rgba)
    draw.text((540, 50), "COLD EMAIL TOOLS COMPARED", font=f_bold_28, fill=WHITE, anchor="mm")

    tools = [
        {"name": "SmartLead", "focus": "Deliverability", "best": "Multi-mailbox rotation", "price": "From $39/mo", "for": "Technical users who want control", "color": ORANGE},
        {"name": "Clay", "focus": "Data Enrichment", "best": "Prospect research + personalization", "price": "From $149/mo", "for": "Teams building enriched lists", "color": "#38bdf8"},
        {"name": "Instantly", "focus": "Speed + Simplicity", "best": "Easy warmup + sending", "price": "From $30/mo", "for": "Beginners who want quick setup", "color": "#44aa66"},
    ]

    col_w = 300
    gap = 30
    start_x = (1080 - 3 * col_w - 2 * gap) // 2

    for i, t in enumerate(tools):
        x = start_x + i * (col_w + gap)
        y = 120

        card = Image.new("RGBA", (col_w, 880), (13, 47, 61, 200))
        bg_rgba.paste(Image.alpha_composite(Image.new("RGBA", (col_w, 880), (0,0,0,0)), card), (x, y), card)
        draw = ImageDraw.Draw(bg_rgba)

        # Header bar
        draw.rectangle([(x, y), (x + col_w, y + 6)], fill=t["color"])

        draw.text((x + col_w // 2, y + 40), t["name"], font=f_bold_28, fill=WHITE, anchor="mm")
        draw.text((x + col_w // 2, y + 75), t["focus"], font=f_mono_14, fill=t["color"], anchor="mm")

        draw.line([(x + 20, y + 100), (x + col_w - 20, y + 100)], fill=(26,64,80), width=1)

        draw.text((x + 20, y + 120), "BEST FOR", font=f_mono_12, fill=MUTED)
        # Word wrap the best-for text
        words = t["best"].split()
        line1 = " ".join(words[:3])
        line2 = " ".join(words[3:]) if len(words) > 3 else ""
        draw.text((x + 20, y + 145), line1, font=f_semi_18, fill=WHITE)
        if line2:
            draw.text((x + 20, y + 170), line2, font=f_semi_18, fill=WHITE)

        draw.text((x + 20, y + 220), "IDEAL USER", font=f_mono_12, fill=MUTED)
        words2 = t["for"].split()
        l1 = " ".join(words2[:4])
        l2 = " ".join(words2[4:]) if len(words2) > 4 else ""
        draw.text((x + 20, y + 245), l1, font=f_reg_16, fill=MUTED)
        if l2:
            draw.text((x + 20, y + 268), l2, font=f_reg_16, fill=MUTED)

        draw.text((x + col_w // 2, y + 830), t["price"], font=f_bold_22, fill=t["color"], anchor="mm")

    footer(draw)
    path = os.path.join(OUT_DIR, f"{slug}.png")
    bg_rgba.convert("RGB").save(path, "PNG", quality=95)
    return path


def gen_icp_beginner(slug):
    """ICP definition steps"""
    bg = get_bg("Abstract dark navy with concentric target rings, precision targeting concept, no text, minimal")
    bg_rgba = bg.convert("RGBA")
    ov = Image.new("RGBA", (1080, 1080), (0,0,0,0))
    ImageDraw.Draw(ov).rectangle([(0,0),(1080,80)], fill=(7,32,43,220))
    bg_rgba = Image.alpha_composite(bg_rgba, ov)
    draw = ImageDraw.Draw(bg_rgba)
    logo(bg_rgba)
    draw.text((540, 50), "DEFINE YOUR ICP IN 5 STEPS", font=f_bold_28, fill=WHITE, anchor="mm")

    steps = [
        {"num": "1", "title": "Analyse Best Customers", "desc": "Which accounts generate most revenue with least churn?"},
        {"num": "2", "title": "Extract Firmographics", "desc": "Industry, size, revenue, location, technology stack"},
        {"num": "3", "title": "Map Pain Points", "desc": "What specific problems do they share before buying?"},
        {"num": "4", "title": "Identify Buying Triggers", "desc": "What events make them ready to buy right now?"},
        {"num": "5", "title": "Set Disqualifiers", "desc": "What criteria immediately exclude a prospect?"},
    ]

    for i, s in enumerate(steps):
        y = 120 + i * 175

        card = Image.new("RGBA", (900, 145), (13, 47, 61, 200))
        bg_rgba.paste(Image.alpha_composite(Image.new("RGBA", (900, 145), (0,0,0,0)), card), (90, y), card)
        draw = ImageDraw.Draw(bg_rgba)

        # Number circle
        cx, cy = 140, y + 72
        draw.ellipse([(cx-25, cy-25), (cx+25, cy+25)], fill=ORANGE)
        draw.text((cx, cy), s["num"], font=f_bold_28, fill=WHITE, anchor="mm")

        draw.text((185, y + 30), s["title"], font=f_bold_22, fill=WHITE)
        draw.text((185, y + 65), s["desc"], font=f_reg_16, fill=MUTED)

        if i < 4:
            draw.text((140, y + 155), "↓", font=f_bold_22, fill=ORANGE, anchor="mm")

    draw.text((540, 1010), "Aim for 5-10 defining attributes. No more.", font=f_semi_18, fill=ORANGE, anchor="mm")
    footer(draw)
    path = os.path.join(OUT_DIR, f"{slug}.png")
    bg_rgba.convert("RGB").save(path, "PNG", quality=95)
    return path


def gen_buyer_signals(slug):
    """4 signal types to narrow ICP"""
    bg = get_bg("Abstract dark navy with four distinct signal waves radiating outward, radar concept, minimal, no text")
    bg_rgba = bg.convert("RGBA")
    ov = Image.new("RGBA", (1080, 1080), (0,0,0,0))
    ImageDraw.Draw(ov).rectangle([(0,0),(1080,80)], fill=(7,32,43,220))
    bg_rgba = Image.alpha_composite(bg_rgba, ov)
    draw = ImageDraw.Draw(bg_rgba)
    logo(bg_rgba)
    draw.text((540, 50), "4 SIGNAL TYPES TO NARROW YOUR ICP", font=f_bold_28, fill=WHITE, anchor="mm")

    signals = [
        {"type": "PAIN", "desc": "KPIs slipping, pipeline volatility, missed targets", "example": "Time-to-slate increasing quarter over quarter", "color": "#cc4444"},
        {"type": "MONEY", "desc": "Budget confirmed, high ACV, funding round closed", "example": "Retained search firms billing $8K+ retainers", "color": "#44aa66"},
        {"type": "REACH", "desc": "Decision-maker accessible, warm intro possible", "example": "CEO active on LinkedIn, 2nd-degree connection", "color": "#38bdf8"},
        {"type": "FIT", "desc": "Industry match, tech stack compatible, use case proven", "example": "Same vertical as your top 3 customers", "color": ORANGE},
    ]

    for i, s in enumerate(signals):
        y = 120 + i * 220

        card = Image.new("RGBA", (960, 190), (13, 47, 61, 200))
        bg_rgba.paste(Image.alpha_composite(Image.new("RGBA", (960, 190), (0,0,0,0)), card), (60, y), card)
        draw = ImageDraw.Draw(bg_rgba)

        draw.rectangle([(60, y), (68, y + 190)], fill=s["color"])
        draw.text((90, y + 20), s["type"], font=f_bold_36, fill=s["color"])
        draw.text((90, y + 70), s["desc"], font=f_semi_18, fill=WHITE)
        draw.rectangle([(90, y + 115), (94, y + 132)], fill=s["color"])
        draw.text((105, y + 115), f"Example: {s['example']}", font=f_reg_16, fill=MUTED)

    draw.text((540, 1020), "Score each 1-5. Prospects scoring 15+ convert fastest.", font=f_semi_18, fill=ORANGE, anchor="mm")
    footer(draw)
    path = os.path.join(OUT_DIR, f"{slug}.png")
    bg_rgba.convert("RGB").save(path, "PNG", quality=95)
    return path


def gen_icp_scoring(slug):
    """ICP scoring matrix"""
    bg = get_bg("Abstract dark navy with grid/matrix pattern, scoring dashboard aesthetic, no text, minimal dark design")
    bg_rgba = bg.convert("RGBA")
    ov = Image.new("RGBA", (1080, 1080), (0,0,0,0))
    ImageDraw.Draw(ov).rectangle([(0,0),(1080,80)], fill=(7,32,43,220))
    bg_rgba = Image.alpha_composite(bg_rgba, ov)
    draw = ImageDraw.Draw(bg_rgba)
    logo(bg_rgba)
    draw.text((540, 50), "ICP SCORING MATRIX", font=f_bold_28, fill=WHITE, anchor="mm")

    dimensions = [
        {"name": "PAIN", "low": "No visible problem", "mid": "Aware but not urgent", "high": "Actively trying to solve", "color": "#cc4444"},
        {"name": "MONEY", "low": "No budget / early stage", "mid": "Budget exists, not allocated", "high": "Budget confirmed or implied", "color": "#44aa66"},
        {"name": "REACH", "low": "No way to contact", "mid": "Cold outreach possible", "high": "Warm intro or inbound", "color": "#38bdf8"},
        {"name": "FIT", "low": "Wrong industry/size", "mid": "Partial match", "high": "Exact ICP match", "color": ORANGE},
    ]

    header_y = 110
    draw.text((200, header_y), "DIMENSION", font=f_mono_14, fill=MUTED)
    draw.text((450, header_y), "SCORE 1-2", font=f_mono_14, fill="#cc4444")
    draw.text((650, header_y), "SCORE 3", font=f_mono_14, fill="#cc8844")
    draw.text((850, header_y), "SCORE 4-5", font=f_mono_14, fill="#44aa66")

    for i, d in enumerate(dimensions):
        y = 160 + i * 200

        card = Image.new("RGBA", (960, 170), (13, 47, 61, 200))
        bg_rgba.paste(Image.alpha_composite(Image.new("RGBA", (960, 170), (0,0,0,0)), card), (60, y), card)
        draw = ImageDraw.Draw(bg_rgba)

        draw.text((90, y + 20), d["name"], font=f_bold_28, fill=d["color"])

        # Three score columns
        draw.text((90, y + 70), d["low"], font=f_reg_16, fill="#cc4444")
        draw.text((90, y + 100), d["mid"], font=f_reg_16, fill="#cc8844")
        draw.text((90, y + 130), d["high"], font=f_reg_16, fill="#44aa66")

        # Score indicators
        for j in range(5):
            sx = 800 + j * 30
            fill_color = d["color"] if j < 3 else (26, 64, 80)
            draw.rounded_rectangle([(sx, y + 25), (sx + 22, y + 45)], radius=3, fill=fill_color)

    draw.text((540, 1000), "Total /20 — prospects scoring 15+ are priority targets.", font=f_semi_18, fill=ORANGE, anchor="mm")
    footer(draw)
    path = os.path.join(OUT_DIR, f"{slug}.png")
    bg_rgba.convert("RGB").save(path, "PNG", quality=95)
    return path


def gen_job_titles(slug):
    """Job titles vs full ICP profiles"""
    bg = get_bg("Abstract dark navy with split composition, left side simple shapes, right side complex layered shapes, representing depth, no text, minimal")
    bg_rgba = bg.convert("RGBA")
    ov = Image.new("RGBA", (1080, 1080), (0,0,0,0))
    ImageDraw.Draw(ov).rectangle([(0,0),(1080,80)], fill=(7,32,43,220))
    bg_rgba = Image.alpha_composite(bg_rgba, ov)
    draw = ImageDraw.Draw(bg_rgba)
    logo(bg_rgba)
    draw.text((540, 50), "JOB TITLES vs FULL ICP PROFILES", font=f_bold_28, fill=WHITE, anchor="mm")

    # Left: Job Titles Only
    left_x = 60
    draw.text((left_x + 230, 120), "JOB TITLE ONLY", font=f_mono_14, fill="#cc4444", anchor="mm")
    left_items = [
        "CEO", "VP Sales", "Head of Marketing", "CTO", "Founder"
    ]
    for i, item in enumerate(left_items):
        y = 160 + i * 80
        card = Image.new("RGBA", (430, 60), (13, 47, 61, 200))
        bg_rgba.paste(Image.alpha_composite(Image.new("RGBA", (430, 60), (0,0,0,0)), card), (left_x, y), card)
        draw = ImageDraw.Draw(bg_rgba)
        draw.text((left_x + 20, y + 20), f"→ {item}", font=f_semi_18, fill=MUTED)
        draw.text((left_x + 400, y + 20), "Static", font=f_mono_12, fill="#cc4444", anchor="ra")

    draw.text((left_x + 215, 580), "Same today. Same last year.", font=f_reg_16, fill="#cc4444", anchor="mm")

    # Divider
    draw.line([(520, 110), (520, 620)], fill=ORANGE, width=2)
    draw.text((540, 640), "vs", font=f_bold_22, fill=ORANGE, anchor="mm")

    # Right: Full ICP Profile
    right_x = 570
    draw.text((right_x + 230, 120), "FULL ICP PROFILE", font=f_mono_14, fill="#44aa66", anchor="mm")
    right_items = [
        ("Pain signals", "KPIs dropping, team struggles"),
        ("Money signals", "Budget confirmed, funding raised"),
        ("Timing signals", "Hiring SDR, new CTO appointed"),
        ("Fit signals", "Same vertical as top clients"),
        ("Reach signals", "Active on LinkedIn, 2nd degree"),
    ]
    for i, (title, desc) in enumerate(right_items):
        y = 160 + i * 80
        card = Image.new("RGBA", (450, 60), (13, 47, 61, 200))
        bg_rgba.paste(Image.alpha_composite(Image.new("RGBA", (450, 60), (0,0,0,0)), card), (right_x, y), card)
        draw = ImageDraw.Draw(bg_rgba)
        draw.text((right_x + 20, y + 12), f"→ {title}", font=f_semi_18, fill=WHITE)
        draw.text((right_x + 20, y + 36), desc, font=f_reg_16, fill=MUTED)

    draw.text((right_x + 225, 580), "Dynamic. Changes weekly.", font=f_reg_16, fill="#44aa66", anchor="mm")

    # Bottom insight
    y_bottom = 700
    card = Image.new("RGBA", (960, 300), (13, 47, 61, 200))
    bg_rgba.paste(Image.alpha_composite(Image.new("RGBA", (960, 300), (0,0,0,0)), card), (60, y_bottom), card)
    draw = ImageDraw.Draw(bg_rgba)

    draw.text((540, y_bottom + 40), "THE RESULT", font=f_mono_14, fill=ORANGE, anchor="mm")

    results = [
        ("Title-only targeting:", "1-3% reply rate", "#cc4444"),
        ("Full ICP + signals:", "5-12% reply rate", "#44aa66"),
    ]
    for i, (label, value, color) in enumerate(results):
        ry = y_bottom + 80 + i * 70
        draw.text((200, ry), label, font=f_semi_18, fill=MUTED)
        draw.text((700, ry), value, font=f_bold_28, fill=color)

    draw.text((540, y_bottom + 250), "Same ICP. Different depth. Different results.", font=f_semi_18, fill=ORANGE, anchor="mm")

    footer(draw)
    path = os.path.join(OUT_DIR, f"{slug}.png")
    bg_rgba.convert("RGB").save(path, "PNG", quality=95)
    return path


if __name__ == "__main__":
    batch = [
        ("cold-email-tools-compared-smartlead-vs-clay-vs-instantly-2026", gen_tools_compared),
        ("beginner-guide-icp-cold-email-2026", gen_icp_beginner),
        ("buyer-signals-narrow-icp", gen_buyer_signals),
        ("icp-scoring-pain-money-fit-2026", gen_icp_scoring),
        ("why-job-titles-arent-enough-building-full-icp-profiles-in-2026", gen_job_titles),
    ]
    for slug, fn in batch:
        print(f"Generating: {slug}...")
        path = fn(slug)
        print(f"  OK: {path}")
    print(f"\nBatch 2 complete: {len(batch)} infographics")
