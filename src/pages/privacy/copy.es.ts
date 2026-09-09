import type { PrivacyCopy } from './copy.en';

/* Castellano. Redactado como una política española, no como la traducción de
   la inglesa: registro impersonal, sin tuteo y sin la retórica de plantilla
   («le informamos de que…», «en cumplimiento de la normativa vigente…») que
   alarga el texto sin decir nada. Las referencias legales son las que cita un
   despacho español —el RGPD por artículos, la LSSI por su artículo 22.2, el
   TDDDG alemán por su § 25— y los nombres de producto quedan en inglés.

   Los datos vienen de `src/site.ts` con los tokens `__ASÍ__` y los enlaces se
   escriben `[texto](url)`. */

export const privacyEs: PrivacyCopy = {
  title: 'Política de privacidad',
  intro:
    'Qué hace este sitio web con los datos personales, que es bastante menos de lo que hacen la mayoría, y nada en absoluto hasta que se autoriza.',
  updated: 'Última actualización: 9 de septiembre de 2026',

  blocks: [
    {
      id: 'controller',
      title: 'Quién responde',
      body: [
        '__LEGAL_NAME__, que opera como Camberi, con domicilio en __ADDRESS__ y NIF __TAX_ID__, es la responsable del tratamiento de los datos que se describen aquí. Los datos completos de la sociedad están en el [aviso legal](/es/legal/).',
        'Para cualquier cuestión relacionada con esta página, la dirección es [__EMAIL__](mailto:__EMAIL__). No hay delegado de protección de datos: el artículo 37 del RGPD lo exige cuando hay observación sistemática a gran escala o tratamiento a gran escala de categorías especiales de datos, y un estudio de tres personas con un sitio de presentación no hace ni lo uno ni lo otro.',
      ],
    },
    {
      id: 'summary',
      title: 'Qué ocurre aquí',
      body: [
        'Este es un sitio estático. No tiene cuentas, ni acceso con contraseña, ni formularios, ni tienda. Solo hay tres cosas que rozan datos personales, y esta página es esas tres por orden: el servidor guarda registros de las peticiones, hay una herramienta de analítica que se carga únicamente si se acepta, y la dirección de correo de arriba llega a un buzón real.',
      ],
    },
    {
      id: 'logs',
      title: 'Registros del servidor',
      body: [
        'El sitio se sirve desde Firebase Hosting, un servicio de Google Cloud. Google actúa como encargada del tratamiento; para clientes establecidos en el Espacio Económico Europeo la entidad contratante es __HOST_ENTITY__, __HOST_ADDRESS__.',
        'Firebase Hosting anota la dirección IP de cada petición. Según la propia Google, «utiliza las direcciones IP de las peticiones entrantes para detectar abusos y ofrecer a los clientes un análisis detallado de los datos de uso», y «Hosting conserva los datos de IP durante unos meses». Esa es la redacción de Google y su [página de privacidad](https://firebase.google.com/support/privacy) es donde consta. Nadie consulta esos registros uno a uno y aquí no hay ninguna herramienta que convierta una dirección en una persona.',
        'La base jurídica es el interés legítimo del artículo 6.1.f: mantener el sitio en pie y defenderlo de los abusos. Estos registros no son opcionales: un servidor que contesta a una petición ya ha recibido la dirección a la que tiene que contestar.',
      ],
    },
    {
      id: 'analytics',
      title: 'Analítica, solo si se acepta',
      body: [
        'Se utiliza Google Analytics 4 (propiedad __GA4__) para contar las visitas. No se carga al abrir la página. Hasta que no se pulsa Aceptar no se hace ninguna petición a los dominios de medición de Google, no se instala ninguna cookie y no se envía ninguna señal de consentimiento: la etiqueta la inserta el navegador solo después de la aceptación, y por eso lo primero que aparece es la pregunta.',
        'La base jurídica para almacenar cualquier cosa en el dispositivo es el consentimiento: artículo 6.1.a del RGPD junto con el artículo 22.2 de la Ley 34/2002, y § 25.1 del TDDDG para quien lo lea desde Alemania. Google Analytics no encaja en la excepción de medición de audiencia que recoge la guía de cookies de la AEPD, y de ahí que esté detrás de una elección y no activado de serie.',
        'Si se acepta, Google Analytics instala dos cookies en este dominio, y son las únicas cookies que este sitio llega a escribir.',
        'La responsable de Google Analytics en el EEE es Google Ireland Limited, Gordon House, Barrow Street, Dublín 4, Irlanda, y el tratamiento en Estados Unidos lo realiza Google LLC. Google afirma que [no registra ni almacena direcciones IP individuales de visitantes de la UE, Suiza o el Reino Unido](https://support.google.com/analytics/answer/12017362): ese tráfico se recoge a través de dominios y servidores situados en la UE y la dirección se descarta en cuanto se ha deducido de ella una localización aproximada. Las transferencias a Estados Unidos se amparan en el Marco de Privacidad de Datos UE-EE. UU., al que Google LLC está adherida, con las cláusulas contractuales tipo por detrás.',
        'Lo que se ve por este lado es agregado: cuánta gente lee una página, desde qué país y con qué tipo de dispositivo, y qué enlace la ha traído. No se cruza con ningún nombre ni se sube ninguno. Tampoco se concede jamás ninguna señal publicitaria: el almacenamiento publicitario, los datos de usuario con fines publicitarios y la personalización de anuncios están denegados en el modo de consentimiento y ahí se quedan. Google conserva los datos de eventos durante el plazo configurado en la propiedad, que en la versión estándar no puede pasar de catorce meses.',
        'La respuesta puede cambiarse en cualquier momento, aquí abajo.',
      ],
      list: [
        '__GA_COOKIE__: distingue un navegador de otro. Caduca a los dos años.',
        '__GA_SESSION_COOKIE__: mantiene el estado de la sesión en curso. Caduca a los dos años.',
      ],
    },
    {
      id: 'cookies',
      title: 'Qué se guarda en el navegador',
      body: [
        'Aparte de esas dos cookies de analítica, este sitio no instala ninguna otra: ni publicitarias, ni gestores de etiquetas, ni botones de redes sociales, ni vídeo incrustado, ni tipografías traídas del CDN de nadie, porque las fuentes son archivos alojados en este mismo dominio.',
        'En el almacenamiento local del navegador quedan dos valores pequeños. No son cookies, no se envían a nadie y existen para que el sitio deje de preguntar lo que ya se ha contestado: __LANG_KEY__ recuerda si se está leyendo en español o en inglés, y __CONSENT_KEY__ recuerda la respuesta a la pregunta de la analítica y la fecha en que se dio. Esa respuesta vale doce meses; pasado ese plazo se vuelve a preguntar.',
        'Borrar los datos del sitio en el navegador elimina los dos. El botón de aquí abajo también.',
      ],
    },
    {
      id: 'email',
      title: 'Si se escribe un correo',
      body: [
        'Escribir a [__EMAIL__](mailto:__EMAIL__) supone que quedan en nuestro poder la dirección, el nombre si va firmado y lo que se haya querido contar. Sirve para contestar y para conservar el hilo, porque una conversación sobre un trabajo tiene que poder releerse seis meses después.',
        'La base jurídica es el artículo 6.1.b cuando se pregunta por un trabajo que podríamos hacer juntos y, en los demás casos, el interés legítimo del artículo 6.1.f en contestar a quien escribe. El buzón está alojado en nuestro proveedor de correo, que trata los mensajes por cuenta nuestra y no hace nada más con ellos.',
        'Una consulta que no acaba en trabajo se borra dos años después del último mensaje. La que sí acaba en trabajo pasa al expediente del cliente, y el artículo 30 del Código de Comercio obliga a conservarlo durante seis años.',
      ],
    },
    {
      id: 'booking',
      title: 'Si se reserva una llamada',
      body: [
        'Los enlaces para reservar una llamada llevan a una [página de citas de Google Calendar](__BOOKING_URL__). Esa página no forma parte de este sitio: al seguir el enlace se sale hacia Google, y lo que se escriba allí —nombre, correo, lo que se ponga en la descripción— lo recoge Google y nos llega a nosotros como organizadores de la cita. Esa página se rige por la [política de privacidad de Google](https://policies.google.com/privacy).',
        'La reserva se usa para celebrar la llamada y para prepararla, y se borra en el mismo plazo que la correspondencia a la que pertenece.',
      ],
    },
    {
      id: 'links',
      title: 'Enlaces hacia fuera',
      body: [
        'Este sitio enlaza a nuestros repositorios en [GitHub](__GITHUB__) y a nuestros paquetes en [npm](__NPM__), a [LinkedIn](__LINKEDIN__) y a [X](__X__), y a los productos que hemos construido. No hay nada de esos sitios incrustado aquí —ni botones que llamen a casa, ni píxeles de seguimiento—, así que ninguno se entera de nada hasta que se sigue el enlace; a partir de ahí manda la política de ese sitio y esta deja de aplicarse.',
      ],
    },
    {
      id: 'never',
      title: 'Lo que no se hace',
      body: [
        'En este sitio no hay elaboración de perfiles ni decisiones automatizadas de ningún tipo, de modo que el artículo 22 del RGPD no entra en juego. No se venden, alquilan ni ceden datos a anunciantes ni a intermediarios de datos, no se hace publicidad ni remarketing y no se construyen audiencias. Tampoco hay boletín, así que no hay nada que registre si se ha abierto uno.',
      ],
    },
    {
      id: 'rights',
      title: 'Derechos',
      body: [
        'Basta con escribir a [__EMAIL__](mailto:__EMAIL__) diciendo qué se quiere. Se contesta en el plazo de un mes que fija el artículo 12.3, y puede pedirse algo que acredite que los datos son de quien los reclama, siempre lo mínimo imprescindible.',
      ],
      list: [
        'Acceso: una copia de lo que se conserva sobre esa persona.',
        'Rectificación: corregir lo que esté mal.',
        'Supresión: borrarlo, salvo lo que haya obligación de conservar.',
        'Limitación: congelarlo mientras algo se discute.',
        'Portabilidad: recibirlo en un formato que lea una máquina.',
        'Oposición: pedir que se deje de tratar lo que se basa en el interés legítimo.',
        'Retirada del consentimiento a la analítica, cuando se quiera y con la misma facilidad con que se dio, en el botón de más arriba. Retirarlo no deshace lo que se midió antes.',
      ],
    },
    {
      id: 'complaints',
      title: 'Reclamaciones',
      body: [
        'Si algo de esto está mal hecho, lo más rápido suele ser decirlo aquí primero. No es obligatorio: el artículo 77 del RGPD permite reclamar directamente ante una autoridad de control, y puede elegirse la del lugar de residencia.',
        'En España es la [Agencia Española de Protección de Datos](https://www.aepd.es), C/ Jorge Juan 6, 28001 Madrid. En Alemania corresponde a la autoridad del estado federado en el que se resida; en Baviera, donde trabaja una de las personas del equipo, es la [Bayerisches Landesamt für Datenschutzaufsicht](https://www.lda.bayern.de).',
      ],
    },
    {
      id: 'changes',
      title: 'Cambios',
      body: [
        'Esta política lleva fecha. Si cambia lo que el sitio hace con los datos, cambia la página y se mueve la fecha; y si el cambio afecta a lo que se consintió, se vuelve a preguntar en lugar de darlo por hecho.',
      ],
    },
  ],
};
