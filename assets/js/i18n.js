const translations = {
  es: {
    'hero.tagline': 'Un club de lectura, no un contador de páginas.',
    'hero.lede':
      'Una app de lectura para iOS y Android, pensada para quien lee por gusto y no quiere que se le convierta en una tarea.',

    'do.eyebrow': 'Lo que sí hacemos',
    'do.title': 'Tres cosas, y ninguna te pide esfuerzo extra',
    'do.discover.title': 'Descubrir el próximo libro',
    'do.discover.desc':
      'Recomendaciones a partir de lo que ya te gusta: una Línea continua para tu terreno conocido y una Línea de aventura para salir de él sin perderte. Y, sobre todo, descubrimiento a través de otras personas.',
    'do.talk.title': 'Conversar sobre lo que leemos',
    'do.talk.desc':
      'No es un añadido: es el centro. Conversaciones acotadas a los libros que tienes en curso, y una lista de pendientes que también sirve para encontrarte con quien quiere leer lo mismo. Con protección anti-spoiler tomada en serio.',
    'do.progress.title': 'Acompañar tu avance',
    'do.progress.desc':
      'Tres estados y nada más: por leer, leyendo, terminado. Hay meta mensual y hay racha, pero viven en segundo plano, donde deben estar.',

    'dont.eyebrow': 'Lo que no',
    'dont.title': 'Una regla, y no se negocia',
    'dont.body':
      'Ninguna función pasa si te hace sentir <strong>medido contra otras personas</strong> o <strong>mal contigo misma</strong>. Sin rankings, sin tablas de posiciones, sin "no leíste hoy".',
    'dont.note':
      'El estímulo personal entra; la competencia no. Es la pregunta que le hacemos a cada idea antes de construirla.',

    'news.eyebrow': 'Novedades',
    'news.title': 'Todavía no lanzamos, y eso es lo entretenido',
    'news.body':
      'Kunely está en desarrollo. Iremos publicando aquí los avances y algún que otro adelanto de pantallas antes de tiempo, para quien tenga curiosidad por ver cómo se construye una app de lectura desde cero.',
    'news.cta': 'Seguir el proyecto en GitHub',

    'facts.platforms.label': 'Plataformas',
    'facts.platforms.value': 'iOS y Android',
    'facts.langs.label': 'Idiomas desde el día uno',
    'facts.langs.value': 'Español, inglés y portugués de Brasil',
    'facts.built.label': 'Hecho con',
    'facts.built.value': 'React Native',

    'footer.line': 'Kunely — una app de lectura sin presión, en construcción.',
  },

  en: {
    'hero.tagline': 'A book club, not a page counter.',
    'hero.lede':
      'A reading app for iOS and Android, built for people who read for pleasure and would rather it not turn into a chore.',

    'do.eyebrow': 'What we do',
    'do.title': 'Three things, and none of them asks anything extra of you',
    'do.discover.title': 'Find your next book',
    'do.discover.desc':
      'Recommendations drawn from what you already enjoy: a Continuous Line for familiar ground and an Adventure Line for stepping off it without getting lost. And, above all, discovery through other people.',
    'do.talk.title': "Talk about what we're reading",
    'do.talk.desc':
      "Not an add-on: it's the centre. Conversations scoped to the books you currently have open, and a to-be-read list that doubles as a way to find someone who wants to read the same thing. With spoiler protection treated as a real problem.",
    'do.progress.title': 'Follow your progress',
    'do.progress.desc':
      "Three states and no more: to read, reading, finished. There's a monthly goal and there's a streak, but both stay in the background, where they belong.",

    'dont.eyebrow': "What we don't",
    'dont.title': "One rule, and it isn't negotiable",
    'dont.body':
      'No feature ships if it makes you feel <strong>measured against other people</strong> or <strong>bad about yourself</strong>. No rankings, no leaderboards, no "you didn\'t read today".',
    'dont.note':
      "Personal encouragement is in scope; competition isn't. It's the question we put to every idea before building it.",

    'news.eyebrow': 'News',
    'news.title': "We haven't launched yet, and that's the fun part",
    'news.body':
      'Kunely is in development. We\'ll be posting progress here, along with the odd early look at screens, for anyone curious about how a reading app gets built from scratch.',
    'news.cta': 'Follow the project on GitHub',

    'facts.platforms.label': 'Platforms',
    'facts.platforms.value': 'iOS and Android',
    'facts.langs.label': 'Languages from day one',
    'facts.langs.value': 'Spanish, English and Brazilian Portuguese',
    'facts.built.label': 'Built with',
    'facts.built.value': 'React Native',

    'footer.line': 'Kunely — a reading app without the pressure, under construction.',
  },
};

const STORAGE_KEY = 'kunely-lang';
const SUPPORTED = ['es', 'en'];

const detectLanguage = () => {
  let stored = null;
  try {
    stored = localStorage.getItem(STORAGE_KEY);
  } catch (error) {
    // Private browsing and blocked site data both throw here; fall through
    // to the browser's own preference rather than failing to render.
  }
  if (SUPPORTED.includes(stored)) {
    return stored;
  }
  const preferred = (navigator.language || 'es').slice(0, 2).toLowerCase();
  return SUPPORTED.includes(preferred) ? preferred : 'es';
};

const applyLanguage = lang => {
  const dictionary = translations[lang];
  if (!dictionary) {
    return;
  }

  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach(node => {
    const value = dictionary[node.dataset.i18n];
    if (value !== undefined) {
      node.textContent = value;
    }
  });

  document.querySelectorAll('[data-i18n-html]').forEach(node => {
    const value = dictionary[node.dataset.i18nHtml];
    if (value !== undefined) {
      node.innerHTML = value;
    }
  });

  const label = document.getElementById('langLabel');
  if (label) {
    // The button offers the other language rather than naming the current one.
    label.textContent = lang === 'es' ? 'EN' : 'ES';
  }
};

let current = detectLanguage();
applyLanguage(current);

const toggle = document.getElementById('langToggle');
if (toggle) {
  toggle.addEventListener('click', () => {
    current = current === 'es' ? 'en' : 'es';
    applyLanguage(current);
    try {
      localStorage.setItem(STORAGE_KEY, current);
    } catch (error) {
      // Not being able to remember the choice is not a reason to refuse it.
    }
  });
}
