import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TimeEntry } from '../../time-entries/entities/time-entry.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: false })
  completed: boolean;

  @Column({ nullable: true })
  startTime: Date;

  @Column({ nullable: true })
  endTime: Date;

  @OneToMany(() => TimeEntry, (entry) => entry.project)
  timeEntries: TimeEntry[];
}
