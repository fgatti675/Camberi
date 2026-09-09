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
    work: 'Proyectos',
    services: 'Servicios',
    openSource: 'Código abierto',
    team: 'Equipo',
    cta: 'Empezar un proyecto',
    toggleMenu: 'Abrir menú',
    switchLanguage: 'Switch to English',
  },

  spine: {
    automations: 'Qué hacemos',
    about: 'Por qué nosotros',
    work: 'Proyectos',
    services: 'Servicios',
    process: 'Cómo trabajamos',
    openSource: 'Código abierto',
    team: 'Equipo',
    contact: 'Contacto',
  },

  hero: {
    titleTop: 'Hacemos software',
    titleBottom: 'que se paga solo.',
    intro:
      'Un estudio de ingeniería de producto en Madrid. Llevamos más de diez años haciendo y manteniendo productos propios —FireCMS, Rebase— y el tuyo lo trabajamos igual.',
    primary: 'Empezar un proyecto',
    secondary: 'Ver lo que hemos hecho',
    scrollCue: 'Baja',
  },

  logoWall: {
    caption: 'Equipos con productos en producción sobre código nuestro',
  },

  automations: {
    title: 'Todo lo que hacemos trabaja por ti.',
    intro:
      'Una misma manía, en nuestros productos y en los proyectos de cliente: coger el trabajo que alguien está haciendo a mano y dejar que lo haga el software. Bien hecho, en producción y durante años.',
    fromLabel: 'Le das',
    toLabel: 'Te devuelve',
    rows: [
      {
        from: 'Una base de datos Postgres que ya es tuya',
        to: 'Un backend completo, con los permisos aplicados por el propio Postgres',
        product: 'Rebase',
        href: 'https://rebase.pro',
      },
      {
        from: 'Una colección de Firebase o MongoDB',
        to: 'Un panel de administración que tu equipo no técnico sabe usar',
        product: 'FireCMS',
        href: 'https://firecms.co',
      },
      {
        from: 'Una pregunta escrita en lenguaje normal',
        to: 'Un dashboard de verdad, con el SQL que ha escrito para montarlo',
        product: 'Dataki',
        href: 'https://dataki.ai',
      },
      {
        from: 'La dirección de una web cualquiera',
        to: 'Un manual de marca entero: escalas de color, combinaciones con el contraste comprobado, tipografía y espaciado',
        product: 'Unbrand.my',
        href: 'https://unbrand.my',
      },
      {
        from: 'Un scraping entre semana de ofertas públicas',
        to: 'Una lista viva de las empresas que están contratando ahora mismo, enriquecida y en cola, con el siguiente paso ya decidido',
        product: 'SustenTalent',
        href: 'https://sustentalent.com',
      },
    ],
    closing:
      'Nada de esto es una demo. Cada línea de arriba es un producto funcionando ahora mismo, y el enlace te lleva directo.',
    cta: 'Automatiza algo tuyo',
  },

  thesis: {
    title: 'No somos de entregar y desaparecer.',
    p1: 'La mayoría de las agencias entrega una v1 y pasa página. Nosotros nunca hemos podido permitírnoslo: también hacemos productos propios, y los seguimos manteniendo.',
    p2: 'FireCMS lleva en producción desde 2020. Cada esquema que planteamos mal, cada migración que hubo que sacar sin romper miles de instalaciones en marcha, cada issue contestado en público a medianoche: esas lecciones las hemos pagado de nuestro bolsillo.',
    p3: 'Eso cambia las preguntas. Ya no es «¿sabemos hacer esto?» —eso lo hace casi cualquiera—, sino «¿quién va a mantenerlo dentro de cuatro años, y cuánto nos va a odiar?».',
    p4: 'Eso es lo que contratas de verdad. No horas de desarrollo, sino criterio sobre las decisiones que salen caras más adelante.',
    ledgerTitle: 'Cada número de esta página enlaza al sitio donde puedes comprobarlo.',
    ledger: [
      {
        value: '6 años',
        label: 'FireCMS en producción, con cambios cada semana desde 2020',
        source: 'github.com/firecmsco/firecms',
        href: 'https://github.com/firecmsco/firecms',
      },
      {
        value: '22k',
        label: 'instalaciones al mes de nuestros paquetes publicados en npm',
        source: 'npmjs.com/org/firecms',
        href: 'https://www.npmjs.com/package/@firecms/core',
      },
      {
        value: '23+',
        label: 'aseguradoras de salud alemanas y suizas cubren un producto nuestro',
        source: 'medicalmotion.com',
        href: 'https://medicalmotion.com',
      },
      {
        value: '12k',
        label: 'instalaciones al mes de Neat, el motor del degradado de esta página',
        source: 'npmjs.com/package/@firecms/neat',
        href: 'https://www.npmjs.com/package/@firecms/neat',
      },
      {
        value: '3,7k',
        label: 'commits en público de uno de nosotros, solo en FireCMS',
        source: 'github.com/fgatti675',
        href: 'https://github.com/fgatti675',
      },
      {
        value: '6',
        label: 'productos propios, todos siguen en marcha',
        source: 'mira los proyectos',
        href: '#work',
      },
    ],
  },

  work: {
    title: 'Productos en producción. No casos de éxito en una presentación.',
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
      stack: ['TypeScript', 'React', 'Firebase', 'MongoDB'],
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
    title: 'Cuatro formas de empezar. Todas con alcance cerrado.',
    intro:
      'Cada proyecto arranca con un alcance cerrado, un plan de hitos y un precio. No con una fase de descubrimiento que factura tres meses.',
    axisLabel: 'Semanas',
    unsure: '¿No sabes cuál necesitas? Casi nadie lo sabe.',
    unsureCta: 'Cuéntanos qué te falla',
    items: [
      {
        title: 'Automatización e IA que aguanta en producción',
        weeks: [3, 10],
        description:
          'El Excel que alguien vuelve a rellenar cada lunes, el informe que sale de juntar cuatro dashboards, la aprobación que vive en una bandeja de entrada. Buscamos cuáles compensa automatizar y las dejamos funcionando sin que nadie tenga que estar encima. También funciones con LLM y agentes, con evaluación, control de coste y un plan B para el día en que el modelo se equivoque con toda la seguridad del mundo.',
        scope: 'Normalmente 3–10 semanas',
      },
      {
        title: 'Hacer el producto',
        weeks: [13, 26],
        description:
          'De cero a producción, o la reescritura que por fin escala. Diseño, frontend, backend e infraestructura en un solo equipo, para que nada se caiga entre proveedores. También del tipo regulado, con datos médicos y una arquitectura que tiene que aguantar una auditoría: llevamos haciéndolo en la sanidad alemana desde 2019.',
        scope: 'Normalmente 3–6 meses',
      },
      {
        title: 'Plataforma de datos, Postgres y herramientas internas',
        weeks: [1, 8],
        description:
          'Diseño de esquemas, migraciones dolorosas, row-level security y salir de un backend gestionado que se te ha quedado pequeño sin pasar un fin de semana caído. Y la implantación de FireCMS y Rebase, hecha por quienes escribieron los frameworks.',
        scope: 'Normalmente 1–8 semanas',
      },
      {
        title: 'Revisión de arquitectura',
        weeks: [2, 2],
        description:
          'Dos semanas, una revisión a fondo de tu stack por gente sénior y un plan por escrito que tu equipo pueda ejecutar solo. La forma más barata de saber si nos necesitas siquiera.',
        scope: 'Precio cerrado, 2 semanas',
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

  openSource: {
    title: 'Todo lo que sabemos, en público.',
    p1: 'Miles de desarrolladores instalan nuestras herramientas cada mes, y cada decisión que hemos tomado está en un historial de commits público. También las que tuvimos que deshacer.',
    p2: 'Seis años respondiendo issues en abierto son seis años de errores que no vamos a repetir dentro de tu código.',
    cta: 'Ver nuestro GitHub',
    repos: {
      firecms: {
        description:
          'El CMS headless y panel de administración para Firebase y MongoDB. Arrancó en 2020 y le seguimos metiendo cambios cada semana.',
        meta: '1,3k estrellas · 220 forks · TypeScript',
      },
      rebase: {
        description:
          'REST, autenticación, almacenamiento, tiempo real y un panel de administración, generados a partir de un esquema de Postgres que ya es tuyo.',
        meta: 'Código abierto · Autoalojado · Postgres',
      },
      neat: {
        description:
          'El motor de degradados en WebGL que dibuja el fondo de esta página. Three.js por debajo y un npm install por encima.',
        meta: '12k instalaciones al mes · Three.js',
      },
    },
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
    title: 'Cuéntanos qué te tiene atascado.',
    body: 'La mayoría de nuestro trabajo llega de gente que ya usa algo que hicimos. El resto empieza por un correo: con dos párrafos sobre tu producto y dónde está atascado nos sobra.',
    book: 'Reservar una llamada de 30 min',
    location: 'Madrid — trabajamos en horario europeo',
    emailSubject: 'Nuevo proyecto',
    bookSubject: 'Llamada de 30 minutos',
    bookBody: 'Hola: me gustaría reservar una llamada. Esto es lo que estamos haciendo y dónde estamos atascados:\n\n',
    reply: 'Lo leemos todo y contestamos en un día laborable.',
  },

  footer: {
    tagline:
      'Un estudio de ingeniería de producto. Hacemos software que no nos importaría seguir manteniendo dentro de seis años, y normalmente acabamos manteniéndolo.',
    studio: 'Estudio',
    built: 'Lo que hemos hecho',
    connect: 'Contacto',
    howWeWork: 'Cómo trabajamos',
    legal: 'Aviso legal',
    privacy: 'Privacidad',
    security: 'Seguridad',
    rights: 'Todos los derechos reservados.',
    location: 'Madrid',
  },
};
