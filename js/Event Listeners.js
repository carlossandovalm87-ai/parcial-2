const mouse = { x: 0, y: 0 };

window.addEventListener('mousemove', (e) => {
  // normalizar: -1 (izquierda/abajo) a +1 (derecha/arriba)
  mouse.x = (e.clientX / window.innerWidth)  * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
});

// ── SCROLL: porcentaje de la página ──────────────────────────
let scrollY = 0;

window.addEventListener('scroll', () => {
  scrollY = window.scrollY;

  // Porcentaje total de scroll (0 = inicio, 1 = final)
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const progreso  = scrollY / maxScroll; // 0.0 a 1.0
});

// ── RESIZE: actualizar Three.js al cambiar la ventana ────────
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});