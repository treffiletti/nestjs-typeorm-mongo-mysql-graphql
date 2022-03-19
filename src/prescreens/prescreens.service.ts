import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePrescreenDto } from './dto/create-prescreen.dto';
import { Prescreen } from './prescreen.entity';

@Injectable()
export class PrescreensService {
  constructor(
    @InjectRepository(Prescreen, 'mongoConnection')
    private readonly prescreensRepository: Repository<Prescreen>,
  ) {}

  create(createPrescreenDto: CreatePrescreenDto): Promise<Prescreen> {
    return this.prescreensRepository.save(
      Object.assign(new Prescreen(), createPrescreenDto),
    );
  }

  async findAll(): Promise<Prescreen[]> {
    return this.prescreensRepository.find();
  }

  findOne(id): Promise<Prescreen> {
    return this.prescreensRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.prescreensRepository.delete(id);
  }
}
