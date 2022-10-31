import { Controller, Get, Param } from '@nestjs/common';
import { User } from '@prisma/client';
import { Auth, AuthUser } from '../auth/decorators';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Auth()
  @Get('me')
  findMe(@AuthUser() user: User) {
    return user;
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne({ where: { id } });
  }

  @Get()
  find() {
    return this.userService.findAll();
  }
}
