/* ------------------------------------------------------------------
   All site copy lives here. Edit this file to change text, images,
   numbers or contact details — components read from it.
------------------------------------------------------------------- */

const ASSETS = 'https://socialkaari.com/assets/images'

/* ---------- Types ---------- */

export type ServiceOption =
  | 'Social Media Marketing'
  | 'Search Engine Optimisation (SEO)'
  | 'Designing & Printing'
  | 'Website Designing'
  | 'Google Business Profiling'
  | 'Other'

export interface NavLink {
  id: string
  label: string
}

export interface Stat {
  value: number
  prefix?: string
  suffix: string
  label: string
  animate: boolean
}

export interface Pillar {
  title: string
  body: string
}

export interface Service {
  id: string
  title: string
  summary: string
  points: string[]
  image: string
  formOption: ServiceOption
}

export interface ProjectMedia {
  type: 'image' | 'video'
  src?: string // leave empty to show a placeholder card
  poster?: string
  alt: string
}

export interface Project {
  id: string
  tab: string
  title: string
  description: string
  tagline?: string
  media: ProjectMedia[]
}

export interface Result {
  client: string
  from: string
  to: string
  progress: number // 0–1, length of the bar relative to the 'to' value
  label: string
}

export interface Testimonial {
  name: string
  business?: string
  quote: string
}

export interface Faq {
  question: string
  answer: string
}

export interface Client {
  name: string
  logo: string
}

/* ---------- Company ---------- */

export const company = {
  name: 'Socialkaari',
  founded: 2014,
  founder: 'Aakriti Sharma',
  logo: `${ASSETS}/SOCIALLKARILOGO.png`,
  whatsapp: '917898196106',
  phoneDisplay: '+91 78981 96106',
  phoneHref: 'tel:+917898196106',
  emails: ['aakriti@socialkaari.com', 'socialkaari@gmail.com'],
  address: 'Second Floor, Prithvi Complex, Chandrika Housing Society, 121/31, Bhopal, Madhya Pradesh, India',
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d849.4510610398931!2d77.43726129037847!3d23.181292183523464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c43971ca48b13%3A0xd3f30848b4f16b2a!2sCHandrika%20Housing%20Society%2C%2044%2C%20E8%20Extension%2C%20Bawadiya%20Kalan%2C%20Gulmohar%20Colony%2C%20Bhopal%2C%20Madhya%20Pradesh%20462039!5e0!3m2!1sen!2sin!4v1744142186793!5m2!1sen!2sin',
  mapLink: 'https://maps.google.com/?q=Chandrika+Housing+Society+Bhopal',
  tagline: 'A creative agency providing innovative and unique solutions to help businesses grow.',
}

export function whatsappLink(message: string): string {
  return `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(message)}`
}

/* ---------- Navigation ---------- */

export const navLinks: NavLink[] = [
  { id: 'top', label: 'Home' },
  { id: 'about', label: 'Ideal People' },
  { id: 'service', label: 'Services' },
  { id: 'projects', label: 'Work' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'faq', label: "FAQ's" },
  { id: 'contact', label: 'Contact' },
]

/* ---------- Hero ---------- */

export const hero = {
  rotating: ['social media', 'SEO', 'branding', 'paid ads', 'influencer campaigns', 'memes'],
  sub: 'A team of experienced professionals crafting digital experiences that resonate with discerning clients.',
  images: [
    { src: `${ASSETS}/H1.jpg`, alt: 'Socialkaari campaign creative' },
    { src: `${ASSETS}/H2_page-0001.jpg`, alt: 'Social media post designed by Socialkaari' },
    { src: `${ASSETS}/H3_page-0001.jpg`, alt: 'Brand creative by Socialkaari' },
    { src: `${ASSETS}/H4_page-0001.jpg`, alt: 'Promotional design by Socialkaari' },
  ],
}

export const stats: Stat[] = [
  { value: 20, suffix: 'M+', label: 'Impressions delivered', animate: true },
  { value: 8, suffix: 'M+', label: 'People reached', animate: true },
  { value: 50, suffix: '+', label: 'Satisfied clients, local and global', animate: true },
  { value: 2014, suffix: '', label: 'Building brands since', animate: false },
]

/* ---------- Clients ---------- */

const partner = (file: string) => `${ASSETS}/partner/${encodeURIComponent(file)}`

