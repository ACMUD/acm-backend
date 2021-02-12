import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Profile } from './Profile';

@Entity({ name: 'user-membership', schema: 'users' })
export class Membership {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  memberNumber: number;

  @Column({ default: true })
  active: boolean;

  @OneToOne(() => Profile)
  @JoinColumn({ name: 'user_profile_id' })
  userProfile: Profile;
}
