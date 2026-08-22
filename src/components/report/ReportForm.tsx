import { useState, useMemo } from "react";
import { IonButton, IonItem, IonLabel, IonTextarea, IonList, IonListHeader, IonText, IonIcon } from "@ionic/react";
import { checkmarkCircle } from "ionicons/icons";

import { Place } from "../../types/Place";
import { UserLocation } from "../../types/UserLocation";
import { calculateDistance, DEFAULT_LOCATION } from "../../services/locationService";

import ReportTypeSelect from "./ReportTypeSelect";
import ReportImage from "./ReportImage";

interface Props {
  places: Place[];
  placeId: number | null;
  type: string;
  description: string;
  image: string | null;
  userLocation: UserLocation | null;

  onPlaceChange: (placeId: number) => void;
  onTypeChange: (type: string) => void;
  onDescriptionChange: (description: string) => void;
  onImageChange: (image: string | null) => void;

  onSubmit: () => void;
}

const ReportForm = ({
  places,
  placeId,
  type,
  description,
  image,
  userLocation,
  onPlaceChange,
  onTypeChange,
  onDescriptionChange,
  onImageChange,
  onSubmit,
}: Props) => {
  const [showAllPlaces, setShowAllPlaces] = useState(false);

  const isGpsAvailable = userLocation && (userLocation.latitude !== DEFAULT_LOCATION.latitude || userLocation.longitude !== DEFAULT_LOCATION.longitude);

  const placesWithDistance = useMemo(() => {
      if (!isGpsAvailable) {
          return places.map(p => ({ place: p, distance: null }));
      }
      return places.map(p => ({
          place: p,
          distance: calculateDistance(userLocation!.latitude, userLocation!.longitude, p.latitude, p.longitude)
      })).sort((a, b) => a.distance! - b.distance!);
  }, [places, userLocation, isGpsAvailable]);

  const displayedPlaces = showAllPlaces ? placesWithDistance : placesWithDistance.slice(0, 3);

  return (
    <>
      <IonListHeader>📍 {isGpsAvailable ? 'Lugares cercanos' : 'Lugares'}</IonListHeader>
      <IonList>
        {displayedPlaces.map(({ place, distance }) => (
          <IonItem 
            key={place.id} 
            button 
            onClick={() => onPlaceChange(place.id)}
            color={placeId === place.id ? "light" : undefined}
          >
            <IonLabel>
              <h2>{place.name}</h2>
            </IonLabel>
            {distance !== null && <IonText slot="end">{distance} m</IonText>}
            {placeId === place.id && <IonIcon icon={checkmarkCircle} slot="end" color="primary" />}
          </IonItem>
        ))}
      </IonList>
      
      {!showAllPlaces && placesWithDistance.length > 3 && (
        <IonButton fill="clear" onClick={() => setShowAllPlaces(true)}>
          Ver todos los lugares
        </IonButton>
      )}

      <ReportTypeSelect value={type} onChange={onTypeChange} />

      <IonItem>
        <IonLabel position="stacked">
          Descripción
        </IonLabel>

        <IonTextarea
          value={description}
          placeholder="Describe el problema..."
          autoGrow
          rows={5}
          onIonInput={(event) =>
            onDescriptionChange(
              event.detail.value ?? ""
            )
          }
        />
      </IonItem>

      <ReportImage image={image} onImageChange={onImageChange} />

      <IonButton
        expand="block"
        className="ion-margin"
        onClick={onSubmit}
        disabled={
          placeId === null ||
          !type ||
          !description.trim()
        }
      >
        Enviar reporte
      </IonButton>
    </>
  );
};

export default ReportForm;