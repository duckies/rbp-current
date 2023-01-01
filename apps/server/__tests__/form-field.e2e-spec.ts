import { MikroORM } from '@mikro-orm/core'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { FormFieldModule } from '../src/form-field/form-field.module'
import { MikroORMTestConfig } from './orm'

describe.skip('FormField (e2e)', () => {
  let app: INestApplication
  let orm: MikroORM

  beforeAll(async () => {
    beforeEach(async () => {
      const moduleFixture = await Test.createTestingModule({
        imports: [MikroOrmModule.forRoot(MikroORMTestConfig), FormFieldModule],
      }).compile()

      app = moduleFixture.createNestApplication()
      orm = app.get(MikroORM)

      await orm.getSchemaGenerator().refreshDatabase()

      await app.init()
    })
  })

  it('should load', async () => {
    const response = await request(app.getHttpServer()).get('/form-field')

    expect(response.status).toBe(200)
    // expect(response.body).toEqual([]);
  })

  afterAll(async () => await app?.close())
})
