# Compatibilidad visual de pomelo404

Base cotejada: `master` en `9443c7cfd3a0c67ffd6e320e0f1e2811dadcff4c`.

## Niveles de soporte

- Navegadores modernos: experiencia completa, temas, animaciones, cotizador y carrusel.
- Firefox: el `range` usa pista, progreso y pulgar específicos de Gecko para conservar sus medidas.
- Samsung Internet: no se usa `color-mix()`; los tonos derivados son valores sRGB fijos y el esquema claro/oscuro se declara explícitamente.
- Navegadores sin `aspect-ratio` o CSS Grid: composición simplificada y legible mediante `@supports`.
- Internet Explorer 10/11: presentación estática de una columna. Next.js 16 no garantiza hidratación, por lo que el menú, el tema, el cotizador y el carrusel pueden no ser interactivos.

## Versión independiente

`/legacy` sirve HTML, CSS y JavaScript ES5 desde `public/legacy/`. Los navegadores sin soporte de módulos y las visitas con JavaScript desactivado se envían a esta versión; también existe un enlace manual en el footer.

La versión legacy conserva un cotizador básico y WhatsApp sin depender de React. El número configurado en `public/legacy/legacy.js` debe actualizarse junto con `lib/quotation.ts`.

## Prueba recomendada

Comparar cada navegador usando el mismo tema del sistema, brillo y modo de pantalla. En Samsung Internet conviene desactivar temporalmente el modo oscuro forzado para distinguir la paleta del sitio de la transformación aplicada por el navegador o el dispositivo.
