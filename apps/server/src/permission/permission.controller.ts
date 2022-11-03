import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { CreatePermissionDTO } from './dto/create-permission.dto';
import { UpdatePermissionDTO } from './dto/update-permission.dto';
import { PermissionService } from './permission.service';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permisisonService: PermissionService) { }

  @Post()
  public create(
    @Body() createPermissionDTO: CreatePermissionDTO,
  ) {
    return this.permisisonService.create(createPermissionDTO);
  }

  @Patch(':id')
  public update(
    @Param('id') id: number,
    @Body() CreatePermissionDTO: UpdatePermissionDTO,
  ) {
    return this.permisisonService.update(id, CreatePermissionDTO);
  }
}
