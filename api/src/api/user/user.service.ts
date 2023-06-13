import { Injectable, Logger } from '@nestjs/common';
import { Request } from 'express';
import { UpdateUserDto } from './user.dto';
import { PrismaService } from '@/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  public async update(body: UpdateUserDto, req: Request): Promise<User> {
    const user: User = await this.prisma.user.findUnique({
      where: { id: req.body.id },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return this.prisma.user.update({
      where: { id: user.id },
      data: { password: req.body.newPassword },
    });
  }
}
