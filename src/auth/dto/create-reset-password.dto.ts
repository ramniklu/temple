import { IsNotEmpty } from 'class-validator';
export class CreateResetPasswordDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  token: string;
  @IsNotEmpty()
  ttl: number;
}
