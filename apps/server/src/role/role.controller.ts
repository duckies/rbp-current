import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateRoleDTO } from './dto/create-role.dto';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @Post()
  create(@Body() createRoleDTO: CreateRoleDTO) {
    return this.roleService.create(createRoleDTO);
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.roleService.repository.findOneOrFail(name);
  }

  @Get()
  findAll() {
    return this.roleService.repository.find({});
  }
}
