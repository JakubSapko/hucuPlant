import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { RegisterDto, LoginDto } from './auth.dto';
import { AuthHelper } from './auth.helper';
import { PrismaService } from '@/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  @Inject(AuthHelper)
  private readonly helper: AuthHelper;

  public async register(body: RegisterDto): Promise<User | never> {
    const { username, email, password }: RegisterDto = body;
    const user: User = await this.prisma.user.findFirst({ where: { email } });

    if (user) {
      throw new HttpException('Conflict', HttpStatus.CONFLICT);
    }

    return this.prisma.user.create({
      data: {
        username,
        email,
        password: this.helper.encodePassword(password),
      },
    });
  }

  public async login(body: LoginDto): Promise<string | never> {
    const { email, password }: LoginDto = body;
    const user: User = await this.prisma.user.findFirst({ where: { email } });

    if (!user) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid: boolean = this.helper.isPasswordValid(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    this.prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    return this.helper.generateToken(user);
  }

  public async refresh(user: User): Promise<string> {
    this.prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    return this.helper.generateToken(user);
  }
}
