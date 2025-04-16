import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Project } from './projects/project.entity';
import { TimeEntry } from './time-entries/time-entry.entity';
import { ProjectsModule } from './projects/projects.module';
import { TimeEntriesModule } from './time-entries/time-entries.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Project, TimeEntry],
      synchronize: true,
    }),
    ProjectsModule,
    TimeEntriesModule,
  ],
  //controllers: [AppController],
  //providers: [AppService],
})
export class DatabaseModule {}
