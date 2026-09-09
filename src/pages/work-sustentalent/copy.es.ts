import type { CaseQuote, CaseDecision, CaseEvidence, CaseFact } from '../../components/CaseStudy';
import type { SustentalentCopy } from './copy.en';

/* Castellano. El producto es español —la bolsa, el panel y los correos están
   en español, sin una sola cadena en inglés donde la vea una persona—, así que
   esta es la versión que más se parece al original. Escrita como texto
   español: mismo argumento y misma estructura que la inglesa, otras frases.

   Aquí tampoco hay cifras del cliente. Cuántos candidatos hay registrados o
   cuántas vacantes están vivas es algo que publica SustenTalent si quiere;
   lo que contamos es el mecanismo, que es de lo que respondemos nosotros. */

const decisions: CaseDecision[] = [
  {
    title: 'Leer el scraping por empresa y no por anuncio.',
    body: [
      'El scraping de entre semana está para llenar la bolsa: vacantes reales, extraídas y revisadas antes de publicarse. Leídas por anuncio son una cola de ofertas. Leídas por empresa son otra cosa: una lista viva de compañías de España y Latinoamérica que están contratando perfiles de sostenibilidad ahora mismo, cada una con su web y con la semana en que publicó por última vez.',
      'Esa lista no la construyó nadie y no se compra en ninguna base de datos fría: una empresa con una vacante abierta ya tiene el presupuesto aprobado y a alguien contratando con retraso. El mismo cron, las mismas filas y un eje más por el que leerlas: la cola de revisión que el equipo ya trabajaba pasó a ser también la lista de prospectos.',
    ],
  },
  {
    title: 'El control de acceso es de Postgres, no de la aplicación.',
    body: [
      'El backend ejecuta cada petición como el usuario que la hace, y las políticas de row-level security son el modelo de seguridad. Viven en la configuración de colecciones que comparten el backend y el panel, así que no hay camino de código que pueda olvidarse de aplicarlas ni una segunda implementación que mantener a la par.',
      'A partir de ahí, dos propiedades de RLS deciden el esquema más que el fichero de políticas. Es a nivel de fila, o sea que cualquier columna de una tabla con lectura pública es pública: la bolsa tiene que pintar nombres, logos y colores de marca para quien no ha entrado, así que todo lo comercial de una empresa vive en otra tabla distinta de la que lee el público. Y una petición sin autenticar llega como la cadena “anon”, no como null, que es de esos detalles que convierten una comprobación bien escrita en una que no se cumple: la comprobación de si hay un usuario de verdad es un único predicado compartido y no una comparación reescrita en cada política.',
    ],
  },
  {
    title: 'Enseñar el siguiente paso, no el estado.',
    body: [
      'La primera versión del panel tenía columnas de estado. Todos los pipelines se quedaban en su primer valor, y no porque nadie estuviera trabajando: actualizar un estado es trabajo que no le sirve a quien está haciendo el trabajo, y es lo primero que se cae un día cargado. Una columna de estado es lo que alguien declaró, no lo que pasó.',
      'Así que las colas se rehicieron para deducir la instrucción de los datos: qué toca hacer con esta empresa, con esta candidata, con esta conversación, sacado de lo que hay registrado de verdad. El panel abre con una lista de siguientes pasos, ordenada de forma que una empresa que nos ha escrito pese más que una que encontramos rascando. Cuesta más de hacer que un campo de estado, y es la diferencia entre un panel que informa del trabajo y un panel dentro del cual se trabaja.',
    ],
  },
];

const evidence: CaseEvidence[] = [
  {
    value: 'Pública',
    label: 'la bolsa entera, en español, se pinta sin necesidad de entrar con usuario',
    source: 'sustentalent.com',
    href: 'https://sustentalent.com',
  },
];

const facts: CaseFact[] = [
  {
    label: 'Cliente',
    value: 'SustenTalent — empleo en sostenibilidad y ESG, España y Latinoamérica',
  },
  {
    label: 'Encargo',
    value: 'Producto completo: web pública, backend, panel de administración e infraestructura',
  },
  { label: 'Años', value: '2026 — hoy', data: true },
  {
    label: 'Créditos',
    value: 'Francesco Gatti: todo el desarrollo — web, backend, panel, base de datos e infraestructura.',
  },
];

