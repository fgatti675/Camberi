import type { Dict } from './en';

/* Castilian Spanish (es-ES). Tuteo throughout, which is the register Spanish
   tech and startup buyers expect — "usted" would read as a bank. Product
   names, stack names and metric units stay in English on purpose.

   This is written as Spanish copy, not as a translation of `en.ts`: the
   argument and the section structure are the same, the sentences are not.
   Where English leans on a construction Spanish does not have — "hand it
   over", "a senior read", "earns its keep" — the Spanish makes the same
   point its own way instead of calquing it. */
export const es: Dict = {
  htmlLang: 'es',
  localeName: 'Español',
  otherLocaleName: 'English',

  nav: {
    agents: 'Agentes de IA',
    work: 'Proyectos',
    services: 'Servicios',
    team: 'Equipo',
    cta: 'Empezar un proyecto',
    toggleMenu: 'Abrir menú',
    switchLanguage: 'Switch to English',
  },

  spine: {
    agents: 'Agentes de IA',
    work: 'Proyectos',
    services: 'Servicios',
    process: 'Cómo trabajamos',
    team: 'Equipo',
    contact: 'Contacto',
  },

  hero: {
    titleTop: 'Software que hace',
    titleBottom: 'el trabajo por ti.',
    intro:
      'Agentes de IA y automatización hechos para seguir funcionando en producción. Llevamos más de diez años haciendo y manteniendo productos propios —FireCMS, Rebase— y el tuyo lo trabajamos igual.',
    primary: 'Empezar un proyecto',
    secondary: 'Ver lo que hemos hecho',
    scrollCue: 'Baja',
  },

  logoWall: {
    caption: 'Equipos con productos en producción sobre código nuestro',
  },

  agents: {
    title: 'Lo difícil de un agente no es el modelo.',
    intro: 'Es qué puede tocar, quién lo revisa y qué pasa cuando se equivoca.',
    items: [
      {
        title: 'Permisos por debajo del prompt',
        body: 'Los aplica la base de datos, no una petición amable.',
      },
      {
        title: 'Una persona donde hace falta',
        body: 'Colas de revisión y un registro que tu equipo sabe usar.',
      },
      {
        title: 'Medido',
        body: 'Una evaluación con tus propios casos y un coste por ejecución.',
      },
      {
        title: 'Un plan B',
        body: 'Una alternativa segura, decidida antes de salir a producción.',
      },
    ],
    cta: 'Cómo hacemos agentes',
  },

  work: {
    title: 'Productos en producción. No promesas en un PowerPoint.',
    intro:
      'Puedes leer cómo trabajamos o puedes ir a usar lo que hemos hecho. Todo lo de aquí abajo está funcionando ahora mismo.',
    visit: (name: string) => `Visitar ${name}`,
    /* Solo en los dos proyectos que tienen página propia. */
    caseStudy: 'Leer el caso',
    alsoTitle: 'También nuestro, también en marcha',
    alsoNote:
      'Y más de una década de consultoría para equipos de producto por toda Europa: desde la primera llamada de arquitectura hasta el rescate a los seis meses del lanzamiento.',

    medicalmotion: {
      kicker: 'Producto de cliente · Salud digital',
      lead: 'Terapia del dolor guiada por IA que los médicos recetan y las aseguradoras pagan.',
      body: 'Llevamos haciendo la tecnología de medicalmotion desde su primera versión web: la app del paciente, las herramientas del fisioterapeuta, el motor de personalización y la plataforma de datos sobre la que corre su investigación Pain Lab. Datos médicos, regulación sanitaria alemana y resultados clínicos publicados. Un producto de esos en los que equivocarte de arquitectura no es un sprint que puedas repetir.',
      cards: [
        'A partir de tu perfil de dolor',
        'Fisioterapia asistida por IA',
        'Meditación y ejercicios de respiración',
        'Tu Health Cockpit',
      ],
      metrics: [
        { value: '23+', label: 'aseguradoras lo cubren' },
        { value: '5+', label: 'estudios de eficacia publicados' },
        { value: '2019', label: 'primera versión que sacamos' },
      ],
      stack: ['React', 'Node', 'Google Cloud', 'Datos clínicos'],
    },
    firecms: {
      kicker: 'Producto propio · Código abierto · Desde 2020',
      lead: 'El panel de administración sobre el que miles de equipos de Firebase montan su back office.',
      body: 'Empezó siendo la herramienta interna que estábamos hartos de rehacer para cada cliente. Seis años después es un framework de código abierto con un cloud gestionado encima, y lo usan equipos de producto desde salud digital hasta logística. Cada breaking change, cada página de documentación y cada issue contestado los hemos llevado nosotros.',
      metrics: [
        { value: '1,3k', label: 'estrellas en GitHub' },
        { value: '9k', label: 'instalaciones al mes en npm' },
        { value: '220+', label: 'forks' },
      ],
      stack: ['TypeScript', 'React', 'Firebase'],
    },
    rebase: {
      kicker: 'Producto propio · Saliendo ahora',
      lead: 'Lo apuntas al Postgres que ya tienes y te da un backend.',
      body: 'REST, autenticación, almacenamiento, tiempo real y un panel de administración generado. Cada regla de acceso la aplica el row-level security de Postgres, no un middleware en el que tengas que confiar. Para equipos que prefieren no dejar sus datos de producción en la instancia gestionada de otro. Código abierto, autoalojado y europeo de principio a fin.',
      metrics: [
        { value: 'Open', label: 'source, MIT' },
        { value: 'Self', label: 'hosted, tu infra' },
        { value: 'RLS', label: 'aplicado por Postgres' },
      ],
      stack: ['Postgres', 'TypeScript', 'REST + GraphQL', 'Tiempo real'],
    },

    sustentalent: {
      kicker: 'Producto de cliente · Bolsa de empleo · España y Latinoamérica',
      lead: 'Una bolsa de empleo que se llena sola.',
      body: 'Un marketplace de talento para perfiles de sostenibilidad y ESG, con la operativa de reclutamiento metida dentro del propio producto. Un scraping entre semana lee las vacantes reales por empresa y no por anuncio, así que la cola de revisión es a la vez una lista viva de compañías que están contratando ahora mismo. Un pipeline de enriquecimiento completa la empresa que hay detrás de cada oferta, el buzón compartido se sincroniza solo y el panel deduce el siguiente paso de cada prospecto en vez de pedirle a nadie que mantenga al día una columna de estado.',
      metrics: [
        { value: 'Diario', label: 'scraping de vacantes que alimenta la lista' },
        { value: 'RLS', label: 'permisos aplicados por Postgres, no por código' },
        { value: '1 repo', label: 'web pública, backend y panel de administración' },
      ],
      stack: ['Astro', 'React', 'Rebase', 'Postgres', 'Cloud Run'],
    },

    dataki:
      'Conectas una base de datos, preguntas en lenguaje natural y te devuelve un dashboard de verdad, con su SQL. BigQuery, Postgres, MySQL, Sheets.',
    unbrand:
      'Le das una web cualquiera y te saca un manual de marca: escalas de color, combinaciones con el contraste comprobado, escala tipográfica y tokens de espaciado. Con API.',
    neat: 'Un motor y un editor de degradados en WebGL. Es lo que estás viendo de fondo en esta página. 12k instalaciones al mes.',
    dadaki:
      'Un editor vectorial completo, todo dentro del navegador. Sin instalar nada, sin ir y volver al servidor, sin plugins.',
  },

  engagements: {
    title: 'Tres formas de empezar. Todas con alcance cerrado.',
    intro:
      'Cada proyecto arranca con un alcance cerrado, un plan de hitos y un precio. No con una fase de descubrimiento que factura tres meses.',
    axisLabel: 'Semanas',
    unsure: '¿No sabes cuál necesitas? Casi nadie lo sabe.',
    unsureCta: 'Cuéntanos qué te falla',
    readMore: 'Ver en detalle',
    items: [
      {
        title: 'Agentes de IA y automatización que aguantan en producción',
        weeks: [2, 6],
        description:
          'El Excel que alguien rellena cada lunes, el informe que sale de juntar cuatro dashboards, la aprobación que vive en una bandeja de entrada. Se lo pasamos a agentes que funcionan sin que nadie esté encima, con evaluación, control de coste y un plan B para el día en que el modelo se equivoque con toda la seguridad del mundo.',
        scope: 'Normalmente 2–6 semanas',
      },
      {
        title: 'Hacer el producto',
        weeks: [6, 12],
        description:
          'De cero a producción en semanas, no en trimestres. Diseño, frontend, backend e infraestructura en un solo equipo, también del tipo regulado, con datos médicos: llevamos haciéndolo en la sanidad alemana desde 2019.',
        scope: 'Normalmente 6–12 semanas',
      },
      {
        title: 'Plataforma de datos, Postgres y herramientas internas',
        weeks: [1, 4],
        description:
          'Diseño de esquemas, migraciones dolorosas, row-level security y salir de un backend gestionado que se te ha quedado pequeño. Y la implantación de FireCMS y Rebase, hecha por quienes los escribieron.',
        scope: 'Normalmente 1–4 semanas',
      },
    ],
  },

  process: {
    title: 'Gente sénior, todo a la vista, cada semana.',
    intro: 'En todo momento sabes qué se está haciendo, por qué y cuánto cuesta.',
    steps: [
      {
        title: 'La primera semana',
        desc: 'Una sesión de trabajo, no un cuestionario. Sales con el alcance por escrito, un plan de hitos y un precio que no se mueve.',
      },
      {
        title: 'Prototipo cuanto antes',
        desc: 'Algo que puedas abrir y clicar en cuestión de semanas. Preferimos descubrir que una idea no funciona en la segunda semana y no en el cuarto mes.',
      },
      {
        title: 'Entregas cada semana',
        desc: 'Una URL de staging desde el primer día y una demo cada viernes. Así el estado del proyecto no es nunca una sorpresa al final.',
      },
      {
        title: 'Te lo quedas, o nos quedamos',
        desc: 'Tu repositorio, tu infraestructura, tus cuentas, documentado. Nos vamos sin dejar cabos sueltos, o nos quedamos como el equipo que lo mantiene vivo.',
      },
    ],
  },

  team: {
    title: 'Con quién vas a trabajar.',
    intro:
      'Tres ingenieros en Madrid que llevan años trabajando juntos.',
    francesco: {
      role: 'Ingeniería · FireCMS',
      bio: 'Creador y maintainer de FireCMS, y coautor de Rebase. Cerca de cuatro mil commits suyos en público, que es un CV algo incómodo pero muy honesto.',
    },
    mattia: {
      role: 'Producto e ingeniería · medicalmotion',
      bio: 'Cofundó Camberi y lleva la tecnología de medicalmotion desde la primera versión: la app del paciente, las herramientas clínicas y la plataforma de datos que hay debajo.',
    },
    marian: {
      role: 'Ingeniería · Rebase',
      bio: 'Coautor de Rebase, el backend sobre Postgres que hacemos en abierto, y colaborador de FireCMS. Backend e infraestructura, que es donde se rompen los productos de verdad.',
    },
    specialists: {
      title: 'Y una lista corta de especialistas',
      body: 'Para diseño, machine learning o móvil traemos a gente con la que llevamos años trabajando. Con nombre y apellidos, y solo en los proyectos que lo piden.',
    },
  },

  contact: {
    title: '¿Qué trabajo le pasarías a un agente?',
    body: 'La mayoría de nuestro trabajo llega de gente que ya usa algo que hicimos. El resto empieza por un correo: con dos párrafos sobre el trabajo que tu equipo hace a mano, o sobre el producto que se ha atascado, nos sobra.',
    book: 'Reservar una llamada de 30 min',
    location: 'Madrid — trabajamos en horario europeo',
    emailSubject: 'Nuevo proyecto',
    bookSubject: 'Llamada de 30 minutos',
    bookBody: 'Hola: me gustaría reservar una llamada. Esto es lo que estamos haciendo y dónde estamos atascados:\n\n',
    reply: 'Lo leemos todo y contestamos en un día laborable.',
    next: {
      title: 'Cómo seguimos',
      steps: [
        'Nos escribes dos párrafos: qué estás montando y por dónde se ha atascado.',
        'Te contestamos con las primeras preguntas, o con un no claro si no es trabajo para nosotros.',
        'Una llamada de 30 minutos sobre el producto, sus límites y los plazos.',
        'El alcance por escrito: los hitos, y un precio que no se mueve.',
      ],
    },
  },

  footer: {
    tagline:
      'Un estudio de ingeniería de producto especializado en agentes de IA y automatización. Hacemos software que no nos importaría seguir manteniendo dentro de seis años, y normalmente acabamos manteniéndolo.',
    studio: 'Estudio',
    built: 'Lo que hemos hecho',
    connect: 'Contacto',
    howWeWork: 'Cómo trabajamos',
    log: 'Registro',
    legal: 'Aviso legal',
    privacy: 'Privacidad',
    security: 'Seguridad',
    rights: 'Todos los derechos reservados.',
    location: 'Madrid',
  },
};
