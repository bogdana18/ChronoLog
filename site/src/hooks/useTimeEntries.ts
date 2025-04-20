import { useState } from 'react';
import * as api from '../api/timeEntries';

export function useTimeEntries() {
  const [entries, setEntries] = useState<api.TimeEntryDto[]>([]);
  const [error, setError] = useState<string | null>(null);

  const load = async (projectId: number) => {
    try {
      setError(null);
      setEntries(await api.getTimeEntries(projectId));
    } catch (e: any) {
      setError(e.response?.data?.message || e.message);
    }
  };

  const add = async (
    projectId: number,
    start: string,
    end: string
  ) => {
    try {
      setError(null);
      await api.addTimeEntry(projectId, start, end);
      await load(projectId);
    } catch (e: any) {
      setError(e.response?.data?.message || e.message);
    }
  };

  return { entries, error, load, add };
}
