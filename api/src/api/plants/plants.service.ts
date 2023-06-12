import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreatePlantDto } from './dto/create-plant.dto';
import { UpdatePlantDto } from './dto/update-plant.dto';
import { Plant, User } from '@prisma/client';
import { PrismaService } from '@/prisma.service';
@Injectable()
export class PlantsService {
  constructor(private prisma: PrismaService) {}

  async create(createPlantDto: CreatePlantDto): Promise<Plant | never> {
    const data: CreatePlantDto = createPlantDto;

    const user = await this.prisma.user.findFirst({
      where: {
        id: data.userId,
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return this.prisma.plant.create({
      data: data,
    });
  }

  async findAll(username: string): Promise<Plant[]> {
    const user: User = await this.prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.FOUND);
    }
    return this.prisma.plant.findMany({
      where: {
        user: {
          id: user.id,
        },
      },
    });
  }

  async findOne(id: number): Promise<Plant> {
    const plant: Plant = await this.prisma.plant.findFirst({
      where: {
        id: id,
      },
    });
    return plant;
  }

  async update(id: number, updatePlantDto: UpdatePlantDto): Promise<Plant> {
    const updatePlant: Plant = await this.prisma.plant.update({
      where: {
        id,
      },
      data: updatePlantDto,
    });
    return updatePlant;
  }

  async remove(id: number): Promise<Plant> {
    const removedPlant = await this.prisma.plant.delete({
      where: {
        id,
      },
    });
    return removedPlant;
  }
}
