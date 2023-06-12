import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PlantsService } from './plants.service';
import { CreatePlantDto } from './dto/create-plant.dto';
import { UpdatePlantDto } from './dto/update-plant.dto';

@Controller('plants')
export class PlantsController {
  constructor(private plantsService: PlantsService) {}

  @Post()
  async create(@Body() body: CreatePlantDto) {
    return this.plantsService.create(body);
  }

  @Get()
  async findAll(@Query() query: { username: string }) {
    return this.plantsService.findAll(query.username);
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
  async remove(@Param('id') id: string, @Body() userData: { id: number }) {
    return this.plantsService.remove(+id, userData);
  }
}
