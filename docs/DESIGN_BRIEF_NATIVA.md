# Design Brief — Tallas de Anillos (versión nativa Compose)

Documento de paridad visual y funcional para el equipo **Kotlin + Jetpack Compose**.  
Fuente de verdad: CSS/JSX del proyecto web Ionic React (`src/theme/variables.css`, `src/pages/Home.css`, componentes).  
**No inventar otra paleta ni tipografías distintas.**

---

## 1. Resumen de identidad

**Dirección visual:** *atelier / orfebrería contemporánea*.

La app debe sentirse como un taller de medición sobrio: tinta slate profunda (`#1F3347`), acentos teal metálico (`#0F766E`) y un toque champagne (`#A67C52`) apenas presente en brillos y atmósfera. Fondos en niebla fría (mist/paper), tipografía de display serifa (Fraunces) para títulos y cifras, UI sans (Outfit) para labels y controles. Nada de púrpura genérico, dark mode forzado ni neones: claridad, contraste alto en el selector de método, y cards blancas con sombra suave.

---

## 2. Prompt listo para pegar

```
Replicá la UI de “Tallas de Anillos” en Kotlin + Jetpack Compose con paridad visual y funcional respecto a la versión web Ionic.

IDENTIDAD: atelier / orfebrería contemporánea. NO inventes otra paleta.

COLORES (usar exactamente):
- Primary / ink: #1F3347 (toolbar, segment activo, botones filled, borde del anillo-guía)
- Primary shade (pressed): #1B2D3E | tint (hover): #354759
- Teal acento: #0F766E (eyebrow, unidad “mm”, slider activo, highlight de fila)
- Champagne (acento atmosférico): #A67C52 — solo en glow/halo sutil del círculo (rgba 0.35), no como color de marca dominante
- Mist fondo: #E6ECF1 | Paper: #F7FAFB | Surface cards: #FFFFFF
- Border: rgba(31,51,71,0.10)
- Success (exacta): #1F7A4D | shade #1B6B44
- Warning (aprox.): #B45309 | shade #9E4908
- Danger (errores): #B91C1C
- Medium / muted: #64748B | shade #58687A
- Light: #E8EEF2
- Dark: #1A2836
- Segment track: #D8E0E8 | label inactivo: #4A5C6E

TIPOGRAFÍA:
- Display: Fraunces (500/600/700) — títulos, toolbar brand, valores numéricos grandes
- UI: Outfit (400/500/600/700) — body, labels, botones, segment, tabla
- Fallback si no se embebe fuente: Georgia / sans-serif del sistema, pero preferí embeber Fraunces + Outfit

LAYOUT:
- Columna centrada tipo app-shell: maxWidth 480dp móvil; ~540dp tablet; ~560dp desktop/wide
- Radio cards: 14dp | botones: 10–11dp | segment track: 14–16dp | pills internos segment: 10–12dp
- Sombra card: 0 4 20 rgba(31,51,71,0.07) + borde 1dp atelier-border
- Toolbar: fondo #1F3347, texto blanco, altura ~56–60dp, título “Tallas de Anillos” en Fraunces 600

FONDO PANTALLA (aproximar en Compose con Brush):
- Base: linear 165° #E4EBF1 → #EEF3F6 → #E8F0F0
- Overlay radial teal suave arriba-centro + radial champagne suave a la derecha

SELECTOR DE MÉTODO (CRÍTICO — contraste alto):
- Track: fondo #D8E0E8, radio 14dp, borde rgba(31,51,71,0.14), padding 4dp, minHeight 48dp
- ACTIVO: indicador/fondo #1F3347, texto #FFFFFF, fontWeight Bold (700), sombra 0 2 10 rgba(31,51,71,0.32), opacity 1, radio interno 10dp
- INACTIVO: texto #4A5C6E, fontWeight Medium (500), opacity 0.72 — NO debe verse casi igual al activo
- Labels: “Ingresar diámetro” | “Medir con círculo” — Outfit ~0.82–1.0sp, sin ALL CAPS

BOTONES:
- Primario filled: fondo #1F3347, texto blanco, weight 700, altura ~46–48dp, sombra 0 3 12 rgba(31,51,71,0.28)
- Secundario outline: sin relleno dominante, borde 1.5–2dp rgba(100,116,139,0.55), texto #58687A, weight 600, sin sombra fuerte

RESULTADO:
- Card blanca, borde superior 3dp: success si exacta, warning si aprox.
- Títulos: “Talla encontrada” / “Medida aproximada”
- Badge: “Exacta” (success) / “Aprox.” (warning)
- Grid 3 columnas: Talla | Diámetro | USA — labels Outfit uppercase pequeños; valores Fraunces bold

CÍRCULO:
- Stage con rejilla sutil + gradiente paper; círculo con borde 3dp ink, halo champagne 1dp, agujero interior dashed teal
- Slider: barra inactiva rgba(ink,0.12), activa teal, knob ink

TABLA:
- Sticky header “Talla | Diámetro | USA”, fondo rgba(232,238,242,0.96)
- Zebra filas pares rgba(ink,0.025)
- Highlight activo: fondo rgba(teal,0.12) + barra izquierda 3dp teal

FUNCIONAL:
- Misma tabla T1–T36 (diámetros NO equiespaciados; copiar datos oficiales)
- Rango 13.0–24.2 mm; epsilon exacta 0.001 mm; empate → preferir diámetro inferior
- Dos métodos; al cambiar método limpiar resultado
- Strings UI en español exactamente como en la web

No uses Material purple, no dark theme por defecto, no inventes colores “cercanos”. Tokens literales arriba.
```

