import { FormEvent, useState } from 'react';

export function TimeEntryForm({ onAdd }: { onAdd: (start: string, end: string) => void }) {
  const [t, setT] = useState({ start: '', end: '' });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    onAdd(t.start, t.end);
    setT({ start: '', end: '' });
  };

  return (
    <form className="space-y-2 border-t pt-4 border-gray-700" onSubmit={submit}>
      <div className="grid grid-cols-2 gap-2">
        <input
          type="datetime-local"
          value={t.start}
          onChange={e => setT(prev => ({ ...prev, start: e.target.value }))}
          className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
          required
        />
        <input
          type="datetime-local"
          value={t.end}
          onChange={e => setT(prev => ({ ...prev, end: e.target.value }))}
          className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
          required
        />
      </div>
      <button className="mt-2 bg-green-600 hover:bg-green-700 text-white py-2 rounded dark:bg-green-500 dark:hover:bg-green-600">
        Add time
      </button>
    </form>
  );
}
