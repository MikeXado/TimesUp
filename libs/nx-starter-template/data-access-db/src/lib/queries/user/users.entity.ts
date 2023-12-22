import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  constructor() {}

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'John' })
  firstName: string;

  @Column({ default: 'Doe' })
  lastName: string;

  @Column({ default: true })
  isActive: boolean;
}
