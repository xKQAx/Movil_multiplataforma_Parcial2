import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
} from '@ionic/react';
import { RING_SIZES } from '../data/ringSizes';
import './RingTable.css';

/**
 * Tabla de solo lectura con las 36 tallas oficiales.
 * Opcionalmente resalta la talla del último resultado.
 */
export default function RingTable({ highlightTalla }) {
  return (
    <IonCard className="ring-table">
      <IonCardHeader>
        <IonCardTitle>Tabla de tallas</IonCardTitle>
      </IonCardHeader>
      <IonCardContent className="ion-no-padding">
        <div className="ring-table__scroll">
          <div className="ring-table__head">
            <span>Talla</span>
            <span>Diámetro</span>
            <span>USA</span>
          </div>
          <IonList lines="full" className="ring-table__list">
            {RING_SIZES.map((row) => {
              const isHighlighted = highlightTalla === row.talla;
              return (
                <IonItem
                  key={row.talla}
                  className={isHighlighted ? 'ring-table__row--active' : undefined}
                  detail={false}
                >
                  <IonLabel>
                    <div className="ring-table__row">
                      <strong>T{row.talla}</strong>
                      <span>{row.diameterMm.toFixed(1)} mm</span>
                      <IonNote color="medium">{row.usa}</IonNote>
                    </div>
                  </IonLabel>
                </IonItem>
              );
            })}
          </IonList>
        </div>
      </IonCardContent>
    </IonCard>
  );
}
