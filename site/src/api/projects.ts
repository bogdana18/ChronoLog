import { api } from './client';

export interface ProjectDto {
  id: number;
  name: string;
  completed: boolean;
  startTime: string | null;
  endTime: string | null;
  totalTimeMinutes: number;
}

export const getProjects = () =>
  api.get<ProjectDto[]>('/projects').then(res => res.data);

export const createProject = (name: string, start?: string, end?: string) =>
  api.post('/projects', { name, startTime: start, endTime: end });

export const deleteProject = (id: number) =>
  api.delete(`/projects/${id}`);

export const toggleProject = (id: number, completed: boolean) =>
  api.patch(`/projects/${id}`, { completed });
