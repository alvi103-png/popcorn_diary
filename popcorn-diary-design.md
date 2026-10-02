# Popcorn Diary: guía de diseño para construir paso a paso

## Tu papel en este proyecto

Soy Viviana, desarrolladora fullstack en formación. Voy a construir **Popcorn Diary** yo misma, paso a paso, con React + Vite + Tailwind CSS v4 + lucide-react. Quiero aprender, no recibir la app hecha.

Cómo quiero que me ayudes:

- Háblame en español, de forma clara y cercana.
- Avanzamos **un paso cada vez**. Explica qué vamos a hacer y por qué, dame el código de ese paso con comentarios breves y espera a que te confirme que funciona antes de seguir.
- Si algo que hago no sigue este diseño, dímelo con respeto y explícame por qué.
- Usa siempre los tokens de este documento. Nada de colores, tamaños o tiempos inventados en el código.
- Cuando haya una decisión que tomar, dame 2 opciones y tu recomendación.

## Qué es Popcorn Diary

Un diario personal donde registro las películas y series que he visto, las califico con estrellas de 1 a 5, sigo los episodios de las series y escribo notas. Interfaz oscura, limpia, centrada en los pósters, con estética madura y moderna. Los textos son cercanos y con humor ligero.

Principios:

1. **El póster manda.** La interfaz se aparta: superficies oscuras y bordes finos.
2. **Un solo color que grita.** `lime` para la acción principal y el estado activo. `orange` solo para estrellas y novedades.
3. **Titulares con punto.** Los títulos grandes terminan en un punto lima: "Hola, Viviana." Es la firma de la marca.
4. **Simple.** Iconos Lucide de trazo fino, estrellas clásicas, movimiento suave y con propósito.

## Tokens (paleta "Cinta magnética")

Tema único oscuro. Van en `src/index.css` con Tailwind v4:

```css
@import "tailwindcss";

@theme {
  /* Color */
  --color-bg: #0F1116;              /* fondo de página */
  --color-surface: #1B1E26;         /* tarjetas, barras, hojas */
  --color-surface-raised: #252934;  /* inputs, chips, hover */
  --color-border: #2C313D;          /* bordes de 1px */
  --color-lime: #C6F432;            /* primario */
  --color-lime-hover: #B3E01F;
  --color-on-lime: #0F1116;         /* texto sobre lima, nunca blanco */
  --color-orange: #FF8A3D;          /* estrellas y "Nueva" */
  --color-on-orange: #0F1116;
  --color-text: #EEF0F3;            /* texto principal (16.5:1) */
  --color-text-muted: #9AA0AC;      /* texto secundario (7.2:1) */
  --color-star-empty: #5E6577;      /* contorno de estrella vacía */
  --color-danger: #FF6B6B;
  --color-scrim: rgba(15, 17, 22, 0.72); /* velo sobre pósters y detrás de hojas */
  --color-poster-1: #2A3320;        /* fondos de póster de ejemplo */
  --color-poster-2: #3D2A1C;
  --color-poster-3: #1E2A3D;
  --color-poster-4: #2E2440;
  --color-poster-5: #3A1F25;
  --color-poster-6: #22303A;

  /* Tipografía */
  --font-display: "Space Grotesk", system-ui, sans-serif;
  --font-body: "DM Sans", system-ui, sans-serif;

  /* Radios */
  --radius-sm: 6px;    /* badges */
  --radius-md: 10px;   /* pósters, inputs */
  --radius-lg: 18px;   /* tarjetas grandes, hojas */

  /* Sombras (casi invisibles en oscuro; separamos con bordes) */
  --shadow-card: 0 8px 24px rgba(0, 0, 0, 0.35);
  --shadow-sheet: 0 -12px 40px rgba(0, 0, 0, 0.5);

  /* Movimiento */
  --ease-out-soft: cubic-bezier(0.2, 0.8, 0.2, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --duration-fast: 120ms;
  --duration-base: 200ms;
  --duration-slow: 320ms;
}

body {
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
}

/* Foco visible en toda la app: contorno lima con separación */
:focus-visible {
  outline: 2px solid var(--color-lime);
  outline-offset: 2px;
}
```

