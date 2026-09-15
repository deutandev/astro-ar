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

Pushes to `main` run `.github/workflows/deploy.yml`, build the static Astro output, and sync `dist/` to `/var/www/ar/`. Configure the repository secrets `VPS_SSH_KEY`, `VPS_USER`, and `VPS_HOST`; point `ar.deutan.dev` at that VPS directory in nginx.

## Attribution

The model is **“Solar System animation” by Samer_Arab_S5**, sourced from [Sketchfab](https://skfb.ly/oKOqS) and licensed under [Creative Commons Attribution 4.0](https://creativecommons.org/licenses/by/4.0/). The original `license.txt` is included with the model assets.

Made by [deutan.dev](https://deutan.dev).
