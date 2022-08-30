import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../common/database/prisma.service'

@Injectable()
export class SlideService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.SlideCreateInput) {
    return this.prisma.slide.create({ data })
  }

  findOne(where: Prisma.SlideWhereInput) {
    return this.prisma.slide.findFirstOrThrow({
      where,
    })
  }

  findAll(where: Prisma.SlideWhereInput) {
    return this.prisma.slide.findMany({ where })
  }

  update(data: Prisma.SlideUpdateArgs) {
    return this.prisma.slide.update(data)
  }

  remove(where: Prisma.SlideWhereUniqueInput) {
    return this.prisma.slide.delete({ where })
  }
}
