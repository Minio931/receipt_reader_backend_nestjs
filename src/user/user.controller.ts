import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Post()
  create() {
    return this.userService.store({
      firstName: 'John',
      lastName: 'Doe',
      isActive: true,
    });
  }
}
