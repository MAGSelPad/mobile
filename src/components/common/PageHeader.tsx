import {IonHeader, IonTitle, IonToolbar } from '@ionic/react';

interface ContainerProps {
    title: string;
}

const PageHeader = ({ title }: ContainerProps) => {
    return (
        <IonHeader>
            <IonToolbar>
                <IonTitle>{title}</IonTitle>
            </IonToolbar>
        </IonHeader>
    );
};

export default PageHeader;
