// Wrapped because classic scripts share one global scope: i18n.js already
// declares STORAGE_KEY, current and toggle, and a second `const` of the same
// name is a SyntaxError that stops this whole file from running.
(() => {
  const STORAGE_KEY = 'kunely-theme';
  const MODES = ['auto', 'light', 'dark'];

  const ICONS = {
    auto: 'fa-circle-half-stroke',
    light: 'fa-sun',
    dark: 'fa-moon',
  };

  // Mirrors the --bg token of each palette, for the browser chrome only.
  const CHROME = {
    light: '#f6ede8',
    dark: '#1e1516',
  };

  const detectMode = () => {
    let stored = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch (error) {
      // Private browsing and blocked site data both throw here; following the
      // system is the right answer when the choice cannot be read.
    }
    return MODES.includes(stored) ? stored : 'auto';
  };

  const applyChromeColour = mode => {
    // The two <meta name="theme-color" media="..."> tags read the system
    // preference and nothing else, exactly like <picture> did. The browser uses
    // the first tag whose media matches, so an override without a media
    // attribute placed ahead of them always wins — and removing it hands the
    // chrome back to the pair.
    const existing = document.getElementById('themeColorOverride');

    if (mode === 'auto') {
      if (existing) {
        existing.remove();
      }
      return;
    }

    const meta = existing || document.createElement('meta');
    meta.id = 'themeColorOverride';
    meta.name = 'theme-color';
    meta.content = CHROME[mode];
    if (!existing) {
      document.head.prepend(meta);
    }
  };

  const applyMode = mode => {
    const root = document.documentElement;
    if (mode === 'auto') {
      delete root.dataset.theme;
    } else {
      root.dataset.theme = mode;
    }

    applyChromeColour(mode);

    const icon = document.getElementById('themeIcon');
    if (icon) {
      icon.className = `fa-solid ${ICONS[mode]}`;
    }

    // The button names the mode it is in and the one it moves to next, so both
    // strings come from the dictionary rather than being built here.
    const label = document.getElementById('themeLabel');
    if (label) {
      label.dataset.i18n = `theme.${mode}`;
    }

    const button = document.getElementById('themeToggle');
    if (button) {
      button.dataset.i18nLabel = `theme.${mode}.aria`;
    }

    document.dispatchEvent(new Event('kunely:retranslate'));
  };

  let current = detectMode();
  applyMode(current);

  const toggle = document.getElementById('themeToggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      current = MODES[(MODES.indexOf(current) + 1) % MODES.length];
      applyMode(current);
      try {
        localStorage.setItem(STORAGE_KEY, current);
      } catch (error) {
        // Not being able to remember the choice is not a reason to refuse it.
      }
    });
  }
})();
