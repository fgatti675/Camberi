import type { CaseQuote, CaseDecision, CaseEvidence, CaseFact } from '../../components/CaseStudy';
import type { MedicalmotionCopy } from './copy.en';

/* Castellano. Escrito como texto español, no como traducción del inglés: el
   argumento y la estructura son los mismos, las frases no. Tuteo solo donde
   se habla al lector (la llamada final); el resto es expositivo, que es como
   se lee un caso.

   Los nombres de producto, de stack y los cargos ingleses que la empresa usa
   de verdad ("Head of Product") se quedan en inglés. Las cifras enlazan a la
   misma fuente pública que en la versión inglesa. */

const decisions: CaseDecision[] = [
  {
    title: 'Que una aseguradora cubra el tratamiento es un dato, no un if.',
    body: [
      'Cada aseguradora paga con sus condiciones. [ARAG cubre tres meses](https://medicalmotion.com/de/arag) y manda ella misma el código de acceso por correo, contra el número de póliza. [SDK cubre seis](https://www.sdk.de/versicherungen/private-krankenversicherung/gesundheitsdienstleistungen/digitale-schmerztherapie-mit-medicalmotion), solo a quien tiene el seguro completo, con tres de sus tarifas excluidas, y ahí el código se pide dentro de la app. En ninguno de los dos casos el paciente paga y luego lo reclama.',
      'Si eso se escribe como condiciones dentro de la app, la aseguradora número veinticuatro es una release y la treinta es una reescritura. Así que una aseguradora es un registro —quién es, cómo demuestra alguien que está asegurado con ella, cuánto tiempo dura y cómo se factura— y dar de alta una nueva es configuración y una landing. Ahí está la diferencia entre un canal comercial que maneja el negocio y un ticket que hace cola detrás de todo lo demás.',
    ],
  },
  {
    title: 'Lo que hace el paciente es el dato de la investigación.',
    body: [
      'En 2024 medicalmotion abrió [Pain Lab](https://medicalmotion.com/en/about-us), un fondo de datos para el análisis del dolor y la investigación de servicios sanitarios. Lee lo que el producto ya recoge —el perfil de dolor, el plan que sale de ese perfil, las sesiones que se hacen de verdad— y no un segundo pipeline montado al lado del producto para alimentar estudios.',
      'Eso solo funciona si los datos de terapia se modelaron desde el principio como registro de lo que pasó y no como el estado actual de la app. Es una decisión que se toma una vez, pronto, y rehacerla sale carísimo: la versión en la que la app pisa el plan de la semana pasada se construye antes y ya nunca puede responder por qué mejoró un paciente.',
    ],
  },
  {
    title: 'Un solo equipo para la app, las herramientas del fisio y la plataforma de debajo.',
    body: [
      'La app del paciente, las herramientas con las que trabajan los fisioterapeutas, el motor de personalización que convierte un perfil de dolor en un plan y la plataforma de datos que lee la investigación son un sistema, no cuatro productos con contratos entre ellos. Un cambio que hace un fisio en un plan es la siguiente sesión del paciente y, más adelante, una fila que alguien estudia.',
      'Cuando esas piezas son de proveedores distintos, las costuras están justo donde se pierde el significado del dato: un campo que un equipo trata como orientativo es la clave primaria de otro. Tenerlas en un mismo equipo no es orden, es la forma más barata de mantener una única definición de qué es una sesión de terapia.',
    ],
  },
];

const evidence: CaseEvidence[] = [
  {
    value: '23+',
    label: 'aseguradoras cubren a sus asegurados el coste de la app',
    source: 'medicalmotion.com',
    href: 'https://medicalmotion.com/en/about-us',
  },
  {
    value: '5+',
    label: 'estudios publicados sobre eficacia y satisfacción del paciente; el primero, en 2022',
    source: 'medicalmotion.com',
    href: 'https://medicalmotion.com/en/about-us',
  },
  {
    value: '4,8',
    label: 'de nota media en la App Store alemana, categoría Medicina',
    source: 'apps.apple.com',
    href: 'https://apps.apple.com/de/app/medicalmotion-gegen-schmerzen/id1467911407',
  },
  {
    value: '2024',
    label: 'arranca Pain Lab sobre la misma plataforma de datos, para investigar el dolor y su atención',
    source: 'medicalmotion.com',
    href: 'https://medicalmotion.com/en/about-us',
  },
];

