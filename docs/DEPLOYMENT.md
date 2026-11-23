# Cloudflare Pages deployment

- Production: https://duin333-portfolio.pages.dev/
- Project: `duin333-portfolio`
- Source: `duin333/Project-1_Website-of-Personal-Porfolio`
- Production branch: `main`
- Build command: `npm run build`
- Output directory: `dist`
- Root directory: repository root
- Build environment: `NODE_VERSION=22`
- Automatic Git deployments: enabled

First deployment was verified over HTTPS. Checked Vietnamese/English/Japanese switching, a Japanese ComicHub deep link, project dialog closing, self-hosted Be Vietnam Pro / Playfair Display fonts, FX controls and the Mochi mascot. No application errors appeared in the production browser console during these checks.

## Custom domain status

Not registered/configured yet. The proposed free name `duin333.qzz.io` has not been checked for availability. DigitalPlat account registration is required before checking and registering it.

After obtaining a domain:

1. Add the exact registered name as a Cloudflare DNS zone using the Free plan.
2. Copy the exact nameservers assigned to that zone into the registrar's nameserver settings.
3. Wait until the zone is Active.
4. Add the domain through Pages → `duin333-portfolio` → Custom domains. Let Cloudflare create or validate the required CNAME record.
5. Wait for domain activation and certificate issuance; verify the real domain over HTTPS and with project deep links.

The `pages.dev` URL is a working public deployment but does not by itself fulfill the assignment's separate custom-domain and nameserver requirements.
