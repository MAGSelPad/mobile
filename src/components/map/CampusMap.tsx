import { useEffect, useState } from "react";
import { IonCard, IonButton, IonBadge, IonIcon, IonText } from "@ionic/react";
import { useHistory } from "react-router-dom";
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { locationOutline, alertCircleOutline } from 'ionicons/icons';

import { places } from "../../data/places";
import { reportService } from "../../services/reportService";
import { getCurrentLocation } from "../../services/locationService";
import { calculateDistance, DEFAULT_LOCATION } from "../../services/locationService";

// Fix Leaflet icons in Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
});

const CampusMap = () => {
  const history = useHistory();
  const [userLocation, setUserLocation] = useState<{latitude: number, longitude: number} | null>(null);

  useEffect(() => {
    const fetchLoc = async () => {
      const loc = await getCurrentLocation();
      setUserLocation(loc);
    };
    fetchLoc();
  }, []);

  const isGpsAvailable = userLocation && (userLocation.latitude !== DEFAULT_LOCATION.latitude || userLocation.longitude !== DEFAULT_LOCATION.longitude);

  const handleCreateReport = (placeId: number) => {
    history.push({
      pathname: '/report',
      state: { preselectedPlaceId: placeId }
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
        case 'Pendiente': return 'warning';
        case 'En proceso': return 'primary';
        case 'Resuelto': return 'success';
        default: return 'medium';
    }
  };

  const mapCenter: [number, number] = [-2.14620, -79.96580]; // FCNM as center
  const allReports = reportService.getReports();

  return (
    <IonCard style={{ margin: 0, overflow: "hidden", height: "calc(100vh - 120px)" }}>
      <MapContainer 
        center={mapCenter} 
        zoom={16} 
        scrollWheelZoom={true} 
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {places.map(place => {
          const distance = isGpsAvailable ? calculateDistance(userLocation.latitude, userLocation.longitude, place.latitude, place.longitude) : null;
          const myReportsForPlace = allReports.filter(r => r.placeId === place.id);

          return (
            <Marker key={place.id} position={[place.latitude, place.longitude]}>
              <Popup>
                <div style={{ minWidth: '200px' }}>
                  <h3 style={{ marginTop: 0, marginBottom: '5px', color: 'var(--ion-color-dark)' }}>{place.name}</h3>
                  
                  {place.faculty && place.faculty !== "Desconocida" && (
                    <IonBadge color="tertiary" style={{ marginBottom: '10px' }}>{place.faculty}</IonBadge>
                  )}
                  
                  <div style={{ fontSize: '14px', color: 'var(--ion-color-medium)' }}>
                    <p style={{ margin: '5px 0' }}><strong>Categoría:</strong> {place.category}</p>
                    {distance !== null && (
                      <p style={{ margin: '5px 0', display: 'flex', alignItems: 'center' }}>
                        <IonIcon icon={locationOutline} style={{ marginRight: '5px' }} />
                        A {distance} m de ti
                      </p>
                    )}
                  </div>

                  <hr style={{ margin: '10px 0', background: 'var(--ion-color-light)' }} />
                  
                  <div style={{ marginBottom: '10px' }}>
                    <p style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>Mis Reportes ({myReportsForPlace.length})</p>
                    {myReportsForPlace.length > 0 ? (
                      <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px' }}>
                        {myReportsForPlace.slice(0, 3).map(r => (
                          <li key={r.id}>
                            {r.type} <IonText color={getStatusColor(r.status)}>({r.status})</IonText>
                          </li>
                        ))}
                        {myReportsForPlace.length > 3 && <li>y {myReportsForPlace.length - 3} más...</li>}
                      </ul>
                    ) : (
                      <p style={{ margin: 0, fontSize: '13px', color: 'var(--ion-color-medium)' }}>No tienes reportes aquí.</p>
                    )}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    {myReportsForPlace.length > 0 && (
                      <IonButton 
                        size="small" 
                        fill="outline" 
                        onClick={() => history.push('/report')}
                      >
                        Ver mis reportes
                      </IonButton>
                    )}
                    <IonButton 
                      size="small" 
                      onClick={() => handleCreateReport(place.id)}
                    >
                      <IonIcon icon={alertCircleOutline} slot="start" />
                      Crear reporte
                    </IonButton>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </IonCard>
  );
};

export default CampusMap;