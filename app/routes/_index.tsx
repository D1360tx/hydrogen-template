import {defer, type LoaderFunctionArgs} from '@netlify/remix-runtime';
import {Await, useLoaderData, Link, type MetaFunction} from '@remix-run/react';
import {Suspense} from 'react';
import {Image, Money} from '@shopify/hydrogen';
import type {
  FeaturedCollectionFragment,
  RecommendedProductsQuery,
} from 'storefrontapi.generated';

export const meta: MetaFunction = () => {
  return [
    {title: 'Chalice | Maison de Champagne'},
    {
      name: 'description',
      content:
        'Since 1837, Chalice has crafted extraordinary champagnes from the finest terroirs of France. Experience unparalleled luxury.',
    },
  ];
};

export async function loader(args: LoaderFunctionArgs) {
  const deferredData = loadDeferredData(args);
  const criticalData = await loadCriticalData(args);
  return defer({...deferredData, ...criticalData});
}

async function loadCriticalData({context}: LoaderFunctionArgs) {
  const [{collections}] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
  ]);

  return {
    featuredCollection: collections.nodes[0],
  };
}

function loadDeferredData({context}: LoaderFunctionArgs) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error) => {
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
  };
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="home">
      <HeroSection />
      <MaisonSection />
      <CollectionsSection />
      <ExperienceSection />
      <TerroirSection />
      <PrivateSection />
      <RecommendedProducts products={data.recommendedProducts} />
    </div>
  );
}

/* ─────────────────────────────────────────────
   HERO — Full-screen cinematic entrance
   ───────────────────────────────────────────── */

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="hero-grain" />

      <div className="hero-decorative-left" />
      <div className="hero-decorative-right" />

      <div className="hero-content">
        <p className="hero-overline">Maison de Champagne &mdash; Established 1837</p>
        <h1>
          The Art of
          <br />
          <em>Chalice</em>
        </h1>
        <p className="hero-subtitle">
          Where centuries of savoir-faire converge with the rarest terroirs
          of Champagne to create moments of transcendent beauty.
        </p>
        <div className="hero-cta">
          <Link to="/collections" className="btn-luxury">
            <span>Discover the Collection</span>
          </Link>
        </div>
      </div>

      <div className="hero-scroll">
        <span className="hero-scroll-text">Explore</span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   MAISON — Heritage & Story
   ───────────────────────────────────────────── */

