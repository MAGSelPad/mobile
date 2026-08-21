import { useState, useEffect } from "react";
import PlaceCard from "./PlaceCard";
import { places } from "../../data/places";
import { calculateDistance, getCurrentLocation, DEFAULT_LOCATION } from "../../services/locationService";
import { frequentPlacesService } from "../../services/frequentPlacesService";
import { UserLocation } from "../../types/UserLocation";
import { IonSpinner, IonText } from "@ionic/react";

const NearbyPlaces = () => {
    const [userLocation, setUserLocation] = useState<UserLocation>(DEFAULT_LOCATION);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchLocation = async () => {
            setLoading(true);
            const location = await getCurrentLocation();
            setUserLocation(location);
            
            // Registrar la visita al obtener la ubicación
            frequentPlacesService.registerVisitFromLocation(location);
            
            setLoading(false);
        };
        fetchLocation();
    }, []);

    const sortedPlaces = places.map((place) => ({
        place,
        distance: calculateDistance(
            userLocation.latitude, userLocation.longitude,
            place.latitude, place.longitude
        ),
    })).sort((a, b) => a.distance - b.distance);

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '20px' }}>
                <IonSpinner name="crescent" />
                <IonText><p>Obteniendo ubicación...</p></IonText>
            </div>
        );
    }

    return (
        <>
            {sortedPlaces.map(({ place, distance }) => (
                <PlaceCard key={place.id} place={place} distance={distance} />
            ))}
        </>
    );
};

export default NearbyPlaces;