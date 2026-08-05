import {
    IonGrid,
    IonRow,
    IonCol,
} from "@ionic/react";

import {
    mapOutline,
    warningOutline,
    starOutline,
    personOutline,
} from "ionicons/icons";

import QuickActionCard from "./QuickActionCard";

const QuickActions = () => {
    return (
        <IonGrid>
            <IonRow>
                <IonCol size="6">
                    <QuickActionCard title="Mapa" icon={mapOutline} link="/map" />
                </IonCol>

                <IonCol size="6">
                    <QuickActionCard title="Reportar" icon={warningOutline} link="/report" />
                </IonCol>

            </IonRow>

            <IonRow>
                <IonCol size="6">
                    <QuickActionCard title="Favoritos" icon={starOutline} link="/favorites" />
                </IonCol>

                <IonCol size="6">
                    <QuickActionCard title="Perfil" icon={personOutline} link="/profile" />
                </IonCol>
            </IonRow>
        </IonGrid>
    );
};

export default QuickActions;