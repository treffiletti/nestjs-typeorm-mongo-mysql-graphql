import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prescreen } from './prescreen.entity';
import { PrescreensController } from './prescreens.controller';
import { PrescreensService } from './prescreens.service';

@Module({
  imports: [TypeOrmModule.forFeature([Prescreen], 'mongoConnection')],
  providers: [PrescreensService],
  controllers: [PrescreensController],
})
export class PrescreensModule {}
