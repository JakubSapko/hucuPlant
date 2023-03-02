import { IsString } from 'class-validator';

export class UpdateNameDto {
  @IsString()
  public readonly username: string;
}