const facts: CaseFact[] = [
  { label: 'Cliente', value: 'medicalmotion GmbH, Múnich' },
  {
    label: 'Relación',
    value: 'Socio tecnológico: ingeniería de producto, sin interrupción desde la primera versión',
  },
  { label: 'Años', value: '2019 — hoy', data: true },
  {
    label: 'Créditos',
    value: 'Mattia Lorenzutti, responsable técnico de todas las versiones desde 2019.',
  },
];

export const medicalmotionEs: MedicalmotionCopy = {
  title: 'Terapia del dolor que pagan más de 23 aseguradoras.',
  intro:
    'medicalmotion es una empresa de salud digital de Múnich. Su app trata el dolor crónico con fisioterapia, respiración y meditación ajustadas al perfil de dolor de cada paciente, y las aseguradoras alemanas y suizas lo cubren. Nosotros hacemos su tecnología desde la primera versión web, en 2019.',
  meta: 'medicalmotion GmbH · Múnich · Socio tecnológico desde 2019',

  situation: {
    title: 'De dónde viene',
    body: [
      'Sven y Tobias Klimpel fundaron medicalmotion en Múnich en [2017](https://medicalmotion.com/en/about-us), después de años buscando alivio para su propio dolor sin encontrarlo. En 2019 había un método de terapia, dos hermanos a los que les había funcionado y ningún producto.',
      'Lo difícil nunca fueron los ejercicios. En Alemania una app para el dolor se convierte en negocio el día que las aseguradoras la cubren, y una aseguradora no firma porque la demo saliera bien: quiere pruebas que pueda leer y quiere que a sus asegurados se los trate con sus condiciones. Los primeros contratos llegaron en 2020, en Alemania y en Suiza, y desde entonces cada decisión de arquitectura se ha tomado con esas dos presiones encima: datos que tienen que aguantar que los estudien y un modelo de acceso capaz de absorber los tres meses de una aseguradora y los seis de otra sin tocar el código.',
    ],
  },

  decisionsSection: {
    title: 'Tres decisiones',
    intro: 'Siete años después, estas tres siguen sosteniendo el producto.',
  },
  decisions,

  shipped: {
    title: 'Qué salió',
    body: [
      'Cuatro cosas, hechas y mantenidas por el mismo equipo, y todavía la forma que tiene el producto hoy.',
    ],
    items: [
      'La app del paciente: el perfil de dolor, el plan que sale de él, las sesiones de fisioterapia, la respiración y la meditación, el diario de dolor y el informe que el paciente puede llevarle a su médico.',
      'Las herramientas del fisioterapeuta: donde la gente que hay detrás de la terapia ve lo que un paciente está haciendo de verdad y cambia lo que viene después.',
      'El motor de personalización: lo que convierte el perfil de dolor de una persona en el plan de esa persona, y lo va ajustando según cambian sus respuestas.',
      'La plataforma de datos: donde escribe el producto y de donde lee [Pain Lab](https://medicalmotion.com/en/about-us).',
    ],
    caption: 'Lo que hace la app, con las palabras y las pantallas de medicalmotion.',
  },

  outcome: {
    title: 'Dónde ha llegado',
    body: [
      'Estos resultados son de medicalmotion, no nuestros. Lo que dicen de la tecnología es que lleva expuesta a aseguradoras, investigadores y pacientes el tiempo suficiente como para que cualquiera pueda comprobarlo.',
    ],
  },
  evidence,

  factsSection: {
    title: 'El encargo',
    stackLabel: 'Stack',
  },
  facts,
  stack: ['React', 'Node', 'Google Cloud', 'Datos clínicos'],
  factsNote: [
    'Una aclaración, porque cambia cómo hay que leer el resto: Mattia figura además públicamente como cofundador de medicalmotion y su Head of Product. Camberi es el equipo de ingeniería de medicalmotion y uno de nosotros lleva desde 2017 en el lado fundador de la mesa. Es un producto de cliente hecho por gente que se juega algo en él, y conviene saberlo antes de valorar el caso.',
  ],

  /* ── Hueco para el testimonio ───────────────────────────────
     Vacío hasta que medicalmotion nos dé una cita real, y mientras
     tanto no se pinta nada (ver `Testimonial` en
     src/components/CaseStudy.tsx). Se pega aquí tal cual:
     `quote: { text: '…', name: '…', role: '…', company: 'medicalmotion' }`,
     con las palabras en el idioma en que se dijeron. No se inventa. */
  quote: null as CaseQuote | null,

  cta: {
    title: '¿Producto regulado, de vida larga y con datos de salud ajenos?',
    body: 'Es el trabajo que hacemos desde 2019. Cuéntanos qué estás construyendo y te decimos qué hace falta.',
    primary: 'Empezar un proyecto',
    secondary: 'Ver el resto del trabajo',
  },
};
