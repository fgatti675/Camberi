import type { ServiceCopy } from '../services/service';

/* Castellano, escrito como español. Tuteo; Postgres, row-level security,
   backend, staging y los nombres de producto se quedan en inglés porque es
   como se dice aquí. Misma estructura de claves que `copy.en.ts`. */

export const dataPlatformEs: ServiceCopy = {
  title: 'Un Postgres que es tuyo, y una salida limpia del backend que se te ha quedado pequeño.',
  intro:
    'Diseño de esquemas, migraciones dolorosas, row-level security y el panel de administración que tu equipo sí usa. Y la implantación de FireCMS y Rebase, hecha por quienes escribieron los frameworks.',
  meta: 'Normalmente 1–8 semanas · alcance cerrado y plan de hitos la primera semana',

  lead: [
    'Un backend gestionado es la decisión correcta al principio y una limitación más tarde. La factura crece con las lecturas y no con el valor, la consulta que ahora necesitas no se puede expresar y las reglas de acceso se han convertido en un fichero que entiende una persona y que nadie quiere tocar. Nada de eso es para alarmarse, y todo eso es motivo para planificar la salida en vez de descubrirla en mitad de una incidencia.',
    'Este encargo es la capa de datos: el esquema, las migraciones, los permisos y las herramientas de encima. A veces son dos semanas sobre un Postgres que ya tienes. A veces es salir entero de Firebase o de otro backend gestionado, ensayado sobre una copia de producción antes de tocar nada de verdad.',
    'Es también el encargo en el que nuestras propias herramientas son el camino más corto. [Rebase](https://rebase.pro) convierte un Postgres que ya es tuyo en un backend con cada regla de acceso aplicada por la propia base de datos, y [FireCMS](https://firecms.co) es el panel con el que miles de equipos llevan su back office. Escribimos los dos, lo que sobre todo significa que sabemos dónde están sus límites.',
  ],

  fit: {
    title: 'Para quién es esto.',
    intro:
      'El encargo más corto del sitio y el que peor se dimensiona, en los dos sentidos.',
    forTitle: 'Encaja bien',
    for: [
      'Tus datos están en Firebase, Supabase u otro backend gestionado y has chocado con un muro: una consulta que no puedes escribir, una factura que crece con las lecturas o unas reglas de seguridad que ya no hay quien razone.',
      'Ya tienes Postgres y el esquema ha ido creciendo por acumulación: tres tablas que significan «usuario», columnas que nadie se atreve a borrar y una migración que da miedo lanzar.',
      'Necesitas un control de acceso que sobreviva a un error en el código, que en la práctica significa row-level security y no una comprobación en cada endpoint.',
      'Usas FireCMS o Rebase, o te los estás planteando, y quieres montarlos contra un esquema real y no contra uno de demo.',
      'Tu equipo de operaciones abre la base de datos a pelo, o espera a un ingeniero, porque no hay un panel que puedan usar.',
    ],
    notTitle: 'No encaja',
    not: [
      'Una consulta lenta. Eso es un ticket de soporte, no un encargo, y te lo va a resolver antes y mejor quien conozca el código.',
      'Pasarse a Postgres porque es la respuesta de moda, cuando el backend gestionado funciona bien y el problema está en otro sitio. Una migración cuesta semanas de verdad.',
      'Un data warehouse, modelos de dbt y una práctica de BI. Nosotros hacemos la base de datos operacional y lo que va encima; el stack analítico es otra especialidad y seríamos la segunda mejor llamada.',
      'Una migración con fecha ya anunciada a clientes y sin ventana para ensayar. El cambio es la parte barata; demostrar que los datos han llegado enteros no lo es.',
      'Quieres el esquema rediseñado pero sin tocar la aplicación. Más o menos la mitad de una migración es el código que habla con el backend antiguo, y fingir lo contrario da un plan que se queda a la mitad.',
    ],
  },

  problems: {
    title: 'Cómo suele venir esto cuando llegas aquí.',
    intro: 'Seis formas. Casi todos los encargos son dos o tres a la vez.',
    items: [
      {
        title: 'El backend gestionado que se te ha quedado pequeño',
        body: 'La factura crece con las lecturas y no con el valor, el agregado que necesitas son tres viajes de ida y vuelta, y las reglas de seguridad son un fichero que ha ganado una cláusula por función. El producto está bien. El suelo ha dejado de encajar.',
      },
      {
        title: 'El esquema que ha crecido por acumulación',
        body: 'Columnas nullable que nadie puede quitar, tres tablas que significan «usuario» y claves ajenas que existen en la cabeza de la aplicación y no en la base de datos. Cada función nueva paga intereses.',
      },
      {
        title: 'Los permisos aplicados en el código',
        body: 'Cada endpoint nuevo es otra oportunidad de devolver la fila de otro. Row-level security mete la regla en la base de datos, donde se aplica a todos los clientes, incluido el script que alguien lanza a mano a fin de mes.',
      },
      {
        title: 'La migración sin ventana de parada',
        body: 'Un fin de semana caído no es una opción y nadie ha ensayado el cambio. La forma que funciona es escritura doble, backfill, verificación y salto, con una vuelta atrás que se ha probado al menos una vez sobre una copia.',
      },
      {
        title: 'El panel que nadie puede usar',
        body: 'Operaciones abre la base de datos de producción —que es como se borra una fila un viernes a las seis— o abre un ticket y espera. Un panel generado con roles de verdad son días de trabajo, no meses.',
      },
      {
        title: 'La multitenencia decidida sin querer',
        body: 'Una base por cliente, o una columna de tenant sostenida por costumbre, elegida pronto por quien escribió la primera migración. Es la decisión que más veces sale cara, y merece una tarde de discusión ahora.',
      },
    ],
  },

  deliverables: {
    title: 'Qué te llevas.',
    intro: 'Documentos, porque este es el encargo cuyo resultado más necesita sobrevivirnos.',
    items: [
      {
        title: 'Un alcance por escrito',
        body: 'La primera semana, después de leer lo que hay de verdad y no lo que dice la documentación: qué se mueve, en qué orden y qué se queda donde está.',
      },
      {
        title: 'El esquema objetivo, escrito',
        body: 'Tablas, claves, índices y el porqué, más las migraciones que llevan del de hoy a ese. Legible por tus propios ingenieros, que son quienes lo van a ampliar.',
      },
      {
        title: 'Un juego de políticas de row-level security',
        body: 'Las reglas en la base de datos y los tests que demuestran que un usuario de un tenant no puede leer las filas de otro. Una política sin un test que demuestre que deniega algo es un comentario.',
      },
      {
        title: 'Un plan de cambio ensayado',
        body: 'Escritura doble, backfill, consultas de verificación, el salto y la vuelta atrás, ejecutado entero sobre una copia de producción antes de tocar producción.',
      },
      {
        title: 'El panel, configurado',
        body: 'FireCMS o Rebase contra tu esquema real y con los roles que tu equipo tiene de verdad, para que operaciones deje de abrir la base de datos.',
      },
      {
        title: 'Una URL de staging desde el primer día y demo los viernes',
        body: 'Como en todos los encargos. En una migración la demo suele ser una consulta de verificación, que es exactamente lo que conviene mirar juntos.',
      },
      {
        title: 'Copias de seguridad que has restaurado',
        body: 'Una copia que nadie ha restaurado es una esperanza. Parte de la entrega es ver una restauración funcionando, una vez, sobre tu infraestructura.',
      },
      {
        title: 'El repositorio, la infraestructura y las cuentas',
        body: 'A tu nombre, documentados y con un runbook para lo operativo. Rebase es open source y self-hosted, así que no te quedas atado a ningún proveedor.',
      },
    ],
  },

  running: {
    title: 'Cómo se trabaja.',
    intro:
      'Una revisión de esquema de una semana y una migración de ocho son los mismos cuatro movimientos a distinta longitud.',
    steps: [
      {
        label: 'Semana uno',
        title: 'Leer lo que hay',
        body: 'El esquema tal como está, los permisos tal como están, las consultas que se ejecutan de verdad y la factura. Lo tienes por escrito antes de que nadie proponga nada.',
      },
      {
        label: 'Después',
        title: 'Destino y camino',
        body: 'El esquema que quieres, las migraciones que llevan hasta él y el plan de cambio, ensayado sobre una copia de producción en vez de discutido en un documento.',
      },
      {
        label: 'El salto',
        title: 'Escritura doble, backfill, verificación',
        body: 'El sistema nuevo funciona en paralelo al viejo y se comparan los dos con datos reales. No se apaga nada hasta que las consultas de verificación coinciden.',
      },
      {
        label: 'Final',
        title: 'Herramientas y entrega',
        body: 'El panel contra el esquema real, una restauración que has visto funcionar, el runbook y una sesión con quien lo va a llevar.',
      },
    ],
  },

  proof: {
    title: 'Los frameworks los escribimos nosotros.',
    intro:
      'Dos de las herramientas de este encargo son nuestras, en abierto, con su historial de commits y sus descargas para comprobarlo.',
    evidence: [
      {
        value: '1,3k',
        label: 'estrellas en FireCMS, el panel que mantenemos desde 2020',
        source: 'github.com/firecmsco/firecms',
        href: 'https://github.com/firecmsco/firecms',
      },
      {
        value: '9k',
        label: 'instalaciones al mes de FireCMS desde npm',
        source: 'npmjs.com/package/@firecms/core',
        href: 'https://www.npmjs.com/package/@firecms/core',
      },
      {
        value: 'RLS',
        label: 'Rebase aplica cada regla de acceso en Postgres y no en un middleware del que te tengas que fiar',
        source: 'rebase.pro',
        href: 'https://rebase.pro',
      },
    ],
    body: [
      '[Rebase](https://rebase.pro) es nuestro backend sobre Postgres: lo apuntas a una base de datos que ya es tuya y te da REST, autenticación, almacenamiento, tiempo real y un panel generado, con cada regla de acceso aplicada por row-level security en lugar de por middleware. Open source, self-hosted y pensado para equipos que prefieren no dejar los datos de producción en la instancia gestionada de otro.',
      '[SustenTalent](__SUSTENTALENT__) es ese stack en producción: un sitio en Astro con islas de React, un backend Rebase en Cloud Run, Cloud SQL Postgres debajo y control de acceso aplicado por la base de datos y no por el código. Web pública, backend y panel salen de un único repositorio.',
      'Si lo que describes es en realidad un producto entero y no su capa de datos, la forma correcta es el [encargo de producto](__PRODUCT__). Y si todavía no tienes claro que el cambio compense, la [revisión de arquitectura](__REVIEW__) lo responde en dos semanas y por escrito.',
    ],
  },

  faq: {
    title: 'Lo que nos preguntáis.',
    intro: 'Casi todo sobre migraciones, y casi siempre las mismas cinco.',
    items: [
      {
        q: '¿Hay que usar Rebase o FireCMS?',
        a: 'No. Son las herramientas que escribimos, así que conocemos sus límites mejor que nadie, pero muchas veces la respuesta correcta es Postgres a secas con el panel que ya tienes, y te lo diremos. En cualquier caso son open source: nada de esto depende de que nos compres nada.',
      },
      {
        q: '¿Podéis sacarnos de Firebase sin parar el servicio?',
        a: 'Normalmente sí. La forma es escritura doble, backfill, verificación y salto, con una vuelta atrás ensayada antes sobre una copia. Cuánto tarda depende mucho menos de los datos que de cuánta lógica de negocio acabó dentro de las reglas de seguridad y de las cloud functions, que es lo primero que leemos.',
      },
      {
        q: '¿Nuestros datos tienen que salir de donde están?',
        a: 'Solo si quieres. Esto corre sobre tu infraestructura y tus cuentas, y Rebase es self-hosted, así que la base de datos se queda en la región y con el proveedor que elijas. Dónde tiene que estar esa región suele ser una pregunta legal, y conviene cerrarla la primera semana.',
      },
      {
        q: '¿Y el código de la aplicación que habla con el backend antiguo?',
        a: 'Entra en el alcance, y normalmente es la mitad más grande. Un plan de migración que solo cubre los datos es la forma más habitual de que estos proyectos acaben costando el doble.',
      },
      {
        q: '¿Por qué row-level security y no comprobaciones en la API?',
        a: 'Porque así la regla se aplica a todos los clientes, incluidos los que se escriban después y el script que alguien lanza a mano a fin de mes. Las comprobaciones en el código son correctas hasta el día en que alguien añade un endpoint y se olvida de una. Y ese día llega.',
      },
      {
        q: '¿Podéis revisar el esquema y ya está?',
        a: 'Sí, y para muchos equipos es la compra correcta: la [revisión de arquitectura](__REVIEW__) dura dos semanas y termina en un plan por escrito que tus propios ingenieros pueden ejecutar sin nosotros.',
      },
    ],
  },

  cta: {
    body: 'Cuéntanos qué base de datos es, qué está haciendo que no debería y qué te da miedo que se rompa. Con dos párrafos basta para decirte si esto son dos semanas o dos meses.',
  },

  related: {
    title: 'Las otras tres formas de empezar.',
    intro: 'Todos los encargos arrancan con un alcance cerrado y un plan de hitos.',
  },
};
