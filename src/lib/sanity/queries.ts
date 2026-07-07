import type { ArtistProfile, Artwork, ContactPageSettings, HomePageSettings, SiteSettings } from "@/lib/types";
import { sanityClient } from "./client";
import {
  fallbackArtistProfile,
  fallbackArtwork,
  fallbackContactPageSettings,
  fallbackHomePageSettings,
  fallbackSiteSettings,
} from "./fallbackData";
import { urlForImage } from "./image";

type SanityImage = {
  asset?: {
    _ref?: string;
    _id?: string;
    metadata?: {
      dimensions?: {
        width?: number;
        height?: number;
      };
    };
  };
  alt?: string;
};

type SanityArtwork = Omit<Artwork, "id" | "slug" | "image"> & {
  _id: string;
  slug?: { current?: string };
  image?: SanityImage;
};

type SanitySiteSettings = Omit<SiteSettings, "brandLogo"> & {
  brandLogo?: SanityImage;
};

type SanityArtistProfile = Omit<ArtistProfile, "socialLinks"> & {
  socialLinks?: ArtistProfile["socialLinks"] | null;
  portrait?: SanityImage;
};

type SanityHomePageSettings = Omit<HomePageSettings, "heroArtwork" | "heroArtworks"> & {
  heroArtwork?: SanityArtwork | null;
  heroArtworks?: SanityArtwork[] | null;
};

type SanityContactPageSettings = Omit<ContactPageSettings, "image"> & {
  image?: SanityImage;
};

function normalizeSocialLinks(
  links: ArtistProfile["socialLinks"] | SiteSettings["socialLinks"] | null | undefined,
) {
  return Array.isArray(links) ? links.filter((link) => link?.label && link?.href) : [];
}

const artworkProjection = `{
  _id,
  title,
  slug,
  image{
    ...,
    asset->{
      _id,
      metadata {
        dimensions {
          width,
          height
        }
      }
    }
  },
  medium,
  year,
  dimensions,
  status,
  category,
  description,
  featured,
  sortOrder,
  displayWidth,
  displayMaxHeight,
  galleryDisplayWidth,
  galleryDisplayMaxHeight,
  detailDisplayWidth,
  detailDisplayMaxHeight
}`;

function mapArtwork(piece: SanityArtwork): Artwork | null {
  const slug = piece.slug?.current;
  const imageUrl = piece.image
    ? urlForImage(piece.image)?.width(1800).fit("max").quality(86).url()
    : undefined;
  const dimensions = piece.image?.asset?.metadata?.dimensions;

  if (!slug || !imageUrl) {
    return null;
  }

  return {
    id: piece._id,
    title: piece.title,
    slug,
    image: {
      src: imageUrl,
      alt: piece.image?.alt || piece.title,
      width: dimensions?.width || 900,
      height: dimensions?.height || 1100,
    },
    medium: piece.medium,
    year: piece.year,
    dimensions: piece.dimensions,
    status: piece.status,
    category: piece.category,
    description: piece.description,
    featured: piece.featured,
    sortOrder: piece.sortOrder,
    displayWidth: piece.displayWidth,
    displayMaxHeight: piece.displayMaxHeight,
    galleryDisplayWidth: piece.galleryDisplayWidth,
    galleryDisplayMaxHeight: piece.galleryDisplayMaxHeight,
    detailDisplayWidth: piece.detailDisplayWidth,
    detailDisplayMaxHeight: piece.detailDisplayMaxHeight,
  };
}

function mapImage(image: SanityImage | undefined, fallbackAlt: string): Artwork["image"] | undefined {
  if (!image) {
    return undefined;
  }

  const imageUrl = urlForImage(image)?.width(1200).fit("max").quality(86).url();
  const dimensions = image.asset?.metadata?.dimensions;

  if (!imageUrl) {
    return undefined;
  }

  return {
    src: imageUrl,
    alt: image.alt || fallbackAlt,
    width: dimensions?.width || 600,
    height: dimensions?.height || 240,
  };
}

async function fetchSanity<T>(query: string, params: Record<string, string> = {}): Promise<T | undefined> {
  if (!sanityClient) {
    return undefined;
  }

  try {
    return await sanityClient.fetch<T>(query, params);
  } catch {
    return undefined;
  }
}

export async function getAllArtwork(): Promise<Artwork[]> {
  const data = await fetchSanity<SanityArtwork[]>(
    `*[_type == "artwork"] | order(sortOrder asc, year desc, title asc) ${artworkProjection}`,
  );

  if (data === undefined) {
    return fallbackArtwork;
  }

  return data.map(mapArtwork).filter((piece): piece is Artwork => Boolean(piece));
}

