export interface IPlant {
    user: number;
    id: number;
    name: string;
    plant_species: string;
    description: string;
    date_added: string;
    how_often: number;
    last_watered: number;
    img: string;
    tracked: boolean;
}

export interface ICardProps{
    plant: IPlant;
}