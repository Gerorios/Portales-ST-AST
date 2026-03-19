 const now = new Date();
const opts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const str = now.toLocaleDateString('es-AR', opts);
 document.getElementById('fecha').textContent = str.charAt(0).toUpperCase() + str.slice(1);
