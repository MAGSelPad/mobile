import { IonButton, IonItem, IonLabel, IonSelect, IonSelectOption, IonTextarea, } from "@ionic/react";

import { Place } from "../../types/Place";

import ReportTypeSelect from "./ReportTypeSelect";
import ReportImage from "./ReportImage";

interface Props {
  places: Place[];
  placeId: number | null;
  type: string;
  description: string;
  image: string | null;

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
  onPlaceChange,
  onTypeChange,
  onDescriptionChange,
  onImageChange,
  onSubmit,
}: Props) => {
  return (
    <>
      <IonItem>
        <IonLabel>Lugar</IonLabel>
        <IonSelect
          value={placeId ?? undefined}
          placeholder="Seleccionar lugar"
          onIonChange={(event) =>
            onPlaceChange(
              Number(event.detail.value)
            )
          }
        >
          {places.map((place) => (
            <IonSelectOption key={place.id} value={place.id}>
              {place.name}
            </IonSelectOption>
          ))}
        </IonSelect>
      </IonItem>

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