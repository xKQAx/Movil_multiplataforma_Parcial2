import { useState } from 'react';
import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonText,
  IonNote,
} from '@ionic/react';
import { calculateRingSize } from '../utils/ringCalculator';
import { MIN_DIAMETER_MM, MAX_DIAMETER_MM } from '../data/ringSizes';
import './DiameterInput.css';

/**
 * Método 1: entrada numérica de diámetro interno (mm).
 * Delega el cálculo exclusivamente a calculateRingSize (SRP).
 */
export default function DiameterInput({ onResult }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const validate = (raw) => {
    const trimmed = String(raw ?? '').trim();

    if (trimmed === '') {
      return 'Ingresá un diámetro.';
    }

    const num = Number(trimmed.replace(',', '.'));
    if (!Number.isFinite(num)) {
      return 'El diámetro debe ser un número válido.';
    }

    if (num < MIN_DIAMETER_MM) {
      return `El diámetro debe ser mayor o igual a ${MIN_DIAMETER_MM.toFixed(1)} mm.`;
    }

    if (num > MAX_DIAMETER_MM) {
      return `El diámetro debe ser menor o igual a ${MAX_DIAMETER_MM.toFixed(1)} mm.`;
    }

    return null;
  };

  const handleConsult = () => {
    const validationError = validate(value);
    if (validationError) {
      setError(validationError);
      onResult?.(null);
      return;
    }

    const num = Number(String(value).trim().replace(',', '.'));
    const result = calculateRingSize(num);

    if (!result.ok) {
      setError(result.error);
      onResult?.(null);
      return;
    }

    setError('');
    onResult?.({ ...result, measuredDiameterMm: num });
  };

  const handleClear = () => {
    setValue('');
    setError('');
    onResult?.(null);
  };

  return (
    <div className="diameter-input">
      <IonItem lines="full" className="diameter-input__field">
        <IonLabel position="stacked">Diámetro interno</IonLabel>
        <IonInput
          type="number"
          inputMode="decimal"
          step="0.1"
          min={MIN_DIAMETER_MM}
          max={MAX_DIAMETER_MM}
          placeholder={`${MIN_DIAMETER_MM.toFixed(1)} – ${MAX_DIAMETER_MM.toFixed(1)}`}
          value={value}
          onIonInput={(e) => {
            setValue(e.detail.value ?? '');
            if (error) setError('');
          }}
        />
        <IonNote slot="end" className="diameter-input__unit">
          mm
        </IonNote>
      </IonItem>

      {error && (
        <IonText color="danger" className="diameter-input__error">
          <p>{error}</p>
        </IonText>
      )}

      <div className="diameter-input__actions">
        <IonButton expand="block" onClick={handleConsult}>
          Consultar talla
        </IonButton>
        <IonButton expand="block" fill="outline" color="medium" onClick={handleClear}>
          Limpiar
        </IonButton>
      </div>
    </div>
  );
}
