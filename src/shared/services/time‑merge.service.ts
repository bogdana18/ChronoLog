import { Injectable } from '@nestjs/common';
import { TimeEntry } from '../../time-entries/entities/time-entry.entity';

@Injectable()
export class TimeMergeService {
  merge(
    existing: TimeEntry[],
    newStart: Date,
    newEnd:   Date
  ): { start: Date; end: Date; toDelete: number[] } {
    let start = newStart;
    let end   = newEnd;
    const toDelete: number[] = [];

    for (const e of existing) {
      if (e.start < end && e.end > start) {
        if (e.start < start) start = e.start;
        if (e.end   > end) end   = e.end;
        toDelete.push(e.id);
      }
    }

    return { start, end, toDelete };
  }
}
