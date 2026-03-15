"""
Batch-generate featured images for all posts missing them.
Branded 1200x630 images with title + category.
Usage: python scripts/generate-featured-images.py
"""
import os
import json
import textwrap
from PIL import Image, ImageDraw, ImageFont

FONTS_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "fonts")
LOGO_PATH = os.path.join(os.path.dirname(__file__), "..", "public", "gss-logo.png")
OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "blog-images", "featured")
os.makedirs(OUT_DIR, exist_ok=True)

# Brand
BG = "#07202b"
ORANGE = "#f17021"
WHITE = "#ffffff"
MUTED = "#7a9aaa"
CARD_BG = "#0d2f3d"

# Fonts
f_bold_44 = ImageFont.truetype(os.path.join(FONTS_DIR, "Montserrat-Bold.ttf"), 44)
f_bold_36 = ImageFont.truetype(os.path.join(FONTS_DIR, "Montserrat-Bold.ttf"), 36)
f_reg_20 = ImageFont.truetype(os.path.join(FONTS_DIR, "Montserrat-Regular.ttf"), 20)
f_mono_16 = ImageFont.truetype(os.path.join(FONTS_DIR, "RobotoMono-Bold.ttf"), 16)
f_mono_14 = ImageFont.truetype(os.path.join(FONTS_DIR, "RobotoMono-Regular.ttf"), 14)


def generate_featured(title, category, slug):
    W, H = 1200, 630
    img = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(img)

    # Logo
    logo = Image.open(LOGO_PATH).convert("RGBA")
    logo_h = 45
    logo_w = int(logo_h * (logo.width / logo.height))
    logo_r = logo.resize((logo_w, logo_h), Image.LANCZOS)
    img.paste(logo_r, (60, 40), logo_r)

    # Category tag
    draw.text((60, 110), category.upper(), font=f_mono_16, fill=ORANGE)

    # Orange divider
    draw.line([(60, 145), (300, 145)], fill=ORANGE, width=3)

    # Title — word-wrap to fit
    wrapped = textwrap.wrap(title, width=32)
    y = 170
    for i, line in enumerate(wrapped[:3]):  # max 3 lines
        font = f_bold_44 if i == 0 else f_bold_36
        color = WHITE if i < 2 else ORANGE
        draw.text((60, y), line, font=font, fill=color)
        y += font.size + 12

    # Decorative elements — subtle grid dots on the right
    for gx in range(750, 1150, 30):
        for gy in range(100, 530, 30):
            opacity = 20 + ((gx - 750) * (gy - 100)) % 40
            dot_color = (26, 64, 80)  # navy-border color
            draw.ellipse([(gx, gy), (gx + 3, gy + 3)], fill=dot_color)

    # Bottom bar
    draw.rectangle([(0, H - 50), (W, H)], fill=CARD_BG)
    draw.text((60, H - 38), "gtmsignalstudio.com", font=f_mono_14, fill=ORANGE)
    draw.text((W - 60, H - 38), "Signal-Led GTM", font=f_mono_14, fill=MUTED, anchor="ra")

    path = os.path.join(OUT_DIR, f"{slug}.png")
    img.save(path, "PNG", quality=95)
    return path


# Posts that need featured images (from audit)
posts_needing_images = [
    {"title": "How to Warm Up Email Domains Safely in 2026", "category": "Cold Email Deliverability", "slug": "how-to-warm-up-email-domains-safely-in-2026-gtm-consultant-guide"},
    {"title": "SPF, DKIM, and DMARC Explained for Cold Email Success", "category": "Cold Email Deliverability", "slug": "3335-2"},
    {"title": "How to Avoid Spam Filters and Improve Cold Email Deliverability", "category": "Cold Email Deliverability", "slug": "how-to-avoid-spam-filters-and-improve-cold-email-deliverability-2026-guide"},
    {"title": "7 Cold Email Subject Line Formulas That Boost Open Rates", "category": "Cold Email Tactics", "slug": "7-cold-email-subject-line-formulas-that-boost-open-rates-2026"},
    {"title": "The Complete Guide to Cold Email Metrics You Should Track", "category": "Cold Email Infrastructure", "slug": "the-complete-guide-to-cold-email-metrics-you-should-track-2026"},
    {"title": "Cold Email Tools Compared: Smartlead vs Clay vs Instantly", "category": "Cold Email Infrastructure", "slug": "cold-email-tools-compared-smartlead-vs-clay-vs-instantly-2026"},
    {"title": "The Beginner's Guide to Defining Your ICP for Cold Email Success", "category": "ICP & Positioning", "slug": "beginner-guide-icp-cold-email-2026"},
    {"title": "How to Use Buyer Signals to Narrow Your ICP", "category": "ICP & Positioning", "slug": "buyer-signals-narrow-icp"},
    {"title": "ICP Scoring: Pain, Money, Reachability, and Fit Explained", "category": "ICP & Positioning", "slug": "icp-scoring-pain-money-fit-2026"},
    {"title": "Why Job Titles Aren't Enough: Building Full ICP Profiles", "category": "ICP & Positioning", "slug": "why-job-titles-arent-enough-building-full-icp-profiles-in-2026"},
    {"title": "How to Build and Validate Your ICP Card in 2026", "category": "ICP & Positioning", "slug": "build-validate-icp-card-2026"},
    {"title": "Which Business Functions Need Automation Most in 2026?", "category": "Build in Public", "slug": "business-functions-need-automation-2026"},
    {"title": "Signal Logic: The Filter Between Raw Data and Qualified Pipeline", "category": "Signal-Led GTM", "slug": "signal-logic-the-filter-between-raw-data-and-qualified-pipeline"},
]

if __name__ == "__main__":
    for p in posts_needing_images:
        path = generate_featured(p["title"], p["category"], p["slug"])
        print(f"OK: {p['slug']} -> {path}")
    print(f"\nGenerated {len(posts_needing_images)} featured images")
