(() => {
  const model = document.querySelector("#solar-model");
  const value = document.querySelector("#zoom-value");
  const modal = document.querySelector("#info-modal");
  const info = document.querySelector("#info-button");
  const close = document.querySelector("#close-modal");
  let zoom = 1;
  const loader = document.querySelector("#model-loader");
  const loaderText = document.querySelector("#model-loader-text");
  let modelReady = false;
  const finishModelLoading = () => { if (modelReady) return; modelReady = true; loader.classList.add("is-ready"); };
  model.addEventListener("model-loaded", finishModelLoading);
  model.addEventListener("model-error", () => { loader.classList.add("is-error"); loaderText.textContent = "Model gagal dimuat. Coba muat ulang halaman."; });
  if (model.getObject3D("mesh")) finishModelLoading();
  setTimeout(() => { if (!modelReady && !loader.classList.contains("is-error")) loaderText.textContent = "Model masih dimuat…"; }, 4000);
  const hideLunarObjects = () =>
    model.object3D.traverse((node) => {
      if (node.name.toLowerCase().startsWith("moon_")) node.visible = false;
    });
  setInterval(hideLunarObjects, 500);
  const orbitPeriods = {
    mercury: 0.24,
    venus: 0.615,
    erath: 1,
    mars: 1.88,
    jupiter: 11.86,
    saturn: 29.46,
    uranus: 84,
    neptune: 164.8,
    pluto: 248,
  };
  const orbitNodes = [];
  model.addEventListener("model-loaded", () => {
    model.object3D.traverse((node) => {
      const name = node.name.toLowerCase();
      if (name.startsWith("moon_")) {
        node.visible = false;
        return;
      }
      const planet = Object.keys(orbitPeriods).find(
        (key) =>
          name.startsWith(`${key}_beziercircle`) && !name.includes("001"),
      );
      if (planet)
        orbitNodes.push({
          node,
          speed: (Math.PI * 2) / (orbitPeriods[planet] * 12),
        });
    });
    let previous = performance.now();
    const animateOrbits = (now) => {
      const delta = Math.min((now - previous) / 1000, 0.1);
      previous = now;
      orbitNodes.forEach(({ node, speed }) => {
        node.rotation.y += speed * delta;
      });
      requestAnimationFrame(animateOrbits);
    };
    requestAnimationFrame(animateOrbits);
    const hideMoons = () =>
      model.object3D.traverse((node) => {
        if (node.name.toLowerCase().startsWith("moon_")) node.visible = false;
      });
    hideMoons();
    setTimeout(hideMoons, 500);
  });
  const languages = {
    id: {
      eyebrow: "INFORMASI",
      title: "Tata Surya dalam genggaman.",
      description:
        "Astro AR menampilkan planet-planet dalam model 3D dengan orbit yang dianimasikan. Perbandingan kecepatan revolusi mengikuti periode orbit relatif antar planet, tetapi ukuran planet dan jarak antarorbit tidak berskala nyata agar seluruh sistem tetap terlihat jelas.",
      howLabel: "CARA MENGGUNAKAN",
      howStepOne: "Buka",
      howStepTwo: "Pindai marker berikut dengan kamera",
      howStepThree: "Jaga marker tetap terlihat, lalu gerakkan ponsel untuk menjelajahi model.",
      marker: "Unduh gambar marker ↗",
      model: "Model 3D",
      license: "Di bawah lisensi ",
      madeBy: "Dibuat dengan 💙 oleh ",
      github: "GitHub ↗",
    },
    en: {
      eyebrow: "ABOUT THE VISUALIZATION",
      title: "Understanding the solar system.",
      description:
        "Astro AR displays the planets in a 3D model with procedurally animated orbits. Relative orbital speeds follow the planets’ orbital periods, but planet sizes and distances are not to scale so the complete system remains visible.",
      howLabel: "HOW TO USE",
      howStepOne: "Visit",
      howStepTwo: "Scan this marker with your camera",
      howStepThree: "Keep the marker visible, then move your phone to explore the orbits.",
      marker: "Download marker image ↗",
      model: "3D MODEL",
      license: "Licensed under ",
      madeBy: "Made with 💙 by ",
      github: "View on GitHub ↗",
    },
  };
  const setLanguage = (language) => {
    const copy = languages[language];
    document.querySelector("#modal-eyebrow").textContent = copy.eyebrow;
    document.querySelector("#modal-title").textContent = copy.title;
    document.querySelector("#modal-description").textContent = copy.description;
    document.querySelector("#how-to-label").textContent = copy.howLabel;
    document.querySelector("#how-step-one").firstChild.textContent = `${copy.howStepOne} `;
    document.querySelector("#how-step-two").textContent = copy.howStepTwo;
    document.querySelector("#how-step-three").textContent = copy.howStepThree;
    document.querySelector("#marker-download").textContent = copy.marker;
    document
      .querySelector("#lang-id")
      .setAttribute("aria-pressed", language === "id");
    document
      .querySelector("#lang-en")
      .setAttribute("aria-pressed", language === "en");
    document.documentElement.lang = language === "id" ? "id" : "en";
  };
  document
    .querySelector("#lang-id")
    .addEventListener("click", () => setLanguage("id"));
  document
    .querySelector("#lang-en")
    .addEventListener("click", () => setLanguage("en"));
  setLanguage("id");
  const renderZoom = () => {
    model.setAttribute(
      "scale",
      `${(zoom * 0.04).toFixed(3)} ${(zoom * 0.04).toFixed(3)} ${(zoom * 0.04).toFixed(3)}`,
    );
    value.textContent = `${zoom}×`;
  };
  document.querySelector("#zoom-in").addEventListener("click", () => {
    zoom = Math.min(8, +(zoom + 0.5).toFixed(1));
    renderZoom();
  });
  document.querySelector("#zoom-out").addEventListener("click", () => {
    zoom = Math.max(0.1, +(zoom - 0.5).toFixed(1));
    renderZoom();
  });
  const open = () => {
    modal.hidden = false;
    close.focus();
  };
  const dismiss = () => {
    modal.hidden = true;
    info.focus();
  };
  info.addEventListener("click", open);
  close.addEventListener("click", dismiss);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) dismiss();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) dismiss();
  });
  renderZoom();
})();
