import type { ServicesCopy } from './copy.en';

/* Castellano, escrito como español y no traducido. Tuteo; los títulos de
   los encargos, los rangos de semanas y las líneas de alcance vienen de
   `t.engagements`, así que aquí solo va lo propio de esta página. */

export const servicesEs: ServicesCopy = {
  title: 'Cuatro encargos, con alcance cerrado y fecha de fin.',
  meta: 'De dos semanas a seis meses · alcance, plan de hitos y precio cerrados la primera semana',

  lead: [
    'Estas son las formas que toma nuestro trabajo de verdad. Cambian en duración y en lo que hay que decidir, no en cómo se trabaja: un alcance por escrito al salir de la primera semana, un plan de hitos, una URL de staging desde el primer día y una demo todos los viernes, elijas la que elijas.',
    'Si te reconoces en más de una, es lo normal. Casi todos los encargos empiezan por el más corto y crecen hacia el siguiente, y salir de dudas con una revisión de dos semanas cuesta mucho menos que hacerlo con una fase de descubrimiento de tres meses.',
  ],

  blurbs: [
    'Los procesos que tu equipo hace a mano —el Excel que se rellena el lunes, el informe que sale de juntar cuatro dashboards, la aprobación que vive en una bandeja de entrada— montados para que funcionen sin que nadie esté encima. También funciones con LLM, que salen con set de evaluación, coste por ejecución y un plan B definido.',
    'El producto entero, con diseño, frontend, backend e infraestructura en un solo equipo: de cero a producción, o la reescritura de una v1 que ya no se puede ampliar. También del tipo regulado, con datos médicos y una arquitectura que tiene que aguantar una auditoría.',
    'La capa de debajo. Diseño de esquemas, salir de un backend gestionado que se te ha quedado pequeño, permisos aplicados por Postgres y no por el código de la aplicación, y un panel que tu equipo de operaciones sí puede usar. Y la implantación de FireCMS y Rebase, hecha por quienes escribieron los frameworks.',
    'Dos semanas, una lectura seria de tu stack y un documento que ordena lo que está mal por lo que te cuesta. Escrito para que tu propio equipo pueda ejecutarlo sin nosotros, que muchas veces es el resultado correcto.',
  ],

  same: {
    title: 'Lo que no cambia en ninguno de los cuatro.',
    intro:
      'La duración cambia. La manera de trabajar no, y es la parte que decide si un proyecto se lleva bien o no.',
  },
};
