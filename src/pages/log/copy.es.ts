/* Copia en español de /log/. Escrita como español, no traducida: en castellano
   los meses van en minúscula y la fecha lleva "de", que es justo la razón por
   la que `monthHeading` es una plantilla y no una concatenación en el
   componente. */

import type { LogCopy } from './copy.en';

export const logEs: LogCopy = {
  title: 'Registro',
  intro:
    'Todo lo que hemos publicado, con fecha y un enlace para comprobarlo. Solo lo que ya está fuera: nada previsto, nada a medias.',

  meta: '__COUNT__ entradas · la última, __DATE__',

  months: [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre',
  ],

  monthHeading: '__MONTH__ de __YEAR__',

  dateFormat: '__DAY__ de __MONTH__ de __YEAR__',

  sourceLabel: 'Fuente',
};
