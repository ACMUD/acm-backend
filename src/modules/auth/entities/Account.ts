import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  Index,
} from 'typeorm';
import { Profile } from 'modules/users/entities/Profile';

import { TypeAccount } from './TypeAccount';

@Entity({ name: 'user-account', schema: 'users' })
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ length: 320, unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  active: boolean;

  @Column({ nullable: true })
  verifyToken: string;

  @ManyToMany(() => TypeAccount, { cascade: true })
  @JoinTable({
    name: 'user_type_account',
    joinColumn: { name: 'type_account_id' },
    inverseJoinColumn: { name: 'user_account_id' },
  })
  typeAccount: TypeAccount[];

  @OneToOne(() => Profile, { cascade: true })
  @JoinColumn({ name: 'user_profile_id' })
  userProfile: Profile;
}
