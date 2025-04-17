import { Module } from '@nestjs/common';
import { TimeEntriesService } from './time-entries.service';
import { TimeEntry } from './time-entry.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeEntriesController } from './time-entries.controller';
import { ProjectsModule } from '../projects/projects.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TimeEntry]),
    ProjectsModule,
  ],
  controllers: [TimeEntriesController],
  providers: [TimeEntriesService],
})
export class TimeEntriesModule {}
