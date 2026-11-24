(function (window, document) {
  'use strict';

  // A single installation per page, even if this file is included twice.
  if (window.__ADSPYLIB_META_PIXEL__) return;
  window.__ADSPYLIB_META_PIXEL__ = true;

  // Meta Pixel base code. Queue events while the asynchronous library loads.
  !function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = true;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

  window.fbq('init', '3221014578092065');
  window.fbq('track', 'PageView');

  const handledEvents = new WeakSet();
  const lastClick = new WeakMap();

  function isWhatsAppLink(link) {
    if (link.hasAttribute('data-whatsapp')) return true;
    try {
      const url = new URL(link.getAttribute('href') || '', document.baseURI);
      return url.protocol === 'whatsapp:' ||
        (/^https?:$/.test(url.protocol) &&
          /^(?:wa\.me|(?:www\.|api\.|web\.)?whatsapp\.com)$/.test(url.hostname));
    } catch (_) {
      return false;
    }
  }

  function trackWhatsAppContact(event) {
    if (event.type === 'auxclick' ? event.button !== 1 : event.button > 0) return;
    const target = event.target && (event.target.nodeType === 1 ? event.target : event.target.parentElement);
    const link = target && target.closest('a[href], [data-whatsapp]');
    if (!link || !isWhatsAppLink(link) || handledEvents.has(event)) return;
    handledEvents.add(event);

    // Suppress accidental double-clicks without blocking later genuine contacts.
    const now = window.performance.now();
    const previous = lastClick.get(link);
    if (previous !== undefined && now - previous < 1000) return;
    try {
      window.fbq('track', 'Contact');
      lastClick.set(link, now);
    } catch (_) {
      // Tracking must never interfere with opening WhatsApp.
    }
  }

  // Delegation also covers links added later and clicks on their nested icons.
  document.addEventListener('click', trackWhatsAppContact, true);
  document.addEventListener('auxclick', trackWhatsAppContact, true);
}(window, document));
