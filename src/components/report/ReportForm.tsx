import { useState, useMemo } from "react";
import { IonButton, IonItem, IonLabel, IonTextarea, IonList, IonListHeader, IonText, IonIcon, IonAccordionGroup, IonAccordion } from "@ionic/react";
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

  const placesWithDistance = useMemo<{ place: Place; distance: number | null }[]>(() => {
      if (!isGpsAvailable) {
          // Si no hay GPS, simplemente ordenamos alfabéticamente
          return places.map(p => ({ place: p, distance: null })).sort((a, b) => a.place.name.localeCompare(b.place.name));
      }
      return places.map(p => ({
          place: p,
          distance: calculateDistance(userLocation!.latitude, userLocation!.longitude, p.latitude, p.longitude)
      })).sort((a, b) => a.distance! - b.distance!);
  }, [places, userLocation, isGpsAvailable]);

  const groupedPlaces = useMemo(() => {
      const groups: Record<string, typeof placesWithDistance> = {};
      placesWithDistance.forEach(pwd => {
          const faculty = pwd.place.faculty || 'Desconocida';
          if (!groups[faculty]) groups[faculty] = [];
          groups[faculty].push(pwd);
      });
      return groups;
  }, [placesWithDistance]);

  const selectedPlace = useMemo(() => places.find(p => p.id === placeId), [places, placeId]);

  return (
    <>
      {selectedPlace && (
        <IonItem lines="none" style={{ '--background': 'var(--ion-color-light)', borderRadius: '8px', margin: '16px 16px 0 16px' }}>
          <IonIcon icon={checkmarkCircle} slot="start" color="primary" />
          <IonLabel>
            <p>Lugar de la incidencia</p>
            <h2>{selectedPlace.name}</h2>
            {selectedPlace.faculty && selectedPlace.faculty !== 'Desconocida' && <p>{selectedPlace.faculty}</p>}
          </IonLabel>
        </IonItem>
      )}

      {!showAllPlaces ? (
        <>
          <IonListHeader>📍 {isGpsAvailable ? 'Lugares cercanos' : 'Lugares recomendados'}</IonListHeader>
          <IonList>
            {placesWithDistance.slice(0, 3).map(({ place, distance }) => (
              <IonItem 
                key={place.id} 
                button 
                onClick={() => onPlaceChange(place.id)}
                color={placeId === place.id ? "light" : undefined}
              >
                <IonLabel>
                  <h2>{place.name}</h2>
                  {place.faculty && <p>{place.faculty}</p>}
                </IonLabel>
                {distance !== null && <IonText slot="end">{distance} m</IonText>}
                {placeId === place.id && <IonIcon icon={checkmarkCircle} slot="end" color="primary" />}
              </IonItem>
            ))}
          </IonList>
          
          <IonButton fill="clear" onClick={() => setShowAllPlaces(true)}>
            Ver todos los lugares
          </IonButton>
        </>
      ) : (
        <>
          <IonListHeader>📍 Todos los lugares</IonListHeader>
          <IonAccordionGroup>
            {Object.entries(groupedPlaces).sort(([a], [b]) => a.localeCompare(b)).map(([faculty, pwdList]) => (
              <IonAccordion value={faculty} key={faculty}>
                <IonItem slot="header" color="light">
                  <IonLabel>{faculty}</IonLabel>
                </IonItem>
                <IonList slot="content">
                  {pwdList.map(({ place, distance }) => (
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
              </IonAccordion>
            ))}
          </IonAccordionGroup>
          <IonButton fill="clear" onClick={() => setShowAllPlaces(false)}>
            Ocultar lista completa
          </IonButton>
        </>
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