import { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonText,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonSegment,
  IonSegmentButton,
  IonLabel,
} from '@ionic/react';
import DiameterInput from '../components/DiameterInput';
import RingCircle from '../components/RingCircle';
import RingResult from '../components/RingResult';
import RingTable from '../components/RingTable';
import './Home.css';

/**
 * Pantalla principal: orquesta métodos, resultado y tabla.
 * Estado de resultado centralizado (Single Source of Truth en UI).
 */
export default function Home() {
  const [method, setMethod] = useState('diameter');
  const [result, setResult] = useState(null);

  const handleMethodChange = (value) => {
    setMethod(value);
    setResult(null);
  };

  return (
    <IonPage>
      <IonHeader className="home-header">
        <IonToolbar color="primary" className="home-toolbar">
          <IonTitle>
            <span className="home-toolbar__brand">Tallas de Anillos</span>
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="home-content">
        <div className="home-shell">
          <section className="home-intro ion-padding">
            <p className="home-intro__eyebrow">Atelier de medición</p>
            <IonText>
              <p className="home-intro__desc">
                Determina la talla de tu anillo a partir de su diámetro interno.
              </p>
            </IonText>

            <IonSegment
              value={method}
              onIonChange={(e) => handleMethodChange(e.detail.value)}
              className="home-segment"
              color="primary"
            >
              <IonSegmentButton value="diameter">
                <IonLabel>Ingresar diámetro</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="circle">
                <IonLabel>Medir con círculo</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </section>

          <div className="home-body ion-padding-horizontal ion-padding-bottom">
            {method === 'diameter' && (
              <IonCard className="home-method-card home-method-card--enter" key="diameter">
                <IonCardHeader>
                  <IonCardTitle>Ingresar diámetro</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <DiameterInput onResult={setResult} />
                </IonCardContent>
              </IonCard>
            )}

            {method === 'circle' && (
              <IonCard className="home-method-card home-method-card--enter" key="circle">
                <IonCardHeader>
                  <IonCardTitle>Medir con círculo</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <RingCircle onResult={setResult} />
                </IonCardContent>
              </IonCard>
            )}

            <RingResult result={result} />
            <RingTable highlightTalla={result?.ok ? result.talla : undefined} />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
