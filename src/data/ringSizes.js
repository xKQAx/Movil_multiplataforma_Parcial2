/**
 * Tabla oficial de tallas (diámetro interior mm → USA).
 * Fuente: datos del profesor. NO equiespaciados — no regenerar con fórmula.
 * Object.freeze → array inmutable (Single Source of Truth).
 */
export const RING_SIZES = Object.freeze([
  Object.freeze({ talla: 1, diameterMm: 13.0, usa: 1 }),
  Object.freeze({ talla: 2, diameterMm: 13.4, usa: 2 }),
  Object.freeze({ talla: 3, diameterMm: 13.7, usa: 2.5 }),
  Object.freeze({ talla: 4, diameterMm: 14.0, usa: 3 }),
  Object.freeze({ talla: 5, diameterMm: 14.3, usa: 3.5 }),
  Object.freeze({ talla: 6, diameterMm: 14.6, usa: 3.75 }),
  Object.freeze({ talla: 7, diameterMm: 15.0, usa: 4 }),
  Object.freeze({ talla: 8, diameterMm: 15.3, usa: 4.5 }),
  Object.freeze({ talla: 9, diameterMm: 15.6, usa: 5 }),
  Object.freeze({ talla: 10, diameterMm: 15.9, usa: 5.25 }),
  Object.freeze({ talla: 11, diameterMm: 16.2, usa: 5.75 }),
  Object.freeze({ talla: 12, diameterMm: 16.5, usa: 6 }),
  Object.freeze({ talla: 13, diameterMm: 16.8, usa: 6.5 }),
  Object.freeze({ talla: 14, diameterMm: 17.2, usa: 7 }),
  Object.freeze({ talla: 15, diameterMm: 17.5, usa: 7.5 }),
  Object.freeze({ talla: 16, diameterMm: 17.8, usa: 7.75 }),
  Object.freeze({ talla: 17, diameterMm: 18.1, usa: 8 }),
  Object.freeze({ talla: 18, diameterMm: 18.4, usa: 8.5 }),
  Object.freeze({ talla: 19, diameterMm: 18.8, usa: 8.75 }),
  Object.freeze({ talla: 20, diameterMm: 19.1, usa: 9 }),
  Object.freeze({ talla: 21, diameterMm: 19.4, usa: 9.5 }),
  Object.freeze({ talla: 22, diameterMm: 19.7, usa: 10 }),
  Object.freeze({ talla: 23, diameterMm: 20.0, usa: 10.5 }),
  Object.freeze({ talla: 24, diameterMm: 20.3, usa: 10.75 }),
  Object.freeze({ talla: 25, diameterMm: 20.6, usa: 11 }),
  Object.freeze({ talla: 26, diameterMm: 21.0, usa: 11.5 }),
  Object.freeze({ talla: 27, diameterMm: 21.3, usa: 12 }),
  Object.freeze({ talla: 28, diameterMm: 21.6, usa: 12.5 }),
  Object.freeze({ talla: 29, diameterMm: 22.0, usa: 12.75 }),
  Object.freeze({ talla: 30, diameterMm: 22.3, usa: 13 }),
  Object.freeze({ talla: 31, diameterMm: 22.6, usa: 13.5 }),
  Object.freeze({ talla: 32, diameterMm: 22.9, usa: 13.75 }),
  Object.freeze({ talla: 33, diameterMm: 23.2, usa: 14 }),
  Object.freeze({ talla: 34, diameterMm: 23.5, usa: 14.5 }),
  Object.freeze({ talla: 35, diameterMm: 23.9, usa: 15 }),
  Object.freeze({ talla: 36, diameterMm: 24.2, usa: 15.5 }),
]);

export const MIN_DIAMETER_MM = 13.0;
export const MAX_DIAMETER_MM = 24.2;
