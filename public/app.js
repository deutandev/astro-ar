(() => {
  const model = document.querySelector('#solar-model');
  const value = document.querySelector('#zoom-value');
  const modal = document.querySelector('#info-modal');
  const info = document.querySelector('#info-button');
  const close = document.querySelector('#close-modal');
  let zoom = 1;
  const languages = {
    id: { eyebrow: 'TENTANG PENGALAMAN', title: 'Kosmos dalam genggaman.', description: 'Arahkan kamera ke marker bitmap untuk menjelajahi model tata surya melalui kamera. Bergerak lebih dekat, menjauh, dan gunakan kontrol zoom untuk menemukan orbit favoritmu.', howLabel: 'CARA MENGGUNAKAN', howCopy: 'Izinkan akses kamera, lalu arahkan ponsel ke marker bitmap yang dicetak. Bergerak lebih dekat atau menjauh untuk menjelajahi model.', marker: 'Lihat / simpan gambar marker ↗', model: 'Model 3D', license: 'Dilisensikan di bawah ', madeBy: 'Dibuat oleh ', github: 'Lihat proyek di GitHub ↗' },
    en: { eyebrow: 'ABOUT THE EXPERIENCE', title: 'A pocket-sized cosmos.', description: 'Hold the bitmap marker in view and explore a living model of our solar system through your camera. Move closer, step back, and use the zoom control to find your favourite orbit.', howLabel: 'HOW TO USE', howCopy: 'Allow camera access, then point your phone at a printed bitmap marker. Move closer or farther away to explore the model.', marker: 'View / save the marker image ↗', model: '3D MODEL', license: 'Licensed under ', madeBy: 'Made by ', github: 'View project on GitHub ↗' }
  };
  const setLanguage = (language) => { const copy = languages[language]; document.querySelector('#modal-eyebrow').textContent = copy.eyebrow; document.querySelector('#modal-title').textContent = copy.title; document.querySelector('#modal-description').textContent = copy.description; document.querySelector('#how-to-label').textContent = copy.howLabel; document.querySelector('#how-to-copy').textContent = copy.howCopy; document.querySelector('#marker-link').textContent = copy.marker; document.querySelector('#model-label').textContent = copy.model; document.querySelector('#license-prefix').textContent = copy.license; document.querySelector('#made-by-label').textContent = copy.madeBy; document.querySelector('#github-link').textContent = copy.github; document.querySelector('#lang-id').setAttribute('aria-pressed', language === 'id'); document.querySelector('#lang-en').setAttribute('aria-pressed', language === 'en'); document.documentElement.lang = language === 'id' ? 'id' : 'en'; };
  document.querySelector('#lang-id').addEventListener('click', () => setLanguage('id')); document.querySelector('#lang-en').addEventListener('click', () => setLanguage('en')); setLanguage('id');
  const renderZoom = () => { model.setAttribute('scale', `${(zoom * .04).toFixed(3)} ${(zoom * .04).toFixed(3)} ${(zoom * .04).toFixed(3)}`); value.textContent = `${zoom}×`; };
  document.querySelector('#zoom-in').addEventListener('click', () => { zoom = Math.min(3, +(zoom + .5).toFixed(1)); renderZoom(); });
  document.querySelector('#zoom-out').addEventListener('click', () => { zoom = Math.max(.5, +(zoom - .5).toFixed(1)); renderZoom(); });
  const open = () => { modal.hidden = false; close.focus(); };
  const dismiss = () => { modal.hidden = true; info.focus(); };
  info.addEventListener('click', open); close.addEventListener('click', dismiss);
  modal.addEventListener('click', e => { if (e.target === modal) dismiss(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) dismiss(); });
  renderZoom();
})();