Fuentes en `index.html`:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap">
```

Espaciado: la escala de Tailwind (múltiplos de 4px). Usos fijos: `gap-4` entre pósters en escritorio, `gap-3` en móvil, `gap-10` entre filas, `px-4` de margen lateral en móvil, contenedor `max-w-[1184px] px-12` en escritorio.

## Tipografía

| Estilo | Fuente | Tamaño / interlínea | Peso | Extra | Uso |
| --- | --- | --- | --- | --- | --- |
| display | Space Grotesk | 56 / 56 | 700 | tracking -2px | Saludo "Hola, Viviana." |
| h1 | Space Grotesk | 36 / 40 | 700 | tracking -1px | Título de página |
| h2 | Space Grotesk | 22 / 28 | 700 | tracking -0.4px | Cabecera de fila |
| h3 | Space Grotesk | 15-16 / 20 | 500 | | Título bajo el póster |
| body | DM Sans | 15 / 22 | 400 | | Texto y notas |
| small | DM Sans | 13 / 18 | 400 | | Metadatos |
| eyebrow | DM Sans | 12 / 16 | 600 | mayúsculas, +0.6px, text-muted | Rótulo sobre titulares |

En móvil: display baja a 30/32 y h2 a 19/24.

## Iconos

`lucide-react`, trazo 2, heredan el color del texto. Tamaños: 16 en botones pequeños, 18-20 en navegación y botones, 22 en la barra inferior móvil, 28 en estados vacíos. La estrella rellena se reserva para calificar. Iconos usados: `House, Film, Tv, List, Search, Plus, Bell, User, Check, ListPlus, Ellipsis, ChevronLeft, ChevronRight, Star, Eye, Heart, Calendar, Clock, Clapperboard, SlidersHorizontal`.

Un botón con solo icono siempre lleva `aria-label`.

## Componentes

### Button
Forma de píldora (`rounded-full`), DM Sans 14px 600, padding 10px 18px, icono opcional delante con gap 8px.
- `primary`: fondo `lime`, texto `on-lime`; hover `lime-hover`.
- `secondary`: fondo `surface-raised`, borde `border`; hover borde `text-muted`.
- `ghost`: transparente, texto `text-muted`; hover texto `text` y fondo `surface-raised`.
- Tamaño `sm`: padding 6px 12px, 13px. `iconOnly`: círculo de 40px (32px en `sm`).

### SearchBar
Píldora de 42px de alto, fondo `surface-raised`, borde `border`, icono `Search` a la izquierda. Placeholder: "¿Ya la vi? Busca una peli o serie". Al enfocar, borde `lime`. En escritorio muestra la pista `/` (atajo de teclado) a la derecha; en móvil no.

### StarRating
5 estrellas Lucide. Rellenas en `orange` (`fill="currentColor"`), vacías con contorno `star-empty`. Modo editable: cada estrella es un `button` con `aria-label` "3 estrellas". Opción de mostrar el número ("4.0") al lado. Textos por nivel: 1 Me dormí · 2 Meh · 3 Está bien · 4 Muy buena · 5 Imprescindible.

### Badge
11px, 600, mayúsculas, padding 3px 7px, `radius-sm`. Tonos: `orange` ("Nueva"), `lime` ("Vista"), `neutral` (fondo `surface-raised`, texto `text-muted`: "Película", "Serie"), `glass` (fondo `scrim`: "T2 · E5" sobre pósters). Máximo una badge por póster.

### PosterCard
- Póster 2:3, `radius-md`, borde `border`. Ancho 168px en escritorio, 120px en móvil.
- En producción el fondo es la imagen del póster. Mientras no haya imagen: color `poster-1` a `poster-6` con el título encima (Space Grotesk 700, 19px).
- Debajo: título (h3, una línea con elipsis) y fila de meta: "Película · 2023" a la izquierda y estrellas de 12px a la derecha (en móvil, solo el año).
- Serie en curso: barra de progreso de 4px en el borde inferior, relleno `lime`; subtítulo "T3 · E6 de 10".
- Hover o foco: ver Animaciones. Aparece un velo `scrim` con las estrellas arriba (en una píldora `surface`) y 3 botones pequeños abajo: Marcar como vista (`Check`, primary), Añadir a una lista (`ListPlus`), Más (`Ellipsis`).

### MediaRow
Cabecera: eyebrow opcional, título h2 + contador en `text-muted`, y a la derecha el enlace "Ver todo" en `lime` + flechas `ChevronLeft`/`ChevronRight` (botones secondary sm). Debajo, fila horizontal con scroll (`overflow-x-auto`, sin barra visible, `scroll-snap-type: x mandatory`). En móvil sin flechas.
Estado vacío: caja con borde punteado `border`, `radius-lg`, icono `Clapperboard`, título "Nada por aquí todavía", texto "Esta lista está más vacía que un cine un lunes a las 10am." y botón secondary opcional a la derecha.

### StatTile
Tarjeta `surface` con borde, `radius-md`, padding 14px 16px. Arriba: etiqueta 13px `text-muted` + icono. Valor grande Space Grotesk 700 28px tracking -0.8px. Variación opcional en `lime` 12px ("+2 esta semana").

## Animaciones

Reglas generales:
- Solo animamos `transform` y `opacity` (y colores en hover). Nada de animar `width`, `height` o `top`.
- Tiempos y curvas siempre de los tokens de movimiento.
- Respeta `prefers-reduced-motion`: con esa preferencia, quitamos desplazamientos y escalas y dejamos solo fundidos cortos.

| Qué | Cómo | Duración / curva |
| --- | --- | --- |
| Hover de póster | sube 4px (`translateY(-4px)`), borde pasa a `lime`, aparece `shadow-card` | base / ease-out-soft |
| Velo y acciones del póster | `opacity` 0 a 1; el título grande del póster se desvanece | 180ms / ease-out-soft |
| Acciones del póster | entran desde abajo 6px, escalonadas 40ms | base / ease-out-soft |
| Pulsar un botón | `scale(0.98)` | fast |
| Hover de botón | cambio de color de fondo o borde | 150ms |
| Calificar (estrella elegida) | "pop": scale 1 a 1.25 a 1; las estrellas hasta la elegida se rellenan en cascada, 40ms entre cada una | 220ms / ease-spring |
| Marcar como vista | el icono `Check` hace pop y aparece la badge "Vista" con fade + scale 0.9 a 1 | 220ms / ease-spring |
| Barra de progreso | al montar, crece desde 0 con `scaleX` (`transform-origin: left`) | 600ms / ease-out-soft |
| Carga de la página | las secciones entran con fade + subida de 12px, escalonadas 60ms | slow / ease-out-soft |
| Carga de pósters | esqueleto `surface-raised` con brillo que recorre (shimmer) hasta que llega la imagen; la imagen entra con fade | shimmer 1.4s en bucle; fade base |
| Filas con flechas | `scroll-behavior: smooth`, avanza el ancho visible | nativo |
| Hoja inferior en móvil | sube desde abajo (`translateY(100%)` a 0) y el velo `scrim` aparece con fade | slow / ease-out-soft |
| Pestaña activa (nav) | la píldora de fondo se desliza a la pestaña nueva | base / ease-out-soft |
| Buscador | el borde cambia a `lime` al enfocar | fast |
| Aviso (toast) "Listo, ya está en tu diario." | entra desde abajo 16px + fade, se va solo a los 3s | slow / ease-out-soft |

Keyframes para `index.css`:

```css
@theme {
  --animate-fade-up: fade-up var(--duration-slow) var(--ease-out-soft) both;
  --animate-pop: pop 220ms var(--ease-spring) both;
  --animate-shimmer: shimmer 1.4s linear infinite;
  --animate-sheet-in: sheet-in var(--duration-slow) var(--ease-out-soft) both;

  @keyframes fade-up {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes pop {
    0% { transform: scale(1); }
    50% { transform: scale(1.25); }
    100% { transform: scale(1); }
  }
  @keyframes shimmer {
    from { background-position: -200% 0; }
    to { background-position: 200% 0; }
  }
  @keyframes sheet-in {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
  }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 1ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 1ms !important;
  }
}
```

Escalonado: un `style={{ animationDelay: `${index * 60}ms` }}` en cada sección o tarjeta.

## Pantallas

### Inicio en escritorio (≥1024px)
1. **Barra superior fija** (68px, fondo `bg` al 86% con desenfoque, borde inferior): logo "Popcorn Diary." (Space Grotesk 700 21px, punto lima), enlaces con icono (Inicio activo en píldora `surface-raised`, Películas, Series, Listas), buscador (máx. 340px, empujado a la derecha), botón primary "Añadir" con `Plus`, avatar circular `orange` con la inicial.
2. **Saludo + resumen** (2 columnas): eyebrow con la fecha, "Hola, Viviana." en display, frase "Llevas 6 títulos este mes. Nada mal para alguien que dice que no tiene tiempo."; a la derecha 4 StatTile (Vistas en total, Este mes, Horas de pantalla, Nota media).
3. **Continúa donde lo dejaste**: tarjeta grande (`radius-lg`, 340px de alto) con fondo del póster y degradado oscuro de izquierda a derecha. Eyebrow, título 48px con punto lima, Badge "Serie" + "Temporada 3 · Episodio 6 · 34 min" + estrellas, barra de progreso de 6px, texto "6 de 10 episodios · te quedan unas 2 horas", botones "Marcar E6 como visto" (primary, `Check`) y "Ver ficha" (secondary, `Eye`). A la derecha, el póster inclinado 4°.
4. **Filas (MediaRow)**: Recién vistas (eyebrow "Tu semana"), Series en curso (con progreso), Mis favoritas (eyebrow "5 estrellas"), Explorar por género (chips píldora `surface` con borde y contador en `text-muted`), Directores: Almodóvar (eyebrow "Lista personal"), Documentales (estado vacío).
5. **Pie**: borde superior, "Popcorn Diary · Tu diario de pelis y series" y "Sin spoilers. Sin algoritmos. Solo tus notas."

### Tablet (640-1023px)
Navegación compacta (solo iconos en los enlaces), saludo arriba y StatTile en 2 columnas debajo, tarjeta "Continúa" sin póster inclinado.

### Inicio en móvil (<640px)
- Arriba: logo, botón ghost `Bell`, avatar. Debajo, buscador sin pista de atajo.
- "Hola, Viviana." a 30px, frase corta "6 títulos este mes. Vas fuerte."
- 3 StatTile compactas (Total, Este mes, Media).
- Tarjeta horizontal "Continúa viendo": mini póster de 64px, título, "T3 · E6 de 10", barra de progreso y botón redondo primary con `Check`.
- Filas con scroll horizontal, pósters de 120px, sin flechas; las filas sangran hasta el borde derecho.
- **Barra inferior fija** (84px, `surface`, borde superior): Inicio, Buscar, botón "+" lima redondo de 48px en el centro, Listas, Perfil. Activa en `lime`.

### Ficha de un título en móvil
- Cabecera de 300px con la imagen de fondo y degradado hacia `bg`; botones redondos con fondo `scrim` para volver (`ChevronLeft`) y favorita (`Heart`).
- Póster de 104px montado sobre la cabecera, título 30px con punto lima, Badge "Serie" + "2022 · 3 temporadas".
- Bloques `surface` con borde: "Tu calificación" (texto del nivel + estrellas editables de 26px), "Temporada 3 · vas por el episodio 6" (segmentos por episodio, vistos en `lime`), "Mi nota".
- Botones abajo: "Marcar E6" (primary) y "A una lista" (secondary).

## Microcopy

| Momento | Texto |
| --- | --- |
| Buscador | ¿Ya la vi? Busca una peli o serie |
| Sin resultados | No está en tu diario. ¿Será que aún no la has visto? |
| Lista vacía | Esta lista está más vacía que un cine un lunes a las 10am. |
| Guardado | Listo, ya está en tu diario. |
| Borrar | ¿Seguro? Se irá también tu nota. |
| Serie en curso | Continúa donde lo dejaste |
| Pie | Sin spoilers. Sin algoritmos. Solo tus notas. |

Tono: tutear, frases cortas, humor ligero, nunca sarcasmo hacia la usuaria, cero spoilers.

## Accesibilidad

- Contraste mínimo 4.5:1 para texto (los tokens ya lo cumplen). Nunca texto blanco sobre `lime` u `orange`.
- Todo lo que tiene hover también funciona con teclado (`:focus-visible` / `:focus-within`).
- Pósters con `alt` o `aria-label` que incluya título, tipo y calificación.
- Botones solo con icono con `aria-label`. Estrellas editables como grupo de botones.
- `prefers-reduced-motion` respetado.

## Orden de construcción sugerido

1. Proyecto Vite + React, Tailwind v4, fuentes y tokens en `index.css`. Página de prueba con fondo, textos y un punto lima.
2. `Button` (3 variantes, tamaños, iconOnly) con lucide-react.
3. `Badge` y `StarRating` (primero solo lectura, luego editable con la animación pop).
4. `PosterCard` con hover, acciones y barra de progreso.
5. `MediaRow` con scroll, flechas y estado vacío.
6. `SearchBar` y `StatTile`.
7. Barra superior y layout de Inicio en escritorio con datos de ejemplo en un archivo `data.js`.
8. Tarjeta "Continúa donde lo dejaste".
9. Responsive: tablet y móvil con barra inferior.
10. Ficha del título en móvil con hoja/página y calificación editable.
11. Animaciones de carga (fade-up escalonado, shimmer de pósters) y toast.
12. Repaso de accesibilidad y `prefers-reduced-motion`.

Empecemos por el paso 1. Explícame qué vamos a hacer antes de darme el código.
