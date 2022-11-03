import { IsOptional, IsString } from 'class-validator';

export class UpdateSlideDTO {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  caption?: string;
}
