import { IsNotEmpty, IsString, IsNumberString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumberString()
  price: string;

  @IsNotEmpty()
  @IsString()
  slug: string;

  @IsNotEmpty()
  @IsString()
  image: string;

   @IsNotEmpty()
  @IsString()
  description: string;

   @IsNotEmpty()
  @IsString()
  details:string;
}