import { IsString } from 'class-validator';

export class UpdateUserDto {
  public readonly username?: string;
  public readonly email?: string;
  public readonly password?: string;
  public readonly newPassword?: string;
  public readonly id: number;
}
