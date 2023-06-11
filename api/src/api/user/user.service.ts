import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UpdateNameDto } from './user.dto';
import { PrismaService } from '@/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  public async updateName(body: UpdateNameDto, req: Request): Promise<User> {
    const user: User = <User>req.user;

    return this.prisma.user.update({ where: { id: user.id }, data: user });
  }
}
