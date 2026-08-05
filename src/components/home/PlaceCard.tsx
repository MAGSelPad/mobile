import { IonCard, IonCardContent, IonItem, IonLabel, IonIcon, } from "@ionic/react";

import { locationOutline } from "ionicons/icons";

import { Place } from "../../types/Place";

interface Props {
    place: Place;
    distance: number;
}

const PlaceCard = ({ place, distance }: Props) => {
    return (
        <IonCard>
            <IonCardContent>
                <IonItem lines="none">
                    <IonIcon icon={locationOutline} slot="start"/>

                    <IonLabel>
                        <h2>{place.name}</h2>
                        <p>{place.category}</p>
                    </IonLabel>
                    <strong>{distance} m</strong>
                </IonItem>
            </IonCardContent>
        </IonCard>
    );
};

export default PlaceCard;