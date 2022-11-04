import { IsBoolean, IsIn, IsJSON, IsOptional, IsString } from 'class-validator';
import { Actions, Subjects } from '../../auth/auth.constants';
import { Action, Subject } from '../permission.entity';

export class UpdatePermissionDTO {
  @IsOptional()
  @IsString()
  @IsIn(Subjects)
  subject?: Subject;

  @IsOptional()
  @IsString()
  @IsIn(Actions)
  action?: Action;

  @IsOptional()
  @IsBoolean()
  inverted?: boolean;

  @IsOptional()
  @IsString()
  reason?: string;

  @IsOptional()
  @IsJSON()
  conditions?: Record<string, any>;

  @IsOptional()
  @IsString()
  role?: string;
}
