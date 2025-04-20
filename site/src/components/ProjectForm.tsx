import { FormEvent, useState } from 'react';

export function ProjectForm({ onCreate }: { onCreate: (name: string, start?: string, end?: string) => void }) {
  const [name, setName] = useState('');
  const [dates, setDates] = useState({ start: '', end: '' });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    onCreate(name, dates.start, dates.end);
    setName('');
    setDates({ start: '', end: '' });
  };

  return (
    <form
      onSubmit={submit}
      className="space-y-4 border border-gray-700 p-4 rounded bg-white dark:bg-gray-900 dark:border-gray-600"
    >
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Project name"
        className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
        required
      />
      <div className="grid grid-cols-2 gap-2">
        <input
          type="datetime-local"
          value={dates.start}
          onChange={e => setDates(d => ({ ...d, start: e.target.value }))}
          className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
        />
        <input
          type="datetime-local"
          value={dates.end}
          onChange={e => setDates(d => ({ ...d, end: e.target.value }))}
          className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
        />
      </div>
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded dark:bg-blue-500 dark:hover:bg-blue-600">
        Create a project
      </button>
    </form>
  );
}
