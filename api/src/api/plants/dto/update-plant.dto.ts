import { Plant } from '@prisma/client';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UpdatePlantDto extends Partial<Plant> {}
