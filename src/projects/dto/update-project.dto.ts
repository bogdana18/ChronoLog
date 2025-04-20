import { IsOptional, IsDateString, IsBoolean } from 'class-validator';

export class UpdateProjectDto {
  @IsOptional()
  @IsDateString()
  startTime?: string;

  @IsOptional()
  @IsDateString()
  endTime?: string;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}
