import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { PrismaService } from '../common/database/prisma.service';
import { CreatePermissionDTO } from './dto/create-permission.dto';
import { UpdatePermissionDTO } from './dto/update-permission.dto';

@Controller('permission')
export class PermissionController {
  constructor(private readonly prisma: PrismaService) {}

  @Post()
  create(@Body() createPermissionDTO: CreatePermissionDTO) {
    const roleConnect = createPermissionDTO.roleName
      ? {
          role: {
            connect: {
              name: createPermissionDTO.roleName,
            },
          },
        }
      : {};

    return this.prisma.permission.create({
      data: {
        action: createPermissionDTO.action,
        subject: createPermissionDTO.subject,
        inverted: createPermissionDTO.inverted,
        reason: createPermissionDTO.reason,
        conditions: createPermissionDTO.conditions,
        ...roleConnect,
      },
    });
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() { conditions, roleName, ...body }: UpdatePermissionDTO,
  ) {
    const role = roleName ? { role: { connect: { name: roleName } } } : {};
    return this.prisma.permission.update({
      where: { id },
      data: {
        ...body,
        ...role,
        conditions,
      },
    });
  }
}
