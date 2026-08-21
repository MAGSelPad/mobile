import { useState } from "react";
import { IonContent, IonPage, useIonViewWillEnter } from "@ionic/react";

import PageHeader from "../components/common/PageHeader";

import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileStats from "../components/profile/ProfileStats";
import ProfileInfo from "../components/profile/ProfileInfo";
import AppInfo from "../components/profile/AppInfo";

import { frequentPlacesService } from "../services/frequentPlacesService";
import { reportService } from "../services/reportService";

const Profile = () => {
  const [stats, setStats] = useState({ reports: 0, frequentPlaces: 0 });

  useIonViewWillEnter(() => {
    setStats({
      reports: reportService.getReports().length,
      frequentPlaces: frequentPlacesService.getTotalFrequentPlaces(),
    });
  });

  const user = {
    name: "Estudiante ESPOL",
    university: "ESPOL",
    email: "estudiante@espol.edu.ec",
    image: undefined,
  };

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
          reports={stats.reports}
          frequentPlaces={stats.frequentPlaces}
        />

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