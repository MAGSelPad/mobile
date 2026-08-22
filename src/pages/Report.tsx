import { useState } from "react";
import { IonButton, IonContent, IonIcon, IonPage, useIonAlert, useIonViewWillEnter } from "@ionic/react";
import { addOutline, } from "ionicons/icons";

import PageHeader from "../components/common/PageHeader";
import SectionTitle from "../components/common/SectionTitle";

import ReportList from "../components/report/ReportList";
import ReportForm from "../components/report/ReportForm";

import { places } from "../data/places";
import type { Report } from "../types/Report";
import { reportService } from "../services/reportService";
import { UserLocation } from "../types/UserLocation";
import { getCurrentLocation } from "../services/locationService";

const Report = () => {
  const [presentAlert] = useIonAlert();

  const [creatingReport, setCreatingReport] = useState(false);
  const [reports, setReports] = useState<Report[]>([]);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);

  useIonViewWillEnter(() => {
    setReports(reportService.getReports());
    
    // Obtain location once when entering the report view
    const fetchLoc = async () => {
      const loc = await getCurrentLocation();
      setUserLocation(loc);
    };
    fetchLoc();
  });

  const [placeId, setPlaceId] = useState<number | null>(null);
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const handleSubmit = () => {
    if (placeId === null || !type || !description.trim()) {
      return;
    }

    const newReport: Report = {
      id: Date.now(),
      placeId,
      type,
      description,
      image: image ?? undefined,
      location: userLocation ?? undefined,
      status: "Pendiente",
      createdAt: new Date().toISOString(),
    };

    reportService.addReport(newReport);
    setReports(reportService.getReports());

    presentAlert({
      header: "Reporte enviado",
      message: "Tu reporte ha sido registrado correctamente.",
      buttons: ["Aceptar"],
    });

    resetForm();
    setCreatingReport(false);
  };

  const resetForm = () => {
    setPlaceId(null);
    setType("");
    setDescription("");
    setImage(null);
  };

  const handleNewReport = () => {
    resetForm();
    setCreatingReport(true);
  };

  const handleCancel = () => {
    resetForm();
    setCreatingReport(false);
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        {!creatingReport ? (
          <>
            <SectionTitle title="Mis reportes" />
            <IonButton
              expand="block"
              className="ion-margin"
              onClick={handleNewReport}
            >
              <IonIcon icon={addOutline} slot="start" />
              Nuevo reporte
            </IonButton>

            <ReportList reports={reports} places={places} />
          </>
        ) : (
          <>
            <SectionTitle title="Nueva incidencia" />
            <ReportForm
              places={places}
              placeId={placeId}
              type={type}
              description={description}
              image={image}
              userLocation={userLocation}
              onPlaceChange={setPlaceId}
              onTypeChange={setType}
              onDescriptionChange={setDescription}
              onImageChange={setImage}
              onSubmit={handleSubmit}
            />

            <IonButton expand="block" fill="clear" onClick={handleCancel}>
              Cancelar
            </IonButton>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Report;