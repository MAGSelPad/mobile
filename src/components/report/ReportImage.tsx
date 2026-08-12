import {
    IonButton,
    IonIcon,
    IonImg,
    IonText,
} from "@ionic/react";

import { cameraOutline, trashOutline } from "ionicons/icons";

import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

interface Props {
    image: string | null;
    onImageChange: (image: string | null) => void;
}

const ReportImage = ({
    image,
    onImageChange,
}: Props) => {

    const takePhoto = async () => {
        try {
            const photo = await Camera.getPhoto({
                quality: 80,
                allowEditing: false,
                resultType: CameraResultType.DataUrl,
                source: CameraSource.Prompt,
            });

            if (photo.dataUrl) {
                onImageChange(photo.dataUrl);
            }
        } catch (error) {
            console.error("Error al obtener la fotografía:", error);
        }
    };

    const removePhoto = () => {
        onImageChange(null);
    };

    return (
        <div className="ion-padding">

            <IonText>
                <h3>Fotografía</h3>
            </IonText>

            {!image ? (
                <IonButton
                    expand="block"
                    fill="outline"
                    onClick={takePhoto}
                >
                    <IonIcon
                        icon={cameraOutline}
                        slot="start"
                    />

                    Añadir fotografía
                </IonButton>
            ) : (
                <>
                    <IonImg
                        src={image}
                        alt="Fotografía del reporte"
                    />

                    <IonButton
                        expand="block"
                        fill="outline"
                        color="danger"
                        onClick={removePhoto}
                    >
                        <IonIcon
                            icon={trashOutline}
                            slot="start"
                        />

                        Eliminar fotografía
                    </IonButton>
                </>
            )}

        </div>
    );
};

export default ReportImage;