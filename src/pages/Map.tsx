import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import PageHeader from '../components/common/PageHeader';
import CampusMap from "../components/map/CampusMap";

const Map: React.FC = () => {
  return (
    <IonPage>
      <PageHeader title="Mapa" />
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Mapa</IonTitle>
          </IonToolbar>
        </IonHeader>
        <CampusMap />
      </IonContent>
    </IonPage>
  );
};

export default Map;
