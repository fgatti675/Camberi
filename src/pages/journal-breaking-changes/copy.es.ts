import type { PostCopy } from '../journal/post';

/* Versión en español. Escrita como español: mismo argumento y mismas
   secciones que copy.en.ts, pero cada frase pensada en castellano. Los
   nombres de paquetes, ficheros, funciones y versiones se quedan en inglés,
   que es como se llaman. Las fechas van en formato español.

   El bloque REVIEW y la lista de fuentes están en copy.en.ts; esta versión no
   añade ni un dato que no esté allí. */

export const breakingChangesEs: PostCopy = {
  title: 'Cambios que rompen, en instalaciones que no vemos',
  standfirst:
    'FireCMS lleva en npm desde 2020. Casi todo lo que nos han enseñado estos seis años se reduce a un problema: cada cambio llega a instalaciones que no podemos probar, ni mirar, ni obligar a actualizar.',
  dateLabel: '9 de septiembre de 2026',

  sections: [
    {
      body: [
        'De mantener un framework de código abierto, lo que se ve son las funcionalidades. Lo que cuesta tiempo es no saber quién lo está usando. Tenemos descargas e issues; no tenemos delante el código que un cambio está a punto de romper, y del registro de npm no se retira nada una vez publicado.',
        'La línea 3.0 se pasó veintidós meses en beta — la [3.0.0-beta.1](https://github.com/firecmsco/firecms/releases/tag/v3.0.0-beta.1) salió el 1 de febrero de 2024 y la [3.0.0](https://github.com/firecmsco/firecms/releases/tag/v3.0.0) el 1 de diciembre de 2025 — y ese tiempo se fue justo en esto. Lo que viene es cómo lo llevamos ahora, sacado de releases de este año y no de una teoría.',
      ],
    },
    {
      heading: 'Añadir, dejarlo opcional y demostrarlo con un test',
      body: [
        'La [3.4.0](https://github.com/firecmsco/firecms/releases/tag/v3.4.0) tuvo que hacer llegar un dato nuevo, pathSegments, hasta el datasource, el constructor de permisos, la superficie de plugins y todos los callbacks de entidad. El motivo era un fallo de verdad: el id de una entidad puede llevar una barra, una ruta aplanada en una sola cadena no sabe representar eso, y la ruta que se construía a partir de ella apuntaba a otra entidad, o directamente reventaba al guardar.',
        'Todo ese cambio es aditivo. Cada parámetro nuevo es opcional y va al final, cada miembro nuevo de una interfaz es opcional, y hay una batería de tests que comprueba que, si no se pasan, cada función devuelve exactamente lo que devolvía antes — incluido que getCollection sigue lanzando el mismo error con una ruta mal formada cuando no recibe segmentos, así que un proyecto que dependa de ese error lo sigue teniendo. Cuatro de las cinco secciones de esa [entrada del changelog](https://github.com/firecmsco/firecms/blob/master/CHANGELOG.md) terminan con la misma frase: no hay que tocar nada al actualizar.',
        'Lo que sostiene todo eso es el test. Que un cambio es aditivo es muy fácil de creerse mirando el propio diff, y bastante difícil de acertar.',
      ],
    },
    {
      heading: 'A veces el parámetro de más es lo que rompe',
      body: [
        'Dos de esas funciones, fullPathToCollectionSegments y stripCollectionPath, reciben un solo argumento, y uno de nuestros paquetes las pasa sin envolver: parentCollectionIds.map(stripCollectionPath). Ponle un segundo parámetro a una función así y Array.prototype.map le mete el índice del array. La llamada sigue compilando. Solo que ya significa otra cosa.',
        'Por eso las versiones que entienden de segmentos son funciones aparte y no parámetros nuevos, y un test fija cuántos argumentos aceptan para que a nadie le dé por unificarlas más adelante. Lo vimos porque antes de cambiar una firma buscamos en nuestro propio código quién la usa; y eso solo se puede hacer con el código que tenemos delante, que es justo la razón de tratar un cambio de firma con más cuidado del que aparenta.',
      ],
    },
    {
      heading: 'La compatibilidad también afecta a los datos guardados',
      body: [
        'La misma release arregló las claves de caché de entidades, que se formaban con la ruta, una barra y el id. Así, los pares ("a", "b/c") y ("a/b", "c") dan la misma clave, y una entidad podía servir los valores cacheados de otra: un borrador restaurado en el formulario equivocado, una vista previa de referencia enseñando otro registro.',
        'El arreglo escapa el id, pero encodeEntityId es a propósito la función identidad para cualquier id que no lleve barra, interrogante, almohadilla ni porcentaje. Lo que ya está guardado en el navegador no cambia de forma, así que actualizar no deja huérfano ningún borrador sin guardar. Un arreglo correcto que tira sin avisar el trabajo local de todo el mundo es peor release que el fallo que cierra.',
      ],
    },
    {
      heading: 'Si hay que romper, que sea en una línea a la que uno se apunta',
      body: [
        'Pasar todos los paquetes de Tailwind CSS 3 a 4 no había manera de hacerlo aditivo. Cambia los nombres de las variables CSS que escribe la aplicación anfitriona y el plugin de build que instala.',
        'No lo metimos en la 3.0.0. Entre el 25 de noviembre y el 13 de diciembre de 2025 sacamos diecinueve preversiones, de la v3.0.0-tw4.0 a la [v3.0.0-tw4.18](https://github.com/firecmsco/firecms/releases/tag/v3.0.0-tw4.18), como línea paralela, mientras la 3.0.0 pasaba a estable el 1 de diciembre con Tailwind 3. Tailwind 4 llegó para todo el mundo en la [3.1.0](https://github.com/firecmsco/firecms/releases/tag/v3.1.0), el 18 de febrero de 2026, con [una guía de migración](https://github.com/firecmsco/firecms/blob/master/website-astro/src/content/docs/docs/self/migrating_from_v3_to_v3_1.mdx): instalar el plugin de Vite, renombrar --fcms-primary a --color-primary y borrar tailwind.config.js y postcss.config.js.',
        'El paso interesante es el renombrado. Si te lo saltas no falla nada: compila, la aplicación arranca y FireCMS tira de su paleta por defecto, o sea que el único síntoma es que han desaparecido los colores de marca del proyecto. La guía lo pone como aviso y no como un punto más de la lista, porque un paso de migración cuyo fallo es visual es justo el que la gente se salta y da la actualización por terminada.',
      ],
    },
    {
      heading: 'Una comprobación de versiones que nunca se ejecuta no comprueba nada',
      body: [
        'FireCMS Cloud carga en tiempo de ejecución la personalización de un cliente dentro de una aplicación anfitriona que desplegamos nosotros, así que un bundle compilado hace dos años tiene que renderizar con el React que hoy tenga el host. El React compartido se declaraba con un rango: "^18.0.0 || ^19.0.0".',
        'En la 3.4.0 lo quitamos, por dos razones que eran ciertas a la vez. Una personalización se compila sin copia local de React a la que recurrir, así que cuando la comprobación de versión falla el remoto no degrada: se muere con un módulo indefinido. Y además nunca comprobó nada, porque el semver que trae el plugin de federación no sabe leer un rango con OR, o sea que esa cadena no encajó jamás con ningún host. Quitarla deja al host como única autoridad sobre la versión de React, que es la única forma de poder mover React por debajo de despliegues que nadie va a volver a compilar.',
        'El fallo que nos llevó hasta ahí estaba al lado. react/jsx-runtime no estaba entre los paquetes compartidos, así que cualquier bundle compilado con la transformación automática de JSX se traía el runtime, y el runtime se traía una segunda copia de React. Y eso no es solo peso de más: React 19 se niega a renderizar un elemento creado por React 18, porque cada major marca sus elementos con un símbolo distinto, así que ese bundle moría con el error #525. Compartir el runtime lo arregló y dejó una compilación de prueba en 40K, cuando ocupaba 144K.',
      ],
    },
    {
      heading: 'El fallo de rangos que nos comimos nosotros',
      body: [
        'Las dos guías de migración empiezan diciendo que actualices todos los paquetes @firecms/* a la misma versión. No es manía de orden. Nuestras propias releases canary fijaban las dependencias entre paquetes con un caret — "@firecms/core": "^3.4.0-canary.abc1234" — y ese rango también encaja con la 3.4.0 estable, que npm prefiere por ser más alta. Instalar una canary se traía entonces paquetes estables por debajo; esos pedían a su vez ^3.4.0; y npm anidaba una segunda copia de @firecms/core para dárselo.',
        'Dos copias del paquete core son dos objetos de contexto de React. El provider de la aplicación rellena uno y el plugin lee el otro, así que el síntoma es un controlador que está ahí, bien tipado y vacío. Instalando cuatro paquetes en la misma versión canary salían cinco copias del core. Ahora las publicaciones canary fijan nuestros paquetes con la versión exacta.',
        'Las releases estables no se vieron afectadas nunca, que es la única razón de que durase tanto: era un fallo en la versión que pedimos instalar a quien nos está ayudando a probar.',
      ],
    },
    {
      heading: 'Lo que nos llevamos',
      body: [
        'Nada de esto es una regla sobre versionado semántico. Se parece más a una costumbre: dar por hecho que la actualización la va a hacer un viernes alguien que no ha leído las notas de la release, y montar el cambio para que aun así funcione. Cada parámetro opcional al final de la firma, cada codificador que deja los valores como estaban y cada línea de preversiones en paralelo son formas de no pasarle una factura a quien no la ha pedido.',
      ],
    },
  ],
};
