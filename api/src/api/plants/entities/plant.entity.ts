import { User } from '@/api/user/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Plant extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  species: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.plants)
  owner: User;

  @Column({ type: 'boolean', default: true })
  tracked: boolean;

  @Column({ type: 'timestamptz', nullable: true })
  lastWatered: Date;

  @Column({ type: 'int', nullable: true })
  howOften: number;

  @Column({ type: 'varchar', nullable: true, default: null })
  img: string;
}
