# Astro AR

A lightweight Astro + AR.js solar-system experience. Point a phone at a Hiro marker to reveal the supplied 3D model.

## Development

```sh
bun install
bun run dev
```

Astro serves the site at `http://localhost:4321`. Camera access works on `localhost`; production camera access requires HTTPS.

```sh
bun run build
bun run preview
```

## Controls

- Point the camera at a Hiro marker.
- Use `+` and `−` to change the model scale.
- Open `i` for instructions and attribution.

## Deployment

Pushes to `main` or a manual **Run workflow** dispatch run `.github/workflows/deploy.yml`. The workflow installs dependencies, builds the static Astro output, validates deployment configuration, and syncs `dist/` to `/var/www/ar/` over SSH. Before running it, add these repository secrets under **Settings → Secrets and variables → Actions**:

- `VPS_SSH_KEY`: the private deploy key, including the `BEGIN`/`END` lines
- `VPS_USER`: the SSH username
- `VPS_HOST`: the VPS hostname or IP address

Point `ar.deutan.dev` at `/var/www/ar/` in nginx. If a secret is missing, the workflow stops before loading the SSH action and reports the exact missing name. The workflow does not push or mutate the repository.

## Attribution

The model is **“Solar System animation” by Samer_Arab_S5**, sourced from [Sketchfab](https://skfb.ly/oKOqS) and licensed under [Creative Commons Attribution 4.0](https://creativecommons.org/licenses/by/4.0/). The original `license.txt` is included with the model assets.

Made by [deutan.dev](https://deutan.dev).
