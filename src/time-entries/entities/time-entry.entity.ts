import { 
  Entity, 
  PrimaryGeneratedColumn,
  Column, 
  ManyToOne,
  RelationId,
  JoinColumn
} from 'typeorm';
import { Project } from '../../projects/entities/project.entity';

@Entity()
export class TimeEntry {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project, (project) => project.timeEntries, {  onDelete: 'CASCADE' })
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @RelationId((entry: TimeEntry) => entry.project)
  projectId: number;

  @Column({ type: 'datetime'})
  start: Date;

  @Column({ type: 'datetime' })
  end: Date;
}