export const clients: Client[] = [
  { name: 'Sanjeevine', logo: partner('sanjeevine.jpg') },
  { name: 'Printkaari', logo: partner('printkaerri.jpg') },
  { name: 'The Pride', logo: partner('the pride.jpg') },
  { name: 'Mana', logo: partner('mana.jpg') },
  { name: 'House Glam', logo: partner('house glam.jpg') },
  { name: 'Gater', logo: partner('gater.jpg') },
  { name: 'Furqan', logo: partner('furqan.jpg') },
  { name: 'Maya', logo: partner('maya.jpg') },
  { name: 'Om Celebrations', logo: partner('om celebrations.jpg') },
  { name: 'Nimboli', logo: partner('nimboli.jpg') },
  { name: 'Club', logo: partner('club.jpg') },
  { name: 'Casa', logo: partner('casa.jpg') },
  { name: 'Divine Pizza', logo: partner('divine piza.jpg') },
  { name: 'Giggle', logo: partner('giggle.jpg') },
  { name: 'GT', logo: partner('gt.jpg') },
  { name: 'Apna Swad', logo: partner('apna swad.jpg') },
]

/* ---------- About ---------- */

export const about = {
  quote: 'More than a marketing agency — a creative powerhouse built to help brands grow and stand out.',
  image: `${ASSETS}/about-socialkaari.jpg`,
  paragraphs: [
    'Founded in 2014, Socialkaari is one of the leading digital marketing agencies in Bhopal. We craft distinct brand identities and results-driven communication strategies for businesses of every size — branding, advertising, social media management, digital marketing and website development.',
    'Our collaboration with Printkaari brings traditional and digital marketing under one roof. It is where creative storytelling meets proven performance.',
  ],
  founderNote:
    'With every project, Aakriti is reshaping how brands connect with people — blending creativity, strategy and innovation in every campaign.',
  pillars: [
    {
      title: 'Experts and professionals',
      body: 'A seasoned team that has run campaigns for clinics, cafés, NGOs, interior studios and printers alike.',
    },
    {
      title: 'Wordsmiths, strategists and designers',
      body: 'A fine melange of writing, strategy and design, working together to unlock what your brand can be.',
    },
    {
      title: 'Global impact, local expertise',
      body: '20M+ impressions and 8M+ reach, for 50+ satisfied clients across local and global markets.',
    },
  ] satisfies Pillar[],
}

/* ---------- Services ---------- */

export const services: Service[] = [
  {
    id: 'smm',
    title: 'Social media management',
    summary: 'Clutter-free campaigns across 13+ platforms.',
    points: [
      'Presence managed on 13+ social media platforms',
      'Clutter-free, engaging campaigns',
      'Tailor-made strategy for every brand',
    ],
    image: `${ASSETS}/SPB1.jpg`,
    formOption: 'Social Media Marketing',
  },
  {
    id: 'smo',
    title: 'Social media optimisation',
    summary: 'Profiles, posts, reels and a steady rhythm.',
    points: [
      'Profile setup and optimisation',
      'Creative posts, stories and captions',
      'Trending reels, visual content, podcast and blog content',
      'Hashtag strategy, scheduling and consistent engagement',
    ],
    image: `${ASSETS}/SPB2.jpg`,
    formOption: 'Social Media Marketing',
  },
  {
    id: 'seo',
    title: 'Search engine optimisation',
    summary: 'Show up where it matters: on Google.',
    points: [
      'Keyword-rich content that lifts visibility in search',
      'On-page optimisation: titles, meta tags and structure',
      'Backlinks and authority for ranking and trust',
      'Local SEO and Google Business Profile setup',
    ],
    image: `${ASSETS}/H3_page-0001.jpg`,
    formOption: 'Search Engine Optimisation (SEO)',
  },
  {
    id: 'branding',
    title: 'Branding and content marketing',
    summary: 'Identity that people remember.',
    points: [
      'Logo creation and identity design',
      'Merchandise and brand collateral',
      'Animated brand videos',
    ],
    image: `${ASSETS}/brand1.jpg`,
    formOption: 'Designing & Printing',
  },
  {
    id: 'print',
    title: 'Design and printing',
    summary: 'From brochures to mugs, with Printkaari.',
    points: [
      'Graphic, banner and brochure design',
      'Framed canvas prints, stickers and bag printing',
      'Custom mugs, T-shirts, caps and corporate gifting',
    ],
    image: `${ASSETS}/brand2.jpg`,
    formOption: 'Designing & Printing',
  },
  {
    id: 'paid',
    title: 'Paid promotion',
    summary: 'Ads that are measured by results.',
    points: [
      'Result-oriented Meta (Facebook) ad campaigns',
      'Instagram reach, lead generation and follower growth',
      'Google Ads for local branding',
      'LinkedIn and X (Twitter) promotions',
    ],
    image: `${ASSETS}/H2_page-0001.jpg`,
    formOption: 'Social Media Marketing',
  },
  {
    id: 'influencer',
    title: 'Influencer marketing',
    summary: '60+ hand-picked local voices.',
    points: [
      '60+ hand-picked influencers',
      'Expert-curated content ideas',
      'Street-smart campaigns with local flavour',
    ],
    image: `${ASSETS}/SPB3.jpg`,
    formOption: 'Social Media Marketing',
  },
  {
    id: 'memes',
    title: 'Meme marketing',
    summary: 'Brand-driven memes that get shared.',
    points: [
      'Brand-driven memes with a side of laughter',
      'Your shortcut to going viral',
      'Supercharged engagement and brand visibility',
    ],
    image: `${ASSETS}/H4_page-0001.jpg`,
    formOption: 'Social Media Marketing',
  },
]

