import { IonText, } from "@ionic/react";

import { Report } from "../../types/Report";
import { Place } from "../../types/Place";

import ReportCard from "./ReportCard";

interface Props {
    reports: Report[];
    places: Place[];
    onReportClick?: (report: Report) => void;
}

const ReportList = ({ reports, places, onReportClick, }: Props) => {

    if (reports.length === 0) {
        return (
            <IonText>
                <div style={{
                    textAlign: "center",
                    padding: "40px 20px",
                }}
                >
                    <h2>No tienes reportes</h2>
                    <p>
                        Los reportes que realices
                        aparecerán aquí.
                    </p>
                </div>
            </IonText>
        );
    }

    return (
        <>
            {reports.map((report) => {

                const place = places.find(
                    (place) =>
                        place.id === report.placeId
                );

                return (
                    <ReportCard
                        key={report.id}
                        report={report}
                        place={place}
                        onClick={() =>
                            onReportClick?.(report)
                        }
                    />
                );
            })}
        </>
    );
};

export default ReportList;