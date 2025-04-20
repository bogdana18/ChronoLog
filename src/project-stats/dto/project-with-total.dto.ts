export class ProjectWithTotalDto {
    id: number;
    name: string;
    completed: boolean;
    startTime: Date | null;
    endTime: Date | null;
    totalTimeMinutes: number;
}
  