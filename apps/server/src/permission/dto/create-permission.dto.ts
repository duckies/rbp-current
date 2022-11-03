import { IsBoolean, IsIn, IsJSON, IsOptional, IsString } from 'class-validator';
import { Actions, Subjects } from '../../auth/auth.constants';
import { Action, Subject } from '../../entities';

export class CreatePermissionDTO {
  @IsString()
  @IsIn(Subjects)
  subject!: Subject;

  @IsString()
  @IsIn(Actions)
  action!: Action;

  @IsOptional()
  @IsBoolean()
  inverted?: boolean;

  @IsOptional()
  @IsString()
  reason?: string;

  @IsOptional()
  @IsJSON()
  conditions?: Record<string, any>;

  @IsString()
  role!: string;
}
