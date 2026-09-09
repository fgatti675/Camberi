import type { SecurityCopy } from './copy.en';

/* Castellano. La página que abre el responsable de sistemas o de compliance
   del cliente antes de una llamada, así que el registro es sobrio e
   impersonal, sin promesas de folleto. Se mantiene el mismo argumento y la
   misma estructura de claves que en inglés, pero escrito como lo escribiría
   un estudio español: «encargado del tratamiento» y no «procesador de datos»,
   «acuerdo de confidencialidad» junto a NDA porque en España se dicen las
   dos. Los nombres de producto y de tecnología quedan en inglés. */

export const securityEs: SecurityCopy = {
  title: 'Cómo tratamos tu código y tus datos',
  intro:
    'Lo que un estudio pequeño puede decir con honestidad sobre seguridad: ninguna certificación, tres ingenieros y una explicación concreta de cómo se monta el trabajo.',
  updated: 'Última actualización: 9 de septiembre de 2026',

  blocks: [
    {
      id: 'certifications',
      title: 'Lo que no somos',
      body: [
        'No tenemos informe SOC 2 ni certificado ISO 27001, y no vamos a dar a entender lo contrario. Los dos describen una organización con presupuesto de auditoría y un departamento de cumplimiento; aquí somos tres ingenieros. Si vuestro proceso de compras exige alguno de los dos, mejor decirlo antes de definir el proyecto: es un motivo para no trabajar juntos, no algo que descubrir en el tercer mes.',
        'Lo que viene a continuación es lo que sí hacemos, escrito para que pueda contrastarse con el trabajo en lugar de creerse.',
      ],
    },
    {
      id: 'ownership',
      title: 'El código es vuestro y se queda donde está',
      body: [
        'El trabajo de cliente vive en los repositorios del cliente, sobre su infraestructura y con sus cuentas. Nosotros entramos como un miembro más, con los permisos que el trabajo requiere, y cuando el encargo termina las cuentas se quedan donde estaban: no hay que migrar nada de vuelta porque nada estuvo nunca en otro sitio.',
        'Es lo mismo que dice el resto del sitio sobre cómo acaba un encargo: tu repositorio, tu infraestructura, tus cuentas, documentado. Aquí importa porque además responde a casi todo lo que pregunta una revisión de seguridad. No hay una copia de vuestro sistema alojada por Camberi que alguien pueda comprometer, no hay convivencia con los datos de otro cliente y no hay una cuenta de proveedor interpuesta entre vosotros y vuestro entorno de producción.',
      ],
    },
    {
      id: 'where',
      title: 'Dónde se ejecutan las cosas',
      body: [
        'Nuestro propio código —los frameworks y las herramientas que publica el estudio— está en GitHub, en [github.com/firecmsco](__GITHUB__), a la vista de cualquiera. Google Cloud es la plataforma que más usamos, tanto para nuestros productos como para los sistemas de cliente que se nos pide operar.',
        'En cada proyecto decimos de qué servicios de terceros depende y qué trata cada uno antes de firmar nada.',
      ],
    },
    {
      id: 'access',
      title: 'Dónde se aplica el control de acceso',
      body: [
        'Cuando diseñamos nosotros la capa de datos, la autorización la aplica la base de datos y no el código de la aplicación. Rebase —el backend sobre Postgres que escribimos y mantenemos, tanto para nuestros productos como para los sistemas de cliente construidos sobre él— pone cada regla de acceso en row-level security de Postgres, de modo que un endpoint al que se le olvide una comprobación no puede devolver las filas de otro inquilino. Los datos multiinquilino de SustenTalent están separados así.',
        'Es una preferencia de arquitectura con un motivo detrás: el middleware es justo la parte del sistema que se refactoriza, y una regla que vive en el planificador de consultas sobrevive a la refactorización. Es además la parte de nuestro trabajo más fácil de verificar, porque las políticas están en el esquema y el esquema es vuestro.',
      ],
    },
    {
      id: 'regulated',
      title: 'Datos regulados',
      body: [
        'Trabajamos con datos de salud bajo normativa alemana desde la primera versión web de medicalmotion, en 2019: la aplicación del paciente, las herramientas del terapeuta y la plataforma de datos que hay detrás de su investigación. Ese es el entorno donde se hacen las preguntas prácticas —quién puede ver un historial, qué queda registrado, qué pasa con él cuando el paciente se va— y por eso un proceso de compras que las haga no nos incomoda.',
        'No somos fabricantes de productos sanitarios ni certificamos los de nadie. Cuando el producto del cliente está regulado, construimos según los requisitos que fije su trabajo regulatorio.',
      ],
    },
    {
      id: 'paperwork',
      title: 'Lo que firmamos',
      body: ['Nada de esto hay que negociarlo. Se pide y se envía.'],
      list: [
        'Un acuerdo de confidencialidad (NDA) antes de definir el proyecto, si preferís contar el problema bajo uno. El vuestro o el nuestro.',
        'Un contrato de encargo del tratamiento conforme al artículo 28 del RGPD, para cualquier encargo en el que tratemos datos personales por vuestra cuenta.',
        'La lista nominal de los subencargados que usa el proyecto —los servicios concretos, no una categoría— actualizada mientras dure el trabajo.',
      ],
    },
    {
      id: 'incidents',
      title: 'Si algo sale mal',
      body: [
        'Si detectamos un incidente que afecte a vuestros datos o a vuestros sistemas, lo comunicamos sin dilación indebida, por escrito y con lo que sepamos en ese momento, en vez de esperar a saberlo todo. Cuando actuamos como encargados del tratamiento es exactamente lo que exige el artículo 33.2 del RGPD, y la obligación está en el contrato de encargo.',
        'Para avisarnos de algo, la dirección es [__EMAIL__](mailto:__EMAIL__), indicando en el asunto que es un aviso de seguridad. Llega a todo el equipo.',
      ],
    },
  ],
};
