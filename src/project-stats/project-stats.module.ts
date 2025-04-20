import { Module } from '@nestjs/common';
import { ProjectStatsService } from './project-stats.service';

@Module({
  providers: [ProjectStatsService],
  exports: [ProjectStatsService],
})
export class ProjectStatsModule {}