---

## 3. Tokens de diseño

### 3.1 Colores

| Token | Hex / valor | Uso |
|---|---|---|
| **primary / atelier-ink** | `#1F3347` | Toolbar, segment activo, botón primarios, borde anillo, tipografía principal |
| primary-shade | `#1B2D3E` | Estado pressed del primario |
| primary-tint | `#354759` | Estado hover del primario |
| primary-contrast | `#FFFFFF` | Texto sobre primary |
| **secondary / atelier-teal** | `#0F766E` | Eyebrow, “mm”, barra activa del slider, highlight de fila |
| secondary-shade | `#0D685F` | Variante oscura teal |
| secondary-tint | `#27847D` | Variante clara teal |
| **atelier-champagne** | `#A67C52` | Halo atmosférico del círculo (`rgba(166,124,82,0.35)`); no como fill dominante |
| **atelier-mist** | `#E6ECF1` | Fondo base Ionic / atmósfera |
| **atelier-paper** | `#F7FAFB` | Papeles / superficies secundarias |
| **atelier-surface** | `#FFFFFF` | Cards |
| **atelier-border** | `rgba(31, 51, 71, 0.10)` | Borde de cards y stage |
| **success** (exacta) | `#1F7A4D` | Borde superior / título / badge exacta |
| success-shade | `#1B6B44` | Valores dd en resultado exacto |
| **warning** (aprox.) | `#B45309` | Borde superior / título / badge / énfasis aprox. |
| warning-shade | `#9E4908` | Valores dd en resultado aproximado |
| danger | `#B91C1C` | Mensajes de error de validación |
| medium | `#64748B` | Textos secundarios, instrucciones |
| medium-shade | `#58687A` | Texto botón outline |
| light | `#E8EEF2` | Header de tabla (base blur) |
| dark | `#1A2836` | Variante oscura |
| segment-track | `#D8E0E8` | Pista del selector |
| segment-label-inactive | `#4A5C6E` | Texto inactivo del segment |
| text-on-dark | `#FFFFFF` | Toolbar / segment activo |

**Fondos de pantalla (gradientes — aproximar en Compose):**

- Móvil:  
  - radial ellipse ~80%×50% en `50% -10%`: `rgba(15,118,110,0.09)` → transparente  
  - radial ellipse ~60%×40% en `100% 30%`: `rgba(166,124,82,0.06)` → transparente  
  - linear `165deg`: `#E4EBF1` → `#EEF3F6` (42%) → `#E8F0F0`
- Desktop (≥1024): refuerzo similar con `#DFE7EE` / `#EEF3F6` / `#E6EFEF`

### 3.2 Tipografía

| Rol | Familia | Pesos | Tamaños de referencia |
|---|---|---|---|
| **Display** | **Fraunces** (opsz 9–144), fallback Georgia | 500, **600**, **700** | Toolbar brand ~1.15–1.28rem; títulos card ~1.2–1.28rem; input diámetro ~1.25–1.35rem; valores resultado ~1.35–1.45rem; “Diámetro: X mm” ~1.2–1.3rem |
| **UI** | **Outfit**, fallback Segoe UI / sans | 400, **500**, **600**, **700** | Body intro ~1–1.05rem; eyebrow 0.7rem uppercase tracking 0.12em; labels campo 0.8rem; segment ~0.82–1rem; botones weight 600–700; tabla header 0.68rem uppercase |

