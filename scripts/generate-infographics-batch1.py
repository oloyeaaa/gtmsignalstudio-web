"""
Batch 1: Generate infographic images for first 5 posts
fal.ai atmospheric background + Pillow data overlay
"""
import requests
import os
import io
from PIL import Image, ImageDraw, ImageFont, ImageEnhance

FONTS_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "fonts")
LOGO_PATH = os.path.join(os.path.dirname(__file__), "..", "public", "gss-logo.png")
OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "blog-images", "infographics")
os.makedirs(OUT_DIR, exist_ok=True)

# Load env for fal.ai
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

# Brand
ORANGE = "#f17021"
WHITE = "#ffffff"
MUTED = "#7a9aaa"
NAVY = "#07202b"

# Fonts
f_bold_36 = ImageFont.truetype(os.path.join(FONTS_DIR, "Montserrat-Bold.ttf"), 36)
f_bold_28 = ImageFont.truetype(os.path.join(FONTS_DIR, "Montserrat-Bold.ttf"), 28)
f_bold_22 = ImageFont.truetype(os.path.join(FONTS_DIR, "Montserrat-Bold.ttf"), 22)
f_semi_20 = ImageFont.truetype(os.path.join(FONTS_DIR, "Montserrat-SemiBold.ttf"), 20)
f_semi_18 = ImageFont.truetype(os.path.join(FONTS_DIR, "Montserrat-SemiBold.ttf"), 18)
f_reg_18 = ImageFont.truetype(os.path.join(FONTS_DIR, "Montserrat-Regular.ttf"), 18)
f_reg_16 = ImageFont.truetype(os.path.join(FONTS_DIR, "Montserrat-Regular.ttf"), 16)
f_mono_14 = ImageFont.truetype(os.path.join(FONTS_DIR, "RobotoMono-Bold.ttf"), 14)
f_mono_12 = ImageFont.truetype(os.path.join(FONTS_DIR, "RobotoMono-Regular.ttf"), 12)


def get_fal_background(prompt):
    """Get atmospheric background from fal.ai"""
    try:
        resp = requests.post(
            "https://fal.run/fal-ai/nano-banana",
            headers={"Authorization": f"Key {FAL_KEY}", "Content-Type": "application/json"},
            json={"prompt": prompt, "image_size": "square", "num_images": 1},
            timeout=30,
        )
        if resp.status_code == 200:
            url = resp.json()["images"][0]["url"]
            img_data = requests.get(url, timeout=15).content
            bg = Image.open(io.BytesIO(img_data)).convert("RGB").resize((1080, 1080), Image.LANCZOS)
            bg = ImageEnhance.Brightness(bg).enhance(0.4)
            return bg
    except Exception as e:
        print(f"  fal.ai failed: {e}")
    return Image.new("RGB", (1080, 1080), NAVY)


def add_logo(img):
    logo = Image.open(LOGO_PATH).convert("RGBA")
    logo_h = 40
    logo_w = int(logo_h * (logo.width / logo.height))
    logo = logo.resize((logo_w, logo_h), Image.LANCZOS)
    img.paste(logo, (40, 30), logo)


