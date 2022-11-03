import { Module } from '@nestjs/common';
import { FormSubmissionController } from './form-submission.controller';
import { FormSubmissionService } from './form-submission.service';

@Module({
  controllers: [FormSubmissionController],
  providers: [FormSubmissionService],
})
export class FormSubmissionModule { }
