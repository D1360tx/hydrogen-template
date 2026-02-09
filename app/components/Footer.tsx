import {Suspense} from 'react';
import {Await, NavLink} from '@remix-run/react';
import type {FooterQuery, HeaderQuery} from 'storefrontapi.generated';

interface FooterProps {
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  publicStoreDomain: string;
}

export function Footer({
  footer: footerPromise,
  header,
  publicStoreDomain,
}: FooterProps) {
  return (
    <Suspense>
      <Await resolve={footerPromise}>
        {(footer) => (
          <footer className="footer">
            <div className="footer-inner">
              <div className="footer-top">
                <div className="footer-brand">
                  <h3>Chalice</h3>
                  <p>
                    Maison de Champagne since 1837. Crafting extraordinary
                    cuv&eacute;es from the finest grand cru terroirs of
                    France.
                  </p>
                </div>

                <div className="footer-column">
                  <h4>Maison</h4>
                  <NavLink prefetch="intent" to="/collections">
                    Collections
                  </NavLink>
                  <NavLink prefetch="intent" to="/pages/about">
                    Our Heritage
                  </NavLink>
                  <NavLink prefetch="intent" to="/blogs/journal">
                    Journal
                  </NavLink>
                </div>

                <div className="footer-column">
                  <h4>Experience</h4>
                  <NavLink prefetch="intent" to="/account">
                    Cercle Priv&eacute;
                  </NavLink>
                  <NavLink prefetch="intent" to="/collections">
                    Private Tastings
                  </NavLink>
                  <NavLink prefetch="intent" to="/collections">
                    Estate Visits
                  </NavLink>
                </div>

                <div className="footer-column">
                  <h4>Contact</h4>
                  <NavLink prefetch="intent" to="/pages/about">
                    Maison Chalice
                  </NavLink>
                  <NavLink prefetch="intent" to="/pages/about">
                    &Eacute;pernay, France
                  </NavLink>
                  <NavLink prefetch="intent" to="/pages/about">
                    Enquiries
                  </NavLink>
                </div>
              </div>

              <div className="footer-bottom">
                <p>
                  &copy; {new Date().getFullYear()} Chalice Champagne. All
                  rights reserved.
                </p>
                {footer?.menu && header.shop.primaryDomain?.url && (
                  <FooterMenu
                    menu={footer.menu}
                    primaryDomainUrl={header.shop.primaryDomain.url}
                    publicStoreDomain={publicStoreDomain}
                  />
                )}
              </div>
            </div>
          </footer>
        )}
      </Await>
    </Suspense>
  );
}

function FooterMenu({
  menu,
  primaryDomainUrl,
  publicStoreDomain,
}: {
  menu: FooterQuery['menu'];
  primaryDomainUrl: FooterProps['header']['shop']['primaryDomain']['url'];
  publicStoreDomain: string;
}) {
  return (
    <nav className="footer-menu" role="navigation">
      {(menu || FALLBACK_FOOTER_MENU).items.map((item) => {
        if (!item.url) return null;
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        const isExternal = !url.startsWith('/');
        return isExternal ? (
          <a
            href={url}
            key={item.id}
            rel="noopener noreferrer"
            target="_blank"
          >
            {item.title}
          </a>
        ) : (
          <NavLink end key={item.id} prefetch="intent" to={url}>
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

const FALLBACK_FOOTER_MENU = {
  id: 'gid://shopify/Menu/199655620664',
  items: [
    {
      id: 'gid://shopify/MenuItem/461633060920',
      resourceId: 'gid://shopify/ShopPolicy/23358046264',
      tags: [],
      title: 'Privacy Policy',
      type: 'SHOP_POLICY',
      url: '/policies/privacy-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633093688',
      resourceId: 'gid://shopify/ShopPolicy/23358013496',
      tags: [],
      title: 'Refund Policy',
      type: 'SHOP_POLICY',
      url: '/policies/refund-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633126456',
      resourceId: 'gid://shopify/ShopPolicy/23358111800',
      tags: [],
      title: 'Shipping Policy',
      type: 'SHOP_POLICY',
      url: '/policies/shipping-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633159224',
      resourceId: 'gid://shopify/ShopPolicy/23358079032',
      tags: [],
      title: 'Terms of Service',
      type: 'SHOP_POLICY',
      url: '/policies/terms-of-service',
      items: [],
    },
  ],
};
