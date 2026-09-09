import type { LegalCopy } from './copy.en';

/* Castellano. Escrito como texto español, no como traducción del inglés: un
   aviso legal en España se redacta en tercera persona y sin adornos, así que
   aquí se abandona el tuteo del resto del sitio. Los nombres propios, las
   cifras y las direcciones vienen de `src/site.ts` mediante los tokens
   `__ASÍ__`; los enlaces se escriben `[texto](url)`. */

export const legalEs: LegalCopy = {
  title: 'Aviso legal',
  intro:
    'Quién es el titular de este sitio web y los datos de la empresa que la normativa española y la alemana obligan a publicar.',
  updated: 'Última actualización: 9 de septiembre de 2026',

  labels: {
    legalName: 'Denominación social',
    tradeName: 'Nombre comercial',
    legalForm: 'Forma jurídica',
    taxId: 'NIF',
    vatId: 'NIF-IVA intracomunitario',
    address: 'Domicilio social',
    registry: 'Registro Mercantil',
    director: 'Administrador único',
    founded: 'Constitución',
    email: 'Correo electrónico',
    website: 'Sitio web',
  },

  legalFormValue: 'Sociedad de responsabilidad limitada (S.L.)',
  foundedValue: '17 de mayo de 2023',

  blocks: [
    {
      title: 'Contacto',
      body: [
        'La dirección de contacto es [hello@camberi.com](mailto:hello@camberi.com), atendida por todo el equipo.',
        'También puede concertarse una llamada de treinta minutos en [nuestro calendario](__BOOKING_URL__).',
      ],
    },
    {
      title: 'Alojamiento',
      body: [
        'camberi.com está alojado en Firebase Hosting, un servicio de Google Cloud. Para clientes establecidos en el Espacio Económico Europeo la entidad contratante es __HOST_ENTITY__, __HOST_ADDRESS__. Sus condiciones están publicadas en [firebase.google.com/terms](__HOST_URL__).',
      ],
    },
    {
      title: 'Protección de datos',
      body: [
        'El tratamiento de datos personales, incluido lo que recoge la analítica de este sitio, se detalla en la [política de privacidad](/es/privacy/).',
      ],
    },
    {
      title: 'Propiedad intelectual',
      body: [
        'Los textos, las imágenes, la disposición y el código de este sitio pertenecen a __LEGAL_NAME__, salvo cuando se indique otra atribución. Los logotipos de clientes y socios, las capturas de producto y las marcas de terceros pertenecen a sus titulares y aparecen aquí para identificar el trabajo, no para atribuírselo a nadie más.',
        'Los proyectos de código abierto que se describen en este sitio se publican con sus propias licencias en sus propios repositorios. Son esas licencias, y no este aviso, las que regulan su uso.',
      ],
    },
    {
      title: 'Legislación aplicable',
      body: [
        'Este sitio y su uso se rigen por la legislación española. Cuando la ley permite elegir fuero, son competentes los juzgados y tribunales de Madrid; cuando la condición de consumidor determina el fuero, prevalece esa norma.',
        'Este aviso se publica en cumplimiento del artículo 10 de la Ley 34/2002, de servicios de la sociedad de la información y de comercio electrónico (LSSI-CE).',
      ],
    },
    {
      title: 'Visitantes en Alemania — Impressum (§ 5 DDG)',
      body: [
        '__LEGAL_NAME__ es una sociedad española y no tiene establecimiento en Alemania: cuando este sitio menciona Múnich se refiere a la ciudad desde la que trabaja una de las personas del equipo, no a una sucursal registrada. Aun así, el § 5 DDG exige una serie concreta de datos y todos ellos figuran más arriba.',
      ],
      list: [
        'Forma jurídica y representante: sociedad de responsabilidad limitada (S.L.), representada por su administrador único, __DIRECTOR__.',
        'Registro y número de inscripción: Registro Mercantil de Madrid, hoja __HOJA__.',
        'Número de identificación a efectos del IVA según el § 27a UStG: __VAT_ID__.',
        'Dos vías de contacto directo y rápido: el correo electrónico y el enlace de reserva indicados arriba.',
        'Responsable del contenido: __DIRECTOR__, en el domicilio social indicado.',
      ],
    },
  ],
};
