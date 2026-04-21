// layout.js — fetches and injects shared header/footer, sets active nav, then signals auth.js
(async function () {
  // Hide body immediately to prevent flash of unstyled content
  document.body.style.visibility = 'hidden';

  // Safety valve: always show body after 2s even if a fetch fails
  const showBody = () => { document.body.style.visibility = 'visible'; };
  const fallback = setTimeout(showBody, 2000);

  try {
    const [headerHTML, footerHTML] = await Promise.all([
      fetch('/partials/header.html').then(r => r.text()),
      fetch('/partials/footer.html').then(r => r.text()),
    ]);

    document.getElementById('site-header').outerHTML = headerHTML;
    document.getElementById('site-footer').outerHTML = footerHTML;

    // Mark the active nav link based on data-page attribute on <body>
    const page = document.body.dataset.page;
    if (page) {
      const activeLink = document.querySelector(`.nav-item[data-nav="${page}"]`);
      if (activeLink) activeLink.classList.add('active');
    }

    // Signal that layout DOM is ready — auth.js listens for this
    window._layoutReady = true;
    document.dispatchEvent(new CustomEvent('layout-ready'));
  } catch (err) {
    console.error('[layout] Failed to load partials:', err);
  } finally {
    clearTimeout(fallback);
    showBody();
  }
})();
