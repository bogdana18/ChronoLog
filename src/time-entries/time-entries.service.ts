import { CreateTimeEntryDto } from './dto/create-time-entry.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan, MoreThan } from 'typeorm';
import { TimeEntry } from './entities/time-entry.entity';
import { Project } from '../projects/entities/project.entity';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { TimeMergeService }   from '../shared/services/time‑merge.service';

@Injectable()
export class TimeEntriesService {
  async create(dto: CreateTimeEntryDto): Promise<TimeEntry> {
    const project = await this.projRepo.findOne({ where: { id: dto.projectId } });
    if (!project) throw new NotFoundException('Project not found');

    if (project.completed) {
      throw new BadRequestException('Cannot add time to a completed project');
    }

    const start = new Date(dto.start);
    const end = new Date(dto.end);

    const durationInMinutes = (end.getTime() - start.getTime()) / (1000 * 60);
    if (durationInMinutes < 15) {
      throw new BadRequestException('Minimum time entry is 15 minutes');
    }

    if (project.startTime && start < new Date(project.startTime)) {
      throw new BadRequestException('Start time is before project startTime');
    }

    if (project.endTime && end > new Date(project.endTime)) {
      throw new BadRequestException('End time is after project endTime');
    }

    const overlaps = await this.entryRepo.find({
      where: {
        project: { id: dto.projectId },
        start: LessThan(end),
        end: MoreThan(start),
      },
    });

    const { start: mStart, end: mEnd, toDelete } =
      this.mergeSvc.merge(overlaps, start, end);

    if (toDelete.length) {
      await this.entryRepo.delete(toDelete);
    }

    const entry = this.entryRepo.create({ project, start: mStart, end: mEnd });
    return this.entryRepo.save(entry);
  }

  async findAll(): Promise<TimeEntry[]> {
    return this.entryRepo.find({ relations: ['project'] });
  }

  async findByProject(projectId: number): Promise<TimeEntry[]> {
    return this.entryRepo.find({
      where: { project: { id: projectId } },
      order: { start: 'ASC' },
    });
  }

  async findOne(id: number): Promise<TimeEntry> {
    const entry = await this.entryRepo.findOne({
      where: { id },
      relations: ['project'],
    });
    if (!entry) throw new NotFoundException(`TimeEntry #${id} not found`);
    return entry;
  }

  async remove(id: number): Promise<void> {
    const result = await this.entryRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`TimeEntry #${id} not found`);
    }
  }

  constructor(
    @InjectRepository(TimeEntry) private entryRepo: Repository<TimeEntry>,
    @InjectRepository(Project)   private projRepo:  Repository<Project>,
    private mergeSvc: TimeMergeService,
  ) {}
}
