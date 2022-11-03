import { SqlEntityManager } from '@mikro-orm/knex';
import { Injectable } from '@nestjs/common';
import { Slide } from '../entities';
import { CreateSlideDTO } from './dto/create-slide.dto';
import { UpdateSlideDTO } from './dto/update-slide.dto';

@Injectable()
export class SlideService {
  public readonly repository;

  constructor(private readonly em: SqlEntityManager) {
    this.repository = em.getRepository(Slide);
  }

  public async create(createSlideDTO: CreateSlideDTO) {
    const slide = this.repository.create(createSlideDTO);

    await this.em.persist(slide).flush();

    return slide;
  }

  public async update(id: number, updateSlideDTO: UpdateSlideDTO) {
    const slide = await this.repository.findOneOrFail(id);

    this.repository.assign(slide, updateSlideDTO);

    await this.repository.flush();

    return slide;
  }

  public async delete(id: number) {
    const slide = await this.repository.findOneOrFail(id);

    return this.repository.remove(slide).flush();
  }
}
