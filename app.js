(() => {
  const model = document.querySelector('#solar-model');
  const value = document.querySelector('#zoom-value');
  const modal = document.querySelector('#info-modal');
  const info = document.querySelector('#info-button');
  const close = document.querySelector('#close-modal');
  let zoom = 1;
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
