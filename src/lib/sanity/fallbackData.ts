import type {
  ArtistProfile,
  Artwork,
  ContactPageSettings,
  GalleryPageSettings,
  HomePageSettings,
  SiteSettings,
} from "@/lib/types";

export const fallbackArtwork: Artwork[] = [
  {
    id: "study-in-blue",
    title: "Study in Blue",
    slug: "study-in-blue",
    image: {
      src: "/artwork/study-in-blue.svg",
      alt: "Abstract blue study placeholder artwork",
      width: 900,
      height: 1100,
    },
    medium: "Acrylic on panel",
    year: "2026",
    dimensions: "18 x 24 in",
    status: "Available",
    category: "Painting",
    description: "A quiet color study used as placeholder artwork until the real catalog is published.",
    featured: true,
    sortOrder: 1,
  },
  {
    id: "warm-field",
    title: "Warm Field",
    slug: "warm-field",
    image: {
      src: "/artwork/warm-field.svg",
      alt: "Warm field placeholder artwork",
      width: 900,
      height: 1100,
    },
    medium: "Oil on canvas",
    year: "2025",
    dimensions: "22 x 30 in",
    status: "Sold",
    category: "Painting",
    featured: true,
    sortOrder: 2,
  },
  {
    id: "line-work",
    title: "Line Work",
    slug: "line-work",
    image: {
      src: "/artwork/line-work.svg",
      alt: "Line work placeholder artwork",
      width: 900,
      height: 1100,
    },
    medium: "Ink and wash",
    year: "2025",
    dimensions: "11 x 14 in",
    category: "Study",
    sortOrder: 3,
  },
  {
    id: "quiet-room",
    title: "Quiet Room",
    slug: "quiet-room",
    image: {
      src: "/artwork/quiet-room.svg",
      alt: "Quiet room placeholder artwork",
      width: 900,
      height: 1100,
    },
    medium: "Mixed media",
    year: "2024",
    dimensions: "16 x 20 in",
    status: "Available",
    category: "Mixed Media",
    sortOrder: 4,
  },
];

export const fallbackArtistProfile: ArtistProfile = {
  name: "Josh",
  bio: "Josh is a visual artist building a body of work across painting, drawing, and mixed media.",
  statement:
    "The work balances close observation with atmosphere, leaving room for texture, quiet color, and the trace of the hand.",
  aboutKicker: "Artist Statement",
  aboutDetails: [
    { label: "Mediums", value: "Painting, drawing, mixed media" },
    { label: "Focus", value: "Natural forms, fragmented spaces, imagined environments" },
    { label: "Inquiries", value: "Available works and commissions" },
  ],
  portrait: {
    src: "/artwork/study-in-blue.svg",
    alt: "Placeholder artist portrait",
    width: 900,
    height: 1100,
  },
};

export const fallbackSiteSettings: SiteSettings = {
  title: "Josh Artwork",
  description: "A portfolio of artwork, paintings, studies, and available pieces.",
  artistName: "Josh",
  navLabels: {
    home: "Home",
    gallery: "Gallery",
    about: "About",
    contact: "Contact",
  },
  socialLinks: [],
};

export const fallbackHomePageSettings: HomePageSettings = {
  eyebrowText: "Artwork Portfolio",
  secondaryLinkLabel: "Read more",
  featuredHeading: "Featured Work",
  featuredLinkLabel: "View gallery",
  showHeroArtwork: true,
  heroCarouselIntervalSeconds: 6,
  showFeaturedArtwork: true,
};

export const fallbackGalleryPageSettings: GalleryPageSettings = {
  kicker: "Selected Work",
  heading: "Gallery",
  intro: "A quiet index of selected pieces, studies, and available work.",
  seoTitle: "Gallery",
  seoDescription: "Browse selected artwork, paintings, studies, and recent pieces.",
};

export const fallbackContactPageSettings: ContactPageSettings = {
  heading: "Contact",
  intro: "For commissions, available works, studio visits, or exhibition inquiries, send a note below.",
};