**Google Fonts (web de referencia):**  
`Fraunces:opsz,wght@9..144,500;600;700` + `Outfit:wght@400;500;600;700`

### 3.3 Radios, espaciados, shell, elevaciones

| Token | Valor |
|---|---|
| **atelier-radius** (cards / stage) | `14px` / 14dp |
| Botón border-radius | `10px` (móvil) / `11px` (≥768) |
| Segment track radius | `14px` / `16px` (≥768) |
| Segment pill (indicator) | `10px` / `12px` (≥768) |
| Badge radius | `6px` |
| Celdas grid resultado | `10px` |
| **atelier-max-width** (shell) | `480px` móvil; `540px` ≥768; `560px` ≥1024 |
| Padding shell bottom | ~2.25–2.75rem |
| Toolbar min-height | `56px` / `60px` (≥768) |
| Botón min-height | `46px` / `48px` (≥768) |
| Segment min-height | `48` / `56` / `60` (móvil / tablet / desktop) |
| Segment button min-height | `44` / `50` / `52` |
| Gap acciones botones | `0.65–0.75rem` |
| **atelier-shadow** (cards) | `0 4px 20px rgba(31,51,71,0.07)` + borde 1px |
| Sombra botón solid | `0 3px 10–12px rgba(31,51,71,0.22–0.28)` |
| Sombra segment activo | `0 2px 10px rgba(31,51,71,0.32)` |
| Outline button | sin box-shadow fuerte; border 1.5–2px |

---

## 4. Componentes clave — cómo deben verse

### 4.1 Header / título

- Toolbar **sólida** `#1F3347`, texto blanco, sin borde inferior.
- Título centrado/leading según Material, pero tipografía **Fraunces 600**, letter-spacing ~0.01em, tamaño ~1.15rem (móvil) / ~1.28rem (tablet).
- Texto exacto: **Tallas de Anillos**.

Debajo, intro:

- Eyebrow: **Atelier de medición** — Outfit 600, 0.7rem, uppercase, tracking amplio, color **teal** `#0F766E`.
- Descripción: *Determina la talla de tu anillo a partir de su diámetro interno.* — Outfit 400, ~1rem, ink con opacity ~0.88, line-height ~1.55.

### 4.2 Selector de método (activo vs inactivo) — detalle crítico

Fue un pain point en web: el estado activo e inactivo **deben contrastar de forma inequívoca**.

| Aspecto | Activo | Inactivo |
|---|---|---|
| Fondo / indicador | `#1F3347` a altura completa del pill | Transparente sobre track `#D8E0E8` |
| Texto | `#FFFFFF` | `#4A5C6E` |
| Font weight | **700** | **500** |
| Opacity | `1` | `0.72` |
| Sombra | `0 2px 10px rgba(31,51,71,0.32)` | Ninguna |
| Radio interno | 10–12dp | — |

Contenedor (track):

- Fondo `#D8E0E8`
- Border `1px solid rgba(31,51,71,0.14)`
- Border-radius 14–16dp
- Padding interno 4–5dp
- Sombras sutiles: inset `0 1px 2px rgba(31,51,71,0.06)` + highlight blanco suave
- minHeight 48–60dp

Labels (sin transform uppercase forzada):

1. **Ingresar diámetro**
2. **Medir con círculo**

Al cambiar de método: **limpiar el resultado** y animar la card del método (entrada suave ~320ms, translateY 8dp + fade).

En Compose: preferir `SegmentedButton` / `SingleChoiceSegmentedButtonRow` o un `TabRow` custom que pinte el indicador ink opaco; **evitar** chips grises casi idénticos.

### 4.3 Botón primario vs secundario

| | Primario | Secundario |
|---|---|---|
| Ejemplos | Consultar talla / Usar esta medida | Limpiar / Restablecer medida |
| Fill | Solid `#1F3347` | Outline transparente |
| Texto | Blanco, weight **700** | `#58687A`, weight **600** |
| Borde | Ninguno (o implícito) | 1.5–2px `rgba(100,116,139,0.55)` |
| Sombra | `0 3px 12px rgba(31,51,71,0.28)` | Ninguna / mínima |
| Altura | ~46–48dp | Igual |
| Radius | 10–11dp | Igual |
| Ancho | Full width (block), apilados en columna con gap ~0.65–0.75rem | Idem |
| textTransform | **none** (no ALL CAPS Material por defecto) | Idem |

### 4.4 Card de resultado (exacta vs aproximada)

Común a ambos:

