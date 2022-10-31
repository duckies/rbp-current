import { BadRequestException, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { beforeAll, describe, expect, it } from 'vitest';
import { DatabaseModule } from '../common/database/database.module';
import { PrismaService } from '../common/database/prisma.service';
import {
  TextFieldEntityDTO,
} from '../form-field/interfaces/form-field-entity.dto';
import { FormSubmissionModule } from './form-submission.module';
import { FormSubmissionService } from './form-submission.service';

describe('FormSubmission', () => {
  let app: INestApplication;
  let service: FormSubmissionService;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [DatabaseModule, FormSubmissionModule],
    })
      .overrideProvider(PrismaService)
      .useValue({
        formSubmission: {
          findFirstOrThrow: () => Promise.resolve({ id: 1 }),
        },
      })
      .compile();

    app = moduleFixture.createNestApplication();
    service = moduleFixture.get(FormSubmissionService);
    await app.init();
  });

  it('should expect string response for text fields', () => {
    const field: TextFieldEntityDTO = {
      id: 1,
      formId: 1,
      label: 'What is your name?',
      description: null,
      type: 'Text',
      required: true,
      order: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // @ts-expect-error Testing private method.
    service.validateFieldResponse(field, 'John Doe');
    // @ts-expect-error Testing private method.
    expect(() => service.validateFieldResponse(field, true)).toThrowError(
      BadRequestException,
    );
    // @ts-expect-error Testing private method.
    expect(() => service.validateFieldResponse(field, 1)).toThrowError(
      BadRequestException,
    );
  });
});
