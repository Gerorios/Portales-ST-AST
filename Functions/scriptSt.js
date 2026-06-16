  const fotosPortal = [
        "https://i.ibb.co/K3f9ytC/DJI-0078.jpg",
        "https://i.ibb.co/Ng178N59/d-capacitacion-en-campo.jpg",
        "https://i.ibb.co/HfcjsBp2/Operario-con-Epp.png",
        "https://i.ibb.co/v4Fs8sGP/trabajo-en-altura.jpg",
        
    ];
    let index = 0;
    const heroBg = document.getElementById('hero-bg');

    function precargarImagenes() {
        fotosPortal.forEach(url => { const img = new Image(); img.src = url; });
    }

    function rotarFondo() {
        if (!heroBg) return;
        heroBg.style.backgroundImage = `url('${fotosPortal[index]}')`;
        index = (index + 1) % fotosPortal.length;
    }

    // --- MODO OSCURO ---
    const themeBtn = document.getElementById('themeBtn');
    themeBtn.addEventListener('click', () => {
        const doc = document.documentElement;
        const currentTheme = doc.getAttribute('data-theme');
        doc.setAttribute('data-theme', currentTheme === 'light' ? 'dark' : 'light');
    });

    // --- INICIALIZACIÓN ---
    window.onload = () => {
        precargarImagenes();
        rotarFondo();
        setInterval(rotarFondo, 6000);
    };
  const months = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
  const d = new Date();
  document.getElementById('lastUpdate').textContent = d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear();

  const animEls = document.querySelectorAll('.tool-card, .add-card');
  animEls.forEach((el, i) => {
    el.style.animationDelay = (i * 35) + 'ms';
    requestAnimationFrame(() => el.classList.add('animate'));
  });

  let dark = false;
  function toggleTheme() {
    dark = !dark;
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }

  let activeFilter = 'all';
  const categories = ['sheets','forms','apps','bi','maps'];
  function setFilter(cat, el) {
    activeFilter = cat;
    document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
    applyFilters();
  }
  function applyFilters() {
    const q = document.getElementById('searchInput').value.toLowerCase();
    categories.forEach(cat => {
      const show = activeFilter === 'all' || activeFilter === cat;
      const sec  = document.getElementById('sec-' + cat);
      const grid = document.getElementById('grid-' + cat);
      if (sec)  sec.style.display  = show ? '' : 'none';
      if (grid) grid.style.display = show ? '' : 'none';
      if (grid && show) {
        grid.querySelectorAll('.tool-card').forEach(card => {
          const nm = (card.dataset.name || '').toLowerCase();
          card.style.display = (!q || nm.includes(q)) ? '' : 'none';
        });
      }
    });
  }
  document.querySelectorAll('.add-card').forEach(el => {
    el.addEventListener('keypress', e => { if (e.key === 'Enter' || e.key === ' ') el.click(); });
  });

  async function cargarCumpleanos() {
  const track = document.getElementById('birthdaysTrack');
  const count = document.getElementById('birthdaysCount');
  try {
    const res = await fetch('/.netlify/functions/cumpleanos');
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
  
  
  if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', cargarCumpleanos);
} else {
  cargarCumpleanos();
}