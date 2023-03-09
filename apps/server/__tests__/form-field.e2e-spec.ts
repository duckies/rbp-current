import { MikroORM } from '@mikro-orm/core'
import { INestApplication, Logger } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { FormField } from '../src/form-field/form-field.entity'
import { FormFieldModule } from '../src/form-field/form-field.module'
import { Form } from '../src/form/form.entity'
import { MikroORMTestModule } from './orm'

describe('FormField (e2e)', () => {
  const logger = new Logger('FormField (e2e)', {
    timestamp: true,
  })
  let app: INestApplication
  let orm: MikroORM

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [MikroORMTestModule('form_field', [Form, FormField]), FormFieldModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    orm = app.get(MikroORM)
    app.useLogger(logger)

    await app.init()
  })

  beforeEach(async () => {
    await orm.getSchemaGenerator().refreshDatabase()
  })

  afterAll(async () => await app.close())

  it('should load', async () => {
    const response = await request(app.getHttpServer()).get('/form-field')
    logger.log(response.body)
    expect(response.status).toBe(200)
  })
})
