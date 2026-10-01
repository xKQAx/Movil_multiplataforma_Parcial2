import {
  IonBadge,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonText,
} from '@ionic/react';
import './RingResult.css';

/**
 * Resultado unificado para ambos métodos de medición.
 * Muestra talla exacta o la referencia más cercana (aproximada).
 */
export default function RingResult({ result }) {
  if (!result?.ok) {
    return null;
  }

  const {
    isExact,
    talla,
    diameterMm,
    usa,
    differenceMm,
    measuredDiameterMm,
  } = result;

  const title = isExact ? 'Talla encontrada' : 'Medida aproximada';
  const badgeColor = isExact ? 'success' : 'warning';

  return (
    <IonCard className={`ring-result ${isExact ? 'ring-result--exact' : 'ring-result--approx'}`}>
      <IonCardHeader>
        <div className="ring-result__header">
          <IonCardTitle>{title}</IonCardTitle>
          <IonBadge color={badgeColor}>{isExact ? 'Exacta' : 'Aprox.'}</IonBadge>
        </div>
      </IonCardHeader>

      <IonCardContent>
        <dl className="ring-result__grid">
          <div>
            <dt>Talla</dt>
            <dd>T{talla}</dd>
          </div>
          <div>
            <dt>Diámetro</dt>
            <dd>{Number(diameterMm).toFixed(1)} mm</dd>
          </div>
          <div>
            <dt>USA</dt>
            <dd>{usa}</dd>
          </div>
        </dl>

        {!isExact && (
          <IonText color="medium">
            <p className="ring-result__approx-note">
              Se eligió la talla de referencia más cercana
              {measuredDiameterMm != null && (
                <>
                  {' '}
                  a tu medida de {Number(measuredDiameterMm).toFixed(1)} mm
                </>
              )}
              . Diferencia aproximada:{' '}
              <strong>
                {differenceMm > 0 ? '+' : ''}
                {Number(differenceMm).toFixed(2)} mm
              </strong>
              {' '}respecto al diámetro de tabla ({Number(diameterMm).toFixed(1)} mm).
            </p>
          </IonText>
        )}
      </IonCardContent>
    </IonCard>
  );
}
