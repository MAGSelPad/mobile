import { IonItem, IonLabel, IonList, IonText, } from "@ionic/react";

import { informationCircleOutline, } from "ionicons/icons";

import { IonIcon } from "@ionic/react";

interface Props {
    version: string;
}

const AppInfo = ({ version }: Props) => {
    return (
        <IonList inset>

            <IonText>
                <h2 style={{ marginLeft: 16, fontWeight: "bold", }}>
                    Aplicación
                </h2>
            </IonText>

            <IonItem>
                <IonIcon icon={informationCircleOutline} slot="start" />
                <IonLabel>
                    <p>Versión</p>
                    <h3>{version}</h3>
                </IonLabel>
            </IonItem>

        </IonList>
    );
};

export default AppInfo;