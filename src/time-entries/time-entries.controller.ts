import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { TimeEntriesService } from './time-entries.service';
import { CreateTimeEntryDto } from './dto/create-time-entry.dto';

@Controller('time-entries')
export class TimeEntriesController {
  constructor(private readonly timeEntriesService: TimeEntriesService) {}

  @Post()
  create(@Body() dto: CreateTimeEntryDto) {
    return this.timeEntriesService.create(dto);
  }

  @Get()
  findAll() {
    return this.timeEntriesService.findAll();
  }

  @Get('project/:projectId')
  findByProject(@Param('projectId') projectId: string) {
    return this.timeEntriesService.findByProject(+projectId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timeEntriesService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timeEntriesService.remove(+id);
  }
}
