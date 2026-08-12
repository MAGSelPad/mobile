import { useState } from "react";

import {
  IonContent,
  IonPage,
  useIonAlert,
} from "@ionic/react";

import PageHeader from "../components/common/PageHeader";
import SectionTitle from "../components/common/SectionTitle";
import ReportForm from "../components/report/ReportForm";

import { places } from "../data/places";

const Report = () => {
  const [presentAlert] = useIonAlert();

  const [placeId, setPlaceId] =
    useState<number | null>(null);

  const [type, setType] = useState("");

  const [description, setDescription] =
    useState("");

  const handleSubmit = () => {
    const report = {
      id: Date.now(),
      placeId,
      type,
      description,
      status: "Pendiente",
      createdAt: new Date().toISOString(),
    };

    console.log("Nuevo reporte:", report);

    presentAlert({
      header: "Reporte enviado",
      message:
        "Tu reporte ha sido registrado correctamente.",
      buttons: ["Aceptar"],
    });

    setPlaceId(null);
    setType("");
    setDescription("");
  };

  return (
    <IonPage>

      <PageHeader title="Reportar incidencia" />

      <IonContent fullscreen>

        <SectionTitle
          title="Nueva incidencia"
        />

        <ReportForm
          places={places}
          placeId={placeId}
          type={type}
          description={description}
          onPlaceChange={setPlaceId}
          onTypeChange={setType}
          onDescriptionChange={setDescription}
          onSubmit={handleSubmit}
        />

      </IonContent>

    </IonPage>
  );
};

export default Report;