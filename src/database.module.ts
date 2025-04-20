import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Project } from './projects/entities/project.entity';
import { TimeEntry } from './time-entries/entities/time-entry.entity';
import { ProjectsModule } from './projects/projects.module';
import { TimeEntriesModule } from './time-entries/time-entries.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Project, TimeEntry],
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProjectsModule,
    TimeEntriesModule,
  ],
})
export class DatabaseModule {}
