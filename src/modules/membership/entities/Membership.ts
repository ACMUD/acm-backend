import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Profile } from '@Modules/users/entities/Profile';

@Entity({ name: 'user_membership', schema: 'users' })
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
