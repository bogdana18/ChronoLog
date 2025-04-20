import { useState, useEffect } from 'react';
import { isAxiosError } from 'axios';
import * as api from '../api/projects';

export function useProjects() {
  const [projects, setProjects] = useState<api.ProjectDto[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleError = (e: unknown) => {
    if (isAxiosError(e)) {
      setError(e.response?.data?.message ?? e.message);
    } else if (e instanceof Error) {
      setError(e.message);
    } else {
      setError('Unknown error');
    }
  };

  const reload = async () => {
    try {
      setError(null);
      setProjects(await api.getProjects());
    } catch (e) {
      handleError(e);
    }
  };

  const create = async (name: string, start?: string, end?: string) => {
    try {
      setError(null);
      await api.createProject(name, start, end);
      await reload();
    } catch (e) {
      handleError(e);
    }
  };

  const remove = async (id: number) => {
    try {
      setError(null);
      await api.deleteProject(id);
      await reload();
    } catch (e) {
      handleError(e);
    }
  };

  const toggle = async (id: number, completed: boolean) => {
    try {
      setError(null);
      await api.toggleProject(id, completed);
      await reload();
    } catch (e) {
      handleError(e);
    }
  };

  useEffect(() => {
    reload();
  }, []);

  return { projects, error, create, remove, toggle, reload };
}
