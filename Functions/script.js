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
