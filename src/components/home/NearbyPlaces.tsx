import PlaceCard from "./PlaceCard";
import { places } from "../../data/places";
import { calculateDistance } from "../../services/locationService";

const userLocation = {
    latitude: -2.1475,
    longitude: -79.9676,
};

const NearbyPlaces = () => {

    const sortedPlaces = places.map((place) => ({
        place,
        distance: calculateDistance(
            userLocation.latitude, userLocation.longitude,
            place.latitude, place.longitude
        ),
    })).sort((a, b) => a.distance - b.distance);

    return (
        <>
            {sortedPlaces.map(({ place, distance }) => (
                <PlaceCard key={place.id} place={place} distance={distance} />
            ))}
        </>
    );
};

export default NearbyPlaces;