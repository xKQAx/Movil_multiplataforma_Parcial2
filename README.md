# Tallas de Anillos

Aplicación móvil multiplataforma que determina la **talla de un anillo** a partir de su diámetro interno (mm). Ofrece dos métodos de medición (entrada numérica y círculo en pantalla) y muestra el resultado junto con la tabla oficial de tallas.

Proyecto académico (Parcial 2) — Ionic React + Capacitor para Android.

---

## Stack tecnológico

| Tecnología | Uso |
|---|---|
| **React** (JSX) | UI y estado de la aplicación |
| **JavaScript** | Lógica de cálculo y datos |
| **HTML / JSX** | Estructura de pantallas |
| **CSS** | Estilos (tema Ionic + hojas propias) |
| **Ionic React** | Componentes nativos móviles (header, cards, segment, etc.) |
| **Vite** | Dev server y build de producción |
| **Capacitor 6** | Empaquetado nativo Android |
| **Android** | Plataforma nativa generada en `android/` |

---

## Requisitos previos

### Obligatorios (web)

- **Node.js** 18+ (recomendado LTS; verificado con Node 22)
- **npm** 9+

### Para empaquetar / ejecutar en Android

- **Android Studio** (incluye Android SDK y emulador)
- **JDK 17** (el que suele venir con Android Studio o Temurin 17)
- Variables de entorno típicas:
  - `JAVA_HOME` → carpeta del JDK 17
  - `ANDROID_HOME` / `ANDROID_SDK_ROOT` → ruta del Android SDK

> **Nota de entorno (esta máquina):** al configurar Capacitor se detectó que **Java no está en el PATH** y **Android Studio / SDK no están instalados**. La carpeta nativa `android/` **sí fue generada** con `npx cap add android`. El build/run nativo (Gradle, emulador, APK) requiere instalar Android Studio y JDK 17 en el equipo.

---

## Instalación de dependencias

En la raíz del proyecto:

```bash
npm install
```

---

## Ejecutar en el navegador (desarrollo)

```bash
npm run dev
```

Abre la URL que muestra Vite (por defecto `http://localhost:5173`). Ideal para probar UI y cálculo sin Android.

---

## Build web (producción)

```bash
npm run build
```

Genera la carpeta `dist/`, que Capacitor usa como `webDir` (ver `capacitor.config.json`).

Vista previa local del build:

```bash
npm run preview
```

---

## Scripts útiles (`package.json`)

| Script | Comando | Descripción |
|---|---|---|
| `dev` | `npm run dev` | Servidor de desarrollo Vite |
| `build` | `npm run build` | Build web → `dist/` |
| `preview` | `npm run preview` | Previsualizar el build |
| `sync` | `npm run sync` | `build` + `npx cap sync` (todas las plataformas) |
| `sync:android` | `npm run sync:android` | `build` + sync solo Android |
| `open:android` | `npm run open:android` | Abrir el proyecto en Android Studio |

---

## Configurar Capacitor / Android

### Configuración actual (`capacitor.config.json`)

- **appId:** `com.uni.tallasdeanillos`
- **appName:** `Tallas de Anillos`
- **webDir:** `dist`

### Agregar la plataforma Android (ya hecho en este repo)

Si en otro clon no existiera `android/`:

```bash
npm run build
npx cap add android
```

### Sincronizar web → Android

Tras cada cambio relevante en el código web:

```bash
npm run sync:android
```

O de forma manual:

```bash
npm run build
npx cap sync android
```

Esto copia `dist/` a los assets nativos y actualiza plugins (p. ej. `@capacitor/device`).

---

## Abrir en Android Studio

```bash
npx cap open android
```

(o `npm run open:android`)

Requiere Android Studio instalado. La primera vez puede pedir descargar SDK, aceptar licencias y sincronizar Gradle.

---

## Ejecutar en emulador

1. Abre Android Studio → **Device Manager** y crea/inicia un AVD (emulador).
2. Abre el proyecto con `npx cap open android`.
3. Espera a que Gradle termine (**Sync Project with Gradle Files** si hace falta).
4. Selecciona el emulador en la barra de herramientas y pulsa **Run** (▶).

Flujo recomendado antes de Run:

```bash
npm run sync:android
npx cap open android
```

---

## Ejecutar en dispositivo físico (USB debugging)

1. En el teléfono: **Ajustes → Opciones de desarrollador → Depuración USB** activada.
2. Conecta el USB y acepta la autorización de depuración.
3. Verifica que el PC detecta el dispositivo (`adb devices`).
4. En Android Studio, selecciona el dispositivo físico y pulsa **Run** (▶).

Antes de instalar, sincroniza:

```bash
npm run sync:android
```

---

## Generar APK

### Opción A — Android Studio (recomendada para entrega firmada)

1. `npm run sync:android`
2. `npx cap open android`
3. Menú **Build → Generate Signed Bundle / APK…**
4. Elige **APK** (o **Android App Bundle** para Play Store) y sigue el asistente (keystore).