export const sustentalentEs: SustentalentCopy = {
  title: 'El mismo scraping llena la bolsa y el pipeline comercial.',
  intro:
    'SustenTalent es una bolsa de empleo y un marketplace de talento para perfiles de sostenibilidad y ESG en España y Latinoamérica. Vende servicios de carrera a los candidatos y reclutamiento a las empresas, y toda la operativa —vacantes, empresas, candidatos y un buzón compartido— la lleva un equipo pequeño desde un único panel.',
  meta: 'SustenTalent · España y Latinoamérica · En marcha desde 2026',

  situation: {
    title: 'De dónde viene',
    body: [
      'Una bolsa de empleo arranca fría por los dos lados. Sin vacantes no hay candidatos; sin candidatos no hay empresas a las que merezca la pena llamar. SustenTalent tenía un nicho de verdad —contratación en sostenibilidad y ESG, en español, en España y Latinoamérica— y el mismo problema de dos caras que tiene todo el mundo en ese negocio.',
      'Lo interesante eran las restricciones. La operativa la lleva todo el día un equipo pequeño, en español, con personas reales esperando al otro lado, así que cualquier cosa que dependiera de que alguien mantuviera un registro al día iba a dejar de ser verdad sin avisar. La bolsa pública tiene que funcionar sin usuario, lo que convierte «quién puede leer qué» en una pregunta de esquema y no en una funcionalidad para más adelante. Y había un repositorio, tres desplegables y una sola persona construyéndolos, lo que descarta cualquier diseño en el que dos de los tres tengan que moverse a la vez.',
    ],
  },

  decisionsSection: {
    title: 'Tres decisiones',
    intro:
      'Una de ellas produjo un activo que nadie pagó por construir. Las otras dos son la razón de que el panel siga diciendo la verdad en una semana mala.',
  },
  decisions,

  shipped: {
    title: 'Qué salió',
    body: ['Tres desplegables desde un solo repositorio y un CI que pasa el typecheck de los tres.'],
    items: [
      'La bolsa pública: Astro, con islas de React solo donde la página tiene que hacer algo. Se pinta entera para quien no ha entrado, que es un requisito y no una optimización.',
      'El backend y el panel: Rebase sobre Cloud Run, contra Cloud SQL Postgres, sirviendo a la vez el plano de datos y el panel donde vive el equipo.',
      'Colas deducidas —vacantes por revisar, empresas por contactar, candidatos por contestar— ordenadas por lo que merece atención y no por orden de llegada.',
      'Crons entre semana: rascar vacantes, enriquecer la empresa que hay detrás de cada oferta, retirar ofertas caducadas y consultar el buzón.',
      'Un buzón compartido que envía y recibe dentro del panel por SMTP e IMAP y que a propósito no borra, ni archiva, ni marca nada como leído en el Gmail del equipo. Una integración que te mete la mano en el buzón es una integración que acabas apagando.',
      'Redactar, no enviar. Un modelo saca el detalle de cada oferta y escribe el primer borrador del correo; decide una persona si sale. Nada se envía, se enlaza ni se archiva sin que alguien lo elija.',
    ],
    alt: 'La bolsa de empleo de SustenTalent: vacantes de sostenibilidad y ESG, cada una con la empresa que hay detrás',
    caption: 'sustentalent.com: la bolsa pública, que es también donde acaba el scraping.',
  },

  differently: {
    title: 'Qué haríamos distinto',
    body: [
      'Hay una regla que en este producto no se negocia: a un candidato nunca se le vincula con una vacante a la que no se ha inscrito. La escribimos después de sacar una funcionalidad de matching que se la saltaba, y esa funcionalidad se borró en vez de suavizarla.',
      'Borrarla estuvo bien. Haber escrito la regla antes habría salido más barato, y la lección no iba de matching: las restricciones que deciden si una funcionalidad puede existir cuestan una tarde por escrito antes y dos semanas de descubrirlo después. Que una persona elija a qué candidatos nombra en un correo que está escribiendo sigue valiendo: eso es una decisión suya. Que el sistema proponga el vínculo, no.',
    ],
  },

  outcome: {
    title: 'Dónde ha llegado',
    body: [
      'Las cifras de SustenTalent —candidatos registrados, vacantes vivas, empresas en la lista— las publica el cliente si quiere, no nosotros. Lo que se puede juzgar desde fuera es la maquinaria: la bolsa se refresca con un cron entre semana, la empresa que hay detrás de cada oferta se completa sin que nadie la teclee, el buzón se mantiene sincronizado en los dos sentidos y el panel abre por lo que toca hacer y no por un tablero de estados que alguien tiene que mantener.',
      'La lista de prospectos, que empezó siendo un efecto secundario, es hoy la parte del producto que un competidor tendría que montar una bolsa de empleo entera para copiar.',
    ],
  },
  evidence,

  factsSection: {
    title: 'El encargo',
    stackLabel: 'Stack',
  },
  facts,
  stack: ['Astro', 'React', 'Rebase', 'Cloud Run', 'Cloud SQL Postgres', 'Firebase Hosting'],
  factsNote: [
    'Rebase, el backend sobre el que corre todo esto, es [nuestro](https://rebase.pro) y es open source: por eso las reglas de acceso las impone Postgres y no un middleware, y por eso nadie nos necesita a nosotros para seguir manteniéndolo.',
  ],

  /* ── Hueco para el testimonio ───────────────────────────────
     Vacío hasta que SustenTalent nos dé una cita real; mientras
     tanto no se pinta nada (ver `Testimonial` en
     src/components/CaseStudy.tsx). Se pega aquí tal cual:
     `quote: { text: '…', name: '…', role: '…', company: 'SustenTalent' }`,
     con las palabras en el idioma en que se dijeron. No se inventa. */
  quote: null as CaseQuote | null,

  cta: {
    title: '¿Tienes una operativa que solo es verdad mientras alguien la actualiza?',
    body: 'Suele ser justo lo que merece la pena automatizar. Cuéntanos cuál es y te decimos qué haría falta.',
    primary: 'Empezar un proyecto',
    secondary: 'Ver el resto del trabajo',
  },
};
