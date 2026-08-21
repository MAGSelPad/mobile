export interface Report {
  id: number;
  placeId: number;
  type: string;
  description: string;
  image?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  status: "Pendiente" | "En proceso" | "Resuelto";
  createdAt: string;
}