export function formatDuration(minutes: number): string {
    const days  = Math.floor(minutes / (60 * 24));
    const hours = Math.floor((minutes % (60 * 24)) / 60);
    const mins  = minutes % 60;
    const parts: string[] = [];
    if (days) parts.push(`${days} days`);
    if (hours) parts.push(`${hours} hours`);
    if (mins || parts.length === 0) parts.push(`${mins} minutes`);
    return parts.join(' ');
  }
  