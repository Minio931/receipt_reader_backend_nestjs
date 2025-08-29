import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dtos/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Post()
  create(@Body() createUserDto: UserDto) {
    return this.userService.store(createUserDto);
  }
}
