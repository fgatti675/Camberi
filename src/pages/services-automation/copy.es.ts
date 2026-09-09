import type { ServiceCopy } from '../services/service';

/* Castellano. Escrito como texto español, no como traducción del inglés:
   tuteo, verbos de aquí, y los nombres de producto y de stack en inglés. La
   estructura de claves es idéntica a `copy.en.ts` porque el tipo y la
   maquetación dependen de ello, pero cada frase está pensada en español. */

export const automationEs: ServiceCopy = {
  title: 'Que el software haga el trabajo que tu equipo repite cada semana.',
  intro:
    'Automatización e IA para equipos de operaciones: cogemos los procesos que se hacen a mano y los dejamos funcionando solos, también los que llevan un modelo de lenguaje dentro.',
  meta: 'Normalmente 3–10 semanas · alcance cerrado y plan de hitos la primera semana',

  lead: [
    'Casi todos los equipos arrastran un puñado de tareas que hace una persona porque nunca hubo tiempo de montarlas de otra forma. El Excel que se vuelve a rellenar el lunes por la mañana. El informe semanal que sale de juntar cuatro dashboards. La aprobación que vive en la bandeja de alguien y se para cuando esa persona se va de vacaciones. Ninguna es difícil. Todas se comen la mañana de alguien.',
    'Buscamos cuáles compensa automatizar, las construimos y las dejamos funcionando sin que nadie tenga que estar encima. También funciones con LLM y agentes: un modelo en producción no se parece en nada a un modelo en una demo, así que sale con un set de evaluación, un coste por ejecución y un plan B definido para el día en que se equivoque con toda la seguridad del mundo.',
    'Si todavía no sabes qué procesos compensan, la [revisión de arquitectura](__REVIEW__) dura dos semanas y termina en un plan por escrito que puedes ejecutar sin nosotros.',
  ],

  fit: {
    title: 'Para quién es esto.',
    intro:
      'La versión honesta, con las dos mitades. Una automatización montada sobre un proceso que nadie ha acordado solo deja el desacuerdo fijado en código.',
    forTitle: 'Encaja bien',
    for: [
      'Un equipo de operaciones, finanzas, soporte o selección que lleva el negocio con hojas de cálculo, un buzón compartido y tres SaaS que no se hablan entre sí.',
      'Sabes nombrar el proceso y alguien puede enseñárnoslo en su pantalla en veinte minutos.',
      'Pasa lo bastante a menudo como para que quitarlo le devuelva la semana a alguien: cada día, cada semana o por cada cliente.',
      'Quieres un modelo de lenguaje dentro del proceso y necesitas responder, antes de sacarlo, qué pasa con los casos en los que se equivoca.',
      'Los datos ya están en algún sitio: una base de datos, una hoja, un buzón o una API. No solo en la cabeza de alguien.',
    ],
    notTitle: 'No encaja',
    not: [
      'El proceso cambia cada mes y dos personas te lo cuentan distinto. Escríbelo primero; automatizarlo ahora deja el desacuerdo fijado para siempre.',
      'Quieres entrenar un modelo desde cero o hacerle fine-tuning. Nosotros integramos modelos y montamos la evaluación y las barreras alrededor; entrenarlos es otra especialidad.',
      'El volumen son dos documentos a la semana. El mantenimiento va a costar más que hacerlo a mano, y te lo diremos en la primera llamada.',
      'Quieres un chat en la web de marketing. Eso es un encargo bastante más pequeño que esto y no nos necesita.',
      'El problema de verdad es que nadie es dueño del proceso. Eso no lo arregla el software, y se ve en la primera hora mirando cómo se trabaja.',
    ],
  },

  problems: {
    title: 'Cómo suele venir esto cuando llegas aquí.',
    intro:
      'Nadie busca «automatización de procesos». Se busca la cosa concreta que te pasa todos los lunes.',
    items: [
      {
        title: 'El Excel que se vuelve a rellenar cada lunes',
        body: 'Los números ya existen en tres sistemas. Alguien los copia a mano a un cuarto, y la copia está desfasada antes de que empiece la reunión. La solución casi nunca es otra herramienta: es un proceso que lee los tres sistemas y escribe el cuarto.',
      },
      {
        title: 'El informe que sale de juntar cuatro dashboards',
        body: 'Todas las cifras están disponibles. Convertirlas en lo que lee el comité cuesta una tarde a la semana, y la persona que lo hace es justo la que mejor entiende el negocio.',
      },
      {
        title: 'La aprobación que vive en una bandeja de entrada',
        body: 'No hay registro de quién aprobó qué, no se ve lo que está esperando y el proceso entero se para cuando esa persona falta. Una cola con roles y traza de auditoría es una semana de trabajo y cierra la discusión.',
      },
      {
        title: 'La función con LLM que iba bien en la demo',
        body: 'Extracción, clasificación o redacción que acierta casi siempre, sin medir cuánto es «casi» y sin plan para el resto. Lo que falta es un set de evaluación hecho con tus propios casos, un número que puedas vigilar y una vía para los casos con poca confianza.',
      },
      {
        title: 'La integración que se rompió y nadie se enteró',
        body: 'Un script que alguien escribió hace dos años y que se ejecuta en un portátil o en un cron sin alertas. Lleva fallando en silencio desde abril. Una automatización cuya salud no ve nadie es un pasivo, no un activo.',
      },
      {
        title: 'El picar datos que en realidad es un problema de modelo de datos',
        body: 'El mismo cliente existe tres veces con tres grafías, así que todo lo que viene después necesita a una persona para cuadrarlo. A veces la automatización está antes de donde duele.',
      },
    ],
  },

  deliverables: {
    title: 'Qué te llevas.',
    intro:
      'La misma entrega que en cualquier encargo nuestro, más lo que hace falta cuando hay un modelo en producción.',
    items: [
      {
        title: 'Un alcance por escrito',
        body: 'La primera semana: qué procesos, en qué orden, qué significa «terminado» en cada uno y qué dejamos fuera a propósito. Acordado antes de construir nada.',
      },
      {
        title: 'Un plan de hitos',
        body: 'Qué entra y cuándo. Es lo que nos puedes exigir, y la razón por la que nadie tiene que pedir un estado.',
      },
      {
        title: 'Una URL de staging desde el primer día',
        body: 'El trabajo se ve desde la primera semana: con tus datos donde sea seguro y con una copia realista donde no lo sea.',
      },
      {
        title: 'Una demo todos los viernes',
        body: 'Media hora, con la gente que hace el trabajo delante y no solo con quien firma. La mitad de las decisiones salen de esa llamada.',
      },
      {
        title: 'Un set de evaluación, si hay modelo de por medio',
        body: 'Hecho con tus casos reales, no con ejemplos que nos hayamos inventado. Te da un porcentaje de acierto que puedes seguir en el tiempo, y es lo que convierte «la IA va bastante bien» en un número.',
      },
      {
        title: 'Un coste por ejecución y un plan B',
        body: 'Cuánto cuesta cada ejecución, dónde está el techo y qué pasa cuando el modelo no está, tarda demasiado o se equivoca: cola humana, camino determinista o negarse a responder. Lo decides tú, dentro del alcance.',
      },
      {
        title: 'Monitorización que se ve',
        body: 'Cada automatización cuenta si se ejecutó, qué hizo y qué se saltó, y avisa a alguien cuando deja de funcionar. Fallar en silencio es el fallo por defecto de este tipo de trabajo.',
      },
      {
        title: 'El repositorio, la infraestructura y las cuentas',
        body: 'A tu nombre, documentados y con un runbook. Nos vamos limpiamente, o nos quedamos como el equipo que lo mantiene.',
      },
    ],
  },

  running: {
    title: 'Cómo se trabaja.',
    intro:
      'La forma, no un diagrama de Gantt. Las fechas salen del plan de hitos de la primera semana, y la primera automatización está en producción mucho antes del final.',
    steps: [
      {
        label: 'Semana uno',
        title: 'Mirar cómo se trabaja',
        body: 'Nos sentamos con quien lo hace y lo vemos hacer: ni cuestionario ni taller. Después ordenamos las candidatas por horas recuperadas frente a esfuerzo, y eliges tú.',
      },
      {
        label: 'Semanas dos y tres',
        title: 'Un proceso, de punta a punta',
        body: 'La automatización que más aporta funciona con datos reales en staging, con una persona aprobando todavía cada resultado. Ahí se descubre cuál es el proceso de verdad.',
      },
      {
        label: 'Tramo central',
        title: 'En producción, con la vía manual abierta',
        body: 'Entra en producción para una parte del trabajo mientras la forma antigua sigue existiendo. Medimos cuánto coinciden las dos antes de apagar nada.',
      },
      {
        label: 'Últimas semanas',
        title: 'El resto y la entrega',
        body: 'Los procesos que quedan, las alertas, el runbook y una sesión con quien vaya a hacerse cargo. O nos quedamos nosotros.',
      },
    ],
  },

  proof: {
    title: 'Automatizaciones nuestras funcionando ahora mismo.',
    intro: 'No son referencias: son productos que puedes abrir, con los números enlazados a donde se comprueban.',
    evidence: [
      {
        value: 'A diario',
        label: 'scraping de vacantes y enriquecimiento que alimentan la lista de prospectos de SustenTalent',
        source: 'sustentalent.com',
        href: 'https://sustentalent.com',
      },
      {
        value: 'SQL',
        label: 'Dataki responde a una pregunta en lenguaje normal con un dashboard real y la consulta que ha escrito',
        source: 'dataki.ai',
        href: 'https://dataki.ai',
      },
      {
        value: '6 años',
        label: 'FireCMS en producción, con commits cada semana desde 2020',
        source: 'github.com/firecmsco/firecms',
        href: 'https://github.com/firecmsco/firecms',
      },
    ],
    body: [
      '[SustenTalent](__SUSTENTALENT__) es el ejemplo más claro del patrón. Es un portal de empleo, y la operación de captación que lo trabaja está metida dentro del mismo producto: un scraping entre semana lee vacantes reales por empresa en vez de por anuncio, un pipeline de enriquecimiento completa la empresa que hay detrás de cada oferta, el buzón compartido se sincroniza solo y el panel deduce el siguiente paso de cada prospecto en lugar de pedirle a nadie que mantenga una columna de estado. Nadie mantiene la lista de prospectos: sale de tener el portal funcionando.',
      '[Dataki](https://dataki.ai) es el ejemplo de modelo en producción: preguntas en lenguaje normal y te devuelve un dashboard junto con el SQL que ha escrito para llegar hasta ahí. Enseñar la consulta es la barrera de seguridad, porque es lo que te deja comprobar la respuesta en vez de fiarte de ella.',
      'Y la razón para encargarnos esto a nosotros en vez de construirlo una vez y olvidarlo: seguimos manteniendo todo lo que hemos hecho. [FireCMS](https://firecms.co) está en producción desde 2020 y no ha pasado una semana sin commits.',
    ],
  },

  faq: {
    title: 'Lo que nos preguntáis.',
    intro: 'Las que salen en casi todas las primeras llamadas.',
    items: [
      {
        q: '¿Hay que cambiar las herramientas que ya usamos?',
        a: 'Casi nunca. La mayor parte del trabajo es integración: leer de los sistemas que tienes y volver a escribir en ellos. Cambiar una herramienta que tu equipo ya domina sale caro y rara vez es la razón por la que el proceso va lento.',
      },
      {
        q: '¿Qué pasa cuando el modelo se equivoca?',
        a: 'Se decide en el alcance, antes de sacar nada. Cada función con modelo lleva un set de evaluación hecho con tus casos, así tienes un porcentaje de acierto medido y no una sensación, y una vía definida para los casos por debajo del umbral de confianza: cola humana, camino determinista o negarse a responder. Una función sin respuesta a esta pregunta no sale a producción.',
      },
      {
        q: '¿Cómo mantenéis previsible el coste de una función con LLM?',
        a: 'Midiéndolo mientras se construye y diseñando alrededor de ese número: caché, modelos más pequeños para los casos fáciles y un techo duro de gasto por ejecución. Lo tienes antes de que la función esté viva, no en la primera factura.',
      },
      {
        q: '¿Nuestros datos acaban en un proveedor de modelos?',
        a: 'Solo si lo decides tú, y solo los campos que la tarea necesita. Cuando eso no es aceptable —datos regulados, un contrato con un cliente que lo prohíbe— las opciones son un proveedor con las condiciones y la región adecuadas, o un modelo sobre infraestructura tuya. Es una decisión de alcance y cambia lo que se puede hacer, así que la sacamos la primera semana.',
      },
      {
        q: '¿De quién es y quién lo mantiene después?',
        a: 'Tuyo. El repositorio, la infraestructura y las cuentas están a tu nombre desde la primera semana, y la entrega incluye un runbook. Si prefieres no mantenerlo, nos quedamos; pero eso es una elección, no una dependencia que dejemos montada.',
      },
      {
        q: 'No sabemos qué procesos compensa automatizar.',
        a: 'Entonces empieza por la [revisión de arquitectura](__REVIEW__): dos semanas, un plan por escrito y cada punto ordenado por lo que te cuesta hoy. Buena parte suele poder hacerla tu propio equipo, y eso también es un buen resultado.',
      },
    ],
  },

  cta: {
    body: 'Con dos párrafos vale: cuál es el proceso, quién lo hace hoy y cada cuánto. Si no compensa automatizarlo, te lo decimos.',
  },

  related: {
    title: 'Las otras tres formas de empezar.',
    intro: 'Todos los encargos arrancan con un alcance cerrado y un plan de hitos.',
  },
};
