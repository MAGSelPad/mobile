export interface Report {
  id: number;
  placeId: number;
  type: string;
  description: string;
  image?: string;
  status: "Pendiente" | "En proceso" | "Resuelto";
  createdAt: string;
}