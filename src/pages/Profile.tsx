import { useState } from "react";
import { IonContent, IonPage, useIonViewWillEnter, IonListHeader, IonCard, IonList, IonItem, IonLabel, IonBadge, IonButton, IonIcon } from "@ionic/react";
import { arrowForwardOutline } from 'ionicons/icons';

import PageHeader from "../components/common/PageHeader";

import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileStats from "../components/profile/ProfileStats";
import ProfileInfo from "../components/profile/ProfileInfo";
import AppInfo from "../components/profile/AppInfo";

import { frequentPlacesService } from "../services/frequentPlacesService";
import { reportService } from "../services/reportService";
import { Report } from "../types/Report";
import { places } from "../data/places";

const Profile = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [frequentPlaces, setFrequentPlaces] = useState(0);

  useIonViewWillEnter(() => {
    setReports(reportService.getReports());
    setFrequentPlaces(frequentPlacesService.getTotalFrequentPlaces());
  });

  const user = {
    name: "Estudiante ESPOL",
    university: "ESPOL",
    email: "estudiante@espol.edu.ec",
    image: undefined,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
        case 'Pendiente': return 'warning';
        case 'En proceso': return 'primary';
        case 'Resuelto': return 'success';
        default: return 'medium';
    }
  };

  const recentReports = [...reports]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  return (
    <IonPage>
      <PageHeader title="Perfil" />
      <IonContent fullscreen>
        <ProfileHeader
          name={user.name}
          university={user.university}
          image={user.image}
        />

        <ProfileStats
          reports={reports}
          frequentPlaces={frequentPlaces}
        />

        <IonListHeader>Mis reportes recientes</IonListHeader>
        {recentReports.length > 0 ? (
            <IonCard>
                <IonList>
                    {recentReports.map(report => {
                        const place = places.find(p => p.id === report.placeId);
                        return (
                        <IonItem key={report.id} lines="full">
                            <IonLabel>
                                <h2>{report.type}</h2>
                                <p>{place?.name ?? "Lugar desconocido"}</p>
                            </IonLabel>
                            <IonBadge color={getStatusColor(report.status)} slot="end">
                                {report.status}
                            </IonBadge>
                        </IonItem>
                        );
                    })}
                    <IonItem lines="none" routerLink="/report" detail={false} button>
                        <IonLabel color="primary">Ver todos</IonLabel>
                        <IonIcon icon={arrowForwardOutline} slot="end" color="primary" />
                    </IonItem>
                </IonList>
            </IonCard>
        ) : (
            <IonCard>
                <IonItem lines="none">
                    <IonLabel color="medium">Aún no tienes reportes.</IonLabel>
                </IonItem>
            </IonCard>
        )}

        <ProfileInfo
          university={user.university}
          email={user.email}
        />

        <AppInfo
          version="1.0.0"
        />
      </IonContent>
    </IonPage>
  );
};

export default Profile;