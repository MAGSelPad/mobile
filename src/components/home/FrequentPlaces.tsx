import { useState } from "react";
import { IonText, IonList, IonItem, IonLabel, IonBadge, useIonViewWillEnter } from "@ionic/react";
import { frequentPlacesService, Visit } from "../../services/frequentPlacesService";
import { places } from "../../data/places";

const FrequentPlaces = () => {
    const [visits, setVisits] = useState<Visit[]>([]);

    // We can just rely on state updating, but if we navigate back, we might want to refresh.
    // However, in a tab app, Home might not trigger willEnter frequently if it's already visible.
    // But since it updates in NearbyPlaces on mount, we can just load the initial or use an interval if needed.
    // Given the constraints "keep it simple", loading on mount or view enter is fine.
    useIonViewWillEnter(() => {
        setVisits(frequentPlacesService.getFrequentPlaces().slice(0, 3));
    });

    if (visits.length === 0) {
        return (
            <div style={{ textAlign: "center", padding: "20px" }}>
                <IonText color="medium">
                    <p>Aún no tienes lugares frecuentes.</p>
                </IonText>
            </div>
        );
    }

    return (
        <IonList inset>
            {visits.map(visit => {
                const place = places.find(p => p.id === visit.placeId);
                return (
                    <IonItem key={visit.placeId}>
                        <IonLabel>
                            <h2>{place?.name || "Desconocido"}</h2>
                            <p>{visit.visits} visita{visit.visits > 1 ? 's' : ''}</p>
                        </IonLabel>
                        <IonBadge slot="end" color="primary">{visit.visits}</IonBadge>
                    </IonItem>
                );
            })}
        </IonList>
    );
};

export default FrequentPlaces;
