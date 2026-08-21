import { IonCard, IonCardContent, IonCol, IonGrid, IonRow, IonItem, IonLabel, IonList, IonListHeader, IonText } from "@ionic/react";
import { Report } from "../../types/Report";

interface Props {
    reports: Report[];
    frequentPlaces: number;
}

const ProfileStats = ({
    reports,
    frequentPlaces,
}: Props) => {
    const total = reports.length;
    const pending = reports.filter(r => r.status === 'Pendiente').length;
    const inProgress = reports.filter(r => r.status === 'En proceso').length;
    const resolved = reports.filter(r => r.status === 'Resuelto').length;

    const resolutionRate = total > 0 ? Math.round((resolved / total) * 100) : 0;

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const reportsThisMonth = reports.filter(r => {
        const d = new Date(r.createdAt);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    }).length;

    return (
        <>
            <IonListHeader>Resumen</IonListHeader>
            <IonCard>
                <IonCardContent>
                    <IonGrid>
                        <IonRow>
                            <IonCol size="6" className="ion-text-center">
                                <h2>{total}</h2>
                                <p>Total</p>
                            </IonCol>
                            <IonCol size="6" className="ion-text-center">
                                <h2 style={{ color: 'var(--ion-color-warning)' }}>{pending}</h2>
                                <p>Pendientes</p>
                            </IonCol>
                            <IonCol size="6" className="ion-text-center">
                                <h2 style={{ color: 'var(--ion-color-primary)' }}>{inProgress}</h2>
                                <p>En proceso</p>
                            </IonCol>
                            <IonCol size="6" className="ion-text-center">
                                <h2 style={{ color: 'var(--ion-color-success)' }}>{resolved}</h2>
                                <p>Resueltos</p>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonCardContent>
            </IonCard>

            <IonListHeader>Actividad</IonListHeader>
            <IonCard>
                <IonList>
                    <IonItem lines="full">
                        <IonLabel>Reportes este mes</IonLabel>
                        <IonText slot="end"><strong>{reportsThisMonth}</strong></IonText>
                    </IonItem>
                    <IonItem lines="full">
                        <IonLabel>Tasa de resolución</IonLabel>
                        <IonText slot="end" color="success"><strong>{resolutionRate}%</strong></IonText>
                    </IonItem>
                    <IonItem lines="none">
                        <IonLabel>Lugares frecuentes</IonLabel>
                        <IonText slot="end"><strong>{frequentPlaces}</strong></IonText>
                    </IonItem>
                </IonList>
            </IonCard>
        </>
    );
};

export default ProfileStats;