export interface Report {
    id: number;
    placeId: number;
    type: string;
    description: string;
    image?: string;
    status: "Pending" | "In Progress" | "Resolved";
}