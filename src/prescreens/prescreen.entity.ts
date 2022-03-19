import {
  Column,
  Entity,
  ObjectIdColumn,
  ObjectID,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
// import { Timestamp } from 'src/timestamps/timestamp.entity';

@Entity()
export class Prescreen {
  @ObjectIdColumn()
  id: ObjectID;

  @Column('uuid')
  userId: string;

  @Column()
  type: string;

  @Column()
  code: string;

  @Column({ default: true })
  status: boolean;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