export const serviceOptions: ServiceOption[] = [
  'Social Media Marketing',
  'Search Engine Optimisation (SEO)',
  'Designing & Printing',
  'Website Designing',
  'Google Business Profiling',
  'Other',
]

/* ---------- Work ---------- */

export const projects: Project[] = [
  {
    id: 'social',
    tab: 'Social branding',
    title: 'Social platforms branding',
    description:
      'We run your Instagram and Facebook pages with high-quality posts and reels made for your brand — festival concepts, storytelling, planning, ad campaigns and on-time delivery, all built to connect with your audience.',
    media: [
      { type: 'image', src: `${ASSETS}/SPB1.jpg`, alt: 'Instagram post designed for a client' },
      { type: 'image', src: `${ASSETS}/SPB2.jpg`, alt: 'Festival campaign creative' },
      { type: 'image', src: `${ASSETS}/SPB3.jpg`, alt: 'Social media reel cover' },
    ],
  },
  {
    id: 'shoot',
    tab: 'Brand shoot',
    title: 'Brand shoots',
    description:
      'Professional product shoots handled end to end: creative styling, studio lighting, HD photos and video, edited reels and social-ready content. Every angle covered, delivered on time.',
    media: [
      { type: 'image', src: `${ASSETS}/brand1.jpg`, alt: 'Product shoot by Socialkaari' },
      { type: 'image', src: `${ASSETS}/brand2.jpg`, alt: 'Styled product photograph' },
      { type: 'image', src: `${ASSETS}/brand3.jpg`, alt: 'Studio-lit brand photograph' },
    ],
  },
  {
    id: 'seo',
    tab: 'SEO',
    title: 'Google rankings',
    description:
      'We help your business show up on Google. Keyword-rich content, on-page optimisation, backlinks and local SEO drive organic traffic that turns into real leads.',
    tagline: 'Get found. Get clicked. Grow smarter.',
    media: [
      { type: 'image', alt: 'SEO case study' },
      { type: 'image', alt: 'Local search results' },
      { type: 'image', alt: 'Google Business Profile' },
    ],
  },
  {
    id: 'memes',
    tab: 'Memes',
    title: 'Meme-ify your marketing',
    description: 'Where creativity meets virality. We boost brands with laughs that convert.',
    tagline: 'Love, laugh and sell.',
    media: [
      { type: 'image', alt: 'Brand meme' },
      { type: 'image', alt: 'Brand meme' },
      { type: 'image', alt: 'Brand meme' },
    ],
  },
  {
    id: 'studio',
    tab: 'In-house studio',
    title: 'Our in-house studio',
    description:
      'As a future-focused agency, we built our own studio. It is the creative hub where our standout content comes to life.',
    media: [
      { type: 'video', alt: 'Inside the Socialkaari studio' },
      { type: 'video', alt: 'Behind the scenes' },
      { type: 'video', alt: 'Studio setup' },
    ],
  },
]

/* ---------- Results ---------- */

