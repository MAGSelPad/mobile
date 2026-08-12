import { IonBadge } from "@ionic/react";

interface Props {
    status: "Pendiente" | "En proceso" | "Resuelto";
}

const ReportStatus = ({ status }: Props) => {
    const getColor = () => {
        switch (status) {
            case "Pendiente":
                return "warning";

            case "En proceso":
                return "primary";

            case "Resuelto":
                return "success";

            default:
                return "medium";
        }
    };

    return (
        <IonBadge color={getColor()}>
            {status}
        </IonBadge>
    );
};

export default ReportStatus;