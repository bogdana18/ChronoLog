import { Module } from '@nestjs/common';
import { TimeEntriesService } from './time-entries.service';
import { TimeEntry } from './entities/time-entry.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeEntriesController } from './time-entries.controller';
import { TimeMergeService }   from '../shared/services/time‑merge.service';
import { Project }  from '../projects/entities/project.entity';  
@Module({
  imports: [
    TypeOrmModule.forFeature([TimeEntry, Project]),
  ],
  controllers: [TimeEntriesController],
  providers: [TimeEntriesService, TimeMergeService],
})
export class TimeEntriesModule {}
