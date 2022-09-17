import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common'
import { Auth } from '../auth/decorators'
import { CreateSlideDTO } from './dto/create-slide.dto'
import { SlideService } from './slide.service'

@Controller('slide')
export class SlideController {
  constructor(private slideService: SlideService) {}

  @Auth('Create', 'Slide')
  @Post()
  create(@Body() createSlideDTO: CreateSlideDTO) {
    return this.slideService.create(createSlideDTO)
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.slideService.findOne({ id })
  }

  @Get()
  findAll() {
    return this.slideService.findAll()
  }

  @Auth('Update', 'Slide')
  @Patch(':id')
  update(@Param('id') id: number) {
    return this.slideService.update({ where: { id }, data: {} })
  }
}
