export type ArtworkImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export type Artwork = {
  id: string;
  title: string;
  slug: string;
  image: ArtworkImage;
  medium?: string;
  year?: string;
  dimensions?: string;
  status?: string;
  category?: string;
  description?: string;
  featured?: boolean;
  sortOrder?: number;
  displayWidth?: number;
  displayMaxHeight?: number;
  galleryDisplayWidth?: number;
  galleryDisplayMaxHeight?: number;
  detailDisplayWidth?: number;
  detailDisplayMaxHeight?: number;
};

export type SocialLink = {
  label: string;
  href: string;
  icon?: "instagram" | "facebook" | "youtube" | "tiktok" | "x" | "linkedin" | "email";
};

export type ArtistProfile = {
  name: string;
  bio: string;
  statement?: string;
  aboutKicker?: string;
  aboutDetails?: {
    label: string;
    value: string;
  }[];
  portrait?: ArtworkImage;
  email?: string;
  socialLinks: SocialLink[];
};

export type SiteSettings = {
  title: string;
  description: string;
  artistName: string;
  brandLogo?: ArtworkImage;
  homepageKicker?: string;
  navLabels?: {
    home?: string;
    gallery?: string;
    about?: string;
    contact?: string;
  };
  socialLinks: SocialLink[];
};

export type HomePageSettings = {
  eyebrowText?: string;
  headline?: string;
  intro?: string;
  secondaryLinkLabel?: string;
  showHeroArtwork?: boolean;
  heroArtwork?: Artwork;
  heroArtworks?: Artwork[];
  heroCarouselIntervalSeconds?: number;
  showFeaturedArtwork?: boolean;
};

export type ContactPageSettings = {
  heading?: string;
  intro?: string;
  image?: ArtworkImage;
  showImage?: boolean;
  showDirectEmail?: boolean;
  emailLinkLabel?: string;
};