- Card surface blanca, radius 14, sombra atelier, **borde superior 3dp** (no lateral).
- Animación entrada ~380ms (fade + translateY 10 + scale 0.98→1).
- Header: título Fraunces + badge Outfit uppercase pequeño (0.65rem, radius 6dp).
- Grid 3 columnas iguales con celdas radius 10dp.

| | Exacta | Aproximada |
|---|---|---|
| Clase mental | `ring-result--exact` | `ring-result--approx` |
| Borde top | `#1F7A4D` | `#B45309` |
| Fondo card | gradient 135° `rgba(31,122,77,0.06)` → transparent + blanco | ídem con `rgba(180,83,9,0.07)` |
| Título | **Talla encontrada** (color success) | **Medida aproximada** (color warning) |
| Badge | **Exacta** (success) | **Aprox.** (warning) |
| Celdas | bg `rgba(31,122,77,0.08)` borde success 12% | bg `rgba(180,83,9,0.08)` borde warning 12% |
| Valores (dd) | success-shade `#1B6B44` | warning-shade `#9E4908` |
| Nota extra | — | Párrafo muted explicando diferencia en mm; el valor de diferencia en **strong** color warning |

Campos del grid (labels uppercase muted):

- **Talla** → `T{n}`
- **Diámetro** → `{x.x} mm` (diámetro de tabla)
- **USA** → número USA

### 4.5 Círculo de medición (anillo-guía)

- Instrucciones muted ~0.9rem.
- **Stage:** minHeight ~240–280dp, padding ~1.25–1.5rem, radius 14, borde atelier-border, fondo con:
  - highlight radial blanco,
  - wash teal muy suave,
  - rejilla 15–16px a `rgba(31,51,71,0.035)`,
  - linear `#F4F7F9` → `#E8EEF2`,
  - inset highlight blanco.
- **Visual del anillo:** círculo cuyo diámetro en px = `diameterMm * pixelsPerMm` (calibración de pantalla); borde **3dp ink**; fill radial (brillo esquina superior); box-shadow: halo champagne 1dp + sombra exterior + inset blanco + inset suave; **anillo interior dashed** teal a inset 18%.
- Label: `Diámetro: {x.x} mm` en Fraunces 600.
- Slider: barra inactiva `rgba(31,51,71,0.12)`, activa teal, knob/pin ink; step 0.1; rango 13.0–24.2; default **18.1** (T17).
- Nota opcional si calibración estimada: *Calibración estimada: no es un instrumento profesional de precisión.*

### 4.6 Tabla de tallas

- Card título: **Tabla de tallas** (Fraunces ~1.15rem).
- Scroll max-height ~`min(52vh, 420dp)` (tablet un poco más alto).
- **Sticky header:** grid `1fr | 1.2fr | 0.8fr`, padding ~0.65×1rem, Outfit 700 uppercase 0.68rem tracking 0.07em, fondo `rgba(232,238,242,0.96)` + blur ~6dp, borde inferior atelier-border. Columnas: **Talla | Diámetro | USA**.
- Filas: minHeight ~44dp; **zebra** en pares `rgba(31,51,71,0.025)`.
- Celda talla en Fraunces 600 (`T1`…`T36`); diámetro `x.x mm`; USA en note medium.
- **Highlight** (talla del resultado actual): fondo `rgba(15,118,110,0.12)`, barra izquierda 3dp teal, texto/strong teal weight 700.

---

## 5. Textos UI obligatorios (paridad funcional)

Copiar literalmente (español):

| Contexto | String |
|---|---|
| App / toolbar | `Tallas de Anillos` |
| Eyebrow | `Atelier de medición` |
| Intro | `Determina la talla de tu anillo a partir de su diámetro interno.` |
| Segment A | `Ingresar diámetro` |
| Segment B | `Medir con círculo` |
| Título card método 1 | `Ingresar diámetro` |
| Título card método 2 | `Medir con círculo` |
| Label input | `Diámetro interno` |
| Unidad | `mm` |
| Placeholder rango | `13.0 – 24.2` |
| CTA método 1 | `Consultar talla` |
| CTA limpiar | `Limpiar` |
| Instrucciones círculo | `Coloca el anillo sobre la pantalla y ajusta el círculo hasta que coincida con el diámetro interno del anillo.` |
| Prefijo medida | `Diámetro: {x.x} mm` |
| CTA círculo | `Usar esta medida` |
| Reset círculo | `Restablecer medida` |
| Nota calibración | `Calibración estimada: no es un instrumento profesional de precisión.` |
| Resultado exacto | `Talla encontrada` + badge `Exacta` |
| Resultado aprox. | `Medida aproximada` + badge `Aprox.` |
| Labels resultado | `Talla` / `Diámetro` / `USA` |
| Nota aprox. (patrón) | `Se eligió la talla de referencia más cercana a tu medida de {x.x} mm. Diferencia aproximada: {±y.yy} mm respecto al diámetro de tabla ({z.z} mm).` |
| Título tabla | `Tabla de tallas` |
| Headers tabla | `Talla` / `Diámetro` / `USA` |
| Errores típicos | `Ingresá un diámetro.` / `El diámetro debe ser un número válido.` / `El diámetro debe ser mayor o igual a 13.0 mm.` / `El diámetro debe ser menor o igual a 24.2 mm.` / `Diámetro fuera de rango (13–24.2 mm).` |

