import {
  RING_SIZES,
  MIN_DIAMETER_MM,
  MAX_DIAMETER_MM,
} from '../data/ringSizes';

/** Tolerancia para considerar coincidencia exacta (evita errores de float). */
const EPSILON_MM = 0.001;

/**
 * Calcula la talla de anillo más cercana al diámetro dado.
 * Usada por ambos métodos de medición (entrada numérica y círculo).
 *
 * Empate en |diff|: se prefiere la talla inferior (menor diámetro).
 *
 * @param {number} diameterMm
 * @returns {{ ok: boolean, error?: string, isExact?: boolean, talla?: number, diameterMm?: number, usa?: number, differenceMm?: number }}
 */
export function calculateRingSize(diameterMm) {
  const value = Number(diameterMm);

  if (!Number.isFinite(value)) {
    return { ok: false, error: 'El diámetro debe ser un número válido.' };
  }

  if (value < MIN_DIAMETER_MM || value > MAX_DIAMETER_MM) {
    return {
      ok: false,
      error: `Diámetro fuera de rango (${MIN_DIAMETER_MM}–${MAX_DIAMETER_MM} mm).`,
    };
  }

  let best = RING_SIZES[0];
  let bestDiff = Math.abs(value - best.diameterMm);

  for (let i = 1; i < RING_SIZES.length; i++) {
    const candidate = RING_SIZES[i];
    const diff = Math.abs(value - candidate.diameterMm);

    // Menor |diff|; en empate, preferir diámetro inferior (ya recorrido en orden).
    if (diff < bestDiff - EPSILON_MM) {
      best = candidate;
      bestDiff = diff;
    } else if (Math.abs(diff - bestDiff) <= EPSILON_MM) {
      if (candidate.diameterMm < best.diameterMm) {
        best = candidate;
        bestDiff = diff;
      }
    }
  }

  const isExact = bestDiff <= EPSILON_MM;

  return {
    ok: true,
    isExact,
    talla: best.talla,
    diameterMm: best.diameterMm,
    usa: best.usa,
    differenceMm: isExact ? 0 : Number((value - best.diameterMm).toFixed(3)),
  };
}
