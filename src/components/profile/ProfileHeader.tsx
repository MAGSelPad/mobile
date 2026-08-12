import { IonAvatar, IonCard, IonCardContent, IonText, } from "@ionic/react";

interface Props {
    name: string;
    university: string;
    image?: string;
}

const ProfileHeader = ({ name, university, image, }: Props) => {
    return (
        <IonCard>
            <IonCardContent className="ion-text-center">
                <IonAvatar style={{
                    width: "90px",
                    height: "90px",
                    margin: "0 auto 16px",
                }}
                >
                    {image ? (<img src={image} alt={name} />) : (
                        <div
                            style={{
                                width: "100%", height: "100%",
                                display: "flex", alignItems: "center",
                                justifyContent: "center", fontSize: "40px",
                            }}
                        >
                            👤
                        </div>
                    )}
                </IonAvatar>

                <IonText>
                    <h2>{name}</h2>
                    <p>{university}</p>
                </IonText>
            </IonCardContent>
        </IonCard>
    );
};

export default ProfileHeader;