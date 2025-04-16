import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Project } from '../projects/project.entity';

@Entity()
export class TimeEntry {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project, (project) => project.timeEntries, {  onDelete: 'CASCADE' })
  project: Project;

  @Column()
  start: Date;

  @Column()
  end: Date;
}
