import { INestApplication, Logger } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { IsString } from 'class-validator'
import request from 'supertest'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { DatabaseModule } from '../src/common/database/database.module'
import { ConfigModule } from '../src/config/config.module'
import { FormFieldModule } from '../src/form-field/form-field.module'

class FormFieldVariables {
  @IsString()
  DATABASE_URL = 'mysql://root:prisma@localhost:3307/tests'
}

describe('FormField (e2e)', () => {
  const logger = new Logger('FormField (e2e)')
  let app: INestApplication

  beforeAll(async () => {
    beforeEach(async () => {
      const moduleFixture = await Test.createTestingModule({
        imports: [
          ConfigModule.forRoot({
            schema: FormFieldVariables,
            envFileName: '.env.test',
          }),
          DatabaseModule,
          FormFieldModule,
        ],
      }).compile()

      app = moduleFixture.createNestApplication()
      app.useLogger(logger)
      await app.init()
    })
  })

  it('should load', async () => {
    const response = await request(app.getHttpServer()).get('/form-field')

    expect(response.status).toBe(200)
    expect(response.body).toEqual([])
  })

  afterAll(async () => await app?.close())
})
