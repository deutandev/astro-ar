# Astro AR

Astro AR is a lightweight Astro + AR.js solar-system experience. A printed bitmap marker anchors a 3D visualization in the camera view.

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

- Point the camera at the supplied bitmap marker.
- Use `+` and `−` to change the model scale.
- Open `i` for the bilingual information panel.
- Switch between Indonesian (`ID`) and English (`EN`) in the information panel.

## Visualization notes

- Planet orbits are animated procedurally and run continuously.
- Relative orbital speeds are based on the planets’ orbital periods, with time accelerated for a usable AR demonstration.
- Planet sizes and distances are intentionally **not to scale**; real solar-system proportions would make the outer planets and smaller worlds impossible to see together.
- The Moon is omitted so the visualization focuses on the planets and their solar orbits.

## Deployment

Pushes to `main` or a manual **Run workflow** dispatch run `.github/workflows/deploy.yml`. The workflow installs dependencies, builds the static Astro output, validates deployment configuration, and syncs `dist/` to `/var/www/ar/` over SSH. Before running it, add these repository secrets under **Settings → Secrets and variables → Actions**:

- `VPS_SSH_KEY`: the private deploy key, including the `BEGIN`/`END` lines
- `VPS_USER`: the SSH username
- `VPS_HOST`: the VPS hostname or IP address

Point `ar.deutan.dev` at `/var/www/ar/` in nginx. If a secret is missing, the workflow stops before loading the SSH action and reports the exact missing name. The workflow does not push or mutate the repository.

## Attribution

The model is **“Solar System animation” by Samer_Arab_S5**, sourced from [Sketchfab](https://skfb.ly/oKOqS) and licensed under [Creative Commons Attribution 4.0](https://creativecommons.org/licenses/by/4.0/). The original `license.txt` is included with the model assets.

Made by [deutan.dev](https://deutan.dev).
