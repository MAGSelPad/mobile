import { IonCard, IonCardContent, IonIcon, IonItem, IonLabel, } from "@ionic/react";

import { alertCircleOutline, } from "ionicons/icons";

import { Report } from "../../types/Report";
import { Place } from "../../types/Place";

import ReportStatus from "./ReportStatus";

interface Props {
    report: Report;
    place?: Place;
    onClick?: () => void;
}

const ReportCard = ({ report, place, onClick, }: Props) => {
    return (
        <IonCard button={!!onClick} onClick={onClick}>
            <IonCardContent>

                <IonItem lines="none">
                    <IonIcon icon={alertCircleOutline} slot="start" />
                    <IonLabel>
                        <h2>{report.type}</h2>
                        <p>
                            {place?.name ?? "Lugar desconocido"}
                        </p>
                    </IonLabel>
                    <ReportStatus status={report.status} />
                </IonItem>

                <IonItem lines="none">
                    <IonLabel>
                        <p>
                            {report.description}
                        </p>

                        <small>
                            {new Date(report.createdAt).toLocaleDateString()}
                        </small>
                    </IonLabel>
                </IonItem>

            </IonCardContent>
        </IonCard>
    );
};

export default ReportCard;