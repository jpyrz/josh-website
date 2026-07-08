import { ArtistIntro } from "@/components/ArtistIntro";
import { FeaturedArtwork } from "@/components/FeaturedArtwork";
import { PageShell } from "@/components/PageShell";
import { getArtistProfile, getFeaturedArtwork, getHomePageSettings } from "@/lib/sanity/queries";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [artist, artwork, homePage] = await Promise.all([
    getArtistProfile(),
    getFeaturedArtwork(),
    getHomePageSettings(),
  ]);

  return (
    <PageShell variant="home">
      <ArtistIntro
        artist={artist}
        kicker={homePage.eyebrowText}
        headline={homePage.headline}
        intro={homePage.intro}
        secondaryLinkLabel={homePage.secondaryLinkLabel}
        heroArtworks={
          homePage.showHeroArtwork
            ? homePage.heroArtworks || artwork.slice(0, 3)
            : undefined
        }
        heroCarouselIntervalSeconds={homePage.heroCarouselIntervalSeconds}
      />
      {homePage.showFeaturedArtwork && (
        <FeaturedArtwork
          artwork={artwork}
          heading={homePage.featuredHeading}
          linkLabel={homePage.featuredLinkLabel}
        />
      )}
    </PageShell>
  );
}
