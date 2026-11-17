# ADSPYLIB sales website

Open `index.html` in a browser. No install or build is needed.

## Before publishing

Edit `config.js`:
- `whatsapp`: your official ADSPYLIB number, international digits without `+`.
- `email`: optional fallback email.
- `priceLabel`: confirmed price and license duration, or leave empty for inquiry pricing.

Order buttons open WhatsApp when configured, then email as a fallback. Without either, they open an honest request dialog with a copy button. Orders are not transmitted or stored in this state.

The interactive product preview is illustrative, not the actual extension. Start scan and View creative demonstrate the page only. No fabricated testimonials, revenue figures or profitability guarantees are included.

Local preview: `python -m http.server 5173 --bind 127.0.0.1` in this folder, then visit http://127.0.0.1:5173.

Files are static and can be uploaded to any static web host. Typography loads from Google Fonts, with local system fallback. All illustration artwork is CSS; no remote image assets required.
