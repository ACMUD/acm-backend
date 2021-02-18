import { ObjectType, Field } from 'type-graphql';
import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

const nullable = true;

@ObjectType()
@Entity({ name: 'user-profile', schema: 'users' })
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable })
  @Column({ length: 100, nullable })
  firstName: string;

  @Field({ nullable })
  @Column({ length: 100, nullable })
  lastName: string;

  @Index()
  @Column({ length: 320, unique: true })
  email: string;

  @Field({ nullable })
  @Column({ name: 'image_url', length: 320, nullable })
  imageUrl: string;

  @Field({ nullable })
  @Column({ length: 140, nullable })
  description: string;

  @Field({ nullable })
  @Column({ name: 'ud_code', length: 11, nullable, unique: true })
  udCode: string;
}
