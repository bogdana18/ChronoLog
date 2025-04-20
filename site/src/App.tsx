import React, { useState } from 'react';
import { useProjects } from './hooks/useProjects';
import { useTimeEntries } from './hooks/useTimeEntries';
import { ProjectForm } from './components/ProjectForm';
import { ProjectList } from './components/ProjectList';
import { TimeEntryForm } from './components/TimeEntryForm';
import { TimeEntryList } from './components/TimeEntryList';

export default function App() {
  const {
    projects,
    error: projError,
    create,
    remove,
    toggle,
    reload,
  } = useProjects();
  const {
    entries,
    error: entryError,
    load: loadEntries,
    add: addEntry,
  } = useTimeEntries();

  const [activeProject, setActiveProject] = useState<number | null>(null);

  const select = (id: number) => {
    if (activeProject === id) {
      setActiveProject(null);
    } else {
      setActiveProject(id);
      loadEntries(id);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
       <h1 className="text-4xl font-bold text-center">Time Tracker</h1>

      {(projError || entryError) && (
        <div className="text-red-600">
          {projError || entryError}
        </div>
      )}

      <ProjectForm onCreate={create} />

      <ProjectList
        projects={projects}
        active={activeProject}
        onSelect={select}
        onDelete={remove}
        onToggle={toggle}
      />

      {activeProject != null && (
        <>
          <TimeEntryList entries={entries} />
          <TimeEntryForm  onAdd={async (start, end) => {
            await addEntry(activeProject, start, end);
            await reload();
          }} />
        </>
      )}
    </div>
  );
}
