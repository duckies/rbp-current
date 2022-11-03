import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateFormDTO {
  @IsString()
  title!: string;

  @IsOptional()
  @IsBoolean()
  closed?: boolean;
}
