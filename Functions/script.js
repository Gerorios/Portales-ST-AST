 const URLS = {
  asturiana: "Portales/PortalAst.html",
  sertec:    "Portales/PortalSertec.html"
};
  // ============================================================

  function openModal(e) {
  window.location.href = URLS[e];
}

  function closeModal() {
    document.getElementById('modal').classList.remove('active');
  }

  document.getElementById('modal').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
  });


  async function cargarCumpleanos() {
  const track = document.getElementById('birthdaysTrack');
  const count = document.getElementById('birthdaysCount');
  try {
    const res = await fetch('/.netlify/functions/cumpleaños');
    const data = await res.json();
    track.innerHTML = '';
    count.textContent = data.length;
    data.slice(0, 10).forEach(p => {
      const card = document.createElement('div');
      card.className = 'birthday-card' + (p.es_hoy ? ' is-today' : '');
      card.innerHTML = `
        <div class="birthday-name">${p.nombre}</div>
        <div class="birthday-date">${p.fecha}</div>
        <div class="birthday-days">${p.es_hoy ? '¡Hoy!' : 'Faltan ' + p.dias_faltantes + ' días'}</div>
      `;
      track.appendChild(card);
    });
  } catch (e) {
    track.innerHTML = '<div class="birthday-error">No se pudieron cargar los cumpleaños</div>';
  }
}
document.addEventListener('DOMContentLoaded', cargarCumpleanos);
