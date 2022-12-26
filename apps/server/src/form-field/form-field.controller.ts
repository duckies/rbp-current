import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { CreateFormFieldDTO } from './dto/create-form-field.dto'
import { UpdateFormFieldDTO } from './dto/update-form-field.dto'
import { FormFieldService } from './form-field.service'

@Controller('form-field')
export class FormFieldController {
  constructor(private readonly formFieldService: FormFieldService) {}

  @Post('form/:formId')
  private create(@Param('formId') formId: number, @Body() createFormFieldDTO: CreateFormFieldDTO) {
    return this.formFieldService.create(formId, createFormFieldDTO)
  }

  @Get(':id')
  private findOne(@Param('id') id: string) {
    return this.formFieldService.repository.findOneOrFail(id)
  }

  @Get()
  findAll(@Query('limit') limit?: number, @Query('offset') offset?: number) {
    return this.formFieldService.repository.findAll({ limit, offset, orderBy: { order: 'ASC' } })
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFormFieldDTO: UpdateFormFieldDTO) {
    return this.formFieldService.update(id, updateFormFieldDTO)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.formFieldService.delete(id)
  }
}
