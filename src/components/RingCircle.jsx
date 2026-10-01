import { useMemo, useState } from 'react';
import { IonButton, IonRange, IonText } from '@ionic/react';
import { calculateRingSize } from '../utils/ringCalculator';
import { MIN_DIAMETER_MM, MAX_DIAMETER_MM } from '../data/ringSizes';
import {
  getPixelsPerMm,
  isEstimatedCalibration,
} from '../utils/screenCalibration';
import './RingCircle.css';

/** Diámetro inicial razonable: T17 = 18.1 mm */
const DEFAULT_DIAMETER_MM = 18.1;

/**
 * Método 2: medición visual con círculo calibrado (diámetro, no radio).
 * El cálculo de talla se delega solo a calculateRingSize.
 */
export default function RingCircle({ onResult }) {
  const [diameterMm, setDiameterMm] = useState(DEFAULT_DIAMETER_MM);
  const pixelsPerMm = useMemo(() => getPixelsPerMm(), []);
  const sizePx = diameterMm * pixelsPerMm;

  const handleUseMeasure = () => {
    const result = calculateRingSize(diameterMm);
    if (!result.ok) {
      onResult?.(null);
      return;
    }
    onResult?.({ ...result, measuredDiameterMm: diameterMm });
  };

  const handleReset = () => {
    setDiameterMm(DEFAULT_DIAMETER_MM);
    onResult?.(null);
  };

  return (
    <div className="ring-circle">
      <IonText color="medium">
        <p className="ring-circle__instructions">
          Coloca el anillo sobre la pantalla y ajusta el círculo hasta que
          coincida con el diámetro interno del anillo.
        </p>
      </IonText>

      <div className="ring-circle__stage">
        <div
          className="ring-circle__visual"
          style={{
            width: `${sizePx}px`,
            height: `${sizePx}px`,
          }}
          aria-hidden="true"
        />
      </div>

      <p className="ring-circle__diameter">
        Diámetro: {diameterMm.toFixed(1)} mm
      </p>

      <IonRange
        min={MIN_DIAMETER_MM}
        max={MAX_DIAMETER_MM}
        step={0.1}
        value={diameterMm}
        pin
        pinFormatter={(v) => `${Number(v).toFixed(1)}`}
        onIonInput={(e) => setDiameterMm(Number(e.detail.value))}
        aria-label="Ajustar diámetro del círculo"
      />

      {isEstimatedCalibration() && (
        <IonText color="medium">
          <p className="ring-circle__note">
            Calibración estimada: no es un instrumento profesional de precisión.
          </p>
        </IonText>
      )}

      <div className="ring-circle__actions">
        <IonButton expand="block" onClick={handleUseMeasure}>
          Usar esta medida
        </IonButton>
        <IonButton expand="block" fill="outline" color="medium" onClick={handleReset}>
          Restablecer medida
        </IonButton>
      </div>
    </div>
  );
}
