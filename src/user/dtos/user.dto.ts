import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  isActive: boolean;
}
