import { IonItem, IonLabel, IonList, IonText, } from "@ionic/react";

import { schoolOutline, mailOutline, } from "ionicons/icons";

import { IonIcon } from "@ionic/react";

interface Props {
    university: string;
    email: string;
}

const ProfileInfo = ({ university, email, }: Props) => {
    return (
        <IonList inset>

            <IonText>
                <h2 style={{ marginLeft: 16, fontWeight: "bold", }}>
                    Información
                </h2>
            </IonText>

            <IonItem>
                <IonIcon icon={schoolOutline} slot="start" />

                <IonLabel>
                    <p>Universidad</p>
                    <h3>{university}</h3>
                </IonLabel>
            </IonItem>

            <IonItem>
                <IonIcon icon={mailOutline} slot="start" />
                <IonLabel>
                    <p>Correo</p>
                    <h3>{email}</h3>
                </IonLabel>
            </IonItem>

        </IonList>
    );
};

export default ProfileInfo;