# Hostinger static hosting

Run `npm run build:hostinger` to generate `dist/`. The normal `npm run build`
continues to build the Next.js server version.

Upload the contents of `dist/` (or extract `dist.zip`) directly into your domain's
`public_html` directory in Hostinger File Manager. `index.html`, `.htaccess`, and
`_next/` must be directly inside `public_html`, not a nested `dist` directory.

The static version opens the visitor's email app with their completed requirements.
They must press Send in that app. It does not run the Next.js `/api/contact` endpoint
or send email automatically. The recipient is configured in `src/lib/constants.ts`.
Automatic form delivery requires a separately hosted backend or the Node.js version.

After rebuilding, archive the contents of `dist/` with ZIP paths using forward
slashes for Linux hosting. Include the hidden `.htaccess` file and place
`index.html` at the archive root. The supplied `dist.zip` already uses this layout.
