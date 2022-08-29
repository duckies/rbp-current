import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../common/database/prisma.service'

@Injectable()
export class SlideService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Prisma.SlideCreateInput) {
    return this.prisma.slide.create({ data })
  }

  findOne(where: Prisma.SlideWhereInput) {
    return this.prisma.slide.findFirstOrThrow({
      where,
    })
  }

  findAll(data: Prisma.SlideFindManyArgs = {}) {
    return this.prisma.slide.findMany(data)
  }

  update(data: Prisma.SlideUpdateArgs) {
    return this.prisma.slide.update(data)
  }
}
