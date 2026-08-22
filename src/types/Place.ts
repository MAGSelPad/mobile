export interface Place {
    id: number;
    name: string;
    code?: string;
    faculty?: string;
    category: string;
    latitude: number;
    longitude: number;
    description: string;
    image?: string;
    geometryType?: "Point" | "Polygon";
}