function MaisonSection() {
  return (
    <section className="section-maison">
      <div className="maison-content">
        <div className="maison-text">
          <p className="maison-overline">Our Heritage</p>
          <h2>
            A Legacy Forged
            <br />
            in <em>Excellence</em>
          </h2>
          <p className="maison-description">
            For nearly two centuries, Chalice has stood as a beacon of
            uncompromising quality in the heart of Champagne. Each bottle
            is a testament to the vision of our founders, who believed that
            true luxury lies not in ostentation, but in the relentless
            pursuit of perfection.
          </p>
          <p className="maison-description">
            From our limestone cellars beneath the chalky soils of
            &Eacute;pernay, we continue a tradition that transforms the
            extraordinary fruit of our grand cru vineyards into liquid art.
          </p>
          <Link to="/collections" className="btn-luxury">
            <span>Our Story</span>
          </Link>

          <div className="maison-stats">
            <div className="maison-stat">
              <span className="maison-stat-number">1837</span>
              <span className="maison-stat-label">Year Founded</span>
            </div>
            <div className="maison-stat">
              <span className="maison-stat-number">47</span>
              <span className="maison-stat-label">Hectares</span>
            </div>
            <div className="maison-stat">
              <span className="maison-stat-number">6</span>
              <span className="maison-stat-label">Generations</span>
            </div>
          </div>
        </div>

        <div className="maison-visual">
          <div className="maison-image-frame">
            <div className="maison-image-overlay">
              <span className="maison-year">1837</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   COLLECTIONS — Showcase cuv&eacute;es
   ───────────────────────────────────────────── */

function CollectionsSection() {
  const collections = [
    {
      title: 'Prestige Cuv\u00E9e',
      category: 'Signature Collection',
      description:
        'Our flagship expression, blending the finest parcels from five grand cru villages into a symphony of elegance.',
      link: '/collections',
    },
    {
      title: 'Blanc de Blancs',
      category: 'Single Varietal',
      description:
        'Pure Chardonnay brilliance from our C\u00F4te des Blancs vineyards, aged to ethereal perfection.',
      link: '/collections',
    },
    {
      title: 'Ros\u00E9 d\u2019Or',
      category: 'Limited Edition',
      description:
        'A rare and captivating ros\u00E9, born from the art of blending and the patience of time.',
      link: '/collections',
    },
  ];

  return (
    <section className="section-collections">
      <div className="collections-header">
        <p className="collections-overline">The Collection</p>
        <h2>Cuv&eacute;es of Distinction</h2>
        <p>
          Each cuv&eacute;e in our portfolio represents the pinnacle of its
          style, crafted with precision and aged with patience in our
          centuries-old cellars.
        </p>
      </div>

      <div className="collections-showcase">
        {collections.map((collection, index) => (
          <Link
            key={index}
            to={collection.link}
            className="collection-card"
          >
            <div className="collection-card-bg" />
            <div className="collection-card-overlay" />
            <div className="collection-card-icon">
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 5 L55 35 L85 35 L60 55 L70 85 L50 67 L30 85 L40 55 L15 35 L45 35 Z" />
              </svg>
            </div>
            <div className="collection-card-border" />
            <div className="collection-card-content">
              <p className="collection-card-category">
                {collection.category}
              </p>
              <h3 className="collection-card-title">{collection.title}</h3>
              <p className="collection-card-description">
                {collection.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   EXPERIENCE — Tasting & Sensory
   ───────────────────────────────────────────── */

function ExperienceSection() {
  return (
    <section className="section-experience">
      <div className="experience-content">
        <div className="experience-header">
          <p className="experience-overline">The Chalice Experience</p>
          <h2>An Invitation to the Senses</h2>
          <p>
            Every encounter with Chalice is designed to transcend the
            ordinary, engaging sight, scent, and palate in a journey
            through the very essence of champagne.
          </p>
        </div>

        <div className="experience-grid">
          <div className="experience-card">
            <div className="experience-card-icon">
              <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="16" r="10" />
                <path d="M24 26 L24 38" />
                <path d="M16 38 L32 38" />
              </svg>
            </div>
            <h3>The Visual</h3>
            <p>
              A cascade of golden effervescence rises through crystal,
              catching light in an eternal dance of tiny, precise bubbles.
            </p>
          </div>

          <div className="experience-card">
            <div className="experience-card-icon">
              <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 4 C24 4 8 16 8 28 C8 36 15 44 24 44 C33 44 40 36 40 28 C40 16 24 4 24 4Z" />
              </svg>
            </div>
            <h3>The Bouquet</h3>
            <p>
              Layers of white flowers, brioche, and citrus unfold
              gradually, revealing the complexity of decades-long aging.
            </p>
          </div>

          <div className="experience-card">
            <div className="experience-card-icon">
              <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4 L12 20 C12 28 17 34 24 34 C31 34 36 28 36 20 L36 4" />
                <path d="M8 4 L40 4" />
                <path d="M24 34 L24 44" />
                <path d="M16 44 L32 44" />
              </svg>
            </div>
            <h3>The Palate</h3>
            <p>
              Silk meets structure as flavors of orchard fruit, toasted
              almond, and mineral finesse create an endlessly evolving finish.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   TERROIR — Estate & Vineyards
   ───────────────────────────────────────────── */

function TerroirSection() {
  return (
    <section className="section-terroir">
      <div className="terroir-content">
        <div className="terroir-text">
          <p className="terroir-overline">Our Terroir</p>
          <h2>
            Grand Cru
            <br />
            <em>Vineyards</em>
          </h2>
          <p className="terroir-description">
            Our estate spans the most coveted slopes of Champagne, where
            chalky limestone soils and a unique microclimate conspire to
            produce grapes of extraordinary concentration and finesse.
          </p>
          <p className="terroir-description">
            Each parcel is tended by hand, honoring the ancient rhythms of
            the vine and the wisdom passed down through six generations of
            our family.
          </p>

          <div className="terroir-details">
            <div className="terroir-detail">
              <span className="terroir-detail-label">Region</span>
              <span className="terroir-detail-value">
                C&ocirc;te des Blancs &amp; Montagne de Reims
              </span>
            </div>
            <div className="terroir-detail">
              <span className="terroir-detail-label">Soil</span>
              <span className="terroir-detail-value">
                Cretaceous chalk over Kimmeridgian limestone
              </span>
            </div>
            <div className="terroir-detail">
              <span className="terroir-detail-label">Varietals</span>
              <span className="terroir-detail-value">
                Chardonnay, Pinot Noir, Pinot Meunier
              </span>
            </div>
            <div className="terroir-detail">
              <span className="terroir-detail-label">Classification</span>
              <span className="terroir-detail-value">
                Grand Cru &amp; Premier Cru
              </span>
            </div>
          </div>
        </div>

        <div className="terroir-visual">
          <div className="terroir-image-frame">
            <div className="terroir-image-overlay">
              <span className="terroir-coords">49.0417&deg; N</span>
              <span className="terroir-coords">3.9530&deg; E</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PRIVATE — Exclusive Membership
   ───────────────────────────────────────────── */

function PrivateSection() {
  return (
    <section className="section-private">
      <div className="private-content">
        <p className="private-overline">By Invitation Only</p>
        <h2>
          The Chalice <em>Cercle Priv&eacute;</em>
        </h2>
        <p className="private-description">
          An exclusive membership reserved for those who appreciate the
          rarest expressions of champagne. Members receive priority
          access to limited releases, private tastings at our estate, and
          bespoke cuv&eacute;es created exclusively for our cercle.
        </p>

        <div className="private-features">
          <div className="private-feature">
            <div className="private-feature-icon" />
            <span>Priority Allocations</span>
          </div>
          <div className="private-feature">
            <div className="private-feature-icon" />
            <span>Private Tastings</span>
          </div>
          <div className="private-feature">
            <div className="private-feature-icon" />
            <span>Estate Experiences</span>
          </div>
          <div className="private-feature">
            <div className="private-feature-icon" />
            <span>Bespoke Cuv&eacute;es</span>
          </div>
        </div>

        <Link to="/account" className="btn-luxury-filled">
          Request Membership
        </Link>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   RECOMMENDED PRODUCTS — Shopify Products
   ───────────────────────────────────────────── */

function RecommendedProducts({
  products,
}: {
  products: Promise<RecommendedProductsQuery | null>;
}) {
  return (
    <section className="section-products">
      <div className="products-header">
        <p className="products-overline">From Our Cellar</p>
        <h2>Curated Selections</h2>
      </div>
      <Suspense fallback={<div />}>
        <Await resolve={products}>
          {(response) => (
            <div className="recommended-products-grid">
              {response
                ? response.products.nodes.map((product) => (
                    <Link
                      key={product.id}
                      className="recommended-product"
                      to={`/products/${product.handle}`}
                    >
                      <Image
                        data={product.images.nodes[0]}
                        aspectRatio="3/4"
                        sizes="(min-width: 45em) 20vw, 50vw"
                      />
                      <h4>{product.title}</h4>
                      <small>
                        <Money data={product.priceRange.minVariantPrice} />
                      </small>
                    </Link>
                  ))
                : null}
            </div>
          )}
        </Await>
      </Suspense>
    </section>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
` as const;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 1) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
` as const;
