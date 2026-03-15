"""
Batch 3: Infographics for posts 11-15
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

ORANGE = "#f17021"; WHITE = "#ffffff"; MUTED = "#7a9aaa"; NAVY = "#07202b"

f_bold_36 = ImageFont.truetype(os.path.join(FONTS_DIR, "Montserrat-Bold.ttf"), 36)
f_bold_28 = ImageFont.truetype(os.path.join(FONTS_DIR, "Montserrat-Bold.ttf"), 28)
f_bold_22 = ImageFont.truetype(os.path.join(FONTS_DIR, "Montserrat-Bold.ttf"), 22)
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
    except: pass
    return Image.new("RGB", (1080, 1080), NAVY)

def logo(img):
    l = Image.open(LOGO_PATH).convert("RGBA"); lh = 40; lw = int(lh*(l.width/l.height))
    l = l.resize((lw, lh), Image.LANCZOS); img.paste(l, (40, 30), l)

def footer(draw): draw.text((540, 1060), "gtmsignalstudio.com", font=f_mono_12, fill=ORANGE, anchor="mm")

def card(bg, x, y, w, h, alpha=200):
    c = Image.new("RGBA", (w, h), (13, 47, 61, alpha))
    bg.paste(Image.alpha_composite(Image.new("RGBA", (w, h), (0,0,0,0)), c), (x, y), c)


def gen_icp_card(slug):
    """ICP Card — card/document template visual"""
    bg = get_bg("Abstract dark navy with clipboard or card document outline, structured form layout, minimal, no text")
    r = bg.convert("RGBA")
    ov = Image.new("RGBA", (1080,1080), (0,0,0,0)); ImageDraw.Draw(ov).rectangle([(0,0),(1080,80)], fill=(7,32,43,220))
    r = Image.alpha_composite(r, ov); d = ImageDraw.Draw(r)
    logo(r); d.text((540, 50), "THE ICP CARD TEMPLATE", font=f_bold_28, fill=WHITE, anchor="mm")

    sections = [
        ("FIRMOGRAPHICS", ["Industry: B2B Services", "Size: 10-200 employees", "Revenue: $1M-$50M", "Location: UK / US"], "#44aa66"),
        ("PAIN POINTS", ["Pipeline volatility", "Outbound not working", "No system for lead gen", "Wasting budget on tactics"], "#cc4444"),
        ("BUYING TRIGGERS", ["Hiring SDR/BDM", "Just raised funding", "New CTO/CMO appointed", "Competitor lost"], ORANGE),
        ("DISQUALIFIERS", ["<10 employees", "No outbound budget", "Already using competitor", "Wrong industry vertical"], MUTED),
    ]
    for i, (title, items, color) in enumerate(sections):
        col = i % 2; row = i // 2
        x = 60 + col * 500; y = 120 + row * 440
        card(r, x, y, 460, 400)
        d = ImageDraw.Draw(r)
        d.rectangle([(x, y), (x + 460, y + 5)], fill=color)
        d.text((x + 20, y + 25), title, font=f_mono_14, fill=color)
        for j, item in enumerate(items):
            d.text((x + 20, y + 65 + j * 45), f"→ {item}", font=f_reg_18, fill=WHITE if j < 3 else MUTED)
        d.text((x + 20, y + 260), "Score: ____/5", font=f_mono_14, fill=MUTED)

    d.text((540, 1010), "One page. Four sections. Qualify in 60 seconds.", font=f_semi_18, fill=ORANGE, anchor="mm")
    footer(d)
    r.convert("RGB").save(os.path.join(OUT_DIR, f"{slug}.png"), "PNG", quality=95)
    return os.path.join(OUT_DIR, f"{slug}.png")


def gen_signal_types(slug):
    """5 types of GTM signals"""
    bg = get_bg("Abstract dark navy with five signal waves at different frequencies, radar/sonar concept, minimal")
    r = bg.convert("RGBA")
    ov = Image.new("RGBA", (1080,1080), (0,0,0,0)); ImageDraw.Draw(ov).rectangle([(0,0),(1080,80)], fill=(7,32,43,220))
    r = Image.alpha_composite(r, ov); d = ImageDraw.Draw(r)
    logo(r); d.text((540, 50), "5 TYPES OF GTM SIGNALS", font=f_bold_28, fill=WHITE, anchor="mm")

    sigs = [
        ("HIRING", "New sales/marketing roles posted", "Proves budget allocation", ORANGE),
        ("FUNDING", "Investment round closed", "Budget + growth pressure", "#44aa66"),
        ("LEADERSHIP", "C-suite appointment or change", "90-day evaluation window", "#38bdf8"),
        ("TECHNOLOGY", "Tool migration or adoption", "Infrastructure in flux", "#a855f7"),
        ("ENGAGEMENT", "Content consumption, event attendance", "Active research phase", "#cc8844"),
    ]
    for i, (name, desc, implication, color) in enumerate(sigs):
        y = 110 + i * 180
        card(r, 60, y, 960, 155)
        d = ImageDraw.Draw(r)
        cx, cy = 115, y + 78
        d.ellipse([(cx-25, cy-25), (cx+25, cy+25)], fill=color)
        d.text((cx, cy), str(i+1), font=f_bold_22, fill=WHITE, anchor="mm")
        d.text((160, y + 20), name, font=f_bold_28, fill=color)
        d.text((160, y + 60), desc, font=f_semi_18, fill=WHITE)
        d.rectangle([(160, y + 100), (164, y + 115)], fill=color)
        d.text((175, y + 100), f"Why it matters: {implication}", font=f_reg_16, fill=MUTED)

    d.text((540, 1020), "Track 3 signals. Detect within 14 days. Reference in email 1.", font=f_semi_18, fill=ORANGE, anchor="mm")
    footer(d)
    r.convert("RGB").save(os.path.join(OUT_DIR, f"{slug}.png"), "PNG", quality=95)
    return os.path.join(OUT_DIR, f"{slug}.png")


def gen_gtm_fail(slug):
    """Why GTM strategies fail — anti-pattern vs signal pattern"""
    bg = get_bg("Abstract dark navy split in half, left side chaotic scattered dots, right side organized converging lines, contrast concept")
    r = bg.convert("RGBA")
    ov = Image.new("RGBA", (1080,1080), (0,0,0,0)); ImageDraw.Draw(ov).rectangle([(0,0),(1080,80)], fill=(7,32,43,220))
    r = Image.alpha_composite(r, ov); d = ImageDraw.Draw(r)
    logo(r); d.text((540, 50), "WHY GTM STRATEGIES FAIL", font=f_bold_28, fill=WHITE, anchor="mm")

    # Left: What fails
    d.text((270, 120), "WHAT FAILS", font=f_mono_14, fill="#cc4444", anchor="mm")
    fails = [
        "Targeting by job title only",
        "Blasting 1,000+ emails weekly",
        "Generic 'we help companies like yours'",
        "No signal, no timing, no reason",
        "Measuring opens instead of replies",
    ]
    for i, f in enumerate(fails):
        y = 160 + i * 110
        card(r, 60, y, 450, 85)
        d = ImageDraw.Draw(r)
        d.text((80, y + 30), f"✗  {f}", font=f_reg_18, fill="#cc4444")

    d.line([(530, 110), (530, 750)], fill=ORANGE, width=2)

    # Right: What works
    d.text((790, 120), "WHAT WORKS", font=f_mono_14, fill="#44aa66", anchor="mm")
    works = [
        "Signal-filtered targeting",
        "50 precise emails per week",
        "Reference the specific trigger",
        "Contact when they have active need",
        "Reply rate as primary metric",
    ]
    for i, w in enumerate(works):
        y = 160 + i * 110
        card(r, 570, y, 450, 85)
        d = ImageDraw.Draw(r)
        d.text((590, y + 30), f"✓  {w}", font=f_reg_18, fill="#44aa66")

    # Bottom comparison
    card(r, 60, 780, 960, 200)
    d = ImageDraw.Draw(r)
    d.text((540, 810), "THE DIFFERENCE", font=f_mono_14, fill=ORANGE, anchor="mm")
    d.text((300, 860), "Volume play:", font=f_semi_18, fill=MUTED, anchor="rm")
    d.text((310, 860), "1-3% reply rate", font=f_bold_22, fill="#cc4444")
    d.text((300, 910), "Signal-led:", font=f_semi_18, fill=MUTED, anchor="rm")
    d.text((310, 910), "5-12% reply rate", font=f_bold_22, fill="#44aa66")

    footer(d)
    r.convert("RGB").save(os.path.join(OUT_DIR, f"{slug}.png"), "PNG", quality=95)
    return os.path.join(OUT_DIR, f"{slug}.png")


def gen_emails_ignored(slug):
    """Why emails get ignored — timing diagram"""
    bg = get_bg("Abstract dark navy with clock/time concept, urgency fading from left to right, minimal dark design")
    r = bg.convert("RGBA")
    ov = Image.new("RGBA", (1080,1080), (0,0,0,0)); ImageDraw.Draw(ov).rectangle([(0,0),(1080,80)], fill=(7,32,43,220))
    r = Image.alpha_composite(r, ov); d = ImageDraw.Draw(r)
    logo(r); d.text((540, 50), "WHY YOUR EMAILS GET IGNORED", font=f_bold_28, fill=WHITE, anchor="mm")

    # The insight
    card(r, 60, 110, 960, 150)
    d = ImageDraw.Draw(r)
    d.text((540, 155), "It is not the copy. It is the timing.", font=f_bold_36, fill=ORANGE, anchor="mm")
    d.text((540, 210), "61% of B2B buyers prefer a rep-free experience.", font=f_reg_18, fill=MUTED, anchor="mm")

    # Three scenarios
    scenarios = [
        {"label": "NO NEED", "reply": "0%", "desc": "Prospect has no active problem. Email deleted in 2 seconds.", "color": "#cc4444"},
        {"label": "VAGUE NEED", "reply": "1-3%", "desc": "Prospect aware of problem but not prioritising. Might read, won't reply.", "color": "#cc8844"},
        {"label": "ACTIVE NEED", "reply": "5-12%", "desc": "Prospect triggered by a signal. Your email arrives at the right moment.", "color": "#44aa66"},
    ]
    for i, s in enumerate(scenarios):
        y = 310 + i * 200
        card(r, 60, y, 960, 170)
        d = ImageDraw.Draw(r)
        d.rectangle([(60, y), (68, y + 170)], fill=s["color"])
        d.text((100, y + 20), s["label"], font=f_mono_14, fill=s["color"])
        d.text((100, y + 50), f"Reply rate: {s['reply']}", font=f_bold_28, fill=s["color"])
        d.text((100, y + 100), s["desc"], font=f_reg_16, fill=MUTED)
        # Bar width
        bar_pct = {"0%": 0, "1-3%": 15, "5-12%": 60}
        bw = int(bar_pct.get(s["reply"], 0) / 100 * 850)
        d.rectangle([(100, y + 140), (100 + bw, y + 148)], fill=s["color"])
        d.rectangle([(100 + bw, y + 140), (950, y + 148)], fill=(26, 64, 80))

    d.text((540, 1010), "The single biggest factor: does the prospect have an active need?", font=f_semi_18, fill=ORANGE, anchor="mm")
    footer(d)
    r.convert("RGB").save(os.path.join(OUT_DIR, f"{slug}.png"), "PNG", quality=95)
    return os.path.join(OUT_DIR, f"{slug}.png")


def gen_signal_gtm(slug):
    """Signal-Based GTM — the complete framework"""
    bg = get_bg("Abstract dark navy with interconnected nodes and signal paths, network/system diagram aesthetic, minimal dark")
    r = bg.convert("RGBA")
    ov = Image.new("RGBA", (1080,1080), (0,0,0,0)); ImageDraw.Draw(ov).rectangle([(0,0),(1080,80)], fill=(7,32,43,220))
    r = Image.alpha_composite(r, ov); d = ImageDraw.Draw(r)
    logo(r); d.text((540, 50), "SIGNAL-BASED GTM FRAMEWORK", font=f_bold_28, fill=WHITE, anchor="mm")

    steps = [
        ("DETECT", "Monitor 3 buying signals", "LinkedIn Jobs, Crunchbase, press releases", ORANGE),
        ("QUALIFY", "Filter by ICP + signal strength", "Score pain, money, reach, fit (1-5 each)", "#38bdf8"),
        ("REFERENCE", "Signal goes in email line 1", "'You hired a VP of Sales last week'", "#44aa66"),
        ("DELIVER", "First email is a gift, not a pitch", "Free audit, diagnostic, or benchmark", "#a855f7"),
        ("MEASURE", "Reply rate is the only metric", "10% on 50 emails > 1% on 5,000", "#cc8844"),
    ]
    for i, (name, desc, detail, color) in enumerate(steps):
        y = 110 + i * 175
        card(r, 60, y, 960, 145)
        d = ImageDraw.Draw(r)
        # Step circle
        cx, cy = 115, y + 72
        d.ellipse([(cx-25, cy-25), (cx+25, cy+25)], fill=color)
        d.text((cx, cy), str(i+1), font=f_bold_22, fill=WHITE, anchor="mm")
        d.text((160, y + 20), name, font=f_bold_28, fill=color)
        d.text((160, y + 60), desc, font=f_semi_18, fill=WHITE)
        d.text((160, y + 95), detail, font=f_reg_16, fill=MUTED)
        if i < 4:
            d.text((115, y + 155), "↓", font=f_bold_22, fill=ORANGE, anchor="mm")

    d.text((540, 1010), "First to contact after a trigger event wins 5x more often.", font=f_semi_18, fill=ORANGE, anchor="mm")
    footer(d)
    r.convert("RGB").save(os.path.join(OUT_DIR, f"{slug}.png"), "PNG", quality=95)
    return os.path.join(OUT_DIR, f"{slug}.png")


if __name__ == "__main__":
    batch = [
        ("build-validate-icp-card-2026", gen_icp_card),
        ("types-of-gtm-signals", gen_signal_types),
        ("why-gtm-strategies-fail", gen_gtm_fail),
        ("why-cold-emails-get-ignored-timing-not-copy", gen_emails_ignored),
        ("signal-based-gtm", gen_signal_gtm),
    ]
    for slug, fn in batch:
        print(f"Generating: {slug}...")
        print(f"  OK: {fn(slug)}")
    print(f"\nBatch 3 complete: {len(batch)} infographics")
