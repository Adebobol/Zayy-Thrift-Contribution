import { IsNotEmpty } from 'class-validator';
import { ContributionType } from '../schemas/group.schema';

export class groupDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  readonly admin: string;

  @IsNotEmpty()
  readonly contributionType: ContributionType;
}
