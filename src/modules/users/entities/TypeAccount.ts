import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'type-account', schema: 'users' })
export class TypeAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  toString() {
    return this.name;
  }
}
