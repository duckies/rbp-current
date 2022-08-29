import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { CreateRoleDTO } from './dto/create-role.dto'
import { RoleService } from './role.service'

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body() { name, userId }: CreateRoleDTO) {
    return this.roleService.create({
      name,
      user: userId ? { connect: { id: userId } } : {},
    })
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.roleService.findOne({
      where: { name },
      include: { permissions: true },
    })
  }

  @Get()
  findAll() {
    return this.roleService.findAll()
  }
}
