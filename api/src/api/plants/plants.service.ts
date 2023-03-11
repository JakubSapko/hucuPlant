import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from '../user/user.entity';
import { CreatePlantDto } from './dto/create-plant.dto';
import { UpdatePlantDto } from './dto/update-plant.dto';
import { Plant } from './entities/plant.entity';

@Injectable()
export class PlantsService {
  @InjectRepository(Plant)
  private readonly plantRepository: Repository<Plant>;
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  async create(createPlantDto: CreatePlantDto): Promise<Plant | never> {
    const { username, plantData }: CreatePlantDto = createPlantDto;

    const user = await this.userRepository.findOne({
      where: {
        username,
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const plantDataT = { owner: user, ...plantData };
    const plant: Plant = this.plantRepository.create(plantDataT);

    return plant.save();
  }

  async findAll(username: string): Promise<Plant[]> {
    const user: User = await this.userRepository.findOne({
      where: {
        username,
      },
      relations: {
        plants: true,
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.FOUND);
    }

    return user.plants;
  }

  async findOne(id: number): Promise<Plant> {
    const plant: Plant = await this.plantRepository.findOne({
      where: {
        id: id,
      },
    });
    return plant;
  }

  async update(id: number, updatePlantDto: UpdatePlantDto): Promise<Plant> {
    const updatePlant: UpdateResult = await this.plantRepository.update(
      id,
      updatePlantDto,
    );
    const plant: Plant = await this.plantRepository.findOne({ where: { id } });
    return plant;
  }

  async remove(id: number): Promise<number> {
    const removedPlant: DeleteResult = await this.plantRepository.delete({
      id,
    });
    return removedPlant.affected;
  }
}
