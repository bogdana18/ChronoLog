import { Injectable,NotFoundException  } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { ProjectStatsService } from '../project-stats/project-stats.service';
import { ProjectWithTotalDto } from '../project-stats/dto/project-with-total.dto';

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
    @InjectRepository(Project) private repo: Repository<Project>,
    private stats: ProjectStatsService,
  ) {}

  async create(dto: CreateProjectDto): Promise<Project> {
    const proj = this.repo.create(dto);
    return this.repo.save(proj);
  }

  findAll() {
    return this.repo.find();
  }
  
  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  async findAllDetailed(): Promise<ProjectWithTotalDto[]> {
    const projs = await this.repo.find({ relations: ['timeEntries'] });
    return this.stats.toWithTotal(projs);
  }

  async update(id: number, dto: UpdateProjectDto): Promise<Project> {
    const project = await this.repo.preload({
      id,
      startTime: dto.startTime ? new Date(dto.startTime) : undefined,
      endTime:   dto.endTime   ? new Date(dto.endTime)   : undefined,
      completed: dto.completed,
    });
    if (!project) {
      throw new NotFoundException(`Project #${id} not found`);
    }
    return this.repo.save(project);
  }

  async remove(id: number): Promise<void> {
    const res = await this.repo.delete(id);
    if (res.affected === 0) {
      throw new NotFoundException(`Project #${id} not found`);
    }
  }
}
