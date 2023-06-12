export interface IPlant {
    userId: number;
    id: number;
    name: string;
    description: string;
    createdAt: string;
    waterFreq: number;
    updatedAt: string;
}

export interface ICardProps {
    plant: IPlant;
}
