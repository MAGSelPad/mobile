import { Preferences } from '@capacitor/preferences';

export const storageService = {
  set: async <T>(key: string, value: T): Promise<void> => {
    try {
      await Preferences.set({
        key,
        value: JSON.stringify(value),
      });
    } catch (e) {
      console.warn(`Error guardando ${key} en Preferences:`, e);
    }
  },

  get: async <T>(key: string): Promise<T | null> => {
    try {
      const { value } = await Preferences.get({ key });
      if (value) {
        return JSON.parse(value) as T;
      }
      return null;
    } catch (e) {
      console.warn(`Error cargando ${key} desde Preferences:`, e);
      return null;
    }
  },

  remove: async (key: string): Promise<void> => {
    try {
      await Preferences.remove({ key });
    } catch (e) {
      console.warn(`Error eliminando ${key} de Preferences:`, e);
    }
  }
};
