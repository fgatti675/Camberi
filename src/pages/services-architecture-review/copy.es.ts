import type { ServiceCopy } from '../services/service';

/* Castellano, escrito como español. Tuteo, y sin calcar el inglés: aquí no
   se dice «una lectura sénior de tu stack», se dice que leemos el código y
   lo contamos por escrito. Misma estructura de claves que `copy.en.ts`. */

export const architectureReviewEs: ServiceCopy = {
  title: 'Dos semanas y un plan por escrito que tu equipo puede ejecutar solo.',
  intro:
    'Una revisión de arquitectura con alcance cerrado: leemos tu stack en serio y te entregamos un documento que ordena lo que está mal por lo que te está costando.',
  meta: 'Precio cerrado, 2 semanas · el documento es tuyo nos contrates después o no',

  lead: [
    'Es la forma más barata de saber si nos necesitas siquiera, y es una entrega de verdad y no una llamada comercial con diapositivas. Dos semanas: leemos el código, el modelo de datos, la infraestructura y el camino hasta producción, hablamos con quien trabaja ahí dentro todos los días y ponemos por escrito lo que encontramos.',
    'Lo que recibes es un documento en lenguaje normal —uno que pueden leer tanto tu CTO como tu consejo— con los hallazgos ordenados por lo que te cuestan y no por lo interesantes que sean, y un plan en tres horizontes. Está escrito para que lo ejecuten tus propios ingenieros sin nosotros, porque la mayoría de las veces ese es el resultado correcto.',
    'Los otros tres encargos —[automatización](__AUTOMATION__), [hacer el producto](__PRODUCT__) y [plataforma de datos](__DATA_PLATFORM__)— empiezan muchas veces aquí, pero ninguno tiene por qué.',
  ],

  fit: {
    title: 'Para quién es esto.',
    intro: 'Dos semanas son pocas, y por eso importa tanto con qué se entra.',
    forTitle: 'Encaja bien',
    for: [
      'Un CTO que quiere una segunda opinión antes de comprometerse con una reescritura, una migración o un plan de contratación, de alguien que no gana nada con la respuesta.',
      'Fundadores sin perfil técnico que han heredado un código y no saben si las estimaciones que salen de ahí son honestas.',
      'Un consejo o un inversor que quiere una lectura técnica de una empresa antes de firmar algo.',
      'Un equipo que ya sabe qué está mal y necesita que lo escriba alguien de fuera para poder priorizarlo frente a todo lo demás.',
      'Estás a punto de gastarte mucho en ingeniería y te gustaría saber antes qué parte de ese dinero se va a tirar.',
    ],
    notTitle: 'No encaja',
    not: [
      'Quieres un documento que confirme una decisión ya tomada. Vamos a escribir lo que encontremos, y si resulta incómodo sigue siendo lo que te llevas.',
      'No puedes darnos acceso de lectura al repositorio y una hora con dos o tres de los ingenieros que trabajan en él. Sin eso, una revisión es una suposición con buena letra y no merece la pena pagarla.',
      'Todavía no hay código. No hay nada que revisar: empieza por [hacer el producto](__PRODUCT__), donde la primera semana ya es una sesión de alcance.',
      'Necesitas una auditoría de seguridad formal, un pentest o una certificación. Esto es una revisión de ingeniería hecha por ingenieros; aquello son ejercicios reglados con sus propios especialistas.',
      'Quieres un precio cerrado de los arreglos al terminar. El plan dice cuál es el trabajo; estimarlo bien es lo primero que el plan hace posible, no algo que la revisión adelante.',
    ],
  },

  problems: {
    title: 'Qué suele provocar una de estas.',
    intro: 'Seis discusiones que un documento de fuera cierra antes que otra reunión.',
    items: [
      {
        title: 'La discusión de la reescritura',
        body: 'Media plantilla quiere rehacerlo y la otra media quiere refactorizar, y nadie ha escrito cuánto costaría rehacerlo ni qué se ganaría. La discusión vuelve cada trimestre y no se mueve nada.',
      },
      {
        title: 'Estimaciones que se van siempre',
        body: 'Cada función tarda el triple de lo que debería y nadie de fuera del equipo sabe explicar por qué. Suele haber un motivo concreto, suele ser estructural y suele verse en una semana de lectura.',
      },
      {
        title: 'La factura que crece más rápido que el uso',
        body: 'El coste de infraestructura sube y nadie sabe señalar qué lo está empujando. Es uno de los pocos hallazgos que paga la revisión él solo.',
      },
      {
        title: 'El factor autobús',
        body: 'Una sola persona sabe cómo funciona el despliegue, o por qué existe ese servicio. Todo el mundo sabe que es un riesgo; nadie le ha puesto nunca un número ni un plan.',
      },
      {
        title: 'La pregunta de escala que no sabes responder',
        body: 'Qué pasa con diez veces el tráfico y qué parte cede primero. Adivinar sale caro en las dos direcciones: pasarse cuesta dinero ahora, quedarse corto cuesta un fin de semana después.',
      },
      {
        title: 'Due diligence antes de una operación',
        body: 'Alguien va a comprar, invertir o fusionarse con un código, y necesita una lectura técnica que no hayan escrito quienes lo construyeron.',
      },
    ],
  },

  deliverables: {
    title: 'Qué te llevas.',
    intro: 'Un documento y una conversación. Los dos son tuyos y ninguno depende de que nos contrates.',
    items: [
      {
        title: 'Un documento escrito en lenguaje normal',
        body: 'Pensado para que lo lea un CTO y un consejero sin tener que hacer dos versiones. La jerga aparece donde hace falta y se explica donde no.',
      },
      {
        title: 'Hallazgos ordenados por lo que cuestan',
        body: 'Por lo que cada uno te cuesta en dinero, en tiempo o en riesgo, no por lo interesante que fue encontrarlo. El orden es la parte más útil del documento.',
      },
      {
        title: 'Un plan en tres horizontes',
        body: 'Este mes, este trimestre, este año: qué hacer, cuánto cuesta aproximadamente y qué se gana con cada cosa. Escrito para que tus ingenieros lo cojan y empiecen.',
      },
      {
        title: 'Los riesgos que no dejaríamos pasar',
        body: 'Uno a uno, con lo que ocurre si los dejas pasar. Lista corta a propósito: una lista de cuarenta riesgos es una forma de no mojarse.',
      },
      {
        title: 'Números donde los hay',
        body: 'Tiempos de build, tamaño de los bundles, planes de ejecución, desglose de coste. Lo que se pueda medir lo medimos en vez de describirlo, porque un número aguanta una discusión y un adjetivo no.',
      },
      {
        title: 'Lo que sí funciona',
        body: 'Escrito explícitamente. Una revisión que solo lista problemas no te deja saber qué decisiones conservar, y un equipo merece saber qué parte de su trabajo estaba bien.',
      },
      {
        title: 'Una sesión de devolución con tu equipo',
        body: 'Repasamos el documento con los ingenieros y no solo con quien lo encargó, y respondemos a las objeciones ahí mismo. Algún hallazgo cambia en esa llamada.',
      },
    ],
  },

  running: {
    title: 'Cómo van las dos semanas.',
    intro:
      'Dos semanas de calendario, no de esfuerzo repartido en un trimestre. Empieza un lunes acordado y el documento llega el segundo viernes.',
    steps: [
      {
        label: 'Días uno y dos',
        title: 'Accesos y contexto',
        body: 'Acceso de lectura al repositorio, la documentación que haya y una hora con dos o tres ingenieros. Lo que intentáis conseguir como negocio importa tanto como el código.',
      },
      {
        label: 'Días tres a seis',
        title: 'La lectura',
        body: 'El código, el modelo de datos, los permisos, la infraestructura, el camino a producción, las dependencias y la monitorización. Es el grueso del trabajo y no tiene ningún glamur.',
      },
      {
        label: 'Días siete y ocho',
        title: 'Las medidas',
        body: 'Tiempos de build, planes de ejecución, tamaño de los bundles, desglose de coste: todo lo que dé tiempo a convertir de opinión en número.',
      },
      {
        label: 'Días nueve y diez',
        title: 'Escribir y devolver',
        body: 'Se escribe el documento, se envía y se repasa con tu equipo. Es tuyo desde el momento en que se envía.',
      },
    ],
  },

  proof: {
    title: 'Por qué nuestra lectura vale dos semanas de tu presupuesto.',
    intro:
      'Porque es la misma lectura que hacemos sobre nuestro propio código antes de un cambio incompatible, y el nuestro lleva seis años en producción.',
    evidence: [
      {
        value: '6 años',
        label: 'FireCMS en producción, con commits cada semana desde 2020',
        source: 'github.com/firecmsco/firecms',
        href: 'https://github.com/firecmsco/firecms',
      },
      {
        value: '3,7k',
        label: 'commits públicos de uno de nosotros, solo en FireCMS',
        source: 'github.com/fgatti675',
        href: 'https://github.com/fgatti675',
      },
      {
        value: '23+',
        label: 'aseguradoras de salud alemanas y suizas cubren un producto que construimos desde 2019',
        source: 'medicalmotion.com',
        href: 'https://medicalmotion.com',
      },
    ],
    body: [
      'Cada criterio que aparece en uno de estos documentos viene de haber tenido que convivir con la decisión equivalente. Hemos sacado migraciones sobre miles de instalaciones vivas de FireCMS sin romperlas, y llevamos la tecnología de [medicalmotion](__MEDICALMOTION__) desde 2019: un producto donde las preguntas llegan de aseguradoras y revisores, no solo de usuarios.',
      'Por eso mismo la revisión no es una herramienta comercial. La pregunta que responde no es «¿se puede construir esto?», sino «¿quién va a mantener esto dentro de cuatro años y se va a acordar de nosotros?». Y muy a menudo la respuesta honesta es que el trabajo lo puede hacer tu propio equipo, que es justo para lo que está escrito el documento.',
    ],
  },

  faq: {
    title: 'Lo que nos preguntáis.',
    intro: 'Incluida la de si vamos a acabar vendiéndoos una reescritura.',
    items: [
      {
        q: '¿Qué necesitáis de nosotros?',
        a: 'Acceso de lectura al repositorio, una hora con dos o tres ingenieros que trabajen en él y acceso a la monitorización y a la facturación que tengáis. La documentación se agradece y casi nunca es determinante.',
      },
      {
        q: '¿Hay que contrataros después?',
        a: 'No, y el documento está escrito dando por hecho que no. Es un plan para tu equipo y en manos de tu equipo. Si además quieres que ejecutemos parte, eso es otro encargo con su propio alcance.',
      },
      {
        q: '¿Nos vais a decir que lo reescribamos todo?',
        a: 'Normalmente no. Una reescritura es la respuesta más cara que existe y acierta bastante menos de lo que se propone. Cuando toca, el documento dice lo que costaría y lo que se ganaría, para que la decisión se tome con números y no desde el hartazgo.',
      },
      {
        q: '¿Dos semanas de calendario o de esfuerzo?',
        a: 'De calendario. Empieza un lunes acordado y el documento llega el segundo viernes. El trabajo se concentra en la primera semana y media; los dos últimos días son escribir y devolver.',
      },
      {
        q: '¿Firmáis un acuerdo de confidencialidad?',
        a: 'Sí, antes de que nos deis acceso a nada. Mándanos el vuestro o pídenos uno.',
      },
      {
        q: '¿Y si no estamos de acuerdo con algo?',
        a: 'La sesión de devolución es justo para eso, y alguna conclusión cambia ahí: vuestros ingenieros saben cosas que el código no cuenta. Lo que no vamos a hacer es quitar un hallazgo porque resulte incómodo.',
      },
    ],
  },

  cta: {
    body: 'Cuéntanos qué estás a punto de decidir y qué te hace dudar. Con dos párrafos basta para decirte si una revisión es la compra correcta o si ya sabes la respuesta.',
  },

  related: {
    title: 'Las otras tres formas de empezar.',
    intro: 'Todos los encargos arrancan con un alcance cerrado y un plan de hitos.',
  },
};
