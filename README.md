# Cotizador · default forzado v9

Corrige el caso en que Fast Refresh conserva el estado anterior del cotizador.

## Estado inicial esperado

- Landing page seleccionada.
- 1 página.
- Sin extras.
- Entrega normal.
- $8,000 MXN + IVA.

## Aplicación

1. Copia el contenido sobre la raíz del repositorio.
2. Detén el servidor de desarrollo.
3. Ejecuta nuevamente `pnpm dev`.
4. Haz una recarga completa del navegador: `Cmd + Shift + R` en macOS o `Ctrl + Shift + R` en Windows.

`app/page.tsx` incluye una key de versión en `QuoteCalculator` para que React descarte el estado preservado. No es necesario borrar datos del navegador.
