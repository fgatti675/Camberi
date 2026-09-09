/* Copia en español de /journal/. Meses en minúscula y fecha con "de", como en
   castellano. Cada artículo lleva su propia copia en su carpeta. */

import type { JournalCopy } from './copy.en';

export const journalEs: JournalCopy = {
  title: 'Cuaderno',
  intro:
    'Apuntes sobre decisiones de nuestro propio código: qué elegimos, qué costó y en qué versiones y ficheros se puede leer.',

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
  dateFormat: '__DAY__ de __MONTH__ de __YEAR__',

  read: 'Leerlo',

  empty: 'Todavía no hay nada.',
};
