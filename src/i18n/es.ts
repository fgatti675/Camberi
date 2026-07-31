import type { Dict } from './en';

/* Castilian Spanish (es-ES). Tuteo throughout, which is the register Spanish
   tech and startup buyers expect — "usted" would read as a bank. Product
   names, stack names and metric units stay in English on purpose. */
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

  hero: {
    titleTop: 'Hacemos software',
    titleBottom: 'que se paga solo.',
    intro:
      'Un estudio de ingeniería de producto en Madrid. Llevamos más de una década creando y manteniendo nuestros propios productos —como FireCMS y Rebase— y aplicamos esa misma profundidad al tuyo.',
    primary: 'Empezar un proyecto',
    secondary: 'Ver nuestro trabajo',
  },

  logoWall: {
    caption: 'Equipos que lanzan productos sobre software que escribimos nosotros',
  },

  thesis: {
    eyebrow: 'Por qué nosotros',
    title: 'No lo entregamos y desaparecemos.',
    p1: 'La mayoría de las agencias entrega una v1 y pasa página. Nosotros nunca hemos tenido ese lujo: también hacemos nuestros propios productos, y seguimos manteniéndolos.',
    p2: 'FireCMS lleva en producción desde 2020. Cada esquema que planteamos mal, cada migración que tuvimos que publicar sin romper miles de instalaciones en marcha, cada issue respondido en público a medianoche: esas lecciones las pagamos nosotros.',
    p3: 'Eso cambia las preguntas que te haces. Ya no es «¿podemos construir esto?» —casi cualquiera puede—, sino «¿quién va a mantenerlo dentro de cuatro años y nos va a maldecir por ello?».',
    p4: 'Eso es lo que contratas de verdad. No capacidad de ejecución: criterio sobre las decisiones que salen caras más adelante.',
    stats: [
      { value: '6 años', label: 'FireCMS en producción, publicando cada semana' },
      { value: '22k', label: 'instalaciones al mes entre nuestros paquetes de npm' },
      { value: '23+', label: 'aseguradoras de salud cubren un producto que hicimos' },
      { value: '6', label: 'productos propios, todos ellos aún en marcha' },
    ],
  },

  work: {
    eyebrow: 'Proyectos seleccionados',
    title: 'Productos en producción. No casos de éxito en una presentación.',
    intro:
      'Puedes leer cómo trabajamos, o puedes ir a usar lo que hemos hecho. Todo lo que hay aquí abajo está funcionando ahora mismo.',
    visit: (name: string) => `Visitar ${name}`,
    alsoTitle: 'También hecho y en marcha',
    alsoNote:
      'Además de una década de consultoría para equipos de producto por toda Europa: desde la primera llamada de arquitectura hasta el rescate seis meses después del lanzamiento.',

    medicalmotion: {
      kicker: 'Producto de cliente · Salud digital · Múnich',
      lead: 'Terapia del dolor guiada por IA que los médicos prescriben y las aseguradoras pagan.',
      body: 'Hemos hecho la tecnología de medicalmotion desde su primera versión web: la app de paciente, las herramientas para fisioterapeutas, el motor de personalización y la plataforma de datos detrás de su investigación Pain Lab. Datos médicos, regulación sanitaria alemana, resultados clínicos publicados. El tipo de producto en el que una decisión de arquitectura equivocada no es un sprint que puedas repetir.',
      metrics: [
        { value: '23+', label: 'aseguradoras lo cubren' },
        { value: '5+', label: 'estudios de eficacia publicados' },
        { value: '2019', label: 'primera versión que lanzamos' },
      ],
      stack: ['React', 'Node', 'Google Cloud', 'Datos clínicos'],
    },
    firecms: {
      kicker: 'Producto propio · Código abierto · Desde 2020',
      lead: 'El panel de administración con el que miles de equipos de Firebase gestionan su back office.',
      body: 'Empezó siendo la herramienta interna que estábamos cansados de rehacer para cada cliente. Seis años después es un framework de código abierto con una nube gestionada encima, usado por equipos de producto desde salud digital hasta logística, y hemos mantenido cada breaking change, escrito cada página de documentación y respondido cada issue nosotros mismos.',
      metrics: [
        { value: '1,3k', label: 'estrellas en GitHub' },
        { value: '9k', label: 'instalaciones de npm al mes' },
        { value: '220+', label: 'forks' },
      ],
      stack: ['TypeScript', 'React', 'Firebase', 'MongoDB'],
    },
    rebase: {
      kicker: 'Producto propio · Publicándose ahora',
      lead: 'Apúntalo al Postgres que ya tienes y obtén un backend.',
      body: 'REST, autenticación, almacenamiento, tiempo real y un panel de administración generado, con cada regla de acceso aplicada por el row-level security de Postgres en lugar de por middleware en el que tengas que confiar. Pensado para equipos que prefieren no dejar sus datos de producción en la instancia gestionada de otro. Código abierto, autoalojado y europeo por diseño.',
      metrics: [
        { value: 'Open', label: 'source, MIT' },
        { value: 'Self', label: 'hosted, tu infra' },
        { value: 'RLS', label: 'aplicado por Postgres' },
      ],
      stack: ['Postgres', 'TypeScript', 'REST + GraphQL', 'Tiempo real'],
    },

    dataki:
      'Conecta una base de datos, pregunta en lenguaje natural y obtén un dashboard de verdad, con su SQL incluido. BigQuery, Postgres, MySQL, Sheets.',
    unbrand:
      'Apúntalo a cualquier web y genera un manual de marca: escalas de color, combinaciones con contraste comprobado, escala tipográfica y tokens de espaciado. Con API.',
    neat: 'Un motor y editor de degradados en WebGL, y el fondo de la página que estás leyendo. 12k instalaciones al mes.',
    dadaki:
      'Un editor vectorial completo que funciona enteramente en el navegador. Sin instalar nada, sin ida y vuelta al servidor, sin plugins.',
  },

  engagements: {
    eyebrow: 'Cómo trabajar con nosotros',
    title: 'Seis formas de empezar. Todas con alcance cerrado.',
    intro:
      'Cada proyecto arranca con un alcance fijo, un plan de hitos y un precio; no con una fase de descubrimiento que factura tres meses.',
    unsure: '¿No sabes cuál necesitas? Casi nadie lo sabe.',
    unsureCta: 'Cuéntanos qué falla',
    items: [
      {
        title: 'Construir el producto',
        description:
          'De cero a producción, o la reescritura que por fin escala. Diseño, frontend, backend e infraestructura en manos de un solo equipo, para que nada se pierda entre proveedores.',
        scope: 'Normalmente 3–6 meses',
      },
      {
        title: 'Ingeniería regulada y health tech',
        description:
          'Productos donde los datos son médicos, el mercado es europeo y la arquitectura tiene que aguantar una auditoría. Llevamos haciendo exactamente esto en la sanidad alemana desde 2019.',
        scope: 'Normalmente 2–4 meses',
      },
      {
        title: 'Plataforma de datos y Postgres',
        description:
          'Diseño de esquemas, migraciones dolorosas, row-level security, herramientas de administración y salir de un backend gestionado que se te ha quedado pequeño sin un fin de semana de caída.',
        scope: 'Normalmente 3–8 semanas',
      },
      {
        title: 'Funciones de IA que llegan a producción',
        description:
          'Funciones con LLM, agentes, recuperación de información e integraciones MCP hechas para funcionar en producción, con evaluación, control de coste y un plan B para el día en que el modelo se equivoque.',
        scope: 'Normalmente 4–10 semanas',
      },
      {
        title: 'Implantación de FireCMS y Rebase',
        description:
          'Colecciones, componentes e integraciones a medida, hechos por quienes escribieron el framework, más soporte enterprise continuado.',
        scope: 'Normalmente 1–4 semanas',
      },
      {
        title: 'Revisión de arquitectura',
        description:
          'Dos semanas, una lectura sénior de tu stack y un plan escrito que tu propio equipo pueda ejecutar. La forma más barata de averiguar si nos necesitas siquiera.',
        scope: 'Precio cerrado, 2 semanas',
      },
    ],
  },

  process: {
    eyebrow: 'Cómo trabajamos',
    title: 'Sénior, transparente, cada semana.',
    intro: 'En todo momento sabes qué se está construyendo, por qué y cuánto cuesta.',
    steps: [
      {
        title: 'La primera semana',
        desc: 'Una sesión de trabajo, no un cuestionario. Sales con un alcance por escrito, un plan de hitos y un precio que no se mueve.',
      },
      {
        title: 'Prototipo pronto',
        desc: 'Algo clicable en tu navegador en cuestión de semanas. Preferimos descubrir que una idea no funciona en la segunda semana y no en el cuarto mes.',
      },
      {
        title: 'Publicar cada semana',
        desc: 'Una URL de staging desde el primer día y una demo cada viernes, para que el estado del trabajo no sea nunca una sorpresa al final.',
      },
      {
        title: 'Traspaso, o nos quedamos',
        desc: 'Tu repositorio, tu infraestructura, tus cuentas, todo documentado. Nos vamos limpiamente, o nos quedamos como el equipo que lo mantiene vivo.',
      },
    ],
  },

  openSource: {
    eyebrow: 'Código abierto',
    title: 'Todo lo que sabemos, en público.',
    p1: 'Miles de desarrolladores instalan nuestras herramientas cada mes, y cada decisión que hemos tomado está en un historial de commits público, incluidas las que tuvimos que deshacer.',
    p2: 'Seis años respondiendo issues en abierto son seis años de errores que no vamos a repetir dentro de tu código.',
    cta: 'Ver nuestro GitHub',
    repos: {
      firecms: {
        description:
          'El CMS headless y panel de administración para Firebase y MongoDB. Empezó en 2020 y sigue recibiendo cambios cada semana.',
        meta: '1,3k estrellas · 220 forks · TypeScript',
      },
      rebase: {
        description:
          'REST, autenticación, almacenamiento, tiempo real y un panel de administración generados a partir de un esquema de Postgres que ya es tuyo.',
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
    eyebrow: 'El equipo',
    title: 'Con quién vas a trabajar.',
    intro:
      'Tres ingenieros, entre Madrid y Múnich, que llevan años construyendo cosas juntos.',
    francesco: {
      role: 'Ingeniería · FireCMS',
      bio: 'Creador y responsable de FireCMS, y coautor de Rebase. Cerca de cuatro mil commits de ello en público, que es un CV algo incómodo pero muy honesto.',
    },
    mattia: {
      role: 'Producto e ingeniería · medicalmotion',
      bio: 'Cofundó Camberi y dirige la tecnología de medicalmotion desde su primera versión: la app de paciente, las herramientas clínicas y la plataforma de datos que hay debajo.',
    },
    marian: {
      role: 'Ingeniería · Rebase',
      bio: 'Coautor de Rebase, el backend sobre Postgres que desarrollamos en abierto, y colaborador de FireCMS. Backend e infraestructura, que es donde de verdad se rompen los productos.',
    },
    specialists: {
      title: 'Y una lista corta de especialistas',
      body: 'Para diseño, machine learning o móvil traemos a gente con la que llevamos años trabajando, por su nombre y en los proyectos que lo necesitan.',
    },
  },

  contact: {
    eyebrow: 'Hablemos',
    title: 'Cuéntanos qué se ha atascado.',
    body: 'La mayor parte de nuestro trabajo llega de gente que ya usa algo que hicimos. El resto empieza con un correo: con dos párrafos sobre tu producto y dónde está bloqueado nos sobra. Lo leemos todo y respondemos en un día laborable.',
    book: 'Reservar una llamada de 30 min',
    location: 'Madrid · Múnich — trabajamos en horario europeo',
    emailSubject: 'Nuevo proyecto',
    bookSubject: 'Llamada de 30 minutos',
    bookBody: 'Hola: me gustaría reservar una llamada. Esto es lo que estamos construyendo y dónde estamos atascados:\n\n',
  },

  footer: {
    tagline:
      'Un estudio de ingeniería de producto. Hacemos software que seguiríamos estando dispuestos a mantener dentro de seis años, porque normalmente lo estamos.',
    studio: 'Estudio',
    built: 'Lo que hemos hecho',
    connect: 'Contacto',
    howWeWork: 'Cómo trabajamos',
    rights: 'Todos los derechos reservados.',
    location: 'Madrid · Múnich',
  },
};
