import { Injectable } from '@nestjs/common';
import { Project } from '../projects/entities/project.entity';
import { ProjectWithTotalDto } from './dto/project-with-total.dto';

@Injectable()
export class ProjectStatsService {
  toWithTotal(projects: Project[]): ProjectWithTotalDto[] {
    return projects.map((p) => {
      const total = p.timeEntries.reduce((sum, e) => {
        const dur = (e.end.getTime() - e.start.getTime()) / 60000;
        return sum + dur;
      }, 0);
      return {
        id: p.id,
        name: p.name,
        completed: p.completed,
        startTime: p.startTime ?? null,
        endTime: p.endTime ?? null,
        totalTimeMinutes: Math.round(total),
      };
    });
  }
}
