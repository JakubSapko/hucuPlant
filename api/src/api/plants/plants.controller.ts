import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PlantsService } from './plants.service';
import { CreatePlantDto } from './dto/create-plant.dto';
import { UpdatePlantDto } from './dto/update-plant.dto';

@Controller('plants')
export class PlantsController {
  constructor(private plantsService: PlantsService) {}

  @Post()
  async create(@Body() createPlantDto: CreatePlantDto) {
    return this.plantsService.create(createPlantDto);
  }

  @Get(':username')
  async findAll(@Param('username') username: string) {
    return this.plantsService.findAll(username);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.plantsService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePlantDto: UpdatePlantDto,
  ) {
    return this.plantsService.update(+id, updatePlantDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.plantsService.remove(+id);
  }
}
