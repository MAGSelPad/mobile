import { IonText } from "@ionic/react";

interface Props {
    title: string;
}

const SectionTitle = ({ title }: Props) => {
    return (
        <IonText>
            <h2 style={{
                    marginTop: 20,
                    marginBottom: 12,
                    marginLeft: 16,
                    fontWeight: "bold",
                }}
            >
                {title}
            </h2>
        </IonText>
    );
};

export default SectionTitle;