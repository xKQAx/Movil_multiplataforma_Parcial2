import { Capacitor } from '@capacitor/core';

/**
 * Estimación de píxeles por milímetro para el círculo de medición.
 * Device API no expone DPI real; usamos la heurística CSS 96 DPI.
 * En nativo se aplica el mismo fallback (calibración estimada, no metrológica).
 *
 * @returns {number} píxeles CSS por milímetro (aproximado)
 */
export function getPixelsPerMm() {
  const dpr =
    typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;

  // Capacitor.isNativePlatform() deja el camino listo para calibración real futura.
  if (Capacitor.isNativePlatform()) {
    return (96 * dpr) / 25.4;
  }

  return (96 * dpr) / 25.4;
}

/** Indica si la calibración es solo estimada (siempre en esta fase). */
export function isEstimatedCalibration() {
  return true;
}
