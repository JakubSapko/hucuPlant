import { Module } from '@nestjs/common';
import { PlantsService } from './plants.service';
import { PlantsController } from './plants.controller';
import { PrismaService } from '@/prisma.service';

@Module({
  imports: [],
  controllers: [PlantsController],
  providers: [PlantsService, PrismaService],
})
export class PlantsModule {}
