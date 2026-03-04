(function() {
  var GA_ID = 'G-11FBJFM6XV';

  function loadGA() {
    if (document.getElementById('ga-script')) return;
    var s = document.createElement('script');
    s.id = 'ga-script';
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID, { anonymize_ip: true });
  }

  function getConsent() {
    return localStorage.getItem('cookie-consent');
  }

  function setConsent(value) {
    localStorage.setItem('cookie-consent', value);
  }

  function hideBanner() {
    var banner = document.getElementById('cookie-banner');
    if (banner) banner.remove();
  }

  function getLang() {
    return localStorage.getItem('preferredLanguage') || 'de';
  }

  function getPrivacyPath() {
    return window.location.pathname.indexOf('/aktivitaeten/') !== -1
      ? '../datenschutz.html'
      : '/datenschutz.html';
  }

  function showBanner() {
    var lang = getLang();
    var t = lang === 'en' ? {
      text: 'We use Google Analytics to analyze the usage of our website. This involves setting cookies and transferring data to Google.',
      link: 'Learn more',
      accept: 'Accept',
      reject: 'Essential only'
    } : {
      text: 'Wir verwenden Google Analytics, um die Nutzung unserer Website zu analysieren. Dabei werden Cookies gesetzt und Daten an Google \u00fcbertragen.',
      link: 'Mehr erfahren',
      accept: 'Akzeptieren',
      reject: 'Nur notwendige'
    };

    var banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.innerHTML =
      '<div style="position:fixed;bottom:0;left:0;right:0;z-index:9998;padding:1rem 1rem 1.25rem;background:rgba(61,43,31,0.97);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-top:1px solid rgba(196,168,130,0.2)">' +
        '<div style="max-width:72rem;margin:0 auto;display:flex;flex-wrap:wrap;align-items:center;gap:1rem;justify-content:space-between">' +
          '<p style="color:#D4B8A0;font-size:0.875rem;line-height:1.5;flex:1;min-width:260px;margin:0">' +
            t.text + ' ' +
            '<a href="' + getPrivacyPath() + '#analytics" style="color:#C4A882;text-decoration:underline">' + t.link + '</a>' +
          '</p>' +
          '<div style="display:flex;gap:0.75rem;flex-shrink:0">' +
            '<button id="cookie-reject" style="padding:0.5rem 1.25rem;border-radius:0.5rem;font-size:0.875rem;font-weight:500;color:#D4B8A0;background:transparent;border:1px solid rgba(196,168,130,0.3);cursor:pointer">' + t.reject + '</button>' +
            '<button id="cookie-accept" style="padding:0.5rem 1.25rem;border-radius:0.5rem;font-size:0.875rem;font-weight:500;color:#3D2B1F;background:#C4A882;border:1px solid #C4A882;cursor:pointer">' + t.accept + '</button>' +
          '</div>' +
        '</div>' +
      '</div>';

    document.body.appendChild(banner);

    document.getElementById('cookie-accept').addEventListener('click', function() {
      setConsent('accepted');
      loadGA();
      hideBanner();
    });

    document.getElementById('cookie-reject').addEventListener('click', function() {
      setConsent('rejected');
      hideBanner();
    });
  }

  // Check consent on page load
  var consent = getConsent();
  if (consent === 'accepted') {
    loadGA();
  } else if (!consent) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', showBanner);
    } else {
      showBanner();
    }
  }
})();
