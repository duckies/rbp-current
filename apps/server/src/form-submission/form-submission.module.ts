import { Module } from '@nestjs/common'
import { CharacterModule } from '../character/character.module'
import { FormSubmissionController } from './form-submission.controller'
import { FormSubmissionService } from './form-submission.service'

@Module({
  imports: [CharacterModule],
  controllers: [FormSubmissionController],
  providers: [FormSubmissionService],
})
export class FormSubmissionModule {}
