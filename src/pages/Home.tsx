import { useState, useEffect } from "react";

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSpinner, IonText, IonItem, IonLabel, IonList, IonIcon } from '@ionic/react';
import { locationOutline } from 'ionicons/icons';

import PageHeader from '../components/common/PageHeader';
import SearchBar from "../components/common/SearchBar";
import SectionTitle from "../components/common/SectionTitle";

import QuickActions from "../components/home/QuickActions";
import NearbyPlaces from "../components/home/NearbyPlaces";
import FrequentPlaces from "../components/home/FrequentPlaces";

import { getCurrentLocation, calculateDistance, DEFAULT_LOCATION } from "../services/locationService";
import { frequentPlacesService } from "../services/frequentPlacesService";
import { UserLocation } from "../types/UserLocation";
import { places } from "../data/places";

const Home: React.FC = () => {
  const [search, setSearch] = useState("");
  const [userLocation, setUserLocation] = useState<UserLocation>(DEFAULT_LOCATION);
  const [loadingLocation, setLoadingLocation] = useState<boolean>(true);

  useEffect(() => {
      const fetchLocation = async () => {
          setLoadingLocation(true);
          const location = await getCurrentLocation();
          setUserLocation(location);
          
          frequentPlacesService.registerVisitFromLocation(location);
          
          setLoadingLocation(false);
      };
      fetchLocation();
  }, []);

  const searchResults = search.trim() === "" ? [] : places.filter(place => 
      place.name.toLowerCase().includes(search.toLowerCase())
  ).map(place => ({
      place,
      distance: calculateDistance(
          userLocation.latitude, userLocation.longitude,
          place.latitude, place.longitude
      )
  }));

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
        
        {search.trim() !== "" ? (
            <>
                <SectionTitle title="Resultados de búsqueda" />
                <IonList>
                    {searchResults.length > 0 ? searchResults.map(({ place, distance }) => (
                        <IonItem key={place.id} button>
                            <IonIcon icon={locationOutline} slot="start" />
                            <IonLabel>
                                <h2>{place.name}</h2>
                                <p>{place.category}</p>
                            </IonLabel>
                            <IonText slot="end" color="medium">{distance} m</IonText>
                        </IonItem>
                    )) : (
                        <IonItem lines="none">
                            <IonLabel color="medium">No se encontraron lugares.</IonLabel>
                        </IonItem>
                    )}
                </IonList>
            </>
        ) : (
            <>
                <SectionTitle title="Lugares frecuentes" />
                <FrequentPlaces />

                <SectionTitle title="Acciones rápidas" />
                <QuickActions />
                
                <SectionTitle title="Lugares cercanos" />
                {loadingLocation ? (
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                        <IonSpinner name="crescent" />
                        <IonText><p>Obteniendo ubicación...</p></IonText>
                    </div>
                ) : (
                    <NearbyPlaces userLocation={userLocation} />
                )}
            </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;

