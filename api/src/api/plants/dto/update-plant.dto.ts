import { PartialType } from '@nestjs/mapped-types';
import { Plant } from '../entities/plant.entity';
import { CreatePlantDto } from './create-plant.dto';

export interface UpdatePlantDto extends Partial<Plant> {}
