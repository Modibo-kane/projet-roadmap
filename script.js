function togglePhase(header) {
  const body = header.nextElementSibling;
  const chevron = header.querySelector('.phase-chevron');
  body.classList.toggle('open');
  chevron.classList.toggle('open');
}
function toggleAction(el) {
  const mt = el.nextElementSibling;
  const icon = el.querySelector('i');
  mt.classList.toggle('open');
  if (mt.classList.contains('open')) {
    icon.style.transform = 'rotate(90deg)';
  } else {
    icon.style.transform = '';
  }
}
function countDone() {
  const total = document.querySelectorAll('.mt input[type=checkbox]').length;
  const done = document.querySelectorAll('.mt input[type=checkbox]:checked').length;
  document.getElementById('s-done').textContent = done;
  document.querySelectorAll('.mt label').forEach(lbl => {
    const cb = document.getElementById(lbl.getAttribute('for'));
    if (cb) lbl.classList.toggle('done', cb.checked);
  });
}
function setFilter(phase, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.phase').forEach(p => {
    if (phase === 'all' || p.dataset.phase === phase) {
      p.classList.remove('hidden');
    } else {
      p.classList.add('hidden');
    }
  });
}
function filterSearch(q) {
  const lq = q.toLowerCase().trim();
  if (!lq) {
    document.querySelectorAll('.action, .mt, .etape').forEach(el => el.style.display = '');
    return;
  }
  document.querySelectorAll('.phase').forEach(phase => {
    phase.classList.remove('hidden');
    const body = phase.querySelector('.phase-body');
    body.classList.add('open');
    phase.querySelector('.phase-chevron').classList.add('open');
  });
  document.querySelectorAll('.mt').forEach(mt => {
    const txt = mt.textContent.toLowerCase();
    mt.style.display = txt.includes(lq) ? '' : 'none';
  });
  document.querySelectorAll('.action').forEach(action => {
    const visible = Array.from(action.querySelectorAll('.mt')).some(mt => mt.style.display !== 'none') ||
      action.querySelector('.action-label')?.textContent.toLowerCase().includes(lq);
    action.style.display = visible ? '' : 'none';
    if (visible) action.querySelector('.microtaches')?.classList.add('open');
  });
}
function copyMarkdown() {
  const md = `# Roadmap — Projet informatique (de l'idée au produit)

  ## Phase 1 — Idéation & Validation (1–2 sem.)
  - Définir le problème en 1 phrase ciblée
  - Conduire 5–10 interviews utilisateurs
  - Analyser la concurrence et valider la volonté de payer
  - Décision Go/No-Go

  ## Phase 2 — Cadrage & Architecture (1–3 sem.)
  - Définir le MVP (MoSCoW, user stories)
  - Choisir le stack technique (ADR)
  - Concevoir le schéma de données
  - Setup git, CI/CD, environnements dev/staging/prod

  ## Phase 3 — Conception & Design (1–2 sem.)
  - User flows et wireframes basse fidélité
  - Maquettes haute fidélité + prototype cliquable
  - Design system de base (couleurs, typo, composants)
  - Validation avec utilisateurs tests

  ## Phase 4 — Développement & Tests (4–12 sem.)
  - Backlog priorisé et sprints planifiés
  - Backend : API, auth, migrations, tests unitaires
  - Frontend : intégration UI, connexion API, responsivité
  - Tests E2E, audit sécurité OWASP, performances

  ## Phase 5 — Lancement (1–2 sem.)
  - Infra prod : serveur, SSL, sauvegardes, monitoring
  - Légal : CGU, RGPD, cookies
  - Communication : pitch, Product Hunt, réseaux
  - Analytics et KPIs définis

  ## Phase 6 — Post-lancement & Croissance (continu)
  - Boucle feedback hebdo + entretiens utilisateurs
  - Rétrospective 30 jours + roadmap v2
  - Structuration juridique et financière (entité, compta, marque)

  ## Risques critiques
  1. Construire sans valider → valider avant de coder
  2. Scope creep → geler les specs MVP
  3. Sous-estimation → ×1.5 sur les phases 4 et 5
  4. Négliger le légal → CGU/RGPD dès le départ`;
    navigator.clipboard.writeText(md).then(() => {
    const btn = document.querySelector('.export-btn');
    btn.innerHTML = '<i class="fa-solid fa-check" aria-hidden="true"></i> Copié !';
    setTimeout(() => { btn.innerHTML = '<i class="fa-regular fa-copy" aria-hidden="true"></i> Copier'; }, 2000);
  });
}
