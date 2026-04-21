// auth.js — shared session handler; runs after layout.js injects the header
const _SUPABASE_URL = 'https://uaofatcgdvpcysaviima.supabase.co';
const _SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhb2ZhdGNnZHZwY3lzYXZpaW1hIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Njc5MzkxOCwiZXhwIjoyMDkyMzY5OTE4fQ.2OrLyCNhNBYgiIwlIEJGoAWi6QyAUugd16TEIdbCqWQ';

function initAuth() {
  if (typeof supabase === 'undefined') return;

  const sb = supabase.createClient(_SUPABASE_URL, _SUPABASE_KEY);
  window._sb = sb; // expose for page-level scripts that need it

  function applySession(session) {
    const btn   = document.getElementById('account-btn');
    if (!btn) return;
    const label = btn.querySelector('.account-label');
    if (!label) return;

    if (session && session.user) {
      const meta = session.user.user_metadata || {};
      const name = meta.first_name || session.user.email.split('@')[0];
      label.textContent = 'Sign Out';
      btn.title = `Signed in as ${name}`;
      btn.href  = '#';
      btn.onclick = async (e) => {
        e.preventDefault();
        await sb.auth.signOut();
        window.location.href = 'login.html';
      };
    } else {
      label.textContent = 'Account';
      btn.title  = '';
      btn.href   = 'login.html';
      btn.onclick = null;
    }
  }

  sb.auth.getSession().then(({ data: { session } }) => applySession(session));
  sb.auth.onAuthStateChange((_event, session) => applySession(session));
}

// Run only after layout.js has injected the header into the DOM
if (window._layoutReady) {
  initAuth();
} else {
  document.addEventListener('layout-ready', initAuth);
}
