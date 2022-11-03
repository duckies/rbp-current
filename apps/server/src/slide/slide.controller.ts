import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Auth } from '../auth/decorators';
import { CreateSlideDTO } from './dto/create-slide.dto';
import { UpdateSlideDTO } from './dto/update-slide.dto';
import { SlideService } from './slide.service';

@Controller('slide')
export class SlideController {
  constructor(private slideService: SlideService) { }

  @Auth('create', 'slide')
  @Post()
  create(@Body() createSlideDTO: CreateSlideDTO) {
    return this.slideService.create(createSlideDTO);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.slideService.repository.findOneOrFail(id);
  }

  @Get()
  findAll() {
    return this.slideService.repository.find({});
  }

  @Auth('update', 'slide')
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateSlideDTO: UpdateSlideDTO) {
    return this.slideService.update(id, updateSlideDTO);
  }
}
