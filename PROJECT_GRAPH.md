# pomelo404 — mapa de continuidad

Este archivo es la memoria operativa del proyecto. Actualízalo cuando cambie el alcance, el contenido o la arquitectura.

```mermaid
flowchart TD
  A["pomelo404 · Landing Next.js"] --> B["Objetivo: convertir visitas en conversaciones"]
  B --> C["Prueba de capacidad"]
  B --> D["Cotización rápida"]
  B --> E["Confianza"]
  B --> F["Contacto"]

  C --> C1["Proyectos destacados"]
  C1 --> C2["Miga · Faro · Nido — placeholders"]
  C2 --> C3["Pendiente: casos reales, métricas y URLs"]

  D --> D1["Tipo de proyecto"]
  D --> D2["Número de páginas"]
  D --> D3["Extras + plazo"]
  D1 --> D4["Estimado MXN"]
  D2 --> D4
  D3 --> D4
  D4 --> D5["CTA por email con resumen"]
  D5 --> D6["Siguiente: formulario/API + CRM"]

  E --> E1["Reviews — placeholders"]
  E1 --> E2["Pendiente: testimonios autorizados"]

  F --> F1["hola@pomelo404.com"]
  F1 --> F2["Pendiente: confirmar email y redes"]

  A --> G["Identidad visual"]
  G --> G1["Fresca · simple · vectorial · organizada"]
  G --> G2["Naranja pomelo · lima · azul · rosa"]
  G --> G3["Movimiento CSS + reduced-motion"]

  A --> H["Stack"]
  H --> H1["Next.js App Router + React + TypeScript"]
  H --> H2["CSS propio + estado local"]
  H --> H3["Vercel"]
  H3 --> H4["NEXT_PUBLIC_SITE_URL"]
```

## Reglas de producto

- La cotización es orientativa; nunca prometer precio final sin revisar alcance.
- El CTA principal siempre lleva al cotizador.
- Cada proyecto real debe incluir reto, solución, resultado y enlace.
- Los reviews requieren nombre, cargo y autorización del cliente.
- Mantener accesibilidad de teclado, contraste y `prefers-reduced-motion`.

## Próximas decisiones

1. Reemplazar los tres proyectos y reviews de ejemplo por contenido real.
2. Confirmar correo, redes y URL final.
3. Definir si la cotización se guarda en un CRM, se envía por email o ambas.
4. Añadir analítica de `inicio_cotizador`, `cotizacion_generada` y `contacto_enviado`.
5. Conectar el dominio a Vercel y cargar `NEXT_PUBLIC_SITE_URL`.
