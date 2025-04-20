export function TimeEntryList({ entries }: { entries: { id: number; start: string; end: string }[] }) {
  return (
    <ul className="space-y-2">
      {entries.map(e => (
        <li
          key={e.id}
          className="px-4 py-2 bg-gray-100 rounded dark:bg-gray-700 dark:text-gray-100"
        >
          {new Date(e.start).toLocaleString()} – {new Date(e.end).toLocaleString()}
        </li>
      ))}
    </ul>
  );
}
