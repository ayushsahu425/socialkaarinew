# Socialkaari — website

Single-page site for Socialkaari, built with React 18, TypeScript, Vite, Tailwind CSS and Framer Motion.

## Run it

Requires Node.js 18 or newer.

```bash
npm install
npm run dev        # local dev server at http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build locally
```

Upload the contents of `dist/` to any static host (Netlify, Vercel, Hostinger, cPanel).

## Where things live

```
index.html                  SEO meta, Open Graph, LocalBusiness JSON-LD, font links
tailwind.config.ts          colour + font tokens mapped to CSS variables
src/
  index.css                 colour tokens (:root), grain texture, base styles
  data/content.ts           ALL text, images, stats, services, testimonials, FAQs, contact details
  context/EnquiryContext    lets a service's "Enquire" button pre-fill the contact form
  hooks/                    useScrollSpy, useMediaQuery, useScrolledPast
  components/
    Navbar, Hero, ClientMarquee, About, Services, Work, Results,
    Testimonials, FAQ, Contact, Footer, WhatsAppFab, CustomCursor
    ui/                     Button (magnetic link), Reveal, Counter, SectionLabel
```

## Common edits

- **Change text, numbers or contact details:** `src/data/content.ts`.
- **Brand colours:** the RGB triplets at the top of `src/index.css`. Sample the exact red from the logo and replace `--brand` / `--brand-deep` if they differ.
- **Add reels to the Work tabs:** in `projects` inside `content.ts`, set `src` (and `type: 'video'` for MP4s, plus an optional `poster`). Items without `src` show a "Reel coming soon" card.
- **Brochure:** the "Ask for our brochure" button opens WhatsApp. To link a PDF instead, put it in `public/brochure.pdf` and change that button's `href` in `Contact.tsx`.

## How the forms work

There is no backend. The contact form validates on the page, then opens WhatsApp (+91 78981 96106) with the visitor's details pre-filled. The footer email field opens the visitor's mail app addressed to aakriti@socialkaari.com.

## Fonts

- Zodiak (headings) and General Sans (body) from Fontshare, by Indian Type Foundry — free for commercial use.
- JetBrains Mono (numbers) and Tiro Devanagari Hindi (the "कारी" accent) from Google Fonts.

## Images

Images are loaded from `https://socialkaari.com/assets/images/…`. For production, copy them into `public/images/` and update the `ASSETS` constant in `content.ts`, so the new site doesn't depend on the old one staying online.
