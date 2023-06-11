export interface CreatePlantDto {
  username: string;
  plantData: PlantData;
}

interface PlantData {
  name: string;
  waterFreq: number;
}
