import { IsNotEmpty } from 'class-validator';

export class memebrDto {
  @IsNotEmpty()
  readonly group: string;

  @IsNotEmpty()
  readonly nameOfMember: string;
}
