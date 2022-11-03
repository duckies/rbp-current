import { Controller, Get, Param } from '@nestjs/common';
import { Auth, AuthUser } from '../auth/decorators';
import { User } from '../entities';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @Auth()
  @Get('me')
  findMe(@AuthUser() user: User) {
    return user;
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.repository.findOneOrFail(id);
  }

  @Get()
  find() {
    return this.userService.repository.findAll();
  }
}
