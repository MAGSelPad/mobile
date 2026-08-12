import { IonCard, IonCardContent, IonCol, IonGrid, IonRow, } from "@ionic/react";

interface Props {
    reports: number;
    favorites: number;
}

const ProfileStats = ({
    reports,
    favorites,
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
                            <h2>⭐</h2>
                            <h2>{favorites}</h2>
                            <p>Favoritos</p>
                        </IonCol>

                    </IonRow>
                </IonGrid>

            </IonCardContent>
        </IonCard>
    );
};

export default ProfileStats;