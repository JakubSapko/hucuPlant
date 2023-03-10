export interface CreatePlantDto {
  username: string;
  plantData: PlantData;
}

interface PlantData {
  name: string;
  species: string;
  description?: string;
  howOften: number;
  img?: string;
}