def add_footer(draw, W, H):
    draw.text((W // 2, H - 20), "gtmsignalstudio.com", font=f_mono_12, fill=ORANGE, anchor="mm")


def draw_card(draw, x, y, w, h, fill=(13, 47, 61, 180)):
    """Draw semi-transparent card"""
    overlay = Image.new("RGBA", (w, h), fill)
    return overlay


def generate_infographic_1(slug):
    """Domain Warmup — timeline/schedule infographic"""
    prompt = "Abstract dark navy background with subtle warm gradient from left to right, representing gradual growth and warmup process, minimal geometric lines, no text, dark moody atmosphere"
    bg = get_fal_background(prompt)
    bg_rgba = bg.convert("RGBA")

    # Overlay
    overlay = Image.new("RGBA", (1080, 1080), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)

    # Top banner
    od.rectangle([(0, 0), (1080, 80)], fill=(7, 32, 43, 220))
    bg_rgba = Image.alpha_composite(bg_rgba, overlay)
    draw = ImageDraw.Draw(bg_rgba)

    add_logo(bg_rgba)
    draw.text((540, 50), "EMAIL DOMAIN WARMUP SCHEDULE", font=f_bold_28, fill=WHITE, anchor="mm")

    # Timeline cards
    weeks = [
        {"week": "WEEK 1", "vol": "5-10/day", "action": "Start slow, engage warmup pools", "color": "#cc4444"},
        {"week": "WEEK 2", "vol": "15-20/day", "action": "Increase gradually, monitor bounces", "color": "#cc8844"},
        {"week": "WEEK 3", "vol": "25-35/day", "action": "Add real contacts, track replies", "color": "#f17021"},
        {"week": "WEEK 4", "vol": "40-50/day", "action": "Campaign ready, ceiling reached", "color": "#44aa66"},
    ]

    card_y = 120
    for i, w in enumerate(weeks):
        y = card_y + i * 200

        # Card bg
        card = Image.new("RGBA", (960, 170), (13, 47, 61, 200))
        bg_rgba.paste(Image.alpha_composite(Image.new("RGBA", (960, 170), (0,0,0,0)), card), (60, y), card)
        draw = ImageDraw.Draw(bg_rgba)

        # Week label
        draw.rounded_rectangle([(80, y + 15), (200, y + 50)], radius=6, fill=w["color"])
        draw.text((140, y + 32), w["week"], font=f_mono_14, fill=WHITE, anchor="mm")

        # Volume
        draw.text((240, y + 25), w["vol"], font=f_bold_36, fill=WHITE)

        # Action
        draw.text((240, y + 75), w["action"], font=f_reg_18, fill=MUTED)

        # Arrow indicator
        draw.text((940, y + 85), "→", font=f_bold_28, fill=w["color"], anchor="mm")

        # Progress bar
        bar_w = int((i + 1) / 4 * 900)
        draw.rectangle([(80, y + 130), (80 + bar_w, y + 140)], fill=w["color"])
        draw.rectangle([(80 + bar_w, y + 130), (980, y + 140)], fill=(26, 64, 80))

    # Bottom rule
    draw.text((540, 960), "Never exceed 50 emails per mailbox per day.", font=f_semi_18, fill=ORANGE, anchor="mm")
    draw.text((540, 990), "Scale with more mailboxes, not higher volume.", font=f_reg_16, fill=MUTED, anchor="mm")

    add_footer(draw, 1080, 1080)
    path = os.path.join(OUT_DIR, f"{slug}.png")
    bg_rgba.convert("RGB").save(path, "PNG", quality=95)
    return path


def generate_infographic_2(slug):
    """SPF DKIM DMARC — 3-layer authentication diagram"""
    prompt = "Abstract dark navy background with three horizontal layers of light, representing authentication layers, geometric shield shapes, no text, minimal clean design"
    bg = get_fal_background(prompt)
    bg_rgba = bg.convert("RGBA")

    overlay = Image.new("RGBA", (1080, 1080), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    od.rectangle([(0, 0), (1080, 80)], fill=(7, 32, 43, 220))
    bg_rgba = Image.alpha_composite(bg_rgba, overlay)
    draw = ImageDraw.Draw(bg_rgba)

    add_logo(bg_rgba)
    draw.text((540, 50), "EMAIL AUTHENTICATION STACK", font=f_bold_28, fill=WHITE, anchor="mm")

    layers = [
        {"name": "SPF", "full": "Sender Policy Framework", "desc": "Authorises which servers can send from your domain", "check": "DNS TXT record listing allowed senders", "color": "#44aa66"},
        {"name": "DKIM", "full": "DomainKeys Identified Mail", "desc": "Cryptographically signs messages to prove authenticity", "check": "Public key at selector._domainkey.domain", "color": "#f17021"},
        {"name": "DMARC", "full": "Domain-based Message Auth", "desc": "Tells receivers what to do when SPF/DKIM fail", "check": "Policy: none → quarantine → reject", "color": "#cc4444"},
    ]

    for i, l in enumerate(layers):
        y = 130 + i * 280

        card = Image.new("RGBA", (960, 240), (13, 47, 61, 200))
        bg_rgba.paste(Image.alpha_composite(Image.new("RGBA", (960, 240), (0,0,0,0)), card), (60, y), card)
        draw = ImageDraw.Draw(bg_rgba)

        # Layer number + name
        draw.text((100, y + 20), f"LAYER {i+1}", font=f_mono_14, fill=MUTED)
        draw.text((100, y + 50), l["name"], font=f_bold_36, fill=l["color"])
        draw.text((250, y + 60), l["full"], font=f_reg_16, fill=MUTED)

        # Description
        draw.text((100, y + 110), l["desc"], font=f_semi_18, fill=WHITE)

        # Check
        draw.rectangle([(100, y + 155), (104, y + 172)], fill=l["color"])
        draw.text((115, y + 155), l["check"], font=f_reg_16, fill=MUTED)

        # Connector arrow
        if i < 2:
            draw.text((540, y + 250), "↓", font=f_bold_28, fill=ORANGE, anchor="mm")

    draw.text((540, 990), "All three required since Gmail Feb 2024, Outlook May 2025", font=f_semi_18, fill=ORANGE, anchor="mm")
    add_footer(draw, 1080, 1080)
    path = os.path.join(OUT_DIR, f"{slug}.png")
    bg_rgba.convert("RGB").save(path, "PNG", quality=95)
    return path


def generate_infographic_3(slug):
    """Spam Filters — checklist infographic"""
    prompt = "Abstract dark navy background with subtle grid pattern and warning amber elements, representing email security filtering, no text, minimal dark design"
    bg = get_fal_background(prompt)
    bg_rgba = bg.convert("RGBA")

    overlay = Image.new("RGBA", (1080, 1080), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    od.rectangle([(0, 0), (1080, 80)], fill=(7, 32, 43, 220))
    bg_rgba = Image.alpha_composite(bg_rgba, overlay)
    draw = ImageDraw.Draw(bg_rgba)

    add_logo(bg_rgba)
    draw.text((540, 50), "DELIVERABILITY CHECKLIST", font=f_bold_28, fill=WHITE, anchor="mm")

    items = [
        {"check": "SPF, DKIM, DMARC configured", "status": "Required", "color": "#44aa66"},
        {"check": "Separate outbound domain", "status": "Required", "color": "#44aa66"},
        {"check": "Domain warmup (2-4 weeks)", "status": "Required", "color": "#44aa66"},
        {"check": "Volume under 50/mailbox/day", "status": "Required", "color": "#44aa66"},
        {"check": "Bounce rate under 2%", "status": "Threshold", "color": "#f17021"},
        {"check": "Spam complaints under 0.3%", "status": "Threshold", "color": "#f17021"},
        {"check": "No HTML-heavy formatting", "status": "Best practice", "color": "#7a9aaa"},
        {"check": "Short emails (under 80 words)", "status": "Best practice", "color": "#7a9aaa"},
        {"check": "Signal-based targeting", "status": "Competitive edge", "color": "#cc8844"},
        {"check": "One-click unsubscribe header", "status": "Required 2026", "color": "#cc4444"},
    ]

    for i, item in enumerate(items):
        y = 110 + i * 90

        card = Image.new("RGBA", (960, 75), (13, 47, 61, 180))
        bg_rgba.paste(Image.alpha_composite(Image.new("RGBA", (960, 75), (0,0,0,0)), card), (60, y), card)
        draw = ImageDraw.Draw(bg_rgba)

        # Checkbox
        draw.rounded_rectangle([(80, y + 20), (110, y + 50)], radius=4, outline=item["color"], width=2)
        draw.text((95, y + 35), "✓", font=f_semi_18, fill=item["color"], anchor="mm")

        # Check text
        draw.text((130, y + 25), item["check"], font=f_semi_18, fill=WHITE)

        # Status badge
        draw.text((930, y + 35), item["status"], font=f_mono_12, fill=item["color"], anchor="rm")

    add_footer(draw, 1080, 1080)
    path = os.path.join(OUT_DIR, f"{slug}.png")
    bg_rgba.convert("RGB").save(path, "PNG", quality=95)
    return path


def generate_infographic_4(slug):
    """Subject Line Formulas — 7 formulas grid"""
    prompt = "Abstract dark navy background with subtle envelope and email iconography, geometric lines radiating from center, no text, minimal dark professional design"
    bg = get_fal_background(prompt)
    bg_rgba = bg.convert("RGBA")

    overlay = Image.new("RGBA", (1080, 1080), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    od.rectangle([(0, 0), (1080, 80)], fill=(7, 32, 43, 220))
    bg_rgba = Image.alpha_composite(bg_rgba, overlay)
    draw = ImageDraw.Draw(bg_rgba)

    add_logo(bg_rgba)
    draw.text((540, 50), "7 SUBJECT LINE FORMULAS", font=f_bold_28, fill=WHITE, anchor="mm")

    formulas = [
        {"num": "01", "name": "KPI on Fire", "example": '"Your [metric] dropped 30% this quarter"'},
        {"num": "02", "name": "Time-to-Value", "example": '"[Result] in [timeframe] — here\'s how"'},
        {"num": "03", "name": "Proof Point", "example": '"We helped [similar co] achieve [result]"'},
        {"num": "04", "name": "Personal Context", "example": '"Noticed [signal] at [Company]"'},
        {"num": "05", "name": "Category Insight", "example": '"[Industry] teams are switching to [X]"'},
        {"num": "06", "name": "Trigger Event", "example": '"Congrats on [event] — quick thought"'},
        {"num": "07", "name": "Short & Neutral", "example": '"Quick question about [topic]"'},
    ]

    for i, f in enumerate(formulas):
        y = 110 + i * 128

        card = Image.new("RGBA", (960, 110), (13, 47, 61, 190))
        bg_rgba.paste(Image.alpha_composite(Image.new("RGBA", (960, 110), (0,0,0,0)), card), (60, y), card)
        draw = ImageDraw.Draw(bg_rgba)

        # Number circle
        cx, cy = 105, y + 55
        draw.ellipse([(cx - 20, cy - 20), (cx + 20, cy + 20)], fill=ORANGE)
        draw.text((cx, cy), f["num"], font=f_mono_14, fill=WHITE, anchor="mm")

        # Formula name
        draw.text((145, y + 20), f["name"], font=f_bold_22, fill=WHITE)

        # Example
        draw.text((145, y + 55), f["example"], font=f_reg_16, fill=MUTED)

    draw.text((540, 1020), "Personalised subject lines increase reply rates by 30.5%", font=f_semi_18, fill=ORANGE, anchor="mm")
    add_footer(draw, 1080, 1080)
    path = os.path.join(OUT_DIR, f"{slug}.png")
    bg_rgba.convert("RGB").save(path, "PNG", quality=95)
    return path


def generate_infographic_5(slug):
    """Cold Email Metrics — funnel metrics diagram"""
    prompt = "Abstract dark navy background with vertical funnel shape made of geometric lines, data visualization aesthetic, no text, minimal dark moody design"
    bg = get_fal_background(prompt)
    bg_rgba = bg.convert("RGBA")

    overlay = Image.new("RGBA", (1080, 1080), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    od.rectangle([(0, 0), (1080, 80)], fill=(7, 32, 43, 220))
    bg_rgba = Image.alpha_composite(bg_rgba, overlay)
    draw = ImageDraw.Draw(bg_rgba)

    add_logo(bg_rgba)
    draw.text((540, 50), "COLD EMAIL METRICS FUNNEL", font=f_bold_28, fill=WHITE, anchor="mm")

    metrics = [
        {"name": "Open Rate", "benchmark": "40-60%", "signal": "Inbox placement", "width": 900, "color": "#7a9aaa"},
        {"name": "Reply Rate", "benchmark": "5-12%", "signal": "Message relevance", "width": 750, "color": "#f17021"},
        {"name": "Positive Reply", "benchmark": "60-80%", "signal": "Targeting quality", "width": 600, "color": "#cc8844"},
        {"name": "Meeting Rate", "benchmark": "3-5%", "signal": "Offer-market fit", "width": 450, "color": "#44aa66"},
        {"name": "SQL Rate", "benchmark": "1-3%", "signal": "Pipeline quality", "width": 300, "color": "#44aa66"},
    ]

    for i, m in enumerate(metrics):
        y = 130 + i * 170
        x_offset = (900 - m["width"]) // 2 + 90

        # Funnel bar
        card = Image.new("RGBA", (m["width"], 130), (13, 47, 61, 200))
        bg_rgba.paste(Image.alpha_composite(Image.new("RGBA", (m["width"], 130), (0,0,0,0)), card), (x_offset, y), card)
        draw = ImageDraw.Draw(bg_rgba)

        # Metric name + benchmark
        draw.text((x_offset + 20, y + 15), m["name"], font=f_bold_22, fill=WHITE)
        draw.text((x_offset + m["width"] - 20, y + 18), m["benchmark"], font=f_bold_28, fill=m["color"], anchor="ra")

        # Signal type
        draw.text((x_offset + 20, y + 55), f"Signal: {m['signal']}", font=f_reg_16, fill=MUTED)

        # Bottom accent line
        draw.rectangle([(x_offset, y + 125), (x_offset + m["width"], y + 130)], fill=m["color"])

    draw.text((540, 1000), "Reply rate is the only metric that cannot be faked.", font=f_semi_18, fill=ORANGE, anchor="mm")
    add_footer(draw, 1080, 1080)
    path = os.path.join(OUT_DIR, f"{slug}.png")
    bg_rgba.convert("RGB").save(path, "PNG", quality=95)
    return path


if __name__ == "__main__":
    batch = [
        ("how-to-warm-up-email-domains-safely-in-2026-gtm-consultant-guide", generate_infographic_1),
        ("3335-2", generate_infographic_2),
        ("how-to-avoid-spam-filters-and-improve-cold-email-deliverability-2026-guide", generate_infographic_3),
        ("7-cold-email-subject-line-formulas-that-boost-open-rates-2026", generate_infographic_4),
        ("the-complete-guide-to-cold-email-metrics-you-should-track-2026", generate_infographic_5),
    ]

    for slug, gen_fn in batch:
        print(f"Generating: {slug}...")
        path = gen_fn(slug)
        print(f"  OK: {path}")

    print(f"\nBatch 1 complete: {len(batch)} infographics generated")
