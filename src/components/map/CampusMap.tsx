import { IonCard } from "@ionic/react";

const CampusMap = () => {
  return (
    <IonCard style={{ margin: 16, overflow: "hidden", borderRadius: 12, }}>
      <iframe
        title="Campus Map"
        src="https://www.google.com/maps/d/embed?mid=13yd4eq_vb9gfXl6IxCuv8zybU8voTLw&ehbc=2E312F"
        width="100%"
        height="600"
        style={{ border: 0, }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
    </IonCard>
  );
};

export default CampusMap;