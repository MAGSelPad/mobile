import { IonContent, IonPage, } from "@ionic/react";

import PageHeader from "../components/common/PageHeader";

import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileStats from "../components/profile/ProfileStats";
import ProfileInfo from "../components/profile/ProfileInfo";
import AppInfo from "../components/profile/AppInfo";

const Profile = () => {

  const user = {
    name: "Miguel Galarza",
    university: "ESPOL",
    email: "usuario@espol.edu.ec",
    image: undefined,
  };

  const statistics = {
    reports: 3,
    favorites: 5,
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
          reports={statistics.reports}
          favorites={statistics.favorites}
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