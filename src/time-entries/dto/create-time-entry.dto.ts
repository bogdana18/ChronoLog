import { Type } from 'class-transformer';
import { 
    IsNotEmpty, 
    IsNumber, 
    IsDate 
} from 'class-validator';

export class CreateTimeEntryDto {
  @Type(() => Number)
  @IsNumber()
  projectId: number;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  start: Date;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  end: Date;
}
