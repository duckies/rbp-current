import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { CreateFormSubmissionDTO } from './dto/create-form-submission.dto'
import { FormSubmissionService } from './form-submission.service'

@Controller('form-submission')
export class FormSubmissionController {
  constructor(private readonly formSubmissionService: FormSubmissionService) {}

  @Post(':formId')
  public create(
    @Param('formId') formId: number,
    @Body() createFormSubmissionDTO: CreateFormSubmissionDTO
  ) {
    return this.formSubmissionService.create(formId, createFormSubmissionDTO)
  }

  @Get()
  public findAll() {
    return this.formSubmissionService.repository.findAll()
  }

  @Get(':id')
  public findOne(@Param('id') id: number) {
    return this.formSubmissionService.repository.findOne(id)
  }
}
