import { useState } from "react";
import { IonButton, IonContent, IonIcon, IonPage, useIonAlert, useIonViewWillEnter, IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonImg, IonCard, IonCardContent } from "@ionic/react";
import { addOutline, closeOutline } from "ionicons/icons";

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
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const [placeId, setPlaceId] = useState<number | null>(null);
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | null>(null);

  useIonViewWillEnter(() => {
    setReports(reportService.getReports());
    
    // Obtain location once when entering the report view
    const fetchLoc = async () => {
      const loc = await getCurrentLocation();
      setUserLocation(loc);
    };
    fetchLoc();

    // Check if we navigated here from the map with a pre-selected place
    const pId = reportService.consumePendingPlaceId();
    if (pId !== null) {
      setPlaceId(pId);
      setCreatingReport(true);
    }
  });

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

            <ReportList 
              reports={reports} 
              places={places} 
              onReportClick={(r) => setSelectedReport(r)} 
            />
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

        <IonModal isOpen={!!selectedReport} onDidDismiss={() => setSelectedReport(null)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Detalle del Reporte</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setSelectedReport(null)}>
                  <IonIcon icon={closeOutline} />
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            {selectedReport && (
              <>
                <h2 style={{ marginTop: 0, fontWeight: 'bold' }}>
                  {places.find(p => p.id === selectedReport.placeId)?.name || "Lugar Desconocido"}
                </h2>
                <p><strong>Tipo:</strong> {selectedReport.type}</p>
                <p><strong>Estado:</strong> {selectedReport.status}</p>
                <p><strong>Fecha:</strong> {new Date(selectedReport.createdAt).toLocaleString()}</p>
                
                <IonCard style={{ margin: '16px 0', boxShadow: 'none', border: '1px solid var(--ion-color-light)' }}>
                  <IonCardContent>
                    <p style={{ margin: 0 }}>{selectedReport.description}</p>
                  </IonCardContent>
                </IonCard>

                {selectedReport.image && (
                  <div style={{ marginTop: '16px', borderRadius: '8px', overflow: 'hidden' }}>
                    <IonImg src={selectedReport.image} alt="Evidencia" style={{ width: '100%', objectFit: 'contain' }} />
                  </div>
                )}
              </>
            )}
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Report;