import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity({ name: 'type_account', schema: 'users' })
export class TypeAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  toString() {
    return this.name;
  }
}
