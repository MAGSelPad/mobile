import { Geolocation } from '@capacitor/geolocation';
import { UserLocation } from '../types/UserLocation';

export const DEFAULT_LOCATION: UserLocation = {
    latitude: -2.1475,
    longitude: -79.9676,
};

export async function getCurrentLocation(): Promise<UserLocation> {
    try {
        const permissions = await Geolocation.checkPermissions();
        if (permissions.location !== 'granted') {
            const request = await Geolocation.requestPermissions();
            if (request.location !== 'granted') {
                console.warn('Permiso de ubicación denegado. Usando ubicación por defecto.');
                return DEFAULT_LOCATION;
            }
        }

        const position = await Geolocation.getCurrentPosition({
            timeout: 10000,
            enableHighAccuracy: true
        });

        return {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        };
    } catch (error) {
        console.error('Error al obtener la ubicación real, usando fallback:', error);
        return DEFAULT_LOCATION;
    }
}

export function calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
): number {

    const R = 6371000; // metros

    const toRadians = (degrees: number) =>
        degrees * Math.PI / 180;

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return Math.round(R * c);
}