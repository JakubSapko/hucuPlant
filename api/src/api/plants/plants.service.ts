import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlantDto } from './dto/create-plant.dto';
import { UpdatePlantDto } from './dto/update-plant.dto';
import { Plant } from './entities/plant.entity';

@Injectable()
export class PlantsService {
  @InjectRepository(Plant)
  private readonly repository: Repository<Plant>;

  async create(createPlantDto: CreatePlantDto) {
    return 'This action adds a new plant';
  }

  async findAll(username: string) {
    return `This action returns all plants`;
  }

  async findOne(id: number) {
    const plant: Plant = await this.repository.findOneOrFail({
      where: {
        id: id,
      },
    });
    console.log(plant);
    return `This action returns a #${id} plant`;
  }

  async update(id: number, updatePlantDto: UpdatePlantDto) {
    return `This action updates a #${id} plant`;
  }

  async remove(id: number) {
    return `This action removes a #${id} plant`;
  }
}
