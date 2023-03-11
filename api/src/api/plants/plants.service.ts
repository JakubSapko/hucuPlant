import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async findOne(id: number) {
    const plant: Plant = await this.plantRepository.findOneOrFail({
      where: {
        id: id,
      },
    });
    return plant;
  }

  async update(id: number, updatePlantDto: UpdatePlantDto) {
    return `This action updates a #${id} plant`;
  }

  async remove(id: number) {
    return `This action removes a #${id} plant`;
  }
}