---

## 6. Paridad funcional (no solo visual)

1. **Tabla oficial T1–T36** — diámetros **no equiespaciados**; copiar el dataset de `src/data/ringSizes.js` (no regenerar con fórmula). Rango: **13.0–24.2 mm**.
2. **Misma función conceptual** `calculateRingSize(diameterMm)`:
   - Validar número finito y rango.
   - Elegir la fila con menor `|diff|`.
   - Empate: preferir la de **diámetro inferior**.
   - `isExact` si `|diff| ≤ 0.001` (epsilon).
   - Devolver `talla`, `diameterMm` (de tabla), `usa`, `differenceMm` (medida − tabla; 0 si exacta).
3. **Dos métodos** que alimentan el mismo cálculo:
   - Entrada numérica (aceptar coma o punto decimal).
   - Círculo + slider (step 0.1, default 18.1).
4. **Un solo resultado en pantalla**; al cambiar segment → `result = null`.
5. **Tabla siempre visible** (solo lectura) con highlight de la talla del último resultado OK.
6. Formato visual: tallas como `T{n}`; diámetros con 1 decimal en UI; diferencia aprox. con 2 decimales y signo `+` si positiva.

---

## 7. Notas para Compose

- **ColorScheme / tema custom:** mapear `primary = Color(0xFF1F3347)`, `secondary = Color(0xFF0F766E)`, `background` mist, `surface` blanco, `error = #B91C1C`; exponer `success` y `warning` como colores extendidos (no forzar solo Material3 defaults).
- **Typography:** `FontFamily` Fraunces para `display*` / títulos / métricas; Outfit para `body*` / `label*` / botones. Desactivar `allCaps` en botones (`Text` sin `uppercase`).
- **Modifier:** `Modifier.fillMaxWidth().widthIn(max = 480.dp)` (o 540/560 según breakpoint) + `padding` vertical; cards con `shadow` + `border` + `RoundedCornerShape(14.dp)`.
- **Selector:** `SingleChoiceSegmentedButtonRow` / custom `Box` con `AnimatedContent` o indicator; el selected debe ser **ink opaco + texto blanco**, no un gris leve.
- **Slider:** `SliderDefaults.colors(activeTrackColor = teal, thumbColor = ink, inactiveTrackColor = ink.copy(alpha=0.12f))`.
- **Tabla:** `LazyColumn` con header sticky (`stickyHeader`); zebra con índice par; highlight con `Modifier.drawBehind` / borderStart 3.dp teal.
- **Fondos:** `Brush.linearGradient` + `Brush.radialGradient` apilados en un `Box` detrás del contenido (los valores exactos del CSS son orientativos; priorizar la sensación mist + wash teal/champagne).
- **Fuentes:** embeber TTF/OTF de Fraunces y Outfit en `res/font` (mismas familias que la web).
- **Datos:** portar `RING_SIZES` como lista inmutable en Kotlin; tests de paridad contra casos exactos (p.ej. 18.1 → T17 exacta) y aproximados con empate.

---

## Referencia de archivos web

| Qué | Archivo |
|---|---|
| Tokens globales / botones Ionic | `src/theme/variables.css` |
| Shell, fondo, segment | `src/pages/Home.css` + `Home.jsx` |
| Input + CTAs | `src/components/DiameterInput.css` / `.jsx` |
| Círculo | `src/components/RingCircle.css` / `.jsx` |
| Resultado | `src/components/RingResult.css` / `.jsx` |
| Tabla | `src/components/RingTable.css` / `.jsx` |
| Cálculo | `src/utils/ringCalculator.js` |
| Dataset | `src/data/ringSizes.js` |
| Fuentes | `index.html` (Google Fonts) |

---

*Brief generado a partir de los estilos reales del repo. Cualquier duda de color: priorizar hex de `variables.css` sobre aproximaciones Material.*
