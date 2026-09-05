# Mathew portfolio

A dependency-free portfolio site built around payment systems, business operations, and project proof.

## Contact links

The current site links to Mathew's email, WhatsApp, GitHub, and earlier portfolio. Replace the project descriptions with links/screenshots once each product has a live demo. The site can be deployed by dragging this folder to Netlify or importing it into a Vercel project.

## Paystack support checkout

The site includes a Vercel endpoint at `api/paystack/initialize.js`. In your Vercel project settings, add this environment variable for Production, Preview, and Development:

`PAYSTACK_SECRET_KEY=sk_live_...`

Never put that key in `index.html`, `script.js`, GitHub, or any committed `.env` file. The browser sends the donor email and selected amount to this endpoint; the endpoint asks Paystack for a secure checkout URL and redirects the donor there.
