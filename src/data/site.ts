/**
 * Everything a client is likely to edit lives in this file:
 * contact link, media URLs, testimonials, projects and brand names.
 */

/** Where every "Start a chat" button points. Replace with the studio's real address. */
export const CONTACT_HREF = 'mailto:hello@example.com';

export const SERIF = "'PP Mondwest', serif";

/**
 * Media slots. Leave a slot as `null` to show the built-in generative motion
 * piece; put a GIF / image URL in its place to show that instead.
 */
export const marqueeMedia: (string | null)[] = [null, null, null, null, null, null, null, null];

export const quoteMedia: string | null = null;

/** Names shown under the founder quote. Sample names: replace with real clients. */
export const brands = ['Northwind', 'Halcyon', 'Lumen & Co.'];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  /** Optional photo URL. Initials are shown when it is missing or fails to load. */
  avatar?: string;
  /** Marks the card as sample copy. Remove once a real client quote is in. */
  sample?: boolean;
};

/**
 * Sample copy that shows the layout. Swap each entry for a quote a real
 * client has approved, then delete `sample: true`.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      'Sarah rebuilt our product story in three weeks. The launch page out-converted everything we had shipped before it.',
    name: 'Client name',
    role: 'Founder, fintech startup',
    sample: true,
  },
  {
    quote:
      'It felt like adding a head of design overnight. Every review ended with decisions, never with homework.',
    name: 'Client name',
    role: 'CEO, developer tools company',
    sample: true,
  },
  {
    quote:
      'The motion work alone changed how investors read our deck. People finally understood the product in ten seconds.',
    name: 'Client name',
    role: 'Co-founder, climate startup',
    sample: true,
  },
  {
    quote:
      'One flat rate, no scoping calls, no surprises. We sent requests on Monday and saw finished work by Thursday.',
    name: 'Client name',
    role: 'Head of product, health platform',
    sample: true,
  },
  {
    quote:
      'She pushed back on half of our brief, and she was right about all of it. The brand is sharper for it.',
    name: 'Client name',
    role: 'CMO, consumer hardware brand',
    sample: true,
  },
];

export type Project = {
  title: string;
  summary: string;
  tags: string[];
  year: string;
  /** GIF / image URL. `null` shows a generative motion piece. */
  media: string | null;
  art: number;
  href: string;
};

export const projects: Project[] = [
  {
    title: 'Tidewater',
    summary: 'Brand system and launch site for a climate finance platform.',
    tags: ['Brand', 'Web'],
    year: '2026',
    media: null,
    art: 0,
    href: '#',
  },
  {
    title: 'Relay OS',
    summary: 'Product design and motion language for a logistics dashboard.',
    tags: ['Product', 'Motion'],
    year: '2025',
    media: null,
    art: 5,
    href: '#',
  },
  {
    title: 'Kindred',
    summary: 'Identity, packaging and storefront for a home audio brand.',
    tags: ['Identity', 'Commerce'],
    year: '2025',
    media: null,
    art: 2,
    href: '#',
  },
];
