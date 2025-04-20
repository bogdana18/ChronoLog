import { ProjectDto } from '../api/projects';
import { formatDuration } from '../utils/formatDuration';

export function ProjectList({
  projects,
  active,
  onSelect,
  onDelete,
  onToggle,
}: {
  projects: ProjectDto[];
  active: number | null;
  onSelect: (id: number) => void;
  onDelete: (id: number) => void;
  onToggle: (id: number, completed: boolean) => void;
}) {
  return (
    <ul className="space-y-4">
      {projects.map(p => (
        <li
          key={p.id}
          className={`flex justify-between items-center border p-4 rounded hover:shadow
            bg-white dark:bg-gray-800 dark:border-gray-700`}
        >
          <div>
            <h3 className="text-lg font-semibold dark:text-gray-100">{p.name}</h3>
              {p.startTime ? new Date(p.startTime).toLocaleString() : '—'}
              <br></br>
              {p.endTime ? new Date(p.endTime).toLocaleString() : '—'}
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {p.completed ? 'Archive' : 'Active'} • {formatDuration(p.totalTimeMinutes)}
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onSelect(p.id)}
              className="px-3 py-1 bg-green-200 hover:bg-green-300 rounded dark:bg-green-700 dark:hover:bg-green-600 dark:text-white"
            >
              {active === p.id ? 'Hidden' : 'Worklog'}
            </button>
            <button
              onClick={() => onToggle(p.id, !p.completed)}
              className={`px-3 py-1 rounded
                ${p.completed
                  ? 'bg-yellow-200 hover:bg-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-500'
                  : 'bg-blue-200 hover:bg-blue-300 dark:bg-blue-600 dark:hover:bg-blue-500'}
                dark:text-white`}
            >
              {p.completed ? 'Open project' : 'Close project'}
            </button>
            <button
              onClick={() => onDelete(p.id)}
              className="px-3 py-1 bg-red-200 hover:bg-red-300 rounded dark:bg-red-700 dark:hover:bg-red-600 dark:text-white"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
