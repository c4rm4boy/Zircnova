# Zircnova Branding Guide

## Typography

### Recommended Fonts for Web

| Priority | Font | Type | Notes |
|----------|------|------|-------|
| Premium | **Avenir Next** | System/Licensed | Best match for the logo; most professional look |
| Free (1st choice) | **Montserrat** | Google Font | Nearly identical aesthetic to Avenir Next |
| Free (2nd choice) | **Poppins** | Google Font | Maintains brand identity; clean geometric sans |

### Usage
- Use the primary font for all headings, navigation, and UI labels
- Maintain consistent weight hierarchy: heavy/bold for display, regular for body

### Letter Spacing (Critical)
The ZIRCNOVA logo's premium, technical feel comes from **wide tracking**. Apply this to all site headers and display text:

```css
letter-spacing: 0.15em; /* minimum for brand feel */
letter-spacing: 0.20em; /* matches logo exactly */
```

> **Pro-Tip:** This "wide tracking" CSS property is what gives the ZIRCNOVA logo its premium, technical feel. Always apply it to `<h1>` headings and the site logo text.

---

## Current Implementation

The site currently uses **Barlow Condensed** (headings/nav) + **Barlow** (body) loaded via Google Fonts. To align with the brand guide above, consider migrating headings to Montserrat or Poppins with `letter-spacing: 0.15em–0.20em`.

```html
<!-- Recommended Google Fonts import -->
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet" />
```

```css
:root {
  --font-display: 'Montserrat', 'Avenir Next', sans-serif;
  --font-body:    'Poppins', 'Avenir Next', sans-serif;
  --tracking-brand: 0.18em; /* logo-matching letter spacing */
}
```

---

## Colors

*Source: `images/branding/color palette.png`*

| Token | Hex | Role | Usage |
|-------|-----|------|-------|
| `--color-primary` | `#081C2D` | Primary (Deep Navy) | Tech header, hero backgrounds |
| `--color-accent` | `#0077F1` | Accent (Electric Blue) | Links, interactions, nav active |
| `--color-cta` | `#FEC107` | Secondary Accent (Amber/Gold) | CTA buttons, primary actions |
| `--color-bg` | `#F9F3FA` | Neutral (Off-White) | Page background |
| `--color-text` | `#1A1A1A` | Typography (Charcoal) | Body text |

### CSS Implementation

```css
:root {
  /* Brand Colors — from official color palette */
  --color-primary:  #081C2D; /* Deep Navy     — tech header, hero backgrounds  */
  --color-accent:   #0077F1; /* Electric Blue — links, interactions, nav active */
  --color-cta:      #FEC107; /* Amber/Gold    — CTA buttons, primary actions    */
  --color-bg:       #F9F3FA; /* Off-White     — page background                 */
  --color-text:     #1A1A1A; /* Charcoal      — body text                       */

  /* Derived states */
  --color-accent-dark:  #005AC4; /* Electric Blue darkened ~15% for hover */
  --color-primary-light:#0D2D47; /* Deep Navy lightened for elevated surfaces */
}
```
