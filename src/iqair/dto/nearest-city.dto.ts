import { IsNotEmpty, IsString } from 'class-validator';

export class NearestCityDto {
  @IsNotEmpty()
  @IsString()
  longitude: string;

  @IsNotEmpty()
  @IsString()
  latitude: string;
}
