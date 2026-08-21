import { useState } from "react";

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonAlert, IonButton } from '@ionic/react';

import PageHeader from '../components/common/PageHeader';
import SearchBar from "../components/common/SearchBar";
import SectionTitle from "../components/common/SectionTitle";

import QuickActions from "../components/home/QuickActions";
import NearbyPlaces from "../components/home/NearbyPlaces";
import FrequentPlaces from "../components/home/FrequentPlaces";

const Home: React.FC = () => {
  const [search, setSearch] = useState("");

  return (
    <IonPage>
      <PageHeader title="Inicio" />
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Inicio</IonTitle>
          </IonToolbar>
        </IonHeader>
        <SearchBar value={search} onSearch={setSearch} />
        
        <SectionTitle title="Lugares frecuentes" />
        <FrequentPlaces />

        <SectionTitle title="Acciones rápidas" />
        <QuickActions />
        <SectionTitle title="Lugares cercanos" />
        <NearbyPlaces />
      </IonContent>
    </IonPage>
  );
};

export default Home;