export const results: Result[] = [
  { client: 'Dr. Swati Narang', from: '30K', to: '220K+', progress: 1, label: 'impressions within 2 months' },
  { client: 'Rachna Virk', from: '780', to: '139K+', progress: 0.63, label: 'impressions within 3 months' },
  { client: 'Printkaari', from: 'Listing sites', to: '300+', progress: 0.82, label: 'organic Google leads every month' },
]

/* ---------- Testimonials ---------- */

export const testimonials: Testimonial[] = [
  {
    name: 'Mr. Sumit Tiwari',
    business: 'House Glam',
    quote:
      'Partnering with Socialkaari has been a game-changer for House Glam. Their digital marketing has significantly boosted our visibility, especially on Google, where we now receive more interior design enquiries and direct calls. They also solved one of our biggest challenges, Google address and number verification, so we finally show up accurately in local searches. They keep improving the look and feel of our Instagram and Facebook too. Socialkaari delivers what they promise.',
  },
  {
    name: 'Mahima',
    quote:
      'Socialkaari completely transformed our online presence. Their strategic approach to social media marketing delivered incredible engagement and a significant boost in leads. Highly recommend their expertise.',
  },
  {
    name: 'Dr. Shreya Pahwa',
    business: 'Psychologist',
    quote:
      'As a psychologist, visibility was key to reaching the right people. After Socialkaari’s strategic SEO support, my clinic’s online presence improved significantly, and so did the number of enquiries and calls. They helped me rank better locally, making it easier for people to find and trust my services. Highly recommended for professionals looking to grow their practice online.',
  },
  {
    name: 'Soumya Sharma',
    quote:
      'Working with Socialkaari has been a game-changer for our business. The team is knowledgeable, proactive and always keeps us informed. We have seen measurable growth in our digital campaigns since partnering with them.',
  },
  {
    name: 'Mrs. Udita',
    quote:
      'Socialkaari has done an amazing job with our social media marketing. They helped us reach the right audience in a short time, and the response to our branding has been excellent. Highly satisfied with their work.',
  },
  {
    name: 'Shobhit Dubey',
    business: 'Printkaari',
    quote:
      'Two years with Socialkaari have completely transformed our digital presence. We used to rely on Justdial, IndiaMART and Sulekha. Now, thanks to their Google SEO and website optimisation, we have a strong, independent online footprint and generate over 300 quality leads every month directly from Google, all organic. Partnering with Socialkaari isn’t an expense; it’s an investment that pays off consistently.',
  },
  {
    name: 'Mr. Naveen Gautam',
    business: 'NGO',
    quote:
      'Socialkaari’s Instagram marketing and ad strategy helped our NGO reach the right audience and build genuine engagement. We received authentic donations and strong supporter backing for our cause. Special thanks to the team for their transparency and creative work.',
  },
]

/* ---------- FAQ ---------- */

export const faqs: Faq[] = [
  {
    question: 'What social media management services does Socialkaari offer?',
    answer:
      'We plan and run your brand’s presence across 13+ platforms, including Instagram, Facebook, LinkedIn, X and YouTube. That covers profile setup and optimisation, a content calendar, creative posts, stories, reels and captions, hashtag strategy, scheduling, and day-to-day engagement with your audience. Every plan is built around your brand and goals, not a fixed template.',
  },
  {
    question: 'How can Socialkaari’s branding services help my business stand out?',
    answer:
      'We work with you to define what makes your business different, then shape it into a brand story, a logo and visual identity, brand guidelines and consistent messaging across every platform. The result is a brand people recognise and trust, in Bhopal and beyond.',
  },
  {
    question: 'Can Socialkaari run paid promotions to reach a wider audience?',
    answer:
      'Yes. We create and manage campaigns on Facebook, Instagram, Google Ads, LinkedIn and more, so your content reaches the people most likely to buy. We handle audience research, ad creatives, optimisation and performance tracking to get the best return on your ad spend.',
  },
  {
    question: 'Can you help with meme marketing and video editing?',
    answer:
      'Yes. We create original memes around current trends that connect your brand with younger audiences and get shared. Our video team turns raw footage into polished content, from short reels to longer explainer videos.',
  },
  {
    question: 'What does it cost, and how do I get in touch?',
    answer:
      'Budgets depend on the services you need, and we offer flexible packages for small businesses, startups and personal brands. For an exact proposal, call or WhatsApp +91 78981 96106, or email aakriti@socialkaari.com.',
  },
]
