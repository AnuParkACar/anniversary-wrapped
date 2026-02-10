"""
Generate a QR code for the Anniversary Wrapped site.

Usage:
    pip install qrcode[pil]
    python scripts/generate_qr.py

Output:
    public/qr-code.png
"""

import qrcode
from pathlib import Path

SITE_URL = "https://anuparkacar.github.io/anniversary-wrapped/"
OUTPUT_PATH = Path(__file__).parent.parent / "public" / "qr-code.png"

def main():
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=20,
        border=4,
    )
    qr.add_data(SITE_URL)
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")
    img.save(OUTPUT_PATH)
    print(f"✅ QR code saved to {OUTPUT_PATH}")
    print(f"   URL: {SITE_URL}")

if __name__ == "__main__":
    main()
