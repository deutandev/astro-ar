# Astro AR

A small marker-based AR.js experience that puts the solar system into your camera. Point a phone at a **Hiro marker** to reveal the supplied 3D model.

## Run locally

This is a static site. Serve the repository over localhost (camera APIs do not work from `file://`):

```sh
python3 -m http.server 8080
```

Open `http://localhost:8080` on a device with a camera. For a phone on another network, use an HTTPS host (for example GitHub Pages or a local HTTPS tunnel).

## Controls

- Point the camera at a Hiro marker (print one from the [AR.js marker generator](https://ar-js-org.github.io/AR.js/three.js/examples/marker-training/examples/generator.html)).
- Use `+` and `−` to change the model scale.
- Tap `i` for project and model attribution.

## Attribution

The model is **“Solar System animation” by Samer_Arab_S5**, sourced from [Sketchfab](https://skfb.ly/oKOqS) and licensed under [Creative Commons Attribution 4.0](https://creativecommons.org/licenses/by/4.0/). The original `license.txt` is included beside the model assets.

Made by [deutan.dev](https://deutan.dev).
