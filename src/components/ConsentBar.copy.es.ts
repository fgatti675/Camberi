import type { ConsentCopy } from './ConsentBar.copy.en';

/* Castellano. Registro impersonal, como el resto de las páginas legales del
   sitio: aquí no se tutea. «Aceptar» y «Rechazar» son los verbos de la guía
   de cookies de la AEPD, y los dos botones pesan lo mismo porque rechazar no
   puede costar más que aceptar. */

export const consentEs: ConsentCopy = {
  regionLabel: 'Consentimiento de analítica',
  body: 'Este sitio usa Google Analytics para contar las visitas. No se carga nada hasta que se elija.',
  policy: 'Política de privacidad',
  accept: 'Aceptar',
  reject: 'Rechazar',

  settingsAction: 'Cambiar mi elección',
  statusGranted: 'La analítica está activada en este navegador.',
  statusDenied: 'La analítica está desactivada en este navegador.',
  statusNone: 'No hay ninguna elección guardada: volverá a preguntarse.',
};
