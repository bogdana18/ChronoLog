import { Injectable,NotFoundException  } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';

export interface ProjectWithTotal {
  id: number;
  name: string;
  completed: boolean;
  startTime: Date | null;
  endTime: Date | null;
  totalTimeMinutes: number;
}

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
  ) {}

  async create(dto: CreateProjectDto): Promise<Project> {
    const proj = this.projectRepo.create(dto);
    return this.projectRepo.save(proj);
  }

  findAll() {
    return this.projectRepo.find();
  }
  
  async findAllDetailed(): Promise<ProjectWithTotal[]> {
    const projects = await this.projectRepo.find({
      relations: ['timeEntries'],
    });

    return projects.map((p) => {
      const totalTimeMinutes = p.timeEntries.reduce((sum, entry) => {
        const duration = (entry.end.getTime() - entry.start.getTime()) / (1000 * 60);
        return sum + duration;
      }, 0);

      return {
        id: p.id,
        name: p.name,
        completed: p.completed,
        startTime: p.startTime ?? null,
        endTime: p.endTime ?? null,
        totalTimeMinutes: Math.round(totalTimeMinutes),
      };
    });
  }
  findOne(id: number) {
    return this.projectRepo.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    const res = await this.projectRepo.delete(id);
    if (res.affected === 0) {
      throw new NotFoundException(`Project #${id} not found`);
    }
  }
}
