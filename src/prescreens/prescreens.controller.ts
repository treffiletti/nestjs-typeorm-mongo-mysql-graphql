import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreatePrescreenDto } from './dto/create-prescreen.dto';
import { Prescreen } from './prescreen.entity';
import { PrescreensService } from './prescreens.service';

@Controller('prescreens')
export class PrescreensController {
  constructor(private readonly prescreensService: PrescreensService) {}

  @Post()
  create(@Body() createPrescreenDto: CreatePrescreenDto): Promise<Prescreen> {
    return this.prescreensService.create(createPrescreenDto);
  }

  @Get()
  findAll(): Promise<Prescreen[]> {
    return this.prescreensService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Prescreen> {
    return this.prescreensService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.prescreensService.remove(id);
  }
}
