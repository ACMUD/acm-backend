import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity({ name: 'user-profile', schema: 'users' })
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: true })
  firstName: string;

  @Column({ length: 100, nullable: true })
  lastName: string;

  @Index()
  @Column({ length: 320, unique: true })
  email: string;

  @Column({ name: 'image_url', length: 320, nullable: true })
  imageUrl: string;

  @Column({ length: 140, nullable: true })
  description: string;

  @Column({ name: 'ud_code', length: 11, nullable: true, unique: true })
  udCode: string;
}