### Opción B — Gradle (APK debug, sin firmar para release)

En una terminal, desde la carpeta `android/`:

```bash
# Windows
.\gradlew.bat assembleDebug

# macOS / Linux
./gradlew assembleDebug
```

El APK debug suele quedar en:

`android/app/build/outputs/apk/debug/app-debug.apk`

> Si Gradle falla por falta de JDK/SDK, instala Android Studio + JDK 17 y vuelve a intentar.

---

## Estructura de carpetas del proyecto

```
Parcial2/
├── android/                 # Proyecto nativo Capacitor (entregar; NO ignorar en git)
├── dist/                    # Build web (generado; ignorado en git)
├── node_modules/            # Dependencias (ignorado)
├── public/                  # Assets estáticos públicos
├── src/
│   ├── components/          # UI reutilizable
│   │   ├── DiameterInput.*  # Método 1: ingreso de diámetro (mm)
│   │   ├── RingCircle.*     # Método 2: círculo calibrado en pantalla
│   │   ├── RingResult.*     # Presentación del resultado
│   │   └── RingTable.*      # Tabla de tallas
│   ├── data/
│   │   └── ringSizes.js     # Tabla oficial (Single Source of Truth)
│   ├── pages/
│   │   └── Home.*           # Pantalla principal (métodos + resultado)
│   ├── theme/
│   │   └── variables.css    # Variables de tema Ionic
│   ├── utils/
│   │   ├── ringCalculator.js      # calculateRingSize (lógica compartida)
│   │   └── screenCalibration.js   # px ↔ mm aproximado para el círculo
│   ├── App.jsx
│   └── main.jsx
├── capacitor.config.json    # appId, appName, webDir
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## Métodos de medición y lógica compartida

La app ofrece **dos métodos**:

1. **Ingresar diámetro** — el usuario escribe el diámetro interno en milímetros.
2. **Medir con círculo** — un círculo en pantalla se ajusta al tamaño del anillo; se convierte de píxeles a mm con una calibración aproximada.

Ambos métodos convergen en la misma función:

```js
calculateRingSize(diameterMm)
```

definida en `src/utils/ringCalculator.js`. Esa función:

- Valida el rango permitido (según `MIN_DIAMETER_MM` / `MAX_DIAMETER_MM` en `ringSizes.js`).
- Busca la talla más cercana en la tabla oficial.
- En caso de empate de distancia, prefiere la talla de **menor diámetro**.
- Devuelve talla, diámetro de referencia, equivalencia USA y diferencia en mm.

La tabla de datos vive en `src/data/ringSizes.js` (inmutable) y **no** se regenera con fórmulas: son los datos oficiales del curso.

### Calibración del círculo (importante)

La conversión píxeles → milímetros del método visual es **aproximada**. Depende de la densidad de pantalla (`devicePixelRatio` y estimaciones). **No es un instrumento profesional de metrología**; sirve para demo académica y orientación, no para joyería de precisión.

---

## Compatibilidad con futura versión nativa Kotlin

Esta implementación Ionic/Capacitor está pensada para coexistir o migrar a una app **nativa Android (Kotlin)** con:

- Los **mismos datos** de tallas (`ringSizes`)
- Los **mismos rangos** de diámetro válidos
- La **misma lógica** de cercanía / empates (`calculateRingSize`)
- Los **mismos textos** de UI y mensajes de error

Así se mantiene paridad funcional entre la versión híbrida y una eventual versión 100 % nativa.

---

## Troubleshooting breve

| Problema | Qué revisar |
|---|---|
| `npm run build` falla | `npm install`; Node 18+; errores de sintaxis en `src/` |
| `npx cap sync` no encuentra `dist` | Ejecutar primero `npm run build` (`webDir` = `dist`) |
| `cap open android` no abre nada | Instalar Android Studio y asociar el comando |
| Gradle / JDK errors | Instalar **JDK 17**, definir `JAVA_HOME`, reiniciar terminal |
| SDK / `local.properties` | Abrir el proyecto en Android Studio para que genere el SDK path |
| Emulador lento o no arranca | Habilitar virtualización (Hyper-V / WHPX); crear AVD con imagen reciente |
| Cambios web no se ven en la app | Volver a correr `npm run sync:android` y reinstalar/Run |
| Dispositivo no aparece | USB debugging, drivers OEM, `adb devices`, cable de datos |

### Estado Capacitor en este entorno

| Paso | Estado |
|---|---|
| Dependencias Capacitor en `package.json` | OK |
| `capacitor.config.json` | OK |
| `npm run build` | OK |
| `npx cap add android` → carpeta `android/` | OK (generada) |
| `npx cap sync android` | OK |
| Build nativo Gradle / emulador / APK | **Pendiente de Android Studio + JDK 17** en la máquina |

---

## Resumen rápido para el examen

```bash
npm install
npm run dev                 # probar en navegador
npm run sync:android        # build + sync a Android
npx cap open android        # abrir en Android Studio → Run
```
