import { User } from '@/api/user/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Plant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  species: string;

  @Column()
  description: string;

  @Column()
  createdAt: Date;

  @ManyToOne(() => User, (owner) => owner.plants)
  owner: User;

  @Column()
  tracked: boolean;

  @Column()
  last_watered: Date;

  @Column()
  how_often: number;

  @Column()
  img: string;
}
