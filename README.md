# V Vortex

Single-page landing site for **V Vortex**, the creative studio of Sarah Vortex.

Designed and built by **Dilshani Rathnayake**.

## Stack

React 18, TypeScript, Vite, Tailwind CSS and lucide-react. No other UI libraries.

## Run it

```bash
npm install
npm run dev      # local development
npm run build    # production build in dist/
npm run preview  # serve the production build
```

## Before going live

Everything a client edits is in `src/data/site.ts`.

1. **PP Mondwest font.** Add the licensed file as `public/PPMondwest-Regular.woff2`.
   Until it is there, accent words fall back to the browser's default serif.
2. **Contact link.** Set `CONTACT_HREF` (currently `mailto:hello@example.com`).
3. **Media.** `marqueeMedia`, `quoteMedia` and each project's `media` accept GIF or
   image URLs. Any slot left as `null` shows a built-in generative motion piece.
4. **Testimonials.** The five cards are sample copy and carry a "Sample" tag.
   Replace each with a quote a real client has approved, add an `avatar` URL if
   you have one, and remove `sample: true`.
5. **Partner names, projects and social links.** These are sample content too.

## Structure

```
src/
  App.tsx                    page composition
  index.css                  fonts, marquee + fadeInUp keyframes, motion styles
  hooks/useInViewAnimation   IntersectionObserver entrance hook
  data/site.ts               all editable content
  components/
    Button                   primary / secondary / tertiary
    Hero, VortexField        hero and its canvas particle vortex
    Marquee                  infinite media marquee
    Quote                    founder quote with parallax window
    Pricing                  two plans with count-up price
    Testimonials             auto-advancing carousel (3s)
    Projects                 three project cards
    PartnerCTA               mouse-trail call to action
    Footer, FloatingNav
    MotionArt                eight generative SVG motion pieces
```

Motion respects `prefers-reduced-motion`.
