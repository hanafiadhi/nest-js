import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastname: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string;
}
