import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { homeOutline, mapOutline, addCircleOutline, personOutline } from 'ionicons/icons';
import Home from './pages/Home';
import Map from './pages/Map';
import Report from './pages/Report';
import Profile from './pages/Profile'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Leaflet styles */
import 'leaflet/dist/leaflet.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

import { reportService } from './services/reportService';
import { frequentPlacesService } from './services/frequentPlacesService';
import { useEffect, useState } from 'react';

setupIonicReact();

const App: React.FC = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initServices = async () => {
      await Promise.all([
        reportService.init(),
        frequentPlacesService.init()
      ]);
      setIsReady(true);
    };
    initServices();
  }, []);

  if (!isReady) {
    return <IonApp></IonApp>; // Pantalla en blanco mientras carga (muy rápido localmente)
  }

  return (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/map">
            <Map />
          </Route>
          <Route path="/report">
            <Report />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/home">
            <IonIcon aria-hidden="true" icon={homeOutline} />
            <IonLabel>Inicio</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/map">
            <IonIcon aria-hidden="true" icon={mapOutline} />
            <IonLabel>Mapa</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/report">
            <IonIcon aria-hidden="true" icon={addCircleOutline} />
            <IonLabel>Reportar</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab4" href="/profile">
            <IonIcon aria-hidden="true" icon={personOutline} />
            <IonLabel>Perfil</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
  );
};

export default App;