export async function getFeaturedArtwork(): Promise<Artwork[]> {
  const artwork = await getAllArtwork();
  const featured = artwork.filter((piece) => piece.featured);

  return (featured.length ? featured : artwork).slice(0, 3);
}

export async function getArtworkBySlug(slug: string): Promise<Artwork | null> {
  const data = await fetchSanity<SanityArtwork | null>(
    `*[_type == "artwork" && slug.current == $slug][0] ${artworkProjection}`,
    { slug },
  );

  if (data === undefined) {
    return fallbackArtwork.find((piece) => piece.slug === slug) || null;
  }

  const mapped = data ? mapArtwork(data) : null;

  if (mapped) {
    return mapped;
  }

  return null;
}

export async function getArtistProfile(): Promise<ArtistProfile> {
  const data = await fetchSanity<SanityArtistProfile | null>(`*[_type == "artistProfile"][0]{
    name,
    bio,
    statement,
    aboutKicker,
    aboutDetails[]{
      label,
      value
    },
    portrait{
      ...,
      asset->{
        _id,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    },
    email,
    socialLinks
  }`);

  return data?.name
    ? {
        ...fallbackArtistProfile,
        ...data,
        portrait: mapImage(data.portrait, `${data.name || fallbackArtistProfile.name} portrait`),
        socialLinks: normalizeSocialLinks(data.socialLinks),
      }
    : fallbackArtistProfile;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const data = await fetchSanity<SanitySiteSettings | null>(`*[_type == "siteSettings"][0]{
    title,
    description,
    artistName,
    brandLogo{
      ...,
      asset->{
        _id,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    },
    homepageKicker,
    navLabels,
    socialLinks
  }`);

  return data?.title
    ? {
        ...fallbackSiteSettings,
        ...data,
        brandLogo: mapImage(data.brandLogo, `${data.artistName || fallbackSiteSettings.artistName} logo`),
        navLabels: {
          ...fallbackSiteSettings.navLabels,
          ...data.navLabels,
        },
        socialLinks: normalizeSocialLinks(data.socialLinks),
      }
    : fallbackSiteSettings;
}

export async function getHomePageSettings(): Promise<HomePageSettings> {
  const data = await fetchSanity<SanityHomePageSettings | null>(`*[_type == "homePageSettings"][0]{
    eyebrowText,
    headline,
    intro,
    secondaryLinkLabel,
    showHeroArtwork,
    heroArtworks[]->${artworkProjection},
    heroArtwork->${artworkProjection},
    heroCarouselIntervalSeconds,
    showFeaturedArtwork
  }`);

  if (!data) {
    return fallbackHomePageSettings;
  }

  const { heroArtwork, heroArtworks, ...settings } = data;
  const mappedHeroArtworks = Array.isArray(heroArtworks)
    ? heroArtworks.map(mapArtwork).filter((piece): piece is Artwork => Boolean(piece))
    : [];
  const mappedHeroArtwork = heroArtwork ? mapArtwork(heroArtwork) || undefined : undefined;

  return {
    ...fallbackHomePageSettings,
    ...settings,
    heroArtwork: mappedHeroArtwork,
    heroArtworks: mappedHeroArtworks.length ? mappedHeroArtworks : mappedHeroArtwork ? [mappedHeroArtwork] : undefined,
    heroCarouselIntervalSeconds:
      settings.heroCarouselIntervalSeconds ?? fallbackHomePageSettings.heroCarouselIntervalSeconds,
    showHeroArtwork: settings.showHeroArtwork ?? fallbackHomePageSettings.showHeroArtwork,
    showFeaturedArtwork: settings.showFeaturedArtwork ?? fallbackHomePageSettings.showFeaturedArtwork,
  };
}

export async function getContactPageSettings(): Promise<ContactPageSettings> {
  const data = await fetchSanity<SanityContactPageSettings | null>(`*[_type == "contactPageSettings"][0]{
    heading,
    intro,
    image{
      ...,
      asset->{
        _id,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    },
    showImage,
    showDirectEmail,
    emailLinkLabel
  }`);

  if (!data) {
    return fallbackContactPageSettings;
  }

  return {
    ...fallbackContactPageSettings,
    ...data,
    image: mapImage(data.image, `${data.heading || fallbackContactPageSettings.heading} contact image`),
    showImage: data.showImage ?? fallbackContactPageSettings.showImage,
    showDirectEmail: data.showDirectEmail ?? fallbackContactPageSettings.showDirectEmail,
  };
}
