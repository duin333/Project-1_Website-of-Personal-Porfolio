# Cloudflare Pages deployment

- Production: https://duin333.dpdns.org/
- Cloudflare hostname: https://duin333-portfolio.pages.dev/
- Project: `duin333-portfolio`
- Source: `duin333/Project-1_Website-of-Personal-Porfolio`
- Production branch: `main`
- Build command: `npm run build`
- Output directory: `dist`
- Root directory: repository root
- Build environment: `NODE_VERSION=22`
- Automatic Git deployments: enabled

## Custom domain and DNS

Registered `duin333.dpdns.org` using DigitalPlat's free domain slot on November 23, 2026. The displayed expiration date is November 23, 2027. DigitalPlat currently allows free renewal within 120 days of expiry; advance renewals use credits. Check the registrar before expiry rather than assuming automatic renewal or permanent availability.

Cloudflare DNS uses the Free plan and full nameserver delegation:

- `elijah.ns.cloudflare.com`
- `lina.ns.cloudflare.com`

Root DNS record:

| Type | Name | Target | Proxy | TTL |
| --- | --- | --- | --- | --- |
| CNAME | `@` | `duin333-portfolio.pages.dev` | Proxied | Auto |

The domain is also associated with the Pages project through Custom domains. Manage the record there when changing the deployment target.

## Verification

Public DNS resolved the assigned Cloudflare nameservers. The custom domain returned HTTP 200 over HTTPS with normal certificate validation, and displayed the portfolio in the browser without a certificate warning.

Production checks covered Vietnamese/English/Japanese switching, a Japanese ComicHub deep link, project dialog closing, self-hosted Be Vietnam Pro / Playfair Display fonts, FX controls and the Mochi mascot. No application errors appeared in the production browser console during these checks. A subsequent push to `main` triggered another successful automatic Pages deployment.

Future updates: commit and push to `main`, then inspect the latest Pages build before considering the release complete. Keep the `pages.dev` URL as a fallback.
