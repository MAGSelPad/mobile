import { UserLocation } from '../types/UserLocation';
import { places } from '../data/places';
import { calculateDistance } from './locationService';
import { storageService } from './storageService';

export interface Visit {
    placeId: number;
    visits: number;
    lastVisit: number;
}

let visitsMemory: Record<number, Visit> = {};

const VISIT_RADIUS_METERS = 100;
const VISIT_COOLDOWN_MS = 5 * 60 * 1000; // 5 minutos
const VISITS_STORAGE_KEY = 'campusreport_frequent_places';
const VISIT_RETENTION_DAYS = 30;

let lastVisitedPlaceId: number | null = null;
let lastVisitTime: number = 0;

export const frequentPlacesService = {
    init: async (): Promise<void> => {
        const savedVisits = await storageService.get<Record<number, Visit>>(VISITS_STORAGE_KEY);
        if (savedVisits) {
            const now = Date.now();
            const retentionMs = VISIT_RETENTION_DAYS * 24 * 60 * 60 * 1000;
            const validVisits: Record<number, Visit> = {};
            let changed = false;

            for (const [key, visit] of Object.entries(savedVisits)) {
                if ((now - visit.lastVisit) <= retentionMs) {
                    validVisits[Number(key)] = visit;
                } else {
                    changed = true;
                }
            }
            
            visitsMemory = validVisits;
            
            if (changed) {
                await storageService.set(VISITS_STORAGE_KEY, visitsMemory);
            }
        }
    },

    registerVisitFromLocation: (location: UserLocation) => {
        const nearbyPlace = places.find(place => {
            const distance = calculateDistance(
                location.latitude, location.longitude,
                place.latitude, place.longitude
            );
            return distance <= VISIT_RADIUS_METERS;
        });

        if (nearbyPlace) {
            const now = Date.now();
            
            if (lastVisitedPlaceId === nearbyPlace.id && (now - lastVisitTime) < VISIT_COOLDOWN_MS) {
                return;
            }

            const currentVisits = visitsMemory[nearbyPlace.id]?.visits || 0;
            
            visitsMemory[nearbyPlace.id] = {
                placeId: nearbyPlace.id,
                visits: currentVisits + 1,
                lastVisit: now,
            };

            lastVisitedPlaceId = nearbyPlace.id;
            lastVisitTime = now;
            
            storageService.set(VISITS_STORAGE_KEY, visitsMemory);
        }
    },

    getFrequentPlaces: (): Visit[] => {
        return Object.values(visitsMemory).sort((a, b) => b.visits - a.visits);
    },

    getVisitCount: (placeId: number): number => {
        return visitsMemory[placeId]?.visits || 0;
    },

    getTotalFrequentPlaces: (): number => {
        return Object.keys(visitsMemory).length;
    }
};
