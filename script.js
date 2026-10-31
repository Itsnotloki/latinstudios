/* ==========================================================
   LATIN STUDIOS · Portal oficial
   CONFIGURACIÓN CENTRAL — edita SOLO este bloque.
   Pega las URL completas y verificadas (deben empezar por https://).
   Si un enlace queda vacío, su botón se muestra como «Pendiente»
   y no se puede pulsar.
   ========================================================== */
const links = {
  discord: 'https://discord.gg/wKSB3rcnxN',
  youtube: 'https://www.youtube.com/@LatinStudiosOfficial',
  x: 'https://x.com/LatinStudios_Of',
  web: ''
};

/* Frase bajo el nombre (opcional). Déjala vacía para usar la del HTML. */
const frase = '';

/* ---------- No hace falta tocar nada debajo de esta línea ---------- */
(function () {
  'use strict';

  const isSafeUrl = (value) => {
    try {
      const u = new URL(value);
      return u.protocol === 'https:';
    } catch (_) {
      return false;
    }
  };

  document.querySelectorAll('[data-link]').forEach((card) => {
    const key = card.getAttribute('data-link');
    const url = (links[key] || '').trim();
    const title = card.querySelector('.card__title');
    const name = title ? title.textContent.replace(/\s+/g, ' ').trim() : key;

    if (url && isSafeUrl(url)) {
      card.href = url;
      card.target = '_blank';
      card.rel = 'noopener noreferrer';
      card.removeAttribute('aria-disabled');
      card.classList.add('is-ready');
      card.setAttribute('aria-label', name + ' (se abre en una pestaña nueva)');
    } else {
      if (url) console.warn('[LATIN STUDIOS] URL no válida para "' + key + '". Usa una dirección https:// completa.');
      card.removeAttribute('href');
      card.setAttribute('aria-disabled', 'true');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', name + ': enlace pendiente');
      card.classList.add('is-pending');
    }
  });

  if (frase.trim()) {
    const lead = document.querySelector('[data-config="frase"]');
    if (lead) lead.textContent = frase.trim();
  }

  document.documentElement.classList.add('js');
})();
