import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prescreen } from './prescreens/prescreen.entity';
import { PrescreensModule } from './prescreens/prescreens.module';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';

const defaultOptions = {
  database: 'nest-sandbox-031821',
  synchronize: true,
};

@Module({
  // imports: [
  //   TypeOrmModule.forFeature([Entity1, Entity2]), //This will use default connection
  //   TypeOrmModule.forRoot({ name: 'con1' }), // This will register globaly con1
  //   TypeOrmModule.forRoot({ name: 'con2' }), // This will register globaly con2
  // ],
  imports: [
    TypeOrmModule.forRoot({
      ...defaultOptions,
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      entities: [User],
      // autoLoadEntities: true,
    }),
    TypeOrmModule.forRoot({
      ...defaultOptions,
      type: 'mongodb',
      host: 'localhost',
      entities: [Prescreen],
      // autoLoadEntities: true,
      name: 'mongoConnection',
    }),
    UsersModule,
    PrescreensModule,
  ],
})
export class AppModule {}
