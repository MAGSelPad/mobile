import { IonItem, IonLabel, IonSelect, IonSelectOption, } from "@ionic/react";

interface Props {
    value: string;
    onChange: (value: string) => void;
}

const reportTypes = [
    "Basura",
    "Iluminación",
    "Infraestructura",
    "Aire acondicionado",
    "Equipamiento",
    "Seguridad",
    "Otro",
];

const ReportTypeSelect = ({ value, onChange }: Props) => {
    return (
        <IonItem>
            <IonLabel>Tipo de incidencia</IonLabel>

            <IonSelect
                value={value}
                placeholder="Seleccionar"
                onIonChange={(event) =>
                    onChange(event.detail.value)
                }
            >
                {reportTypes.map((type) => (
                    <IonSelectOption key={type} value={type}>
                        {type}
                    </IonSelectOption>
                ))}
            </IonSelect>
        </IonItem>
    );
};

export default ReportTypeSelect;