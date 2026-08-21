import { IonCard, IonCardContent, IonCol, IonGrid, IonRow, } from "@ionic/react";

interface Props {
    reports: number;
    frequentPlaces: number;
}

const ProfileStats = ({
    reports,
    frequentPlaces,
}: Props) => {
    return (
        <IonCard>
            <IonCardContent>

                <IonGrid>
                    <IonRow>

                        <IonCol size="6" className="ion-text-center">
                            <h2>📋</h2>
                            <h2>{reports}</h2>
                            <p>Reportes</p>
                        </IonCol>

                        <IonCol size="6" className="ion-text-center">
                            <h2>📍</h2>
                            <h2>{frequentPlaces}</h2>
                            <p>Lugares frec.</p>
                        </IonCol>

                    </IonRow>
                </IonGrid>

            </IonCardContent>
        </IonCard>
    );
};

export default ProfileStats;