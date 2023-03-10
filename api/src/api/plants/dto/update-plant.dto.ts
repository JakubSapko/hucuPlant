import { PartialType } from '@nestjs/mapped-types';
import { CreatePlantDto } from './create-plant.dto';

export interface UpdatePlantDto extends CreatePlantDto {}
