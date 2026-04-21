// Shared session handler — included in every page
// Updates the Account header button based on Supabase auth state

const _SUPABASE_URL = 'https://uaofatcgdvpcysaviima.supabase.co';
const _SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhb2ZhdGNnZHZwY3lzYXZpaW1hIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Njc5MzkxOCwiZXhwIjoyMDkyMzY5OTE4fQ.2OrLyCNhNBYgiIwlIEJGoAWi6QyAUugd16TEIdbCqWQ';

(function initAuth() {
  if (typeof supabase === 'undefined') return;

  const sb = supabase.createClient(_SUPABASE_URL, _SUPABASE_KEY);

  // Expose sb globally so page-level scripts can reuse the same instance
  window._sb = sb;

  function applySession(session) {
    const btn = document.getElementById('account-btn');
    if (!btn) return;
    const label = btn.querySelector('.account-label');
    if (!label) return;

    if (session && session.user) {
      const meta = session.user.user_metadata || {};
      const name = meta.first_name || session.user.email.split('@')[0];
      label.textContent = 'Sign Out';
      btn.title = `Signed in as ${name}`;
      btn.href = '#';
      btn.onclick = async (e) => {
        e.preventDefault();
        await sb.auth.signOut();
        window.location.href = 'login.html';
      };

      // Show greeting chip if the element exists
      const greetEl = document.getElementById('user-greeting');
      if (greetEl) {
        greetEl.textContent = `Hi, ${name}`;
        greetEl.style.display = 'block';
      }
    } else {
      label.textContent = 'Account';
      btn.title = '';
      btn.href = 'login.html';
      btn.onclick = null;

      const greetEl = document.getElementById('user-greeting');
      if (greetEl) greetEl.style.display = 'none';
    }
  }

  sb.auth.getSession().then(({ data: { session } }) => applySession(session));
  sb.auth.onAuthStateChange((_event, session) => applySession(session));
})();
