# Corrección de Lugares y Búsqueda

## Análisis del problema de las distancias

He analizado los siguientes componentes clave y determiné la causa de por qué las distancias pueden no coincidir con la realidad:

1. **La fórmula Haversine es correcta:** El cálculo matemático en `locationService.ts`, el radio de la tierra en metros (`6371000`) y el orden de los parámetros (`lat, lon`) son correctos.
2. **Las coordenadas son razonables:** Los valores en `places.ts` corresponden correctamente al campus ESPOL en la Prosperina (Latitud ~-2.14, Longitud ~-79.96).
3. **El problema principal radica en los permisos nativos de Android y el Fallback:** Como vimos en fases anteriores, falta la declaración explícita de `ACCESS_FINE_LOCATION` y `ACCESS_COARSE_LOCATION` en el `AndroidManifest.xml`. Sin estos permisos a nivel de sistema, `@capacitor/geolocation` arrojará un error y activará silenciosamente el bloque `catch` de `getCurrentLocation()`, devolviendo siempre la ubicación estática `DEFAULT_LOCATION`. Al estar clavado en el *fallback*, todas las distancias en pantalla parecen estáticas o incorrectas respecto a la posición real del usuario. Además, `NearbyPlaces` consulta la ubicación de forma asíncrona pero independiente; para que la búsqueda muestre también las distancias reales, la ubicación debe ser accesible desde la vista de búsqueda.

## Archivos a modificar

1. **`android/app/src/main/AndroidManifest.xml`**: Añadir los permisos de ubicación (esto solucionará de raíz la falla del GPS en dispositivos físicos).
2. **`src/pages/Home.tsx`**: 
   - Añadir estado para controlar y mostrar los resultados de búsqueda condicionalmente.
   - Refactorizar la obtención del `userLocation` para que tanto `NearbyPlaces` como los resultados de búsqueda compartan la misma coordenada real sin duplicar las llamadas al GPS.
3. **`src/components/home/NearbyPlaces.tsx`**: 
   - Extraer la responsabilidad de hacer `fetchLocation` para recibir el `userLocation` mediante `props` desde `Home.tsx`. Esto evita encadenar solicitudes redundantes.
4. **`src/components/common/SearchBar.tsx`**: 
   - No requiere grandes cambios, se seguirá reutilizando su lógica actual como `input` controlado.

## Cambios concretos a realizar

1. **Permisos de Android:** Agregar `<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />` y `<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />` a `AndroidManifest.xml`.
2. **Elevación de Estado en Home:** `Home.tsx` llamará a `getCurrentLocation()` al montar y guardará `userLocation`. 
3. **Lógica de Búsqueda Integrada:** 
   - En `Home.tsx`, si la barra de búsqueda tiene texto (ej: `search.length > 0`), ocultaremos temporalmente las secciones de "Acciones rápidas", "Lugares frecuentes" y "Lugares cercanos".
   - En su lugar, mostraremos una lista con las coincidencias de `places.ts` (filtrado case-insensitive por nombre de lugar).
   - Para cada coincidencia, calcularemos y mostraremos su distancia en metros respecto al `userLocation` compartido, así como su categoría.
   - Cada lugar de la lista tendrá un botón que permitirá su selección (dejándolo preparado para redirigir a `/map`, aunque sin modificar el mapa aún, según las instrucciones).
4. **Respeto a las reglas de negocio:** 
   - No se implementará tracking continuo (la ubicación se obtiene una vez al entrar a Home).
   - Se mantiene el registro de la visita en `frequentPlacesService` tal como está, desencadenado una vez cuando se localiza al usuario.

> [!IMPORTANT]
> **User Review Required:** Esperaré tu aprobación de este plan antes de ejecutar las modificaciones. No haré commit ni push.
