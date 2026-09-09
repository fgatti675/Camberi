import type { ServiceCopy } from '../services/service';

/* Castellano, escrito como español y no como traducción. Tuteo, y los
   nombres de producto y de stack se quedan en inglés. La estructura de
   claves es la misma que en `copy.en.ts` porque el tipo y la maquetación
   dependen de ello. */

export const productEs: ServiceCopy = {
  title: 'De cero a un producto en producción, también del tipo regulado.',
  intro:
    'Diseño, frontend, backend e infraestructura en un solo equipo, para que nada se caiga entre proveedores. Datos médicos incluidos: llevamos en la sanidad alemana desde 2019.',
  meta: 'Normalmente 3–6 meses · alcance cerrado y plan de hitos la primera semana',

  lead: [
    'Este es el encargo en el que lo hacemos todo. No un diseño que después implementa otro, ni un backend enganchado a un frontend que escribió otra agencia: un equipo responsable de las pantallas, del modelo de datos, de la infraestructura y del despliegue, desde la primera sesión de trabajo hasta la primera versión en producción y más allá.',
    'Vale igual para la reescritura que para empezar de cero. El patrón es el mismo: acertar pronto con el modelo de datos, poner algo que se pueda clicar delante de usuarios reales en pocas semanas y subir a una URL de staging cada semana, para que en el cuarto mes nadie se lleve una sorpresa con el estado del trabajo.',
    'Y vale para lo regulado. El producto que llevamos más tiempo construyendo lo recetan médicos y lo cubren [más de 23 aseguradoras de salud alemanas y suizas](https://medicalmotion.com), así que las preguntas llegan tanto de aseguradoras y revisores como de usuarios, y una decisión de arquitectura equivocada no es un sprint que puedas repetir.',
  ],

  fit: {
    title: 'Para quién es esto.',
    intro:
      'Un encargo largo es la forma equivocada para muchos proyectos buenos. Estos son aquellos en los que sí encaja.',
    forTitle: 'Encaja bien',
    for: [
      'Fundadores o un equipo de producto con algo ya validado y sin equipo técnico para construirlo en condiciones.',
      'Una v1 que hizo un freelance o una agencia y que ahora cuesta tres veces más cambiarla de lo que costó escribirla.',
      'Un producto regulado —salud, seguros, finanzas— donde el modelo de datos, los permisos y la traza de auditoría pesan tanto como la interfaz.',
      'Quieres un único equipo responsable de diseño, frontend, backend e infraestructura, en vez de tres proveedores señalándose entre ellos.',
      'Alguien de tu lado puede decidir sobre producto en un día. Eso marca el ritmo más que cualquier decisión técnica.',
    ],
    notTitle: 'No encaja',
    not: [
      'Poner cuerpos en tus sprints a las órdenes de tu propio responsable técnico. Nosotros cogemos un alcance y respondemos por el resultado; eso es otra cosa y hay quien la hace bien.',
      'Un pliego ya escrito, ya aprobado y adjudicado a quien ofrezca el precio más bajo. Vamos a discutir partes del pliego, que es donde está casi todo el valor y nada de lo que has pedido.',
      'Una app móvil nativa como producto entero. Traemos a especialistas de móvil con los que llevamos años trabajando, por su nombre, cuando el proyecto lo pide, pero aquí ese es un papel de apoyo.',
      'Una demo para una fecha, que no tiene que sobrevivir a la presentación. Construirlo para poder mantenerlo es la parte cara, y la estarías pagando dos veces.',
      'Necesitas un producto sanitario certificado para una fecha concreta. Construimos de forma que la certificación sea posible y llevamos años trabajando en ese mundo, pero el proceso de certificación lo llevas tú y no vamos a decir lo contrario.',
    ],
  },

  problems: {
    title: 'Cómo suele venir esto cuando llegas aquí.',
    intro: 'Seis situaciones, y hemos estado en todas. También con productos nuestros.',
    items: [
      {
        title: 'El producto con tres proveedores dentro',
        body: 'El frontend lo lleva uno, el backend otro y la infraestructura un tercero. Cada error es de otro, cada integración es una reunión, y quien paga todo eso es quien acaba coordinando.',
      },
      {
        title: 'El producto con datos médicos que tiene que aguantar el examen',
        body: 'Dónde están los datos, quién puede leerlos, qué queda registrado y qué pasa cuando un paciente los reclama. Esas preguntas llegan de aseguradoras, comités de ética y auditores, y salen mucho más baratas resueltas en el esquema que parcheadas después.',
      },
      {
        title: 'La reescritura que vas aplazando',
        body: 'La versión actual funciona y cada función nueva cuesta el triple de lo que debería. Nadie ha puesto por escrito lo que costaría rehacerlo, así que la discusión vuelve cada trimestre y no se mueve nada.',
      },
      {
        title: 'El prototipo que se convirtió en producción sin que nadie lo decidiera',
        body: 'Sin migraciones, sin staging, sin tests y con una sola persona que sabe desplegar. Es buena señal —significa que alguien quería el producto— y es un trabajo concreto de arreglar.',
      },
      {
        title: 'El diseño que nadie podía construir',
        body: 'Unas pantallas preciosas hechas sin un ingeniero delante, y ahora cada una implica una consulta que el modelo de datos no sabe responder. Tener diseño e ingeniería en el mismo equipo no es un detalle: es lo que evita esto.',
      },
      {
        title: 'El lanzamiento que va bien hasta el segundo país',
        body: 'Un segundo idioma, una segunda moneda, un segundo regulador, un segundo inquilino. Los cuatro son baratos si se prevén al principio y caros de meter después, y cuál vas a necesitar de verdad es una decisión, no una apuesta.',
      },
    ],
  },

  deliverables: {
    title: 'Qué te llevas.',
    intro: 'La misma entrega con la que acaban todos nuestros encargos, a escala de producto entero.',
    items: [
      {
        title: 'Un alcance por escrito',
        body: 'Sale de una sesión de trabajo la primera semana, no de un cuestionario: qué se construye, en qué orden y qué queda fuera. Con su plan de hitos y su precio, y el precio no se mueve.',
      },
      {
        title: 'Algo que se pueda clicar, pronto',
        body: 'En tu navegador en pocas semanas. Preferimos descubrir que una idea no funciona en la semana dos y no en el cuarto mes. Tú también.',
      },
      {
        title: 'Una URL de staging desde el primer día',
        body: 'No una captura en una presentación. Cualquiera de tu equipo puede abrir el estado actual del producto cuando quiera, sin pedírnoslo.',
      },
      {
        title: 'Una demo todos los viernes',
        body: 'Media hora del producto funcionando de verdad. Es también donde se acuerdan los cambios de alcance, en voz alta, en lugar de irse acumulando en silencio.',
      },
      {
        title: 'Un modelo de datos que se puede leer',
        body: 'Escrito y explicado, con las migraciones que llevan hasta él. En un producto regulado, este es el documento que responde después a casi todas las preguntas difíciles.',
      },
      {
        title: 'Las decisiones, anotadas',
        body: 'Las pocas que salen caras de deshacer —la base de datos, el modelo de autenticación, la región de alojamiento, la multitenencia— con lo que elegimos y lo que descartamos. Quien venga después hereda el razonamiento, no solo el resultado.',
      },
      {
        title: 'Una versión en producción, no una entrega',
        body: 'Usuarios reales sobre infraestructura real, con monitorización, copias de seguridad y un despliegue que sabe lanzar cualquiera del equipo. Terminar significa que está vivo, no que está en un repositorio.',
      },
      {
        title: 'El repositorio, la infraestructura y las cuentas',
        body: 'A tu nombre y documentados. Entregamos limpio, o nos quedamos como el equipo que lo mantiene. Las dos cosas son normales y ninguna es una sorpresa al final.',
      },
    ],
  },

  running: {
    title: 'Cómo se trabaja.',
    intro:
      'La forma, no un diagrama de Gantt. Un proyecto de tres meses y uno de seis tienen los mismos cuatro movimientos; solo se alarga el del medio.',
    steps: [
      {
        label: 'Semana uno',
        title: 'Alcance y plan',
        body: 'Una sesión de trabajo con quien conoce el producto y con quien lo va a usar. Sales con un alcance por escrito, un plan de hitos y un precio que no se mueve.',
      },
      {
        label: 'Semanas dos a cuatro',
        title: 'Modelo de datos y prototipo',
        body: 'Primero el esquema, porque es la decisión que hereda todo lo demás. Después, algo que se pueda clicar encima, en tu navegador, en la URL de staging.',
      },
      {
        label: 'El tramo largo',
        title: 'Entregar cada semana',
        body: 'Hito a hito, con demo cada viernes. En un producto regulado, los permisos y la traza de auditoría se construyen aquí, no se añaden al final.',
      },
      {
        label: 'Últimas semanas',
        title: 'Producción y entrega',
        body: 'Lanzamiento, monitorización, copias, runbook y una sesión con quien lo hereda. O nos quedamos como el equipo que lo mantiene.',
      },
    ],
  },

  proof: {
    title: 'El producto que llevamos más tiempo construyendo.',
    intro:
      'medicalmotion es la respuesta a «¿habéis hecho esto en un entorno regulado?», y todas las cifras están en su propia web.',
    evidence: [
      {
        value: '23+',
        label: 'aseguradoras de salud alemanas y suizas cubren un producto que construimos desde su primera versión web',
        source: 'medicalmotion.com',
        href: 'https://medicalmotion.com',
      },
      {
        value: '5+',
        label: 'estudios de eficacia publicados que lo respaldan',
        source: 'medicalmotion.com',
        href: 'https://medicalmotion.com',
      },
      {
        value: '6 años',
        label: 'FireCMS en producción, con commits cada semana desde 2020',
        source: 'github.com/firecmsco/firecms',
        href: 'https://github.com/firecmsco/firecms',
      },
    ],
    body: [
      'Hemos construido la tecnología de [medicalmotion](__MEDICALMOTION__) desde su primera versión web en 2019: la app del paciente, las herramientas del fisioterapeuta, el motor de personalización y la plataforma de datos que hay detrás de su Pain Lab. Los médicos lo recetan, las aseguradoras lo cubren y los investigadores publican sobre él, que son tres formas distintas de examinar el mismo modelo de datos.',
      'La segunda razón para contratar a un estudio y no a un equipo de entrega es que seguimos manteniendo nuestros propios productos. [FireCMS](https://firecms.co) está en producción desde 2020, y cada cambio incompatible, cada migración sobre miles de instalaciones vivas y cada issue respondido en público nos ha tocado a nosotros. De ahí sale el criterio sobre qué decisiones salen caras más adelante.',
      'Si lo que tienes en la cabeza se parece más a una plataforma de datos que a una aplicación, el [encargo de plataforma de datos](__DATA_PLATFORM__) es el camino más corto.',
    ],
  },

  faq: {
    title: 'Lo que nos preguntáis.',
    intro: 'Incluidas las dos que a nadie le gusta preguntar en voz alta.',
    items: [
      {
        q: '¿Podéis coger un código que ha escrito otro?',
        a: 'Sí, y pasa a menudo. Empezamos por la [revisión de arquitectura](__REVIEW__) en vez de por un presupuesto: dos semanas leyéndolo en serio y después un plan por escrito. Presupuestar un relevo sin haber leído el código da un número equivocado en un sentido o en el otro.',
      },
      {
        q: '¿Hacéis también el diseño?',
        a: 'Diseño de producto sí —pantallas, flujos, interfaz— y en el mismo equipo que la ingeniería, que es lo que evita un diseño que pide consultas que el modelo de datos no sabe responder. Para marca, ilustración o motion traemos a gente con la que llevamos años trabajando, por su nombre.',
      },
      {
        q: '¿Y el RGPD y los datos de salud?',
        a: 'Condicionan la arquitectura, así que es una conversación de la primera semana. Dónde viven los datos, quién puede leerlos, qué se registra y cómo se recuperan son decisiones de esquema antes que documentos de política. Llevamos respondiendo a eso desde 2019 en un producto que cubren aseguradoras alemanas y suizas. Lo que no hacemos es atribuirle a tu producto una certificación de producto sanitario: ese proceso lo llevas tú, y nosotros construimos para que siga siendo posible.',
      },
      {
        q: '¿Y si el alcance cambia a mitad de camino?',
        a: 'Suele cambiar, y la demo del viernes es donde se acuerda. Lo que cabe dentro del plan lo absorbemos; lo que no, se convierte en un hito nuevo con su propio alcance, acordado antes de que nadie lo empiece. Lo que no pasa es que se reasigne en silencio y te enteres al final.',
      },
      {
        q: '¿Quién escribe el código de verdad?',
        a: 'La gente de la página de equipo. Para diseño, ML o móvil traemos a especialistas con los que llevamos años trabajando, con nombre y apellidos, en los proyectos que lo piden.',
      },
      {
        q: '¿Qué pasa después del lanzamiento?',
        a: 'Lo eliges tú, y se cierra antes del último hito, no durante. O una entrega limpia —repositorio, infraestructura, cuentas, runbook y una sesión con quien lo hereda— o nos quedamos como el equipo que lo mantiene vivo. Las dos son normales.',
      },
    ],
  },

  cta: {
    body: 'Con dos párrafos sobre el producto y sobre dónde está atascado vale. Si la respuesta honesta es que lo que necesitas son tres meses de tu propio equipo, te lo diremos.',
  },

  related: {
    title: 'Las otras tres formas de empezar.',
    intro: 'Todos los encargos arrancan con un alcance cerrado y un plan de hitos.',
  },
};
