import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { ProjectStatsModule } from '../project-stats/project-stats.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project]),
    ProjectStatsModule
  ],
  providers: [ProjectsService],
  controllers: [ProjectsController],
})
export class ProjectsModule {}
