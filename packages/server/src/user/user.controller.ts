import { Controller, Get, Param } from '@nestjs/common'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne({ where: { id } })
  }

  @Get()
  find() {
    return this.userService.findAll()
  }
}
