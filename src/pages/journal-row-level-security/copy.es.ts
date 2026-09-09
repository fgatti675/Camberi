import type { PostCopy } from '../journal/post';

/* Versión en español. Escrita como español, con el mismo argumento y las
   mismas secciones que copy.en.ts. Nombres de funciones, roles, opciones y
   paquetes en inglés, que es como se llaman en el código.

   El bloque REVIEW y la lista de fuentes están en copy.en.ts; aquí no hay
   ningún dato que no esté allí. */

export const rowLevelSecurityEs: PostCopy = {
  title: 'Dónde ponemos las reglas de acceso, y por qué en Postgres',
  standfirst:
    'En Rebase, el mismo fichero de colección que genera el esquema y la API genera las políticas de row-level security. Esto es lo que sale de esa decisión, por dentro.',
  dateLabel: '9 de septiembre de 2026',

  sections: [
    {
      body: [
        'Todos los fallos de autorización que hemos publicado tenían la misma forma: no un salto de la protección, sino una línea que faltaba. Un endpoint añadido con prisa que consultaba la tabla directamente. Un join que atravesaba una tabla protegida hasta otra que no lo estaba. El código no estaba mal, es que no estaba, y lo que no está no aparece en ninguna traza.',
        'Ese argumento está desarrollado en [el blog de Rebase](https://rebase.pro/blog/2026-08-23-security-that-does-not-depend-on-remembering/), así que aquí va la otra mitad: en qué se convierte la decisión, qué módulo la aplica y los dos sitios donde a propósito no la pusimos.',
      ],
    },
    {
      heading: 'En qué se convierte una regla',
      body: [
        'Una colección es un fichero TypeScript. Junto a sus campos declara securityRules, y el par más corto que sirve de algo son dos líneas: una operación "select" con access "public", y las operaciones insert, update y delete con un ownerField que apunta a "authorId". La segunda se convierte en USING (author_id = rebase.uid()), se cuelga de la tabla como política de Postgres y la aplica la misma migración que crea la columna.',
        'Al que llama lo llevan hasta SQL tres funciones — rebase.uid(), rebase.roles() y rebase.jwt() — que el backend fija en cada transacción. Por encima de los atajos hay un constructor de expresiones: policy.existsIn convierte una comprobación de pertenencia en una única subconsulta EXISTS correlacionada, en vez de una consulta por fila, y policy.raw es la puerta de atrás. Todo está en [la página de reglas de seguridad](https://rebase.pro/docs/collections/security-rules/).',
        'Un detalle de esa página conviene repetirlo, porque es la premisa sobre la que se apoya el resto: ownerField compara una columna con el id de quien llama, pero no rellena esa columna. Hay que declararla con autoValue "user_on_create", y entonces el driver estampa el usuario al insertar y machaca lo que viniera en el cuerpo de la petición. Una columna que rellena quien llama es una columna sobre la que quien llama puede mentir.',
      ],
    },
    {
      heading: 'Por qué en la base de datos y no en un middleware',
      body: [
        'Una petición autenticada corre como rebase_user: un rol que no es dueño de las tablas, no es superusuario y no tiene BYPASSRLS. En cada transacción, el módulo de enforcement fija las variables de sesión que leen las políticas y lanza SET LOCAL ROLE rebase_user; como es a nivel de transacción, aguanta un pooler de conexiones delante. Las migraciones, los flujos de autenticación y el SQL en crudo van por la conexión del dueño, que es el plano de confianza y lo único que se salta una política.',
        'La consecuencia es todo el asunto. Un handler que se olvida de comprobar no recibe todas las filas: recibe las que ese usuario puede ver, porque el filtrado no está en el camino que un programador se puede saltar. La documentación de ese módulo lo dice sin rodeos: las securityRules de la colección son el modelo de autorización entero, y los callbacks de la capa de aplicación son validación y efectos secundarios, no una frontera de seguridad. Dejarlo escrito importa más de lo que parece, porque la alternativa es un código donde dos capas dan por hecho a medias que la otra está protegiendo algo.',
      ],
    },
    {
      heading: 'Las tablas que se niega a servir',
      body: [
        'A Rebase también se le puede apuntar a una base de datos que no ha creado él, para que la inspeccione. Ahí hay que elegir un valor por defecto, y la opción se llama unprotectedTables. Por defecto las excluye: una tabla que aparece con el row-level security desactivado no se sirve, y de cada exclusión queda un registro con el SQL que la protegería.',
        'El razonamiento está escrito al lado del código que lee el catálogo. Toda petición autenticada corre como rebase_user, y ese rol tiene permisos DML sobre el esquema, así que servir una tabla sin políticas es entregarle todas las filas a cualquiera que haya iniciado sesión. Excluirla no es prudencia: es la única lectura honesta de lo que esa tabla dice de sí misma. Una tabla nueva empieza sin acceso para nadie, y de ahí se mueve a mano.',
      ],
    },
    {
      heading: 'Las tablas puente, de las que nadie se acuerda',
      body: [
        'Una relación de muchos a muchos implica una tabla que no ha declarado nadie. Y además es una lista de aristas, o sea, la matriz de permisos o el grafo de pertenencias en una sola relación; suele ser lo único desprotegido que hay entre dos endpoints protegidos con mucho cuidado.',
        'Por eso las tablas puente se derivan del mismo plan del que salen las políticas. El comentario encima de esa función explica el motivo: una tabla creada ahí siempre lleva políticas previstas, porque una tabla puente sin row-level security la puede leer y escribir cualquiera que haya iniciado sesión. Derivar las dos cosas de un mismo plan es lo que hace imposible crear la tabla y olvidarse de la política, en vez de simplemente improbable.',
      ],
    },
    {
      heading: 'Dos nombres para una misma cosa es por donde se escapa',
      body: [
        'La [0.13.0](https://github.com/rebasepro/rebase/releases/tag/v0.13.0) eliminó rebase.data y dejó rebase.dataAsAdmin. Eran el mismo accesor. El problema era el nombre: en un cliente de navegador, data es como se llama al accesor con el alcance del usuario, así que la misma expresión significaba "lo que esta persona pueda leer" en el front y "todo, sin políticas" en el servidor, y en el sitio de la llamada las dos se leían igual de bien. El tipo del cliente de servidor ahora omite esa propiedad, así que la forma antigua es un error de compilación en vez de un privilegio silencioso, y como la propiedad sigue existiendo en tiempo de ejecución, el JavaScript sin tipos no se rompe.',
        'La [0.10.0](https://github.com/rebasepro/rebase/releases/tag/v0.10.0), tres semanas antes, era el mismo tipo de problema en la otra dirección. La persona autenticada se llamaba uid en el modelo de dominio y en las políticas, y userId en el claim del JWT y en el contexto de la petición, así que un handler y un hook separados por dos frames veían a la misma persona con claves distintas, y en tres sitios sin relación entre sí había aparecido por su cuenta el mismo fallback defensivo. Ninguna de las dos era una vulnerabilidad. Las dos eran las condiciones para tener una.',
      ],
    },
    {
      heading: 'Lo que este modelo no cubre',
      body: [
        'El row-level security acota filas, no columnas. Una política que deja a alguien leer las filas de su equipo le deja leer todos los campos de esas filas, el sueldo incluido. De eso se encargan las reglas de acceso por propiedad, que aplica el servidor y no Postgres, así que cubren la API pero no el SQL en crudo. Las dos capas se suman y no pueden contradecirse — una regla de campo no puede ampliar el acceso a la fila, y de una fila que no puedes leer no hay campos de los que discutir — pero se aplican en sitios distintos, y disimularlo sería justo lo que este diseño intenta evitar.',
        'Y hay reglas que no son un predicado. Todo lo que tenga que llamar a un servicio externo, o razonar sobre algo que la base de datos no guarda, se queda en el código de la aplicación. Lo que cambia el modelo es el valor por defecto: el acotado por filas, que cubre la mayor parte de la superficie, queda donde no se puede saltar, así que lo que se escribe a mano es lo verdaderamente raro y no todo.',
        'También cuesta algo. Una política es un predicado en cada consulta, y una mal escrita es un escaneo secuencial que nadie ha pedido. Que las políticas se generen ayuda sobre todo porque salen consistentes y se pueden revisar: son SQL, viven en tus migraciones y tienen la misma forma en todas partes.',
      ],
    },
    {
      heading: 'Comprobar una base de datos que ya tienes',
      body: [
        'Nada de esto hay que creérselo, y tampoco hace falta usar Rebase. En agosto de 2026 publicamos [rls-check](https://rebase.pro/docs/rls-check/): pasa quince comprobaciones sobre cualquier Postgres — Supabase, Neon, RDS, Cloud SQL o un contenedor en tu portátil — con consultas de solo lectura al catálogo, y no envía nada a ningún sitio.',
        'Busca los fallos por los que de verdad se escapa la información, no los que son cómodos de comprobar: una tabla con permisos para un rol anónimo y el row-level security apagado; una política permisiva que se cumple para todas las filas; una política con la forma de "hay alguien con sesión iniciada", que separa a los que han entrado de los que no y no acota nada más; una vista que lee por debajo de las políticas de sus tablas; una tabla puente sin proteger entre dos endpoints protegidos; una rutina SECURITY DEFINER con el search path suelto; un permiso concedido a PUBLIC.',
        'Es la misma lista que este diseño intenta dejar fuera de alcance, y por eso merece la pena pasarla por algo que no hayamos construido nosotros.',
      ],
    },
  ],
};
