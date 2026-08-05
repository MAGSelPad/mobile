import {IonCard, IonCardContent, IonIcon,} from "@ionic/react";
import { IonRouterLink } from "@ionic/react";

interface Props {
  title: string;
  icon: string;
  link: string;
}

const QuickActionCard = ({ title, icon, link, }: Props) => {
  return (
    <IonRouterLink routerLink={link} style={{ textDecoration: "none" }}>
      <IonCard>
        <IonCardContent className="ion-text-center">
          <IonIcon icon={icon} size="large" />
          <h3>{title}</h3>
        </IonCardContent>
      </IonCard>
    </IonRouterLink>
  );
};

export default QuickActionCard;