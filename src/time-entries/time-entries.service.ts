import { CreateTimeEntryDto } from './dto/create-time-entry.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TimeEntry } from './time-entry.entity';
import { Project } from '../projects/project.entity';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class TimeEntriesService {
  async create(createTimeEntryDto: CreateTimeEntryDto) {
    const { projectId, start, end } = createTimeEntryDto;

    const project = await this.projectRepo.findOne({ where: { id: projectId } });
    if (!project) throw new NotFoundException('Project not found');

    if (project.completed) throw new BadRequestException('Cannot add time to a completed project');

    const startTime = new Date(start);
    const endTime = new Date(end);

    const durationInMinutes = (endTime.getTime() - startTime.getTime()) / (1000 * 60);
    if (durationInMinutes < 15) {
      throw new BadRequestException('Minimum time entry is 15 minutes');
    }

    if (project.startTime && startTime < new Date(project.startTime)) {
      throw new BadRequestException('Start time is before project startTime');
    }

    if (project.endTime && endTime > new Date(project.endTime)) {
      throw new BadRequestException('End time is after project endTime');
    }

    const timeEntry = this.timeEntryRepo.create({
      start: startTime,
      end: endTime,
      project,
    });

    return this.timeEntryRepo.save(timeEntry);
  }

  async findAll(): Promise<TimeEntry[]> {
    return this.timeEntryRepo.find({ relations: ['project'] });
  }

  async findOne(id: number): Promise<TimeEntry> {
    const entry = await this.timeEntryRepo.findOne({
      where: { id },
      relations: ['project'],
    });
    if (!entry) throw new NotFoundException(`TimeEntry #${id} not found`);
    return entry;
  }

  async remove(id: number): Promise<void> {
    const result = await this.timeEntryRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`TimeEntry #${id} not found`);
    }
  }

  constructor(
    @InjectRepository(TimeEntry)
    private timeEntryRepo: Repository<TimeEntry>,

    @InjectRepository(Project)
    private projectRepo: Repository<Project>,
  ) {}
}
