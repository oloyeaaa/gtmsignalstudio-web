"""
Batch 4 (final): Infographics for posts 16-21
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


def gen_deliverability_framework(slug):
    """Cold email deliverability framework — 3 layers"""
    bg = get_bg("Abstract dark navy with three horizontal architectural layers, building foundation concept, no text, minimal")
    r = bg.convert("RGBA")
    ov = Image.new("RGBA", (1080,1080), (0,0,0,0)); ImageDraw.Draw(ov).rectangle([(0,0),(1080,80)], fill=(7,32,43,220))
    r = Image.alpha_composite(r, ov); d = ImageDraw.Draw(r)
    logo(r); d.text((540, 50), "DELIVERABILITY FRAMEWORK", font=f_bold_28, fill=WHITE, anchor="mm")

    layers = [
        {"name": "LAYER 1: AUTHENTICATION", "items": ["SPF record configured", "DKIM signing enabled", "DMARC policy set (quarantine/reject)", "One-click unsubscribe header"], "color": "#44aa66"},
        {"name": "LAYER 2: INFRASTRUCTURE", "items": ["Separate outbound domain", "2-3 domains, 3 mailboxes each", "4-week warmup per domain", "Max 50 emails/mailbox/day"], "color": "#38bdf8"},
        {"name": "LAYER 3: TARGETING", "items": ["Signal-qualified lists only", "Bounce rate under 2%", "Complaint rate under 0.3%", "Reply rate as primary metric"], "color": ORANGE},
    ]
    for i, l in enumerate(layers):
        y = 110 + i * 300
        card(r, 60, y, 960, 270)
        d = ImageDraw.Draw(r)
        d.rectangle([(60, y), (1020, y + 6)], fill=l["color"])
        d.text((90, y + 25), l["name"], font=f_bold_22, fill=l["color"])
        for j, item in enumerate(l["items"]):
            iy = y + 70 + j * 45
            d.rounded_rectangle([(90, iy), (120, iy + 30)], radius=4, outline=l["color"], width=2)
            d.text((105, iy + 15), "✓", font=f_mono_14, fill=l["color"], anchor="mm")
            d.text((135, iy + 5), item, font=f_reg_18, fill=WHITE)

    d.text((540, 1020), "Fix Layer 1 first. Layer 3 has the biggest long-term impact.", font=f_semi_18, fill=ORANGE, anchor="mm")
    footer(d)
    r.convert("RGB").save(os.path.join(OUT_DIR, f"{slug}.png"), "PNG", quality=95)
    return os.path.join(OUT_DIR, f"{slug}.png")


def gen_signal_icp(slug):
    """Signal-driven ICP — static vs dynamic"""
    bg = get_bg("Abstract dark navy with transformation concept, static grid transforming into dynamic flowing lines, minimal")
    r = bg.convert("RGBA")
    ov = Image.new("RGBA", (1080,1080), (0,0,0,0)); ImageDraw.Draw(ov).rectangle([(0,0),(1080,80)], fill=(7,32,43,220))
    r = Image.alpha_composite(r, ov); d = ImageDraw.Draw(r)
    logo(r); d.text((540, 50), "SIGNAL-DRIVEN ICP FRAMEWORK", font=f_bold_28, fill=WHITE, anchor="mm")

    # Static ICP
    card(r, 60, 110, 460, 400)
    d = ImageDraw.Draw(r)
    d.text((290, 130), "TRADITIONAL ICP", font=f_mono_14, fill="#cc4444", anchor="mm")
    d.text((290, 160), "Static Criteria", font=f_bold_22, fill="#cc4444", anchor="mm")
    static_items = ["Industry: B2B Services", "Size: 10-200 employees", "Revenue: $1M+", "Title: CEO / VP Sales", "Location: UK"]
    for i, item in enumerate(static_items):
        d.text((90, 200 + i * 38), f"→ {item}", font=f_reg_16, fill=MUTED)
    d.text((290, 450), "Reply rate: 1-3%", font=f_bold_22, fill="#cc4444", anchor="mm")

    # Arrow
    d.text((540, 310), "→", font=f_bold_36, fill=ORANGE, anchor="mm")

    # Signal ICP
    card(r, 560, 110, 460, 400)
    d = ImageDraw.Draw(r)
    d.text((790, 130), "SIGNAL-DRIVEN ICP", font=f_mono_14, fill="#44aa66", anchor="mm")
    d.text((790, 160), "Dynamic Criteria", font=f_bold_22, fill="#44aa66", anchor="mm")
    signal_items = ["+ Just hired VP of Sales", "+ Raised Series A last month", "+ New CTO appointed", "+ Migrating from HubSpot", "+ Active on LinkedIn daily"]
    for i, item in enumerate(signal_items):
        d.text((590, 200 + i * 38), f"→ {item}", font=f_reg_16, fill=WHITE)
    d.text((790, 450), "Reply rate: 5-12%", font=f_bold_22, fill="#44aa66", anchor="mm")

    # Bottom framework
    card(r, 60, 560, 960, 400)
    d = ImageDraw.Draw(r)
    d.text((540, 590), "THE FRAMEWORK", font=f_mono_14, fill=ORANGE, anchor="mm")
    steps = [
        ("1. Define static ICP", "Industry, size, revenue — your baseline"),
        ("2. Add 3 buying signals", "Hiring, funding, leadership changes"),
        ("3. Build detection routine", "15 min scan, twice per week"),
        ("4. Reference signal in email 1", "Makes your email not-cold"),
    ]
    for i, (step, desc) in enumerate(steps):
        sy = 630 + i * 70
        d.text((100, sy), step, font=f_semi_18, fill=WHITE)
        d.text((100, sy + 28), desc, font=f_reg_16, fill=MUTED)

    footer(d)
    r.convert("RGB").save(os.path.join(OUT_DIR, f"{slug}.png"), "PNG", quality=95)
    return os.path.join(OUT_DIR, f"{slug}.png")


def gen_automation(slug):
    """Business functions automation — priority matrix"""
    bg = get_bg("Abstract dark navy with gear/cog mechanical shapes and circuit patterns, automation concept, minimal")
    r = bg.convert("RGBA")
    ov = Image.new("RGBA", (1080,1080), (0,0,0,0)); ImageDraw.Draw(ov).rectangle([(0,0),(1080,80)], fill=(7,32,43,220))
    r = Image.alpha_composite(r, ov); d = ImageDraw.Draw(r)
    logo(r); d.text((540, 50), "AUTOMATION PRIORITY MATRIX", font=f_bold_28, fill=WHITE, anchor="mm")

    functions = [
        {"name": "Lead Qualification", "impact": "HIGH", "effort": "LOW", "priority": 1, "color": "#44aa66"},
        {"name": "Email Sequences", "impact": "HIGH", "effort": "LOW", "priority": 2, "color": "#44aa66"},
        {"name": "Data Enrichment", "impact": "HIGH", "effort": "MED", "priority": 3, "color": ORANGE},
        {"name": "Reporting & Analytics", "impact": "MED", "effort": "LOW", "priority": 4, "color": ORANGE},
        {"name": "Customer Onboarding", "impact": "MED", "effort": "MED", "priority": 5, "color": "#cc8844"},
        {"name": "Content Scheduling", "impact": "MED", "effort": "LOW", "priority": 6, "color": ORANGE},
        {"name": "Invoice & Billing", "impact": "LOW", "effort": "LOW", "priority": 7, "color": MUTED},
        {"name": "Social Listening", "impact": "LOW", "effort": "HIGH", "priority": 8, "color": MUTED},
    ]

    for i, f in enumerate(functions):
        y = 110 + i * 110
        card(r, 60, y, 960, 90)
        d = ImageDraw.Draw(r)

        # Priority badge
        cx, cy = 110, y + 45
        d.ellipse([(cx-18, cy-18), (cx+18, cy+18)], fill=f["color"])
        d.text((cx, cy), str(f["priority"]), font=f_bold_22, fill=WHITE, anchor="mm")

        # Name
        d.text((150, y + 20), f["name"], font=f_bold_22, fill=WHITE)

        # Impact + Effort tags
        d.text((700, y + 25), f"Impact: {f['impact']}", font=f_mono_12, fill=f["color"])
        d.text((850, y + 25), f"Effort: {f['effort']}", font=f_mono_12, fill=MUTED)

        # Bar
        bar_pct = {1: 95, 2: 90, 3: 80, 4: 65, 5: 55, 6: 50, 7: 30, 8: 20}
        bw = int(bar_pct[f["priority"]] / 100 * 800)
        d.rectangle([(150, y + 60), (150 + bw, y + 68)], fill=f["color"])

    d.text((540, 1010), "Automate high-impact, low-effort functions first.", font=f_semi_18, fill=ORANGE, anchor="mm")
    footer(d)
    r.convert("RGB").save(os.path.join(OUT_DIR, f"{slug}.png"), "PNG", quality=95)
    return os.path.join(OUT_DIR, f"{slug}.png")


def gen_signal_logic(slug):
    """Signal logic — filter diagram"""
    bg = get_bg("Abstract dark navy with funnel/filter concept, wide top narrowing to precise bottom, data flowing through, minimal")
    r = bg.convert("RGBA")
    ov = Image.new("RGBA", (1080,1080), (0,0,0,0)); ImageDraw.Draw(ov).rectangle([(0,0),(1080,80)], fill=(7,32,43,220))
    r = Image.alpha_composite(r, ov); d = ImageDraw.Draw(r)
    logo(r); d.text((540, 50), "SIGNAL LOGIC: THE FILTER", font=f_bold_28, fill=WHITE, anchor="mm")

    stages = [
        {"name": "RAW DATA", "count": "10,000", "desc": "Job titles, company lists, industry codes", "width": 900, "color": MUTED},
        {"name": "ICP MATCH", "count": "2,000", "desc": "Firmographic criteria applied", "width": 700, "color": "#cc8844"},
        {"name": "SIGNAL FILTER", "count": "200", "desc": "Verifiable + timestamped + relevant", "width": 500, "color": ORANGE},
        {"name": "QUALIFIED PIPELINE", "count": "50", "desc": "Active need, right timing, ready to engage", "width": 300, "color": "#44aa66"},
    ]

    for i, s in enumerate(stages):
        y = 120 + i * 210
        x = (1080 - s["width"]) // 2
        card(r, x, y, s["width"], 175)
        d = ImageDraw.Draw(r)

        d.text((x + 20, y + 15), s["name"], font=f_mono_14, fill=s["color"])
        d.text((x + s["width"] - 20, y + 15), s["count"] + " prospects", font=f_bold_22, fill=s["color"], anchor="ra")
        d.text((x + 20, y + 55), s["desc"], font=f_reg_18, fill=WHITE)

        # Three filter tests for signal stage
        if i == 2:
            tests = ["Verifiable?", "< 14 days old?", "Indicates need you solve?"]
            for j, t in enumerate(tests):
                d.text((x + 20, y + 95 + j * 25), f"✓ {t}", font=f_reg_16, fill=ORANGE)

        d.rectangle([(x, y + 170), (x + s["width"], y + 175)], fill=s["color"])

        if i < 3:
            d.text((540, y + 195), "↓", font=f_bold_28, fill=s["color"], anchor="mm")

    d.text((540, 990), "Signal logic is the filter between raw data and revenue.", font=f_semi_18, fill=ORANGE, anchor="mm")
    footer(d)
    r.convert("RGB").save(os.path.join(OUT_DIR, f"{slug}.png"), "PNG", quality=95)
    return os.path.join(OUT_DIR, f"{slug}.png")


def gen_deliverability_2026(slug):
    """2026 deliverability landscape — timeline of changes"""
    bg = get_bg("Abstract dark navy with timeline arrow moving left to right, milestones marked, evolution concept, minimal")
    r = bg.convert("RGBA")
    ov = Image.new("RGBA", (1080,1080), (0,0,0,0)); ImageDraw.Draw(ov).rectangle([(0,0),(1080,80)], fill=(7,32,43,220))
    r = Image.alpha_composite(r, ov); d = ImageDraw.Draw(r)
    logo(r); d.text((540, 50), "DELIVERABILITY IN 2026", font=f_bold_28, fill=WHITE, anchor="mm")

    events = [
        {"date": "FEB 2024", "event": "Gmail requires SPF + DKIM + DMARC", "impact": "Bulk senders must authenticate", "color": "#cc4444"},
        {"date": "MAY 2025", "event": "Outlook enforces same rules", "impact": "Microsoft joins Gmail requirements", "color": ORANGE},
        {"date": "2025-26", "event": "One-click unsubscribe mandatory", "impact": "RFC 8058 required for all marketing email", "color": "#38bdf8"},
        {"date": "NOW", "event": "Spam complaints enforced at 0.3%", "impact": "One bad campaign = weeks of damage", "color": "#cc4444"},
    ]

    for i, e in enumerate(events):
        y = 120 + i * 170
        card(r, 60, y, 960, 140)
        d = ImageDraw.Draw(r)
        d.rectangle([(60, y), (68, y + 140)], fill=e["color"])
        d.text((90, y + 15), e["date"], font=f_mono_14, fill=e["color"])
        d.text((90, y + 45), e["event"], font=f_bold_22, fill=WHITE)
        d.text((90, y + 85), e["impact"], font=f_reg_16, fill=MUTED)

    # Bottom: the real factor
    card(r, 60, 820, 960, 150)
    d = ImageDraw.Draw(r)
    d.text((540, 850), "THE REAL FACTOR", font=f_mono_14, fill=ORANGE, anchor="mm")
    d.text((540, 890), "Targeting quality > technical setup", font=f_bold_28, fill=WHITE, anchor="mm")
    d.text((540, 930), "If 80% of recipients need what you sell, deliverability takes care of itself.", font=f_reg_16, fill=MUTED, anchor="mm")

    footer(d)
    r.convert("RGB").save(os.path.join(OUT_DIR, f"{slug}.png"), "PNG", quality=95)
    return os.path.join(OUT_DIR, f"{slug}.png")


def gen_claude_memory(slug):
    """Claude Code memory — 4-layer system"""
    bg = get_bg("Abstract dark navy with four concentric layers or rings, memory/knowledge layers concept, AI brain aesthetic, minimal")
    r = bg.convert("RGBA")
    ov = Image.new("RGBA", (1080,1080), (0,0,0,0)); ImageDraw.Draw(ov).rectangle([(0,0),(1080,80)], fill=(7,32,43,220))
    r = Image.alpha_composite(r, ov); d = ImageDraw.Draw(r)
    logo(r); d.text((540, 50), "4-LAYER MEMORY SYSTEM", font=f_bold_28, fill=WHITE, anchor="mm")

    layers = [
        {"num": "1", "name": "CLAUDE.md", "type": "Project Rules", "desc": "Coding standards, architecture, preferred patterns", "written_by": "You (manual)", "color": ORANGE},
        {"num": "2", "name": "User Memory", "type": "Preferences", "desc": "Your personal patterns, style, role context", "written_by": "You (manual)", "color": "#38bdf8"},
        {"num": "3", "name": "Feedback Memory", "type": "Corrections", "desc": "Guidance you gave — 'don't do X, instead do Y'", "written_by": "You → Claude stores", "color": "#a855f7"},
        {"num": "4", "name": "Auto Memory", "type": "Learnings", "desc": "Patterns Claude discovers: build commands, test paths", "written_by": "Claude (automatic)", "color": "#44aa66"},
    ]

    for i, l in enumerate(layers):
        y = 110 + i * 215
        card(r, 60, y, 960, 185)
        d = ImageDraw.Draw(r)

        # Layer number
        cx, cy = 115, y + 92
        d.ellipse([(cx-28, cy-28), (cx+28, cy+28)], fill=l["color"])
        d.text((cx, cy), l["num"], font=f_bold_28, fill=WHITE, anchor="mm")

        d.text((165, y + 15), f"LAYER {l['num']}", font=f_mono_14, fill=l["color"])
        d.text((165, y + 40), l["name"], font=f_bold_28, fill=WHITE)
        d.text((165, y + 80), l["type"], font=f_semi_18, fill=l["color"])
        d.text((165, y + 110), l["desc"], font=f_reg_16, fill=MUTED)
        d.text((165, y + 145), f"Written by: {l['written_by']}", font=f_mono_12, fill=MUTED)

    d.text((540, 990), "Each layer persists across conversations.", font=f_semi_18, fill=ORANGE, anchor="mm")
    footer(d)
    r.convert("RGB").save(os.path.join(OUT_DIR, f"{slug}.png"), "PNG", quality=95)
    return os.path.join(OUT_DIR, f"{slug}.png")


if __name__ == "__main__":
    batch = [
        ("cold-email-deliverability-framework", gen_deliverability_framework),
        ("signal-driven-icp-framework", gen_signal_icp),
        ("business-functions-need-automation-2026", gen_automation),
        ("signal-logic-the-filter-between-raw-data-and-qualified-pipeline", gen_signal_logic),
        ("cold-email-deliverability-2026-infrastructure", gen_deliverability_2026),
        ("claude-code-memory-system", gen_claude_memory),
    ]
    for slug, fn in batch:
        print(f"Generating: {slug}...")
        print(f"  OK: {fn(slug)}")
    print(f"\nBatch 4 (final) complete: {len(batch)} infographics")
