import type { INestApplication } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

export class PrismaService extends PrismaClient {
  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close()
    })
  }
}
