import { api } from './client';

export interface TimeEntryDto {
  id: number;
  start: string;
  end: string;
}

export const getTimeEntries = (projectId: number) =>
  api.get<TimeEntryDto[]>(`/time-entries/project/${projectId}`)
    .then(res => res.data);

export const addTimeEntry = (
  projectId: number,
  start: string,
  end: string
) => api.post('/time-entries', { projectId, start, end });
